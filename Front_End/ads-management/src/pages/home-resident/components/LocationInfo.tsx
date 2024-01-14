import { getAddressMapDetailApi } from '@/apis/map-box/address-map_detail.api';
import { Coordinates } from '@/core/models/map.model';
import { ReportFormModal } from '@/pages';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { memo, useEffect, useRef, useState } from 'react';

type LocationInfoProps = {
  location?: Coordinates;
};

const LocationInfo = ({ location }: LocationInfoProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressExisted, setAddressExisted] = useState(false);
  const [modal, setModal] = useState(false);
  const dataRef = useRef<any>(undefined);

  const { mutate: mutateAddressDetail } = useMutation({
    mutationFn: (data: Coordinates) => getAddressMapDetailApi(data),
    onSuccess: (res) => {
      if (res.data.features[0].context.length === 5) dataRef.current = res.data.features[0].context;
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

  return (
    <>
      {addressExisted ? (
        <div className='bg-secondary-bgsuccess p-3 rounded-lg flex flex-row items-start gap-3'>
          <CheckCircleOutlined className='p-1 text-lg text-secondary-success font-bold stroke-2' />
          <div className='flex flex-col'>
            <h1 className='text-secondary-unsuccess text-base m-0'>Thông tin địa điểm</h1>
            <div className='text-secondary-unsuccess font-semibold'>{name}</div>
            <div className='text-secondary-unsuccess'>{address}</div>
            <Button
              danger
              onClick={() => setModal(true)}
              className='mt-2 self-end flex gap-2 items-center'
            >
              <InfoCircleOutlined className='text-red-500' />
              Báo cáo vi phạm
            </Button>
          </div>
          <Modal
            // centered
            centered
            open={modal}
            onOk={() => setModal(false)}
            onCancel={() => setModal(false)}
            width={1000}
            className='my-3'
            // style={{ top: 20 }}
          >
            <ReportFormModal
              setOpen={setModal}
              initialValues={{
                lat: location?.lat,
                long: location?.long,
                address: address,
                wardName: dataRef.current[0]?.text,
                districtName: dataRef.current[2]?.text,
                reportType: 0,
              }}
            />
          </Modal>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default memo(LocationInfo);
