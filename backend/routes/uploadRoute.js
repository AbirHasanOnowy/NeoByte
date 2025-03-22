import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
};

const upload = multer({ storage, checkFileType });
const singleUpload = upload.single("image");

router.post("/", (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json(err.message);
    } else if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    } else if (req.file.size > 100000000) {
      return res.status(400).json({ message: "Image size is too large" });
    }
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});

export default router;
