function setcolor(color) {
    let doc = document.getElementById("NNCaseTaskPageHeaderContainer");
    let base_edit = document.querySelectorAll(".base-edit");
    let base_edit_input = document.querySelectorAll(".base-edit-input");
    doc.style.backgroundColor = color;
    base_edit.forEach((elem) => {
        elem.style.backgroundColor = "#ffffff00";
    })
    base_edit_input.forEach((elem) => {
        elem.style.backgroundColor = "#ffffff00";
    })
}