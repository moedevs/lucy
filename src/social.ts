import { get } from "./helpers"

const discordUrl = "https://discordapp.com/api/v6/invite/ZWW5CJw?with_counts=true"
const redditUrl = "https://reddit.com/r/eaglejump/about.json"

const getDiscordData = () =>
  get(discordUrl).then(res => res.approximate_member_count)

const getRedditData = () =>
  get(redditUrl).then(res => res.data.subscribers)

export default async () => {
  const [discord, reddit] = await Promise.all([getDiscordData(), getRedditData()]);
  return { discord, reddit };
};