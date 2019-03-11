# modeling a directory structure with object literals

Fill out the functions `getDirMap` in `/index.js` and `createDOMNodes` in `/static/index.js`.

The goal is to read the directory `/files`, make an object literal that represent's it's structure, and then send it to the client. On the client, the object should be used to make a visual representation of the directory structure using the included helper functions. For files, the function `createDownloadLink` should be used to create the node. When done correctly, this should make all files in the directory `/files` downloadable by clicking the link.

## tldr;
`getDirMap` on the server side should read through the directory `files` and return a representation of it using nested object literals. This representation is then recieved by the client on page load through a get request to the route `/getdir`. A representation of the structure should be created in createDOMNodes and displayed on the page with download links. `createDir` and `createDownloadLink` are included helper functions that return dom nodes that you may use.

The server can be started by running npm start in the base directory for this exercise.