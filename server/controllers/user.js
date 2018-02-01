var mongoose = require('mongoose');
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');
var Option = mongoose.model('Option')


module.exports = {
    login: function(req, res) {
        // console.log("$$$$$$$$$", req.body.name);
        User.find({ name: req.body.name }, function(err, users) {
            if (users.length < 1) {
                User.create({ name: req.body.name }, function(err, user) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.user = user;
                    req.session.save();
                    // console.log("*******", req.session.user);
                    res.json(req.session.user);
                })
            } else {
                req.session.user = users[0];
                req.session.save();
                console.log("*******", req.session.user);
                res.json(req.session.user);
            }
        })
    },

    addpoll: function(req, res) {
        Poll.create({ question: req.body.question, _user: req.session.user._id }, function(err, poll) {
            Option.create({ option: req.body.option1, poll: poll._id }, function(err, option1) {
                poll._options.push(option1._id);
                // poll.save();
                Option.create({ option: req.body.option2, poll: poll._id }, function(err, option2) {
                    poll._options.push(option2._id);
                    // poll.save();
                    Option.create({ option: req.body.option3, poll: poll._id }, function(err, option3) {
                        poll._options.push(option3._id);
                        // poll.save();

                        Option.create({ option: req.body.option4, poll: poll._id }, function(err, option4) {
                            poll._options.push(option4._id);
                            poll.save();
                            console.log("result polll@@@@@@", poll);
                            if (err) {
                                console.log(err);
                            } else {
                                Poll.find({}).populate('_user').exec(function(err, polls) {
                                    if (err) {
                                        console.log("something went wrong");
                                    } else {
                                        res.json(polls)
                                    }
                                })
                            }
                        })

                    })
                })

            })

        })
    },

    findpolls: function(req, res) {
        Poll.find({}).populate('_user').exec(function(err, polls) {
            if (err) {
                console.log("something went wrong");
            } else {
                res.json(polls)
            }
        })
    },

    deletepoll: function(req, res) {
        Poll.findByIdAndRemove(req.body.id, function(err, poll) {
            Poll.find({}).populate('_user').exec(function(err, polls) {
                if (err) {
                    console.log("something went wrong");
                } else {
                    res.json(polls)
                }
            })
        })
    },

    options: function(req, res) {
        Poll.findById(req.body.id).populate('_options').exec(function(err, poll) {
            res.json(poll);
        })
    },

    vote: function(req, res) {
        Option.findById(req.body.id, function(err, option) {
            option.vote += 1;
            option.save();
            Poll.findById(option.poll).populate('_options').exec(function(err, poll) {
                res.json(poll);
            })
        })
    }

}