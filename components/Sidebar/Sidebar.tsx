import Link from "next/link";
import styled from "styled-components";

import MenuData from "./MenuData";
import MenuItem from "./MenuItem";

const Sidebar = () => (
  <Container>
    <Brand>
      <span>Fight Census</span>
    </Brand>
    <Menu>
      <SubHeader>
        <Link href="/">
          <a>Home</a>
        </Link>
      </SubHeader>
      {MenuData.map((section) => (
        <MenuItem
          key={section.header.toLowerCase()}
          header={section.header}
          items={section.items}
        />
      ))}
    </Menu>
  </Container>
);

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.grey};
  color: rgba(255, 255, 255, 0.7);
`;

const Brand = styled.a`
  color: #fff;
  cursor: pointer;
  display: block;
  padding: 2rem;

  span {
    font-size: 2rem;
  }
`;

const Menu = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkGrey};
    color: #fff;
    cursor: pointer;
  }
`;

export default Sidebar;
