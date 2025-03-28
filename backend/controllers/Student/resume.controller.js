const User = require("../../models/user.model.js");
const cloudinary = require("../../config/Cloudinary.js");

const UploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No resume uploaded" });
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ msg: "Student not found!" });
    }

    // Delete old resume from Cloudinary if exists
    if (user.studentProfile.resume) {
      const oldResumeUrl = user.studentProfile.resume;
      const oldResumeFileName = oldResumeUrl.substring(oldResumeUrl.lastIndexOf("/") + 1);
      const oldResumePublicId = `CPMS/Resume/${oldResumeFileName}`;

      const deleteResponse = await cloudinary.uploader.destroy(oldResumePublicId, { resource_type: "raw" });
    }

    // Upload resume to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "CPMS/Resume",
      resource_type: "raw",
    });

    // Update resume path in MongoDB
    user.studentProfile.resume = cloudinaryResponse.secure_url;
    await user.save();

    return res.status(200).json({ msg: "Resume uploaded successfully!", url: cloudinaryResponse.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", error });
  }
};

module.exports = UploadResume;
