const { app, BrowserWindow } = require("electron");
const path = require("path");

const process = require('process'); 
const args = process.argv
console.log('args',args);


var showFrame = false;
var showDev = false;
var loadURL = '';
var loadFN = '';

var startPos = {
    x: 0,
    y: 0,
    width: 1024,
    height: 768
}

if( args && args.length ){
    for( var iPos in args ){
        var tmpArg = args[iPos];
        if( tmpArg == '--showframe'){
            showFrame = true
        } else if( tmpArg == '--showdev'){
            showDev = true
        } else {
            try {
                var tmpParts = tmpArg.split('=');
                if( tmpParts.length == 2){
                    var tmpArgName = tmpParts[0];
                    var tmpArgVal = tmpParts[1];
                    if( tmpArgName == 'x' || tmpArgName == 'y' || tmpArgName == 'width' || tmpArgName == 'height' ){
                        startPos[tmpArgName] = parseInt(tmpArgVal);
                    } else if( tmpArgName == 'url' ){
                        loadURL = tmpArgVal;
                    } else if( tmpArgName == 'filename' ){
                        loadFN = tmpArgVal;
                    }
                    
                }
            } catch (theErr) {
                console.log("error getting params",theErr)
            }
    }
    }
}

var browserConfig = {
    // width: startPos.width,
    // height: startPos.height,
    webPreferences: {
        acceptFirstMouse: true,
        autoHideMenuBar: true,
        useContentSize: true,
        nodeIntegration: true
    }
}

if( showFrame !== true ){
    browserConfig.frame = false;
    browserConfig.transparent = true;
}

/*
transparent: true,
frame: false,
width : 1200,
    height: 800,

    */
const loadMainWindow = () => {
    const mainWindow = new BrowserWindow(browserConfig);

   console.log('loadURL',loadURL);
   if(!loadURL){
    loadURL = 'http://localhost:7001/src/examples/basic.html';
   }
    if( loadURL ){
        mainWindow.loadURL(loadURL);
    } else {
        mainWindow.loadFile(loadFN || path.join(__dirname, "index.html"));  
    }
   // mainWindow.loadFile(path.join(__dirname, "index.html"));
   
   mainWindow.focus();
   if( showDev == true ){
     mainWindow.webContents.openDevTools();
   }

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
