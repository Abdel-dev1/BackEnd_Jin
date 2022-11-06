const mongoose = require("mongoose");

const tokenRedditSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    access_token: {
        type: String,
        required : true,
    },
    refresh_token : {
        type : String,
        required : true
    },
    
}, { timestamps: true });

const Blog = mongoose.model("TokenReddit", tokenRedditSchema);

module.exports = TokenReddit;