const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

function extractToken(req) {
    if (req.cookies && req.cookies.token) {
        return req.cookies.token
    }
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7)
    }
    return null
}

async function authUser(req, res, next) {
    const token = extractToken(req)

    if (!token) {
        return res.status(401).json({
            message: "Authentication required. Token not provided."
        })
    }

    try {
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })
        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid or expired."
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token."
        })
    }
}

module.exports = { authUser }