const axios = require("axios");
const Lead = require("../models/Lead");

exports.processBatch = async (req, res) => {
  try {
    const { names } = req.body;

    const results = await Promise.all(
      names.map(async (name) => {
        const response = await axios.get(
          `https://api.nationalize.io?name=${name}`
        );

        const countryData = response.data.country[0];
        const probability = countryData ? countryData.probability : 0;

        return {
          name,
          country: countryData ? countryData.country_id : "Unknown",
          probability,
          status: probability >= 0.6 ? "Verified" : "To Check"
        };
      })
    );

    await Lead.insertMany(results);
    res.json({ message: "Batch processed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
