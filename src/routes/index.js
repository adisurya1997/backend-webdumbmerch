const express = require('express')

const router = express.Router()

// Controller
const { addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { addCategory, getCategorys, getCategory, updateCategory, deleteCategory} = require('../controllers/category')
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product')
const { getTransactions, addTransaction } = require('../controllers/transaction')
const { register, login } = require('../controllers/auth')

// Middleware
const { auth } = require('../middlewares/auth')
// import middleware here
const {uploadFile} = require("../middlewares/uploadFile")

// Route
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/category', auth, addCategory)
router.get('/categorys', getCategorys)
router.get('/category/:id', auth, getCategory)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)

router.get('/products', getProducts)
router.get('/product/:id', auth, getProduct)
router.post('/product', auth, uploadFile("image"), addProduct) // place middleware before controller
router.patch('/product/:id', auth, uploadFile("image"),updateProduct)
router.delete('/product/:id', auth,deleteProduct)

router.get('/transactions', getTransactions)
router.post('/transaction', auth, addTransaction)

router.post('/register', register)
router.post('/login', login)

module.exports = router