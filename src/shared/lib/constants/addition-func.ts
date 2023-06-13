const formatter = Intl.NumberFormat('en', {
  notation: 'compact'
});

const formatNumberWithCommas = (number: number | string | null) => {
  if (number === null) {
    return 0;
  }

  if (typeof number === 'number') {
    return Math.floor(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const toDayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatBalance = (rawBalance: string) => {
  return (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
};

const formatChainAsNum = (chainIdHex: string) => {
  return parseInt(chainIdHex);
};

const formatAddress = (addr: string) => {
  return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
};

export {
  formatAddress,
  formatBalance,
  formatChainAsNum,
  formatNumberWithCommas,
  formatter,
  toDayDate
};
