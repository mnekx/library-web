import AppHeaderComp from './AppHeaderComp';
import { Outlet } from 'react-router-dom';

const HomeComp = () => {
  return <><AppHeaderComp/><Outlet/></>;
};

export default HomeComp;
