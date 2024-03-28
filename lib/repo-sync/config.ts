const repoConfig = {
  owner: 'nicnocquee',
  repo: 'nico.fyi',
  path: 'data/blog',
  auth: process.env.GITHUB_TOKEN, // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo,
  apiVersion: '2022-11-28',
}

export default repoConfig
