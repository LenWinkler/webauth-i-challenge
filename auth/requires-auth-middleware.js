module.exports = (req, res, next) => {

    if (req.session && req.session.username) {
        next();
    } else {
        res.status(400).json({ you: 'cannot pass!' })
    }
};