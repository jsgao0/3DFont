var server = require('express')(),
	http = require('http'),
	fs = require('fs'),
	TTF2SVG = require('./src/TTF2SVG');

function webServer() {

	function sendResponse(returnValue, response) {
		// response.writeHead(200, {"Content-Type": "text/plain"});
		// response.write(returnValue);
		// response.end();
		console.log(returnValue)
		response.jsonp(JSON.parse(returnValue))
	}

	function getGlyfPathByChar(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/fzjzt.ttf',
			char: request.params.char
		}
		TTF2SVG.getGlyfPathByChar(charConfig, sendResponse, response);
	}

	function serveTypefaceJS(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/fzjzt.ttf',
			char: request.params.char
		}
		TTF2SVG.makeTypefaceJS(charConfig, sendResponse, response);
	}

	function getGlyfPathByIndex(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/fzjzt.ttf',
			index: request.params.index
		}
		TTF2SVG.getGlyfPathByIndex(charConfig, sendResponse, response);
	}

	function getCharByIndex(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/fzjzt.ttf',
			index: request.params.index
		}
		TTF2SVG.getCharByIndex(charConfig, sendResponse, response);
	}

	server
		.get('/getGlyfPathByChar/:char', getGlyfPathByChar)
		.get('/serveTypefaceJS/:char', serveTypefaceJS)
		// .get('/getGlyfPathByIndex/:index', getGlyfPathByIndex)
		// .get('/getCharByIndex/:index', getCharByIndex)
		.listen(12345);

	console.log("Web Server has started.");
}

module.exports.webServer = webServer;