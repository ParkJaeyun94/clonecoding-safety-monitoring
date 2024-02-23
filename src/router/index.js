import { Route, Routes } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import LivingRoom from '../pages/livingRoom';
import DiningRoom from '../pages/diningRoom';
import BedRoom from '../pages/bedRoom';
import BathRoom from '../pages/bathRoom';
import Backyard from '../pages/backyard';

const Routers = () => {
  return (
      <Routes>
        <Route index element={<LivingRoom />} />
        <Route path='/living-room' element={<LivingRoom />} />
        <Route path='/dining-room' element={<DiningRoom />} />
        <Route path='/bed-room' element={<BedRoom />} />
        <Route path='/bath-room' element={<BathRoom />} />
        <Route path='/backyard' element={<Backyard />} />
      </Routes>
    )
}

export default withCookies(Routers)
