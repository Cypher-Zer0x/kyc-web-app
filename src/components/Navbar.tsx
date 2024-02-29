import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Importez Button de MUI
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Box from '@mui/material/Box'; // Importez Box de MUI

interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  let logoStyles;
  if (isMobile) {
    logoStyles = {
      maxWidth: '15vw',
      maxHeight: '8vh',
      marginRight: '2vh',
      marginLeft: '1vh',
      marginTop: '2vh',
      marginBottom: '2vh',
      borderRadius: '50%',
    };
  } else {
    logoStyles = {
      maxWidth: '20vw',
      maxHeight: '10vh',
      marginRight: '5vh',
      marginLeft: '2vh',
      marginTop: '4vh',
      marginBottom: '4vh',
      borderRadius: '50%',
    };
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(18, 18, 18, 0.2)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Cypher Zer0x" style={logoStyles} />
        </Link>
        {/* Group Buttons together to reduce spacing */}
        <Box sx={{ display: 'flex', gap: theme.spacing(2), alignItems: 'center' }}>
        <Button
            color="inherit"
            component={Link}
            to="/polygon-id-claim"
            sx={{
              border: `1px solid ${theme.palette.primary.main}`, // Bordure violette
              borderRadius: '4px', // Bordures arrondies
              padding: '6px 16px', // Ajustement de l'espacement interne
            }}
          >
            Get KYC
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/background-check"
            sx={{
              border: `1px solid ${theme.palette.primary.main}`, // Bordure violette
              borderRadius: '4px', // Bordures arrondies
              padding: '6px 16px', // Ajustement de l'espacement interne
            }}
          >
            Background Check
          </Button>
          <ConnectButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;