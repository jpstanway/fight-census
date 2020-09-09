import fetcher from "../fetcher";
import { Fight } from "../../types/types";

export default async (page: string) => {
  // get results section
  const prevSearchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page,
    format: "json",
    prop: "sections",
  });

  const prevUrl = `https://en.wikipedia.org/w/api.php?${prevSearchParams}`;

  const prevJson = await fetcher(prevUrl);
  const sections = prevJson.parse.sections;
  let sectionIndex = "";

  for (let section of sections) {
    if (section.line === "Results" || section.line === "Fight card") {
      sectionIndex = section.index;
      break;
    }
  }

  // get page content
  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page,
    format: "json",
    prop: "text",
    section: sectionIndex,
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;

  const json = await fetcher(url);
  let html = json.parse.text["*"];

  html = html.replace(
    /\n|Weight class|Method|Round|Time|Notes|(\s\(c\))|(\s\(ic\))|(&.*;)/g,
    ""
  );

  const result = html.match(/<tbody>.*<\/tbody>/g);

  if (!result || result[0].includes("This section is empty.")) {
    return [
      {
        id: 1,
        division: "",
        fighters: ["", ""],
        error: "There is no information on this card yet. Check back later.",
      },
    ];
  }

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
