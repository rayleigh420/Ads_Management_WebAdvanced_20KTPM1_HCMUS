import { AdsOrReportLocationInfo } from '@/core/models/adversise.model';
import { AdDetailForm, ReportForm } from '@/pages';
import { ExclamationOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { memo, useState } from 'react';

function AdvertiseInfo(props: AdsOrReportLocationInfo) {
  console.log('12345678', props.report);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);

  return (
    <div className='w-full p-6 border bg-[#e6f6fd] mb-4'>
      <div className='font-bold text-xl text-center mb-4'>Thông tin bảng quảng cáo</div>
      <div className='text-xl font-bold'>{props.advertisingLocation?.name}</div>
      <div className='text-base font-bold text-gray-600 py-2'>
        {props.advertisingLocation?.address}
      </div>
      <div className='text-base font-bold'>Kích thước: {props.advertisingLocation?.size}</div>
      <div className='text-base font-bold'>
        Số lượng: <b>{props.advertisingLocation?.quantity}</b>
      </div>
      <div className='text-base font-bold'>
        Hình thức: <b>{props.advertisingLocation?.formOfAdvertising}</b>
      </div>
      <div className='text-base font-bold'>
        Phân loại: <b>{props.advertisingLocation?.typeString}</b>
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          icon={<ExclamationOutlined />}
          danger
          className='text-red-500 font-bold'
          onClick={() => setModal1Open(true)}
        >
          Report
        </Button>
        <Modal
          centered
          open={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
          footer=''
          width={1000}
          style={{ top: 20 }}
        >
          <ReportForm initialValues={props.report} />
        </Modal>

        <Button
          icon={<MoreOutlined />}
          className='text-blue-500 font-bold'
          onClick={() => setModal2Open(true)}
        >
          Detail
        </Button>
        <Modal
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          footer=''
          width={600}
        >
          <AdDetailForm />
        </Modal>
      </div>
    </div>
  );
}

export default memo(AdvertiseInfo);
