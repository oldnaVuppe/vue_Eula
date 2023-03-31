import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  console.log(process.env);
  // 打完包app.isPackaged的值为true
  if (process.env.NODE_ENV !== "development") {
    win.loadFile("./index.html");
    // win.loadFile(path.join(__dirname, './../dist/index.html'));
  } else {
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }

};

app.whenReady().then(createWindow);
