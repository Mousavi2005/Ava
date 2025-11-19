import { useState, useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getExpandedRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import ExpandedArchive from "./aExpanded";
import Pagination from "../pagination";
import { listRequestsSocket, deleteRequestSocket } from "../../api/harfApi";

// icons
import archiveUpload from "../../assets/icons/archive/rightIcons/archiveUploadIcon.svg";
import archiveMic from "../../assets/icons/archive/rightIcons/archiveRecordIcon.svg";
import archiveLink from "../../assets/icons/archive/rightIcons/archiveLinkIcon.svg";
import DownloadIcon from "../../assets/icons/archive/leftIcons/downloadIcon.svg";
import ActiveDownloadIcon from "../../assets/icons/archive/leftIcons/activeDownload.svg";
import WordIcon from "../../assets/icons/archive/leftIcons/WordIcon.svg";
import CopyIcon from "../../assets/icons/archive/leftIcons/copyIcon.svg";
import ActiveCopyIcon from "../../assets/icons/archive/leftIcons/activeCopy.svg";
import DeleteIcon from "../../assets/icons/archive/leftIcons/deleteIcon.svg";
import ActiveDeleteIcon from "../../assets/icons/archive/leftIcons/activeDelete.svg";

type Segment = { start: string; end: string; text: string; };
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

export default function Table() {
    const [audios, setAudios] = useState<Audio[]>([]);

    const [hoverDownloadId, setHoverDownloadId] = useState<number | null>(null);
    const [hoverCopyId, setHoverCopyId] = useState<number | null>(null);
    const [hoverDeleteId, setHoverDeleteId] = useState<number | null>(null);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    const columns: ColumnDef<Audio>[] = useMemo(() => [
        {
            id: "icon",
            header: "",
            size: 50,
            cell: ({ row }) => {
                const type = row.original.audioType || "";
                if (type.endsWith(".wav")) return <div><img src={archiveLink} alt="" /></div>;
                if (type.endsWith(".mp4") || type.endsWith(".webm") || type.endsWith(".m4a")) return <div><img src={archiveUpload} alt="" /></div>;
                if (type.endsWith(".mp3")) return <div><img src={archiveMic} alt="" /></div>;
            },
        },
        { accessorKey: "filename", header: "نام فایل" },
        { accessorKey: "processed", header: "تاریخ بارگذاری" },
        { accessorKey: "audioType", header: "نوع فایل" },
        { accessorKey: "duration", header: "مدت زمان" },
        {
            id: "actions",
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="flex gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            onMouseEnter={() => setHoverDownloadId(data.id)}
                            onMouseLeave={() => setHoverDownloadId(null)}
                        >
                            <img src={hoverDownloadId === data.id ? ActiveDownloadIcon : DownloadIcon} alt="" className="w-[13.4px] h-[14.15px]" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <img src={WordIcon} alt="" className="w-[13px] h-[16.2px]" />
                        </button>

                        <button
                            onMouseEnter={() => setHoverCopyId(data.id)}
                            onMouseLeave={() => setHoverCopyId(null)}
                            onClick={(e) => {
                                e.stopPropagation()
                                const text = data.segments.map(s => s.text).join("");
                                navigator.clipboard.writeText(text);
                            }}
                        >
                            <img src={hoverCopyId === data.id ? ActiveCopyIcon : CopyIcon} alt="" className="w-[15.8px] h-[17.2px]" />
                        </button>

                        <button
                            onMouseEnter={() => setHoverDeleteId(data.id)}
                            onMouseLeave={() => setHoverDeleteId(null)}
                            onClick={(e) => {
                                e.stopPropagation()
                                deleteRequest(data.id)
                            }}
                            className={`${hoverDeleteId === data.id ? "bg-[rgba(220,53,69,1)]" : ""} w-[25px] h-[25px] rounded-full flex items-center justify-center`}
                        >
                            <img src={hoverDeleteId === data.id ? ActiveDeleteIcon : DeleteIcon} alt="" className="w-[9.5px] h-[14px]" />
                        </button>
                    </div>
                );
            },
        },
    ], [hoverDownloadId, hoverCopyId, hoverDeleteId]);

    const table = useReactTable<Audio>({
        data: audios,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(), // enable expansion
        initialState: {
            pagination: { pageSize: 8, pageIndex: 0 },
        },
    });

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

    // async function listRequests() {
    //     const token = import.meta.env.VITE_API_TOKEN;
    //     try {
    //         const response = await axios.get("https://harf.roshan-ai.ir/api/requests/", {
    //             headers: { Authorization: token },
    //         });
    //         return response.data as Audio[];
    //     } catch (error) { console.log(error); }
    // }

    // let a =''
    // async function deleteRequest(id: number) {
    //     console.log(id);

    //     const token = import.meta.env.VITE_API_TOKEN;
    //     try {
    //         await axios.delete(`https://harf.roshan-ai.ir/api/requests/${id}/`, {
    //             headers: {
    //                 Authorization: token
    //             }
    //         });
    //         setAudios(prev => prev.filter(item => item.id !== id));
    //     } catch (error) {
    //         console.log(error);
    //         // return undefined;
    //     }

    // }


    // useEffect(() => {
    //     async function load() {
    //         const data = await listRequests();
    //         if (data) {
    //             const updated = data.map(d => ({
    //                 ...d,
    //                 audioType: getAudioType(d.filename),
    //                 processed: isoToJalali(d.processed),
    //                 segments: d.segments?.map(s => ({
    //                     ...s,
    //                     start: formatTime(s.start),
    //                     end: formatTime(s.end)
    //                 }))
    //             }));
    //             setAudios(updated);
    //         }
    //     }
    //     load();

    // }, []);

    // console.log(audios);



    async function listRequests() {
        const res = await listRequestsSocket();

        if (!res.ok) {
            console.log("socket error:", res.error);
            return undefined;
        }

        return res.data as Audio[];
    }

    async function deleteRequest(id: number) {
        const res = await deleteRequestSocket(id);

        if (!res.ok) {
            console.log("socket error:", res.error);
            return;
        }

        // same behavior you had before
        setAudios(prev => prev.filter(item => item.id !== id));
    }

    useEffect(() => {
        async function load() {
            const data = await listRequests();

            if (data) {
                const updated = data.map(d => ({
                    ...d,
                    audioType: getAudioType(d.filename),
                    processed: isoToJalali(d.processed),
                    segments: d.segments?.map(s => ({
                        ...s,
                        start: formatTime(s.start),
                        end: formatTime(s.end)
                    }))
                }));

                setAudios(updated);
            }
        }

        load();

    }, []);



    function extractBorderColor(fileType: string | null) {
        if (fileType === '.wav') {
            return ('rgba(255,22,84,1)')
        }
        else if (fileType === '.mp4' || fileType === '.webm' || fileType === '.m4a') {
            return ('rgba(17,138,211,1)')
        }
        return ('rgba(0,186,159,1)')

    }

    return (
        <div className="w-[1100px] h-[450px]">
            <div className="max-h-[450px] w-[1100px] overflow-y-auto">
                <table className="w-full table-fixed border-collapse max-h-[450px] overflow-y-auto flex flex-col items-center" dir="rtl">
                    {/* <colgroup>
                    <col className="w-[40px]" />
                    <col className="w-[40%]" />
                    <col className="w-[76px]" />
                    <col className="w-[50px]" />
                    <col className="w-[73px]" />
                    <col className="w-[107px]" />
                </colgroup> */}

                    <thead>
                        {table.getHeaderGroups().map(hg => (
                            <tr key={hg.id}>
                                <th colSpan={hg.headers.length} className="p-0">
                                    <div className="w-[900px] h-[40px] grid grid-cols-[40px_55%_90px_70px_80px_110px] text-right font-normal text-[14px]">
                                        {hg.headers.map(header => (
                                            <div key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        ))}
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getPaginationRowModel().rows.map(row => (
                            <React.Fragment key={row.id}>
                                <tr
                                    onClick={() => {
                                        setExpandedRowId(prev => (prev === row.id ? null : row.id));
                                    }}
                                    className="cursor-pointer"
                                >
                                    <td colSpan={row.getVisibleCells().length} className="p-0">
                                        <div
                                            className={
                                                row.id === expandedRowId
                                                    ? `w-[900px] h-[50px] border-[2px] border-[${extractBorderColor(row.original.audioType)}] border-b-0 rounded-t-[10px] mr-[1px] ml-[-1px]`
                                                    : "w-[900px] h-[50px]"
                                            }
                                        >
                                            <div className="grid grid-cols-[40px_55%_90px_70px_80px_110px]">
                                                {row.getVisibleCells().map(cell => (
                                                    <div
                                                        key={cell.id}
                                                        className={`font-light flex items-center ${cell.column.id === "filename"
                                                            ? "text-[16px] text-right"
                                                            : "text-[12px]"
                                                            }`}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                </tr>


                                {expandedRowId === row.id && (
                                    <tr>
                                        <td colSpan={row.getVisibleCells().length} className=" text-sm pb-2">
                                            <ExpandedArchive segments={row.original.segments} fileType={row.original.audioType} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>


            <Pagination table={table}></Pagination>

        </div>
    );
}
