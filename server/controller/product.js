const Product = require('../model/product')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing Inputs')
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Ko tao moi duoc san pham'

    })
})
const getProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const product = await Product.findById(productId)
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : 'Ko tim thay san pham'

    })
})
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find()
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : 'Ko tim thay san pham nao'

    })
})
const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? `Product update success` : 'Not found'

    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    if (!productId) throw new Error('Missing id')
    const response = await Product.findByIdAndDelete(productId)
    return res.status(200).json({
        success: response ? true : false,
        deletedProduct: response ? `Product ${response.title} Deleted` : 'Not found'

    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
}