import { Terminal } from '../models';

/**
 * Creates a new terminal.
 */
export async function create(terminal) {
    // if (!terminal.hasOwnProperty('company'))
    //     terminal.company = company
    // if (terminal.company.id != user.company.id)
    //     throw { status: 404, message: "Terminal company does not match user's company." };

    const _terminal = await Terminal.create(terminal);
    console.log('terminal created', _terminal);
    return _terminal;
}

export async function list(supplierId) {
    const terminals = await Terminal.find({ company: supplierId })

    return terminals
}

export async function update(id, fields) {

    return await Terminal.findByIdAndUpdate(id, { $set: fields }, { new: true });
}

/**
 * Delete a terminal, by ID.
 */
export async function remove(id) {
    return await Terminal.findByIdAndDelete(id);
}

/**
 * Get a terminal, by ID.
 */
export async function get(id) {
    return await Terminal.findById(id);
}