const S3 = require("aws-sdk/clients/s3");

function uploadImage(file) {
  const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
  const region = process.env.REACT_APP_AWS_REGION;
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
  });
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("Invalid file");
    }
    s3.upload(
      {
        Key: file.name,
        Bucket: bucketName,
        Body: file,
      },
      function (err, data) {
        if (err) {
          console.log("Error! ", err);
          return reject("There was an error uploading your image: ");
        }
        resolve(data.Location);
      }
    );
  });
}
export default uploadImage;
