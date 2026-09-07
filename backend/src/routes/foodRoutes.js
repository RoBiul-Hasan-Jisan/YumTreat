const express = require("express");
const {
    getFoods,
    getFoodById,
    addFood,
    updateFood,
    deleteFood,
} = require("../controllers/foodController");

const router = express.Router();

// NOTE: matches the reference frontend's Admin Dashboard, which calls
// these endpoints without an auth header. For production use, wrap
// add/update/delete with requireAuth + requireAdmin from ../middleware/auth.
router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/add", addFood);
router.put("/update/:id", updateFood);
router.delete("/delete/:id", deleteFood);

module.exports = router;
