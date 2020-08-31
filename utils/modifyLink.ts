// swaps the leading 'wiki' path for the route
const modifyLink = (link: string, route: string) => {
  return link.replace("wiki", route);
};

export default modifyLink;
