import { getAddressMapDetailApi } from '@/apis/map-box/address-map_detail.api';
import { Coordinates } from '@/core/models/map.model';
import { ReportForm } from '@/pages';
import { ReportInput } from '@/pages/form/ReportForm';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { memo, useEffect, useState } from 'react';

type LocationInfoProps = {
  location?: Coordinates;
  reportInfo?: ReportInput;
};

const LocationInfo = ({ location, reportInfo }: LocationInfoProps) => {
  const [modal1Open, setModal1Open] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressExisted, setAddressExisted] = useState(false);

  const { mutate: mutateAddressDetail } = useMutation({
    mutationFn: (data: Coordinates) => getAddressMapDetailApi(data),
    onSuccess: (res) => {
      setName(res.data.features[0].text);
      if (res.data.features[0].properties.address === undefined) {
        setAddressExisted(false);
      } else {
        setAddressExisted(true);
        setAddress(
          res.data.features[0].properties.address + ', ' + res.data.features[3].place_name,
        );
      }
    },
  });

  useEffect(() => {
    if (location) {
      mutateAddressDetail(location);
    } else {
      setAddressExisted(false);
    }
  }, [location]);

  console.log(reportInfo);

  return (
    <>
      {addressExisted ? (
        <div className='bg-secondary-bgsuccess p-5 rounded-lg'>
          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              className='mr-2'
            >
              <rect width='24' height='24' rx='6' fill='url(#paint0_linear_50_1310)' />
              <path
                d='M8.5 12.5L10.5 14.5L15.5 9.5'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_50_1310'
                  x1='12'
                  y1='0'
                  x2='12'
                  y2='24'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#48CA93' />
                  <stop offset='1' stopColor='#48BACA' />
                </linearGradient>
              </defs>
            </svg>
            <h1 className='text-secondary-success text-base mt-0'>Thông tin địa điểm</h1>
          </div>
          <div className='flex flex-col ml-9 text-secondary-success font-semibold'>{name}</div>
          <div className='flex flex-col ml-9 text-secondary-success'>{address}</div>
          <div className='flex flex-wrap justify-end'>
            {reportInfo ? (
              <Button
                type='primary'
                onClick={() => setModal1Open(true)}
                className='mt-2 bg-blue-300'
              >
                Đã báo cáo vi phạm
              </Button>
            ) : (
              <Button danger onClick={() => setModal1Open(true)} className='mt-2'>
                Báo cáo vi phạm
              </Button>
            )}
            <Modal
              centered
              open={modal1Open}
              onOk={() => setModal1Open(false)}
              onCancel={() => setModal1Open(false)}
              footer=''
              width={1000}
              style={{ top: 20 }}
            >
              <ReportForm initialValues={reportInfo} />
            </Modal>
          </div>
        </div>
      ) : (
        <div className='bg-secondary-bgunsuccess p-5 rounded-lg'>
          <div className='flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              className='mr-2'
            >
              <rect width='24' height='24' rx='6' fill='url(#paint0_linear_50_1102)' />
              <path d='M12 16V11' stroke='white' strokeWidth='1.5' strokeLinecap='round' />
              <circle cx='1' cy='1' r='1' transform='matrix(1 0 0 -1 11 9)' fill='white' />
              <defs>
                <linearGradient
                  id='paint0_linear_50_1102'
                  x1='12'
                  y1='-4.5'
                  x2='12'
                  y2='28'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#4DCAFF' />
                  <stop offset='1' stopColor='#4EA3E0' />
                </linearGradient>
              </defs>
            </svg>
            <h1 className='text-secondary-unsuccess text-base mt-0'>Thông tin bảng quảng cáo</h1>
          </div>
          <div className='flex flex-col ml-9 text-secondary-unsuccess font-semibold'>
            Chưa có dữ liệu!
          </div>
          <div className='flex flex-col ml-9 text-secondary-unsuccess'>
            Vui lòng chọn điểm trên bản đồ để xem
          </div>
        </div>
      )}
    </>
  );
};

export default memo(LocationInfo);
