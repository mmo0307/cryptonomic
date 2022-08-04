import styled from "styled-components";

const CoinApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
  color: #fff;
`;

const CoinSearch = styled.div`
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h1 {
    margin-bottom: 32px;
    text-align: center;
  }

  & input{
    padding-left: 16px;
    width: 300px;
    height: 50px;
    border-radius: 4px;
    border: 1px solid gray;
  }

  & input:focus{
    outline: none;
    border: 1px solid white;
  }
`;

export {CoinApp, CoinSearch};