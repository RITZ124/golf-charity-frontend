// Create new file: SubscriptionProtectedRoute.jsx

import { Navigate } from 'react-router-dom';

function SubscriptionProtectedRoute({ children }) {
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

  const activeSubscription = subscriptions.find(
    (subscription) => subscription.status === 'active'
  );

  if (!activeSubscription) {
    return <Navigate to="/subscription" replace />;
  }

  return children;
}

export default SubscriptionProtectedRoute;