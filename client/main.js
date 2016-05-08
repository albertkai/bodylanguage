import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
import '../imports/startup/client/index.js'
import '../imports/startup/both/slingshot.js'

Meteor.startup(() => {
    console.log('startup')
    render(renderRoutes(), document.getElementById('app'));
});

getEdgeValues = (lat, lng, radius)=>{

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


getPosition = ()=>{
    console.log(Geolocation.latLng())
}