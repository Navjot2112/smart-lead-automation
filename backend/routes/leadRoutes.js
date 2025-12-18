const router = require("express").Router();
const { processBatch } = require("../controller/leadController");
const Lead = require("../models/Lead");

router.post("/batch", processBatch);

router.get("/", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

module.exports = router;
