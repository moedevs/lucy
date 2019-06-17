const fetch = require('node-fetch')

const discordUrl = "https://discordapp.com/api/v6/invite/ZWW5CJw?with_counts=true"
const redditUrl = "https://reddit.com/r/eaglejump/about.json"

const get = async (url) => {
  const r = await fetch(url)
  const b = await r.json()
  return b
}

const getDiscordData = async () => {
  const discordData = await get(discordUrl)
  console.log(discordData)
  return discordData
}

module.exports = async () => {
  return {"discord": await getDiscordData()}
}