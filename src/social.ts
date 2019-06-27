import { get } from "./helpers"

const discordUrl = process.env.SOCIAL_DISCORD_URL!
const redditUrl = process.env.SOCIAL_REDDIT_URL!

const getDiscordData = () =>
  get(discordUrl).then(res => res.approximate_member_count)

const getRedditData = () =>
  get(redditUrl).then(res => res.data.subscribers)

export default async () => {
  const [discord, reddit] = await Promise.all([getDiscordData(), getRedditData()]);
  return { discord, reddit };
};