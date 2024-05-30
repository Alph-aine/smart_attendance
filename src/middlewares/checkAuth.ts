import jwt from 'jsonwebtoken'
import ErrorHandler from '../utils/errorHandler'
import Lecturer from '../models/lecturer'
import asyncError from '../middlewares/asyncError'

// checks if user is authenticated
const isAuthenticated = asyncError(async (req: any, res: any, next: any) => {
    const { token } = req.cookies
    if (token === null || token === undefined) {
        return next(new ErrorHandler('Please login to access this resource', 401))
    }

    // verify token
    try{
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET ?? 'secret')
        const lecturer = await Lecturer.findById(decoded?.id)

        // attach user to request object
        req.user = lecturer
        next()
    } catch(err){
        next(new ErrorHandler('Invalid token, please login to access this resource', 401))
    }
})

export default isAuthenticated