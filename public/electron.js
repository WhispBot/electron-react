const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const Store = require("electron-store");
const contextMenu = require("electron-context-menu");
const completed = new Store({ name: "completed" });
const save = new Store({ name: "save" });
const settings = new Store({
    name: "settings"
});
contextMenu({
    prepend: (defaultActions, params, browserWindow) => [
        {
            label: "Clear completed todos",
            // Only show it when right-clicking images
            visible: params.pageURL === "http://localhost:3000/#/",
            click: () => {
                completed.set({ completed: [] });
            }
        },
        {
            label: "clear todos",
            // Only show it when right-clicking images
            visible: params.pageURL === "http://localhost:3000/#/todos",
            click: () => {
                save.set({ todos: [] });
            }
        },
        {
            label: "save",
            // Only show it when right-clicking images
            visible: params.pageURL === "http://localhost:3000/#/settings",
            click: () => {
                console.log(params.pageURL);
            }
        }
    ]
});

let win;
const mainMenuTemplate = [];
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1050,
        height: 600,
        resizable: false,
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
}

app.on("ready", () => {
    createWindow();
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

    save.get("todos");
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

ipcMain.on("display-app-menu", (e, arg) => {
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    if (win) {
        mainMenu.popup(win, arg.x, arg.y);
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
                    process.platform === "darwin" ? "Command+I" : "Ctrl+I",
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
