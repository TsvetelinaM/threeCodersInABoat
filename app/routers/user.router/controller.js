const validator = require('../validator');
const passport = require('passport');

const init = (data) => {
    const controller = {
        validate(req, res, next) {
            validator.register(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/register');
                });
        },

        register(req, res) {
            data.users.register(req.body)
            .then((user) => {
                passport.authenticate(
                    'local',
                    {
                        successRedirect: '/dashboard',
                        failureRedirect: '/register',
                        failureFlash: true,
                    }
                )(req, res);
            })
            .catch((err) => {
                req.flash('register', err);
                return res.redirect('/register');
            });
        },

        login() {

        },
    };
    return controller;
};

module.exports = { init };
