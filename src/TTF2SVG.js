var fs = require('fs');
var os = require('os');
var q = require('q');
var ttfjs = require('./../vendor/ttf.js');

var SVGgetter = {
    _spaceFilter: function(s,i,a) {
        return s.replace(/\s/g, "");
    },
    _commaReplacer: function(s) {
        return s.replace(",", " ");
    },
    _filterZ: function(s) {
        return !s.match(/[zZ]/g);
    },
    _addSuffixSpace: function(s) {
        return s.replace(/[a-xA-X]/g, function(c) {return c + " ";});
    },
    _wrapTypeface: function(glyf) {
        var o = {};
        if(!glyf)
            return o;
        o["x_min"] = glyf.xMin;
        o["x_max"] = glyf.xMax;
        o["ha"] = glyf.yMax - glyf.yMin;
        o["o"] = glyf.pathArray
                    .filter(this._filterZ)
                    .map(this._spaceFilter)
                    .map(this._commaReplacer)
                    .map(this._addSuffixSpace)
                    .join(" ")
                    .toLowerCase()
                 + " ";
        return o;
    },
    getGlyfPathByChar: function(charConfig, sendResponse, response) {
        q.nfcall(fs.readFile, charConfig.ttfFilePath)
            .then(function(data) {
                return new ttfjs.TTF(data);
            }).then(function(ttfData) {
                return [ttfData, ttfData.cmap.getGlyphIndex(charConfig.char)[1]];
            }).spread(function(ttfData, charIndex) {
                return ttfData.glyf[charIndex];
            }).then(function(charGlyf) {
                return charGlyf.path;
            }).then(function(glyfPath) {
                var obj = new Object();
                obj['char'] = charConfig.char;
                obj['glyfPath'] = glyfPath;
                return JSON.stringify(obj);
            }).then(function(glyfPathJSONstr) {
                return sendResponse(glyfPathJSONstr, response);
            }).fail(function(err) {
                return sendResponse(err, response);
            }).done();
    },
    getGlyfPathByIndex: function(charConfig, sendResponse, response) {
        // Testing
        q.nfcall(fs.readFile, charConfig.ttfFilePath)
            .then(function(data) {
                return new ttfjs.TTF(data) || "";
            }).then(function(ttfData) {
                return ttfData.glyf[charConfig.index] || "";
            }).then(function(charGlyf) {
                return charGlyf.path || "";
            }).then(function(charGlyfPath) {
                return sendResponse(charGlyfPath, response);
            }).fail(function(err) {
                return err;
            }).done();
    },
    getCharByIndex: function(charConfig, sendResponse, response) {
        // Testing
        q.nfcall(fs.readFile, charConfig.ttfFilePath)
            .then(function(data) {
                return new ttfjs.TTF(data);
            }).then(function(ttfData) {
                ttfData.cmap.getCharByIndex(charConfig.index)
                return sendResponse("1", response);
            }).fail(function(err) {
                return sendResponse(err, response);
            }).done();
    },
    makeTypefaceJS: function(charConfig, sendResponse, response) {
        q.nfcall(fs.readFile, charConfig.ttfFilePath)
            .then(function(data) {
                return new ttfjs.TTF(data);
            }).then(function(ttfData) {
                return [ttfData, ttfData.cmap.getGlyphIndex(charConfig.char)[1]];
            }).spread(function(ttfData, charIndex) {
                return ttfData.glyf[charIndex];
            }).then(function(charGlyf) {
                return JSON.stringify(SVGgetter._wrapTypeface(charGlyf));
            }).then(function(typeface) {
                return sendResponse(typeface, response);
            }).fail(function(err) {
                console.log(new Date());
                console.log("makeTypefaceJS Error: " + err);
                return sendResponse(err, response);
            }).done();
    },
    doForLoopInTTF: function(charConfig, xyzapp) {
        q.nfcall(fs.readFile, charConfig.ttfFilePath)
            .then(function(data) {
                return new ttfjs.TTF(data);
            }).then(function(ttfData) {
                console.time("upload");
                var count = 0;
                for(var i = 0, l = ttfData.glyf.length; i < l; i++) {
                    xyzapp.createTextBlock('ttf' + i % 100, 'fzjzt-' + i, JSON.stringify(SVGgetter._wrapTypeface(ttfData.glyf[i])) || '{}', '', function(){
                        console.log(++count + '/' + l);
                        if(count == l)
                            console.timeEnd("upload");
                    });
                }
                return;
            }).fail(function(err) {
                throw err;
            }).done(function() {
            });
    }
}

module.exports = SVGgetter;