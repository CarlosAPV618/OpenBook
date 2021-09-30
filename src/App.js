import React from 'react';
import BooksProvider from './context/BooksProvider';
import MenuRouter from './routers/MenuRouter';

const App = () => {
  return (
    <BooksProvider>

      <div className='flex justify-center h-full p-5 min-h-screen'>
        <MenuRouter />
      </div>
      
    </BooksProvider>
  );
};

export default App;