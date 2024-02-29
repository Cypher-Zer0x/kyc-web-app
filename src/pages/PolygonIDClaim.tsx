import React, { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Button, Box, Typography, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const steps = ['Connect Wallet', 'Claim PolygonID Credential', 'Submit KYC'];

const stepDetails = [
  "Connect your wallet: You need to connect with your address and select the network you wish to be KYC'd on. This will allow you to enter and exit the protocol. You must go through the process for each network you are interested in.",
  "Claim your PolygonID Credential via PolygonID's mobile or web wallet.",
  "Submit your KYC proof to the plasma contract, and you're all set!"
];

const PolygonClaimID: React.FC = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isConnected && chainId) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [isConnected, chainId]);

  const handleClaimCredentialClick = () => {
    setActiveStep(2);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "1000px", mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Get KYC ! ✨
      </Typography>
      <Paper elevation={6} sx={{ p: 2, mb: 4, backgroundColor: '#f5f5f5', borderRadius: '15px', maxWidth: '80%' }}>
        <Typography sx={{ textAlign: 'center' }}>
          Why a KYC? We do not want Cypher Zer0x to be involved in fraudulent activities such as money laundering. To prevent this, we have implemented a whitelist system for each plasma contract specific to each network to regulate entries and exits. Moreover, addresses eligible for this whitelist are automatically subjected to a Background Check via Harpie to ensure that the address interacting with our protocol is not flagged as malicious/fraudulent.
        </Typography>
      </Paper>
      <Paper elevation={6} sx={{ p: 2, mb: 4, backgroundColor: '#e0e0e0', borderRadius: '15px', maxWidth: '80%' }}>
        <Typography sx={{ textAlign: 'center' }}>
          {stepDetails[activeStep]}
        </Typography>
      </Paper>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {activeStep === 1 && (
          <Button
            variant="contained"
            component="a"
            href="https://issuer-ui.polygonid.me/credentials/scan-link/32fa5c8c-8ae7-44ea-9813-ee6e14c50d45"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClaimCredentialClick}
          >
            Claim your PolygonID Credential
          </Button>
        )}
        {activeStep >= 2 && (
          <Button
            variant="contained"
            component={Link}
            to="/submit-kyc"
          >
            Submit KYC
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default PolygonClaimID;
