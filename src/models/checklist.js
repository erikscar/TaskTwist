const mongoose = require('mongoose')

const checkListSchema = mongoose.Schema( {
    name: {type: String, required: true},
    image: {type: String},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

module.exports = mongoose.model('CheckList', checkListSchema)