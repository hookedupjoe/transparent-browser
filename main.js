const { app, BrowserWindow } = require("electron");
const path = require("path");

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        transparent: true,
        frame: false,
        width : 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

   // mainWindow.loadFile(path.join(__dirname, "index.html"));
   mainWindow.loadURL('http://localhost:7001/src/examples/boilerplate.html');
   mainWindow.focus();

}

//app.on("ready", loadMainWindow);
app.on('ready', function () {
    setTimeout(function() {
        loadMainWindow();
    }, 10);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        setTimeout(function(){
            loadMainWindow();
        },100)
    }
});
