import Link from "next/link";
import styled from "styled-components";

import MenuData from "./MenuData";
import MenuItem from "./MenuItem";

const Sidebar = () => (
  <Container>
    <Link href="/">
      <Brand>Fight Census</Brand>
    </Link>
    <Menu>
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
  font-size: 2rem;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export default Sidebar;
