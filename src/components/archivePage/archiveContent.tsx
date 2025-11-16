import { useState, useEffect, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getExpandedRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import React from "react";
import Expanded from "../expanded";

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
                            onClick={() => console.log("Delete:", data.id)}
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

    async function listRequests() {
        const token = import.meta.env.VITE_API_TOKEN;
        try {
            const response = await axios.get("https://harf.roshan-ai.ir/api/requests/", {
                headers: { Authorization: token },
            });
            return response.data as Audio[];
        } catch (error) { console.log(error); }
    }

    useEffect(() => {
        async function load() {
            const data = await listRequests();
            if (data) {
                const updated = data.map(d => ({
                    ...d,
                    audioType: getAudioType(d.filename),
                    processed: isoToJalali(d.processed),
                }));
                setAudios(updated);
            }
        }
        load();
    }, []);

    return (
        <div className="w-[1100px]">
            <table className="w-full table-fixed" dir="rtl">
                <colgroup>
                    <col className="w-[40px]" />
                    <col className="w-[40%]" />
                    <col className="w-[76px]" />
                    <col className="w-[50px]" />
                    <col className="w-[73px]" />
                    <col className="w-[107px]" />
                </colgroup>

                <thead>
                    {table.getHeaderGroups().map(hg => (
                        <tr key={hg.id} className="text-right">
                            {hg.headers.map(header => (
                                <th key={header.id} className="text-[14px] font-normal px-2">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getPaginationRowModel().rows.map(row => (
                        <React.Fragment key={row.id}>
                            <tr
                                onClick={() => row.toggleExpanded()}
                                className="cursor-pointer hover:bg-gray-50"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        dir={(cell.column.id === "audioType" || cell.column.id === "filename") ? "ltr" : "rtl"}
                                        className={`px-2 font-light ${cell.column.id === "filename" ? "text-[16px] text-right" : "text-[12px]"}`}
                                        style={{
                                            width: cell.column.id === "icon" ? "32px" : undefined,
                                            minWidth: cell.column.id === "icon" ? "32px" : undefined,
                                            maxWidth: cell.column.id === "icon" ? "32px" : undefined,
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>

                            {row.getIsExpanded() && (
                                <tr>
                                    <td colSpan={row.getVisibleCells().length} className="bg-gray-50 p-2 text-sm">
                                        <Expanded segments={row.original.segments} ></Expanded>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <div className="w-full flex items-center justify-center gap-4 mt-4 text-sm">

                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    بعدی
                </button>

                <span>
                    صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
                </span>


                <button
                    className="px-3 py-1 border rounded"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    قبلی
                </button>

            </div>
        </div>
    );
}
