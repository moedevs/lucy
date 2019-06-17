const fetch = require('node-fetch')

const discordUrl = "https://discordapp.com/api/v6/invite/ZWW5CJw?with_counts=true"
const redditUrl = "https://reddit.com/r/eaglejump/about.json"

const get = async (url) => {
  const r = await fetch(url)
  return r.json()
}

const getDiscordData = async () => {
  const discordData = (await get(discordUrl)).approximate_member_count
  return discordData
}

const getRedditData = async () => {
  const redditData = (await get(redditUrl)).data.subscribers
  return redditData
}

module.exports = async () => {
  return {"discord": await getDiscordData(), "reddit": await getRedditData()}
}