import { isUndefined } from "util";

process.stdout.write("Checking environmental variables...\r")

const fail = () => {
  console.log("Checking environmental variables... [FAILED]")
  process.exit(1)
}

const check = [
  "BASEURL",
]

check.forEach((iter) => {isUndefined(process.env[iter]) ? fail() : true})

console.log("Checking environmental variables... [DONE]")