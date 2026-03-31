import { useState } from 'react';
import axios from 'axios';

function Subscription() {
  const [planType, setPlanType] = useState('monthly');
  const [donationPercentage, setDonationPercentage] = useState(10);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleCheckout = async () => {
    try {
      await axios.post(
        'https://golf-charity-frontend-r9tw.onrender.com/api/subscription/save',
        {
          user_id: user.id,
          plan_type: planType,
          amount_paid: planType === 'monthly' ? 1000 : 10000,
          donation_percentage: donationPercentage
        }
      );

      const res = await axios.post(
        'https://golf-charity-frontend-r9tw.onrender.com/api/payment/create-checkout-session',
        {
          planType
        }
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <h1>Choose Subscription Plan</h1>

      <div className="grid">
        <div className="card">
          <h2>Monthly Plan</h2>
          <p>₹1000 / month</p>
          <button onClick={() => setPlanType('monthly')}>
            Select Monthly
          </button>
        </div>

        <div className="card">
          <h2>Yearly Plan</h2>
          <p>₹10000 / year</p>
          <button onClick={() => setPlanType('yearly')}>
            Select Yearly
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h2>Select Charity Contribution Percentage</h2>

        <select
          value={donationPercentage}
          onChange={(e) => setDonationPercentage(Number(e.target.value))}
        >
          <option value={10}>10%</option>
          <option value={15}>15%</option>
          <option value={20}>20%</option>
          <option value={25}>25%</option>
        </select>
      </div>

      <button style={{ marginTop: '20px' }} onClick={handleCheckout}>
        Continue to Payment
      </button>
    </div>
  );
}

export default Subscription;