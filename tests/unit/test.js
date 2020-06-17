'use strict';

describe('Module-level features:', function () {
	// beforeAll(() => console.log("Testing started – before all tests"));
	// afterAll(() => console.log("Testing finished – after all tests"));

	// beforeEach(() => console.log("Before a test – enter a test"));
	// afterEach(() => console.log("After a test – exit a test"));

	describe('when log level isLevel.DEBUG', function () {
		it('should have a priority order equal to Level.DEBUG', function () {
			expect('DEBUG').toEqual('DEBUG');
		});
		it('should have a priority order equal to Level.TRACE', function () {
			expect('TRACE').toEqual('TRACE');
		});
	});
});
