import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 80px;
  
  background: #3c3939;
  padding: 20px;
  border-radius: 20px;
`;

export const ItemBlock = styled.div`
  display: flex;
  gap: 5px;
`;

export const SellPrice = styled.p`
  color: red;
`;

export const BuyPrice = styled.p`
  color: #00ff00;
`;

export const ContentWrapperBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5em;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 50px;
  padding: 2.5em;
  background-color: #3c3939;
  border-radius: 20px;
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Block = styled.div`
    padding: 0 0 10px 0;
  
      input[type="text"] {
        padding: 5px;
        border: none;
        color: gray;
        
        &:focus {
          outline: none;
        }
      }
  
      select {
        color: gray;
        border: none;
        padding: 5px;
        width: 100%;
        
        option {
          color: gray;
        }

        &:focus {
          outline: none;
        }
      }
  `;