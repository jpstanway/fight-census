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

  if (json.error) {
    const newSearchParams = new URLSearchParams({
      origin: "*",
      action: "query",
      titles: page,
      format: "json",
      prop: "redirects",
    });

    const newUrl = `https://en.wikipedia.org/w/api.php?${newSearchParams}`;

    const newJson = await fetcher(newUrl);
    console.log(newJson.query);
  }

  let html = json.parse.text["*"];

  html = html.replace(
    /\n|Weight class|Method|Round|Time|Notes|(\s\(c\))|(&.*;)/g,
    ""
  );

  const result = html.match(/<tbody>.*<\/tbody>/g);
  const rows = result[0].split("<tr>");
  const fights: Fight[] = [];

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
