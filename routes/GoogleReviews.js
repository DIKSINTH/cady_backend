import express from "express";

const router = express.Router();

const PLACE_ID = "ChIJLZQxbaSEl2gRxR-g4u5m2Xk";
const API_KEY = process.env.GOOGLE_API_KEY;

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "displayName,rating,reviews",
        },
      },
    );

    const data = await response.json(); // ✅ FIXED

    console.log("Google API Response:", data);

    if (!data.reviews) {
      return res.json([]);
    }

    const latestFive = (data.reviews || []).slice(-5).reverse();

    const formattedReviews = latestFive.map((review, index) => ({
      id: index,
      name: review.authorAttribution?.displayName || "Anonymous",
      text: review.text?.text || "",
      link: review.authorAttribution?.uri || "#",
      rating: review.rating,
    }));

    res.json(formattedReviews);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json([]);
  }
});

export default router;
