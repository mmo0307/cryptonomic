import { useState } from 'react';

const useNavbar = () => {
  const [account, setAccount] = useState<string | null>(null);

  const getAccount = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    }
  };

  return {
    getAccount,
    account
  };
};

export { useNavbar };
