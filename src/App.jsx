import './App.css';
import TripList from './pages/TripList';
import NavBar from './components/NavBar';
import BigCart from './components/BigCart';
import { Routes, Route } from 'react-router-dom';
import OneTrip from './components/OneTrip';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import AddTrip from './pages/AddTrip';
import OrdersList from './components/OrdersList';
import CheckOut from './components/CheckOut';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <NavBar />

      <Routes>

      
        <Route path="/login" element={<LogIn />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/AddTrip" element={<ProtectedRoute><AddTrip /></ProtectedRoute>} />


        <Route path="/" element={<TripList />}>
          <Route path="details/:id" element={<OneTrip />} />
          {/* <Route path="/EditTrip" element={<ProtectedRoute><EditTrip /></ProtectedRoute>} /> */}
        </Route>

        <Route path="/BigCart" element={<BigCart />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/OrdersList" element={<OrdersList />} />


        {/* <Route path="/BigCart" element={<BigCart />}>
          <Route path="CheckOut" element={<CheckOut />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
