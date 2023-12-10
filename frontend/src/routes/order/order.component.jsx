import OrderDetails from "../../components/order-details/order-details";
import { Route, Routes, useParams } from "react-router-dom";

const Order = () => {
  return (
    <Routes>
      <Route path=":orderID" element={<OrderDetails />} />
    </Routes>
  );
};

export default Order;
