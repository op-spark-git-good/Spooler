const express = require('express')
const path = require("path")
const app = express()
const port = 5500


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "dist")))

app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`Spooler listening At http://localhost:${port}`)
})