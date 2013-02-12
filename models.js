var mongoose = require('mongoose');
    mongoose.connect(process.env.PPDELINQ_MONGO_URL);
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