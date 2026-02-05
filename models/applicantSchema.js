import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
    {
        category: "applicants",

        name:
        {
            type: String,
            required: true,
        },
        email:
        {
            type: String,
            unique: true,
            required: true,
        },

        phone:
        {
            type: String,
            unique: true,
            required: true,
        },

        dob:
        {
            type: String,
            required: true,
        },
        industry:
        {
            type: String,
            required: true,

        },
        tier:
            { type: String },

        status:
            { type: String },

        isFirstTimeFounder:
            { type: Boolean },


    });

export default mongoose.model("Applicants", applicantSchema);