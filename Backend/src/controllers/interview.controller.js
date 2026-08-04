const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * @description Sanitize a string to be used as a safe filename by removing or replacing unsafe characters.
 */
function sanitizeFileName(value) {
    if (!value) return "resume"

    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/[^a-zA-Z0-9._-]+/g, "_")
        .replace(/^_+|_+$/g, "") || "resume"
}

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume PDF file is required."
            })
        }

        const { selfDescription, jobDescription } = req.body

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message: "selfDescription and jobDescription are required."
            })
        }

        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to generate interview report.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch interview report.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        })
    }
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch interview reports.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        })
    }
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewReportId,
            user: req.user.id
        })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found or access denied."
            })
        }

        const { resume, jobDescription, selfDescription, title } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })
        const safeTitle = sanitizeFileName(title)

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${safeTitle}.pdf`
        })

        res.send(pdfBuffer)
    } catch (err) {
        res.status(500).json({
            message: "Failed to generate resume PDF.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        })
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }