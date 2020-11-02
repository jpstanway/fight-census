import axios from "axios";
import cheerio from "cheerio";

import { createFighterLink } from './divisions.utils';

const baseURL = "https://en.wikipedia.org";
const divisionsURL = "/wiki/List_of_current_UFC_fighters";

/***************************************** */
// desc:    web scraper to get top 15 rankings
// source:  wikipedia
/***************************************** */
export const getTop15 = async (division: string) => {
  const { data } = await axios.get(baseURL + divisionsURL);
  let divisionIndex: number, rankingsMap: any;

  if (division === "women's featherweight") return false;

  // get rankings table
  cheerio("h2", data).each((index, element) => {
    if (cheerio(element).text().toLowerCase().includes("rankings")) {
      const tables: any = cheerio(element).nextAll("table");
      const regexp = new RegExp(division, 'gi');

      // get sub table with division
      const table = tables.eq(0).html().search(regexp) !== -1
        ? tables.eq(0).html()
        : tables.eq(1).html();
      
      // get index of division column  
      cheerio("th", table).each((index, element) => {
        if (cheerio(element).text().toLowerCase().trim() === division) {
          divisionIndex = index + 1;
          return false;
        }
      });
      
      // get all fighters in column with rank
      rankingsMap = cheerio(`tr > td:nth-child(${divisionIndex})`, table).map(
        async (index, element) => {
          const name = cheerio(element).text().replace(/\(.*\)|[0-9]|\*/g, "").trim();
          const rank = index.toString();
          let originalLink = "";
          if (cheerio(element).find("a").length > 0) {
            originalLink = cheerio(element).find("a")[0].attribs.href;
          }
          const link = createFighterLink(element, name);

          // visit fighter page to get remaining information
          const { data } = await axios.get(baseURL + originalLink);
          let age, height, wins: string = "", losses: string = "";
          cheerio("table.infobox > tbody > tr > th", data).each(async (index, element) => {
            const el = cheerio(element);

            if (el.text() === "Born") {
              age = el.next().find("span.ForceAgeToShow").text().replace(/[^0-9]/g, "");
            } else if (el.text() === "Height") {
              height = el.next().text().replace(/\[.*\]/g, "");
            } else if (el.text() === "Mixed martial arts record") {
              el.closest('tr').nextAll().each(async (index, element) => {
                const e = cheerio(element).find('th');
                
                if (e.text() === 'Wins' && !wins) {
                  wins = e.next().text();
                } else if (e.text() === 'Losses' && !losses) {
                  losses = e.next().text();
                }
              });
            } 
          });
          
          const record = `${wins}-${losses}`;
          
          return { rank, name, link, age, height, record };
        }
      )
      .get();

      return false;
    }
  });

  return Promise.all(rankingsMap);
};

/***************************************** */
// desc:    web scraper to get all fighters in a division
// source:  wikipedia
/***************************************** */
export const getDivisionData = async (division: string) => {
  const { data } = await axios.get(baseURL + divisionsURL);
  let fightersMap: any;

  // get full division data
  cheerio("h3", data).each((index, element) => {
    if (cheerio(element).text().toLowerCase().includes(division)) {
      const table: any = cheerio(element).nextAll("table").eq(0).html();

      fightersMap = cheerio("tr > td:nth-child(2)", table)
        .map(async (index, element) => {
          const country = cheerio(element).prev().find("img")[0].attribs.alt;
          const name = cheerio(element).text().replace(/\(.*\)|\*/g, "").trim();
          const age = cheerio(element).next().text().trim();
          const height = cheerio(element).next().next().text().trim();
          const record = cheerio(element).nextAll("td").last().text().trim();
          let link = createFighterLink(element, name);

          return { country, name, age, height, record, link };
        })
        .get();

      return false;
    }
  });

  return Promise.all(fightersMap);
};
