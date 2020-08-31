import fetcher from "../fetcher";
import { Fight } from "../../types/types";

export default async (page: string) => {
  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page,
    format: "json",
    prop: "text",
    section: "2",
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;

  const json = await fetcher(url);
  let html = json.parse.text["*"];

  html = html.replace(/\n|Weight class|Method|Round|Time|Notes/g, "");

  const result = html.match(/<tbody>.*<\/tbody>/g);
  const rows = result[0].split("<tr>");
  const fights: Fight[] = [];

  rows
    .map((row: string) => {
      // extract wikipedia link for individual events
      let links = row.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g);

      // remove html tags
      const item = row.split(/<.+?>/g).filter((text) => text);

      if (links) {
        for (let i = 0; i < links?.length; i++) {
          links[i] = links[i].replace(/(<a href=")|(");/g, "");
          item.push(links[i]);
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

        if (item.length >= 7) {
          fight.outcome = item.slice(4, 7);
          fight.links = item.slice(7, item.length);
        } else if (item.length >= 4) {
          fight.links = item.slice(4, item.length);
        }

        fights.push(fight);
      }
    });

  return fights;
};
