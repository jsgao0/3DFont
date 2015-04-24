var expect = require('chai').expect;

var azureBlob = require('../src/azure-blob');

describe("azureBlob", function() {
	describe("constructor", function() {
		it("should be an instance of azureBlob", function() {
			var blob = new azureBlob();
			expect(blob).to.be.an.instanceof(azureBlob);
		});
	})
})
	
