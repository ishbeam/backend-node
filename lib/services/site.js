import { Site } from '../models';

/**
 * Creates a new site.
 */
export async function create(site) {
    // if (!site.hasOwnProperty('company'))
    //     site.company = company
    // if (site.company.id != user.company.id)
    //     throw { status: 404, message: "site company does not match user's company." };

    const _site = await Site.create(site);
    console.log('site created', _site);
    return _site;
}

export async function list(supplierId) {
    const sites = await Site.find({ company: supplierId })

    return sites
}

export async function update(id, fields) {

    return await Site.findByIdAndUpdate(id, { $set: fields }, { new: true });
}

/**
 * Delete a site, by ID.
 */
export async function remove(id) {
    return await Site.findByIdAndDelete(id);
}

/**
 * Get a site, by ID.
 */
export async function get(id) {
    return await Site.findById(id);
}