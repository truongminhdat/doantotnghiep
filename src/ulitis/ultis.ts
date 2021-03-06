import * as jwt from 'jsonwebtoken'

function getTokenPayload(token) {
    return jwt.verify(token, `${process.env.APP_SECRET}`)
}

function getUserId(req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '')
            if (!token) {
                throw new Error('No token found')
            }
            const { userId }:any = getTokenPayload(token)
            return userId
        }
    } else if (authToken) {
        const { userId }:any = getTokenPayload(authToken)
        return userId
    }
    throw new Error('Not authenticated')
}

module.exports = {
    getUserId
}