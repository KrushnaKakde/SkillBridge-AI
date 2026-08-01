const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173"

app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())
app.use(cors({
    origin: clientOrigin,
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err)
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong on the server.",
        error: process.env.NODE_ENV === "production" ? undefined : err.stack
    })
})


module.exports = app