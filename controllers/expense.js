const { BadRequest, NotFoundError } = require('../errors')
const Expense = require('../models/expense')
const { StatusCodes } = require('http-status-codes')



const getAllExpenses = async (req, res) => {
    const expenses = await Expense.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ expenses, count: expenses.length })
}
const getExpense = async (req, res) => {
    const { user: { userId }, params: { id: expenseId } } = req;
    const expense = await Expense.findOne({ _id: expenseId, createdBy: userId })
    if (!expense) {
        throw new NotFoundError(`expense with id ${expenseId} not found`)
    }
    res.status(StatusCodes.OK).json({ expense })
}

const createExpense = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const expense = await Expense.create(req.body)
    res.status(StatusCodes.CREATED).json({ expense })
}
const updateExpense = async (req, res) => {
    const {
        body: { category, amount },
        user: { userId },
        params: { id: expenseId }
    } = req;

    if (category === '' || amount === '') {
        throw new BadRequest('please provive a value for category and amount')
    }
    const expense = await Expense.findOneAndUpdate({ _id: expenseId, createdBy: userId }, req.body, {
        new: true,
        runValidators: true
    })
    if (!expense) {
        throw new NotFoundError(`expense with id ${expenseId} not found`)
    }
    res.status(StatusCodes.OK).json({ expense })

}
const deleteExpense = async (req, res) => {
    const { user: { userId }, params: { id: expenseId } } = req;
    const expense = await Expense.findOneAndDelete({ _id: expenseId, createdBy: userId })
    if (!expense) {
        throw new NotFoundError(`expense with id ${expenseId} not found`)
    }
    res.status(StatusCodes.OK).json({ success: [true, 'sucessfully deleted .....'], expense })
}

module.exports = {
    getAllExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense

}