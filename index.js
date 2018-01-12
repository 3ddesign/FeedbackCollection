const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect to remote mongoDB base (using mongoose lib):
mongoose.connect(keys.mongoURI);

const app = express();

//for stripe route (parsing request body)
app.use(bodyParser.json());

//Enable cookies:
app.use(
    cookieSession({
        //cookie expiration and random key:
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//Change urls routes in case of production
if (process.env.NODE_ENV === 'production') {
    //in any case look in build
    app.use(express.static('client/build'));

    // if not found file in build, when give index.html:
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//config port by default:
const PORT = process.env.PORT || 5000;
app.listen(PORT);
