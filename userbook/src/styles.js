import styled from "styled-components";

export const StyledNav = styled.nav`
  background-color: whitesmoke;
  width: 100vw;
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
