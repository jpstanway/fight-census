import axios from "axios";
import cheerio from "cheerio";

const baseURL = "https://en.wikipedia.org";
const divisionsURL = "/wiki/List_of_current_UFC_fighters";

export const getDivisionsData = async () => {
  const { data } = await axios.get(baseURL + divisionsURL);

  const tableHeading = cheerio("h3", data);

  if (
    tableHeading.text().toLowerCase().includes("heavyweights (265 lb, 120 kg)")
  ) {
    const tableRows: any = tableHeading.next().next().html();

    const fightersMap = cheerio("tr > td:nth-child(2)", tableRows)
      .map(async (index, element) => {
        const name = cheerio(element).text().trim();

        return { name };
      })
      .get();

    return Promise.all(fightersMap);
  }
};
