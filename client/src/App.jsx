import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Home from './pages/Home';
import About from './pages/About';
import CharityDirectory from './pages/CharityDirectory';
import CharityDetails from './pages/CharityDetails';
import Subscription from './pages/Subscription';
import Contact from './pages/Contact';

import MySubscription from './pages/MySubscription';
import MyGolfScores from './pages/MyGolfScores';
import SelectedCharity from './pages/SelectedCharity';
import DrawParticipation from './pages/DrawParticipation';
import Winnings from './pages/Winnings';
import UploadProof from './pages/UploadProof';
import ProfileSettings from './pages/ProfileSettings';

import UsersTable from './pages/UsersTable';
import SubscriptionsTable from './pages/SubscriptionsTable';
import CharitiesTable from './pages/CharitiesTable';
import DrawManagement from './pages/DrawManagement';
import WinnerVerification from './pages/WinnerVerification';
import Reports from './pages/Reports';
import ContentManagement from './pages/ContentManagement';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import SubscriptionProtectedRoute from './routes/SubscriptionProtectedRoute';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/charities"
          element={
            <MainLayout>
              <CharityDirectory />
            </MainLayout>
          }
        />

        <Route
          path="/charities/:id"
          element={
            <MainLayout>
              <CharityDetails />
            </MainLayout>
          }
        />

        <Route
          path="/subscription"
          element={
            <MainLayout>
              <Subscription />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-subscription"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MySubscription />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/selected-charity"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SelectedCharity />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfileSettings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= SUBSCRIPTION REQUIRED ROUTES ================= */}
        <Route
          path="/my-golf-scores"
          element={
            <ProtectedRoute>
            <SubscriptionProtectedRoute>
              <DashboardLayout>
                <MyGolfScores />
              </DashboardLayout>
            </SubscriptionProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/draw-participation"
          element={
            <ProtectedRoute>
            <SubscriptionProtectedRoute>
              <DashboardLayout>
                <DrawParticipation />
              </DashboardLayout>
            </SubscriptionProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/winnings"
          element={
            <ProtectedRoute>
            <SubscriptionProtectedRoute>
              <DashboardLayout>
                <Winnings />
              </DashboardLayout>
            </SubscriptionProtectedRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-proof"
          element={
            <ProtectedRoute>
            <SubscriptionProtectedRoute>
              <DashboardLayout>
                <UploadProof />
              </DashboardLayout>
            </SubscriptionProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <DashboardLayout>
                <UsersTable />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/subscriptions"
          element={
            <AdminRoute>
              <DashboardLayout>
                <SubscriptionsTable />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/charities"
          element={
            <AdminRoute>
              <DashboardLayout>
                <CharitiesTable />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/draw-management"
          element={
            <AdminRoute>
              <DashboardLayout>
                <DrawManagement />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/winner-verification"
          element={
            <AdminRoute>
              <DashboardLayout>
                <WinnerVerification />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/content-management"
          element={
            <AdminRoute>
              <DashboardLayout>
                <ContentManagement />
              </DashboardLayout>
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;