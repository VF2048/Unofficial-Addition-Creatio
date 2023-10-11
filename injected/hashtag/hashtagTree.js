class HashtagTreeHandler {
    constructor(hashtagTree, addHashtagToEnd) {
        if (!hashtagTree.maxDepth)
            hashtagTree.maxDepth = 0;
        this.addHashtagToEnd = addHashtagToEnd;
        this.hashtagTree = hashtagTree
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }
    table = [];
    tableBody;
    returnStrings = {
        hashtag: {
            string: "",
            line: ""
        }
    }
    selectorDisable = false;

    countLeafNodes(obj, depth) {
        if (obj.val)
            return;
        if (obj.text) {
            depth > this.hashtagTree.maxDepth ? this.hashtagTree.maxDepth = depth : 0;
            return 1;
        } else {
            depth++;
            let count = 0;
            for (let key in obj.value) {
                if (obj.value.hasOwnProperty(key)) {
                    count += this.countLeafNodes(obj.value[key], depth);
                }
            }
            obj.val = count;
            return count;
        }
    }

    addTableRow(row, line) {
        for (let i = 0; i < Object.keys(row).length; i++) {
            if (!row[i])
                row[i] = this.table[line - 1][i]
        }
        this.table[line] = row;
    }

    addCurrentCell(row, tempTable, currentCell, allHashtag) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(currentCell.name);
        if (currentCell.rowSpan)
            cell.rowSpan = currentCell.rowSpan;
        if (currentCell.colSpan)
            cell.colSpan = currentCell.colSpan;
        if (currentCell.lastElem) {
            cell.style.cursor = "pointer";
            cell.last = "1";
            cell.value = allHashtag;
        }
        if (currentCell.color)
            cell.classList.add(currentCell.color);
        cell.appendChild(cellText);
        tempTable[currentCell.depth] = cell
        row.appendChild(cell);
    }

    generateTale(obj, name, array, depth, arrhashtag) {
        if (obj.text) {
            arrhashtag += ` ${obj.hashtag}`;
            array.push({ name: name, rowSpan: 0, depth: depth, colSpan: 0, lastElem: 1, color: "colorLevelLast" });
            array.push({ name: obj.text, rowSpan: 0, depth: depth + 1, colSpan: this.hashtagTree.maxDepth - depth, lastElem: 1 });
            let row = document.createElement("tr");
            let line = this.table.length;
            row.setAttribute("line", line);
            let tempTable = {};
            for (let elem of array) {
                this.addCurrentCell(row, tempTable, elem, arrhashtag);
            }
            this.addTableRow(tempTable, line);
            this.tableBody.appendChild(row);
            return [];
        } else {
            let val = { name: name, rowSpan: obj.val, depth: depth, color: obj.color };
            arrhashtag += ` ${obj.hashtag}`;
            array.push(val);
            depth++;
            for (let key in obj.value)
                if (obj.value.hasOwnProperty(key))
                    array = this.generateTale(obj.value[key], key, array, depth, arrhashtag);
            return [];
        }
    }

    generateThree(Task) {
        this.countLeafNodes(this.hashtagTree.general, 0);
        this.countLeafNodes(this.hashtagTree[Task.service], 0);
        let elem = `
        <div id="myModal" class="modal t-label"> 
            <div class="modal-content"> 
                <span id="" class="close" style="background-image: url(https://creatio.nornik.ru/0/conf/content/img/LookupPageViewGenerator-CloseIcon.png?hash=63f0a846ac338fa8ced85b5685fa15f6);"></span>
                <table border="1">
                    <tbody id="tbody" class="tbody"></tbody>
                </table>
                <div class="incident_request">
                        <label for="incident">Это массовый инцидент?</label>
                        <input class="radio" type="checkbox" id="checkbox-yes" name="incident" value="yes">
                        <label for="radio-yes">Да</label>
                    <div id="incident_input" class="incident_number" style="display: none;">
                        <label for="incident_number" style="padding-left: 10px;">А есть номер?</label>
                        <input type="text" id="incident_number" name="incident_number">
                    </div>
                    <button id="save" class="save" type="button" disabled>Сохранить</button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML("afterbegin", elem);
        this.tableBody = document.getElementById("tbody");
        let threeGeneral = this.hashtagTree.general;
        for (let e in threeGeneral.value) {
            this.generateTale(threeGeneral.value[e], e, [], 0, "");
        }
        let three = this.hashtagTree[Task.service];
        for (let e in three.value) {
            this.generateTale(three.value[e], e, [], 0, "");
        }
        this.buttonHandler();
        this.addTableListener(this.tableBody);
    };

    mousePosition(line, rowSpan, state) {
        for (let i = 0; i < rowSpan; i++) {
            const rowData = this.table[line];
            for (const key in rowData) {
                if (Object.hasOwnProperty.call(rowData, key)) {
                    const cell = rowData[key];
                    if (state === 1)
                        cell.classList.remove("green-bg");
                    else
                        cell.classList.add("green-bg");
                }
            }
        }
    }

    mouseHandler(event, state) {
        let target = event.target;
        if (target.tagName !== "TD" || !target.last || this.selectorDisable)
            return;
        const rowIndex = target.parentElement.getAttribute("line");
        const rowSpan = target.getAttribute("rowspan") || 1;
        this.mousePosition(rowIndex, rowSpan, state);
    }

    mouseOver(event) {
        this.mouseHandler(event, 0);
    }

    mouseLeave(event) {
        this.mouseHandler(event, 1);
    }

    addTableListener(tableBody) {
        tableBody.addEventListener("mouseover", this.mouseOver, this);
        const lines = tableBody.querySelectorAll("td");
        lines.forEach(element => {
            element.addEventListener("mouseleave", this.mouseLeave, this);
        });
    }

    disableDisplay() {
        this.selectorDisable = false;
        this.tableBody.removeEventListener("mouseover", this.mouseOver, this);
        const lines = this.tableBody.querySelectorAll("td");
        lines.forEach(element => {
            element.removeEventListener("mouseleave", this.mouseLeave, this);
        });
        const modal = document.getElementById('myModal');
        modal.remove();
        this.removeHandler();
    }

    selectLine(target) {
        this.returnStrings.hashtag.string = target.value;
        this.returnStrings.hashtag.line = target.parentElement.getAttribute("line");
        this.selectorDisable = true;
    }

    clickHandler(elem) {
        if (elem.target.className.includes("modal") || elem.target.className === "close") {
            this.disableDisplay();
        }
        if (elem.target.tagName == "TD" && elem.target.last) {
            if (!this.selectorDisable) {
                this.selectLine(elem.target)
            } else {
                if (this.returnStrings.hashtag.string === elem.target.value) {
                    this.selectorDisable = false;
                    this.mousePosition(this.returnStrings.hashtag.line, 1, 1)
                    this.returnStrings.hashtag.string = "";
                } else {
                    this.mousePosition(this.returnStrings.hashtag.line, 1, 1);
                    this.selectLine(elem.target);
                    this.mousePosition(elem.target.parentElement.getAttribute("line"), 1, 0);
                }
            }
        }
        const incident_input = document.getElementById("incident_input");
        if (elem.target.id === "checkbox-yes") {
            let checked = elem.target.checked;
            incident_input.style.display = checked ? "contents" : "none";
        }
        const saveButton = document.getElementById("save");
        if (this.returnStrings.hashtag.string !== "") {
            saveButton.disabled = false;
        } else
            if (saveButton)
                saveButton.disabled = true;
        if (elem.target.id === "save")
            if (!elem.target.disabled) {
                let incNumber = "";
                const isMassIncident = document.getElementById("checkbox-yes").checked;
                if (isMassIncident)
                    incNumber = document.getElementById("incident_number").value;
                this.addHashtagToEnd(` ${hashtagVersion}${this.returnStrings.hashtag.string}${isMassIncident ? " #MassIncident:" + incNumber : ""} ${hashtagVersion}`)
                this.disableDisplay();
            }
    }

    getRegex() {
        return `\\s+?${hashtagVersion}.+?${hashtagVersion}`;
    }

    buttonHandler() {
        window.addEventListener('click', this.clickHandler, this);
    }

    removeHandler() {
        window.removeEventListener('click', this.clickHandler, this);
    }
}