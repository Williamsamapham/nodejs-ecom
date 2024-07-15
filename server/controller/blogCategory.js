const BlogCategory = require("../model/blogCategory");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const response = await BlogCategory.create(req.body);
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    res.status(200).json({
      success: true,
      createdProduct: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không tạo mới được danh mục sản phẩm",
      error: error.message,
    });
  }
});
const getBlogCategories = asyncHandler(async (req, res) => {
  try {
    const response = await BlogCategory.find().select("title _id");
    res.status(200).json({
      success: true,
      getBlogCategory: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không tìm được danh mục sản phẩm nào",
      error: error.message,
    });
  }
});
const updateBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { bcid } = req.params;
        if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      updatedBlogCategory: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không chỉnh sửa được danh mục sản phẩm",
      error: error.message,
    });
  }
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
  try {
    const { bcid } = req.params;
    const response = await BlogCategory.findByIdAndDelete(bcid);
    res.status(200).json({
      success: true,
      deletedBlogCategory: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không xoa được danh mục sản phẩm nao",
      error: error.message,
    });
  }
});

module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory,
};
