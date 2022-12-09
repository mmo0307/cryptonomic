import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ItemPriceBlock = styled.div`
  display: flex;
  gap: 5px;
`;

export const SellPrice = styled.p`
  color: red;
`;

export const BuyPrice = styled.p`
  color: #00ff00;
`;