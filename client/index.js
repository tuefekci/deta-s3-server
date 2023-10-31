var knox = require('knox');
const client = knox.createClient({
  key: 'S3RVER',
  secret: 'S3RVER',
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


client.list({}, function(err, data){
	console.log(data);
  
	/* `data` will look roughly like:


	{
	  Prefix: 'my-prefix',
	  IsTruncated: true,
	  MaxKeys: 1000,
	  Contents: [
		{
		  Key: 'whatever'
		  LastModified: new Date(2012, 11, 25, 0, 0, 0),
		  ETag: 'whatever',
		  Size: 123,
		  Owner: 'you',
		  StorageClass: 'whatever'
		},
		⋮
	  ]
	}
  
	*/
  });