import { NextPage, GetServerSideProps } from 'next';
import styled from "styled-components";

type StatsProps = {
  data: any;
}

const Stats: NextPage<StatsProps> = () => {
  return (
    <div>
      <h1>All Stats</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  return { props: {}};
};

export default Stats; 
