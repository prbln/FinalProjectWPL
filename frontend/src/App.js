import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/SignIn/signin.component";
import SignUp from "./routes/SignUp/signup.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Admin from "./routes/admin/admin.component";
import Order from "./routes/order/order.component";
import NewItem from "./routes/newItem/newItem.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="inventory" element={<Admin />} />
        <Route path="orderDetails/*" element={<Order />} />
        <Route path="addNewItem" element={<NewItem />} />
      </Route>
    </Routes>
  );
};

export default App;
