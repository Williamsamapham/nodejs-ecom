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
const uploadImageBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params
    if (!req.file) throw new Error('Missing Inputs')
    const response = await Blog.findByIdAndUpdate(blogId, { image: req.file.path }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? `Blog ${response.title} Updated` : 'Not found'
    })
})
module.exports = {
    createBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    updateBlog,
    uploadImageBlog
}