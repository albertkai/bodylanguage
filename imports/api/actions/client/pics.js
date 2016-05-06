import { Accounts } from 'meteor/accounts-base'
import { sendVerificationLink } from '../../methods/methods.js'
import { savePic, deletePic } from '../../methods/methods.js'
import { dataURItoBlob } from '../../misc/utils.js'
import Slingshot from 'meteor/edgee:slingshot'
import _ from 'underscore'


export const takePic = (callback)=> {

    MeteorCamera.getPicture({quality: 90}, (err, dataURI)=>{
        if (err) {
            console.log(err)
        } else {
            const fileBlob = dataURItoBlob(dataURI)
            if (fileBlob) {
                const upload = new Slingshot.Slingshot.Upload('imageUploads')
                upload.send(fileBlob, (error, downloadUrl)=>{
                    if (error) {
                        console.log(error)
                        return error
                    } else {
                        const name = _.last(downloadUrl.split('/'))
                        savePic.call({name}, (err)=>{
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Pic saved')
                                if (callback) callback()
                            }
                        })
                    }
                })
            } else {
                console.log('error occured')
            }
        }
    })

}

export const removePic = (pic, callback)=> {

    deletePic.call({pic}, (err)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('Pic removed')
            if (callback) callback()
        }
    })

}