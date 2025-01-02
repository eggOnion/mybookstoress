import React from "react";

const JWTTimerDisplay = ({ counter }) => {
  return (
    <div>
      <p>
        Your JWT expires in: {Math.floor(counter / 60)}:
        {(counter % 60).toString().padStart(2, "0")} minutes.
      </p>
    </div>
  );
};

export default JWTTimerDisplay;
