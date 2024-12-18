import {
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone,
    PiBagSimpleDuotone,
    PiReceiptDuotone,
    PiFileTextDuotone,
    PiMagnifyingGlassDuotone,PiUserDuotone 
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
    inquiryMenuItem: <PiMagnifyingGlassDuotone /> 
    
};

export default navigationIcon;
