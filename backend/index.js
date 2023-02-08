const express = require("express");
const app = express();
const cors = require("cors");
const { cloudinary } = require("./utils/cloudinary");

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("test")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const public_id = resources.map((file) => file.public_id);
  res.send(public_id);
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "testing_purpose_only",
    });
    console.log(uploadedResponse);
    res.json({ msg: "YAYAYA" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Somethig went wrong" });
  }
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listning on port ${port}`);
});
