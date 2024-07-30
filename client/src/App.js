import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  FAQ,
  Service,
  DetailProduct,
  Blogs,
  Products,
} from "./pages/public";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.FAQs} element={<FAQ />} />
          <Route path={path.OURSERVICES} element={<Service />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
