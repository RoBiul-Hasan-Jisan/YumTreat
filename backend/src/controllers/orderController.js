const Order = require("../models/Order");

// POST /api/orders/place  (protected)
const placeOrder = async (req, res, next) => {
    try {
        const {
            fullName,
            address,
            city,
            postalCode,
            phone,
            note,
            payed,
            paymentMethod,
            products,
        } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Order must include at least one product" });
        }

        const order = await Order.create({
            user_id: req.user.id, // trust the authenticated user, not the client-sent user_id
            fullName,
            address,
            city,
            postalCode,
            phone,
            note,
            payed,
            paymentMethod,
            products,
        });

        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

// GET /api/orders/my-orders  (protected)
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user_id: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

// GET /api/orders/admin
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

// PATCH /api/orders/update-status/:id  (admin)
const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const allowed = ["preparing", "ready", "delivered", "cancel"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ message: `status must be one of: ${allowed.join(", ")}` });
        }

        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (err) {
        next(err);
    }
};

// PATCH /api/orders/cancel/:id  (protected — customer cancels their own order)
const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (!["preparing", "pending"].includes(order.status)) {
            return res.status(400).json({ message: "Only orders that are still preparing can be cancelled" });
        }

        order.status = "cancel";
        await order.save();

        res.json(order);
    } catch (err) {
        next(err);
    }
};

// PATCH /api/orders/complete/:id  (protected — customer confirms receipt)
const completeOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.status !== "delivered") {
            return res.status(400).json({ message: "Only delivered orders can be marked complete" });
        }

        order.isComplete = true;
        await order.save();

        res.json(order);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateStatus,
    cancelOrder,
    completeOrder,
};
