import React, { useState, useEffect } from "react";

function JWTCounter() {
  // Get the counter value from localStorage or default to 60 seconds
  const initialCounter = parseInt(localStorage.getItem("counter"), 10) || 60;
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    // Decrease the counter every second
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval); // Stop when counter reaches 0
          return 0;
        }
        const newCounter = prevCounter - 1;
        localStorage.setItem("counter", newCounter); // Store the updated counter value in localStorage
        return newCounter;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      {/* Popup Content */}
      <div className="popup-overlay">
        <div className="popup-content">
          <p style={{ fontWeight: "bold", fontStyle: "italic", color: "#a569bd" }}>
            Your JWT Expires in: {Math.floor(counter / 60)}:
            {(counter % 60).toString().padStart(2, "0")} minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JWTCounter;
