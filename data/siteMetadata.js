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
  twitter: 'https://twitter.com/2co_p',
  locale: 'en-US',

  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
  },
}

module.exports = siteMetadata
