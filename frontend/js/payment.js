// const RAZORPAY_KEY = 'rzp_test_XXXXXXXXXXXX'; // replace with your key_id

// const initPayment = async (userName, userEmail) => {
//   const btn = document.getElementById('pay-btn');
//   if (btn) { btn.disabled = true; btn.textContent = 'Creating order…'; }

//   try {
//     const order = await API.call('/payment/create-order', { method: 'POST' });

//     const options = {
//       key:         RAZORPAY_KEY,
//       amount:      order.amount,
//       currency:    order.currency,
//       name:        'PlacementPro',
//       description: 'Lifetime access — ₹99',
//       image:       '/favicon.ico',
//       order_id:    order.orderId,
//       prefill:     { name: userName || '', email: userEmail || '' },
//       theme:       { color: '#7c6af7' },
//       modal:       { backdropclose: false },

//       handler: async (response) => {
//         try {
//           const result = await API.call('/payment/verify', {
//             method: 'POST',
//             body: JSON.stringify(response)
//           });
//           if (result.success) {
//             localStorage.setItem('pp_token', result.token);
//             toast('Payment successful! Welcome to PlacementPro 🎉', 'success');
//             setTimeout(() => window.location.href = '/dashboard.html', 1200);
//           }
//         } catch (err) {
//           toast('Verification failed. Contact support.', 'error');
//         }
//       },

//       modal: {
//         ondismiss: () => {
//           if (btn) { btn.disabled = false; btn.textContent = 'Pay ₹99 & Unlock Access'; }
//         }
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.on('payment.failed', () => {
//       toast('Payment failed. Please try again.', 'error');
//       if (btn) { btn.disabled = false; btn.textContent = 'Pay ₹99 & Unlock Access'; }
//     });
//     rzp.open();

//   } catch (err) {
//     toast(err.message, 'error');
//     if (btn) { btn.disabled = false; btn.textContent = 'Pay ₹99 & Unlock Access'; }
//   }
// };

// window.initPayment = initPayment;
// frontend/js/payment.js
const FORM_URL = 'https://forms.gle/G5v1TnbUuULuRty4A';
 
function initPayment() {
  window.open(FORM_URL, '_blank');
}
 