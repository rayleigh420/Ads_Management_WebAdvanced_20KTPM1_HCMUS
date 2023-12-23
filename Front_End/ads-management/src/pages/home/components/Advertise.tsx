import { Button } from "antd";
import { AimOutlined, ExclamationOutlined, MoreOutlined } from '@ant-design/icons';

function Advertise() {
    return (
        <div className='w-full p-6 border bg-[#e6f6fd]'>
            <div className='font-bold text-xl text-center mb-4'>Thông tin bảng quảng cáo</div>
            <div className='text-xl font-bold'>Trụ, cụm pano</div>
            <div className='text-base font-bold text-gray-600 py-2'>Đồng Khởi - Nguyễn Du</div>
            <div className='text-base font-bold'>Kích thước: 2.5m x 10m</div>
            <div className='text-base font-bold'>Số lượng: <b>1 trụ/ 1 bảng</b></div>
            <div className='text-base font-bold'>Hình thức: <b>cổ đông chính trị</b></div>
            <div className='text-base font-bold'>Phân loại: <b>Đất công/ Công viên/ Hành lang an toàn giao thông</b></div>
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