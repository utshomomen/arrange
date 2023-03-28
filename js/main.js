"use strict";
(function(){
    let selected = []; 
    const items = document.querySelectorAll('.js-item');

    const container1 = document.querySelector('.js-container1');
    container1.addEventListener("click", handleClick);

    const container2 = document.querySelector('.js-container2');
    container2.addEventListener("click", handleClick);

    function handleClick(event) {
        if (event.target.classList.contains("js-item")) {
            event.target.classList.toggle("active");
            const found = selected.find((item) => Number(item.dataset.id) === Number(event.target.dataset.id));
            if (found) {
                selected = selected.filter((item) => Number(item.dataset.id) !== Number(event.target.dataset.id));
            } else {
                selected.push(event.target);
            }
        }
    }

    const left = document.querySelector('.js-left');
    left.addEventListener("click", handleMove);

    const right = document.querySelector('.js-right');
    right.addEventListener("click", handleMove);

    const leftAll = document.querySelector('.js-left-all');
    leftAll.addEventListener("click", handleMove);

    const rightAll = document.querySelector('.js-right-all');
    rightAll.addEventListener("click", handleMove);

    const descending = document.querySelector('.js-sort-up');
    descending.addEventListener("click", sortContainers);

    const ascending = document.querySelector('.js-sort-down');
    ascending.addEventListener("click", sortContainers);

    const findText = document.querySelector('.js-find-button');
    findText.addEventListener("click", findValue);

    const addValueToContainer1 = document.querySelector('.js-add-button1');
    addValueToContainer1.addEventListener("click", addValueToContainers);

    const addValueToContainer2 = document.querySelector('.js-add-button2');
    addValueToContainer2.addEventListener("click", addValueToContainers);

    const removeValue = document.querySelectorAll('.js-remove-button');
    removeValue.forEach((item) => {
        item.addEventListener("click", removeValueFromContainer);
    });



    function handleMove(event) {
        const target = event.target;
        if (target.classList.contains("js-right")) {
            valueMove(container2,container1);
        } else if (target.classList.contains("js-left")) {
            valueMove(container1, container2);
        } else if (target.classList.contains("js-left-all")) {
            valueMoveAll(container1, container2);
        } else if (target.classList.contains("js-right-all")) {
            valueMoveAll(container2, container1);
        }
    }

    function findValue() {
        selected = [];
        Array.from(container1.querySelectorAll(".js-item")).forEach((item) => {
            item.classList.remove("active");
            if (item.childNodes[0].data == document.body.querySelector('.js-find-text').value) {
                item.classList.add("active"); 
                selected.push(item);
                item.scrollIntoView();
            }
        });
        Array.from(container2.querySelectorAll(".js-item")).forEach((item) => {
            item.classList.remove("active");
            if (item.childNodes[0].data == document.body.querySelector('.js-find-text').value) {
                item.classList.add("active"); 
                selected.push(item);
                item.scrollIntoView();
            }
        });
    }

    function valueMove(inputContainer, outputContainer) {
        selected.forEach((item) => {
            if (item.parentElement === outputContainer) {
                inputContainer.appendChild(outputContainer.removeChild(item));
            }
            item.classList.remove("active");
        });
        selected = [];
    }

    function valueMoveAll(inputContainer, outputContainer) {
        Array.from(outputContainer.querySelectorAll(".js-item")).forEach((item) => {
            inputContainer.appendChild(outputContainer.removeChild(item));
            item.classList.remove("active");
        });
    }

  
  
    function sortContainers(event) {
        const target = event.target;
        if (target.classList.contains("js-sort-up")) {
            sortContainer(container1, true);
            sortContainer(container2, true);
        } else if (target.classList.contains("js-sort-down")) {
            sortContainer(container1, false);
            sortContainer(container2, false);
        }
    }

    function sortContainer(container, flag) {
        var sortedItems = Array.from(container.querySelectorAll(".js-item")).sort((a, b) => {
            a = a.childNodes[0].data;
            b = b.childNodes[0].data;
            if (flag) {
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            } else {
                return (a > b) ? -1 : (a < b) ? 1 : 0;
            }
        });
        sortedItems.forEach((item) => {
            container.append(item);
        });
    }

    function addValueToContainers(event) {
        const target = event.target;
        if (target.classList.contains("js-add-button1")) {
            addValueToContainer(container1, true);
        } else if (target.classList.contains("js-add-button2")) {
            addValueToContainer(container2, false);
        }
    }

    function addValueToContainer(container, flag) {
        var newElem;
        if (flag) {
            newElem = createElement(document.body.querySelector('.js-add-text1').value);
        } else {
            newElem = createElement(document.body.querySelector('.js-add-text2').value);
        }
        container.appendChild(newElem);
    }

    function createElement(value) {
        var newElem = document.createElement("li");
        newElem.classList.add("container__item");
        newElem.classList.add("js-item");        
        newElem.innerText = value;
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('js-delete-button');
        deleteButton.innerText = 'x';
        deleteButton.addEventListener("click", removeValueFromContainer);
        newElem.appendChild(deleteButton);
        return newElem;
    }

    function removeValueFromContainer(event)
    {
        event.target.parentElement.remove()
    }

    
})()
