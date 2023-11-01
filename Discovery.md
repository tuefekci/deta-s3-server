---
title: "S3 Server"
tagline: "S3 Server for Deta.space"
theme_color: "#FF9822"
git: "<https://github.com/tuefekci/deta-s3-server>"
homepage: "<https://github.com/tuefekci/deta-s3-server>"
ported_from: "https://github.com/jamhall/s3rver"
---

# ATTENTION:
- This is alpha software not tested in production. Use at your own risk. If you find any bugs please open an issue or contribute to the project. 
- There is no Access Control to view data implemented yet. This means all your data is accessible by anyone. So only use this if the data you are storing is public anyway. Uploads are not possible without the Access Key and Secret.

# S3 Server	
S3 Server for Deta.space (Deta Drive) written in NodeJS based on jamhall/s3rver. This is a simple S3 Server that uses Deta Drive as a backend. It is not a full S3 implementation.

## Usage
You need to Edit the Environment Variables via Configuration
- BUCKET_NAME: Names of the Bucket/Deta Drives you want to use, comma separated
- KEY: Access Key
- SECRET: Access Secret

If key or secret is empty it will use as the default key/secret DETA_PROJECT_KEY but you should not use this in production.

## Endpoints
All endpoints are public. No authentication required. This also means all your data is accessible!!!

## Limits
- Max file size: 5MB (Deta Payload Size limit, if the payload limit changes it will be the drive file size limit) // There is perhaps a way to bypass this limit by chunking which would work in some scenarios but i have not implemented it yet because uploads or downloads are not really an issue but the micro limits are. So if you store bigger files just split them up into smaller files.

## Nice to have
Feel free to request more in the issues, build this for my own use case but i am happy to add more features if they are useful for others as well.
- Multiple Users
- Access Control
- Dynamic Bucket Creation
- ACP
- Stats

## Known Issues
- No support for Website Hosting // never used it so im not sure what to look for
- No support for multipart uploads // not implemented yet
- No support for Bucket creation via API use the ENV Variable BUCKET to assign buckets // This is not a technical problem it is to safe on calls to base and make everything faster.
- No support for ACL // not implemented yet
- No support for Versioning // not implemented yet
- No support for CORS // not implemented yet
- No support for Bucket Policies // not implemented yet
- No support for the copy (copying files from one bucket to another or in the same bucket) // This is not possible directly with Deta Drive and implementing it would require a workaround
