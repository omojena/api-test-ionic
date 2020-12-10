const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}};
const UserSchema = new Schema({
    username: {
        type: String,
    },
    fullName: {
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    },
}, options);
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
UserSchema.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('User', UserSchema);

