const Product = require('../model/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { options } = require('../routes/product');
const { response } = require('express');
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
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }
        // Pagination
        // limit: Số phần tử(object) lấy về 1 lần gọi API
        // skip: Bỏ qua bao nhiêu cái rồi mới lấy API (1 2 3 ... 10) 
        // +2 => 2
        // +asdasd => NaN
        const page = +req.query.page || 1
        const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
        const skip = (page - 1) * limit
        queryCommand.skip(skip).limit(limit)
        //  Execute query
        // Số lượng sản phẩm thỏa mãn điều kiện !== số lượng trả về 1 lần gọi API
        const response = await queryCommand.exec();
        const counts = await Product.find(formattedQueries).countDocuments();
        return res.status(200).json({
            success: true,
            counts,
            products: response.length ? response : 'Không tìm thấy sản phẩm',

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
//  Đánh giá
const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, productId } = req.body
    if (!star || !productId) throw new Error('Missing Inputs')
    const ratingProduct = await Product.findById(productId)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy?.toString() === _id)
    console.log({ alreadyRating });
    if (alreadyRating) {
        // update star & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating }
        }, {
            $set: {
                'ratings.$.star': star,
                'ratings.$.comment': comment
            }
        }, { new: true })
    } else {
        // add star & comment
        await Product.findByIdAndUpdate(productId, {
            $push: { ratings: { star, comment, postedBy: _id } }
        })
    }

    // total Rating 
    const updatedProduct = await Product.findById(productId)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10

    await updatedProduct.save()
    return res.status(200).json({
        success: true,
        updatedProduct
    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    ratings
}