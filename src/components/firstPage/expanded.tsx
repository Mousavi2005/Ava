// import ExpandedHeader from "./exHeader";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../../store/store'
// import axios from "axios";
import { useEffect, useState } from "react";
import { setSimpleText } from "../../slices/uploadFile";
import { setFileType, setUploadedFile, setUploadStatus } from "../../slices/uploadFile"
import { setLinkStatus, setUrl } from "../../slices/uploadLink";

import activeTextIcon from "../../assets/icons/activeTextIcon.svg"
import textIcon from "../../assets/icons/textIcon.svg"
import timeIcon from "../../assets/icons/timeIcon.svg"
import activeTimeIcon from "../../assets/icons/activeTimeIcon.svg"
import refreshIcon from '../../assets/icons/refreshIcon.svg'
import copyIcon from '../../assets/icons/archive/copyIcon.svg'
import activeCopyIcon from '../../assets/icons/archive/activeCopy.svg'
import downloadIcon from '../../assets/icons/archive/downloadIcon.svg'
import activeDownloadIcon from '../../assets/icons/archive/activeDownload.svg'
// import { setLinkStatus } from "../../slices/uploadLink";

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

export default function Expanded({ segments }: any) {

    const dispatch = useDispatch()
    const uploadedFile = useSelector((state: RootState) => state.uploadFile.uploadedFile)
    const simpleText = useSelector((state: RootState) => state.uploadFile.simpleText)
    const activePage = useSelector((state: RootState) => (state.page.activePage))
    const activeToggleSection = useSelector((state: RootState) => state.toggle.active)
    // const uploadStatus = useSelector((state: RootState) => state.uploadFile.uploadStatus)
    // const expandActiveSection = useSelector((state: RootState) => state.expand.activeSection)
    const [expandActiveSection, setExpandedActiveSection] = useState('simple')
    const [hoverDownload, setHoverDownload] = useState(false)
    const [hoverCopy, setHoverCopy] = useState(false)

    function extractSimpleText() {
        if (segments) {
            let text = ''
            segments.forEach((s: any) => {
                text += s.text
            })
            dispatch(setSimpleText(text))
        }
    }

    useEffect(() => {
        extractSimpleText()
    }, [uploadedFile])

    // function getAudioType(url: string): AudioType {
    //     if (url.endsWith(".mp4")) return ".mp4";
    //     if (url.endsWith(".mp3")) return ".mp3";
    //     if (url.endsWith(".wav")) return ".wav";
    //     if (url.endsWith(".m4a")) return ".m4a";
    //     if (url.endsWith(".webm")) return ".webm";
    //     return null;
    // }

    // function isoToJalali(isoString: string) {
    //     const date = new Date(isoString);
    //     return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    //         year: "numeric",
    //         month: "2-digit",
    //         day: "2-digit",
    //     }).format(date).replaceAll("/", "-");
    // }

    // function formatTime(t: string) {
    //     const parts = t.split(":");
    //     const minutes = parts[1];
    //     const seconds = parts[2]
    //     return `${minutes}:${seconds}`;
    // }

    // async function getRequestById(id: number) {
    //     const token = import.meta.env.VITE_API_TOKEN;

    //     try {
    //         const response = await axios.get(
    //             `https://harf.roshan-ai.ir/api/requests/${id}/`,
    //             {
    //                 headers: { Authorization: token },
    //             }
    //         );

    //         return response.data as Audio;

    //     } catch (error) {
    //         console.log(error);
    //         return undefined
    //     }
    // }

    // useEffect(() => {
    //     async function load() {
    //         const id = 71291
    //         const data = await getRequestById(id);

    //         if (data) {
    //             const updated = {
    //                 ...data,
    //                 audioType: getAudioType(data.filename),
    //                 processed: isoToJalali(data.processed),
    //                 segments: data.segments?.map(s => ({
    //                     ...s,
    //                     start: formatTime(s.start),
    //                     end: formatTime(s.end)
    //                 }))
    //             };
    //             console.log('dispatched');

    //             dispatch(setUploadedFile(updated))
    //         }
    //     }
    //     load();

    // }, [uploadStatus]);

    // console.log(`segmets : ${segments}`);
    // console.log(`simple text : ${simpleText}`);


    function restart() {
        if (activeToggleSection === 'upload') {
            setExpandedActiveSection('simple')
            dispatch(setFileType(null))
            dispatch(setUploadedFile(null))
            dispatch(setUploadStatus(null))
        }
        if (activeToggleSection === 'link') {
            setExpandedActiveSection('simple')
            dispatch(setLinkStatus(null))
            dispatch(setUrl(''))
        }

    }

    return (
        <div className="w-full h-ful mt-[-1px] pb-2 px-2 rounded-b-[10px]">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div className="flex items-center h-full gap-6">
                    <button
                        onClick={restart}
                        className="w-[112px] h-[34px] rounded-[20px] bg-[rgba(17,138,211,1)] flex items-center justify-around">
                        <span className="text-[14px] font-normal text-[rgba(255,255,255,1)]">شروع دوباره</span>
                        <img src={refreshIcon} alt="" className="w-3 h-3" />
                    </button>

                    <button
                        onClick={() => {
                            console.log('copied');
                            navigator.clipboard.writeText(simpleText)
                        }}
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

                <div className="flex h-12 items-center gap-8" dir="rtl">
                    <button className="w-[81px] h-6 flex items-center gap-2"
                        onClick={() => setExpandedActiveSection('simple')}
                    >
                        <img src={expandActiveSection === 'simple' ? activeTextIcon : textIcon} alt="" className="w-[17px] h-[17px]" />
                        <span className={`${expandActiveSection === 'simple' ? "font-normal" : "font-light"} text-[14px]`}>متن ساده</span>

                    </button>

                    <button className="w-[140px] h-6 flex items-center gap-2"
                        onClick={() => setExpandedActiveSection('timed')}

                    >
                        <img src={expandActiveSection === 'timed' ? activeTimeIcon : timeIcon} alt="" className="w-[18px] h-[17px]" />
                        <span className={`${expandActiveSection === 'timed' ? "font-normal" : "font-light"} text-[14px]`}>متن زمان بندی شده</span>

                    </button>

                </div>
            </div>



            <div dir="rtl" className="w-[649px] h-[350px] rounded-b-[25px] pr-4 pl-2 ml-1 overflow-y-auto">
                {expandActiveSection === 'timed' ?
                    segments.map((s: any, idx: any) => (
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
