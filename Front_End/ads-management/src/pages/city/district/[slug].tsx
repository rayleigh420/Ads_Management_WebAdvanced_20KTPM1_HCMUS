import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function EditDistrict() {
  const { id } = useParams(); // id of district
  const [newName, setNewName] = useState('');

  const handleChangeName = (e: any) => {
    setNewName(e.target.value);
    console.log(e.target.value);
  };

  const handleClickChangeName = () => {
    console.log(newName);
  };

  return (
    <div className='w-full'>
      <h2>Edit District Name</h2>
      <Input value={newName} onChange={handleChangeName} />
      <Button className='mt-3' onClick={handleClickChangeName}>
        Change Name
      </Button>
    </div>
  );
}

export default EditDistrict;
