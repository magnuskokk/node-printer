node-printer
===============

A tool to print document or data. Based on "lp" binary.   
Supports complete set of lp options (http://unixhelp.ed.ac.uk/CGI/man-cgi?lp)

Based on armetiz/node-printer-lp and diegoalberto/node-printer-lp-complete.

## Quick Examples

```js
var Printer = require('node-printer-lp-complete');
var options = {
    media: 'Custom.200x600mm',
    n: 3
};

// Get available printers list
Printer.list();

// Create a new Pinter from available devices
var printer = new Printer('EPSON_SX510');

// Print from a buffer, file path or text
var fileBuffer = fs.readFileSync('path/to/file');
var jobBuffer = printer.printBuffer(fileBuffer);

var filePath = 'package.json';
var jobFile = printer.printFile(filePath);

var text = 'Print text directly, when needed: e.g. barcode printers'
var jobText = printer.printText(text);

// Cancel a job
jobFile.cancel();

// Listen events from job
jobBuffer.once('sent', function() {
    jobBuffer.on('completed', function() {
        console.log('Job ' + jobBuffer.identifier + 'has been printed');
        jobBuffer.removeAllListeners();
    });
});
```
