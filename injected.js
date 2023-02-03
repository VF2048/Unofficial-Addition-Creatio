let example = {
    "className": "Terrasoft.CompareFilter",
    "filterType": 1,
    "comparisonType": 11,
    "isEnabled": true,
    "trimDateTimeParameterToDate": false,
    "leftExpression": {
        "className": "Terrasoft.ColumnExpression",
        "expressionType": 0,
        "columnPath": "Number"
    },
    "isAggregative": false,
    "key": "customFilterNumber_Case",
    "dataValueType": 1,
    "leftExpressionCaption": "Номер",
    "rightExpression": {
        "className": "Terrasoft.ParameterExpression",
        "expressionType": 2,
        "parameter": {
            "className": "Terrasoft.Parameter",
            "dataValueType": 1,
            "value": ""
        }
    }
};
let it = 0;
let tasks = [];

function addFiler(filters, value, example, it) {
    let key = (it + 10) + "customFilterNumber_Case";
    let template = {};
    template = JSON.parse(JSON.stringify(example));
    template.key = key;
    template.rightExpression.parameter.value = value;
    filters.items[key] = Object.assign({}, template);
    return filters;
}

function dataRequest() {
    let find;
    tasks = [];
    let reg = /RITM\d{9}/gm;
    let task = prompt("Введите список ритмов", "RITM001465684 RITM001465681");
    while ((find = reg.exec(task)) !== null)
        tasks.push(find[0]);
}

function keyboardHandler() {
    let keyState = {};
    document.addEventListener("keydown", (e) => {
        keyState[e.code] = true;
        if (keyState.Backquote && keyState.ControlLeft) {
            keyState.Backquote = false;
            keyState.ControlLeft = false;
            dataRequest();
        }
    })
    document.addEventListener("keyup", (e) => {
        keyState[e.code] = false;
    })
}

(function (xhr) {
    keyboardHandler();

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
                                    filter = addFiler(filter, element, example, it);
                                    value = addFiler(value, element, example, it);
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

