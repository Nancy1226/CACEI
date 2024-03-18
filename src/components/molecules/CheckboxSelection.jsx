import React, { useState } from 'react';
import Check from '../atoms/Check';

function CheckboxSelection() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (value) => {
    setSelectedOption(value === selectedOption ? null : value);
  };

  return (
    <div className='flex md:flex-row gap-7 flex-col'>
      <label className='flex gap-1 items-center'>
        <Check type='checkbox' value="1" checked={selectedOption === '1'} onChange={() => handleCheckboxChange('1')} />
        Poco
      </label>
      <label className='flex gap-1 items-center'>
        <Check type='checkbox' value="2" checked={selectedOption === '2'} onChange={() => handleCheckboxChange('2')} />
        Debajo  del promedio
      </label>
      <label className='flex gap-1 items-center'>
        <Check type='checkbox' value="3" checked={selectedOption === '3'} onChange={() => handleCheckboxChange('3')} />
        promedio
      </label>
      <label className='flex gap-1 items-center'>
        <Check type='checkbox' value="4" checked={selectedOption === '4'} onChange={() => handleCheckboxChange('4')} />
        Superior al promedio
      </label>
      <label className='flex gap-1 items-center'>
        <Check type='checkbox' value="5" checked={selectedOption === '5'} onChange={() => handleCheckboxChange('5')} />
        Excelente
      </label>

    </div>
  );
}

export default CheckboxSelection;
