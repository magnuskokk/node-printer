var utils = require('util');
var events = require('events');
var spawn = require('child_process').spawn;

utils.inherits(Job, events.EventEmitter);

function Job(lp) {

    var self = this;
    var error;

    self.on('status:active', function() {
        console.log('printing');
    });

    lp.stderr.on('data', function(data) {
        error = data.slice(0, data.length - 1);
    });

    lp.stdout.on('data', function(data) {
        var matchedId = data.match(/^request id is .*-(\d+)/)[1];
        if (matchedId) self.identifier = matchedId;
    });

    lp.on('exit', function(code) {
        if (0 === code) {
            self.emit('end');
        }
        else {
            self.emit('error', error);
        }
    });
}

Job.prototype.getStatus = function() {
    var lpq = spawn('lpq', []);
    lpq.stdout.on('data', function(raw){
        raw = raw.split('\n');
        raw.shift();
        if (raw[0].match(/no entries/)) {
            lpq.stdout.removeAllListeners('data');
            self.status = 'inactive';
            return self.emit('status:inactive');
        }

        raw.shift();

        data = raw.map(function(row) {
            row = row.split(/[ ]{2,}/);
            return {
                rank: (row[0] === 'active' ? row[0] : row[0].slice(0, -2)),
                owner: row[1],
                job: row[2],
                files: row[3],
                totalSize: row[4]
            };
        }).filter(function(row) {
            return self.identifier == row.job;
        })[0];

        if (data.length) {
            self.status = data.rank;
            self.emit('status:' + data.rank, data);
        } else {
            lpq.stdout.removeAllListeners('data');
            self.status = 'inactive';
            self.emit('status:inactive');
        }
    });
};

Job.prototype.cancel = function() {
    var self = this;
    var lprm = spawn('lprm', [self.identifier]);
    lprm.on('exit', function(code) {
        if (0 === code) self.emit('deleted');
    });
};

module.exports = Job;
