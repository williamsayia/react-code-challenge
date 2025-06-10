import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import {
    LocationOn as MapMarkerIcon,
    Delete as TrashIcon,
    LocalShipping as TruckIcon,
    Assignment as ClipboardCheckIcon,
    CalendarToday as CalendarIcon,
    CreditCard as CreditCardIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

// Custom Material-UI theme for primary color
const theme = createTheme({
    palette: {
        primary: {
            main: '#1995AD', 
        },
    },
});

// Header component to render step-based navigation
function Header({ activeStep }) {
    const steps = [
        { id: 1, label: 'Postcode', icon: <MapMarkerIcon />, disabled: false }, 
        { id: 2, label: 'Waste Type', icon: <TrashIcon />, disabled: false },   
        { id: 3, label: 'Select Skip', icon: <TruckIcon />, disabled: false },  
        { id: 4, label: 'Permit Check', icon: <ClipboardCheckIcon />, disabled: true }, 
        { id: 5, label: 'Choose Date', icon: <CalendarIcon />, disabled: true }, 
        { id: 6, label: 'Payment', icon: <CreditCardIcon />, disabled: true },  
    ];

    return (
        <ThemeProvider theme={theme}>
            {/* Header container */}
            <div className="">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                    {/* Navigation bar */}
                    <div className="h-16 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-thin">
                        <div className="flex items-center space-x-4 min-w-max">
                            {/* Render steps */}
                            {steps.map((step, index) => (
                                <React.Fragment key={step.id}>
                                    <div
                                        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                                            activeStep === step.id
                                                ? 'font-semibold text-[#1995AD] bg-[#1995AD]/10' 
                                                : activeStep > step.id
                                                ? 'font-medium text-[#1995AD]' 
                                                : step.disabled 
                                                ? 'text-gray-500' 
                                                : 'text-gray-600' 
                                        }`}
                                    >
                                        {/* Render step icon */}
                                        <IconButton
                                            size="small"
                                            disabled={step.disabled} 
                                            sx={{
                                                width: 28, 
                                                height: 28, 
                                                color: 'primary.main', 
                                                mr: 1, 
                                                '&:hover': {
                                                    backgroundColor: 'transparent', 
                                                },
                                                '&.Mui-disabled': {
                                                    color: 'action.disabled', 
                                                },
                                            }}
                                        >
                                            {step.icon} 
                                        </IconButton>
                                        <span className="text-lg font-medium">{step.label}</span>
                                    </div>
                                    {/* Render chevron icon between steps */}
                                    {index < steps.length - 1 && (
                                        <ChevronRightIcon 
                                            sx={{ 
                                                color: 'action.disabled', 
                                                fontSize: 18, 
                                            }} 
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Header;