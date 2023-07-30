import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export class FilesAccess {
  constructor(
    client = new S3Client(),
    bucketName = process.env.ATTACHMENTS_S3_BUCKET,
    urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
  ) {
    this.client = client
    this.bucketName = bucketName
    this.urlExpiration = urlExpiration
  }

  async getUploadUrl(attachmentId) {
    console.log(`Generating presigned url for attachment id ${attachmentId}`)
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: attachmentId
    })

    return await getSignedUrl(this.client, command, {
      expiresIn: this.urlExpiration
    })
  }
}
