import { Event } from "../types/types";

export default (data: any) => {
  const wikitext = data.parse.wikitext["*"];
  const lines = wikitext.split("|-");
  const events = [];

  for (let i = 1; i < lines.length; i++) {
    lines[i] = lines[i].replace(/(\[|\]|{|}|dts|\|)/gi, "").split("\n");

    if (lines[i][1]) {
      const event: Event = {
        id: i,
        name: lines[i][1],
        date: lines[i][2],
        venue: lines[i][3],
        location: lines[i][4],
      };

      events.unshift(event);
    }
  }

  return events;
};
