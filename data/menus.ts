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
      {
        id: 11,
        name: "Heavyweight",
        url: "/rankings/heavyweight",
        limit: "265lb / 120kg",
      },
      {
        id: 22,
        name: "Light Heavyweight",
        url: "/rankings/light-heavyweight",
        limit: "205lb / 93kg",
      },
      {
        id: 33,
        name: "Middleweight",
        url: "/rankings/middleweight",
        limit: "185lb / 84kg",
      },
      {
        id: 44,
        name: "Welterweight",
        url: "/rankings/welterweight",
        limit: "170lb / 77kg",
      },
      {
        id: 55,
        name: "Lightweight",
        url: "/rankings/lightweight",
        limit: "155lb, 70kg",
      },
      {
        id: 66,
        name: "Featherweight",
        url: "/rankings/featherweight",
        limit: "145lb / 65kg",
      },
      {
        id: 77,
        name: "Bantamweight",
        url: "/rankings/bantamweight",
        limit: "135lb / 61kg",
      },
      {
        id: 88,
        name: "Flyweight",
        url: "/rankings/flyweight",
        limit: "125lb / 56kg",
      },
      {
        id: 99,
        name: "Women's Featherweight",
        url: "/rankings/womens-featherweight",
        limit: "145lb / 65kg",
      },
      {
        id: 111,
        name: "Women's Bantamweight",
        url: "/rankings/womens-bantamweight",
        limit: "135lb / 61kg",
      },
      {
        id: 222,
        name: "Women's Flyweight",
        url: "/rankings/womens-flyweight",
        limit: "125lb / 56kg",
      },
      {
        id: 333,
        name: "Women's Strawweight",
        url: "/rankings/womens-strawweight",
        limit: "115lb / 56kg",
      },
      { id: 444, name: "Pound for Pound", url: "/rankings/pound-for-pound" },
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
