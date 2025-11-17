import ExpandedHeader from "./exHeader";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../store/store'
import axios from "axios";
import { useEffect } from "react";
import { setUploadedFile, setSimpleText } from "../slices/uploadFile";

type Segment = { start: string; end: string; text: string };
type AudioType = ".mp3" | ".mp4" | ".wav" | ".webm" | ".m4a" | null;
type Audio = {
    icon?: string;
    id: number;
    url: string;
    duration: string;
    filename: string;
    processed: string;
    segments: Segment[];
    audioType: AudioType;
};

export default function Expanded() {

    const dispatch = useDispatch()
    const uploadedFile = useSelector((state: RootState) => state.uploadFile.uploadedFile)
    const simpleText = useSelector((state: RootState) => state.uploadFile.simpleText)
    const activePage = useSelector((state: RootState) => (state.page.activePage))
    const uploadStatus = useSelector((state: RootState) => state.uploadFile.uploadStatus)
    const expandActiveSection = useSelector((state: RootState) => state.expand.activeSection)

    function extractSimpleText() {
        if (uploadedFile) {
            let text = ''
            uploadedFile?.segments.forEach((s) => {
                text += s.text
            })
            dispatch(setSimpleText(text))
        }
    }

    useEffect(() => {
        extractSimpleText()
    }, [uploadedFile])

    function getAudioType(url: string): AudioType {
        if (url.endsWith(".mp4")) return ".mp4";
        if (url.endsWith(".mp3")) return ".mp3";
        if (url.endsWith(".wav")) return ".wav";
        if (url.endsWith(".m4a")) return ".m4a";
        if (url.endsWith(".webm")) return ".webm";
        return null;
    }

    function isoToJalali(isoString: string) {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(date).replaceAll("/", "-");
    }

    function formatTime(t: string) {
        const parts = t.split(":");
        const minutes = parts[1];
        const seconds = parts[2]
        return `${minutes}:${seconds}`;
    }

    async function getRequestById(id: number) {
        const token = import.meta.env.VITE_API_TOKEN;

        try {
            const response = await axios.get(
                `https://harf.roshan-ai.ir/api/requests/${id}/`,
                {
                    headers: { Authorization: token },
                }
            );

            return response.data as Audio;

        } catch (error) {
            console.log(error);
            return undefined
        }
    }

    useEffect(() => {
        async function load() {
            const id = 71291
            const data = await getRequestById(id);

            if (data) {
                const updated = {
                    ...data,
                    audioType: getAudioType(data.filename),
                    processed: isoToJalali(data.processed),
                    segments: data.segments?.map(s => ({
                        ...s,
                        start: formatTime(s.start),
                        end: formatTime(s.end)
                    }))
                };
                console.log('dispatched');

                dispatch(setUploadedFile(updated))
            }
        }
        load();

    }, [uploadStatus]);

    console.log(`uploaded file : ${uploadedFile}`);



    return (
        <div className={`${activePage === 'archive' ? "w-[1100px] max-h-[370px] border-[2px] border-t-0 mt-[-1px] border-red-400 pb-2 rounded-b-[10px]" : "w-[653px] h-[429px]"}`}>
            <ExpandedHeader />

            <div dir="rtl" className={`
                ${activePage === 'archive' ? "w-[940px] max-h-[230px]" : "w-[649px] h-[350px] rounded-b-[25px]"}
                 pr-4 pl-2 ml-1 overflow-y-auto
                `}>

                {/* expand for file upload */}
                {expandActiveSection === 'timed' ?
                    uploadedFile?.segments.map((s, idx) => (
                        <ul
                            dir="ltr"
                            key={idx}
                            className={`
                            ${activePage === 'archive' ? "w-[900px] h-[42px]" : "h-[62px]"}
                            ${idx % 2 === 0 ? "bg-[rgba(242,242,242,1)]" : ""}
                             flex justify-end items-center gap-4 p-2 mb-1 rounded-[15px]
                             `}
                        >
                            <span className="w-full text-[16px] font-light">{s.text}</span>
                            <span className="w-20 text-[16px] font-light">{s.start}</span>
                            <span className="w-20 text-[16px] font-light">{s.end}</span>
                        </ul>
                    ))
                    :
                    <p className="text-[16px] font-light leading-8 p-2">
                        {simpleText}
                    </p>
                }



            </div>
        </div>
    );
}
