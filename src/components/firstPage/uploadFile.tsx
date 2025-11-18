import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setUploadStatus, setFileType } from "../../slices/uploadFile";
import Expanded from "./expanded";
import UploadText from "../text/transcribePage/uploadFile"
import ActiveUploadIcon from '../../assets/icons/active/activeUpload.svg'
import axios from "axios";

export default function UploadFile() {

    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isFileUploaded = useSelector((state: RootState) => state.uploadFile.uploadStatus)
    // const uploadedFile = useSelector((state: RootState) => state.uploadFile.uploadedFile)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [segments, setSegments] = useState(null)
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

    async function transcribeFile(file: File) {
        const token = import.meta.env.VITE_API_TOKEN;

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('media', file); // Key is 'media' based on Postman

            const response = await axios.post(
                "https://harf.roshan-ai.ir/api/transcribe_files/",
                formData, // Send FormData instead of JSON
                {
                    headers: {
                        Authorization: token,
                        // Note: Don't set Content-Type for FormData, axios does it automatically
                        // with the correct boundary for multipart/form-data
                    }
                }
            );

            console.log("SUCCESS:", response.status, response.data);
            return response.data;

        } catch (err: any) {
            console.error("ERROR STATUS:", err.response?.status);
            console.error("ERROR DATA:", err.response?.data);
            throw err;
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(`uploaded file : ${file}`);

        if (!file) return;

        try {
            // Set loading state
            dispatch(setUploadStatus('uploading'));

            // Determine file type
            const getFileType = () => {
                if (file.type === "audio/mpeg") return '.mp3';
                if (file.type === "video/mp4") return '.mp4';
                return null;
            };

            const fileType = getFileType();
            dispatch(setFileType(fileType));

            const transcriptionResult = await transcribeFile(file);
            console.log('Transcription completed:', transcriptionResult);
            dispatch(setUploadStatus('uploaded'));

            setUploadedFile(transcriptionResult[0])
            setSegments(transcriptionResult[0].segments)
            // You might want to store the transcription data in your state
            // dispatch(setTranscriptionData(transcriptionResult));

        } catch (error) {
            console.error('File upload/transcription failed:', error);
        }
    };

    console.log(`segments : ${segments}`);




    return (
        <>
            {isFileUploaded === 'uploaded' ?
                <Expanded segments={segments}></Expanded>
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
