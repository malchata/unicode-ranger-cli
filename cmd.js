#!/usr/bin/env node

"use strict";

var fs = require("fs"),
	path = require("path"),
	unicodeRanger = require("unicode-ranger").default,
	read = require("read-file-stdin"),
	eol = require("os").EOL;

var opts = require("minimist")(process.argv.slice(2), {
	alias: {
		h: "help"
	}
});

var urls = opts._[0];

if(urls === "help" || urls === undefined || opts.help){
	return fs.createReadStream(path.join(__dirname, "./usage.txt"))
		.pipe(process.stdout)
		.on("close", function(){
			process.exit(1);
		});
}

if(urls.indexOf("https://") === -1 && urls.indexOf("http://") === -1){
	read(path.join(__dirname, urls), function(error, buffer){
		if(error){
			console.log("Error! Code " + error.code + " attempting " + error.syscall + " on " + error.path);
		}
		else{
			var urlsToParse = buffer.toString().trim().replace(new RegExp(eol, "g"), ";");

			unicodeRanger(urlsToParse).then(function(ranges){
				console.log(ranges);
			});
		}
	});
}
else{
	unicodeRanger(urls).then(function(ranges){
		console.log(ranges);
	});
}