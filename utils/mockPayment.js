function mockPayment() {
  return {
    status: 'Success',
    paymentId: 'PAY' + Date.now()
  };
}

module.exports = mockPayment;
