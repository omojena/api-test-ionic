const Identity = require('../model/Identity');

class IdentityServices {

    create(identity) {
        return Identity.create(identity)
    }

    findAll() {
        return Identity.find();
    }

    findById(_id) {
        return Identity.findById(_id);
    }

    findByUserId(_id) {
        return Identity.findOne({user_id: _id});
    }

    updateById(_id, identity) {
        return Identity.updateOne({_id}, {$set: identity})
    }

    delete(_id) {
        return Identity.remove({_id})
    }

    mapClaim(identity) {
        return {
            _id: identity._id,
            last_name: identity.last_name,
            first_name: identity.first_name,
            face_image: identity.face_image,
            country: identity.country,
            date_of_birth: identity.date_of_birth,
            sex: identity.sex
        }
    }

}

module.exports = new IdentityServices;
