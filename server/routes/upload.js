const path = require("path");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2; // Assuming you've already set up Cloudinary
const router = require("express").Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the folder path where the images will be uploaded
    const uploadPath = path.join(__dirname, "uploads");

    // Check if the 'uploads' folder exists
    if (!fs.existsSync(uploadPath)) {
      // If it doesn't exist, create it
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Set the upload path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use timestamp to ensure unique file names
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to handle image upload
router.post(
  "/upload", // Use a relative route like /upload
  upload.single("image"),
  (req, res) => {
    // Check if file is uploaded
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Upload to Cloudinary
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
      // Respond with Cloudinary public_id and secure_url
      res.json({
        public_id: result.public_id,
        url: result.secure_url, // The URL of the uploaded image
      });
    });
  }
);

module.exports = router;
