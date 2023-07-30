import { FilesAccess } from '../dataLayer/filesAccess.mjs'

const filesAccess = new FilesAccess()

export const BUCKET_NAME = process.env.ATTACHMENTS_S3_BUCKET

export async function getUploadUrl(attachmentId) {
  return await filesAccess.getUploadUrl(attachmentId)
}
