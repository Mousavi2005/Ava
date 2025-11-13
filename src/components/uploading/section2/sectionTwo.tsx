import UploadText from "../../texts/upload/uploadFile"
import ActiveUploadIcon from '../../../assets/icons/active/activeUpload.svg'

export default function SectionTwo() {
    return (
        <>
            <button className="w-[62px] h-[62px] bg-[rgba(17,138,211,1)] rounded-full flex items-center justify-center">
                <img src={ActiveUploadIcon} alt="" className="w-[29.9px] h-[24.47px]" />
            </button>
            <UploadText></UploadText>
        </>
    )
}
