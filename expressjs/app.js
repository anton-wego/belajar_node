const express = require('express')
const expresslayout = require('express-ejs-layouts')
const app = express()
const port = 3500


// using ejs
app.set('view engine', 'ejs')
app.use(expresslayout)

app.get('/', (req, res) => {
  res.render('index', { layout: 'layouts/app-layout', name: 'anton effendi'})
})

app.get('/about1', (req, res) => {
  res.render('about1', { layout: 'layouts/app-layout' })
})

app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root: `${__dirname}/views` })
})

app.get('/test_param/:id', (req, res) => {
  res.send(`testing params ${req.params.id }`)
})

app.get('/test_json/', (req, res) => {
  // const a = {test: 1, test: 2}
  res.json({test: 1, test1: 2})
})

app.use('/', (req, res) => {
  res.status = 404
  res.send('<h1>404</h1>')

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
