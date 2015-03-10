(function(){
    var username = "";
    var choisenMessage=null;
    var choise=false;
    
    window.addEventListener('DOMContentLoaded', run);
    window.addEventListener('resize',onResizeDocument);
    
function run(e){
	var appContainer = document.getElementById('send-button');
    var textContainer=document.getElementById('Entered-Text');
    var name=document.getElementById('InputName');

	appContainer.addEventListener('click',onAddButtonClick );
    textContainer.addEventListener('keypress',onTextInput);
    name.addEventListener('focusout',onNameInput);
    document.getElementsByClassName('glyphicon')[0].style.display='none';
    document.getElementsByClassName('glyphicon')[1].style.display='none';
    document.getElementsByClassName('glyphicon')[0].addEventListener('click',onEdit);
    document.getElementsByClassName('glyphicon')[1].addEventListener('click',onRemove);
    connectedToServer(false);
    onResizeDocument();
}

function onTextInput(e) {
    var key = e.keyCode;
   if (key == 13) {
       if(e.shiftKey){
           var textContainer=document.getElementById('Entered-Text');
           var caretPos=getCaretPosition(textContainer);
           textContainer.value=textContainer.value.slice(0,caretPos)+'\n'+textContainer.value.slice(caretPos);
           setCaretPosition(textContainer,caretPos+1);
       }
       else{
        onAddButtonClick();
       }
        e.preventDefault();
    }
}

function getCaretPosition (textarea) {
    var caretPos = 0;
    if (document.selection) {
        var select = document.selection.createRange ();
        select.moveStart ('character', -textarea.value.length);
        caretPos = select.text.length;
    }
    else if (textarea.selectionStart || textarea.selectionStart == '0')
        caretPos = textarea.selectionStart;
    return caretPos;
}

function setCaretPosition(textarea, pos){
    if(textarea.setSelectionRange)
    {
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
      var name=document.getElementById('InputName');
    if(!/\S/.test(name.value)){
        name.value = '';
        return;
    }
        username=name.value;
}

function onAddButtonClick(e) {
    var name=document.getElementById('InputName');
    while(username==null||username.length === 0)
    {
        name.focus();
        return;
        //username = prompt("Input your username!");
    }
    name.value=username;
    
	var message = document.getElementById('Entered-Text');
    if(!/\S/.test(message.value)){
        message.value = '';
        return;
    }
    if(choisenMessage==null){
	   addMessage(message.value);
    }
    else{
        if(choise==true)
        {
            choisenMessage.childNodes[1].childNodes[0].childNodes[1].innerText=message.value;
            choisenMessage.classList.remove('myMessage');
            editable(false);
            choisenMessage=null;
            choise=false;
        }
        else
        {
            addMessage(message.value);
        }
    }
	message.value = '';
	//updateCounter();
}

function addMessage(value) {
    var scrolling=document.getElementsByClassName('my-table')[0];
    var scrollIsEnd=false;
    var heightTable = scrolling.clientHeight;
    if(scrolling.scrollHeight-scrolling.scrollTop<=heightTable+50)
        scrollIsEnd=true;
	var table = document.getElementById('talk');
    var row = table.insertRow(-1);
    createRowValues(row, value);
    var scrolling=document.getElementsByClassName('my-table')[0];
    if(scrollIsEnd==true)
        scrolling.scrollTop = scrolling.scrollHeight;

	//updateCounter();
}

function createRowValues(row, text){
	var tdTime = document.createElement('td');
	var tdMessage = document.createElement('td');
    var tdDiv=document.createElement('div');
    var h4=document.createElement('h4');
    var p=document.createElement('p');
    tdTime.classList.add('col-name');
    tdMessage.classList.add('col-text');
    tdDiv.classList.add('list-group-item');
    h4.classList.add('list-group-item-heading');
    var pDiv=document.createElement('div');
    pDiv.classList.add('wrap');
    p.classList.add('list-group-item-text');
    pDiv.appendChild(p);
    
    tdTime.innerHTML=takeDate();
    tdMessage.appendChild(tdDiv);
    tdDiv.appendChild(h4);
    tdDiv.appendChild(pDiv);
    h4.innerHTML=username;
    p.innerText=text;
    
	row.appendChild(tdTime);
	row.appendChild(tdMessage);
    row.addEventListener('click',choiseMessage);
}

function choiseMessage(e){
    if(choisenMessage==null){
        choisenMessage=this;
        choisenMessage.classList.add('myMessage');
        editable(true)
    }
    else{
        choisenMessage.classList.remove('myMessage');
        editable(false);
        if(choisenMessage!=this){
            choisenMessage=this;
            choisenMessage.classList.add('myMessage');
            editable(true);
        }
        else
            choisenMessage=null;
    }   
}

function editable(obj){
    if(obj==true){
        document.getElementsByClassName('glyphicon')[0].style.display='inline-block';
        document.getElementsByClassName('glyphicon')[1].style.display='inline-block';
    }
    else{
        document.getElementsByClassName('glyphicon')[0].style.display='none';
        document.getElementsByClassName('glyphicon')[1].style.display='none';
    }
}

function onEdit(e){
    choise=!choise;
     var text=document.getElementById("Entered-Text");
     text.value=choisenMessage.childNodes[1].childNodes[0].childNodes[1].innerText;
}

function onRemove(e){
    choisenMessage.parentNode.removeChild(choisenMessage);
     editable(false);
    choisenMessage=null;
}

function connectedToServer(e){
    var label=document.getElementById("ConnectedServer");
    if(e==true){
        if(label.classList.contains('label-danger')){
            label.classList.remove('label-danger');
            label.classList.add('label-success');
            label.textContent="Connected";
        }
    }
    else{
        if(label.classList.contains('label-success')){
            label.classList.remove('label-success');
            label.classList.add('label-danger');
            label.textContent="Disconnected";
        }
    }
}

function takeDate(){
    var date = new Date();
    var time = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + "<br>";
    time += ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    time += ':' + ('0' + date.getSeconds()).slice(-2);
    return time;
}

function onResizeDocument(e) {
    var allHeight = document.getElementsByTagName('html')[0].clientHeight;
    var inputHeight = document.getElementById('Entered-Text').clientHeight;
    var navbarHeight = document.getElementsByClassName('navbar')[0].clientHeight;
    var merges=90;
    var height = allHeight  - inputHeight -navbarHeight-merges;
    height = height.toString() + 'px';
    document.getElementsByClassName('my-table')[0].style.height = height;
}
}()
)
