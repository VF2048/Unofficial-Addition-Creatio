
class FilterManeger {
    example = {
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

    add(filters, value, it) {
        let key = (it + 10) + "customFilterNumber_Case";
        let template = {};
        template = JSON.parse(JSON.stringify(this.example));
        template.key = key;
        template.rightExpression.parameter.value = value;
        filters.items[key] = Object.assign({}, template);
        return filters;
    }
}