module.exports = {
    successResponse: function() {
        return JSON.stringify({
            success: true
        });
    },
    errorResponse: function (errorReason) {
        return JSON.stringify({
            success: false,
            reason: errorReason
        });
    }
};