import { useDispatch } from "react-redux"
import { setActiveSection } from "../slices/expanded"

import textIcon from "../assets/icons/textIcon.svg"
import timeIcon from "../assets/icons/timeIcon.svg"

export default function ExpandedHeader() {
    const dispatch = useDispatch()



    return (
        <div className="w-full flex items-center justify-between">

            {/* <div>
                <button></button>
                <button>e</button>
                <button>e</button>
            </div> */}

            <div className="flex h-full items-center gap-8">
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
