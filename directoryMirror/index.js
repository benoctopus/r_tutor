const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')));

const isDir = (path) => fs.statSync(path).isDirectory();

const ls = (path) => (
  fs.readDirSync(path)
    .map(p => path.join(path, p))
)

function setHeaders(name, res) {
  const ext = name
    .trim()
    .split('.')
    .pop();

    const contentTypes = {
      'mp3': 'audio/mp3',
      'zip': 'application/zip',
      'json': 'application/json'
    }

    try {
      res.setHeader('Content-type', contentTypes[ext])
    } catch(err) {
      console.log(err);
      throw new Error('invalid content type')
    }

    res.setHeader(
      'Content-disposition',
      `attachment; filename=${name}`
    )

    return
}

function getDirMap() {
  // fill this out
  return { test: 'passes' }
}

app.get('/getdir', (req, res) => {
  let map = getDirMap()

  if (!map || !(map instanceof Object))
    return res.status(501).send()

  res.json(map)
})

app.get('/file', (req, res) => {
  if (!req.query.path)
    return res.status(400).send()

    console.log(req.query.path)

  if (req.query.path.includes('..')) 
    return res.status(403).send();

  try {
    setHeaders(
      req.query.path.trim().split('/').pop(),
      res
    )
  } catch(err) {
    console.log(err);
    return res.status(400).send()
  }

  p = path.join(__dirname, 'files', req.query.path);

  let valid = false

  try {
    valid = fs.statSync(p).isFile()
  } catch (err) {
    console.log(err)
  }

  if (!valid) return res.status(400).send()

  fs.createReadStream(path.join(p))
    .pipe(res);
})

app.listen(8080, () => console.log('http://127.0.0.1:8080'));
