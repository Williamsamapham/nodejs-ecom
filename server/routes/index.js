const userRoute = require('./user');
const productRoute = require('./product');
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = (app) => {
    app.use('/api/user', userRoute)
    app.use('/api/product', productRoute)




    app.use(notFound)
    app.use(errHandler)

}

module.exports = initRoutes