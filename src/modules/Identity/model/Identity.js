const mongoose = require('mongoose');
const auto_populate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;
const options = {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}};
const IdentitySchema = new Schema({
    mrz: {
        type: String
    },
    document_type: {
        type: String
    },
    country: {
        type: String
    },
    last_name: {
        type: String
    },
    first_name: {
        type: String
    },
    document_no: {
        type: String
    },
    document_checknumber: {
        type: String
    },
    correct_document_checknumber: {
        type: String
    },
    nationality: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    birth_checknumber: {
        type: String
    },
    correct_birth_checknumber: {
        type: String
    },
    sex: {
        type: String
    },
    date_of_expiry: {
        type: String
    },
    expiry_checknumber: {
        type: String
    },
    correct_expiry_checknumber: {
        type: String
    },
    other_id: {
        type: String
    },
    other_id_checknumber: {
        type: String
    },
    second_row_checknumber: {
        type: String
    },
    correct_second_row_checknumber: {
        type: String
    },
    flag: {
        type: String
    },
    result: {
        type: String
    },
    details: {
        type: String
    },
    face_image: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        autopopulate: true
    },

}, options);
IdentitySchema.plugin(auto_populate);
module.exports = mongoose.model('Identity', IdentitySchema);
