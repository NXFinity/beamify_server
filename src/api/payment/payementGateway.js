// Payment Gateway for real-time payment status updates

let ioInstance = null;

function setupPaymentGateway(io) {
  ioInstance = io;
  // Example: Listen for custom events from webhook logic and emit to users
  // You can call emitPaymentStatus(userId, status, data) from your webhook handler
}

// Helper to emit payment status to a user room
function emitPaymentStatus(userId, status, data = {}) {
  if (ioInstance) {
    ioInstance.to(userId.toString()).emit('payment_status', { status, ...data });
  }
}

module.exports = {
  setupPaymentGateway,
  emitPaymentStatus,
};
