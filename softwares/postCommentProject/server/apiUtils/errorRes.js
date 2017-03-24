/**
 * Created by shravya on 23/3/17.
 */
var errorRes = function (status , message) {
    return {
        status: status,
        message: message
    }
};
module.exports = errorRes;