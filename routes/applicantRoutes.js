import express from "express";


const router = express.Router();

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
router.get("/:id/category", async (req, res) => {
    try {
        let currentApplicant = await Applicant.findById(req.params.id);

        if (!currentApplicant) return res.status(404).json({ error: "Applicant Not Found" });

        let otherApplicant = await currentApplicant.getcategory();

        res.json(otherApplicant);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;