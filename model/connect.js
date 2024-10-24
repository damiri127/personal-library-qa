const mongoose = require('mongoose');
mongoose.connect(process.env.DB);
const modelDB = mongoose.model("modelDB", {
    title: {
        type: String,
        required: true
    },
    commentcount:{
        type: Number
    },
    comments: [String],
});

module.exports = {modelDB};