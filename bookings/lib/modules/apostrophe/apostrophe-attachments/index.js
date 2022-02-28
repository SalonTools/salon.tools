module.exports = {
   uploadfs: gcs()
};

function gcs() {
   const {BUCKET_NAME: bucket} = process.env;

   return bucket && {
      backend: 'gcs',
      bucket,
      https: true,
   };
}
