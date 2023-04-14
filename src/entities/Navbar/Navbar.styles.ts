import styled from 'styled-components';

const Nav = styled.nav`
  margin: 10px 0 10px 0;

  & img {
    width: 40px;
    height: 40px;
  }

  & ul {
    list-style: none;
  }

  & li {
    padding: 0 10px 0 0;
  }

  & li a {
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1550px) {
    padding: 0 20px;
  }
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

  & ul li {
    border-radius: 1000px;
    padding: 8px 13px;
    color: white;
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
  background: #3a3a41;
  border-radius: 20px;
  padding: 25px 28px;
  top: 53px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;

  div {
    .titleDrop {
      color: #8e8e8f;
      padding: 0 13px 8px 13px;
    }

    ul {
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
  border: 1px solid #f7f7f8;
  border-radius: 4px;
  padding: 8px 20.5px;
  background: none;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;

  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: #f7f7f8;

  &:hover {
    cursor: pointer;
    background: #f7f7f8 !important;
    color: black;
  }
`;

export { Block, ConnectWallet, Container, DropDownBlock, Menu, Nav };
