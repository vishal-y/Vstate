import { useState } from 'react';
import Calendar from 'react-calendar';

export default function CalenderComp() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='w-1/4 p-2 bg-[#fcf5f3] rounded-xl shadow-xl'>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
