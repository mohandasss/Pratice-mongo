import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET || ""

export const signAccessToken = () => {
    return jwt.sign({}, secret, {
        expiresIn: "1h"
    })
}

export const signRefreshToken = () => {
    return jwt.sign({}, secret, {
        expiresIn: "7d"
    })
}


export const verifyAccessToken = () => {

}

export const verifyRefreshToken = () => {

}