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

    findOne(query){
        return Identity.findOne(query);
    }

    updateById(_id, identity) {
        return Identity.updateOne({_id}, {$set: identity})
    }

    delete(_id) {
        return Identity.remove({_id})
    }

}

module.exports = new IdentityServices;
