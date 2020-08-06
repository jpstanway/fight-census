import styled from "styled-components";

const Footer = () => (
  <Container>
    <p>This is the footer</p>
  </Container>
);

const Container = styled.footer`
  background-color: darkblue;
  color: white;
  padding: 2rem;
  display: flex;
  align-items: center;
`;

export default Footer;
