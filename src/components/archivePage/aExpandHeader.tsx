import { useSelector } from "react-redux"
import type { RootState } from '../../store/store'

import activeTextIcon from "../../assets/icons/activeTextIcon.svg"
import textIcon from "../../assets/icons/textIcon.svg"
import timeIcon from "../../assets/icons/timeIcon.svg"
import activeTimeIcon from "../../assets/icons/activeTimeIcon.svg"

type Props = {
    expandActiveSection: string;
    setExpandActiveSection: React.Dispatch<React.SetStateAction<string>>;
};

export default function ArchiveExpandedHeader({ expandActiveSection, setExpandActiveSection }: Props) {
    const activePage = useSelector((state: RootState) => state.page.activePage)
    // const [expandActiveSection, setExpandActiveSection] = useState('simple')

    return (
        <div className={` w-[900px] flex items-center justify-between h-12 rounded-t-[25px] px-6`}>

            <div className="flex h-full items-center gap-8" dir="rtl">
                <button className="w-[81px] h-6 flex items-center gap-2"
                    onClick={() => setExpandActiveSection('simple')}
                >
                    <img src={expandActiveSection === 'simple' ? activeTextIcon : textIcon} alt="" className="w-[17px] h-[17px]" />
                    <span className={`${expandActiveSection === 'simple' ? "font-normal" : "font-light"} text-[14px]`}>متن ساده</span>

                </button>

                <button className="w-[140px] h-6 flex items-center gap-2"
                    onClick={() => setExpandActiveSection('timed')}

                >
                    <img src={expandActiveSection === 'timed' ? activeTimeIcon : timeIcon} alt="" className="w-[18px] h-[17px]" />
                    <span className={`${expandActiveSection === 'timed' ? "font-normal" : "font-light"} text-[14px]`}>متن زمان بندی شده</span>

                </button>

            </div>

        </div>
    )
}
