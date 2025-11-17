import { useState, useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getExpandedRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import type { AxiosResponse } from 'axios'
import React from "react";
import ExpandedArchive from "../archiveExpanded";
import Pagination from "../pagination";


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

export default function ArchiveContent() {
    const [audios, setAudios] = useState<Audio[]>([]);
    const [hoverDownload, setHoverDownload] = useState(false);
    const [hoverCopy, setHoverCopy] = useState(false);
    const [hoverDelete, setHoverDelete] = useState(false);
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
                            onMouseEnter={() => setHoverDownload(true)}
                            onMouseLeave={() => setHoverDownload(false)}
                            onClick={() => console.log("Play:", data)}
                        >
                            <img src={hoverDownload ? ActiveDownloadIcon : DownloadIcon} alt="" className="w-[13.4px] h-[14.15px]" />
                        </button>

                        <button onClick={() => console.log("Play:", data)}>
                            <img src={WordIcon} alt="" className="w-[13px] h-[16.2px]" />
                        </button>

                        <button
                            onMouseEnter={() => setHoverCopy(true)}
                            onMouseLeave={() => setHoverCopy(false)}
                            onClick={() => console.log("Play:", data)}
                        >
                            <img src={hoverCopy ? ActiveCopyIcon : CopyIcon} alt="" className="w-[15.8px] h-[17.2px]" />
                        </button>

                        <button
                            onMouseEnter={() => setHoverDelete(true)}
                            onMouseLeave={() => setHoverDelete(false)}
                            onClick={() => deleteRequest(data.id)}
                            className={`${hoverDelete ? "bg-[rgba(220,53,69,1)]" : ""} w-[25px] h-[25px] rounded-full flex items-center justify-center`}
                        >
                            <img src={hoverDelete ? ActiveDeleteIcon : DeleteIcon} alt="" className="w-[9.5px] h-[14px]" />
                        </button>
                    </div>
                );
            },
        },
    ], [hoverDownload, hoverCopy, hoverDelete]);

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

    async function listRequests() {
        const token = import.meta.env.VITE_API_TOKEN;
        try {
            const response = await axios.get("https://harf.roshan-ai.ir/api/requests/", {
                headers: { Authorization: token },
            });
            return response.data as Audio[];
        } catch (error) { console.log(error); }
    }

    async function deleteRequest(id: number): Promise<AxiosResponse<any> | undefined> {
        const token = import.meta.env.VITE_API_TOKEN;
        try {
            const response = await axios.delete(`https://harf.roshan-ai.ir/api/requests/${id}/`, {
                headers: {
                    Authorization: token
                }
            });
            return response;
        } catch (error) {
            console.log(error);
            return undefined;
        }

        // after deleting a request, should refetch requests
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


    return (
        <div className="w-[1100px]">
            <table className="w-full table-fixed border-collapse" dir="rtl">
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
                                <div className="grid grid-cols-[40px_55%_90px_70px_80px_110px] text-right font-normal text-[14px]">
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
                                className="cursor-pointer hover:bg-gray-50 p-0"
                            >
                                <td colSpan={row.getVisibleCells().length} className="p-0">
                                    <div
                                        className={
                                            row.id === expandedRowId
                                                ? "border-[2px] border-red-300 border-b-0 rounded-t-[10px] mr-[1px] ml-[-1px]"
                                                : ""
                                        }
                                    >
                                        <div className="grid grid-cols-[40px_55%_90px_70px_80px_110px]">
                                            {row.getVisibleCells().map(cell => (
                                                <div
                                                    key={cell.id}
                                                    className={`px-2 py-2 font-light ${cell.column.id === "filename"
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
                                    <td colSpan={row.getVisibleCells().length} className="bg-gray-50 text-sm pb-2">
                                        <ExpandedArchive segments={row.original.segments} fileType={row.original.audioType} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>

            </table>

            <Pagination table={table}></Pagination>

        </div>
    );
}
