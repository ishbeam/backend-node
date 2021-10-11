import axios from 'axios';
import FormData from 'form-data'

//import { Tank } from '../models';

// STILL IN PROGRESS 

// export async function calculateRoute(supplier_id, end, products) {
//     /**
//      * Based on pickup tanks, calculate best route
//      */

    
//     const max = { dist: 0, idx: -1 };
//     let tanks = [];
//     for(let i = 0; i < products.length; i++) {
//         const tank = await Tank.findOne({ company_id: supplier_id, fuel_type: products[i].fuel_type });
//         tanks.push(tank);
//         const dist = distance(tank.location.coordinates, end);
//         if (dist > max.dist) {
//             max.dist = dist;
//             max.idx = i; 
//         }
//     }
//     const start = tanks[max.idx].coordinates;

//     console.log('TNKS', tanks)
//     let locations = tanks.map((tank) => {
//         return {
//             address: tank._id.toHexString(),
//             lng: tank.location.coordinates[0],
//             lat: tank.location.coordinates[1]
//         };
//     })

//     locations.unshift({ address: "start", lng: start[0], lat: start[1]})
//     locations.push({ address: "end", lng: end[0], lat: end[1]})

//     console.log("LOCATIONS", locations)

//     let formData = new FormData()
//     formData.append('locations', JSON.stringify(locations))
    
//     try {
//         const res = await axios.post('https://api.routexl.com/tour', formData, {
//             auth: { username: 'ordr', password: 'ordrDev'},
//             headers: formData.getHeaders()
//         });
//         // console.log(res.data);

//         let pickups = [];
        
//         for (let i = 1; i < res.data.count-1; i++) {
//             console.log(res.data.route[i.toString()])
//             pickups.push(res.data.route[i.toString()].name);
//         }
//         console.log('PICKUPS', pickups)
//         return pickups;
//     } catch(err) {
//         console.log("RouteXL Error:", err.response);
//     }
// }

export function distance(a, b) {
    let lat1, lat2, lon1, lon2;
    [lon1, lat1] = a;
    [lon2, lat2] = b;

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	}
}