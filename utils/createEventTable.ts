import { Event } from "../types/types";

export default (data: any) => {
  let html = data.parse.text["*"];
  html = html.replace(/\n|Event|Date|City|Country|Venue|Ref.|Notes/g, "");
  const result = html.match(/<tbody>.*<\/tbody>/g);
  const rows = result[0].split("<tr>");
  const events: Event[] = [];

  rows
    .map((row: string) => {
      return row.split(/<.+?>/g).filter((text) => text);
    })
    .forEach((item: string[], id: number) => {
      if (item.length > 0) {
        let event = {
          id,
          event: item[0],
          date: item[1],
          venue: item[2],
          city: "",
          country: "",
        };

        if (item[4] === ", ") {
          event.city = `${item[3]}, ${item[5]}`;
          event.country = item[6];
        } else {
          event.city = item[3];
          event.country = item[4];
        }

        events.push(event);
      }
    });

  return events;
};
