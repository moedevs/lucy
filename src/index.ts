import express from 'express';
const app = express()
const port = 6969
import dotenv from 'dotenv';
dotenv.config()
import "./startup"
import getStats from "./social";
import getTyperacerStats from "./typeracer";
import getMangarockPage from "./mangarock";

const pageHandler = (page: string) => {
  if (page == "social") {
    return getStats()
  } else if (page == "bot") {
    return process.env.DATADOG_REDIRECT_URL!
  } else {
    return `Error: stat page ${page} not found.`
  }
}

const mrHandler = (mangaid: string, chapter?: number, page?: number) => {
  return getMangarockPage(mangaid, chapter, page)
}

app.get('/', (req, res) => res.send(''))
app.get('/stats', (req, res) => res.send("Error: no stat page requested"))
app.get('/stats/:page', async (req, res) => res.send(await pageHandler(req.params["page"])))
app.get('/tr/:user', async (req, res) => res.send(await getTyperacerStats(req.params["user"])))
app.get('/mr/series/:mangaid', async (req, res) => res.send(await mrHandler(req.params["mangaid"])))
app.get('/mr/series/:mangaid/chapter/:chapter', async (req, res) => 
  res.send(await mrHandler(req.params["mangaid"], req.params["chapter"])))
app.get('/mr/series/:mangaid/chapter/:chapter/page/:page', async (req, res) => {
  res.setHeader('Content-Type', 'image/webp')
  res.attachment("filename.webm")
  //res.setHeader('Content-Disposition', 'attachment; filename*="filename.webp"')
  res.send(await mrHandler(req.params["mangaid"], req.params["chapter"], req.params["page"]))
})

app.listen(port, () => console.log(`listening on port ${port}`))