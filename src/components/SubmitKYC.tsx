import React from 'react';
import { useAccount } from 'wagmi';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Mumbai_QR_Code from "../assets/QR_codes/mumbai_verif_qrcode.png";

// Définir qrCodesByNetwork comme un Record<number, string>
const qrCodesByNetwork: Record<number, string> = {
  48899 : 'url_to_zircuit_testnet_qr_code.png', // Zircuit Testnet
  2525 : 'url_to_injective_testnet_qr_code.png', // Injective Testnet
  9090 : 'url_to_inco_gentry_testnet_qr_code.png', // Inco Gentry Testnet
  80001 : Mumbai_QR_Code, // Mumbai Testnet
  11155111 : 'url_to_sepolia_qr_code.png', // Sepolia
  59140 : 'url_to_linea_testnet_qr_code.png', // Linea Testnet
  1313161555 : 'url_to_aurora_testnet_qr_code.png', // Aurora Testnet
  51 : 'url_to_xdc_testnet_qr_code.png', // XDC Testnet
  23295 : 'url_to_oasis_testnet_qr_code.png', // Oasis Testnet
  296 : 'url_to_hedera_testnet_qr_code.png', // Hedera Testnet
  1287 : 'url_to_moonbase_alpha_qr_code.png', // Moonbase Alpha
};

const SubmitKYC: React.FC = () => {
  const { chain } = useAccount();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentNetworkQRCode = chain?.id ? qrCodesByNetwork[chain.id] : undefined;

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
      ✅ Submit KYC
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit KYC</DialogTitle>
        <DialogContent>
          {/* Affiche le QR code correspondant au réseau de l'utilisateur */}
          {currentNetworkQRCode ? (
            <img src={currentNetworkQRCode} alt="KYC QR Code" style={{ width: '100%' }} />
          ) : (
            <p>No QR code available for this network.</p>
          )}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} sx={{ color: "black"}}>❌ Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubmitKYC;
