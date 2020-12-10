let User = require('../model/User');
const bcrypt = require('bcrypt');

class UserServices {

    create(user) {
        return User.create(user)
    }

    findAll() {
        return User.find();
    }

    findById(_id) {
        return User.findById(_id);
    }

    updateById(_id, user) {
        return User.updateOne({_id}, {$set: user})
    }

    delete(_id) {
        return User.remove({_id})
    }

    verifyUser(username) {
        return User.findOne({username: username});
    }

    validPassword(password_body, passwordDB) {
        return bcrypt.compareSync(password_body, passwordDB);
    }

    mapClaim(user) {
        return {
            _id: user._id,
            role: user.role,
            username: user.username,
            fullName: user.fullName,
            isVerify: user.isVerify,
        }
    }

}

module.exports = new UserServices();
