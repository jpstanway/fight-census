import styled from "styled-components";

const Header = () => (
  <Container>
    <button>Toggle</button>
    <input type="text" placeholder="Search..." />
  </Container>
);

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 2rem 0 rgba(53, 64, 82, 0.1);
  color: ${(props) => props.theme.colors.textDark};
  padding: 2rem;
  display: flex;
  align-items: center;
  z-index: 999;
`;

export default Header;
