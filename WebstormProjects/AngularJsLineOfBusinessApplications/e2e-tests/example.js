'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

    it('should display landing page', function() {

        browser.get(browser.baseUrl);

        expect(browser.getLocationAbsUrl()).toMatch(browser.baseUrl);
    });
});
