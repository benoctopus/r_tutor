const target = document.getElementById('map')
// download('/audio/do.mp3');

getDirMapFromServer()
  .then(tree => {
    console.log(JSON.stringify(tree, null, 2))
    target.appendChild(createDOMNodes(tree));
  })

// fill this one out
function createDOMNodes() {

  // demo
  const container = document.createElement('div')
  const dir = makeDir(5, 'iAmADir')
  container.appendChild(dir) 
  return container;
}

// use this
function makeDir(spaces, str) {
  const dir = document.createElement('p');
  dir.append(indent(spaces, str))
  dir.className = 'base';
  return dir
}

// also use this
function makeDownloadLink(spaces, str, path) {
  const downloadable = document.createElement('p');
  downloadable.className = 'dl-link base'
  downloadable.append(indent(spaces, str))
  downloadable.onclick(() => download(path))
  return downloadable;
}



// under the hood

function download(path) {
  window.open('/file?path=' + path, '_blank')
}

function indent(spaces, str) {
  if (!spaces) return str;
  if (spaces < 0) throw new Error('cannot add negative spaces');
  return '> '.repeat(spaces) + ' ' + str;
}

function getDirMapFromServer() {
  return new Promise(resolve => (
    fetch('/getdir')
      .then(res => res.json())
      .then(body => resolve(body))
  ))
}