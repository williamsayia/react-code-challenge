import React from 'react';
import PropTypes from 'prop-types';

// Modal component to display content and handle overlay clicks
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        /** Closes the modal only if the user clicks on the overlay */
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center md:items-center items-end z-50"
            onClick={handleOverlayClick} 
        >
            <div className="bg-white rounded-t-lg md:rounded-lg w-full max-w-lg p-4 md:p-6 shadow-lg animate-slide-up relative">
                {children}
                <div className="flex justify-end mt-4 md:mt-6">
                    <button
                        onClick={() => {
                            console.log('Continue button clicked');
                            onClose(); 
                        }}
                        className="bg-customTeal text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-teal-600 transition"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

// Prop validation for Modal
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Modal;