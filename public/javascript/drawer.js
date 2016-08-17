/**
 * Created by ifabricatore on 8/5/2016.
 */
$(document).ready(function () {

    $(".panel-drawer-container").css({
        'opacity': '1',
        'position': 'fixed',
        'right': '0',
        'top': '0',
        'z-index': '99999',
        'margin-right': '0px',
        'border-right': '0px',
        'width': 'var(--panel-drawer-container-width, 205.16px)',
    });
    $(".panel-drawer").css({
        'border-radius': '1px',
        'box-shadow': '0px -2px 10px 0.1px #ddd',
        'border-color': 'transparent',
        'height': '9999999px',
        'overflow-y': 'hidden',
        'overflow-x': 'hidden',
        'width':'var(--panel-drawer-width, inherit)'
    });
    $(".panel-drawer-body").css({
        'height': 'inherit',
        'padding': '12px',
        'overflow-x': 'hidden',
        'width':'var(--panel-drawer-body-width, inherit)'
    });
    $(".panel-drawer-body > *:not(.panel-drawer-head)").css({
        'margin-bottom': '20px'
    });
    $(".panel-drawer-body > div.panel-drawer-head").css({
        'font-weight': 'bold',
        'padding-top': '4px',
        'padding-bottom': '2.5px',
        'margin-bottom': '15px',
        'border-bottom': '0.25px solid #eee',
    });
    $(".panel-drawer-body > div.panel-drawer-head > div.panel-drawer-title").css({
        'font-size': '1.4em',
    });


    $(".drawer-toggle").click(function () {
        var drawer = $(" .panel-drawer-container ");
        drawer.trigger('drawer:toggle');
    });

    $(".panel-drawer-container").on('drawer:open', function(){
        $( this ).addClass("opened");
        if($(this).hasClass("closed")){ $(this).removeClass('closed')}
        $( this ).animate({
            opacity: 1,
            right: "+=200%"
        }, 800, function () {

        });
    });

    $(".panel-drawer-container").on('drawer:close', function(){
        $( this ).addClass("closed");
        if($(this).hasClass("opened")){ $(this).removeClass('opened')}
        $( this ).animate({
            opacity: 1,
            right: "-=200%"
        }, 800, function () {

        });
    });

    $(".panel-drawer-container").on('drawer:toggle', function () {
        var drawer = $(this);
        if (drawer.is(".opened")) {
            drawer.trigger('drawer:close');
        } else if (drawer.is(".closed")) {
            drawer.trigger('drawer:open');
        }


        /*
         if($(this).hasClass('pressed')){
         $(".panel-drawer-container")
         $(this).removeClass('pressed');
         }else if (!$(this).hasClass('pressed')) {
         $(".panel-drawer-container").animate({
         opacity: 1,
         right: "-=50%"
         }, 800, function () {

         })
         .append("<div>").addClass();
         $(this).addClass('pressed');
         }*/
    });
});