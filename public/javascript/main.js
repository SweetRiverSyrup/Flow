/**
 * Created by ifabricatore on 8/1/2016.
 */
window.onload = function() {
    //$(".panel-drawer-container").trigger('drawer:close');
    var form_items = $('form').find("input:not([type=radio], [type=checkbox]), textarea, unit-sel");
    for(i=0;i<form_items.length;i++){
        item = $(form_items[i]);
        var lsItem = localStorage.getItem(item.attr('id'));
        if(lsItem !== null || lsItem != ''){
            item.val(lsItem);
        }else{
            item.val(lsItem);
        }
    }
};
window.onload();

window.onbeforeunload = function() {
    var form_items = $('form').find("input:not([type=radio], [type=checkbox]), textarea, unit-sel");
    for(i=0;i<form_items.length;i++){
        item = $(form_items[i]);
            localStorage.setItem(item.attr('id'), item.val());
        //Doesn't save units, fix sometime

    }
    //alert(localStorage.getItem('tideChangeAtTime0'));
};
window.onbeforeunload();

$( document ).ready(function() {
    $(".panel-drawer-container").trigger('drawer:close');
    //$("#launchModal").trigger('click');
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: true //SET TO FALSE WHEN DEPLOYED
    });

});

$( document ).ready(function() {
    //Add the important classes back
    $("input").addClass("form-control");
    $("textarea").addClass("form-control");
    $("input[type=checkbox], input[type=radio]").removeClass("form-control");
    $(".input-group-addon.degree").addClass("hidden-xs").parent().find("input[type=text]").addClass("form-control-lean");
    //$("input[type=number],table .input-group > input[type=text]").addClass("form-control-lean");
    var unit = $("unit-sel");
    var addon = unit.parent();
    var addon_group = unit.parent().parent();
    if (addon.hasClass("input-group-addon") && addon_group.hasClass('input-group')) {
        var addar = addon_group.find("input");
        var addar_id = addar.attr('id');
        var unit_id = addar_id + "U";
        unit.attr('id', unit_id);
        unit.attr('name', unit_id)
    }


    var target = document.querySelector("#lab");

    console.log(target);

    $('body').children().find(".input-group-addon").each(function() {
        $( this ).html(  $(this).html().replace("(units)", "<unit-sel></unit-sel>")  );
    });

    //Button to clear cache
    $("#clearCache").click(function(){
        localStorage.clear();
        console.log("Cleared");
        $('input, unit-sel, textarea').each(function(){
            $( this ).val('');
        });
    });

    $(document).on('theme:dark', function(){
        $("*").css(
            {
                'color':'white',
                'border-color':'white',
                'background-color':'#222222',
            }
        );
    });
    $(document).on('theme:light', function(){
        $("*").css(
            {
                'color':'#222222',
                'border-color':'#ddd',
                'background-color':'white',
            }
        );
    });

    $(document).on('theme:change', function(){

    });


});
