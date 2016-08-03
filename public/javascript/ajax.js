/**
 * Created by ifabricatore on 7/29/2016.
 */
var data = {check: true};
$(document).ready(function() {
    $("#ajax").click(function(){
        $.ajax({
            method: 'POST',
            url: '/ajax',
            data: data,
            dataType: "json"
        }).done(function(data){
            var ref = "#" + data.flag;
            console.log("done");
            console.log(data);
        });
    });
});

