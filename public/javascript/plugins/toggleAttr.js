(function( $ ){
    $.fn.toggleAttr = function(attr, val){
        if ($( this ).attr(attr)) {
                $( this ).removeAttr(attr);
        } else {
            $( this ).attr(attr, val);
        }
    };
}(jQuery));