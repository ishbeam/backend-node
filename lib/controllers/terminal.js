import { TerminalService } from '../services';

/**
 * Creates a new terminal, called by retailer.
 */
export async function create(req, res, next) {
    let terminal = req.body;
    const { user } = req.session;

    terminal.company = user.company.id;

    try {
        const _terminal = await TerminalService.create(terminal);

        res.status(201).send(_terminal);
    } catch (err) {
        next(err);
    }
}

/**
 * Update a terminal, by ID.
 */
export async function update(req, res, next) {
    const { terminalId } = req.params;
    const fields = req.body;

    try {
        const terminal = await TerminalService.update(terminalId, fields);
        res.status(200).send(terminal);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a terminal, by terminalId.
 */
export async function remove(req, res, next) {
    const { terminalId } = req.params;

    try {
        const terminal = await TerminalService.remove(terminalId);
        res.status(200).send('OK');
    } catch (err) {
        next(err);
    }
}

export async function list(req, res, next) {
    const { user } = req.session;

    try {
        const terminals = await TerminalService.list(user.company.id)
        console.log(terminals)
        return res.send(terminals)
    } catch(e) {
        return next(e)
    }
}

/**
 * Get a terminal, by terminalId.
 */
export async function get(req, res, next) {
    const { terminalId } = req.params;

    try {
        const terminal = await TerminalService.get(terminalId);
        res.status(200).send(terminal);
    } catch (err) {
        next(err);
    }
}

// /**
//  * This is for finding terminals for main dashboards. Either open (available for bidding) or active (terminals I've bid on)
//  * This function should only be used for suppliers
//  * COMBAK Aug 26 Currently behaves the same for both suppliers and retailers, which it shouldn't
//  */
// export async function find(req, res, next) {
//     const { user } = req.session;
//     const { query } = req;

//     /**
//      * Find Retailer terminals
//      */
//     try {
//         if (user.type == 'retailer') {

//             if (query.type == 'active') {
//                 const terminals = await RetailerService.Terminals.getActive(user.company.id)

//                 return res.send(terminals)
//             }
//             if (query.type == 'fulfilled') {
//                 const terminals = await RetailerService.Terminals.getFulfilled(user.company.id)

//                 return res.send(terminals)
//             }
//         }

//         /**
//          * Find Supplier terminals
//          */
//         if (user.type == 'supplier') {

//             if (query.type == 'active') {
//                 const terminals = await SupplierService.Terminals.getActive(user.company.id)

//                 return res.send(terminals)
//             }
//             if (query.type == 'fulfilled') {
//                 const terminals = await SupplierService.Terminals.getActive(user.company.id)

//                 return res.send(terminals)
//             }
//         }

//         throw 'invalid data in here';

//     } catch (err) {
//         next(err)
//     }
// }