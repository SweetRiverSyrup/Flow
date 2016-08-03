/**
 * Created by ifabricatore on 7/25/2016.
 */

module.exports = {
    "createFlag": function(type, text, title, ref){
        if (typeof ref === 'undefined') { ref = ''; }
        var flag = "<flag-" + type + " title='" + title + "' ref='" + ref + "'>" + text + "</flag-" + type + ">";
        return flag;
    },
    "flag": function(custom){
        if (typeof custom === 'undefined') { custom = ''; }
        if (typeof custom.text === 'undefined') { custom.text = ''; }
        if (typeof custom.type === 'undefined') throw "Error, no type specified";
        function createFlag(type, text, title, ref){
            if (typeof ref === 'undefined') { ref = ''; }
            var flag = "<flag-" + type + " title='" + title + "' ref='" + ref + "'>" + text + "</flag-" + type + ">";
            return flag;
        }

        var flagCenter = $("flag-center");
        switch (custom.type){
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

        var newFlag = createFlag(custom.type, custom.text, custom.title, custom.ref);

        var results = {
            "html" : newFlag,
            "to" : custom.to
        };
        return results;
    }
};
function createFlag(type, text, title, ref){
    if (typeof ref === 'undefined') { ref = ''; }
    var flag = "<flag-" + type + " title='" + title + "' ref='" + ref + "'>" + text + "</flag-" + type + ">";
    return flag;
}

function flag(custom){
    if (typeof custom === 'undefined') { custom = ''; }
    if (typeof custom.text === 'undefined') { custom.text = ''; }
    if (typeof custom.type === 'undefined') throw "Error, no type specified";

    var flagCenter = $("flag-center");
    switch (custom.type){
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

    var newFlag = createFlag(custom.type, custom.text, custom.title, custom.ref);

    var results = {
        "html" : newFlag,
        "to" : custom.to
    };
    return results;
}