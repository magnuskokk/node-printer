// TODO: need false data from `lpq` and `lpstat` to create tests from travis ci

var Printer = require('../printer.js');

describe('get list of installed printers', function() {
  var list = Printer.list();
  if (!list.length) return;

  it('should return a list of printers name', function() {
    expect(list.length > 0).toBe(true);
  });

  it('should verify printer existance', function() {
    expect(Printer.match(list[0])).toBe(true);
    expect(Printer.match('fakePrinterName')).toBe(false);
  });
});
