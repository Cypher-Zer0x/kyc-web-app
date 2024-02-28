import React from 'react';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/system';


// Définir un composant de conteneur stylisé avec Emotion pour ajouter un espacement bas
const SpacedContainer = styled(Container)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: '10px', // Ajouter une marge de 10px en haut du conteneur
}));

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
      <h1>KYC WEB APP - Zer0x</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;