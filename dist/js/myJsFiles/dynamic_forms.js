const tableBody = document.getElementsByTagName("tbody")[0];

var addBtn = document.getElementById("add"),
    deleteBtn = document.getElementById("delete");


addBtn.addEventListener('click', function () {
    "use strict";

    let newTR = document.createElement("tr"),
        firstTD = document.createElement("td"),
        secondTD = document.createElement("td");

    newTR.appendChild(firstTD);
    newTR.appendChild(secondTD);
    newTR.appendChild(addBtn.parentElement);
    newTR.appendChild(deleteBtn.parentElement);

    firstTD.innerHTML = `test`;
    secondTD.innerHTML = `test`;


    tableBody.appendChild(newTR);
    
});


deleteBtn.addEventListener('click', function () {
    "use strict";


    let removedtableRow = this.parentElement.parentElement;


    tableBody.childElementCount > 1 ? removedtableRow.previousElementSibling.append(addBtn.parentElement, deleteBtn.parentElement) : {};

    removedtableRow.remove();
})
