const express = require('express');
const app = express();
const port = 5000;
app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log("I'm listening", port);
});
