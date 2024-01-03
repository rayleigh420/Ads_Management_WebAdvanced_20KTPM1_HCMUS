import { CoordinatesPopup } from '@/core/models/map.model';

function LocationPopup(props: CoordinatesPopup) {
  return (
    <div className='w-full'>
      <p className='text-lg font-semibold mb-2'>{props.title}</p>
      <p className='text-base font-medium mb-2'>{props.description}</p>
      <p className='text-base font-medium mb-2'>{props.location}</p>
      <p className='text-lg uppercase italic font-bold'>{props.status}</p>
    </div>
  );
}

export default LocationPopup;
