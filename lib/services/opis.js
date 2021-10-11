import { Opis } from '../models';

export async function create(opis) {
    return await Opis.create(opis)
}

export async function get() {
    return await Opis.findOne({ })
}

export async function update(fields) {
    return await Opis.findOneAndUpdate({ }, { $set: { ...fields }}, { new: true })
}