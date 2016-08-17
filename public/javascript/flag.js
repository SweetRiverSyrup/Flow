/**
 * Created by ifabricatore on 7/25/2016.
 */
function createFlag(type, text, title, ref){
    if (typeof ref === 'undefined') { ref = ''; }
    var flag = "<flag-" + type + " title='" + title + "' ref='" + ref + "'>" + text + "</flag-" + type + ">";
    return flag;
}

function flag(custom) {
    if (typeof custom === 'undefined') { custom = ''; }
    if (typeof custom.text === 'undefined') {
        text = '';
    }
    if (typeof custom.hub === 'undefined') { custom.hub = true; }

    var flagCenter = $("flag-center");

    if (typeof custom.nameRef !== 'undefined') {
        custom.ref = $("[name=" + custom.nameRef + "]").attr("id");
    }
    if (typeof custom.nameTo !== 'undefined') {
        custom.to = $("[name=" + custom.nameTo + "]").attr("id");
    }

    switch (custom.type) {
        case "warn":
            custom.title = "Warning!";
            break;
        case "danger":
            custom.title = "Danger!";
            break;
        case "error":
            custom.title = "Warning!";
            var $newerFlag = createFlag("error", custom.text, custom.title, custom.ref);

            var errRef = "#" + custom.ref;
            if($(errRef).parent().hasClass('input-group') ){
                errRef = $(errRef).parent().parent();
            }else{
                errRef = $(errRef).parent();
            }

            $($newerFlag).appendTo(errRef);
            break;
        case "ewarn":
            custom.title = "Warning!";
            var $newerFlag = createFlag("ewarn", custom.text, custom.title, custom.ref);

            var errRef = "#" + custom.ref;
            if($(errRef).parent().hasClass('input-group') ){
                errRef = $(errRef).parent().parent();
            }else{
                errRef = $(errRef).parent();
            }

            $($newerFlag).appendTo(errRef);
            break;
        case "info":
            custom.title = "Info";
            break;
        case "win":
            custom.title = "Success!";
            break;
        case "custom":

            break;
        default:
            custom.title = "Attention!";
    }

    var newFlag = createFlag(custom.type, custom.text, custom.title, custom.ref);
    if (custom.type == "error") {
    $(newFlag).appendTo(flagCenter);
}else{
    if(typeof custom.to !== 'undefined' && custom.to != "hub"){
        var ref = "#" + custom.to;
        if($(ref).parent().hasClass('input-group') ){
            ref = $(ref).parent().parent();
        }else{
            ref = $(ref).parent();
        }

        $(newFlag).appendTo(ref);
    } else if (custom.to == "hub") {
        $(newFlag).appendTo(flagCenter);
    }else{
        $(newFlag).appendTo(flagCenter);
    }


}

}