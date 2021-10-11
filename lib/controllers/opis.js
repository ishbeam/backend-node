import { OpisService } from '../services';

export async function create(req, res, next) {
    
    try {
        const o = await OpisService.create({ ...req.body })
        return res.send(o)
    } catch(e) {
        return next(e)
    }
}

export async function get(req, res, next) {
    
    try {
        const o = await OpisService.get()
        return res.send(o) 
    } catch(e) {
        return next(e)
    }
}
export async function update(req, res, next) {
    
    try {
        const o = await OpisService.update({ ...req.body })
        return res.send(o)
    } catch(e) {
        return next(e)
    }
}