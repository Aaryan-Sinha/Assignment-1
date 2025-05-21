function generateOrderId() {
  return 'ORD' + Date.now();
}

function generateUserId() {
  return 'USR' + Math.random().toString(36).substr(2, 6);
}

module.exports = { generateOrderId, generateUserId };
