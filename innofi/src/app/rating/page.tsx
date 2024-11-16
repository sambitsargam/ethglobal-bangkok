"use client";

import React, { useState } from "react";
import axios from "axios";

const BLOCKSCOUT_API_URL = "https://eth-sepolia.blockscout.com/api";
const TEST_ADDRESS = "0x9603B054aDb114B550c5f2898b37A48926d0dAb1";

interface AccountInfo {
  balance: number;
  transactionCount: number;
}

const calculateCreditScore = (accountInfo: AccountInfo): number => {
  const { balance, transactionCount } = accountInfo;

  // Simple formula for credit score (adjust as needed)
  const score = balance * 0.0001 + transactionCount * 5;

  return Math.min(Math.max(score, 0), 100); // Cap score between 0 and 100
};

const OnchainCreditScore: React.FC = () => {
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingChecks, setRemainingChecks] = useState<number>(3);

  const fetchAccountInfo = async (): Promise<AccountInfo> => {
    try {
      const [balanceResponse, txCountResponse] = await Promise.all([
        axios.get(`${BLOCKSCOUT_API_URL}?module=account&action=balance&address=${TEST_ADDRESS}`),
        axios.get(`${BLOCKSCOUT_API_URL}?module=account&action=txlist&address=${TEST_ADDRESS}`),
      ]);

      const balance = parseFloat(balanceResponse.data.result) / 1e18; // Convert wei to ETH
      const transactionCount = txCountResponse.data.result.length;

      return { balance, transactionCount };
    } catch (err) {
      throw new Error("Failed to fetch account information.");
    }
  };

  const handleCalculate = async () => {
    if (remainingChecks <= 0) {
      // Redirect to subscription page
      window.location.href = "http://localhost:3001";
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accountInfo = await fetchAccountInfo();
      const score = calculateCreditScore(accountInfo);
      setCreditScore(score);

      setRemainingChecks((prev) => prev - 1); // Decrement remaining checks
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>On-Chain Credit Score</h1>
      <p style={styles.address}>Address: {TEST_ADDRESS}</p>
      <button
        onClick={handleCalculate}
        style={{
          ...styles.button,
          ...(loading ? styles.loadingButton : {}),
        }}
        disabled={loading || remainingChecks <= 0}
      >
        {loading ? (
          <span className="spinner" style={styles.spinner}></span>
        ) : (
          "Calculate Credit Score"
        )}
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {creditScore !== null && (
        <div style={{ ...styles.result, animation: "fadeIn 0.5s" }}>
          <h3 style={styles.score}>Your Credit Score: {creditScore.toFixed(2)}</h3>
        </div>
      )}
      <p style={styles.remaining}>Remaining checks: {remainingChecks}</p>
      {remainingChecks <= 0 && (
        <div style={styles.subscription}>
          <p style={styles.warning}>You have reached your limit of free checks.</p>
          <button
            onClick={() => (window.location.href = "http://localhost:3001")}
            style={styles.subscriptionButton}
          >
            Buy Subscription
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center" as "center",
    fontFamily: "'Roboto', sans-serif",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  address: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#666",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    transition: "background-color 0.3s",
  },
  loadingButton: {
    backgroundColor: "#0056b3",
    cursor: "not-allowed",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid #fff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#333",
  },
  score: {
    fontSize: "20px",
    fontWeight: "bold" as "bold",
    color: "#28a745",
  },
  remaining: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#666",
  },
  subscription: {
    marginTop: "20px",
    textAlign: "center" as "center",
  },
  warning: {
    color: "red",
    marginBottom: "10px",
  },
  subscriptionButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Global animation keyframes
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(globalStyle);

export default OnchainCreditScore;
