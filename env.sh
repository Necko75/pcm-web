sudo mongod --dbpath /data/db/ > /dev/null &
sleep 2
nodemon server.js
