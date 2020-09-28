import fetcher from "../utils/fetcher";

// get the index of the section needing to be parsed from wikipedia
export const getSectionIndex = async (
  page: string,
  title: string,
  titleAlt: string = ""
) => {
  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page,
    format: "json",
    prop: "sections",
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;

  const json = await fetcher(url);
  const sections = json.parse.sections;
  let sectionIndex = "";

  for (let section of sections) {
    if (section.line === title || section.line === titleAlt) {
      sectionIndex = section.index;
      break;
    }
  }

  return sectionIndex;
};

// retrieve and parse table data from page
export const getTableData = async (page: string, sectionIndex: string) => {
  const searchParams = new URLSearchParams({
    origin: "*",
    action: "parse",
    page,
    format: "json",
    prop: "text",
    section: sectionIndex,
  });

  const url = `https://en.wikipedia.org/w/api.php?${searchParams}`;

  const json = await fetcher(url);
  if (json.error) return pageError();
  let html = json.parse.text["*"];

  html = html.replace(
    /\n|Event|Date|City|Country|Venue|Ref.|Notes|#|Atten.|Fight of the Night|Performance of the Night|Bonus|Weight class|Method|Round|Time|Notes|(\s\(c\))|(\s\(ic\))|(&.*;)/g,
    ""
  );

  const result = html.match(/<tbody>.*<\/tbody>/g);

  if (!result || result[0].includes("This section is empty.")) {
    return pageError();
  }

  const rows = result[0].split("<tr>");

  return rows;
};

export const pageError = () => {
  return [
    {
      id: 1,
      division: "",
      fighters: ["", ""],
      error: "There is no information on this card yet. Check back later.",
    },
  ];
};
