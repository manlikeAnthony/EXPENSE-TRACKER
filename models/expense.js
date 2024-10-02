const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'please provide a category']
    },
    amount: {
        type : Number,
        required : [true, 'please provide amount']
    },
    date : {
        type : Date,
        default : Date.now()
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , 'please provide user']
    }
},{timestamps : true})

module.exports = mongoose.model('Expense' , ExpenseSchema)