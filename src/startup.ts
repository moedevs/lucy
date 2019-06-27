import { isUndefined } from "util";

process.stdout.write("Checking environmental variables...\r")

const fail = (failed: number) => {
  console.log(`\nEnvironmental variable "${check[failed]}" missing!`)
  process.exit(1)
}

const update = (i: number, t: number) => {
  process.stdout.write(`Checking environmental variables... [${i}/${t}]           \r`)
} // padding at the end of string 

const check = [
  "BASEURL",
  "DATADOG_REDIRECT_URL",
  "MR_API_ENDPOINT",
  "SOCIAL_DISCORD_URL",
  "SOCIAL_REDDIT_URL",
  "TR_URL",
  "TR_ARGS"
]

check.forEach((iter, index, array) => {isUndefined(process.env[iter]) ? fail(index) : update(index+1, array.length)})

console.log("Checking environmental variables... [DONE]")