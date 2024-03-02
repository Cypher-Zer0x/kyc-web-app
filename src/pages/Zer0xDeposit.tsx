import React, { useState } from 'react';
import { Container, Grid, Paper, Box, Typography, TextField, Button, Chip } from '@mui/material';
import { useAccount } from 'wagmi';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
const ContractABI = require('../abi/Plasma.json');
const ContractABIPolygon = require('../abi/PlasmaPolygon.json');

const Zer0xDeposit = () => {
  const { isConnected } = useAccount();
  const { chain } = useAccount();
  const [amount, setAmount] = useState("0");
  const [hash, setHash] = useState("");

  // detect if cypher-zer0x snap is installed
  const detectSnap = async () => {
    const provider: any = await detectEthereumProvider();
    const snaps = await provider?.request({
      method: 'wallet_getSnaps'
    });

    const isMySnapInstalled = Object.keys(snaps).includes('npm:cypher-zer0x');

    if (isMySnapInstalled) {
      console.log('Cypher Zer0x Snap is installed');
      return true;
    } else {
      console.log('Cypher Zer0x Snap is not installed');
      return false
    }
  }


  const plasmaContractAddress: Record<number, string> = {
    48899 : "0x991a0FAeE936aDDba6b444C48Ad1c8Ec04D9a208", // Zircuit Testnet
    80001 : "0xcbe5f301853d365c0B311AB331f56AAC0d39d6b0", // Mumbai Testnet
    11155111 : "0x8DbDf7A6008531ED1fB301D4d61C0a883Ae0FA0b", // Sepolia
    59140 : "0x991a0FAeE936aDDba6b444C48Ad1c8Ec04D9a208", // Linea Testnet
    1313161555 : "0x991a0FAeE936aDDba6b444C48Ad1c8Ec04D9a208", // Aurora Testnet
    51 : "0x991a0FAeE936aDDba6b444C48Ad1c8Ec04D9a208", // XDC Testnet
    23295 : "0x991a0FAeE936aDDba6b444C48Ad1c8Ec04D9a208", // Oasis Testnet
    296 : "0x991a0FAeE936aDDba6b444C48Ad1c8Ec04D9a208", // Hedera Testnet
  };

  if (!detectSnap()) {
    return (
      <Grid item xs={12} sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'lightblue', borderRadius: '15px' }}>
          <Typography variant="h6" gutterBottom component="div">
            <b>Install Metamask Flask !</b>
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
        </Paper>
      </Grid>
    );
  }
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

  const handleSnapConnect = async () => {
    // This resolves to the value of window.ethereum or null
    const provider: any = await detectEthereumProvider();
  
    // web3_clientVersion returns the installed MetaMask version as a string
    const isFlask = (
      await provider?.request({ method: 'web3_clientVersion' })
    )?.includes('flask');
  
    if (provider && isFlask) {
  
      try {
        // call zer0x-deposit-payload
        const payload = await window.ethereum.request({
          "method": "wallet_requestSnaps",
          "params": {
            "npm:cypher-zer0x": {},
          }
        });
        alert('MetaMask Flask & Cypher Zer0x SNAP successfully detected!');
      } catch (error) {
        console.error('Error while installing Cypher Zer0x SNAP');
      }
    } else {
      alert('Please install MetaMask flask first');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!await getDepositDataFromSnap()) {
        alert('Please install MetaMask flask the Cypher Zer0x snap first');
        await handleSnapConnect();
        return;
      }
      console.log('submitting');
      const depositData = await getDepositDataFromSnap();

      // console.log('depositData', depositData);
      var abi = ContractABI;
      if (chain?.id === 80001) {
        abi = ContractABIPolygon;
      }
      console.log('amount', amount);
      console.log('currentPlasmaContractAddress', currentPlasmaContractAddress);
      console.log("depositData!.rG", depositData!.rG);
      console.log("depositData!.pubkey", depositData!.pubkey);
      console.log('abi', abi);
      if (currentPlasmaContractAddress !== 'No Plasma Contract Address Found for this Chain!') {
        console.log('writing contract');
        const web3 = new Web3(window.ethereum);
        const result = await web3.eth.sendTransaction({
          to: currentPlasmaContractAddress as string,
          from: window.ethereum.selectedAddress,
          gas: 6000000, // Increase gas limit
          value: web3.utils.toWei(amount, 'ether'),
          data: web3.eth.abi.encodeFunctionCall({
            name: 'deposit',
            type: 'function',
            inputs: [
              {
                type: 'string',
                name: 'rG'
              },
              {
                type: 'string',
                name: 'pubkey'
              }
            ]
          }, [depositData!.rG, depositData!.pubkey])
        });
        console.log('result', result);
        setHash(String(result.transactionHash));
        
      }
    } catch (error) {
      console.error('Error while submitting deposit:', error);
      setHash('Error while submitting deposit');
    }
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
            <TextField
              label="Amount"
              variant="outlined"
              type="text"
              value={amount}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = inputValue.replace(',', '.').replace(/[^0-9.]/g, ''); // Remplacer les virgules par des points et supprimer les caractères non numériques
                setAmount(formattedValue);
              }}
              fullWidth
              required
              style={{ marginBottom: '20px' }}
            />


            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
              Deposit
            </Button>
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