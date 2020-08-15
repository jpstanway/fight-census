import styled from "styled-components";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container>
      <p>&copy; {year} Fight Census</p>
    </Container>
  );
};

const Container = styled.footer`
  background-color: #fff;
  border-top: 1px solid ${(props) => props.theme.colors.borderGrey};
  color: ${(props) => props.theme.colors.textLight};
  padding: 2rem;
  display: flex;
  align-items: center;
`;

export default Footer;
