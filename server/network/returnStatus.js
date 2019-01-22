module.exports = {
    successResponse: function(additionalData) {
        return JSON.stringify({
            success: true,
            data: additionalData
        });
    },
    errorResponse: function (errorReason) {
        return JSON.stringify({
            success: false,
            reason: errorReason
        });
    }
};