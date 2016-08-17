/**
 * Created by ifabricatore on 7/12/2016.
 */
module.exports = {
    'addslashes' : function(str){

        return (str + '')
            .replace(/[\\"']/g, '\\$&')
            .replace(/\u0000/g, '\\0')
    }
}