/// <reference path="C:\Users\Sean\workspace\vastengine\src/Dialog.js" />
//************************************************************************************//
// Test suite for Dialog class
//************************************************************************************//
describe('Dialog', function () {
    var dialog;

    beforeEach(function () {
        dialog = new vastengine.Dialog('Hello', 320, 240, ['option1', 'option2'], function (choice) {
            // do nothing.
        });
    });

    it('Creates a button for each option supplied.', function () {
        expect(dialog.buttons.length).toEqual(2);
    });

    it('Calls the callback with the selection that was made.', function () {
        spyOn(dialog, 'doCallback');
        dialog.doCallback(123);
        expect(dialog.doCallback).toHaveBeenCalledWith(123);
    });
});