const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find({}, 'username');
  res.json(users.map(u => ({ username: u.username, online: false })));
});

module.exports = router;