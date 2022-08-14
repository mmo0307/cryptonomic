import React from "react";
import {
  Container,
  ContainerRow,
  CoinInfo,
  Paragraph,
  CoinData,
} from "./Coins.styles";
import { Link } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import { deviceMin } from "../../globals/styles/constants/device";

const Coin: React.FC<{
  id: number;
  name: string;
  image: string;
  symbol: string;
  volume: string;
  price: string;
  priceChange: number;
  marketcap: string;
}> = ({ image, name, symbol, price, volume, id, priceChange, marketcap }) => {
  const deviceLaptop = useMediaQuery(deviceMin.laptop);
  const deviceMobileL = useMediaQuery(deviceMin.mobileL);

  return (
    <Link to={`/coin/${id}`}>
      <Container>
        <ContainerRow>
          <CoinInfo>
            <img src={image} alt="crypto" />
            <h1>{name}</h1>
            {deviceMobileL ? <Paragraph>{symbol}</Paragraph> : null}
          </CoinInfo>
          <CoinData>
            <Paragraph Width="100px">${price}</Paragraph>
            {deviceLaptop ? (
              <Paragraph Width="200px">${volume.toLocaleString()}</Paragraph>
            ) : null}
            {priceChange < 0 ? (
              <Paragraph Width="80px" Color="red">
                {priceChange.toFixed(2)}%
              </Paragraph>
            ) : (
              <Paragraph Width="80px" Color="#11d811">
                {priceChange.toFixed(2)}%
              </Paragraph>
            )}
            {deviceLaptop ? (
              <Paragraph Width="240px">
                Mkt Cap: ${marketcap.toLocaleString()}
              </Paragraph>
            ) : null}
          </CoinData>
        </ContainerRow>
      </Container>
    </Link>
  );
};
 
export { Coin };
