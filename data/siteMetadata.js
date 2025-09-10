/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: "Nico's Blog",
  author: 'Nico Prananta',
  headerTitle: 'nico.fyi',
  description: '',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.nico.fyi',
  siteRepo: 'https://github.com/nicnocquee/nico.fyi',
  siteLogo: '/static/images/logo.webp',
  socialBanner: '/static/images/twitter-card.jpg',
  mastodon: '',
  email: 'hi@nico.fyi',
  github: 'https://github.com/nicnocquee',
  locale: 'en-US',
  bluesky: 'https://bsky.app/profile/nico.fyi',
  linkedin: 'https://www.linkedin.com/in/nico-prananta-884750200/',
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
  },
}

module.exports = siteMetadata
