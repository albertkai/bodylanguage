import { Slingshot } from 'meteor/edgee:slingshot'
import { Random } from 'meteor/random'

Slingshot.createDirective("imageUploads", Slingshot.S3Storage, {
    bucket: "bodylanguage.storage",
    region: "eu-central-1",
    acl: "public-read",
    authorize() {
        if (this.userId === undefined || this.userId === null) {
            let message = "Please login before posting files"
            throw new Meteor.Error("Login Required", message)
        }
        return true
    },
    key() {
        return 'images/' + Random.id() + '.jpg'
    }
})