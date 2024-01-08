import { CoordinatesPopup } from '@/core/models/map.model';

function LocationPopup(props: CoordinatesPopup) {
  return (
    <div className='w-full p-1'>
      <p className='text-lg font-semibold m-1'>{props?.title}</p>
      <p className='text-base font-normal m-1'>{props?.description}</p>
      <p className='text-base font-normal m-1'>{props?.location}</p>
      <p className='text-lg uppercase italic font-bold m-1'>{props?.status}</p>
    </div>
  );
}

export default LocationPopup;
