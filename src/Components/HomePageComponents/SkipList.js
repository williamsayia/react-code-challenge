import React, { useState } from 'react';
import SkipCard from './SkipCard';
import Modal from '../Common/Modal';
import PropTypes from 'prop-types';

// SkipList component to render a list of skip cards and manage modal state
function SkipList({ skips, loading, error }) {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (skip) => {
    setSelectedSkip(skip);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedSkip(null);
    setIsOpen(false);
  };

  // Render loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Render error message if an error occurs
  if (error) {
    console.error('Error fetching skips:', error);
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  // Render message if no skips are available
  if (skips.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No skips currently available
      </div>
    );
  }

  // Render skip cards and global modal
  return (
    <div>
      {/* Grid layout for skip cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skips.map((skip) => (
          <SkipCard key={skip.id} skipItem={skip} openModal={openModal} />
        ))}
      </div>

      {/* Global Modal */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          {selectedSkip && (
            <div>
              <h2 className="text-2xl font-bold mb-4" aria-label={`Skip Details for ${selectedSkip.size} Cubic Yard Skip`}>
                Skip Details
              </h2>
              <p><strong>Size:</strong> {selectedSkip.size} Cubic Yard Skip</p>
              <p><strong>Hire Period:</strong> {selectedSkip.hire_period_days} days</p>
              <p><strong>Price:</strong> £{selectedSkip.price_before_vat} +VAT</p>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// Prop validation for SkipList
SkipList.propTypes = {
  skips: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default SkipList;