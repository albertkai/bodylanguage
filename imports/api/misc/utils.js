export const dataURItoBlob = (dataURI)=>{

    // convert base64/URLEncoded data component to raw binary data held in a string

    let byteString = undefined;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(dataURI.split(",")[1]);
    } else {
        byteString = unescape(dataURI.split(",")[1]);
    }

    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    let i = 0;

    while (i < byteString.length) {
        ia[i] = byteString.charCodeAt(i);
        i++;
    }
    return new Blob([ ia ],
        {type: mimeString}
    );
}

export const distance = (lat1, lng1, lat2, lng2, unit)=>{

    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lng1-lng2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist

}

export const getEdgeValues = (lat, lng, radius)=>{

    // Current search is inside the square, needs to be replaced by a more
    // accurate solution in a future releases (?). Anyway accuracy here is not
    // as critical as performance.

    let latShift = radius / 111111
    let lngShift = radius / (111111 * Math.cos(lat))

    return {
        latRange: {
            min: lat - latShift,
            max: lat + latShift
        },
        lngRange: {
            min: lng - lngShift,
            max: lng + lngShift
        }
    }

}

export const imagesCSSPreload = (prevUser, nextUser)=>{

    // Function to preload images for the previous and the next users

    console.log('Preloading images')

    const pics = []
    let rule = 'body::after{content: '

    if (prevUser) pics.concat(prevUser.pics)
    if (nextUser) pics.concat(nextUser.pics)

    pics.forEach( pic => rule += `url(https://dcl7m3594apmn.cloudfront.net/images/${pic.name}) `)
    rule += '; display:none; }'

    $('#img-preload').remove()
    $('head').append(`<style id="img-preload">${ rule }</style>`)


}