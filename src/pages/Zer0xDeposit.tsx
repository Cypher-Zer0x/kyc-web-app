import React, {useState} from 'react';
import { Container, Grid, Paper, Box, Typography, TextField, Button, Chip } from '@mui/material';
import { useAccount, useWriteContract } from 'wagmi';
import detectEthereumProvider from '@metamask/detect-provider';
const ContractABI = require('../abi/Plasma.json');
const ContractABIPolygon = require('../abi/PlasmaPolygon.json');

const Zer0xDeposit = () => {
  const { isConnected } = useAccount();
  const { chain } = useAccount();
  const [amount, setAmount] = useState("0");

  const plasmaContractAddress: Record<number, string> = {
    48899 : "0xBFA33B098a0904e362eFf7850C63d30cbd2Ff797", // Zircuit Testnet
    80001 : "0xF43a5fCa550a8b04252ADd7520caEd8dde85e449", // Mumbai Testnet
    11155111 : "0xF43a5fCa550a8b04252ADd7520caEd8dde85e449", // Sepolia
    59140 : "0xBFA33B098a0904e362eFf7850C63d30cbd2Ff797", // Linea Testnet
    1313161555 : "0xBFA33B098a0904e362eFf7850C63d30cbd2Ff797", // Aurora Testnet
    51 : "0xBFA33B098a0904e362eFf7850C63d30cbd2Ff797", // XDC Testnet
    23295 : "0xBFA33B098a0904e362eFf7850C63d30cbd2Ff797", // Oasis Testnet
    296 : "0xBFA33B098a0904e362eFf7850C63d30cbd2Ff797", // Hedera Testnet
  };

  const { data: hash, writeContract, isPending } = useWriteContract()


  if (!isConnected) {
    return (
      <Container maxWidth="xl" sx={{ marginBottom: '10px', mt: 4 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Please first connect your wallet to deposit funds. <br />
                <b>Have you passed KYC?</b> If not, please do so first. Otherwise your deposit will be reverted.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" href="/kyc-process" sx={{ textTransform: 'none' }}>
                  🕵 Start KYC Process
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const currentPlasmaContractAddress = chain?.id ? plasmaContractAddress[chain.id] as String : 'No Plasma Contract Address Found for this Chain!';
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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitting');
    const depositData = await getDepositDataFromSnap();
    console.log('depositData', depositData);
    var abi = ContractABI;
    if (chain?.id === 80001) {
      abi = ContractABIPolygon;
    }
    var amount = (event.currentTarget[0] as HTMLInputElement).value;
    console.log('amount', amount);
    console.log('currentPlasmaContractAddress', currentPlasmaContractAddress);
    console.log("depositData!.rG", depositData!.rG);
    console.log("depositData!.pubkey", depositData!.pubkey);
    console.log('abi', abi);
    writeContract({
      address: currentPlasmaContractAddress as `0x${string}`,
      abi,
      functionName: 'deposit',
      args: [depositData!.rG, depositData!.pubkey],
    });
  };

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '10px', mt: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mt: 2, textAlign: 'center' }}>
              💫 Enter Zer0x Chain 💫
            </Typography>
            {chain && (
              <Chip label={`Current Chain: ${chain.name}`} color="primary" sx={{ my: 2 }} />
            )}
            <Typography variant="body1" sx={{ my: 2 }}>
              Before proceeding with your deposit, ensure that your wallet is connected to the correct chain as indicated above. 
              The deposit will be executed on the current chain's Plasma contract address. Always verify the address,
              according to our documentation,and the amount before submitting.
              <br></br>
              <br></br>
              {chain?.id === 80001 && (
              <Box sx={{ border: '1px solid #7B1FA2', p: 2, borderRadius: '4px', mt: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  You are on Polygon Mumbai, ensure that you have submitted your KYC first.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button variant="contained" color="primary" href="/kyc-process" sx={{ textTransform: 'none' }}>
                    🕵 Start KYC Process
                  </Button>
                </Box>
              </Box>
            )}
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px', textAlign: 'center' }}>
              <TextField
                label="Amount"
                variant="outlined"
                type="float"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
                style={{ marginBottom: '20px' }}
                disabled={isPending}
              />
              <Button variant="contained" color="primary" type="submit" disabled={isPending}>
                {isPending ? 'Confirming...' : 'Deposit'} 
              </Button>
            </form>
            <Box sx={{ border: '1px solid #7B1FA2', p: 2, borderRadius: '4px', mt: 2 }}>
              <Typography variant="body2" >
                <b>Current Plasma Contract Address: {currentPlasmaContractAddress}</b>
              </Typography>
              {hash && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <b>Transaction Hash: {hash}</b>
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Zer0xDeposit;