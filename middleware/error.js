
module.exports = function (err, req, res, next) {
    console.error('an error occured in a route',err);
    res.status(500).send('Something failed');
};