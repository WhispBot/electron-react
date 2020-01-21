const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    dialog,
    MenuItem
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const mainMenuTemplate = [];
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        minWidth: 1050,
        minHeight: 600,
        resizable: true,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });
    win.once("ready-to-show", () => {
        win.show();
    });

    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    win.on("closed", () => {
        win = null;
    });
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

ipcMain.on("save:font", (e, font_size) => {
    const data = settings.get("settings");
    settings.set({ settings: { ...data, font_size: font_size } });
});

ipcMain.on("save:color", (e, background_Color) => {
    const data = settings.get("settings");
    settings.set({ settings: { ...data, backgroundColor: background_Color } });
});

if (isDev) {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "toggle DevTools",
                accelerator:
                    process.platform == "darwin" ? "Command+I" : "Ctrl+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: "reload"
            }
        ]
    });
}
