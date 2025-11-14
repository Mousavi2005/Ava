import axios from "axios"
import { useState, useEffect, useMemo } from "react"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import type { ColumnDef } from "@tanstack/react-table"
import CopyIcon from "../../assets/icons/archive/copyIcon.svg"
import DeleteIcon from "../../assets/icons/archive/deleteIcon.svg"
import DownloadIcon from "../../assets/icons/archive/downloadIcon.svg"
import ActiveDownloadIcon from "../../assets/icons/archive/activeDownload.svg"
import ActiveDeleteIcon from "../../assets/icons/archive/activeDelete.svg"
import ActiveCopyIcon from "../../assets/icons/archive/activeCopy.svg"
import WordIcon from "../../assets/icons/archive/WordIcon.svg"
import ActiveChainIcon from "../../assets/icons/active/activeChain.svg"

type Segment = {
    start: string,
    end: string,
    text: string,
}

type AudioType = '.mp3' | '.mp4' | '.wav' | '.webm' | '.m4a' | null

type Audio = {
    icon: string,
    id: number,
    url: string,
    duration: string
    filename: string,
    processed: string,
    segments: Segment[],
    audioType: AudioType
}



export default function ArchiveContent() {
    const [audios, setAudios] = useState<Audio[]>([])
    const data = useMemo(() => audios.slice(0, 6), [audios])

    const [hoverDownload, setHoverDownload] = useState(false)
    const [hoverCopy, setHoverCopy] = useState(false)
    const [hoverDelete, setHoverDelete] = useState(false)

    const columns: ColumnDef<Audio>[] = useMemo(() => [
        {
            accessorKey: 'filename', header: "", cell: (info: any) => {
                const iconName = info.getValue()
                console.log(isUrl(iconName));

                if (isUrl(iconName)) return (
                    <div className="w-[31.2px] h-[31.2px] bg-[rgba(255,22,84,1)] flex items-center justify-center">
                        <img src={ActiveChainIcon} alt="" />
                    </div>
                )
            }
        },
        { accessorKey: 'filename', header: 'نام فایل', cell: (info: any) => info.getValue() },
        { accessorKey: 'processed', header: 'تاریخ بارگذاری', cell: (info: any) => info.getValue() },
        { accessorKey: 'audioType', header: 'نوع فایل', cell: (info: any) => info.getValue() },
        { accessorKey: 'duration', header: 'مدت زمان', cell: (info: any) => info.getValue() },
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

                        <button
                            onClick={() => console.log("Play:", data)}
                        >
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
                            onClick={() => console.log("Play:", data)}
                            className={`${hoverDelete ? "bg-[rgba(220,53,69,1)]" : ""} w-[25px] h-[25px] rounded-full flex items-center justify-center`}
                        >
                            <img src={hoverDelete ? ActiveDeleteIcon : DeleteIcon} alt="" className="w-[9.5px] h-[14px]" />
                        </button>

                    </div>
                );
            },
        },
    ], [hoverDownload, hoverCopy, hoverDelete])

    const table = useReactTable<Audio>({ data: data, columns, getCoreRowModel: getCoreRowModel() })

    const isUrl = (str: string) => {
        try { new URL(str); return true } catch { return false }
    };


    function getAudioType(url: string): AudioType {
        if (url.endsWith('.mp4')) return '.mp4'
        if (url.endsWith('.mp3')) return '.mp3'
        if (url.endsWith('.wav')) return '.wav'
        if (url.endsWith('.m4a')) return '.m4a'
        if (url.endsWith('.webm')) return '.webm'
        return null
    }

    function isoToJalali(isoString: string) {
        const date = new Date(isoString);
        const transformedDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);

        return transformedDate.replaceAll('/', '-')
    }

    async function listRequests() {
        console.log('Fetched');

        try {
            const response = await axios({
                url: "https://harf.roshan-ai.ir/api/requests/",
                method: "get",
                headers: {
                    Authorization: "Token TOKEN_REMOVED"
                }
            })

            return response.data as Audio[]

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function load() {
            const data = await listRequests()
            if (data) {
                const updated = data.map((d) => (
                    { ...d, audioType: getAudioType(d.filename), processed: isoToJalali(d.processed) }
                ))
                // console.log(updated);

                setAudios(updated)
            }
        }

        load()
    }, [])

    console.log(audios);


    return (
        <table className="w-[900px] h-[500px]" dir="rtl">
            <thead className="w-full">
                {table.getHeaderGroups().map((headergroup) => (
                    <tr key={headergroup.id} className="text-right">
                        {headergroup.headers.map((header) => (
                            <th key={header.id} className="text-[14px] font-normal">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody className="w-full">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cel) => (
                            <td key={cel.id}
                                className={`${cel.column.id === 'filename' ? "text-[16px] w-[50%]" : "text-[12px]"} font-light`}>
                                {flexRender(cel.column.columnDef.cell, cel.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
