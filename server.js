var server = require('express')(),
	http = require('http'),
	fs = require('fs'),
	TTF2SVG = require('./src/TTF2SVG');

function webServer() {

	function sendResponse(returnValue, response) {
		response.jsonp(JSON.parse(returnValue));
	}

	function sendError(returnCode, response) {
		response.sendStatus(returnCode);
	}

	function getGlyfPathByChar(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/' + request.params.ttf + '.ttf',
			char: request.params.char
		}
		TTF2SVG.getGlyfPathByChar(charConfig, sendResponse, sendError, response);
	}

	function serveTypefaceJS(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/' + request.params.ttf + '.ttf',
			char: request.params.char
		}
		TTF2SVG.makeTypefaceJS(charConfig, sendResponse, sendError, response);
	}

	function getGlyfPathByIndex(request, response) {
		var charConfig = {
			ttfFilePath: './ttfs/' + request.params.ttf + '.ttf',
			index: request.params.index
		}
		TTF2SVG.getGlyfPathByIndex(charConfig, sendResponse, sendError, response);
	}

	function getCharByIndex(request, response) {
		// TODO
		var charConfig = {
			ttfFilePath: './ttfs/' + request.params.ttf + '.ttf',
			index: request.params.index
		}
		TTF2SVG.getCharByIndex(charConfig, sendResponse, sendError, response);
	}

	server
		.get('/', function(req, res) {sendResponse(1, res)})
		.get('/getGlyfPathByChar/:ttf/:char', getGlyfPathByChar)
		.get('/serveTypefaceJS/:ttf/:char', serveTypefaceJS)
		.get('/getGlyfPathByIndex/:ttf/:index', getGlyfPathByIndex)
		// .get('/getCharByIndex/:ttf/:index', getCharByIndex)
		.listen(process.env.PORT || 5000);

	console.log("Web Server has started.");
}

module.exports.webServer = webServer;