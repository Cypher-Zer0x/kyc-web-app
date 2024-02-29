import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import HarpieCheck from '../components/HarpieCheck';

const BackgroundCheck: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ marginBottom: '10px', mt: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h4" component="p" sx={{ mt: 2, textAlign: 'center' }}>
              Verify Address Eligibility with Harpie!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 4, textAlign: 'justify' }}>
              In order to use Cypher Zer0x,<b> your address must not be linked to any malicious activity.</b><br></br>
              Before starting the process with PolygonID, you can verify your address with Harpie to avoid any surprises during the KYC process.
            </Typography>
            <HarpieCheck />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BackgroundCheck;
