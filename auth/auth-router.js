const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let credentials = req.body;
    let hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash;

    Users.add(credentials)
        .then(added => {
            res.status(201).json(added);
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                res.status(200).json({ message: `Welcome ${user.username}!` })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

module.exports = router;