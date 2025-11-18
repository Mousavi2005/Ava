import ActiveMicIcon from "../../assets/icons/active/activeMic.svg"
import notActiveMicIcon from '../../assets/icons/notActive/notActiveMic.svg'
import ActiveUploadIcon from "../../assets/icons/active/activeUpload.svg"
import notActiveUploadIcon from "../../assets/icons/notActive/notActiveUpload.svg"
import ActiveChainIcon from "../../assets/icons/active/activeChain.svg"
import notActiveChainIcon from "../../assets/icons/notActive/notActiveChain.svg"
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from "../../store/store"
import { activateMic, activateUpload, activateLink } from "../../slices/toggleHeaderSlice"

function ToggleHeader() {

    const dispatch = useDispatch()
    const activeSection = useSelector((state: RootState) => state.toggle.active)

    return (
        <section className="w-full flex items-center flex-row-reverse gap-5">
            <button onClick={() => dispatch(activateMic())}
                className={`${activeSection === 'mic' ? "bg-[rgba(0,186,159,1)] w-[114px] h-12" : "w-[78px] h-6"} rounded-t-[10px] flex items-center justify-center gap-2`}>
                <span
                    className={`${activeSection === 'mic' ? "text-[rgba(255,255,255,1)] text-[16px] font-normal" : "text-[rgba(150,150,150,1)] text-[14px] font-light"}  `} >
                    ضبط صدا
                </span>
                <img src={`${activeSection === 'mic' ? ActiveMicIcon : notActiveMicIcon}`} alt=""
                    className={`${activeSection === 'mic' ? "h-[21.6px]" : "h-[18px]"} w-[13px]`}
                />
            </button>

            <button onClick={() => dispatch(activateUpload())}
                className={`${activeSection === 'upload' ? "bg-[rgba(17,138,211,1)] w-[144px] h-12" : "w-[99.3px] h-6"} rounded-t-[10px] flex items-center justify-center gap-2`}>
                <span
                    className={`${activeSection === 'upload' ? "text-[rgba(255,255,255,1)] text-[16px] font-normal" : "text-[rgba(150,150,150,1)] text-[14px] font-light"}`}>
                    بارگذاری فایل
                </span>
                <img src={`${activeSection === 'upload' ? ActiveUploadIcon : notActiveUploadIcon}`} alt="" className="w-[18.3px] h-[15px]" />

            </button>

            <button onClick={() => dispatch(activateLink())}
                className={`${activeSection === 'link' ? "bg-[rgba(255,22,84,1)] w-[90px] h-12" : "w-[52.7px] h-6"} rounded-t-[10px] flex items-center justify-center gap-2`}>
                <span
                className={`${activeSection === 'link' ? "text-[rgba(255,255,255,1)] text-[16px] font-normal" : "text-[rgba(150,150,150,1)] text-[14px] font-light"}`}>
                    لینک
                </span>
                <img src={`${activeSection === 'link' ? ActiveChainIcon : notActiveChainIcon}`} alt="" />
            </button>
        </section>
    )
}

export default ToggleHeader
