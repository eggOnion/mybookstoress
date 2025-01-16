import React from "react";

import "../styles/logoutConfirmationModal.css";

function LogoutConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes        
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmationModal;
