import { get } from "./helpers"

const trUrl = process.env.TR_URL!
const trArg = process.env.TR_ARGS!

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

export default async (user: string) => await getData(user)