import { MarketService } from '../services';

export async function getPrices(req, res, next) {
    try {
        const prices = await MarketService.getFuelPrices()

        return res.send(prices)
    } catch(e) {
        return next(e)
    }
}

// export const Orders