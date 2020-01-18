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

ipcMain.on("get-todos", (e, todo) => {
    const data = store.get("todos");
    win.webContents.send("data", data);
});

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
    let format = `${date}-${month}-${year} ${hours}:${minutes}`;
    let formatWith0 = `${date}-${month}-${year} ${hours}:0${minutes}`;
    if (minutes > 9) {
        return format;
    } else {
        return formatWith0;
    }
}

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
