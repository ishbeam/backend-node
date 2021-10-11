import { Order } from '../models';
/**
* Get prices of all fuel types
* COMBAK eventually pass up coordinates and calculate all orders in that area and get average price
*/
export async function getFuelPrices() {
    const prices = [{
        fuel_type: 'Octane 87',
        price: '1.20'
    }, {
        fuel_type: 'Octane 89',
        price: '1.41'
    }, {
        fuel_type: 'Octane 91',
        price: '1.52'
    }, {
        fuel_type: 'Octane Diesel',
        price: '1.72'
    }, {
        fuel_type: 'Bio Diesel',
        price: '1.87'
    }]

    return prices;
}