import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
    PiReceiptDuotone,
    PiFileTextDuotone,
    PiMagnifyingGlassDuotone,PiUserDuotone ,PiUsersDuotone ,PiUserCircleDuotone
} from 'react-icons/pi';
import { PiChartLineDuotone } from 'react-icons/pi';

export type NavigationIcons = Record<string, JSX.Element>;

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    dashboardMenuItem: <PiChartLineDuotone />,
    singleMenu: <PiAcornDuotone />,
    usersMenuItem: <PiUserDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
    transactioncollapseMenu: <PiReceiptDuotone />,
    contentMenu: <PiFileTextDuotone />,
    inquiryMenuItem: <PiMagnifyingGlassDuotone />,
    groupMenuItem: <PiUsersDuotone />,
    kycMenuItem: <PiUserCircleDuotone />
    
};

export default navigationIcon;

