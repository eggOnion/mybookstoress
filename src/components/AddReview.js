import React, { useState } from "react";
import axios from "axios";

import "../styles/addReview.css";

function AddReview({ isbn, onReviewAdded }) {
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setError("Review cannot be empty.");
      return;
    }

    try {
      // Make API request to submit the review
      const response = await axios.put(
        `https://mybookstoress-backend.vercel.app/auth/review/${isbn}?review=${encodeURIComponent(
          review
        )}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT Token
          },
        }
      );      
      onReviewAdded(response.data.reviews);
      
      setReview("");
      setError(null);
    } catch (err) {
      console.error("Failed to add review:", err);
      setError("Failed to add review! Please login or try again.");
    }
  };

  return (
    <div className="add-review">
      <form onSubmit={submitReview}>
        <div
          style={{            
            alignItems: "center",
            marginTop: "-20px",
          }}
        >
          <input
            style={{ width: "255px" }}
            type="text"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      
      {error && (
        <div className="error-popup">
          <p>{error}</p>
          <button onClick={() => setError("")}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AddReview;
