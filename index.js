const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const routes = require('./app/routes');
routes(app);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));