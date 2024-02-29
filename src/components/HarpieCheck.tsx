import React, { useState } from 'react';
import { validateAddress } from '../api';
import { ValidateAddressResponse } from '../types';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';

const HarpieCheck: React.FC = () => {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState<ValidateAddressResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false); // Ajout pour suivre si une tentative a été faite

    const handleValidateClick = async () => {
        setResult(null); // Réinitialise le résultat précédent
        setHasAttempted(false); // Réinitialise l'état de tentative
        setIsLoading(true);
        const response = await validateAddress(address);
        setResult(response);
        setHasAttempted(true); // Marque qu'une tentative a été faite
        setIsLoading(false);
    };

    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 400,
            margin: 'auto',
            padding: 3,
            borderRadius: '8px',
            boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'background.paper',
            color: 'text.primary',
          }}
        >
            <Typography variant="h6">Verify Address eligibility with Harpie</Typography>
            <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={handleValidateClick} disabled={isLoading} sx={{ position: 'relative' }}>
                {isLoading ? (
                    <>
                        Loading...
                        <CircularProgress
                          size={24}
                          sx={{
                            color: 'primary.main',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                    </>
                ) : (
                    'Verify'
                )}
            </Button>
            {result ? (
                <Typography sx={{ color: result.isMaliciousAddress ? 'error.main' : 'success.main' }}>
                    <b>{result.isMaliciousAddress ? '🛑You are not eligible' : '✨Awesome you are eligible!'}</b>
                    <br></br>
                    {result.summary}
                </Typography>
            ) : hasAttempted && !isLoading ? (
                <Typography sx={{ color: 'error.main' }}>
                    An error occurred. Please try again.
                </Typography>
            ) : null}
        </Box>
    );
};

export default HarpieCheck;
