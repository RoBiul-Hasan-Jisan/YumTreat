const express = require("express");
const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateStatus,
    cancelOrder,
    completeOrder,
} = require("../controllers/orderController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/place", requireAuth, placeOrder);
router.get("/my-orders", requireAuth, getMyOrders);

// NOTE: matches the reference frontend's Admin Dashboard, which calls
// these two endpoints without an auth header. For production use, wrap
// them with requireAuth + requireAdmin from ../middleware/auth.
router.get("/admin", getAllOrders);
router.patch("/update-status/:id", updateStatus);

router.patch("/cancel/:id", requireAuth, cancelOrder);
router.patch("/complete/:id", requireAuth, completeOrder);

module.exports = router;
