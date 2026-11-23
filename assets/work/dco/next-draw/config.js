window.AD_CONFIG = {
  timeZone: 'America/New_York',
  drawDays: [1, 3, 6], // Sunday=0. Monday, Wednesday, Saturday.
  hour: 22, minute: 59,
  clickUrl: 'https://www.michiganlottery.com/',
  // Optional CORS-enabled RSS endpoint. Empty means automatic weekly schedule.
  feedUrl: '',
  // URL serving the JSON payload below; required for live jackpot polling.
  jackpotFeedUrl: '',
  jackpotRefreshMs: 60000,
  jackpotSnapshot: {geo:'US',jackpotAsString:'$360 Million',jackpot:'360000000',category:'LOTTERY',ttl:1792866317,source:'https://ctlottery.com',id:'powerball',updatedAt:'2026-09-24T18:25:17.615Z'},
  feedRefreshMs: 300000
};
