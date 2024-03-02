import React, { useEffect } from 'react';
import { Container, Grid, Typography, Paper, Button, Divider, Box } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';

// detect if cypher-zer0x snap is installed
const detectSnap = async () => {
  const provider: any = await detectEthereumProvider();
  const snaps = await provider?.request({
    method: 'wallet_getSnaps'
  });

  const isMySnapInstalled = Object.keys(snaps).includes('npm:cypher-zer0x');

  if (isMySnapInstalled) {
    console.log('Super Snap is installed');
    return true;
  } else {
    console.log('Super Snap is not installed');
    return false
  }
}

// get deposit data from cypher-zer0x snap (rG + pubkey)
const getDepositDataFromSnap = async () => {
  if (await detectSnap()) {
    const depositData = await window.ethereum.request({
      "method": "wallet_invokeSnap",
      "params": {
        "snapId": "npm:cypher-zer0x",
        "request": {
          "method": "zer0x-deposit-payload"
        }
      }
    });

    console.log('Deposit Data:', depositData);

    return depositData as { rG: string, pubkey: string };
  }
}

const handleSnapConnect = async () => {
  // This resolves to the value of window.ethereum or null
  const provider: any = await detectEthereumProvider();

  // web3_clientVersion returns the installed MetaMask version as a string
  const isFlask = (
    await provider?.request({ method: 'web3_clientVersion' })
  )?.includes('flask');

  if (provider && isFlask) {
    console.log('MetaMask Flask successfully detected!');

    // call zer0x-deposit-payload
    const payload = await window.ethereum.request({
      "method": "wallet_requestSnaps",
      "params": {
        "npm:cypher-zer0x": {},
      }
    });
    console.log('Payload:', payload);
  } else {
    alert('Please install MetaMask flask first');
  }
};


const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', marginTop: "20px" }}>
        Cypher Zer0x | User Portal
      </Typography>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'white', borderRadius: '15px', mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Typography variant="h6" gutterBottom component="div">
              <b>🖥️ Monitor Cypher Zer0x State</b>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Click the button below to access the Cypher Zer0x Block Explorer and monitor the state of the chain.
            </Typography>
            <Button variant="contained" href="https://explorer.zer0x.xyz/" target="_blank" rel="noopener noreferrer">🔗 Access Block Explorer</Button>
          </Grid>

          <Grid item xs={12} md={2}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Divider orientation="vertical" flexItem />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', my: 2 }}>
              <Divider />
            </Box>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Typography variant="h6" gutterBottom component="div">
              <b>🕹️ Interact with Zer0x Chain</b>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              To interact with the chain, you must first complete the KYC process, then access the dedicated Cypher Zer0x MetaMask Snap application.
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" href="/kyc-process">🕵 Start KYC Process</Button>
              <Button variant="contained" onClick={detectSnap}>🦊 detect snap</Button>
              <Button variant="contained" onClick={getDepositDataFromSnap}>🦊 get deposit data from snap</Button>
              <Button variant="contained" onClick={handleSnapConnect}>🦊 connect SNAP</Button>

            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
