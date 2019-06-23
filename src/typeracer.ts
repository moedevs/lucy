import { get } from "./helpers"

const trUrl = "https://data.typeracer.com/games?playerId=tr:"
const trArg = "&universe=play&startDate=0"

const filter = (string: string) => {
  const exp = /[^a-z0-9_]/g
  string.toLowerCase()
  return string.replace(exp, "")
} 

const trUrlBuilder = (u: string) => {
  const username = filter(u)
  return `${trUrl}${username}${trArg}`
}

const getData = (user: string) => get(trUrlBuilder(user))

export default async (user: string) => {
  const [ trData ] = await Promise.all([getData(user)])
  return trData
}