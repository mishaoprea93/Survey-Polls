var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
}, { usePushEach: true });

mongoose.model('User', UserSchema);

var PollSchema = new Schema({
    question: String,
    _options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, usePushEach: true });

mongoose.model('Poll', PollSchema);

var OptionSchema = new Schema({
    option: String,
    vote: { type: Number, default: 0 },
    poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }
}, { timestamps: true, usePushEach: true });

mongoose.model('Option', OptionSchema);