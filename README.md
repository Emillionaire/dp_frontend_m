# Project installation guide (frontend)

- Change server url in file dp_frontend_m\src\url.tsx:
  - const backendUrl = 'http://<server_ip>/';

- Craft build:
  - npm i
  - npm run build

- Change server parameters:
  - ssh <username>@<server_ip>
  - sudo chmod 707 /usr/share/nginx/html
  - sudo chmod 707 /usr/share/nginx/html/index.html
  - exit

- Send to server froentend files:
  - scp -r dist/* <username>@<server_ip>:/usr/share/nginx/html

- In browser move to <server_ip> and check