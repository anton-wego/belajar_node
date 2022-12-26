const http = require('http')
const fs = require('fs')
const port = 3000;

const renderHtml = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err){
      res.writeHead(400)
      res.write('html not found')
    } else {
      res.write(data)
    }
    res.end();
  })
}

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  const url = req.url
  if (url === '/about'){
    renderHtml('./about.html', res)
  } else {
    res.write('hello')
    res.end()
  }
  
}).listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})