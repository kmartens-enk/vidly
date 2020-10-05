
function authenticator(req, res, next) {
    console.log(req);
    //
    if (!req.headers.authorization) return res.status(403).send('not authenticated');
    next();
};

module.exports = authenticator;