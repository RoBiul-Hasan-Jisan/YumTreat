const express = require("express");
const { signUp, signIn, getAccount } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/sign_up", signUp);
router.post("/sign_in", signIn);
router.get("/account", requireAuth, getAccount);

module.exports = router;
