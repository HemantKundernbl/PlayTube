// Upload Video controller

import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "title and description field is required");
  }

  const localVideoFile = req.files?.videoFile[0]?.path;
  const localVideoThumbnail = req.files?.videoThumbnail[0].path;

  if (!localVideoFile) {
    throw new ApiError(400, "video file is required");
  }
  if (!localVideoThumbnail) {
    throw new ApiError(400, "video thumbnail is required");
  }

  const video = await uploadOnCloudinary(localVideoFile);
  const videoThumbnail = await uploadOnCloudinary(localVideoThumbnail);

  if (!(video && videoThumbnail)) {
    throw new ApiError(400, "video or thumbnail file is not uploaded");
  }

  const userVideo = await Video.create({
    title,
    description,
    videoFile: video?.url,
    thumbnail: videoThumbnail?.url,
    duration: 60,
    views: 10,
    isPublished: true,
  });

  if (!userVideo) {
    throw new ApiError(400, "video is not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userVideo, "video added successfully"));
});

// Delete Video controller
// Update Video details
// Update Video Files

export { uploadVideo };
