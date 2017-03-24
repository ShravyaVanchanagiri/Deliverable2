/**
 * Created by shravya on 15/3/17.
 */
var prepareRes = function (status, data, message) {
    return {
        status: status,
        data: data,
        message: message
    }
};
module.exports = prepareRes;