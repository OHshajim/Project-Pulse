import { Schema, model, models } from "mongoose";

const RiskSchema = new Schema(
    {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 120,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: ["open", "resolved"],
            default: "open",
            index: true,
        },
        mitigationPlan: {
            type: String,
            trim: true,
        },
        resolvedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

export default models.Risk || model("Risk", RiskSchema);
