const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const controller = require("./controller.js")
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

app.delete('/api/delete_task/:key', controller.deleteTask)

const PORT = process.env.SERVER_PORT || 4000; 
app.listen(PORT, () => console.log(`Ready to roll out on port ${PORT}`))