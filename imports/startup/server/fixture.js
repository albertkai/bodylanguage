import { Meteor } from 'meteor/meteor'
import { getEdgeValues } from '../../api/misc/utils.js'
import Likes from '../../api/models/likes/likes.js'

if (Meteor.users.find().count() < 5) {

    for (let i=0; i < 20; i++) {

        let distance = 500 * (i + 1)

        let pos = getEdgeValues(44.5971924, 33.4363733, distance)

        let user = {
            registration: {
                isRegistered: true,
                step: 'step2'
            },
            settings: {
                iam: 'male',
                interested: 'female',
                hereFor: {
                    sex: true,
                    relationships: true,
                    communication: false,
                    watchup: true
                },
                radius: 50000
            },
            pics: [
                {
                    name: '3fzBLKAk6KXpw6Fqo.jpg',
                    order: 1
                },{
                    name: '5BxEJ9H2upcyStRGz.jpg',
                    order: 2
                },{
                    name: 'EPdCpTjioFsdizDkd.jpg',
                    order: 3
                }
            ],
            location: {
                lat: pos.latRange.max,
                lng: pos.lngRange.max
            },
            counts: {
                messages: 0,
                likes: 0
            }
        }

        Meteor.users.insert(user)

    }

}

Likes.find().forEach(like => Likes.remove(like._id))

if (Likes.find().count() === 0) {

    const userId = "Bk52PTwXtxAtjHjw9"

    for (let i=0; i < 12; i++) {

        Likes.insert({
            userId,
            likedUser: Meteor.users.findOne({_id: {$ne: userId}})._id,
            isMutual: true,
            createdAt: Date.now(),
            lastUpdated: Date.now()
        })

    }

    for (let i=0; i < 8; i++) {

        Likes.insert({
            userId: Meteor.users.findOne({_id: {$ne: userId}})._id,
            likedUser: userId,
            isMutual: true,
            createdAt: Date.now(),
            lastUpdated: Date.now()
        })

    }

}