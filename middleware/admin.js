

module.exports = function ( req, res, next ) {
    console.log(req.user);
    if (!req.user.isAdmin) return res.status(401).send('User is not authenticated as admin');
    next();
}