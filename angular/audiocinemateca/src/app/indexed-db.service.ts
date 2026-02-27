import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'AudiocinematecaDB';
  private readonly DB_VERSION = 1;
  private readonly STORE_NAME = 'catalog';

  constructor() { }

  private openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        // console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async saveCatalog(catalog: any[], versionDate: string): Promise<void> {
    const db = await this.openDb();
    const transaction = db.transaction([this.STORE_NAME], 'readwrite');
    const store = transaction.objectStore(this.STORE_NAME);

    // Limpiar el store antes de guardar el nuevo catálogo
    await new Promise<void>((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = (event) => reject((event.target as IDBRequest).error);
    });

    // Guardar el catálogo y la fecha de versión
    await new Promise<void>((resolve, reject) => {
      const putRequest = store.put({ id: 'mainCatalog', data: catalog, versionDate: versionDate });
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = (event) => reject((event.target as IDBRequest).error);
    });

    return new Promise<void>((resolve) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => { /* console.error('Transaction error:', (event.target as IDBTransaction).error); */ };
    });
  }

  async getCatalog(): Promise<{ data: any, peliculasMap: Map<string, any>, seriesMap: Map<string, any>, cortometrajesMap: Map<string, any>, documentalesMap: Map<string, any>, versionDate: string } | null> {
    const db = await this.openDb();
    const transaction = db.transaction([this.STORE_NAME], 'readonly');
    const store = transaction.objectStore(this.STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get('mainCatalog');
      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result;
        if (result && result.data) {
          const catalogData = result.data;
          const peliculasMap: Map<string, any> = new Map((catalogData.peliculas || []).map((p: any) => [String(p.id), p]));
          const seriesMap: Map<string, any> = new Map((catalogData.series || []).map((s: any) => [String(s.id), s]));
          const cortometrajesMap: Map<string, any> = new Map((catalogData.cortometrajes || []).map((c: any) => [String(c.id), c]));
          const documentalesMap: Map<string, any> = new Map((catalogData.documentales || []).map((d: any) => [String(d.id), d]));

          resolve({
            data: catalogData,
            peliculasMap,
            seriesMap,
            cortometrajesMap,
            documentalesMap,
            versionDate: result.versionDate
          });
        } else {
          resolve(null);
        }
      };
      request.onerror = (event) => {
        // console.error('Error getting catalog from IndexedDB:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  }
}
