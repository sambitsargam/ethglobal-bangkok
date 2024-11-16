// Erc20Transfer.js
import React, { useState } from 'react';
import { encodeFunctionData, erc20Abi, parseAbi, parseEther } from 'viem';
import { useWriteContract } from 'wagmi';
import { DELAY_MOD_ABI } from './abi-delay-module.js';

export function delay(timeout = 30000) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

const createUnsignedErc20Tx = (to, value) => {
  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: 'transfer',
    args: [to, value],
  });
  console.log('UnsignedTXData', data);
  return data;
};

export function GnosisPayErc20Transfer({ delayModAddress }) {
  const {
    data: queueData,
    error: queueError,
    writeContract: queueWriteContract,
  } = useWriteContract();
  const {
    data: execData,
    error: execError,
    writeContract: execWriteContract,
  } = useWriteContract();

  const [erc20Address] = useState('0xcB444e90D8198415266c6a2724b7900fb12FC56E');
  const [recipientAddress, setRecipientAddress] = useState(
    '0xA94632B98BeeCe087d04beaC87C084aB345ff7b8'
  );

  console.log('queueData:', queueData);
  console.log('queueError:', queueError);
  console.log('queueWriteContract:', queueWriteContract);

  console.log('execData:', execData);
  console.log('execError:', execError);
  console.log('execWriteContract:', execWriteContract);
  const makeErc20TransferViaDelayModule = async () => {
    try {
      // in this case we just decided to send a very low amount
      const amount = parseEther('0.01');
      // here we're creating an "unsigned" tx that we're later sending as data to the delay mod
      const unsignedTxData = createUnsignedErc20Tx(recipientAddress, amount);

      console.log('delay mod add', delayModAddress);

      // This is sending the tx to the safe through the delay mod
      await queueWriteContract({
        address: delayModAddress,
        abi: DELAY_MOD_ABI,
        functionName: 'execTransactionFromModule',
        args: [erc20Address, 0, unsignedTxData, 0],
      });

      console.log('Now waiting for 30 seconds')
      // Now we need to wait a bit since the delay module slows down the speed at which we can communicate with it (if you followed the tutorial video the delay module is setup with 10seconds, the delay will wait 20s just to be extra sure)
      await delay();

      // This is executing the transaction on the delay module
      await execWriteContract({
        address: delayModAddress,
        abi: DELAY_MOD_ABI,
        functionName: 'executeNextTx',
        args: [erc20Address, 0, unsignedTxData, 0],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

    // CSS-in-JS styles
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column' ,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '10vh',
        width: '100%',
        background: 'linear-gradient(135deg, #74ebd5, #acb6e5)',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      },
      heading: {
        fontSize: '2rem',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        marginBottom: '20px',
      },
      form: {
        background: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '300px',
      },
      button: {
        padding: '10px 20px',
        background: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
      },
      buttonHover: {
        background: '#45a049',
      },
      delayText: {
        marginTop: '2px',
        fontSize: '1.2rem',
        color: '#fff',
      },
    };

    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Substribe via Delay Module</h2>
        <button
          style={styles.button}
          onClick={makeErc20TransferViaDelayModule}
          onMouseEnter={(e) => (e.currentTarget.style.background = styles.buttonHover.background)}
          onMouseLeave={(e) => (e.currentTarget.style.background = styles.button.background)}
        >
          Subscribe
        </button>
        <div style={styles.delayText}>
          <p>Waiting for transaction to complete...</p>
        </div>
      </div>
    );
  }
export default GnosisPayErc20Transfer;
