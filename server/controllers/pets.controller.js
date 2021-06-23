const Pets = require("../models/pets.model");

module.exports.createPet = (req,res) => {
    const {name, type, description, skill1, skill2, skill3, likes } = req.body;
    Pets.create({
        name,
        type,
        description,
        skill1,
        skill2,
        skill3,
        likes
    })
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.getAllPets = (req,res) => {
    Pets.find({})
        .then(pets => res.json(pets))
        .catch(err => res.json(err))
}

module.exports.getPet = (req,res) => {
    Pets.findOne({_id: req.params.id})
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.updatePet = (req, res) => {
    Pets.findOneAndUpdate({_id: req.params.id}, req.body, {
        new:true,
        runValidators: true,
        context: "query"
    })
        .then(updatedPet => res.json(updatedPet))
        .catch(err => res.json(err))
}

module.exports.deletePet = (req,res) => {
    Pets.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}