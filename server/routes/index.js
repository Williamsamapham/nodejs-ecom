const userRoute = require('./user');
const productRoute = require('./product');
const blogRoute = require('./blog');
const productCategoryRoute = require('./productCategory');
const blogCategoryRoute = require('./blogCategory');
const couponRoute = require('./coupon');
const orderRoute = require('./order');
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRoute)
    app.use('/api/product', productRoute)
    app.use('/api/blog', blogRoute)
    app.use('/api/prodcategory', productCategoryRoute)
    app.use('/api/blgcategory', blogCategoryRoute)
    app.use('/api/coupon', couponRoute)
    app.use('/api/order', orderRoute)


    app.use(notFound)
    app.use(errHandler)

}

module.exports = initRoutes