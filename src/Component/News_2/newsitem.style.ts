import styled from "styled-components";
import { deviceMax } from "../../globals/styles/constants/device";

const CardContainer = styled.div`
  width: 600px;
  height: 100%;
  border-radius: 8px;
  margin: auto;
  box-shadow: 0 2px 20px rgb(255 255 255 / 3%);
  overflow: hidden;

  &:hover{
    box-shadow: 0 2px 20px rgb(255 255 255 / 20%);
  }
`;

const CardImage = styled.div`
  & img {
    height: 220px;
    width: 100%;
    border-radius: 8px 8px 0 0;
    background-size: cover;
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  min-height: 200px;

  & h1 {
    font-size: 16px;
    margin: 8px 0;
  }

  & p {
    font-size: 14px;
    margin: 8px 0 16px 0;
  }

  & a:hover{
    background: #fff;
    color: #000;
  }
`;

const CardAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerBox = styled.section`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 16px;

  @media screen and ${deviceMax.laptop} {
    grid-template-columns: 1fr;
  }
`;

export { CardContainer, CardImage, CardBody, CardAuthor, ContainerBox };
