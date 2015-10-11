node-printer
===============

https://atmospherejs.com/zuzel/node-printer

```bash
meteor add zuzel:node-printer

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

// Print from a buffer, file path or text
var fileBuffer = fs.readFileSync('/path/to/file.ext');
var jobFromBuffer = printer.printBuffer(fileBuffer);

var filePath = 'package.json';
var jobFromFile = printer.printFile(filePath);

var text = 'Print text directly, when needed: e.g. barcode printers'
var jobFromText = printer.printBuffer(text);

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

## Roadmap

- [ ] Rewrite option factories
- [ ] Remove dependency to underscorejs
- [ ] Write more tests
- [ ] Find a way to emulate CUPS printers on Travis env
