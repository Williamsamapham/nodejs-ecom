const Product = require('../model/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { options } = require('../routes/product');
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
    try {
        const queries = { ...req.query };
        // Tách các trường đặc biệt ra khỏi query 
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(el => delete queries[el]);

        // Format lại các operator cho đúng cú phap mongoose
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
        const formattedQueries = JSON.parse(queryString);

        // Filtering
        if (queries?.title) formattedQueries.title = { $regex: queries.title, $options: 'i' };
        let queryCommand = Product.find(formattedQueries);

        // Sorting
        // abc, efg => [abc,efg] => abc efg
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryCommand = queryCommand.sort(sortBy);
        }

        // Fields limiting

        // Pagination

        //  Execute query
        // Số lượng sản phẩm thỏa mãn điều kiện !== số lượng trả về 1 lần gọi API
        const response = await queryCommand.exec();
        const counts = await Product.find(formattedQueries).countDocuments();
        return res.status(200).json({
            success: true,
            products: response.length ? response : 'Không tìm thấy sản phẩm',
            counts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi server',
            error: error.message
        });
    }
});


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