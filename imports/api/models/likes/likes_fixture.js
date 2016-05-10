import Likes from './likes.js'

Likes.find().forEach(like => Likes.remove(like._id))

if (Likes.find().count() === 0) {

    const userId = "yLEGeHrmqpbqcfGGB"
    const pics = ["EPdCpTjioFsdizDkd.jpg", "K5EaaCPgE9Leq4ecW.jpg", "Ld2kXQmWoabYk6H3Q.jpg"]
    const users = Meteor.users.find().fetch()

    for (let i=0; i < 12; i++) {

        Likes.insert({
            userId,
            likedUser: users[i]._id,
            isMutual: true,
            pics,
            createdAt: Date.now(),
            lastUpdated: Date.now()
        })

    }

    for (let i=0; i < 8; i++) {

        Likes.insert({
            userId: users[i + 11]._id,
            likedUser: userId,
            isMutual: true,
            pics,
            createdAt: Date.now(),
            lastUpdated: Date.now()
        })

    }

}