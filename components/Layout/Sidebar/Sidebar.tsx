import Link from "next/link";
import styled from "styled-components";
import data from "../../../utils/menus";
import { SidebarProps } from "../Layout";
import MenuItem from "./MenuItem";

const Sidebar = (props: SidebarProps) => (
  <Container sidebar={props.sidebar}>
    <Link href="/">
      <Brand>Fight Census</Brand>
    </Link>
    <ul>
      {data.map((section) => (
        <MenuItem
          key={section.header.toLowerCase()}
          header={section.header}
          items={section.items}
        />
      ))}
    </ul>
  </Container>
);

const Container: any = styled.div<SidebarProps>`
  background-color: ${(props) => props.theme.colors.grey};
  color: rgba(255, 255, 255, 0.7);
  transition: max-width 0.2s ease-out;
  max-width: ${(props) => (props.sidebar ? "50rem" : "0")};

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}px) {
    position: absolute;
    top: 0;
    left: ${(props) => (props.sidebar ? "0" : "-1000px")};
    height: 100%;
    margin-top: 8rem;
    min-width: 25rem;
    z-index: 999;
  }
`;

const Brand = styled.a`
  color: #fff;
  cursor: pointer;
  display: block;
  padding: 2rem;
  font-size: 2rem;
  white-space: nowrap;

  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

export default Sidebar;
