import { Video } from "../models/video.js";
import { generateText } from "../utils/deepgram.js";
import path from "path";
import { __dirname } from "../utils/dirname.js";

const createVideo = async (req, res) => {
  try {
    req.files.forEach(async (file) => {
      const { filename, originalname, path } = file;
      const uploadsServer = "https://abdulhngx-cevh.onrender.com/api/uploads/";

      const videoTranscription = await generateText(file);

      const video = await Video.create({
        name: originalname,
        url: uploadsServer + filename,
        transcript: videoTranscription,
      });
      res.status(201).json({ message: "Video uploaded successfully.", video });
    });
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ message: "Error creating video.", error: error.message });
  }
};

const getAllVideao = async (req, res) => {
  try {
    const videos = await Video.find();

    res.status(200).json({ message: "All videos.", videos });
  } catch (error) {
    res.status(404).json({ message: "No video found.", error: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json({ message: "Video found.", video });
  } catch (error) {
    res.status(404).json({ message: "Video not found.", error: error.message });
  }
};

const sendVideo = async (req, res) => {
  try {
    const { videoName } = req.params;
    const uploadsDir = path.join(__dirname, "../uploads");

    res.sendFile(path.join(uploadsDir, videoName));
  } catch (error) {}
};

const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findByIdAndDelete(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json({ message: "Video deleted successfully." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting video.", error: error.message });
  }
};

export { createVideo, getAllVideao, getVideo, deleteVideo, sendVideo };
