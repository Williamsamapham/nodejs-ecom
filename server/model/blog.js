const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    numViews: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimedia.vn%2Fblog-thumbnail-1&psig=AOvVaw3isWBPzb2gGH65ZMlQaZ1W&ust=1720455861221000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCv49WrlYcDFQAAAAAdAAAAABAN'
    },
    author: {
        type: String,
        default: 'Admin'
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

//Export the model
module.exports = mongoose.model('Blog', blogSchema);