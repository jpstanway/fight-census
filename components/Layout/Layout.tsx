import { useState } from "react";
import styled from "styled-components";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  sidebar: boolean;
  setSidebar?: any;
}

const Layout = (props: LayoutProps) => {
  const [sidebar, setSidebar] = useState<boolean>(true);

  return (
    <Container sidebar={sidebar}>
      <Sidebar sidebar={sidebar} />
      <Main>
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        <MainContainer>{props.children}</MainContainer>
        <Footer />
      </Main>
    </Container>
  );
};

const Container = styled.div<SidebarProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.sidebar ? "25rem 1fr" : "0rem 1fr"};
  height: 100%;
`;

const Main = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 7rem 1fr 5rem;
`;

const MainContainer = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  color: ${(props) => props.theme.colors.textDark};
  padding: 2rem;
`;

export default Layout;
