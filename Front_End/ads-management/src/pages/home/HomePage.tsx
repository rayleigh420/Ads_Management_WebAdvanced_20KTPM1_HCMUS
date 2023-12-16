import { Counter } from '../../components/ui';

const HomePage = () => {
  return (
    <div className='w-full flex items-center justify-center flex-col'>
      <h1 className='text-3xl font-bold'>This is homepage</h1>
      <Counter />
    </div>
  );
};
export default HomePage;
