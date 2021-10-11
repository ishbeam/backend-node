import { User } from '../models';
import { PasswordService } from '../services';


const COOKIE = 'ordr-dev';

/**
 * This should be called before most routes, as it checks if their session is valid and refreshes it
 */
export function authenticate(req, res, next) {
    let hasConnectCookie = false;

    try {
        const cookie = req.cookies[COOKIE]
        console.log('COOKIE', cookie)
        console.log('SESSIONID', req.sessionID)
        if(!cookie) throw 'No cookie'

        hasConnectCookie = cookie.includes(req.sessionID)

        if (!hasConnectCookie) throw 'No auth cookie';

        if (!req.session.user) {
            throw 'User is not on the session so idk somethin weird, but its not valid'
        }

        // Refresh the session
        req.session.touch((err) => console.log('session touched if this is null ->', err))

        return next()

    } catch (e) {
        return next(e)
    }

}

/**
 * Login finds the user and puts the user on the session
 */
export async function login(req, res, next) {
    // COMBAK use basic-auth to pass stuff thru headers
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            throw { status: 401, message: 'No user with those credentials.' };

        // if (!user.confirmed)
        //     throw { status: 401, message: 'User has not confirmed their e-mail.' };

        // if (!await PasswordService.comparePassword(password, user.password))
        //     throw { status: 401, message: 'Password is invalid.' };

        req.session.user = user;

        req.session.save((err) => console.log('user saved to session if this value is null ->', err))

        return res.send(req.session);
    } catch (e) {
        console.log('bruh', e)
        return next(e);
    }
}

export function status(req, res, next) {

    res.status(200).send(req.session);

} 

export function logout(req, res, next) {

    req.session.destroy();
    res.status(200).send('OK');

}

/**
 * Pass these to a /retailer or /supplier or /carrier route
 * in order to determine if the user has permission to access this route
 */
export function isRetailer(req, res, next) {
    const { user } = req.session;

    if(user.type == 'retailer') return next()
    
    return next({ status: 403, message: 'User is not a retailer'});
}

export function isSupplier(req, res, next) {
    const { user } = req.session;

    if(user.type == 'supplier') return next()
    
    return next({ status: 403, message: 'User is not a supplier'});
}

export function isCarrier(req, res, next) {
    const { user } = req.session;

    if(user.type == 'carrier') return next()
    
    return next({ status: 403, message: 'User is not a carrier'});
}