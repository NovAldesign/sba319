import mongoose from "mongoose";

const partnershipSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    perk:{
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Legal", "Financial", "Tech", "Lifestyle"],
        index: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, 
    { timestamps: true 
});

export default mongoose.model("Partnership", partnershipSchema);