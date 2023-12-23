import { ICONS } from '@/utils/theme';

const menuIconsSet = {
  report: {
    default: ICONS.REPORT_ICON_DEFAULT,
    active: ICONS.REPORT_ICON_ACTIVE,
  },
  district: {
    default: ICONS.DISTRICT_ICON_DEFAULT,
    active: ICONS.DISTRICT_ICON_ACTIVE,
  },
  ward: {
    default: ICONS.DISTRICT_ICON_DEFAULT,
    active: ICONS.DISTRICT_ICON_ACTIVE,
  },
  ads: {
    default: ICONS.ADS_ICON_DEFAULT,
    active: ICONS.ADS_ICON_ACTIVE,
  },
};

export type MenuIconType = keyof typeof menuIconsSet;

type MenuIconProps = {
  icon: MenuIconType;
  isActive?: boolean;
};

export default function MenuIcon({ icon, isActive = false }: MenuIconProps) {
  return (
    <img
      src={isActive ? menuIconsSet[icon].active : menuIconsSet[icon].default}
      alt={`${icon} ${isActive ? 'active' : 'default'}`}
    />
  );
}
