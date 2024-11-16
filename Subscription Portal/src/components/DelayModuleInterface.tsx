import React, { useState } from 'react';
import styled from 'styled-components';
import { getDelayModule } from './gnosis-pay.js';
import GnosisPayErc20Transfer from './GnosisPayErc20Transfer.jsx';

// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const Form = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const DelayText = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #fff;
`;

export function DelayModuleInterface() {
  const [address, setAddress] = useState('');
  const [delayModAddress, setDelayModAddress] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const delayMod = await getDelayModule(address);
      setDelayModAddress(delayMod || 'Not found');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Heading>Pay with Gnosis Pay</Heading>
      <Form onSubmit={handleSubmit}>
        <label>
          Gnosis Safe Address:
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <Button type="submit">Find Delay Module</Button>
      </Form>
      <div>
        <DelayText>Delay Module Address: {delayModAddress}</DelayText>
      </div>
        <GnosisPayErc20Transfer delayModAddress={delayModAddress} />
    </Container>
  );
}
