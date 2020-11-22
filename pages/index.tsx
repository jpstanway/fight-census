import { NextPage, GetServerSideProps } from "next";
import dbConnect from '../database/db';
import Match from '../database/models/Match';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const matches = await Match.find({});
  // TODO: use redis cache
  return { props: {} };
};

export default Home;
