import React from 'react';
import { useAccount } from 'wagmi';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Mumbai_QR_Code from "../assets/QR_codes/mumbai_verif_qrcode.png";
import NoNeed_QR_Code from "../assets/QR_codes/no_need_qr_code.png";

// Définir qrCodesByNetwork comme un Record<number, string>
const qrCodesByNetwork: Record<number, string> = {
  48899 : NoNeed_QR_Code, // Zircuit Testnet
  2525 : NoNeed_QR_Code, // Injective Testnet
  9090 : NoNeed_QR_Code, // Inco Gentry Testnet
  80001 : Mumbai_QR_Code, // Mumbai Testnet
  11155111 : NoNeed_QR_Code, // Sepolia
  59140 : NoNeed_QR_Code, // Linea Testnet
  1313161555 : NoNeed_QR_Code, // Aurora Testnet
  51 : NoNeed_QR_Code, // XDC Testnet
  23295 : NoNeed_QR_Code, // Oasis Testnet
  296 : NoNeed_QR_Code, // Hedera Testnet
  1287 : NoNeed_QR_Code, // Moonbase Alpha
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
