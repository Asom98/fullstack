const jwt = require("jsonwebtoken")

function checkRole(role) {
    return function(req, res, next) {
      const userRole = req.user.role
      if (!role.includes(userRole)) {
        return res.status(402).json({message: 'Forbidden you dont have access to that resource'})
      } 
      next()
    }
}

function authenticateUser(req, res, next) {
    const { cookies } = req
    const token = cookies.accessToken

    if(token == null) return res.sendStatus(403)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if(err) return res.sendStatus(403)
      req.user = user
      next()
    })
}

module.exports = {
    checkRole,
    authenticateUser
}