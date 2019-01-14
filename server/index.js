const express = require('express')
const path = require('path')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport');

// import routes and models
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const UserRouter = require('./routes/user');
const PlantRouter = require('./routes/plant');
const authCheckMiddleware = require('./middleware/auth-check');

// initialize option constants
const PORT = process.env.PORT || 5000;
const DB =  process.env.MONGODB_URI || 'mongodb://localhost:27017/plants'
const BODYPARSER_OPTS = { extended: true }
const MONGODB_OPTS = { useCreateIndex: true, useNewUrlParser: true }
const config = require('./config')

const app = express();
const router = express.Router();

require('./models').connect(config.dbUri, MONGODB_OPTS)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

router.use((req, res, next) => {
  console.log("something is happening");
  next();
})

app.use('/auth', authRouter);
app.use('/api', authCheckMiddleware);
app.use('/api', apiRouter);
app.use('/api', UserRouter);
app.use('/api', PlantRouter);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT,  () => {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
})
