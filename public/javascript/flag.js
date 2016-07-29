/**
 * Created by ifabricatore on 7/25/2016.
 */
function createFlag(type, text, title, ref){
    if (typeof ref === 'undefined') { ref = ''; }
    var flag = "<flag-" + type + " title='" + title + "' ref='" + ref + "'>" + text + "</flag-" + type + ">";
    return flag;
}

function flag(type, text, custom){
    if (typeof custom === 'undefined') { custom = ''; }
    if (typeof text === 'undefined') { text = ''; }
    if (typeof custom.hub === 'undefined') { custom.hub = true; }

    var flagCenter = $("flag-center");



    switch (type){
        case "warn":
            custom.title = "Warning!";
            break;
        case "danger":
            custom.title = "Danger!";
            break;
        case "error":
            custom.title = "Error!";
            var $newerFlag = createFlag("danger", "Please correct the error you made in the above field", custom.title, custom.ref);

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

    var newFlag = createFlag(type, text, custom.title, custom.ref);
if(type == "error"){
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
    }else{
        $(newFlag).appendTo(flagCenter);
    }


}

}