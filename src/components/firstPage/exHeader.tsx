import { useDispatch, useSelector } from "react-redux"
import { setActiveSection } from "../../slices/expanded"
import { setUploadStatus, setFileType, setUploadedFile } from "../../slices/uploadFile"
import type { RootState } from '../../store/store'
import { useState } from "react"

import activeTextIcon from "../../assets/icons/activeTextIcon.svg"
import textIcon from "../../assets/icons/textIcon.svg"
import timeIcon from "../../assets/icons/timeIcon.svg"
import activeTimeIcon from "../../assets/icons/activeTimeIcon.svg"
import refreshIcon from '../../assets/icons/refreshIcon.svg'
import downloadIcon from '../../assets/icons/archive/downloadIcon.svg'
import activeDownloadIcon from '../../assets/icons/archive/activeDownload.svg'
import copyIcon from '../../assets/icons/archive/copyIcon.svg'
import activeCopyIcon from '../../assets/icons/archive/activeCopy.svg'

export default function ExpandedHeader() {
    const dispatch = useDispatch()
    const activePage = useSelector((state: RootState) => state.page.activePage)
    const expandActiveSection = useSelector((state: RootState) => state.expand.activeSection)
    const [hoverDownload, setHoverDownload] = useState(false)
    const [hoverCopy, setHoverCopy] = useState(false)

    function restart() {
        dispatch(setActiveSection('simple'))
        dispatch(setUploadStatus(null))
        dispatch(setFileType(null))
        dispatch(setUploadedFile(null))
    }

    return (
        <div className={`${activePage === 'archive' ? "w-[940px]" : "w-full"} flex items-center justify-between h-12 rounded-t-[25px] px-6`}>

            <div className={`flex items-center h-full gap-6`}>
                <button
                    onClick={restart}
                    className="w-[112px] h-[34px] rounded-[20px] bg-[rgba(17,138,211,1)] flex items-center justify-around">
                    <span className="text-[14px] font-normal text-[rgba(255,255,255,1)]">شروع دوباره</span>
                    <img src={refreshIcon} alt="" className="w-3 h-3" />
                </button>
                <button
                    onMouseEnter={() => setHoverCopy(true)}
                    onMouseLeave={() => setHoverCopy(false)}

                >
                    <img src={hoverCopy ? activeCopyIcon : copyIcon} alt="" className="w-[15.8px] h-[17.2px]" />
                </button>
                <button
                    onMouseEnter={() => setHoverDownload(true)}
                    onMouseLeave={() => setHoverDownload(false)}
                >
                    <img src={hoverDownload ? activeDownloadIcon : downloadIcon} alt="" className="w-[13.4px] h-[14.15px]" />
                </button>
            </div>

            <div className="flex h-full items-center gap-8" dir="rtl">
                <button className="w-[81px] h-6 flex items-center gap-2"
                    onClick={() => dispatch(setActiveSection('simple'))}
                >
                    <img src={expandActiveSection === 'simple' ? activeTextIcon : textIcon} alt="" className="w-[17px] h-[17px]" />
                    <span className={`${expandActiveSection === 'simple' ? "font-normal" : "font-light"} text-[14px]`}>متن ساده</span>

                </button>

                <button className="w-[140px] h-6 flex items-center gap-2"
                    onClick={() => dispatch(setActiveSection('timed'))}

                >
                    <img src={expandActiveSection === 'timed' ? activeTimeIcon : timeIcon} alt="" className="w-[18px] h-[17px]" />
                    <span className={`${expandActiveSection === 'timed' ? "font-normal" : "font-light"} text-[14px]`}>متن زمان بندی شده</span>

                </button>

            </div>

        </div>
    )
}
