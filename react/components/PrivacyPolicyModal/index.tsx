import React, { useState, useEffect } from 'react';
import './PrivacyPolicyModal.css';

const PrivacyPolicyModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenModal', 'true');
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>x</button>
            <div className="modal-body">
              <p>
                Ao usar nosso site, você concorda com nossa <a href="/institucional/politica-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
              </p>
              <button className="accept-button" onClick={closeModal}>
                Prosseguir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyPolicyModal;
