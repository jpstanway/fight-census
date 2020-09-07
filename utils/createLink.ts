// swaps the leading 'wiki' path for the route
const createLink = (link: string, title: string = "") => {
  let newLink = link.replace("/wiki/", "");

  if (title && newLink.replace(/_/g, " ") !== title) {
    let isPPV = title.match(/^ufc\s\d/gi);

    if (!isPPV) newLink = title.replace(/\s/g, "_");
  }

  return newLink;
};

export default createLink;
