import axios from "axios";
import cheerio from "cheerio";

const baseURL = "https://en.wikipedia.org";
const divisionsURL = "/wiki/List_of_current_UFC_fighters";

export const getDivisionsData = async (division: string) => {
  const { data } = await axios.get(baseURL + divisionsURL);
  let fightersMap: any;

  cheerio("h3", data).each((index, element) => {
    if (cheerio(element).text().toLowerCase().includes(division)) {
      const table: any = cheerio(element).nextAll("table").eq(0).html();

      fightersMap = cheerio("tr > td:nth-child(2)", table)
        .map(async (index, element) => {
          const country = cheerio(element).prev().find("img")[0].attribs.alt;
          const name = cheerio(element).text().trim();
          const age = cheerio(element).next().text();
          const height = cheerio(element).next().next().text();
          const record = cheerio(element).nextAll("td").last().text();

          let link = "";

          if (cheerio(element).find("a").length > 0) {
            link = cheerio(element).find("a")[0].attribs.href;
          }

          return { country, name, age, height, record, link };
        })
        .get();

      return false;
    }
  });

  return Promise.all(fightersMap);
};
