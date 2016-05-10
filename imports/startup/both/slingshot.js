// Slingshot config
import { Slingshot } from 'meteor/edgee:slingshot'

const maxImageSize = 2

Slingshot.fileRestrictions("imageUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
    maxSize: maxImageSize * 1024 * 1024
})
