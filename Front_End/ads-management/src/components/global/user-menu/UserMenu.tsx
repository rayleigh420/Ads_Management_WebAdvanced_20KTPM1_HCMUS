import { IMAGES } from '@/utils/theme';

export default function UserMenu() {
  return (
    <div className='flex items-center gap-5'>
      <div className='flex items-center gap-1.5 cursor-pointer'>
        <img src={IMAGES.LOGO} alt='user' />
        <div className='text-base font-bold text-white'>Jacky</div>
      </div>
      <div
        className='h-[36px] py-2 pt-1.5 px-5 font-bold text-base bg-primary-custom-900 text-white rounded-3xl cursor-pointer'
        style={{ border: '1px solid #fff' }}
      >
        Logout
      </div>
    </div>
  );
}
