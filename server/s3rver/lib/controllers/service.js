'use strict';

/*
 * Operations on the Service
 * The following methods correspond to operations you can perform on the Amazon S3 service.
 * https://docs.aws.amazon.com/AmazonS3/latest/API/RESTServiceOps.html
 */

/**
 * GET Service
 * This implementation of the GET operation returns a list of all buckets owned by the authenticated
 * sender of the request.
 * {@link https://docs.aws.amazon.com/AmazonS3/latest/API/RESTServiceGET.html}
 */
exports.getService = async function getService(ctx) {
  const buckets = await ctx.store.listBuckets();
  ctx.logger.info('Fetched %d buckets', buckets.length);
  ctx.body = {
    ListAllMyBucketsResult: {
      '@': { xmlns: 'http://doc.s3.amazonaws.com/2006-03-01/' },
      Owner: {
        // we provide dummy values here because we don't store any metadata with buckets
        ID: 'BUCKET_OWNER_ID',
        DisplayName: 'BUCKET_OWNER_DISPLAY_NAME',
      },
      Buckets: {
        Bucket: buckets.map((bucket) => ({
          Name: bucket.name,
          CreationDate: bucket.creationDate.toISOString(),
        })),
      },
    },
  };
};