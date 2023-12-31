import { model, Schema } from "mongoose";

const streamSesionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const StreamSession = model("StreamSession", streamSesionSchema);
