import styled from "styled-components";

const Header = () => (
  <Container>
    <button>Toggle</button>
    <p>This is the header</p>
  </Container>
);

const Container = styled.div`
  background-color: orangered;
  padding: 2rem;
  display: flex;
  align-items: center;
`;

export default Header;
