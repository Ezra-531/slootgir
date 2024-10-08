
![Rigtools](https://i.ibb.co/7S6zMxb/rigtools.png)

# Rigtools
[![forthebadge made-with-javascript](http://ForTheBadge.com/images/badges/made-with-javascript.svg)](https://www.javascript.com/)

Extension/Devtools code execution. fork by htauk
## How to use
```sh
$ git clone https://github.com/htauk/htauk-rigtools 
$ cd rigtools
$ npm i
# Create a file named `server_config.json`
# Then paste in `{"updater_url":"localhost:8080"}` (Or whatever your websocket URL is)
$ npm start
```
- Then visit `devtools://devtools/bundled/devtools_app.html` in your browser
- Open a new tab and visit `devtools://devtools/bundled/devtools_app.html?experiments=true&ws=*websocket url*`
- Click on `Network`
- Then click on the gray box twice

## Terminology
- Entry
  - Entrypoint (or main script) when running devtools xss.
  - Payload
  - Script passed to extension to run code, such as disabling extensions.
- Chrome URLs
  - Elevated URLs that have extra access to features such as WebUI.
  - Only modify the entrypoint when necessary. If not modified properly, thigns such as the updater will break, do not remove any buttons and reuse ids.

## Release information
- Release 0.0.1
  - This release contains the following things:
    - Updater
    - Extension debugging
    - Devtools debugging
    - Chrome url debugging.
