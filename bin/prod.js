const helmet = require('helmet');
const compression = require('compression');
var cors = require('cors');

module.exports = function(app){
    //app.use(requireHTTPS);

    //var allowedOrigins = ['http://localhost:3000','http://gumiranda-react.github.io','https://gumiranda-react.github.io/','http://www.gumiranda-react.github.io'];

/*app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'TESTE';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));*/
    //app.options('*', cors());

    //app.use(cors());
    app.use(helmet());
    app.use(compression());

}

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }