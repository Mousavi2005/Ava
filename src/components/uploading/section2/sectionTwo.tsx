import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setUploadStatus, setFileType } from "../../../slices/uploadFile";
import UploadText from "../../texts/upload/uploadFile"
import ActiveUploadIcon from '../../../assets/icons/active/activeUpload.svg'

export default function SectionTwo() {
    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isFileUploaded = useSelector((state: RootState) => state.uploadFile.uploadStatus)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;
        const getFileType = () => {
            if (file.type === "audio/mpeg") return '.mp3'
            if (file.type === "video/mp4") return '.mp4'
            return null
        }
        dispatch(setFileType(getFileType()))
        dispatch(setUploadStatus('uploaded'))

    };


    return (
        <>
            {isFileUploaded === 'uploaded' ?
                <div></div>
                :
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-[62px] h-[62px] bg-[rgba(17,138,211,1)] rounded-full flex items-center justify-center">
                        <input type="file" accept=".mp3, .mp4" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
                        <img src={ActiveUploadIcon} alt="" className="w-[29.9px] h-[24.47px]" />
                    </button>
                    <UploadText></UploadText>
                </div>
            }
        </>

        // <div className="flex flex-col items-center gap-2">
        //     <button
        //         onClick={() => fileInputRef.current?.click()}
        //         className="w-[62px] h-[62px] bg-[rgba(17,138,211,1)] rounded-full flex items-center justify-center">
        //         <input type="file" accept=".mp3, .mp4" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
        //         <img src={ActiveUploadIcon} alt="" className="w-[29.9px] h-[24.47px]" />
        //     </button>
        //     <UploadText></UploadText>
        // </div>
    )
}
