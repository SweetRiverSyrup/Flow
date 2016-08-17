(function ($) {

    //Private debugging function
    function debug(obj) {
        //Create debugging method
    };

    $.fn.pseudo = function (options) {
        var opts = $.extend({}, $.fn.pseudo.row, options);
        
            //for (i = 1; i < $(this).children().length + 1; i++) {
            //    $(this).parent().parent().find("div").html($(this).parent().parent().html().toString().replace("(mnum)", i));
            //}
        
        return this.css({
            'border-bottom': '1px solid'
        });
    };

    $.fn.pseudo.row =
        " <div class='row'>" +
        "<div class='col-lg-1'>" +
        "(rowIndex)" +
        "</div>" +
        "<div class='col-lg-3'>" +
        "<input type='text'   id='r(col1RowNum)Nom' name='' class='form-control' placeholder='Blue Crab(2 males)'/>" +
        "</div>" +
        "<div class='col-lg-2'>" +
        "<input type='text'   id='r(col2RowNum)Total' name='' class='form-control' placeholder='2'/>" +
        "</div>" +
        "<div class='col-lg-2'>" +
        "<div class='input-group'>" +
        "<input type='number' id='r(col3RowNum)SizeOfLargest' name='' class='form-control' placeholder='' />" +
        "<div class='input-group-addon'>" +
        "<unit-sel set='metric'></unit-sel>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
        ;
    $.fn.pseudo.pseudoadd = function (ordinality) {

        //Default the ordinality if not defined
        if (typeof ordinality === 'undefined') { ordinality = 1 }
        //Instansiates `me` variable as the first pseudo table in the DOM
        //There needs to be testing here to handle if there is more than one
        var me = $(this).find('.pseudo-table');
        var meMum = me.parent();
        var comments = $( this ).find(".pseudo-table div.col-lg-12");
        comments.detach();
        me.detach();
        var kiddies = me.children().length;
        //console.log("VAR `kiddies` dump: " + kiddies);
        var rowIndex = kiddies - 1;
        //console.log("VAR `rowIndex` dump: " + rowIndex);


        for (i = 0; i < ordinality; i++) {
            var $pseudoRow = $.fn.pseudo.row;
            var pseudoRow = $pseudoRow.toString().replace("(col1RowNum)", rowIndex.toString() ).replace("(col2RowNum)", rowIndex.toString() ).replace("(col3RowNum)", rowIndex.toString() );

            //console.log("VAR `pseudoRow` dump: " + pseudoRow);
            me.append(pseudoRow.replace("(rowIndex)", rowIndex));
            rowIndex++;
        }
        me.append(comments);
        meMum.append(me);
    };

} (jQuery));