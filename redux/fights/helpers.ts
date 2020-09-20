import { Fight } from "../../types/types";
import { getSectionIndex, getTableData } from "../../api/wiki";

const createFightsTable = async (page: string) => {
  const sectionIndex = await getSectionIndex(page, "Results", "Fight card");
  const rows = await getTableData(page, sectionIndex);
  const fights: Fight[] = [];

  if (rows[0].error) return rows;

  rows
    .map((row: string) => {
      // extract wikipedia link for individual events
      let links = row.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g);

      // remove html tags
      const item = row.split(/<.+?>/g).filter((text) => text);

      if (links && item.length > 1) {
        // extract link path from html tags
        for (let i = 0; i < links.length; i++) {
          links[i] = links[i].replace(/(<a href=")|"/g, "");

          // map link to fighter name
          if (links[i].includes(item[1].replace(" ", "_"))) {
            item[1] = `${item[1]}|${links[i]}`;
          } else {
            item[3] = `${item[3]}|${links[i]}`;
          }
        }
      }

      return item;
    })
    .forEach((item: string[], id: number) => {
      if (item.length > 1) {
        const fight: Fight = {
          id,
          division: item[0],
          fighters: item.slice(1, 4),
        };

        if (item.length > 4) {
          fight.outcome = item.slice(4, 7);
        }

        fights.push(fight);
      }
    });

  return fights;
};

export const getFights = async (card: string) => {
  const fights: Fight[] = await createFightsTable(card);
  return fights;
};
