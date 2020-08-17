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
      <Search type="text" placeholder="Search..." />
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 2rem 0 rgba(53, 64, 82, 0.1);
  color: ${(props) => props.theme.colors.textDark};
  padding: 2rem;
  display: flex;
  align-items: center;
  z-index: 999;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 2rem;
  height: 4rem;
  width: 4rem;

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

const Search = styled.input`
  border: none;
  color: ${(props) => props.theme.colors.textDark};
  font-size: 1.8rem;
  height: 4rem;
  width: 30rem;

  &:active,
  &:focus {
    outline: none;
  }
`;

export default Header;
