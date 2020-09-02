import Link from "next/link";
import { Fight as FightType } from "../../../types/types";
import modifyLink from "../../../utils/modifyLink";

type TableProps = {
  rows: FightType[];
};

const FightsTable: React.FC<TableProps> = ({ rows }) => {
  const renderFighter = (fighter: string) => {
    if (fighter.includes("|")) {
      let arr = fighter.split("|");
      return (
        <Link href={modifyLink(arr[1], "fighters")}>
          <a>{arr[0]}</a>
        </Link>
      );
    }
    return fighter;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Weight</th>
          <th>Fighters</th>
          <th>Result</th>
          <th>Round</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((fight: FightType) => (
          <tr key={fight.id}>
            <td>{fight.division}</td>
            <td>
              {renderFighter(fight.fighters[0])} {fight.fighters[1]}{" "}
              {renderFighter(fight.fighters[2])}
            </td>
            {fight.outcome ? (
              fight.outcome.map((info, i) => <td key={i}>{info}</td>)
            ) : (
              <>
                <td></td>
                <td></td>
                <td></td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FightsTable;
