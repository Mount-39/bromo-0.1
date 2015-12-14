var mongoose = require('mongoose');

// creating a schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: String
});

// on save handler, async, callback
userSchema.pre('save', true, function (next, done) {
    // email validation
    mongoose.models['user'].findOne({ email: this.email }, function (err, user) {
        if(err){
            return done(err);
        }
        if(user){
            console.log('models/user.js - error while saving, existing email');
            return done(new Error('User with this email is already exist!'));
        }
        done();
    });
    next();
});

// making a copy of schema
var userModel = mongoose.model('user', userSchema);

module.exports = userModel;