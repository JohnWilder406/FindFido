const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, "Pet name is required"],
        minLength: [3, "Pet Name must be at least three characters"]

    },
    type: {
        type: String,
        required: [true, "Pet type is required"],
        minLength: [3, "Pet type must be at least three characters"]

    },
    description: {
        type: String,
        required: [true, "Pet description is required"],
        minLength: [3, "Pet description must be at least three characters"]

    },
    skill1: {
        type: String,
    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    },
    likes: {
        type: Number
    }
}, {timestamps: true});

PetSchema.plugin(uniqueValidator, {message: 'Error, Pet Name must be unique'});

module.exports = mongoose.model('Pets', PetSchema);