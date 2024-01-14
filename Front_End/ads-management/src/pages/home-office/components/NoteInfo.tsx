/**
 * ICONS.MARKER_ADS_RED: có board nhưng k có report đã quy hoạch
ICONS.MARKER_ADS_VIOLET:có board nhưng k có report chưa quy hoạch.
ICONS.BOARD_REPORT: có board mà là report board
ICONS.REPORT_ICON: không có board report location
ICONS.LOCATION_ICON: vị trí location k có report k có board
help me note this
 */

import { ICONS } from '@/utils/theme';
import { Col, Row } from 'antd';

export default function NoteInfo() {
  return (
    <div>
      <Row>
        <Col span={5}>
          <img src={ICONS.MARKER_ADS_RED} alt='' />
        </Col>
        {/* center items */}
        <Col span={19} className='items-center flex'>
          <span>Bảng quảng cáo đã quy hoạch</span>
        </Col>
        <Col span={5}>
          <img src={ICONS.MARKER_ADS_VIOLET} alt='' />
        </Col>
        <Col span={19} className='items-center flex'>
          <span>Bảng quảng cáo chưa quy hoạch</span>
        </Col>

        <Col span={5}>
          <img src={ICONS.BOARD_REPORT} alt='' />
        </Col>
        <Col span={19} className='items-center flex'>
          <span>Báo cáo bảng báo quảng cáo</span>
        </Col>

        <Col span={5}>
          <img src={ICONS.REPORT_ICON} alt='' />
        </Col>
        <Col span={19} className='items-center flex'>
          <span>Báo cáo điểm đặt</span>
        </Col>

        <Col span={5}>
          <img src={ICONS.LOCATION_ICON} alt='' />
        </Col>
        <Col span={19} className='items-center flex'>
          <span>Điểm đặt</span>
        </Col>
      </Row>
    </div>
  );
}
