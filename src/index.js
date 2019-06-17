const express = require('express')
const app = express()
const port = 6969
const getStats = require("./social")

const pageHandler = (page) => {
  if (page == "social") {
    return getStats()
  } else if (page == "bot") {
    return "placeholder for datadog redirect"
  } else {
    return `Error: stat page ${page} not found.`
  }
}

app.get('/', (req, res) => res.redirect(''))
app.get('/stats', (req, res) => res.send("Error: no stat page requested"))
app.get('/stats/:page', async (req, res) => res.send(await pageHandler(req.params["page"])))

app.listen(port, () => console.log(`listening on port ${port}`))