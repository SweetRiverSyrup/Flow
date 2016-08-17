/**
 * Created by ifabricatore on 7/29/2016.
 */



$(document).ready(function() {

    //console.log(data);
    var data = {};
    $("#ajax").click(function(e){
        e.preventDefault();
        $("input, textarea, unit-sel").not("#unitselect, input[type=radio]:not(:checked), :button").each(function () {
            var name = $(this).attr('name');
            var val;
            if (typeof $(this).attr('name') != 'undefined' && $(this).attr('name') != '') {
                // if ($(this).attr('type') === 'radio' && $(this).attr('id') !== 'netMethodTypeOptionOther') {
                //     $(this).val($(this).attr('id'));
                // }
                val = $(this).val();
                try {
                    data[name] = val;
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        });

        // makes sure that each radio button name is in the object at least once and assigns the
        // unchecked boxes an empty string so that none of the values are overwritten.
        $("input[type=radio]:not(:checked)").each(function() {
            var name = $(this).attr('name');
            if (typeof name != 'undefined' && name != '') {
                if (! (name in data)) {
                    data[name] = '';
                }
            }
        });

        $.ajax({
            type: 'POST',
            url: '/fooorm',
            data: data,
            dataType: 'json'
        }).done(function(data) {
            $("flag-danger, flag-info, flag-warn, flag-win, flag-ewarn").each(function() {
                this.remove();
            });
            console.log(data.flag);
            if (data.flag !== null) {
                flag(data.flag);
            } else {
                flag({type: 'win', text: 'Form was successfully submitted!'});
            }
        });
    });
});



