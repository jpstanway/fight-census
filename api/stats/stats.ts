// navigate to 2020 in ufc page
// loop through each event
// 1. loop through fights
// 2. go into each fighter page
// 3. get weight, reach, and height
// for each fighter

import axios from "axios";
import cheerio from "cheerio";

import { Event } from '../../types/types';

const baseURL = "https://en.wikipedia.org";
const eventsURL = "/wiki/2020_in_UFC";

/***************************************** */
// desc:    collect links to all past UFC events in 2020
// source:  wikipedia
/***************************************** */
export const getPastEvents = async () => {
  // Data Needed: link, title, date, venue, city, country
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
// desc:    collect match data for an event
// source:  wikipedia
/***************************************** */
export const getMatches = async () => {
  // Data Needed: fighter names, links, weight class,
  // fight result (method), round and time
};

/***************************************** */
// desc:    collect fighter size stats
// source:  wikipedia
/***************************************** */
export const getFighterPhysicalStats = async () => {
  // Data Needed: height, weight, reach
};