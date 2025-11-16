import { useDispatch, useSelector } from "react-redux"
import { setActiveSection } from "../slices/expanded"
import type { RootState } from '../store/store'

import textIcon from "../assets/icons/textIcon.svg"
import timeIcon from "../assets/icons/timeIcon.svg"
import refreshIcon from '../assets/icons/refreshIcon.svg'

export default function ExpandedHeader() {
    const dispatch = useDispatch()
    const activePage = useSelector((state: RootState) => state.page.activePage)


    return (
        <div className={`${activePage === 'archive' ? "w-[940px]" : "w-full"} flex items-center justify-between h-16 rounded-t-[25px] px-6`}>

            <div className={`${activePage === 'transcribe' ? "flex" : "hidden"} items-center h-full gap-6`}>
                <button className="w-[112px] h-[34px] rounded-[20px] bg-[rgba(17,138,211,1)] flex items-center justify-around">
                    <span className="text-[14px] font-normal text-[rgba(255,255,255,1)]">شروع دوباره</span>
                    <img src={refreshIcon} alt="" className="w-3 h-3" />
                </button>
                <button>e</button>
                <button>e</button>
            </div>

            <div className="flex h-full items-center gap-8" dir="rtl">
                <button className="w-[81px] h-6 flex items-center gap-2"
                    onClick={() => dispatch(setActiveSection('simple'))}
                >
                    <img src={textIcon} alt="" className="w-[17px] h-[17px]" />
                    <span className="text-[14px] font-normal">متن ساده</span>

                </button>

                <button className="w-[136px] h-6 flex items-center gap-2"
                    onClick={() => dispatch(setActiveSection('timed'))}

                >
                    <img src={timeIcon} alt="" className="w-[17px] h-[17px]" />
                    <span className="text-[14px] font-normal">متن زمان‌بندی شده</span>

                </button>

            </div>

        </div>
    )
}
