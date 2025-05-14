const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const bucket = process.env.DO_SPACES_BUCKET;
const bucketUrl = process.env.DO_SPACES_BUCKET_URL || 'https://nyc3.digitaloceanspaces.com';
const region = process.env.DO_SPACES_REGION || 'lon1';

const client = new S3Client({
    region: 'us-east-1', // DigitalOcean Spaces uses us-east-1 for compatibility
    endpoint: bucketUrl,
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});

async function uploadToSpaces({ userId, fileBuffer, fileName, mimeType }) {
    const key = `users/${userId}/${fileName}`;
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ACL: 'public-read', // or 'private' if you want restricted access
        ContentType: mimeType,
    });
    await client.send(command);
    // Construct the public URL
    const url = `https://${bucket}.${region}.digitaloceanspaces.com/${key}`;
    return url;
}

async function listUserUploads(userId) {
    const prefix = `users/${userId}/`;
    const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
    });
    const data = await client.send(command);
    return (data.Contents || []).map(obj => ({
        key: obj.Key,
        url: `https://${bucket}.${region}.digitaloceanspaces.com/${obj.Key}`,
        size: obj.Size,
        lastModified: obj.LastModified,
    }));
}

async function deleteFromSpaces(key) {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    await client.send(command);
}

module.exports = { client, uploadToSpaces, listUserUploads, deleteFromSpaces };
