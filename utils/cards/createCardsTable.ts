import fetcher from "../fetcher";
import { Card } from "../../types/types";

export default async (section: string) => {
  const year = new Date().getFullYear();
  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page: `${year.toString()}_in_UFC`,
    format: "json",
    prop: "text",
    section,
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;

  const json = await fetcher(url);
  let html = json.parse.text["*"];

  html = html.replace(
    /\n|Event|Date|City|Country|Venue|Ref.|Notes|#|Atten.|Fight of the Night|Performance of the Night|Bonus/g,
    ""
  );

  const result = html.match(/<tbody>.*<\/tbody>/g);
  const rows = result[0].split("<tr>");
  const cards: Card[] = [];

  rows
    .map((row: string) => {
      // extract wikipedia link for individual cards
      let links = row.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g);
      let link = "";

      if (links) {
        link = links[0].replace(/(<a href=")|(")/g, "");
      }

      // remove html tags
      const item = row.split(/<.+?>/g).filter((text) => text);
      item.unshift(link);

      return item;
    })
    .forEach((item: string[], id: number) => {
      if (item.length >= 5) {
        let isUpcoming = section === "7";

        let card = {
          id,
          title: isUpcoming ? item[1] : item[2],
          date: isUpcoming ? item[2] : item[3],
          venue: isUpcoming ? item[3] : item[4],
          city: isUpcoming ? item[4] : item[5],
          country: isUpcoming ? item[5] : item[6],
          link: item[0],
        };

        if (item[5] === ", ") {
          card.city = `${item[4]}, ${item[6]}`;
          card.country = item[7];
        }

        isUpcoming ? cards.unshift(card) : cards.push(card);
      }
    });

  return cards;
};
