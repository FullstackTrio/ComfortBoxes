function selfOrAdmin (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.isAdmin && req.user.id !== req.requestedUser.id) {
    res.status(403).end();
  } else {
    next();
  }
}

function admin (req, res, next) {
  if (!req.user) {
    res.status(401).end();
  } else if (!req.user.isAdmin) {
    res.status(403).end();
  } else {
    next();
  }
}


module.exports = {
  selfOrAdmin,
  admin,
};
