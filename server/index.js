/*
 * S3rver on Deta Micro w/ Deta Base (metadata) + Drive (files) storage
 * 
 * ENV BUCKETS = comma separated buckets (test,default,etc)
 * ENV DETA_TOKEN = provided by Micro runtime
 * ENV DETA_RUNTIME = provided by Micro runtime
 * 
 */

const express = require('express')
const app = express()
const cors = require('cors');
const S3rver = require('./s3rver/lib/s3rver.js');
const { fromEvent } = require('rxjs');
const { filter } = require('rxjs/operators');
const fs = require('fs').promises;

const port = process.env.PORT || 4568;
const isMicro = process.env.DETA_RUNTIME || process.env.DETA_RUNTIME || false;
const rootPath = isMicro ? '/tmp/s3' : '/tmp/s3'; 

const { Deta } = require('deta');
const deta = Deta(process.env.DETA_TOKEN);
const base = deta.Base('s3rver');

// Set Buckets from BUCKETS ENV csv
var BUCKETS = process.env.BUCKETS.split(',').map(name => ({name})) || false;


async function main() {
  
  const dbBucketList= await base.get('bucketlist');
  const bucketlist = [];
  console.log(dbBucketList); 

  if (!dbBucketList) {
    //new Date(stat.birthtime)
    for (const bucket of BUCKETS) {
      bucketlist.push({
        name: bucket.name,
        creationDate: new Date() ,
        stat: JSON.stringify({birthtime: new Date()}),
      });
    } 

    await base.put({key: 'bucketlist', value: bucketlist});
  }

  const s3rver = new S3rver({
    port: 4569,
    address: 'localhost',
    silent: false,
    directory: rootPath,
    allowMismatchedSignatures: true,
    vhostBuckets: false,
    configureBuckets: BUCKETS || [{ name: 'test'}]
  });
  //S3rver.store = require('./lib/store');

  const s3Events = fromEvent(s3rver, 'event');
  s3Events.subscribe((event) => {
    console.log(event);
    console.log(event.Records);
  });
  s3Events.pipe(filter((event) => event.Records[0].eventName == 'ObjectCreated:Copy')).subscribe((event) => console.log(event));
  s3Events.pipe(filter((event) => event.Records[0].eventName == 'ObjectCreated:Put')).subscribe(async(event) => {
    //console.log(event.Records[0].s3.object)
    const filePath = rootPath + '/' + event.Records[0].s3.bucket.name + '/' + event.Records[0].s3.object.key + "._S3rver_object";
    //console.log(data);
  });


  // CORS middleware 
  app.use(cors());
  // S3 API middleware
  app.all('*', (req, res) => {
      s3rver.getMiddleware()(req, res);
  });

  // List all active middlewares
  app._router.stack.forEach((middleware, index) => {
    if (middleware.route) {
      // This is a route definition
      //console.log(`Route: ${middleware.route.path}`);
    } else if (middleware.name) {
      // This is a middleware function
      //console.log(`Middleware: ${middleware.name}`);
    }
  });

  if (!isMicro) app.listen({port: process.env.PORT || 4568, host: process.env.HOST || "0.0.0.0"})

  console.log('s3rver listening on port ' + port + '...')

}


main();

module.exports = app;