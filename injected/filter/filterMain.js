let it = 0;
let tasks = [];

function dataRequest() {
    let find;
    tasks = [];
    let reg = /((RITM|INC)\d{9})|(TASK\d{8})/gm;
    let task = prompt("Введите список ритмов или инцидентов. Нажмите 'ок', далее 'Применить' и обновите страницу.", "Любой текст содержащий номера заданий RITM001465684 RITM001465681");
    while ((find = reg.exec(task)) !== null)
        tasks.push(find[0]);
}

(function (xhr) {
    const filterManaget = new FilterManeger();
    new KeyboardHandler(dataRequest);

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
                                    filter = filterManaget.add(filter, element, it);
                                    value = filterManaget.add(value, element, it);
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

