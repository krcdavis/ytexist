const fs = require('fs');
const readline = require('readline');
const https = require('https');

const args = process.argv.slice(2);
console.log(args[0]);

const file = readline.createInterface({
    input: fs.createReadStream(args[0]),
    output: process.stdout,
    terminal: false
});

//var substring;

file.on('line', function(line) {
    var substring;

    if (line.length > 12) {

	if (line.indexOf('.') > -1){//assumed filename vers
	    substring = line.slice(0,line.lastIndexOf('.'));

	    if (substring[substring.length - 1] == ']'){
		substring = substring.slice(0, substring.length - 1);
	    } //]

	    var sneb = substring.length;
	    substring = substring.slice(sneb - 11, sneb);
	}//'.'
	else if (line.indexOf(' ') > -1) {//assumed ytdl archive file vers- 'youtube 11id'
	    substring = line.slice(line.indexOf(' ')+1, line.length);
	}//' '
	//console.log(substring)
	if (substring.indexOf(' ') > -1) {//bad
	    console.log(`problemaa ${line}`);
	}// muh unescaped characters
	else {
	substring = 'http://www.youtube.com/oembed?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + substring + '&format=json'

	const options = {
	    hostname: 'youtube.com',
	    port: 443,
	    path: substring,
	    method: 'GET',
	    }//options

	const req = https.request(options, res => {
	 //console.log(`statusCode: ${res.statusCode}`);
	 //res.on('data', d => {
	 //   process.stdout.write(d);});
	 if (res.statusCode != 200){
	  console.log(`statusCode: ${res.statusCode} ${line}`);
	 }//status

	});



	req.end();
	
	}// else- actual http req


    }//12




});//file