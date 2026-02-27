/// <reference lib="webworker" />

import * as pako from 'pako';

addEventListener('message', async ({ data }) => {
  const { url, username, password } = data;

  try {
    const headers = new Headers(); // Correcto: usar la API nativa Headers
    if (username && password) {
      const encodedCredentials = btoa(`${username}:${password}`);
      headers.append('Authorization', `Basic ${encodedCredentials}`);
      // console.log('Worker: Authorization header added.');
    }

    const response = await fetch(url, { headers });
    // console.log('Worker: Fetch response status:', response.status);
    // console.log('Worker: Fetch response headers:', Array.from(response.headers.entries()));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentLength = response.headers.get('Content-Length');
    let totalLength = 0;
    if (contentLength) {
      totalLength = parseInt(contentLength, 10);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable.');
    }

    let receivedLength = 0;
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      if (totalLength > 0) {
        const progress = Math.round((receivedLength / totalLength) * 100);
        postMessage({ type: 'progress', progress });
      }
    }

    const concatenatedChunks = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      concatenatedChunks.set(chunk, position);
      position += chunk.length;
    }

    const decompressed = pako.inflate(concatenatedChunks, { to: 'string' });
    const catalog = JSON.parse(decompressed);

    postMessage({ type: 'success', catalog });
  } catch (error) {
    // console.error('Error in catalog worker:', error);
    postMessage({ type: 'error', message: error.message });
  }
});
