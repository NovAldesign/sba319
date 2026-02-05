import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    
        date:
        {
            type: Date,
            required: true
        },

        location:
        {
            type: String,
            required: true
        },

        isVirtual:
        {
            type: Boolean,
            default: false
        },

        attendees: {
            type: Number,
            default: 0
        }
    },
        { timestamps: true });

        export default mongoose.model("Events", eventSchema);