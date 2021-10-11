import { EventEmitter } from 'events';
import { OrderService, TripService } from '../services';

const OrderEvents = new EventEmitter();

OrderEvents.on('created', () => {
  console.log('EVENT Order created');
});

OrderEvents.on('auction_complete', async (order_id) => {
  console.log('EVENT Auction complete for order #', order_id);
  // const trip = await TripService.create(await OrderService.getTripData(order_id), order_id);
  // console.log('CREATED trip object #', trip._id);
});

export default OrderEvents;