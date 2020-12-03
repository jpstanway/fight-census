import Link from "next/link";
import styled from "styled-components";

type MenuItemObj = {
  id: number;
  name: string;
  url: string;
};

interface MenuItemProps {
  header: string;
  items: MenuItemObj[];
}

const MenuItem = (data: MenuItemProps) => (
  <Container>
    <SubHeader>
      <span>{data.header}</span>
    </SubHeader>
    <SubMenu>
      {data.items.map((item) => (
        <li key={item.id}>
          <Link href={item.url}>
            <SubItem>{item.name}</SubItem>
          </Link>
        </li>
      ))}
    </SubMenu>
  </Container>
);

const Container = styled.li`
  position: relative;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const SubMenu = styled.ul`
  background-color: ${(props) => props.theme.colors.medGrey};
  overflow: hidden;
  transition: max-height 3s ease-out;
`;

const SubItem = styled.a`
  color: rgba(255, 255, 255, 0.55);
  display: block;
  cursor: pointer;
  padding: 1rem 2rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.darkGrey};
    color: #fff;
  }
`;

export default MenuItem;
