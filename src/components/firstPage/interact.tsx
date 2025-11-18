import ToggleHeader from "./toggleHeader"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import RecordVoice from "./RecordVoice"
import UploadFile from "./uploadFile"
import PasteLink from "./pasteLink"

function Interact() {
    const activeSection = useSelector((state: RootState) => state.toggle.active)
    console.log(activeSection);

    return (
        <div className="w-[653px] h-[477px]">
            <ToggleHeader></ToggleHeader>
            <div
                className={`${activeSection === 'mic' ? "border-[rgba(0,186,159,1)] rounded-tr-none" : activeSection === 'upload' ? "border-[rgba(17,138,211,1)]" : "border-[rgba(255,22,84,1)]"} w-[653px] h-[429px] flex flex-col items-center justify-center gap-2 rounded-[25px] border-[1px] shadow-[1px_1px_50px_0_rgba(99,99,99,0.05)]`}>
                {activeSection === 'mic' ?
                    <RecordVoice></RecordVoice>
                    :
                    activeSection === 'upload' ?
                        <UploadFile></UploadFile>
                        :
                        <PasteLink></PasteLink>
                }

            </div>
        </div>
    )
}

export default Interact
