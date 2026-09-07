const mongoose = require("mongoose");

const orderedProductSchema = new mongoose.Schema(
    {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: String, required: true },
        note: { type: String, default: "" },
        payed: { type: String, required: true },
        paymentMethod: {
            type: String,
            enum: ["card", "cash", "bkash"],
            default: "cash",
        },
        products: { type: [orderedProductSchema], required: true },
        status: {
            type: String,
            enum: ["preparing", "ready", "delivered", "cancel"],
            default: "preparing",
        },
        isComplete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
