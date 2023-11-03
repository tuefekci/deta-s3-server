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

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 4568;
const isMicro = process.env.DETA_RUNTIME || process.env.DETA_RUNTIME || false;
const rootPath = isMicro ? '/tmp/s3' : '/tmp/s3'; 

const { Deta } = require('deta');
const deta = Deta(process.env.DETA_TOKEN);
const base = deta.Base('s3rver');

// Set Buckets from BUCKETS ENV csv
var BUCKETS = process.env.BUCKETS.split(',').map(name => ({name})) || false;


if(!process.env.DETA_PROJECT_KEY) {
  console.error("DETA_PROJECT_KEY is required");
  process.exit(1);
}

var key = process.env.DETA_PROJECT_KEY;
var secret = process.env.DETA_PROJECT_KEY;

if(process.env.KEY) {
  key = process.env.KEY;
}

if(process.env.SECRET) {
  secret = process.env.SECRET;
}

if(!isMicro) {
  key = 'DETAS3RVER';
  secret = 'DETAS3RVER';
}

const s3rver = new S3rver({
  port: port,
  address: 'localhost',
  silent: false,
  directory: rootPath,
  allowMismatchedSignatures: true,
  vhostBuckets: false,
  defaultAccessKeyId: key,
  defaultSecretAccessKey: secret,
});

// CORS middleware 
app.use(cors());
// S3 API middleware
app.all('*', (req, res) => {
    //console.log(req.method, req.url, req.headers)
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

app.listen({port: port, host: host})
console.log('s3rver listening on  ' + host + ":" + port + '')

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

module.exports = app;