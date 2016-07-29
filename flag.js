/**
 * Created by ifabricatore on 7/21/2016.
 */
function addFlag(type, text, custom){
    if (typeof custom === 'undefined') { custom = ''; }

    var flagCenter = $("#flag-center");
    var flag = $("#flag-center").find(".form-flag-init");

    var newFlag = flag.clone();

    newFlag.removeClass("hidden");
    newFlag.removeClass("form-flag-init");
    newFlag.addClass("form-flag");

    newFlag.find(".form-flag-text").text(text);
    switch (type){
        case "warning":
            newFlag.find(".form-flag-title").text("Warning!");
            newFlag.addClass("alert-warning");
            newFlag.find("#flagIcon").addClass("glyphicon-exclamation-sign");
            break;
        case "caution":
            newFlag.find(".form-flag-title").text("Caution!");
            newFlag.addClass("alert-warning");
            newFlag.find("#flagIcon").addClass("glyphicon-warning-sign");
            break;
        case "danger":
            newFlag.find(".form-flag-title").text("Danger!");
            newFlag.addClass("alert-danger");
            newFlag.find("#flagIcon").addClass("glyphicon-ban-circle");
            break;
        case "error":
            newFlag.find(".form-flag-title").text("Error!");
            newFlag.find(".form-flag-text").html("A field was not filled in properly or it was left blank. Click ").append("<a class='alert-link' href='#"+custom.id+"'>here</a> to see it");
            newFlag.addClass("alert-danger");
            newFlag.find("#flagIcon").addClass("glyphicon-remove-sign");
            break;
        case "errorHere":
            newFlag.find(".form-flag-title").text("Error!");
            newFlag.find(".form-flag-text").html("The above field was not filled in properly or it was left blank.");
            newFlag.addClass("alert-danger");
            newFlag.find("#flagIcon").addClass("glyphicon-remove-sign");
            break;
        case "beware":
            newFlag.find(".form-flag-title").text("Beware!");
            newFlag.addClass("alert-danger");
            newFlag.find("#flagIcon").addClass("glyphicon-fire");
            break;
        case "info":
            newFlag.find(".form-flag-title").text("Info!");
            newFlag.addClass("alert-info");
            newFlag.find("#flagIcon").addClass("glyphicon-info-sign");
            break;
        case "success":
            newFlag.find(".form-flag-title").text("Success!");
            newFlag.addClass("alert-success");
            newFlag.find("#flagIcon").addClass("glyphicon-ok-sign");
            break;
        case "update":
            newFlag.find(".form-flag-title").text("Update!");
            newFlag.addClass("alert-info");
            newFlag.find("#flagIcon").addClass("glyphicon-gift");
            break;
        case "dataMsg":
            newFlag.find(".form-flag-title").text("Update!");
            newFlag.find(".form-flag-text").text("Are you sure everything is finished? Your data is going to be used to make" +
                " predictions about the environment in the coming years, so make sure it's correct!");
            newFlag.addClass("alert-info");
            newFlag.find("#flagIcon").addClass("glyphicon-globe");
            break;
        case "uploadComplete":
            newFlag.find(".form-flag-title").text("Update!");
            newFlag.find(".form-flag-text").text("Yay! Your data was successfully uploaded to the cloud");
            newFlag.addClass("alert-success");
            newFlag.find("#flagIcon").addClass("glyphicon-cloud-upload");
            break;
        case "custom":
            newFlag.find(".form-flag-title").text(custom.title);
            newFlag.addClass("alert-"+ custom.alertType);
            newFlag.find("#flagIcon").addClass("glyphicon-" + custom.gylphName);
            break;
        default:
            newFlag.find(".form-flag-title").text("Attention!");
            newFlag.addClass("alert-info");
            newFlag.find("#flagIcon").addClass("glyphicon-exclamation-sign");
    }


    return newFlag;
}