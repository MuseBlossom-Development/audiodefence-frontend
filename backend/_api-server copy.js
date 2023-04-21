const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  
  const accessToken = oauth2Client.getAccessToken();
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USERNAME,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "audio/"); // 오디오 파일의 경우 'audio/' 폴더로 저장합니다.
    },
    filename: (req, file, cb) => {
        cb(null, decodeURIComponent(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // 오디오 파일만 허용합니다.
    if (file.mimetype.startsWith("audio/")) {
        cb(null, true);
    } else {
        cb(new Error("Only audio files are allowed."), false);
    }
};

const upload = multer({storage, fileFilter});
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/audio", express.static("audio")); // 오디오 파일을 제공하기 위한 미들웨어 추가

app.post("/api/upload-file", upload.single("file"), (req, res) => {
    console.log(`File uploaded: ${req.file.originalname}`);

    const isAudio = req
        .file
        .mimetype
        .startsWith("audio/");
    if (!isAudio) {
        return res
            .status(400)
            .json({error: "Only audio files are allowed."});
    }

    // 파일의 URL을 반환합니다.
    res.json({
        file_url: `http://localhost:3000/audio/${encodeURIComponent(req.file.filename)}`
    });
});

app.post("/api/save-file-info", (req, res) => {
    // 이 예제에서는 파일 정보를 저장하지 않지만, 실제로는 여기에서 파일 정보를 DB에 저장해야 합니다.
    console.log("File info:", req.body);
    res.sendStatus(200);
});

app.delete("/delete/:filename", (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    const filePath = path.join(__dirname, "audio", filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res
                .status(500)
                .send("File deletion failed.");
        } else {
            console.log(`File deleted: ${filename}`);
            res.sendStatus(200);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});