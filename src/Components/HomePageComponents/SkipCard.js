import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import PropTypes from 'prop-types';

// Custom Material-UI theme for the button
const theme = createTheme({
  palette: {
    brandTeal: {
      main: '#1995AD',
      light: '#A1D6E2',
      dark: '#14758B',
      contrastText: '#FFFFFF',
    },
  },
});

/**SkipCard component to display skip details*/
function SkipCard({ skipItem, openModal }) {
  // Function to handle the "Select This Skip" button click
  const handleSelectSkip = (e) => {
    e.stopPropagation(); 
    openModal(skipItem); 
  };

  
  return (
    <div className="p-10 rounded-xl flex flex-col gap-6 bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border min-h-[320px]">
      {/* Header section with skip size and hire period */}
      <div className="flex justify-between items-start">
        <h3 className="font-extrabold text-customTeal text-xl leading-tight" aria-label={`Skip size: ${skipItem.size} Cubic Yard`}>
          {skipItem.size} Cubic Yard Skip
        </h3>
        <span className="bg-customTealLight text-customTeal text-xs font-semibold px-2.5 py-0.5 rounded">
          {skipItem.hire_period_days} days hire
        </span>
      </div>

      {/* Price section */}
      <div>
        <p className="text-3xl font-extrabold text-gray-900 leading-none">
          £{skipItem.price_before_vat}
          <span className="text-base font-medium text-gray-600 ml-2">+VAT</span>
        </p>
      </div>

      {/* Features section */}
      <div className="space-y-3 text-sm flex-grow">
        {skipItem.allowed_on_road && (
          <p className="flex items-center text-green-700 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Can be placed on road
          </p>
        )}
        {skipItem.allow_backup_waste && (
          <p className="flex items-center text-green-700 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Mixed waste allowed
          </p>
        )}
      </div>

      {/* Button to select the skip */}
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          color="brandTeal"
          fullWidth
          size="large"
          sx={{
            py: 2,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1.1rem',
            borderRadius: 3,
            borderWidth: 2,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              borderWidth: 2,
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
          onClick={handleSelectSkip}
        >
          Select This Skip
        </Button>
      </ThemeProvider>
    </div>
  );
}

// Prop validation for SkipCard
SkipCard.propTypes = {
  skipItem: PropTypes.shape({
    size: PropTypes.number.isRequired,
    hire_period_days: PropTypes.number.isRequired,
    price_before_vat: PropTypes.number.isRequired,
    allowed_on_road: PropTypes.bool,
    allow_backup_waste: PropTypes.bool,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default SkipCard;