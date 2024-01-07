import { AdvertiseInfoType } from '@/core/models/adversise.model';
import { AdDetailForm, ReportForm } from '@/pages';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { memo, useState } from 'react';

function AdvertiseInfoComponent({ advertiseInfo }: { advertiseInfo?: AdvertiseInfoType }) {
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);

  return (
    <>
      {advertiseInfo ? (
        <div className='w-full p-3 border border-solid border-gray-300 mb-4 rounded-lg'>
          {/* <div className='font-bold text-lg text-center mb-4'>Thông tin bảng quảng cáo</div> */}
          <div className='text-lg font-bold'>{advertiseInfo?.name}</div>
          <div className='text-base font-medium text-gray-600 '>{advertiseInfo?.address}</div>
          <div className='text-base font-medium'>Kích thước: {advertiseInfo?.size}</div>
          <div className='text-base font-medium'>
            Số lượng: <b>{advertiseInfo?.quantity}</b>
          </div>
          <div className='text-base font-medium'>
            Hình thức: <b>{advertiseInfo?.advertisingType}</b>
          </div>
          <div className='text-base font-medium'>
            Phân loại: <b>{advertiseInfo?.locationType}</b>
          </div>
          <div className='flex  justify-around m-4 mb-0'>
            <Button type='primary' danger onClick={() => setModal1Open(true)}>
              Báo cáo
            </Button>

            <Button type='primary' onClick={() => setModal2Open(true)}>
              Chi tiết
            </Button>
            <Modal
              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
              width={600}
            >
              <AdDetailForm urlImage={advertiseInfo.image} date={advertiseInfo.expirationDate} />
            </Modal>
          </div>
          <Modal
            centered
            open={modal1Open}
            onOk={() => setModal1Open(false)}
            onCancel={() => setModal1Open(false)}
            footer=''
            width={1000}
            style={{ top: 20 }}
          >
            <ReportForm />
          </Modal>
        </div>
      ) : (
        <div className='bg-secondary-bgunsuccess p-3 rounded-lg flex flex-row items-start gap-3'>
          <ExclamationCircleOutlined className='p-1 text-lg text-primary-900 font-bold stroke-2' />
          <div>
            <h1 className='text-secondary-unsuccess text-base m-0'>Thông tin bảng quảng cáo</h1>
            <div className='text-secondary-unsuccess font-semibold'>Chưa có dữ liệu!</div>
            <div className='text-secondary-unsuccess'>Vui lòng chọn điểm trên bản đồ để xem</div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AdvertiseInfoComponent);
