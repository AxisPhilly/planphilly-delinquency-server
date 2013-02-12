var sys = require('sys'),
    fs = require('fs'),
    http = require('http'),
    url = require('url');

// server
var httpServer = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
  res.write('hello');

  var urlParts = url.parse(req.url);

  console.log(process.env.PPDELINQ_LOAD_KEY);

  if (urlParts.pathname === '/' + process.env.PPDELINQ_LOAD_KEY) {
    loadData();
  }

  res.end();
});

httpServer.listen(process.env.PORT || 3000);

var nowjs = require('now'),
    everyone = nowjs.initialize(httpServer, {
      socketio: {
        transports: ['xhr-polling', 'jsonp-polling'],
        "polling duration": 10
      }
    }),
    models = require('./models'),
    Property = models.Property;

var loaded = 0;

// bulk load properties
function loadData() {
  console.log('foo');
  if (!loaded) {
    console.log('bar');
    var props1 = require('/data/props-load1.json');
    var props2 = require('/data/props-load2.json');
    var props3 = require('/data/props-load3.json');

    Property.collection.insert(props1, {}, function(err){
      console.log(err);
    });
    Property.collection.insert(props2, {}, function(err){
      console.log(err);
    });
    Property.collection.insert(props3, {}, function(err){
      console.log(err);
    });

    loaded = 1;
  }
}

// now js search function
everyone.now.search = function(text, count, callback) {
  // create regex for "contains" and ignore case
  var regex = new RegExp(text.term, 'i');
  // execute the search
  Property.find({address: regex}, function(err, docs) {
    callback(null, docs);
  });
};