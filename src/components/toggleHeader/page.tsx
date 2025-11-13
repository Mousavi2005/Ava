import ActiveMicIcon from "../../assets/icons/active/activeMic.svg"
import notActiveUploadIcon from "../../assets/icons/notActive/notActiveUpload.svg"
import notActiveChainIcon from "../../assets/icons/notActive/notActiveChain.svg"

function ToggleHeader() {

    return (
        <section className="w-full flex items-center flex-row-reverse gap-5">
            <div className="flex items-center gap-2 w-[114px] h-12">
                <span>ضبط صدا</span>
                <img src={ActiveMicIcon} alt="" />
            </div>
            <div className="flex items-center gap-2">
                <span>بارگذاری فایل</span>
                <img src={notActiveUploadIcon} alt="" />

            </div>
            <div className="flex items-center gap-2">
                <span>لینک</span>
                <img src={notActiveChainIcon} alt="" />
            </div>
        </section>
    )
}

export default ToggleHeader
