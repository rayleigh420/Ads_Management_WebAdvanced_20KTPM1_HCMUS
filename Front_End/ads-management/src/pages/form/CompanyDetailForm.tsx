import { CustomTextInput } from '@/components/ui/form/CustomTextInput';
import { Button, Divider, Form, Input } from 'antd';
import './CompanyDetailForm.scss';
import { Link } from 'react-router-dom';

export default function CompanyDetailForm() {
  return (
    <div className='w-full flex justify-center items-center p-6'>
      <div className='w-[800px] m-auto'>
        <h1 className='text-3xl font-bold text-center mb-11'>Thông tin chi tiết công ty</h1>
        <Form
          name='report-form'
          initialValues={{}}
          autoComplete='off'
          colon={false}
          labelAlign='left'
          className=''
        >
          <CustomTextInput<any>
            name='companyName'
            label='Tên công ty'
            disabled={true}
            defaultValue='Công ty TNHH Viettel'
          />
          <div className='flex justify-between gap-5'>
            <CustomTextInput<any>
              name='email'
              label='Email'
              classNameInput='w-[390px]'
              defaultValue='viettelcompany_vn@gmail.com'
              disabled={true}
            />
            <CustomTextInput<any>
              name='phone'
              label='Số điện thoại liên lạc'
              classNameInput='w-[390px]'
              defaultValue='0123456789'
              disabled={true}
            />
          </div>
          <CustomTextInput<any>
            name='address'
            label='Địa chỉ công ty'
            disabled={true}
            defaultValue='285 Đ. Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh'
          />
          <Link to='/' className='mt-5 p-5 flex align-middle flex-row-reverse'>
            <p className='text-sm font-semibold mt-1'>Quay về trang trước</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='6'
              height='9'
              viewBox='0 0 6 9'
              fill='none'
              className='mt-2 mr-2 font-semibold'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.80039 0.135232C6.05485 0.324102 6.06775 0.640513 5.82919 0.841974L1.4973 4.50001L5.82919 8.15801C6.06775 8.35951 6.05485 8.67591 5.80039 8.86481C5.54591 9.05361 5.14622 9.04341 4.90766 8.84201L0.17082 4.84198C-0.05694 4.64965 -0.05694 4.35037 0.17082 4.15804L4.90766 0.158032C5.14622 -0.0434286 5.54591 -0.0536286 5.80039 0.135232Z'
                fill='black'
              />
            </svg>
          </Link>
        </Form>

        <Divider />
      </div>
    </div>
  );
}
