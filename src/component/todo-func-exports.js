export const dateFormat = () => {
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
    if (hours <= 9 && minutes <= 9) {
        return hourAndmunitssWith0;
    }
    if (minutes <= 9) {
        return minutesWith0;
    }
    if (hours <= 9) {
        return hoursWith0;
    }
    return format;
};

export const customSort = (a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
};

export const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const changeSaveButton = () => {
    const selected = document.querySelector(".savebtn");
    selected.innerHTML = "Not saved";
};
