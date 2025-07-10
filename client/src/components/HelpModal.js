import React, { useState } from 'react';
import '../styles/HelpModal.css';

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="help-button" onClick={() => setIsOpen(true)}>❓ Help</button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Need Help?</h2>
            <p>📧 Email: <a href="mailto:support@example.com">support@example.com</a></p>
            <p>🌐 Website: <a href="https://example.com" target="_blank" rel="noreferrer">example.com</a></p>
            <button className="close-button" onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
