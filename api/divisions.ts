import axios from "axios";
import cheerio from "cheerio";
import { IterableObject } from "../types/types";

const baseURL = "https://en.wikipedia.org";
const divisionsURL = "/wiki/List_of_current_UFC_fighters";

export const getDivisionsData = async (division: string) => {
  const { data } = await axios.get(baseURL + divisionsURL);
  let fightersMap: any,
    divisionIndex: number,
    rankings: IterableObject = {};

  if (division !== "women's featherweight") {
    // get rankings data
    cheerio("h2", data).each((index, element) => {
      if (cheerio(element).text().toLowerCase().includes("rankings")) {
        const tables: any = cheerio(element).nextAll("table");
        const regexp = new RegExp(division, 'gi');

        const table = tables.eq(0).html().search(regexp) !== -1
          ? tables.eq(0).html()
          : tables.eq(1).html();
        
        cheerio("th", table).each((index, element) => {
          if (cheerio(element).text().toLowerCase().trim() === division) {
            divisionIndex = index + 1;
            return false;
          }
        });
        
        cheerio(`tr > td:nth-child(${divisionIndex})`, table).each(
          (index, element) => {
            const name = cheerio(element).text().replace(/\(C\)|\(IC\)|\*/g, "").trim();
            const rank = index === 0 ? "(C)" : index.toString();
            rankings[name] = rank;
          }
        );
      }
    });
  }
  
  // get full division data
  cheerio("h3", data).each((index, element) => {
    if (cheerio(element).text().toLowerCase().includes(division)) {
      const table: any = cheerio(element).nextAll("table").eq(0).html();

      fightersMap = cheerio("tr > td:nth-child(2)", table)
        .map(async (index, element) => {
          const country = cheerio(element).prev().find("img")[0].attribs.alt;
          const name = cheerio(element).text().replace(/\(C\)|\(IC\)|\*/g, "").trim();
          const age = cheerio(element).next().text();
          const height = cheerio(element).next().next().text();
          const record = cheerio(element).nextAll("td").last().text();
          const rank = rankings.hasOwnProperty(name) ? rankings[name] : "";
          let link = "";  

          if (cheerio(element).find("a").length > 0) {
            link = cheerio(element).find("a")[0].attribs.href;
          }

          return { country, name, age, height, record, link, rank };
        })
        .get();

      return false;
    }
  });

  return Promise.all(fightersMap);
};
