node-printer
===============

https://atmospherejs.com/zuzel/node-printer

```bash
meteor add zuzel:node-printer
```

A tool to print document or data. Based on "lp" binary.   
Supports complete set of lp options (http://unixhelp.ed.ac.uk/CGI/man-cgi?lp)

Based on armetiz/node-printer-lp and diegoalberto/node-printer-lp-complete and alepee/node-printer.

## Quick Examples

```js
var Printer = require('node-printer');
var options = {
    media: 'Custom.200x600mm',
    n: 3
};
// Get available printers list
Printer.list();

// Create a new Pinter from available devices
var printer = new Printer('EPSON_SX510');

// Print from a buffer(could be text), file path
var fileBuffer = fs.readFileSync('/path/to/file.ext');
var jobFromBuffer = printer.printBuffer(fileBuffer, options); //or without options

var filePath = 'package.json';
var jobFromFile = printer.printFile(filePath, options);

// Cancel a job
jobFromFile.cancel();

// Listen events from job
jobFromBuffer.once('sent', function() {
    jobFromBuffer.on('completed', function() {
        console.log('Job ' + jobFromBuffer.identifier + 'has been printed');
        jobFromBuffer.removeAllListeners();
    });
});
```

## Options map

Available options:

```javascript
'E': {
    'options': ['E', 'encryption'],
    'description': 'Forces encryption when connecting to the server',
    'expects': '',
    'default': false
  },
  'U': {
    'options': ['U', 'Username', 'username'],
    'description': 'Specifies the username to use when connecting to the server',
    'expects': 'string'
  },
  'c': {
    'options': ['c', 'backwardsCompatibility'],
    'description': 'This option is provided for backwards-compatibility only. On systems  that	support	 it,  this  option forces the print file to be copied to the spool directory before  printing. In CUPS, print files  are always sent to the scheduler via IPP which has the same effect.',
    'expects': '',
    'default': false
  },
  'd': {
    'options': ['d', 'destination'],
    'description': 'Prints files to the named printer',
    'expects': 'string'
  },
  'h': {
    'options': ['h', 'hostname'],
    'description': 'Chooses an alternate server',
    'expects': 'string'
  },
  'i': {
    'options': ['i', 'job-id'],
    'description': 'Specifies an existing job to modify',
    'expects': 'number'
  },
  'm': {
    'options': ['m'],
    'description': 'Sends an email when the job is completed',
    'expects': ''
  },
  'n': {
    'options': ['n', 'copies', 'numCopies'],
    'description': 'Sets the number of copies to print from 1 to 100',
    'expects': 'number',
    'default': 1
  },
  'o': {
    'options': ['o'],
    'description': '"name=value [name=value ...]" Sets one or more job options',
    'expects': 'string',
    'default': ''
  },
  'q': {
    'options': ['q', 'priority'],
    'description': 'Sets the job priority from	1 (lowest) to 100 (highest). The default priority is 50',
    'expects': 'number',
    'default': 1
  },
  's': {
    'options': ['s'],
    'description': 'Do not report the resulting job IDs (silent mode.)',
    'expects': ''
  },
  't': {
    'options': ['t', 'name'],
    'description': 'Sets the job name',
    'expects': 'string'
  },
  'H': {
    'options': ['H', 'when'],
    'description': 'Specifies  when  the  job  should be printed. A value of immediate will print the file immediately, a value of hold will hold the job indefinitely, and a time value (HH:MM) will hold the job until the specified time. Use a value of resume with the -i option to resume a  held job.  Use a value of restart with the -i option to restart a completed job.',
    'default': 'immediate',
    'expects': 'string'

  },
  'P': {
    'options': ['P', 'page-list'],
    'description': 'page-list Specifies which pages to print in the document. The list can  contain a list of numbers and ranges (#-#) separated by commas (e.g. 1,3-5,16).',
    'expects': 'string'
  }
```

For example
```javascript
var options = {
    media: 'Custom.200x600mm',
    n: 3,
    P: "2-3"
};
```

## Roadmap

- [ ] Rewrite option factories
- [ ] Remove dependency to underscorejs
- [ ] Write more tests
- [ ] Find a way to emulate CUPS printers on Travis env
