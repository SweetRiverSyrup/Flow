/**
 * Created by ifabricatore on 8/1/2016.
 */
$( document ).ready(function() {
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

    var target = document.querySelector("#lab");

    console.log(target);
    var observer = new WebKitMutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            console.log("There seems to have been a change... : " + mutation.type);
            $(target).html($(target).html().replace("(units)", "test"));
        });
    });

    $('body').children().find(".input-group-addon").each(function() {
        $( this ).html(  $(this).html().replace("(units)", "test")  );
    });
});
