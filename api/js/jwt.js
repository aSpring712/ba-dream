const jwt = require('jsonwebtoken');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

let tokenOptions = {
    algorithm: "HS512",
    expiresIn: '1h'
};
let refreshOptions = {
    algorithm: "HS512",
    expiresIn: '30d'
};

let secretKey = process.env.jwtSecret

module.exports = {
    sign: async (id, role = 'user') => {
        const payload = {user_id : id, role : role};

        const result = {
            token: jwt.sign(payload, secretKey, tokenOptions),
            refreshToken: jwt.sign(payload, secretKey, refreshOptions),
        };
        return result;
    },
    verify: async (token) => {
        console.log("jwt token >>>>>>>>>>>>>>>",token)
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    },

    token_decode: (req, res, next) => {
        console.log('token check middleware ==============', req.cookies.token);
        const token = req.cookies.token
        if (!token) {
            return res.status(401).send('token required')
        } else {
            jwt.verify(token, secretKey, (err, decoded) => {
                if(err) {
                    return res.status(401).send('token expired');
                } else {
                    req.decode = decoded;
                    console.log('REQ DECODE ', req.decode)
                    next();
                }
            })
        }
    },

    token_refresh: (req, res, next) => {
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken) {
            return res.status(401).send('token required')
        } else {
            jwt.verify(refreshToken, secretKey, (err, decoded) => {
                if(err) {
                    return res.status(401).send('token required');
                } else {
                    console.log('================== 디코드 : ', decoded)
                    let payload = {
                        user_id: decoded.user_id,
                        role: decoded.role
                    }
                    req.token = jwt.sign(payload, secretKey, tokenOptions);
                    req.user_id = decoded.user_id,
                    req.role = decoded.role
                    next();
                }
            })
        }
    }

}
