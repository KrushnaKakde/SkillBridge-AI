const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production"
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}

function signToken(user) {
    return jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            })
        }

        const cleanUsername = String(username).trim()
        const cleanEmail = String(email).trim().toLowerCase()

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            })
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username: cleanUsername }, { email: cleanEmail }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Account already exists with this email address or username"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username: cleanUsername,
            email: cleanEmail,
            password: hash
        })

        const token = signToken(user)
        res.cookie("token", token, getCookieOptions())

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Registration failed. Please try again.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        })
    }
}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }

        const cleanEmail = String(email).trim().toLowerCase()

        const user = await userModel.findOne({ email: cleanEmail })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = signToken(user)
        res.cookie("token", token, getCookieOptions())

        res.status(200).json({
            message: "User loggedIn successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Login failed. Please try again.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        })
    }
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token

        if (token) {
            await tokenBlacklistModel.create({ token })
        }

        res.clearCookie("token", getCookieOptions())

        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Logout failed. Please try again."
        })
    }
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("-password -__v")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch user details."
        })
    }
}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}