function my$(id) {
    return document.getElementById(id);
}

function getFirstElementChild(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else{
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
function getLastElementChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else{
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
    }
    return node;
}

function setInnerText(element,text) {
    if (typeof element.textContent == "undefined") {
        element.innerText = text;
    }else{
        element.textContent = text;
    }
}

function addEventListener(element,type,fn) {
    if (element.addEventListener) {
        element.addEventListener(type,fn,false);
    } else if (element.attachEvent) {
        element.attachEvent("on"+type, fn);
    }else{
        element["on"+type] = fn;
    }
}

function animate(element,target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        console.log(current);
        var step = 10;
        step = current < target ? step : -step;
        current += step;
        if (Math.abs(target-current)>Math.abs(step)) {
            element.style.left = current + "px";
        }else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    },1);
}