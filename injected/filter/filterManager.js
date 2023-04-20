
class FilterManeger {
    example = {
        "className": "Terrasoft.CompareFilter",
        "filterType": 1,
        "comparisonType": 11,
        "isEnabled": true,
        "dataValueType": 1,
        "isAggregative": false,
        "trimDateTimeParameterToDate": false,
        "key": "customFilterNumber_Case",
        "leftExpression": {
            "className": "Terrasoft.ColumnExpression",
            "expressionType": 0,
            "columnPath": "Number"
        },
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

    add(filters, value, it, type = { columnPath: "Number", leftExpressionCaption: "Номер" }) {
        let key = (it + 10) + "customFilterNumber_Case";
        let template = {};
        template = JSON.parse(JSON.stringify(this.example));
        template.key = key;
        template.leftExpressionCaption = type.leftExpressionCaption;
        template.leftExpression.columnPath = type.columnPath;
        template.rightExpression.parameter.value = value;
        filters.items[key] = Object.assign({}, template);
        return filters;
    }
}