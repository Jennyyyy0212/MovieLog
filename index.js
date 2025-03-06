const express = require('express')();
const app = express();
const PORT = 8000;

app.use(express.json()) //middleware

app.listen(
    PORT,
    () => console.log(`Live on http://localhost:${PORT}`)
)