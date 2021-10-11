import { SiteService } from '../services';

/**
 * Creates a new terminal, called by retailer.
 */
export async function create(req, res, next) {
    let site = req.body;
    const { user } = req.session;

    site.company = user.company.id;

    try {
        const _site = await SiteService.create(site);

        res.status(201).send(_site);
    } catch (err) {
        next(err);
    }
}

/**
 * Update a site, by ID.
 */
export async function update(req, res, next) {
    const { siteId } = req.params;
    const fields = req.body;

    try {
        const site = await SiteService.update(siteId, fields);
        res.status(200).send(site);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete a site, by siteId.
 */
export async function remove(req, res, next) {
    const { siteId } = req.params;

    try {
        const site = await SiteService.remove(siteId);
        res.status(200).send('OK');
    } catch (err) {
        next(err);
    }
}

export async function list(req, res, next) {
    const { user } = req.session;

    try {
        const sites = await SiteService.list(user.company.id)
        console.log(sites)
        return res.send(sites)
    } catch(e) {
        return next(e)
    }
}

/**
 * Get a site, by siteId.
 */
export async function get(req, res, next) {
    const { siteId } = req.params;

    try {
        const site = await SiteService.get(siteId);
        res.status(200).send(site);
    } catch (err) {
        next(err);
    }
}