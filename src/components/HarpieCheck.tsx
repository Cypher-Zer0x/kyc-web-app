import React, { useState } from 'react';
import { validateAddress } from '../api';
import { ValidateAddressResponse } from '../types';
import { Button, TextField, Typography, Box, CircularProgress, Chip } from '@mui/material';

const HarpieCheck: React.FC = () => {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState<ValidateAddressResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false);

    const handleValidateClick = async () => {
        setResult(null);
        setHasAttempted(false);
        setIsLoading(true);
        const response = await validateAddress(address);
        setResult(response);
        setHasAttempted(true);
        setIsLoading(false);
    };

    // Fonction pour transformer les tags en éléments lisibles
    const renderTags = (tags: ValidateAddressResponse['tags']) => {
        return Object.entries(tags).filter(([_, value]) => value).map(([key]) => (
            <Chip label={key} color="error" key={key} sx={{ mr: 1, mb: 1 }} />
        ));
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
            {result && (
                <Box sx={{ mt: 2 }}>
                    <Typography sx={{ color: result.isMaliciousAddress ? 'error.main' : 'success.main' }}>
                        <b>{result.isMaliciousAddress ? '🛑You are not eligible' : '✨Awesome, you are eligible!'}</b>
                        <br />
                    </Typography>
                    {result.isMaliciousAddress && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
                            {renderTags(result.tags)}
                        </Box>
                    )}
                </Box>
            )}
            {hasAttempted && !isLoading && !result && (
                <Typography sx={{ color: 'error.main' }}>
                    An error occurred. Please try again.
                </Typography>
            )}
        </Box>
    );
};

export default HarpieCheck;
