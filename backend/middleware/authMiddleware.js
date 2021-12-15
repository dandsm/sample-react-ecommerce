import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const protect = async (req, res, next) => {
  let _token
  let _error
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    _token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(_token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    } catch (error) {
      _error = new Error('Not authorized - Invalid Token')
    }
  } else {
    _error = new Error('Not authorized - Not token')
  }

  if (req.user) {
    next()
  } else {
    res.status(401)
    next(_error)
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
