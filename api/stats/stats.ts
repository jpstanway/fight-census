// navigate to 2020 in ufc page
// loop through each event
// 1. loop through fights
// 2. go into each fighter page
// 3. get weight, reach, and height
// for each fighter

import axios from "axios";
import cheerio from "cheerio";

import { Event, Match } from '../../types/types';

const baseURL = "https://en.wikipedia.org";
const eventsURL = "/wiki/2020_in_UFC";

/****************************************************** */
//@desc:    collect links to all past UFC events in 2020
//@source:  wikipedia
//@data:    link, title, date, venue, city, country
/****************************************************** */
export const getPastEvents = async () => {
  const { data } = await axios.get(baseURL + eventsURL);
  const events: Event[] = [];
  
  cheerio("h3", data).each((index, element) => {
    const h3 = cheerio(element);

    if (h3.text().toLowerCase().includes('past events')) {
      const table = h3.next('.wikitable').find('tbody');
      
      cheerio("tr", table).each((index, element) => {
        const row = cheerio(element).find("td");
        let id = parseInt(row.eq(0).text().trim());
        
        if (!isNaN(id) || id.toString().includes("–")) {
          if (isNaN(id)) {
            id = index;
          }
          const title = row.eq(1).text().trim();
          const link = row.eq(1).find("a")[0].attribs.href;
          const date = row.eq(2).text().trim();
          const venue = row.eq(3).text().trim();
          const city = row.eq(4).text().trim();
          const country = row.eq(5).text().trim();

          events.push({
            id, 
            title, 
            link, 
            date, 
            venue, 
            city, 
            country
          });
        }
      });
    }
  });

  return events;
};

/***************************************** */
//@desc:    collect match data for an event
//@source:  wikipedia
//@data:    fighter names, links, weight class,
//          fight result (method), round and time
/***************************************** */
export const getMatches = async (eventUrl: string) => {
  const { data } = await axios.get(baseURL + eventUrl);
  const matches: Match[] = [];

  cheerio("h2", data).each((index, element) => {
    const h2 = cheerio(element);

    if (h2.text().toLowerCase().includes("results")) {
      const table = h2.next('table').find('tbody');
      
      cheerio("tr", table).each((index, element) => {
        const row = cheerio(element).find("td");
        
        if (row.length > 0) {
          const division = row.eq(0).text().trim();
          const red = row.eq(1).text().trim();          
          const blue = row.eq(3).text().trim();
          const result = row.eq(4).text().trim();
          const round = row.eq(5).text().trim();
          const time = row.eq(6).text().trim();

          let redLink, blueLink;
          if (row.eq(1).find("a").length > 0) {
            redLink = row.eq(1).find("a")[0].attribs.href;
          }
          if (row.eq(3).find("a").length > 0) {
            blueLink = row.eq(3).find("a")[0].attribs.href;
          }
          
          matches.push({
            id: index,
            division,
            red,
            redLink,
            blue,
            blueLink,
            result,
            round,
            time
          });
        }
      });
    }
  });

  return matches;
};

/***************************************** */
//@desc:    collect fighter size stats
//@source:  wikipedia
//@data:    height, weight, reach, division
/***************************************** */
export const getFighterPhysicalStats = async (fighterUrl: string) => {
  const { data } = await axios.get(baseURL + fighterUrl);
  let height, weight, division, reach;

  cheerio(".infobox", data).find("th").each((index, element) => {
    const th = cheerio(element);

    if (th.text().toLowerCase() === "height") height = th.next().text().trim();
    if (th.text().toLowerCase() === "weight") weight = th.next().text().trim();
    if (th.text().toLowerCase() === "division") division = th.next().text().trim();
    if (th.text().toLowerCase() === "reach") reach = th.next().text().trim();
  });
  
  return {
    height,
    weight,
    division,
    reach
  };
};