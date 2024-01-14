import React from 'react';
import './CustomToast.scss';

interface CustomToastProps {
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message }) => {
  return (
    <div className='toast'>
      <p>{message}</p>
    </div>
  );
};

export default CustomToast;
