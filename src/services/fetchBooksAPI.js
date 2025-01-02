import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://mybookstoress-backend.vercel.app";

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data; // Return books data
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Add or update a review
export const addReview = async (isbn, reviewText, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/auth/review/${isbn}`,
      {},
      {
        params: { review: reviewText },
        headers: { Authorization: `Bearer ${token}` }, // Pass JWT token for authentication
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};
