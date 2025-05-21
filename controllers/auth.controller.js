const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');

const SECRET = 'secret-key'; // Use env vars in production

exports.register = (req, res) => {
  const { userId, password } = req.body;

  const existingUser = users.find(u => u.userId === userId);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ userId, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
  const { userId, password } = req.body;

  const user = users.find(u => u.userId === userId);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
  res.json({ token });
};
