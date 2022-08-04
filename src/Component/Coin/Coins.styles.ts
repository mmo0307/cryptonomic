import styled from "styled-components";
import { deviceMax } from "../../globals/styles/constants/device";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #d7d7d7;

  @media screen and ${deviceMax.mobileL} {
    width: 354px;
  }

  @media screen and ${deviceMax.mobileS} {
    width: 300px;
  }
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;
  min-width: 300px;

  & h1 {
    font-size: 16px;
    width: 150px;
  }

  & img {
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }

  @media screen and ${deviceMax.mobileL} {
    min-width: 120px;
  }
`;

const Paragraph = styled.p<{
  Width?: string;
  Color?: string;
}>`
  text-transform: uppercase;

  width: ${({ Width }) => Width ?? ""};
  color: ${({ Color }) => Color ?? ""};
`;

const CoinData = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  width: 100%;
`;

export { Container, ContainerRow, CoinInfo, Paragraph, CoinData };
