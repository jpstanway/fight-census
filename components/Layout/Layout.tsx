import Head from "next/head";
import styled from "styled-components";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => (
  <>
    <Head>
      <title>Fight Census</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container>
      <Sidebar />
      <Main>
        <Header />
        {props.children}
        <Footer />
      </Main>
    </Container>
  </>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  height: 100%;
`;

const Main = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 7rem 1fr 5rem;
`;

export default Layout;
