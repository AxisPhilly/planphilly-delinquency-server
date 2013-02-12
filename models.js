var mongoose = require('mongoose');
    mongoose.connect(process.env.MONGOLAB_URI);
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Property schema
var Property = new Schema({
  address: {type: String, required: true},
  dimPercent: {type: Number, required: true},
  count: {type: Number, required: true}
});

mongoose.model('Property', Property);

var Property = exports.Property = mongoose.model('Property');