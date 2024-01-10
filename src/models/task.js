const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },
    done: { type: String, default: 'to-do' },
    checkList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CheckList',
        required: true
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', taskSchema)