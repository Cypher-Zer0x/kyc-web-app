import React, { useEffect } from 'react';
import { Container, Grid, Typography, Paper, Button, Divider, Box } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';


const handleSnapConnect = async () => {
  // This resolves to the value of window.ethereum or null
  const provider: any = await detectEthereumProvider();

  // web3_clientVersion returns the installed MetaMask version as a string
  const isFlask = (
    await provider?.request({ method: 'web3_clientVersion' })
  )?.includes('flask');

  if (provider && isFlask) {

    // call zer0x-deposit-payload
    const payload = await window.ethereum.request({
      "method": "wallet_requestSnaps",
      "params": {
        "npm:cypher-zer0x": {},
      }
    });
    alert('MetaMask Flask & Cypher Zer0x SNAP successfully detected!');
  } else {
    alert('Please install MetaMask flask first');
  }
};


const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', marginTop: "20px" }}>
        Cypher Zer0x | User App
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
              <Button variant="contained" href="/zer0x-deposit" color="secondary">🚪 Enter Cypher Zer0x</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: 'lightblue', borderRadius: '15px' }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>🦊 MetaMask Snap Tutorial</b>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                To enhance your experience and security, our platform leverages MetaMask Snaps. This feature allows you to interact directly with our blockchain services securely from your MetaMask wallet. Below, you can download MetaMask Flask for Chrome or Firefox to get started.
              </Typography>
              <Box display="flex" flexDirection="row" justifyContent="space-between" gap={2}>
                <Button variant="contained" color="primary" component="a" href="https://output.circle-artifacts.com/output/job/b2655d8e-a903-4649-8cb2-eb6fa8b54cea/artifacts/0/builds-flask/metamask-flask-chrome-11.10.0-flask.0.zip" download="metamask-flask-chrome-11.10.0-flask.0.zip">⬇️ Install MetaMask Snap for Chrome</Button>
                <Button variant="contained" color="secondary" component="a" href="https://output.circle-artifacts.com/output/job/b2655d8e-a903-4649-8cb2-eb6fa8b54cea/artifacts/0/builds-flask/metamask-flask-firefox-11.10.0-flask.0.zip" download="metamask-flask-firefox-11.10.0-flask.0.zip">⬇️ Install MetaMask Snap for Firefox</Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <b>For Google Chrome:</b> unzip the file, then follow <a href='https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=fr#load-unpacked'>these steps.</a><br />
                <b>For Mozilla Firefox:</b> unzip the file, navigate to the directory, then follow <a href='https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#trying_it_out'>these steps.</a>
              </Typography>
              <Box display="flex" flexDirection="row" justifyContent="center" gap={1} marginTop={"20px"}>
                <Button variant="contained" onClick={handleSnapConnect}>🦊 Install/Verify Cypher Zer0x SNAP</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
