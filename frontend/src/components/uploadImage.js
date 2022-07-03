const S3 = require("aws-sdk/clients/s3");

const uploadImage = async (file) => {
  const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
  const region = process.env.REACT_APP_AWS_REGION;
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
  });
  const result = await s3
    .upload({
      Key: file.name,
      Bucket: bucketName,
      Body: file,
    })
    .promise();
  return result.Location;
};
export default uploadImage;
