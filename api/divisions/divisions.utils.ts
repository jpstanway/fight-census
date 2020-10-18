import cheerio from 'cheerio';

export const createFighterLink = (element: any, name: string) => {
  let link = "";
  if (cheerio(element).find("a").length > 0) {
    link = cheerio(element).find("a")[0].attribs.href;
    link = link.replace(/wiki/g, "fighters")
    link = link.replace(/_\(.*\)/g, "");
  }  else {
    link = `/fighters/${name.replace(/\s/g, "_")}`;
  }
  return link;
};