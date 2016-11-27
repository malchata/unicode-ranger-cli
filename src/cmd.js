#!/usr/bin/env node

"use strict";

import fs from "fs";
import path from "path";
import unicodeRanger from "unicode-ranger";
import read from "read-file-stdin";
import { EOL } from "os";

const opts = require("minimist")(process.argv.slice(2), {
	alias: {
		h: "help"
	}
});
const urls = opts._[0];
const helpFile = path.join(__dirname, "../usage.txt");
const eolRegex = new RegExp(EOL, "g");

const outputRanges = (urlList) => {
	unicodeRanger(urlList).then((ranges) => console.log(ranges));
};

if(urls === "help" || urls === undefined || opts.help){
	fs.createReadStream(helpFile)
		.pipe(process.stdout)
		.on("close", () => {
			process.exit(1);
		});
}
else if(urls.indexOf("https://") !== -1 || urls.indexOf("http://") !== -1){
	outputRanges(urls);
}
else{
	read(path.resolve(urls), (error, buffer) => {
		if(error){
			console.log("Error! Code " + error.code + " attempting " + error.syscall + " on " + error.path);
			process.exit(1);
		}
		else{
			let urlsToParse = buffer.toString().trim().replace(eolRegex, ";");
			outputRanges(urlsToParse);
		}
	});
}