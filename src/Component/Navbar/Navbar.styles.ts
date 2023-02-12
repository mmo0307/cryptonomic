import styled from 'styled-components';

const Nav = styled.nav`
  padding: 0.5rem;

  & img {
    width: 50px;
    height: 50px;
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

  & li a:hover {
    background-color: aliceblue;
    color: black;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  & ul {
    display: flex;
  }
`;

export { Container, Menu, Nav };
