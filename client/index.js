var knox = require('knox');
var fs = require('fs');

const client = knox.createClient({
  key: 'DETAS3RVER',
  secret: 'DETAS3RVER',
  bucket: 'test',
  endpoint: 'localhost',
  style: 'path',
  port: 4201
});


var object = { foo: "bar" };
var string = JSON.stringify(object);

//var objPath = "/json_files/obj-" + Date.now() + ".json";
var objPath = "/json_files/obj-test.json";
var req = client.put(objPath, {
    'Content-Length': Buffer.byteLength(string)
  , 'Content-Type': 'application/json'
});
req.on('response', function(res){
  if (200 == res.statusCode) {
    console.log('saved to %s', req.url);
  }
});
req.end(string);

fs.stat(__dirname + '/logo.png', function(err, stat){

	if(err) return console.log(err);

	var req = client.put('/logo.png', {
		'Content-Length': stat.size
	  , 'Content-Type': 'image/png'
	});
  
	fs.createReadStream(__dirname + '/logo.png').pipe(req);
  
	req.on('response', function(res){
	  // ...
	});
  });

  fs.stat(__dirname + '/logo2.png', function(err, stat){

	if(err) return console.log(err);

	var req = client.put('/logo2.png', {
		'Content-Length': stat.size
	  , 'Content-Type': 'image/png'
	});
  
	fs.createReadStream(__dirname + '/logo2.png').pipe(req);
  
	req.on('response', function(res){
	  // ...
	});
  });




	client.list({}, function(err, data){
		console.log(data);
	});


  client.get(objPath).on('response', function(res){
	console.log(res.statusCode);
	console.log(res.headers);
	res.setEncoding('utf8');
	res.on('data', function(chunk){
	  console.log(chunk);
	});

	const fileStream = fs.createWriteStream(__dirname + '/obj-text.json');
	res.pipe(fileStream);

	res.on('end', function(){
		fileStream.end(); // Close the file stream when the response ends
		console.log('File downloaded successfully');
	});

  }).end();


  client.get("logo.png").on('response', function(res){
	console.log(res.statusCode);
	console.log(res.headers);

	const fileStream = fs.createWriteStream(__dirname + '/logo_down.png');
	res.pipe(fileStream);

	res.on('end', function(){
		fileStream.end(); // Close the file stream when the response ends
		console.log('File downloaded successfully');
	});
  }).end();
  

