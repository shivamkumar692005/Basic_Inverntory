const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    price:
    {
        type: Number,
        required:true,
    },
    quantity:
    {
        type:Number,
        required:true,
    }
});


module.exports =  mongoose.model("Item",itemSchema);