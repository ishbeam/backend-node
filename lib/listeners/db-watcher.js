import axios from 'axios';
import { Order } from '../models';

const BASE = 'http://localhost:8000/hooks';

/**
 * Watches for Bids to be created so it can request a supplier
 */
export function watchOrderCreate() {
    const pipe = {
        '$match': {
            'operationType': 'insert'
        }
    }
    const changeStream = Order.watch([pipe], { fullDocument: 'default' });

    changeStream.on('change', (doc) => {
        console.log('CHANGE', doc)
        axios.post(BASE + '/bids/supplier/request', { order: doc['fullDocument'] })
        .then((data) => {
            console.log('/bids/supplier/request:', data)
        })
        .catch(e => console.log('stupid axios error thats not actually an error'))
    })
}

/**
 * Watches for updates to the BidRequest, checks if supplier or carrier and updates accordingly
 */
export function watchOrderUpdate() {
    const pipe = {
        '$match': {
            'operationType': 'update'
        }
    }

    const changeStream = Order.watch([pipe], { fullDocument: 'updateLookup' })

    changeStream.on('change', (doc) => {
        //@ts-ignore 
        // Check if is supplier or carrier BidRequest that is being accepted

        const updatedFields = doc.updateDescription.updatedFields;
        
        if (updatedFields.hasOwnProperty('supplier') || updatedFields.hasOwnProperty('carrier')) {
            if (doc['fullDocument'].supplier == null || doc['fullDocument'].carrier == null) {      
                const path = doc['fullDocument'].supplier == null ? '/bids/supplier/request' : '/bids/carrier/request';
                axios.post(BASE + path, { order: doc['fullDocument'] })
                .then((data) => {
                    console.log('/bids/supplier/request:', data)
                })
                .catch(e => console.log('stupid axios error thats not actually an error'))
            } else {
                axios.post(BASE + '/order/finalize', { order: doc['fullDocument'] }).then((data) => {
                    console.log('/order/finalize:', data)
                }).catch(e => console.log('stupid axios error thats not actually an error'))
            }
        }

    })
}
