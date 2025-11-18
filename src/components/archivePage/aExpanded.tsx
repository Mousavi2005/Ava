import ArchiveExpandedHeader from "./aExpandHeader";
import { useState } from "react";

type Segment = { start: string; end: string; text: string };

type ExpandedProps = {
    segments: Segment[];
    fileType: string | null
};

export default function ExpandedArchive({ segments, fileType }: ExpandedProps) {

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
        <div className={`w-[900px] max-h-[290px] border-[2px] border-t-0 mt-[-1px] pb-2 rounded-b-[10px] border-[${bordercolor}] `}>
            <ArchiveExpandedHeader expandActiveSection={expandActiveSection} setExpandActiveSection={setExpandActiveSection} />

            <div className="w-[890px] h-[230px] overflow-y-auto px-4">
                {expandActiveSection === 'timed' ?
                    segments?.map((s, idx) => (
                        <ul
                            dir="ltr"
                            key={idx}
                            className={` w-full min-h-[42px] ${idx % 2 === 0 ? "bg-[rgba(242,242,242,1)]" : ""}
                             flex justify-end items-center gap-8 p-2 mb-1 rounded-[15px]
                             `}
                        >
                            <span className="w-full text-[16px] font-light text-right">{s.text}</span>
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
