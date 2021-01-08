import Link from 'next/link';
import styled from "styled-components";
import { SidebarProps } from "../Layout";

const Header = (props: SidebarProps) => {
  const handleSidebarToggle = () => {
    if (props.setSidebar) {
      props.setSidebar(!props.sidebar);
    }
  };

  return (
    <Container>
      <ToggleButton onClick={handleSidebarToggle}>
        <HamburgerIcon>&nbsp;</HamburgerIcon>
      </ToggleButton>
      <SiteTitle>
        <Link href="/">
          <CustomLink>Fight Census 2020</CustomLink>
        </Link>
      </SiteTitle>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 2rem 0 rgba(53, 64, 82, 0.1);
  color: ${(props) => props.theme.colors.textDark};
  padding: 2rem;
  z-index: 999;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 2rem;
  height: 4rem;
  width: 4rem;
  float: left;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover span,
  &:hover span::before,
  &:hover span::after {
    background-color: ${(props) => props.theme.colors.textLight};
  }
`;

const HamburgerIcon = styled.span`
  background-color: ${(props) => props.theme.colors.textDark};
  border-radius: 3px;
  display block;
  height: 3px;
  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: ${(props) => props.theme.colors.textDark};
    border-radius: 3px;
    height: 3px;
    position: absolute;
    left: 0; 
    width: 100%;
  }

  &::before {
    top: -10px;
  }

  &::after {
    top: 10px;
  }
`;

const SiteTitle = styled.h1`
  color: ${(props) => props.theme.colors.blue};
  margin: 0;
  text-align: center;
  text-transform: uppercase;

  @media screen and (max-width: 500px) {
    font-size: 2.2rem;
    padding-top: 0.5rem;
  }
`;

const CustomLink = styled.a`
  cursor: pointer;
  margin-left: -4.5rem;

  &:hover {
    text-decoration: none;
  }
`;

export default Header;
