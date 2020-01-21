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
const Store = require("electron-store");
const store = new Store();
const schema = {
    settings: {
        font_size: 14
    }
};
const settings = new Store({
    name: "settings",
    schema: schema
});

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
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomNum(num) {
    let num1 = getRandomInt(num).toString();
    let num2 = getRandomInt(num).toString();
    let num3 = getRandomInt(num).toString();
    let num4 = getRandomInt(num).toString();
    let num5 = getRandomInt(num).toString();
    let sum = num1 + num2 + num3 + num4 + num5;
    return sum;
}

function dateFormat() {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    let format = `${year}-${month}-${date} ${hours}:${minutes}`;
    let minutesWith0 = `${year}-${month}-${date} ${hours}:0${minutes}`;
    let hoursWith0 = `${year}-${month}-${date} 0${hours}:${minutes}`;
    let hourAndmunitssWith0 = `${year}-${month}-${date} 0${hours}:0${minutes}`;
    if (hours < 9 && minutes < 9) {
        return hourAndmunitssWith0;
    }
    if (minutes < 9) {
        return minutesWith0;
    }
    if (hours < 9) {
        return hoursWith0;
    }
    return format;
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

ipcMain.on("get-todos", () => {
    const data = store.get("todos");
    win.webContents.send("todos", data);
});

ipcMain.on("get-old-todos", () => {
    const data = store.get("todos");
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const newdata = data.filter(element => {
        return (
            element.date.split("-")[2].split(" ")[0] !== date ||
            element.date.split("-")[1] !== month
        );
    });
    win.webContents.send("old-todos", newdata);
});

ipcMain.on("add-todo", (e, todo) => {
    const filter = store.get("todos").filter(item => item.name === todo);
    const data = store.get("todos");

    let num = randomNum(10);
    store.set({
        todos: [...data, { name: todo, key: num, date: dateFormat(), text: "" }]
    });
});

ipcMain.on("remove-todo", (e, todo) => {
    const filter = store.get("todos").filter(item => item.key !== todo);
    store.set({ todos: filter });
    win.webContents.send("data", filter);
    win.webContents.send("removed");
});

ipcMain.on("add-text", (e, todo) => {
    const data = store.get("todos");
    const filter = store.get("todos").filter(item => {
        if (item.key === todo) {
            win.webContents.send("text", item.text);
        }
    });
});

ipcMain.on("save-text", (e, data) => {
    const wantedItem = store.get("todos").filter(item => item.key === data[1]);
    const filter = store.get("todos").filter(item => item.key !== data[1]);
    store.set({ todos: filter });
    const StoreData = store.get("todos");
    store.set({
        todos: [
            ...StoreData,
            {
                name: wantedItem[0].name,
                key: wantedItem[0].key,
                date: wantedItem[0].date,
                text: data[0]
            }
        ]
    });
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
