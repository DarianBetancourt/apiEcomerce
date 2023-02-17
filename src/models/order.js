const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: {
        product_id : {type : String},
        quantity   : {type : Number},
        type       : Array,
        required   : true
    },
    status:{
        type     : String,
        required : true
    },
    total: {
        type : Number,
    },
    shipDate: {
        type    : Date,
        default : Date.now
    },
    complete: {
        type     : Boolean,
        required : true
    },
})

module.exports = mongoose.model("Order", orderSchema);