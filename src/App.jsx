import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkLogged } from "./reducers/userReducer";
import { initializeProducts } from "./reducers/productsReducer";
import { initializeCart } from "./reducers/cartReducer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import Upload from "./pages/Upload";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./pages/Menu";
import Update from "./pages/Update";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkLogged());
    dispatch(initializeProducts());
    if (user) {
      dispatch(initializeCart(user.cart));
    }
  }, []);

  if (!user) {
    return (
      <div className="h-screen bg-cyan-800">
        <Login />
      </div>
    );
  }
  const notify = (text, status) => {
    toast(text, {
      type: status || "info",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
      closeOnClick: true,
      transition: Bounce,
      pauseOnFocusLoss: false,
    });
  };

  return (
    <Router>
      <div className="bg-gradient-to-br from-cyan-100 via-cyan-800  to-cyan-100 relative min-h-screen font-roboto">
        <Header notify={notify} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart notify={notify} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/upload" element={<Upload notify={notify} />} />
          <Route path="/update" element={<Update notify={notify} />} />
          <Route path="/profile" element={<Profile notify={notify} />} />
          <Route
            path="/products/:pid"
            element={<ProductDetail notify={notify} />}
          />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
