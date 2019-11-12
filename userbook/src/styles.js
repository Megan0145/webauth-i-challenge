import styled from "styled-components";

export const StyledNav = styled.nav`
  background-color: whitesmoke;
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey;
  div {
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.2rem;
    a {
      text-decoration: none;
      color: grey;
      &.active {
        color: #f1957e;
      }
    }
    button {
      background-color: #f1957e;
      cursor: pointer;
      width: 6rem;
      height: 2rem;
      border: none;
      border-radius: 5px;
      color: whitesmoke;
      font-size: 1.1rem;
    }
  }
`;

export const StyledHome = styled.div`
  background-color: #dedede;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  .jumbo {
    background-image: url("jumbo.jpg");
    background-size: 100vw;
    background-repeat: no-repeat;
    width: 100%;
    max-height: 80vh;
    display: flex;
    align-items: center;
    h1 {
      color: white;
      margin-left: 5rem;
      font-size: 6vw;
      max-width: 45%;
      text-shadow: 5px 5px 5px #7e5511;
    }
  }
`;

export const StyledUserCard = styled.div`
  width: 50%;
  background-color: #ffded6;
  margin: 2rem 0;
  height: 7rem;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 5px 5px 10px grey;
  color: grey;
`;
