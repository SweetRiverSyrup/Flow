var timerID = null
var timerRunning = false

function stopclock(){
    if(timerRunning)
        clearTimeout(timerID)
    timerRunning = false
}

function startclock(){
    stopclock()
    showtime()
}

function showtime(){
    var now = new Date()
    var hours = now.getHours()
    var minutes = now.getMinutes()
    var seconds = now.getSeconds()
    var timeValue = "" + ((hours > 12) ? hours - 12 : hours)
    timeValue  += ((minutes < 10) ? ":0" : ":") + minutes
    timeValue  += ((seconds < 10) ? ":0" : ":") + seconds
    timeValue  += (hours >= 12) ? " P.M." : " A.M."
    $("#face").val( moment().format('dddd, MMMM Do YYYY') + " " + timeValue );
    timerID = setTimeout("showtime()",1000)
    timerRunning = true
}

$(document).ready( () => {$('#studentCodePrompt').modal('show')} );
//START~$ save data before some idiot closes the tab without saving
window.onload = function() {
    startclock();
    //$(".panel-drawer-container").trigger('drawer:close');
    var form_items = $('form').find("input[name=StudentID],input:not([type=radio], [type=checkbox]), textarea");
    for(i=0;i<form_items.length;i++){
        item = $(form_items[i]);
        var lsItem = localStorage.getItem(item.attr('name'));
        if(lsItem !== null || lsItem != ''){
            item.val(lsItem);
        }else{
            item.val(lsItem);
        }
    }
};
window.onload();

window.onbeforeunload = function() {
    var form_items = $('form').find("input[name=StudentID],input:not([type=radio], [type=checkbox]),textarea");
    for(i=0;i<form_items.length;i++){
        item = $(form_items[i]);
            localStorage.setItem(item.attr('name'), item.val());
        //Doesn't save units, fix sometime

    }
    //alert(localStorage.getItem('tideChangeAtTime0'));
};
window.onbeforeunload();
