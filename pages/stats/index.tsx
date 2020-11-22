import { NextPage, GetServerSideProps } from 'next';

const Stats: NextPage = () => {
  return (
    <div>
      <h1>All Stats</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  return { props: { }};
};

export default Stats; 
