import React, { useState, useEffect } from "react";

const JWTCounter = ({ children }) => {
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
          <p style={{fontWeight: "bold", fontStyle: "italic", color: "#a569bd"}}>
            Your JWT Token Expires in: {Math.floor(counter / 60)}:
            {(counter % 60).toString().padStart(2, "0")} minutes.
          </p>
        </div>
      </div>

      {/* Render children and pass down the counter */}
      {/* {React.Children.map(children, (child) =>
        React.cloneElement(child, { counter })
      )} */}
    </div>
  );
};

export default JWTCounter;
