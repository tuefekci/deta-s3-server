---
title: "S3 Server"
tagline: "S3 Server for Deta.space"
theme_color: "#FF9822"
git: "https://github.com/tuefekci/deta-s3-server"
homepage: "https://github.com/tuefekci/deta-s3-server"
---

# **ATTENTION:**
- **Caution:** This software is in its alpha stage and has not been tested in a production environment. Use it at your own risk. If you encounter any bugs, please open an issue or contribute to the project.
- **No Access Control:** Access control to view data has not been implemented yet. This means that all your data is accessible to anyone. Only use this if the data you are storing is meant to be public. Uploads are not possible without the Access Key and Secret.

# **S3 Server**
S3 Server for Deta.space (Deta Drive), written in NodeJS and based on jamhall/s3rver. This is a simple S3 Server that utilizes Deta Drive as a backend, but please note that it is not a full S3 implementation.

## **Usage**
You need to edit the environment variables via configuration:
- `BUCKETS`: Names of the Bucket/Deta Drives you want to use, separated by commas.
- `maxResponseSize`: Maximum size of the response in MB. Default: (2MB)
- `KEY`: Access Key.
- `SECRET`: Access Secret.

If the key or secret is empty, it will default to using `DETA_PROJECT_KEY`, but it is not recommended for production use.

## **Endpoints**
All endpoints are public, and no authentication is required. This also means that all your data is accessible.

## **Limits**
- **No Access Control:** Access control is not yet implemented, which means that all your data is accessible to anyone. Only use this if the data you are storing is meant to be public. Uploads are not possible without the Access Key and Secret.

## **Nice to Have**
Feel free to request more features through the issues. I built this for my own use case but I am willing to add more features if they are useful for others as well.
- Multiple Users
- Access Control
- Dynamic Bucket Creation
- ACP (Access Control Policies)
- Stats

## **Known Issues**
- **No Support for Website Hosting:** Website hosting is not supported as it has never been used, and I am not sure what to look for.
- **No Support for Multipart Uploads:** Multipart uploads are not implemented yet.
- **No Support for Bucket Creation via API:** Use the environment variable `BUCKET` to assign buckets; this is not a technical problem but is meant to save on calls to the base and improve performance.
- **No Support for ACL (Access Control List):** ACL is not implemented yet.
- **No Support for Versioning:** Versioning is not implemented yet.
- **No Support for CORS (Cross-Origin Resource Sharing):** CORS is not implemented yet.
- **No Support for Bucket Policies:** Bucket policies are not implemented yet.
- **No Support for Copying Files:** Copying files from one bucket to another or within the same bucket is not possible directly with Deta Drive, and implementing it would require a workaround.
