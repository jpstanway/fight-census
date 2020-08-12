export default (text: string) => {
  return text[0].toUpperCase() + text.substr(1, text.length);
};
