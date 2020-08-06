import styled from "styled-components";

import Head from "next/head";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../components/Footer/Footer";

const Index = () => {
  return (
    <>
      <Head>
        <title>Fight Census</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Sidebar />
        <Main>
          <Header />
          <Dashboard />
          <Footer />
        </Main>
      </Container>
    </>
  );
};

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

export default Index;
