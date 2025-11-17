import ArchiveExpandedHeader from "./archiveExpandHeader";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";

type Segment = { start: string; end: string; text: string };

type ExpandedProps = {
    segments: Segment[];
    fileType: string
};

export default function ExpandedArchive({ segments, fileType }: ExpandedProps) {

    const activePage = useSelector((state: RootState) => (state.page.activePage))
    const [expandActiveSection, setExpandActiveSection] = useState('simple')
    const simpleText = segments.map(s => s.text).join("");
    let bordercolor = ''

    if (fileType === '.wav') {
        bordercolor = 'rgba(255,22,84,1)'
    }
    else if (fileType === '.mp4' || fileType === '.webm' || fileType === '.m4a') {
        bordercolor = 'rgba(17,138,211,1)'
    }
    else {
        bordercolor = 'rgba(0,186,159,1)'
    }

    return (
        <div className={`${activePage === 'archive' ? "w-[1100px] max-h-[370px] border-[2px] border-t-0 mt-[-1px] pb-2 rounded-b-[10px]" : "w-[653px] h-[429px]"} border-[${bordercolor}] `}>
            <ArchiveExpandedHeader expandActiveSection={expandActiveSection} setExpandActiveSection={setExpandActiveSection} />

            <div className="w-[940px] h-[230px] overflow-y-auto">
                {expandActiveSection === 'timed' ?
                    segments?.map((s, idx) => (
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
