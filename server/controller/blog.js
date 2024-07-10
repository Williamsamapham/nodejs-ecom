const Blog = require('../model/blog');
const asyncHandler = require('express-async-handler');

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        return res.json({
            success: newBlog ? true : false,
            createdBlog: newBlog ? newBlog : "Blog not created"

        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})
const getBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)
        return res.json({
            success: blog ? true : false,
            getBlog: blog ? blog : "Ko tim thay bai viet"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

})
const getBlogs = asyncHandler(async (req, res) => {
    try {
        const response = await Blog.find()
        res.status(200).json({
            success: true,
            getBlogCategory: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})


const updateBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params;
        const response = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(200).json({
            success: true,
            updatedBlog: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

const deleteBlog = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params
        const response = await Blog.findByIdAndDelete(blogId)
        res.status(200).json({
            success: true,
            deletedBlog: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})
// LIKE
const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { blogId } = req.body
    if (!_id || !blogId) return res.status(400).json({ success: false, message: 'Missing Inputs' })

    try {
        const blog = await Blog.findById(blogId)
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })

        const alreadyDisLiked = blog.disLikes.find(el => el.toString() === _id)
        if (alreadyDisLiked) {
            const response = await Blog.findByIdAndUpdate(blogId, { $pull: { disLikes: _id } }, { new: true })
            return res.json({
                success: response ? true : false,
                rs: response
            })
        }

        const isLiked = blog.likes.find(el => el.toString() === _id)
        if (isLiked) {
            const response = await Blog.findByIdAndUpdate(blogId, { $pull: { likes: _id } }, { new: true })
            return res.json({
                success: response ? true : false,
                rs: response
            })
        } else {
            const response = await Blog.findByIdAndUpdate(blogId, { $push: { likes: _id } }, { new: true })
            return res.json({
                success: response ? true : false,
                rs: response
            })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})

//  DISLIKE
/*
Khi người dunfng like 1 bài blog thì:
1. Check xem người dùng đó có nhấn dislike trước đó hay không => bỏ trạng thái dislike
2. Check xem người dùng có like hay ko => bỏ like / thêm like
*/
module.exports = {
    createBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    updateBlog,
    likeBlog
}