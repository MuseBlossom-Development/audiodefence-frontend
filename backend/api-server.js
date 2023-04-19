const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, decodeURIComponent(file.originalname));
    },
});

const upload = multer({ storage });

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(`File uploaded: ${req.file.originalname}`);
    res.sendStatus(200);
});

app.delete("/delete/:filename", (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filepath = path.join("uploads", filename);

    fs.unlink(filepath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            res.status(500).send({ message: "File deletion failed." });
        } else {
            console.log(`File deleted: ${filename}`);
            res.status(200).send({ message: "File deleted." });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});