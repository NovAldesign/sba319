import express from "express";
import Applicant from "../models/applicantSchema.js";
import data from "../utilities/data.js";

const router = express.Router();

// Seed Route to get data
// router.get("/seed", async (req, res) => {
//   try {
//     await Applicant.deleteMany({});
//     await Applicant.create(data);

//     res.send("Seeded Database");
//   } catch (error) {
//     console.error(error.message);
//     res.send("Seed failed");
//   }
// });

// Create
router
    .route("/")
    .post(async (req, res) => {
        let newApplicant = await Applicant.insertOne(req.body);

        res.json(newApplicant);
    })

    // Read (Show All)
    .get(async (req, res) => {
        let allApplicants = await Applicant.find({});

        res.json(allApplicants);
    });

// Update
router
    .route("/:id")
    .put(async (req, res) => {
        let updatedApplicant = await Applicant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },

        );

        if (!updatedApplicant) return res.status(404).json({ error: "Applicant Not Found" });

        res.json(updatedApplicant);
    })

    // Delete
    .delete(async (req, res) => {
        let deletedApplicant = await Applicant.findByIdAndDelete(req.params.id);

        if (!deletedApplicant) return res.status(404).json({ error: "Applicant Not Found" });

        res.json(deletedApplicant);
    });



// Gell all other applicants in that category
router
.get("/:id/category", async (req, res, next) => {
    try {
        let currentApplicant = await Applicant.findById(req.params.id);

        if (!currentApplicant) {
            return res.status(404).json({ error: "Applicant Not Found" });
        }

    // 2. Find everyone else in that same industry
        // Used $ne (not equal) to exclude the current person from the list
        const othersInIndustry = await Applicant.find({
            industry: currentApplicant.industry,
            _id: { $ne: currentApplicant._id } 
        });

        // 3. Send back the list
        res.json({
            industry: currentApplicant.industry,
            count: othersInIndustry.length,
            members: othersInIndustry
        });

    } catch (err) {
        next(err); // Send to your global error handler
    }
});

export default router;