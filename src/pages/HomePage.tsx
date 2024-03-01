import React from 'react';
import { Container, Grid, Typography, Paper, Button, Divider, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', marginTop:"20px" }}>
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
              <Button variant="contained" href="/metamask-snap">🦊 Access Metamask SNAP</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default HomePage;
