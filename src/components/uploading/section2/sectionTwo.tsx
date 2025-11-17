import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setUploadStatus, setFileType } from "../../../slices/uploadFile";
import Expanded from "../../expanded";
import UploadText from "../../texts/upload/uploadFile"
import ActiveUploadIcon from '../../../assets/icons/active/activeUpload.svg'

export default function SectionTwo() {
    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isFileUploaded = useSelector((state: RootState) => state.uploadFile.uploadStatus)
    // const segments = [
    //     { start: "0:00:0.510", end: "0:00:3.540", text: "افتخاری بالاتر از تمدید قراردادم با پرسپولیس" },
    //     { start: "0:00:3.750", end: "0:00:7.350", text: "خرید طلا راحت تر از همیشه با ملی گرگ" },
    //     { start: "0:00:8.130", end: "0:00:11.460", text: "محمد عمری گفت جلسه به فردا موکول شد" },
    //     { start: "0:00:11.520", end: "0:00:17.220", text: "باعث افتخارمه که با پرسپولیس تمدید کنم فردا آخرین شلیک فست" },
    //     { start: "0:00:17.760", end: "0:00:20.820", text: "تو نشست خبری پرتغال و اسپانیا رونالدو گفت" },
    //     { start: "0:00:20.820", end: "0:00:24.840", text: "امیدوارم تیم تو بهترین شرایط ممکن باشه و بتونیم بازی رو ببریم" },
    //     { start: "0:00:24.870", end: "0:00:33.900", text: "کریس در مورد یامال گفت خیلی خوب کار میکنه و از است…ید فشار رو از روش برداریم چون به آرامش نیاز داریم" },
    //     { start: "0:00:33.900", end: "0:00:36.870", text: "شروع رویایی دختران ایران" },
    //     { start: "0:00:36.990", end: "0:00:44.820", text: "تیم ملی والیبال زنان ایران تو اولین مسابقه شون تو … آسیای دو هزار و بیست و پنج اندونزی رو سه دو بردن" },
    //     { start: "0:00:44.940", end: "0:00:54.660", text: "خیلی مسی رو دوست دارم رونالدو گفت پانزده ساله که ب…وب رفتار میکرد و من هم احترام زیادی برای مسی قایم" },
    //     { start: "0:00:54.660", end: "0:00:59.370", text: "جوایز وقتی انگلیسی صحبت نمی کردند برای مسی در حکم مترجم" }
    // ];


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
                <Expanded></Expanded>
                :
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
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

    )
}
