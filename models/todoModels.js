const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    todoName:{
        type: String,
        required: true,
    },
    todoAddress:{
        type: String,
        required: true,
    }
})

const TodoModels = mongoose.model('todo', TodoSchema)

module.exports = TodoModels