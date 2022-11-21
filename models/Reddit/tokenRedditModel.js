const mongoose = require("mongoose");

const tokenRedditSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique : true ,
        required : true,
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

const TokenReddit = mongoose.model("TokenReddit", tokenRedditSchema);

module.exports = TokenReddit;