import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setUploadStatus, setFileType } from "../../slices/uploadFile";
import Expanded from "./expanded";
import UploadText from "../text/transcribePage/uploadFile"
import ActiveUploadIcon from '../../assets/icons/active/activeUpload.svg'
import axios from "axios";
// import { transcribeFileSocket } from "../../api/harfApi";


export default function UploadFile() {

    const dispatch = useDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const isFileUploaded = useSelector((state: RootState) => state.uploadFile.uploadStatus)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [segments, setSegments] = useState(null)

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
            dispatch(setUploadStatus('uploading'));

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
