import styled from "styled-components";
//import { deviceMax } from "../../globals/styles/constants/device";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Paragraph = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: white;
`;

const Title = styled(Paragraph)<{
  mt?: string;
}>`
  margin-top: ${({ mt }) => mt ?? ""};
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: #7a7a7a;
`;

const InfoBlock = styled.div`
  width: 40%;
`;

const MediaBlock = styled.div`
  width: 20%;
  background-color: #27272a;
  border-radius: 20px;
  padding: 10px 10px;
`;

const CoinTitleBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CoinTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoinName = styled.div`
  display: flex;
  align-items: center;
`;

const Rank = styled(Paragraph)`
  background: #424242;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const Name = styled(Paragraph)`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const Symbol = styled(Paragraph)`
  font-weight: 500;
  font-size: 0.875rem;
  margin-left: 10px;
  text-transform: uppercase;
  color: #a3a1a1;
`;

const CoinButton = styled.button`
  background: #e20304;
  border: 0;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.75rem;
`;

const CoinButtonAttr = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  margin-right: 15px;
`;

const Star = styled.div`
  margin-right: 15px;
`;

const ReadMore = styled.button`
  border: 0;
  color: #cbcbcb;
  background: none;
`;

const DescriptionCoin = styled(Paragraph)``;

const Categories = styled(Paragraph)``;

const Block = styled.div`
  display: flex;
  justify-content: space-around;
`;

const BlockPrice = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.75rem;
`;

const CoinPriceVolumeInfo = styled(Paragraph)`
  font-weight: 700;
  font-size: 0.875rem;
  color: #a3a1a1;
`;

const CoinPriceVolume = styled(Paragraph)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75rem;
`;

const PercentParagraph = styled(Paragraph)<{
  flag?: boolean;
}>`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75rem;
  background: ${({flag}) => flag ? '#25582b' : '#dc262640'};
  color: ${({flag}) => flag ? '#0ffb00' : '#ef4444'};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

const PriceParagraph = styled(Paragraph)`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  margin-right: 0.5rem;
`;

const InputPriceRange = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-bottom: 0.75rem;
  height: 0.5rem;
  width: 60%;
  border-radius: 0.25rem;
  background: ${(props) =>
    `linear-gradient(to right, #34FF61 0%, #34FF61 ${props.value}%, #2E2E34 ${props.value}%, #2E2E34 100%);`};

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  ::-moz-range-thumb {
    -moz-appearance: none;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
  }
`;

const PriceRangeBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceTitle = styled.div`
  margin-bottom: 0.75rem;
`;

const PriceLowHigh = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ContainerChart = styled.div`
  display: flex;
  justify-content: center;
`;

export {
  Container,
  InfoBlock,
  MediaBlock,
  DescriptionCoin,
  Categories,
  Title,
  CoinTitleBlock,
  CoinTitle,
  CoinName,
  Rank,
  Name,
  Symbol,
  CoinButton,
  CoinButtonAttr,
  Star,
  ReadMore,
  Block,
  BlockPrice,
  CoinPriceVolumeInfo,
  CoinPriceVolume,
  PercentParagraph,
  PriceParagraph,
  InputPriceRange,
  PriceRangeBlock,
  PriceLowHigh,
  PriceTitle,
  ContainerChart
};
