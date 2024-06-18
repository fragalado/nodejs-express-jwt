const express = require('express');
const { verifyToken } = require('./middleware/jwtMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", require('./routes/authRoute'));
app.use("/api", verifyToken, require('./routes/rickyAndMortyRoute'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})