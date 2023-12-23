import { Button } from "antd";
import { AimOutlined, ExclamationOutlined, MoreOutlined } from '@ant-design/icons';
import { AdvertiseInfo, AdvertisingLocationInfo } from "@/core/models/adversise.model";

function Advertise(props: AdvertisingLocationInfo) {
    return (
        <div className='w-full p-6 border bg-[#e6f6fd]'>
            <div className='font-bold text-xl text-center mb-4'>Thông tin bảng quảng cáo</div>
            <div className='text-xl font-bold'>{props.advertisingLocation.name}</div>
            <div className='text-base font-bold text-gray-600 py-2'>{props.advertisingLocation.address}</div>
            <div className='text-base font-bold'>Kích thước: {props.advertisingLocation.size}</div>
            <div className='text-base font-bold'>Số lượng: <b>{props.advertisingLocation.quantity}</b></div>
            <div className='text-base font-bold'>Hình thức: <b>{props.advertisingLocation.formOfAdvertising}</b></div>
            <div className='text-base font-bold'>Phân loại: <b>{props.advertisingLocation.type}</b></div>
            <div className='flex justify-end gap-4'>
                <Button
                    icon={<ExclamationOutlined />}
                    danger
                    className='text-red-500 font-bold'
                >
                    Report
                </Button>
                <Button
                    icon={<MoreOutlined />}
                    className='text-blue-500 font-bold'
                >
                    Detail
                </Button>
            </div>
        </div>
    );
}

export default Advertise;