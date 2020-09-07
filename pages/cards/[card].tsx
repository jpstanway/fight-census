import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import { wrapper } from "../../redux/store";
import { Fight as FightType } from "../../types/types";

import { initializeFights } from "../../redux/fights/actions";

import FightsTable from "../../components/Common/Tables/FightsTable";
import createFightsTable from "../../utils/cards/createFightsTable";

type CardProps = {
  fights: FightType[];
  card: string;
};

const Card: React.FC<CardProps> = ({ card, fights }) => {
  const title = card.replace(/_/g, " ");

  return (
    <div>
      <h1>{title}</h1>
      <FightsTable rows={fights} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    let { card } = query;
    let data: FightType[] = [];

    if (card) {
      card = card.toString();
      data = await createFightsTable(card);

      store.dispatch(initializeFights(data));

      return { props: { card } };
    }
  }
);

const mapStateToProps = (state: any) => ({
  fights: state.fights,
});

export default connect(mapStateToProps, {})(Card);
