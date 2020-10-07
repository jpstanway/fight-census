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
          const name = cheerio(element).text().trim();

          return { name };
        })
        .get();

      return false;
    }
  });

  return Promise.all(fightersMap);
};
