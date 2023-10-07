import React from 'react';
import { DetailEmployee, FormEmployee } from './Components';

const Home = () => {
  return (
    <div className='home'>
      <DetailEmployee />
      <FormEmployee />
    </div>
  );
}

export default Home