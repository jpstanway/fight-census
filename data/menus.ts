export default [
  {
    header: "Stats",
    items: [
      { id: 11, name: "All Stats", url: "/stats" },
      { id: 22, name: "by size", url: "/stats/bySize" },
      { id: 33, name: "by age", url: "/stats/byAge" },
      { id: 44, name: "by location", url: "/stats/byLocation" },
      { id: 55, name: "by experience", url: "/stats/byExperience" },
    ],
  },
  {
    header: "Cards",
    items: [{ id: 12, name: "All Cards", url: "/cards" }],
  },
  {
    header: "Rankings",
    items: [
      { id: 11, name: "Heavyweight", url: "/rankings/heavyweight" },
      { id: 22, name: "Light Heavyweight", url: "/rankings/lightHeavyweight" },
      { id: 33, name: "Middleweight", url: "/rankings/middleweight" },
      { id: 44, name: "Welterweight", url: "/rankings/welterweight" },
      { id: 55, name: "Lightweight", url: "/rankings/lightweight" },
      { id: 66, name: "Featherweight", url: "/rankings/featherweight" },
      { id: 77, name: "Bantamweight", url: "/rankings/bantamweight" },
      { id: 88, name: "Flyweight", url: "/rankings/flyweight" },
      {
        id: 99,
        name: "Women's Featherweight",
        url: "/rankings/wFeatherweight",
      },
      {
        id: 111,
        name: "Women's Bantamweight",
        url: "/rankings/wBantamweight",
      },
      { id: 222, name: "Women's Flyweight", url: "/rankings/wFlyweight" },
      { id: 333, name: "Women's Strawweight", url: "/rankings/wStrawweight" },
      { id: 444, name: "Pound for Pound", url: "/rankings/p4p" },
    ],
  },
  {
    header: "Fighters",
    items: [
      { id: 11, name: "Alphabetical", url: "/fighters" },
      { id: 22, name: "by nationality", url: "/fighters/by-nationality" },
    ],
  },
];
