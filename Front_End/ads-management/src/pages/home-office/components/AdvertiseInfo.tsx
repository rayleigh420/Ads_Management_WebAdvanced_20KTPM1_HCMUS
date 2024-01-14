import { LocationRESP } from '@/apis/location/location.api';
import { getAddressMapDetailApi } from '@/apis/map-box/address-map_detail.api';
import { AdvertiseInfoType } from '@/core/models/adversise.model';
import { AdDetailForm, ReportFormModal } from '@/pages';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { memo, useState } from 'react';

function AdvertiseInfoComponent({
  advertiseInfo,
  location,
}: {
  advertiseInfo?: AdvertiseInfoType;
  location?: LocationRESP;
}) {
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);

  const queryAddress = useQuery({
    queryKey: ['location', location],
    queryFn: () => getAddressMapDetailApi(location!),
    select: (resp) => {
      return {
        name: resp.data.features[0].text,
        address: resp.data.features[0].place_name,
      };
    },
    enabled: !!location,
  });

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
            {advertiseInfo.reports?.length !== 0 && (
              <Button type='primary' danger onClick={() => setModal1Open(true)}>
                Xem báo cáo
              </Button>
            )}

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
            // centered
            centered
            open={modal1Open}
            onOk={() => setModal1Open(false)}
            onCancel={() => setModal1Open(false)}
            width={1000}
            className='my-3'
            // style={{ top: 20 }}
          >
            <ReportFormModal
              setOpen={setModal1Open}
              initialValues={{
                boardId: advertiseInfo.id,
                reportType: 1,
              }}
            />
          </Modal>
        </div>
      ) : location ? (
        <div className='flex justify-center w-full flex-col'>
          <div className='bg-secondary-bgunsuccess p-3 rounded-lg flex flex-row items-start gap-3'>
            <ExclamationCircleOutlined className='p-1 text-lg text-primary-900 font-bold stroke-2' />
            <div>
              <h1 className='text-secondary-unsuccess text-base m-0'>Thông tin bảng quảng cáo</h1>
              <div className='text-secondary-unsuccess font-semibold'>Chưa có dữ liệu!</div>
              <div className='text-secondary-unsuccess'>Vui lòng chọn điểm trên bản đồ để xem</div>
            </div>

            <Modal
              centered
              open={modal1Open}
              onOk={() => setModal1Open(false)}
              onCancel={() => setModal1Open(false)}
              width={1000}
              className='my-3'
              footer={null}
              maskClosable={false}
            >
              <ReportFormModal
                setOpen={setModal1Open}
                initialValues={{
                  locationId: location?.id,
                  reportType: 1,
                }}
                checked={location?.reports && location.reports.length !== 0}
              />
            </Modal>
          </div>
          {location.id && (
            <div className='bg-secondary-bgsuccess p-3 rounded-lg flex flex-row items-start gap-3 mt-5'>
              <CheckCircleOutlined className='p-1 text-lg text-secondary-success font-bold stroke-2' />
              <div className='flex flex-col '>
                <h1 className='text-secondary-unsuccess text-base m-0'>Thông tin địa điểm</h1>
                <div className='text-secondary-unsuccess font-semibold'>
                  {queryAddress.data?.name}
                </div>
                <div className='text-secondary-unsuccess'>{queryAddress.data?.address}</div>
                {location.reports && location.reports.length !== 0 && (
                  <Button
                    danger
                    onClick={() => setModal1Open(true)}
                    className='mt-2 self-end flex gap-2 items-center'
                  >
                    <InfoCircleOutlined className='text-red-500' />
                    Xem báo cáo
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default memo(AdvertiseInfoComponent);
