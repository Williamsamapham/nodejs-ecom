const ProductCategory = require("../model/productCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProductCategory = asyncHandler(async (req, res) => {
  try {
        if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const response = await ProductCategory.create(req.body);
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
const getProductCategories = asyncHandler(async (req, res) => {
  try {
    const response = await ProductCategory.find().select("title slug _id");
    res.status(200).json({
      success: true,
      getProductCategory: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không tìm được danh mục sản phẩm nào",
      error: error.message,
    });
  }
});
const updateProductCategory = asyncHandler(async (req, res) => {
  try {
    const { pcid } = req.params;
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      updatedProductCategory: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không chỉnh sửa được danh mục sản phẩm",
      error: error.message,
    });
  }
});

const deleteProductCategory = asyncHandler(async (req, res) => {
  try {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndDelete(pcid);
    res.status(200).json({
      success: true,
      deletedProductCategory: response,
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
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
};
