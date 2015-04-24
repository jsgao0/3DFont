var server = require('express')(),
	http = require('http'),
	fs = require('fs'),
	azureBlob = require('./src/azure-blob'),
	TTF2SVG = require('./src/TTF2SVG');

function webServer() {

	function sendResponse(returnValue, response) {
		// response.writeHead(200, {"Content-Type": "text/plain"});
		// response.write(returnValue);
		// response.end();
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
		.get('/getGlyfPathByIndex/:index', getGlyfPathByIndex)
		.get('/getCharByIndex/:index', getCharByIndex)
		.listen(12345);

	console.log("Web Server has started.");
}

function serviceServer() {
	console.log("Service Server has started.");

	var xyzapp = new azureBlob();

	// for(var i = 0; i < 100; i++) {
	// 	xyzapp.createContainer('ttf' + i, '');
	// }

	// xyzapp.createContainer('test', '', function(error, result, response) {
	// 	var charConfig = {
	// 		ttfFilePath: './ttfs/fzjzt.ttf'
	// 	}
	// 	TTF2SVG.doForLoopInTTF(charConfig, xyzapp)
	// });

	// xyzapp.createFileBlock('test', 'fzjzt.ttf', './ttfs/fzjzt.ttf') // -->> ok

	// var fileStream = fs.createReadStream('./ttfs/fzjzt.ttf'),
	// 	streamLength = 0;
	// fileStream
	// 	.on('readable', function() {
	// 		var chunk;
	// 		while(null !== (chunk = fileStream.read())) {
	// 			streamLength += chunk.length;
	// 			console.log('got %d bytes of data', chunk.length)
	// 		}

	// 	})
	// 	.on('end', function() {
	// 		console.log('Stream length: %d bytes.', streamLength);
	// 		xyzapp.createStreamBlock('test', 'streamTest02', fileStream, streamLength) // -->> doing
	// 	})

	// xyzapp.createTextBlock('test', 'text01', '123456') // -->> ok

	// xyzapp.createFilePageBlob('test', 'page01', './ttfs/fzjzt.ttf')
	
}

module.exports.webServer = webServer;
module.exports.serviceServer = serviceServer;