import React, {useState} from "react";
import axios from "axios";

import "../styles/deleteReview.css";

function DeleteReview({ isbn, username, onReviewDeleted }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      console.log("MY JWT: " + localStorage.getItem("token"));
      const response = await axios.delete(
        `https://mybookstoress-backend.vercel.app/auth/review/${isbn}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //The JWT Token
          },
        }
      );

      // Call the parent handler to update the reviews
      onReviewDeleted(response.data.reviews);
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowConfirmation(true)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>

      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this review?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default DeleteReview;
