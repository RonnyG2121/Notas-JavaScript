import { Electroview } from "electrobun/view";

// Instantiate the electrobun browser api
const electrobun = new Electroview({ rpc: null});

window.loadPage = () => {
  const newUrl = document.querySelector("#urlInput").value;
  const webview = document.querySelector(".webview");

  webview.src = newUrl;
};

window.goBack = () => {
  const webview = document.querySelector(".webview");
  webview.goBack();
};

window.goForward = () => {
  const webview = document.querySelector(".webview");
  webview.goForward();
};