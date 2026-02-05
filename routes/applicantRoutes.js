import express from "express";
import Applicant from "../models/applicantSchema.js";
import Event from "../models/eventSchema.js";
import Partnership from "../models/partnershipSchema.js";
import { applicantData, eventData, partnershipData } from "../utilities/data.js";

const router = express.Router();

//  Seed Route 
router.get("/seed-all", async (req, res, next) => {
    try {
        await Applicant.deleteMany({});
        await Event.deleteMany({});
        await Partnership.deleteMany({});

        await Applicant.insertMany(applicantData);
        await Event.insertMany(eventData);
        await Partnership.insertMany(partnershipData);

        res.status(201).json({
            message: "Database fully seeded!",
            counts: {
                applicants: applicantData.length,
                events: eventData.length,
                partnerships: partnershipData.length
            }
        });
    } catch (err) {
        next(err);
    }
});

// Applicant Routes
router.route("/")
    .post(async (req, res, next) => {
        try {
            let newApplicant = await Applicant.create(req.body);
            res.status(201).json(newApplicant);
        } catch (err) { next(err); }
    })
    .get(async (req, res, next) => {
        try {
            let allApplicants = await Applicant.find({});
            res.json(allApplicants);
        } catch (err) { next(err); }
    });

// Events Routes
router.route("/events")
    .post(async (req, res, next) => {
        try {
            let newEvent = await Event.create(req.body);
            res.status(201).json(newEvent);
        } catch (err) { next(err); }
    })
    .get(async (req, res, next) => {
        try {
            const events = await Event.find().sort({ date: 1 });
            res.json(events);
        } catch (err) { next(err); }
    });

// Partnerships Routes
router.route("/partnerships")
    .post(async (req, res, next) => {
        try {
            let newPartnership = await Partnership.create(req.body);
            res.status(201).json(newPartnership);
        } catch (err) { next(err); }
    })
    .get(async (req, res, next) => {
        try {
            const perks = await Partnership.find({ isActive: true });
            res.json(perks);
        } catch (err) { next(err); }
    });

// Individual Applicant CRUD
router.route("/:id")
    .put(async (req, res, next) => {
        try {
            let updatedApplicant = await Applicant.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedApplicant) return res.status(404).json({ error: "Applicant Not Found" });
            res.json(updatedApplicant);
        } catch (err) { next(err); }
    })
    .delete(async (req, res, next) => {
        try {
            let deletedApplicant = await Applicant.findByIdAndDelete(req.params.id);
            if (!deletedApplicant) return res.status(404).json({ error: "Applicant Not Found" });
            res.json({ message: "Deleted successfully", deletedApplicant });
        } catch (err) { next(err); }
    });

// Filtered Route
router.get("/:id/category", async (req, res, next) => {
    try {
        let currentApplicant = await Applicant.findById(req.params.id);
        if (!currentApplicant) return res.status(404).json({ error: "Applicant Not Found" });

        const othersInIndustry = await Applicant.find({
            industry: currentApplicant.industry,
            _id: { $ne: currentApplicant._id }
        });

        res.json({
            industry: currentApplicant.industry,
            count: othersInIndustry.length,
            members: othersInIndustry
        });
    } catch (err) { next(err); }
});

export default router;