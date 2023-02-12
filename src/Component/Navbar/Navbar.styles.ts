import styled from "styled-components";

const Nav = styled.nav`
  margin: 10px 0 10px 0;

  & img {
    width: 40px;
    height: 40px;
  }

  & ul {
    list-style: none;
  }

  & li a {
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  margin-left: 10px;
  width: 1467px;

  & ul {
    display: flex;
    align-items: center;

    //.textDisable{
    //  transition: .2s;
    //  color: rgba(255, 255, 255, 0.5);
    //}
    //
    //&:hover{
    //  .textDisable{
    //    background: none;
    //  }
    //}
  }
  
  & ul li{
      border-radius: 1000px;
      padding: 8px 13px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      
      .dropBlock {
        visibility: visible;
      }
    }
  }
`;

const DropDownBlock = styled.div`
  position: absolute;
  visibility: hidden;
  background: #3A3A41;
  border-radius: 20px;
  padding: 25px 28px;
  top: 50px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  
  div {
    .titleDrop{
      color: #8E8E8F;
      padding: 0 13px 8px 13px;
    }
    
    ul{
      flex-direction: column;
      align-items: flex-start;

      & li {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
`;

const ConnectWallet = styled.button`
  border: 1px solid #F7F7F8;
  border-radius: 4px;
  padding: 8px 20.5px;
  background: none;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  
  letter-spacing: 0.01em;
  text-transform: uppercase;

  color: #F7F7F8;
  
  &:hover{
    cursor: pointer;
    background: #F7F7F8 !important;
    color: black;
  }
`;

export { Nav, Container, Menu, ConnectWallet, DropDownBlock, Block };
