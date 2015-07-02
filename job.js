var utils = require('util');
var events = require('events');

util.inherits(Job, events.EventEmitter);

function Job(lp, identifier) {

    var self = this;
    var error;

    self.identifier = identifier;

    lp.stderr.on("data", function(data) {
        error = data.slice(0, data.length - 1);
    });

    lp.on("exit", function(code) {
        if (0 === code) {
            self.emit("end");
        }
        else {
            self.emit("error", error);
        }
    });

    return self;
}

module.exports = Job;
