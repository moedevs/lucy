import express from 'express';
const app = express()
const port = 6969
import getStats from "./social";
import getTyperacerStats from "./typeracer";

const pageHandler = (page: string) => {
  if (page == "social") {
    return getStats()
  } else if (page == "bot") {
    return "placeholder for datadog redirect"
  } else {
    return `Error: stat page ${page} not found.`
  }
}

const trHandler = (user: string) => {
  return getTyperacerStats(user)
}

app.get('/', (req, res) => res.send(''))
app.get('/stats', (req, res) => res.send("Error: no stat page requested"))
app.get('/stats/:page', async (req, res) => res.send(await pageHandler(req.params["page"])))
app.get('/tr/:user', async (req, res) => res.send(await trHandler(req.params["user"])))

app.listen(port, () => console.log(`listening on port ${port}`))