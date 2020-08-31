import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

type Toggle = {
  toggle: boolean;
};

type MenuItemObj = {
  id: number;
  name: string;
  url: string;
};

interface MenuItemProps {
  header: string;
  items: MenuItemObj[];
}

const MenuItem = (data: MenuItemProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <Container>
      <SubHeader onClick={() => setToggle(!toggle)}>
        <span>{data.header}</span>
        <img
          src={toggle ? "/shrink-menu.svg" : "/expand-menu.svg"}
          alt="expand"
        />
      </SubHeader>
      <SubMenu toggle={toggle}>
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
};

const Container = styled.li`
  position: relative;
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

const SubMenu = styled.ul<Toggle>`
  background-color: ${(props) => props.theme.colors.medGrey};
  display: ${(props) => (props.toggle ? "block" : "none")};
  max-height: ${(props) => (props.toggle ? "100%" : "0")};
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
