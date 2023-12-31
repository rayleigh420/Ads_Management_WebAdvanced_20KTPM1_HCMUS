import { AdvertisingLocationType } from '@/core/enums/AdvertisingLocationType.enum';
import { AdsOrReportLocationInfo } from '@/core/models/adversise.model';

//mock data for test map
export const mockDataLocations: AdsOrReportLocationInfo[] = [
  {
    advertisingLocation: {
      id: '1',
      typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 1',
      address: 'Đồng Khởi - Nguyễn Du',
      type: AdvertisingLocationType.BusStop,
      size: '2.5m x 10m',
      quantity: '1 trụ/ 1 bảng',
      formOfAdvertising: 'cổ động chính trị',
      name: 'Trụ, cụm pano',
      image: '',
      expirationDate: '12/12/2024',
    },
    report: {
      username: 'Trụ, cụm pano',
      email: 'manhtu2272002@gmail.com',
      phone: '0974220702',
      select: 'eeee',
      reportContent: 'k có sao',
      image: 'wwe',
    },
    coordinates: {
      longitude: 106.729835,
      latitude: 10.739484,
    },
    isZone: true,
  },
  {
    report: {
      username: 'Trụ, cụm pano',
      email: 'manhtu2272002@gmail.com',
      phone: '0974220702',
      select: 'eeee',
      reportContent: 'k có sao',
      image: 'wwe',
    },
    coordinates: {
      longitude: 106.715876,
      latitude: 10.731419,
    },
  },
  {
    advertisingLocation: {
      id: '3',
      typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 3',
      address: 'Đồng Khởi - Nguyễn Du',
      type: AdvertisingLocationType.PublicLand,
      size: '2.5m x 10m',
      quantity: '1 trụ/ 1 bảng',
      formOfAdvertising: 'cổ động chính trị',
      name: 'Trụ, cụm pano',
      image: '',
      expirationDate: '12/12/2024',
    },
    coordinates: {
      longitude: 106.65957529854192,
      latitude: 10.804592977044063,
    },
  },
  {
    advertisingLocation: {
      id: '3',
      typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 4',
      address: 'Đồng Khởi - Nguyễn Du',
      type: AdvertisingLocationType.GasStation,
      size: '2.5m x 10m',
      quantity: '1 trụ/ 1 bảng',
      formOfAdvertising: 'cổ động chính trị',
      name: 'Trụ, cụm pano',
      image: '',
      expirationDate: '12/12/2024',
    },
    coordinates: {
      longitude: 106.66076782699842,
      latitude: 10.803450999515064,
    },
  },
  {
    advertisingLocation: {
      id: '4',
      typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 5',
      address: 'Đồng Khởi - Nguyễn Du',
      type: AdvertisingLocationType.House,
      size: '2.5m x 10m',
      quantity: '1 trụ/ 1 bảng',
      formOfAdvertising: 'cổ động chính trị',
      name: 'Trụ, cụm pano',
      image: '',
      expirationDate: '12/12/2024',
    },
    coordinates: {
      longitude: 106.66094109691875,
      latitude: 10.802745704872967,
    },
  },
  {
    advertisingLocation: {
      id: '5',
      typeString: 'Đất công/ Công viên/ Hành lang an toàn giao thông 5',
      address: 'Đồng Khởi - Nguyễn Du',
      type: AdvertisingLocationType.House,
      size: '2.5m x 10m',
      quantity: '1 trụ/ 1 bảng',
      formOfAdvertising: 'cổ động chính trị',
      name: 'Trụ, cụm pano',
      image: '',
      expirationDate: '12/12/2024',
    },
    coordinates: {
      longitude: 107.07597921052809,
      latitude: 10.341370911378078,
    },
  },
];
