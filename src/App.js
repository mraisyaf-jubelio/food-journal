import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Login from './component/login';
import Register from './component/register';
import Dashboard from './component/dashboard';
import DetailFood from './component/detailFood';
import NavigasiBar from './component/navigasi';
import User from './component/user';
import AddFood from './component/admin/add-food';
import NavigasiAdmin from './component/admin/navigasi-admin';
import Admin from './component/admin/admin';
import DetFoodAdmin from './component/admin/detFoodAdmin';
import Error from './component/erorPage';
import UserLikeFood from './component/userLikeFood';
import DatasUser from './component/admin/userAll';


function App() {
  const local = localStorage.getItem("myObject");
  const obj = JSON.parse(local);
  let sesi = {}
  for (const i in obj) {
    sesi = obj[i];
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={sesi.token && sesi.role === "user" ? <NavigasiBar /> : <Error />} >
          <Route index element={<Dashboard />} />
          <Route exact path={"detail/:id"} element={<DetailFood />} />
          <Route exact path="user" element={<User />} />
          <Route exact path='like-food' element={<UserLikeFood />} />
        </Route>
        <Route exact path='/admin' element={sesi.token && sesi.role === "admin" ? <NavigasiAdmin /> : <Error />}>
          <Route index element={<Admin />} />
          <Route exact path='addFoodAdmin' element={<AddFood />} />
          <Route exact path='detailFoodAdmin/:id' element={<DetFoodAdmin />} />
          <Route exact path='all-user' element={<DatasUser />} />
          <Route exact path='profile' element={<User />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
