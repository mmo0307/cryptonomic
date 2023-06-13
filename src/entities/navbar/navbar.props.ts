import { useMetaMask } from '@shared/lib/hooks/use-meta-mask';

const useNavbar = () => {
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    error,
    errorMessage,
    clearError
  } = useMetaMask();

  return {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    error,
    errorMessage,
    clearError
  };
};

export { useNavbar };
