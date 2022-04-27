const express = require('express');
const mongoose = require('mongoose');
const { newsRouter, newsRouterClient } = require('./src/routes/News/newsRoutes');
const employeeRouter = require('./src/routes/Employee/employeeRoutes');
const cors = require('cors');
require('dotenv/config')

///////////////////////////// mongodb+srv://skill-counter-api:<password>@cluster0.figsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const path = require('path');

const app = express()


app.use(express.json())
app.use(cors())

/////////////////////////////////

app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static('public'))
///////Client///////////////////////////////////////
app.use('/news', newsRouterClient);

//////Employee//////////////////////////////////////s
app.use("/news", newsRouter);
app.use("/employee", employeeRouter);

/////////////////////////////////////////////////

app.get('/', (req, res) => res.send('yes aim working on host 4000'))


mongoose.connect(
    process.env.DB_CONECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
    (err) => err ? console.log(err) : console.log("db is conected")
);

app.listen(process.env.PORT || 4000)