const express = require('express')
const expresslayout = require('express-ejs-layouts')
const morgan = require('morgan');
const app = express()
const port = 3500


// using ejs 
app.set('view engine', 'ejs')
app.use(expresslayout) // one of thrid-party middleware


// thrid-party middleware
app.use(morgan('dev'))
// thrid-party middleware (end)


// build-in middleware
app.use(express.static('public'))

// application middleware
app.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next();
})

app.use((req, res, next) => {
  console.log('Time2: ', Date.now())
  next();
})
// application middleware (end)

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
