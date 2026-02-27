import { BrowserWindow } from "electrobun/bun";

const win = new BrowserWindow({
  title: "Hello Electrobun",
  url: "views://main-ui/index.html",
});
