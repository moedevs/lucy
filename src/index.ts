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

app.get('/', (res: { send: (arg0: string) => void; }) => res.send(''))
app.get('/stats', (res: { send: (arg0: string) => void; }) => res.send("Error: no stat page requested"))
app.get('/stats/:page', async (req: { params: { [x: string]: string; }; }, res: { send: (arg0: string | { discord: any; reddit: any; }) => void; }) => res.send(await pageHandler(req.params["page"])))
app.get('/tr/:user', async (req: { params: { [x: string]: any; }; }, res: { send: (arg0: any) => void; }) => res.send(await trHandler(req.params["user"])))

app.listen(port, () => console.log(`listening on port ${port}`))