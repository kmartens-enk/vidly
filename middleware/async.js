
//not used any more, it is obsoleted by the use of express-async-errors

module.exports = function ( handler ) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    }
};