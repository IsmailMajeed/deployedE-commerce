import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./Pages/AllProducts";
import Features from "./Pages/Features";
import Pricing from "./Pages/Pricing";
import { CartContextProvider } from "./Context/CartContext";
import Navigation from "./SubPageComponents/Navigation/Navigation";
import DemoCarousel from "./Pages/Contact-us"
import Payment from "./Pages/Payment";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Liked from "./Pages/Liked";
import { LikedContextProvider } from "./Context/LikedContext";
// import axios from "axios";
import { UserContextProvider } from "./Context/UserContext";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1 className="text-red-700">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
};

function App() {
  // axios.defaults.baseURL = 'http://localhost:4000/';
  return (
    <div className="App selection:bg-gray-400">
      <UserContextProvider>
        <CartContextProvider>
          <LikedContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigation name="E-Commerce" />} >
                  <Route index path="/Account/Login" element={<Login />} />
                  <Route index path="/Account/Signup" element={<Signup />} />
                  <Route index path="/" element={<Features />} />
                  <Route path="/AllProducts/" element={<AllProducts />} />
                  <Route path="/AllProducts/:id" element={<AllProducts />} />
                  <Route path="/Pricing/:id" element={<Pricing />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Liked" element={<Liked />} />
                  <Route path="/pages/contact-us" element={<DemoCarousel />} />
                </Route>
                <Route path="/Payment/:id/:type/:colour/:quantity" element={<Payment />} />
                <Route path="/Payment/checkout" element={<Payment />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LikedContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;