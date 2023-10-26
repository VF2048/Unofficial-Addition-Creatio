let it = 0;
let tasks = [];
const typeValue = {
    Number: { columnPath: "Number", leftExpressionCaption: "Номер" },
    Name: { columnPath: "Name", leftExpressionCaption: "Название" },
}

function dataRequest() {
    let find;
    tasks = [];
    let reg = /((RITM|INC)\d{9})|((TASK|CHG)\d{8})/gm;
    let regCMDB = /(HW\d{6})|(HW\d{5})/gm;
    let task = prompt("Введите список ритмов или инцидентов. Нажмите 'ок', далее 'Применить' и обновите страницу.", "Любой текст содержащий номера заданий RITM001465684 RITM001465681");
    while ((find = reg.exec(task)) !== null)
        tasks.push({ value: find[0], typeValue: "Number" });
    while ((find = regCMDB.exec(task)) !== null)
        tasks.push({ value: find[0], typeValue: "Name" });
}

function checkForClass(className, callback) {
    var checkExist = setInterval(function () {
        // console.log(typeof className);
        if (typeof className !== "undefined") {
            clearInterval(checkExist);
            callback();
        }
    }, 100);
}

function initKeyboardHandler(err) {
    try {
        new KeyboardHandler(dataRequest);
    } catch {
        if (err > 10) {
            throw new Error("Not found class KeyboardHandler")
        }
        err++
        setTimeout(() => {
            initKeyboardHandler();
        }, 50);
    }
}

function initFilterManeger(filterManaget, err) {
    try {
        filterManaget = new FilterManeger();
        return filterManaget
    } catch {
        if (err > 10) {
            throw new Error("Not found class FilterManeger")
        }
        err++;
        setTimeout(() => {
            initFilterManeger();
        }, 50);
    }
}

(function (xhr) {
    let errorKeyboardHandler = 0;
    initKeyboardHandler(errorKeyboardHandler);

    let filterManaget;
    let errorFilterManeger = 0;
    filterManaget = initFilterManeger(filterManaget, errorFilterManeger);

    const XHR = XMLHttpRequest.prototype

    const open = XHR.open
    const send = XHR.send
    const setRequestHeader = XHR.setRequestHeader

    XHR.open = function () {
        this._requestHeaders = {}

        return open.apply(this, arguments)
    }

    XHR.setRequestHeader = function (header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments)
    }

    XHR.send = function () {
        if (tasks.length > 0)
            if (this.__zone_symbol__xhrURL == "../DataService/json/SyncReply/UserProfile") {
                let arg = JSON.parse(arguments[0]);
                if (arg.data) {
                    let data = JSON.parse(arg.data);
                    if (data.CustomFilters) {
                        try {
                            let filter = data.CustomFilters.null.filter;
                            let value = data.CustomFilters.null.value;
                            if (typeof filter == "string") {
                                filter = JSON.parse(filter);
                                value = JSON.parse(value);
                                for (el of tasks) {
                                    let element = el;
                                    filter = filterManaget.add(filter, element.value, it, typeValue[element.typeValue]);
                                    value = filterManaget.add(value, element.value, it, typeValue[element.typeValue]);
                                    it++;
                                }
                                it = 0;
                            }
                            data.CustomFilters.null.filter = JSON.stringify(filter);
                            data.CustomFilters.null.value = JSON.stringify(value);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    arg.data = JSON.stringify(data);
                }
                arguments[0] = JSON.stringify(arg);
            }
        return send.apply(this, arguments)
    }
})(XMLHttpRequest);

