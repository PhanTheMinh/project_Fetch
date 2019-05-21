var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../app/models/user');
var sequelize = new Sequelize('postgres://postgres:23041997@localhost:5432/TimoApp', {
    logging: console.log
})

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name']
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                // tìm trong db xem có user nào đã sử dụng facebook id này chưa
                console.log(User.findOne({
                    'facebook.id': profile.id
                }), function (err, user) {
                    if (err)
                        return done(err);
                    // Nếu tìm thấy user, cho họ đăng nhập
                    if (user) {
                        return done(null, user);
                    } else {
                        //  tạo mới user
                        var newUser = new User();
                       // console.profile();
                        newUser.id = profile.id;
                        newUser.token = token;
                        newUser.name = profile.name.givenName + ' ' + profile.name.familyName; 
                        newUser.email = profile.emails[0].value;
                        console.log(newUser.email);

                        newUser.create({id, token, name, email});
                    }
                });
            });
        }));
};