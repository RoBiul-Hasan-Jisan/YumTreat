const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    });

// POST /api/auth/sign_up
const signUp = async (req, res, next) => {
    try {
        const { email, password, cPassword } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        if (cPassword !== undefined && password !== cPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        // role is always "user" here — admin accounts are created via the seed script, not self-service sign-up
        const user = await User.create({ email, password, role: "user" });
        const token = signToken(user);

        res.status(201).json({
            message: "Account created",
            token,
            user: { _id: user._id, email: user.email, userRole: user.role },
        });
    } catch (err) {
        next(err);
    }
};

// POST /api/auth/sign_in
const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = signToken(user);

        res.json({
            message: "Login successful",
            token,
            user: { _id: user._id, email: user.email, userRole: user.role },
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/auth/account  (protected)
const getAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            profileDetails: { _id: user._id, email: user.email, userRole: user.role },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { signUp, signIn, getAccount };
