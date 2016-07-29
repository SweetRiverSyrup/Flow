/**
 * Created by ifabricatore on 7/14/2016.
 */
module.exports = {
    "c2f" : function(deg){
        var degf = (1.8 * deg) + 32;
        return degf;
    },
    "f2c" : function(deg){
        var degc = (deg - 32) * 0.556
            return degc;
    },
    "mph2knt" : function(mph){
        var knots = (0.8689758250925459) * mph;

        return knots;
    },
    "knt2mph" : function(knot){
        var mph = (knot)/(0.8689758250925459);

        return mph;
    },
    "ft2in":function(ft){
        var inch = ft * 12;
        return inch;
    },
    "in2ft":function(inch){
        var feet = (inch)/(12);
        return feet;
    },
    "in2cm":function(inch){
        var cm = (inch)/0.3937007874015748;
        return cm;
    },
    "cm2in":function(cm){
        var inch = 0.3937007874015748 * (cm);
        return inch;
    },
    "feet2cm":function(feet){
        var inch = feet * 12;
        var cm = (inch)/0.3937007874015748;
        return cm;
    },
    "":function(){},
    "":function(){}
};