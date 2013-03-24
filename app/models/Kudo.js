var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var kudoSchema = new Schema({
    id     : ObjectId,
    article: {type: String, required: true},
    title  : {type: String, required: true},
    url    : {type: String, required: true}
});

module.exports = mongoose.model('Kudo', kudoSchema, "kudos");
