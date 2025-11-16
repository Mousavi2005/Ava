import ExpandedHeader from "./exHeader";
import { useSelector } from "react-redux";
import type { RootState } from '../store/store'

type Segment = { start: string; end: string; text: string };

type ExpandedProps = {
    segments: Segment[];
};

export default function Expanded({ segments }: ExpandedProps) {

    const activePage = useSelector((state: RootState) => (state.page.activePage))

    return (
        <div className={`${activePage === 'archive' ? "w-[1100px] max-h-[370px]" : "w-[653px] h-[429px]"}`}>
            <ExpandedHeader />

            <div dir="rtl" className={`
                ${activePage === 'archive' ? "w-[940px] max-h-[230px]" : "w-[653px] h-[365px] rounded-b-[25px]"}
                 pr-6 pl-2 ml-1 overflow-y-auto
                `}>
                {segments.map((s, idx) => (
                    <ul
                        dir="ltr"
                        key={idx}
                        className={`
                            ${activePage === 'archive' ? "w-[900px] h-[42px]" : "h-[62px]"}
                            ${idx % 2 === 0 ? "bg-[rgba(242,242,242,1)]" : ""}
                             flex justify-end items-center gap-4 p-2 mb-1 rounded-[15px]
                             `}
                    >
                        <span className="w-full">{s.text}</span>
                        <span className="w-20">{s.start}</span>
                        <span className="w-20">{s.end}</span>
                    </ul>
                ))}
            </div>
        </div>
    );
}
