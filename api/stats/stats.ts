// navigate to 2020 in ufc page
// loop through each event
// 1. loop through fights
// 2. go into each fighter page
// 3. get weight, reach, and height
// for each fighter

import axios from "axios";
import cheerio from "cheerio";

const baseURL = "https://en.wikipedia.org";
const eventsURL = "/wiki/2020_in_UFC";

/***************************************** */
// desc:    collect links to all past UFC events in 2020
// source:  wikipedia
/***************************************** */
export const getPastEvents = async () => {
  // Data Needed: link, title, date, venue, city, country
  const { data } = await axios.get(baseURL + eventsURL);
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