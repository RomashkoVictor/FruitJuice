(function () {
    var username = "";
    var choisenMessage = null;
    var choise = false;
    var newTask = function (text, time) {
        return {
            name: username,
            message: text,
            time: time,
            edited: false,
            delited: false,
            uniqueId: uniqueId()
        };
    }
    var uniqueId = function () {
        var date = Date.now();
        return Math.floor(Math.random() * date).toString();
    };
    var taskList = [];

    window.addEventListener('DOMContentLoaded', run);
    window.addEventListener('resize', onResizeDocument);

    function run(e) {
        var appContainer = document.getElementById('send-button');
        var textContainer = document.getElementById('Entered-Text');
        var name = document.getElementById('InputName');

        appContainer.addEventListener('click', onAddButtonClick);
        textContainer.addEventListener('keypress', onTextInput);
        name.addEventListener('focusout', onNameInput);
        document.getElementsByClassName('glyphicon')[0].style.display = 'none';
        document.getElementsByClassName('glyphicon')[1].style.display = 'none';
        document.getElementsByClassName('glyphicon')[0].addEventListener('click', onEdit);
        document.getElementsByClassName('glyphicon')[1].addEventListener('click', onRemove);
        connectedToServer(false);
        onResizeDocument();
        $('#InputName').popover();
        taskList = restore();
        if (taskList == null) {
            taskList = [];
            taskList[0] = username;
        }
        username = taskList[0];
        updateAll();
    }

    function onTextInput(e) {
        var key = e.keyCode;
        if (key == 13) {
            if (e.shiftKey) {
                var textContainer = document.getElementById('Entered-Text');
                var caretPos = getCaretPosition(textContainer);
                textContainer.value = textContainer.value.slice(0, caretPos) + '\n' + textContainer.value.slice(caretPos);
                setCaretPosition(textContainer, caretPos + 1);
            }
            else {
                onAddButtonClick();
            }
            e.preventDefault();
        }
    }

    function getCaretPosition(textarea) {
        var caretPos = 0;
        if (document.selection) {
            var select = document.selection.createRange();
            select.moveStart('character', -textarea.value.length);
            caretPos = select.text.length;
        }
        else if (textarea.selectionStart || textarea.selectionStart == '0')
            caretPos = textarea.selectionStart;
        return caretPos;
    }

    function setCaretPosition(textarea, pos) {
        if (textarea.setSelectionRange) {
            textarea.focus();
            textarea.setSelectionRange(pos, pos);
        }
        else if (textarea.createTextRange) {
            var range = textarea.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function onNameInput(e) {
        var name = document.getElementById('InputName');
        $('#InputName').popover('hide');
        if (!/\S/.test(name.value)) {
            name.value = '';
            username='';
            taskList[0]='';
            store(taskList);
            return;
        }
        username = name.value;
        taskList[0] = username;
        store(taskList);
    }

    function onAddButtonClick(e) {
        var name = document.getElementById('InputName');
        while (username == null || username.length === 0) {
            $('#InputName').popover('show');
            name.focus();
            return;
        }
        name.value = username;

        var message = document.getElementById('Entered-Text');
        if (!/\S/.test(message.value)) {
            message.value = '';
            return;
        }
        var dateAndTime = takeDate();
        var task = newTask(message.value, dateAndTime);
        if (choisenMessage == null || choise != true) {
            addMessage(task);
            taskList.push(task);
            choise = false;
        }
        else {
            var idMessage = choisenMessage.getAttribute('id');
            for (var i = 1; i < taskList.length; i++)
                if (idMessage == taskList[i].uniqueId) {
                    taskList[i].message = message.value;
                    taskList[i].edited = true;
                    break;
                }
            choisenMessage.childNodes[1].childNodes[0].childNodes[0].innerHTML =username+ ' ' + '<i class="glyphicon glyphicon-pencil iconEditedDelited"></i>';
            choisenMessage.childNodes[1].childNodes[0].childNodes[1].innerText = message.value;
            choisenMessage.classList.remove('myMessage');
            editable(false);
            choisenMessage = null;
            choise = false;
        }
        message.value = '';
        store(taskList);
    }

    function addMessage(task) {
        var scrolling = document.getElementsByClassName('my-table')[0];
        var scrollIsEnd = false;
        var heightTable = scrolling.clientHeight;
        if (scrolling.scrollHeight - scrolling.scrollTop <= heightTable + 50)
            scrollIsEnd = true;
        var table = document.getElementById('talk');
        var row = table.insertRow(-1);
        createRowValues(row, task);
        var scrolling = document.getElementsByClassName('my-table')[0];
        if (scrollIsEnd == true)
            scrolling.scrollTop = scrolling.scrollHeight;
    }

    function createRowValues(row, task) {
        var tdTime = document.createElement('td');
        var tdMessage = document.createElement('td');
        var tdDiv = document.createElement('div');
        var h4 = document.createElement('h4');
        var p = document.createElement('p');
        var pDiv = document.createElement('div');
        tdTime.classList.add('col-date');
        tdMessage.classList.add('col-text');
        tdDiv.classList.add('list-group-item');
        h4.classList.add('list-group-item-heading');
        pDiv.classList.add('wrap');

        tdTime.innerHTML = task.time;
        tdMessage.appendChild(tdDiv);
        tdDiv.appendChild(h4);
        tdDiv.appendChild(pDiv);
        h4.innerHTML = task.name;
        pDiv.innerText = task.message;
        if (task.edited == true) {
            h4.innerHTML += ' ';
            h4.innerHTML += '<i class="glyphicon glyphicon-pencil iconEditedDelited"></i>';
        }
        if (task.delited == true) {
            h4.innerHTML += ' ';
            h4.innerHTML += '<i class="glyphicon glyphicon-trash iconEditedDelited"></i>';
        }
        row.appendChild(tdTime);
        row.appendChild(tdMessage);
        row.setAttribute('id', task.uniqueId);
        row.addEventListener('click', choiseMessage);
    }

    function choiseMessage(e) {
        if (choisenMessage == null) {
            choisenMessage = this;
            choisenMessage.classList.add('myMessage');
            editable(true)
        }
        else {
            choisenMessage.classList.remove('myMessage');
            editable(false);
            if (choisenMessage != this) {
                choisenMessage = this;
                choisenMessage.classList.add('myMessage');
                editable(true);
            }
            else {
                choisenMessage = null;
                choise = false;
            }
        }
    }

    function editable(obj) {
        if (obj == true) {
            document.getElementsByClassName('glyphicon')[0].style.display = 'inline-block';
            document.getElementsByClassName('glyphicon')[1].style.display = 'inline-block';
        }
        else {
            document.getElementsByClassName('glyphicon')[0].style.display = 'none';
            document.getElementsByClassName('glyphicon')[1].style.display = 'none';
        }
    }

    function onEdit(e) {
        var idMessage = choisenMessage.getAttribute('id');
        for (var i = 1; i < taskList.length; i++)
            if (idMessage == taskList[i].uniqueId) {
                if (taskList[i].delited == true) {
                    choisenMessage.classList.remove('myMessage');
                    return;
                }
                taskList[i].edited = true;
                break;
            }
        choise = true;
        var text = document.getElementById("Entered-Text");
        text.value = choisenMessage.childNodes[1].childNodes[0].childNodes[1].innerText;
    }

    function onRemove(e) {
        var idMessage = choisenMessage.getAttribute('id');
        for (var i = 1; i < taskList.length; i++)
            if (idMessage == taskList[i].uniqueId) {
                choisenMessage.classList.remove('myMessage');
                if (taskList[i].delited == true)
                    return;
                taskList[i].message = '';
                taskList[i].delited = true;
                if (taskList[i].edited == true) {
                    choisenMessage.childNodes[1].childNodes[0].childNodes[0].removeChild(
                        choisenMessage.childNodes[1].childNodes[0].childNodes[0].childNodes[1]);
                    taskList[i].edited = false;
                }
                break;
            }
        choisenMessage.childNodes[1].childNodes[0].childNodes[1].innerText = '';
        choisenMessage.childNodes[1].childNodes[0].childNodes[0].innerHTML += ' ' + '<i class="glyphicon glyphicon-trash iconEditedDelited"></i>';
        editable(false);
        choisenMessage = null;
        store(taskList);
    }

    function connectedToServer(e) {
        var label = document.getElementById("ConnectedServer");
        if (e == true) {
            if (label.classList.contains('label-danger')) {
                label.classList.remove('label-danger');
                label.classList.add('label-success');
                label.textContent = "Connected";
            }
        }
        else {
            if (label.classList.contains('label-success')) {
                label.classList.remove('label-success');
                label.classList.add('label-danger');
                label.textContent = "Disconnected";
            }
        }
    }

    function takeDate() {
        var date = new Date();
        var time = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + "<br>";
        time += ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        time += ':' + ('0' + date.getSeconds()).slice(-2);
        return time;
    }

    function onResizeDocument(e) {
        var allHeight = document.getElementsByTagName('html')[0].clientHeight;
        var inputHeight = document.getElementById('Entered-Text').clientHeight;
        var navbarHeight = document.getElementsByClassName('navbar')[0].clientHeight;
        var merges = 90;
        var height = allHeight - inputHeight - navbarHeight - merges;
        height = height.toString() + 'px';
        document.getElementsByClassName('my-table')[0].style.height = height;
    }

    function store(listToSave) {
        if (typeof (Storage) == "undefined") {
            alert('localStorage is not accessible');
            return;
        }
        localStorage.setItem("Chat taskList", JSON.stringify(listToSave));
    }

    function restore() {
        if (typeof (Storage) == "undefined") {
            alert('localStorage is not accessible');
            return;
        }
        var item = localStorage.getItem("Chat taskList");
        return item && JSON.parse(item);
    }

    function updateAll() {
        var name = document.getElementById('InputName');
        name.value = username;
        for (var i = 1; i < taskList.length; i++)
            addMessage(taskList[i]);
    }
}()
)
