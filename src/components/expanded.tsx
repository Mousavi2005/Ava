import ExpandedHeader from "./exHeader";


type Segment = { start: string; end: string; text: string };

type ExpandedProps = {
    segments: Segment[];
};

export default function Expanded({ segments }: ExpandedProps) {
    return (
        <div className="w-[1100px] h-[370px]">
            <ExpandedHeader />

            <div className="w-[940px] h-[230px] overflow-y-auto">
                {segments.map((s, idx) => (
                    <ul
                        key={idx}
                        className="w-[900px] h-[42px] bg-gray-500 flex justify-between items-center p-2 mb-1"
                    >
                        <span>{s.text}</span>
                        <span>{s.start}</span>
                        <span>{s.end}</span>
                    </ul>
                ))}
            </div>
        </div>
    );
}
