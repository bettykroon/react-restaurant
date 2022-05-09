import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Home } from './components/Home/Home';
import { Booking } from './components/Booking/Booking';
import { Contact } from './components/Contact/Contact';
import Admin from './components/Admin/Admin';
import CreateRestaurantService from './Services/CreateRestaurantService/CreateRestaurantService';

function App() {
  const id = localStorage.getItem('id');
  
  return (
    <>
      {id === null && <CreateRestaurantService></CreateRestaurantService>}
      <Routes>
        <Route path='/react-restaurant' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/react-restaurant/bokning' element={<Booking/>}/>
          <Route path='/react-restaurant/kontakt' element={<Contact/>}/>
          <Route path='/react-restaurant/admin' element={<Admin/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
