const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    products: {
        product_id:{type:String},
        quantity:{type:Number},
        type: Array,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Cart", cartSchema);