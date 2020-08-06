import styled from "styled-components";

const Sidebar = () => (
  <Container>
    <Brand>
      <span>Fight Census</span>
    </Brand>
    <Menu>
      <Item>Home</Item>
      <Item>Stats</Item>
      <Item>Cards</Item>
      <Item>Rankings</Item>
      <Item>Fighters</Item>
    </Menu>
  </Container>
);

const Container = styled.div`
  background-color: yellowgreen;
  padding: 2rem;
`;

const Brand = styled.a`
  cursor: pointer;
  display: block;
  text-align: center;

  span {
    font-size: 2rem;
  }
`;

const Menu = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const Item = styled.li`
  display: block;
  padding: 1rem;
  cursor: pointer;
`;

export default Sidebar;
