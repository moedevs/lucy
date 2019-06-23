import { get } from "./helpers"

const trUrl = "https://data.typeracer.com/games?playerId=tr:"
const trArg = "&universe=play&startDate=0"

const filter = (string) => {
  const exp = /[^a-z0-9_]/g
  const newString = string.toLowerCase()
  return newString.replace(exp, "")
} 

const trUrlBuilder = (u) => {
  const username = filter(u)
  return `${trUrl}${username}${trArg}`
}

export default (user) => {

}