import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button, Box, Typography, Stepper, Step, StepLabel, Paper, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { validateAddress } from '../api'; // Assurez-vous que ce chemin est correct
import { ValidateAddressResponse } from '../types'; // Assurez-vous que ce chemin est correct

const steps = ['Connect Wallet', 'Background Check', 'Claim PolygonID Credential', 'Submit KYC'];

const stepDescriptions = [
  "🔗 You need to connect with your address and select the network you wish to be KYC'd on. This will allow you to enter and exit the protocol. You must go through the process for each network you are interested in.",
  "🕵 We ensure that the address interacting with our protocol is not flagged as malicious/fraudulent tahnks to Harpie",
  "🪪 Claim your PolygonID Credential via PolygonID's mobile or web wallet.",
  "✅ Submit your KYC proof to the plasma contract, and you're all set!"
];

const PolygonClaimID: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaliciousAddress, setIsMaliciousAddress] = useState<boolean | null>(null);

  useEffect(() => {
    if (isConnected) {
      setActiveStep(1);
    }
  }, [isConnected, address]);

  const performBackgroundCheck = async () => {
    setIsLoading(true);
    const result: ValidateAddressResponse | null = await validateAddress(address || '');
    setIsLoading(false);

    if (result && !result.isMaliciousAddress) {
      setIsMaliciousAddress(false);
      setActiveStep(2); // Proceed to the next step if address is safe
    } else {
      setIsMaliciousAddress(true); // Block if address is flagged or check fails
    }
  };

  const handleClaimCredentialClick = () => {
    setActiveStep(3); // Unlock the final step after claiming PolygonID Credential
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "1000px", mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        KYC Process ✨
      </Typography>
      
      {/* General description */}
      <Paper elevation={6} sx={{ p: 2, mb: 4, backgroundColor: '#f5f5f5', borderRadius: '15px', maxWidth: '80%', textAlign: 'center' }}>
        <Typography>
          Why a KYC? We do not want Cypher Zer0x to be involved in fraudulent activities such as money laundering. To prevent this, we have implemented a whitelist system for each plasma contract specific to each network to regulate entries and exits. Moreover, addresses eligible for this whitelist are automatically subjected to a Background Check via Harpie to ensure that the address interacting with our protocol is not flagged as malicious/fraudulent.
        </Typography>
      </Paper>
      
      {/* Step-specific description */}
      {activeStep >= 1 && activeStep <= steps.length && (
        <Paper elevation={6} sx={{ p: 2, mb: 4, backgroundColor: '#e0e0e0', borderRadius: '15px', maxWidth: '80%' }}>
          <Typography sx={{ textAlign: 'center' }}>
            {stepDescriptions[activeStep]}
          </Typography>
        </Paper>
      )}

      <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepLabel-label': { fontSize: '1.1rem', fontWeight: 'bold' }, '& .MuiSvgIcon-root': { fontSize: '1.5rem' }, width: '100%' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && activeStep === 1 && (
        <Button variant="contained" onClick={performBackgroundCheck} sx={{ mt: 2 }}>
          🕵 Perform Background Check
        </Button>
      )}
      
      {isMaliciousAddress && (
        <Paper elevation={6} sx={{ p: 2, mt: 2, backgroundColor: 'red', color: 'white', borderRadius: '15px', maxWidth: '80%', textAlign: 'center' }}>
          <Typography>
          🛑This address is flagged as fraudulent. Access denied.🛑
          </Typography>
        </Paper>
      )}
      
      {!isLoading && !isMaliciousAddress && activeStep === 2 && (
        <Button
          variant="contained"
          component="a"
          href="https://issuer-ui.polygonid.me/credentials/scan-link/32fa5c8c-8ae7-44ea-9813-ee6e14c50d45"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClaimCredentialClick}
          sx={{ mt: 2 }}
        >
          🪪 Claim your PolygonID Credential
        </Button>
      )}
      
      {!isLoading && !isMaliciousAddress && activeStep === 3 && (
        <Button variant="contained" component={Link} to="/submit-kyc" sx={{ mt: 2 }}>
          ✅ Submit KYC on-chain
        </Button>
      )}
    </Paper>
  );
};

export default PolygonClaimID;