import axios from "axios"
import { useState, useEffect, useMemo } from "react"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"

type Segment = {
    start: string,
    end: string,
    text: string,
}

type Icon = 'link' | 'upload' | 'record' | null

type Audio = {
    id: number,
    url: string,
    duration: string
    filename: string,
    processed: string,
    segments: Segment[],
    icon: Icon
}

const columns = [
    { accessorKey: 'id', header: 'ID', cell: (info: any) => info.getValue() },
    { accessorKey: 'filename', header: 'نام فایل', cell: (info: any) => info.getValue() },
    { accessorKey: 'duration', header: 'مدت زمان', cell: (info: any) => info.getValue() },
    { accessorKey: 'processed', header: 'تاریخ بارگذاری', cell: (info: any) => info.getValue() },
    { accessorKey: 'icon', header: 'آیکون', cell: (info: any) => info.getValue() },
]


export default function ArchiveContent() {
    const [audios, setAudios] = useState<Audio[]>([])
    const data = useMemo(() => audios.slice(0, 4), [audios])
    const table = useReactTable({ data: data, columns, getCoreRowModel: getCoreRowModel() })

    function getIcon(url: string): Icon {
        if (url.endsWith('mp4') || url.endsWith('mp3')) return 'upload'
        if (url.endsWith('.wav')) return 'record'
        if (url.endsWith('.m4a') || url.endsWith('.webm')) return 'link'
        return null
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
                const updated = data.map((d) => ({ ...d, icon: getIcon(d.url) }))
                // console.log(updated);

                setAudios(updated)
            }
        }

        load()
    }, [])

    console.log(audios);


    return (
        <table className="w-[900px] h-[500px] bg-red-400">
            <thead>
                {table.getHeaderGroups().map((headergroup) => (
                    <tr key={headergroup.id}>
                        {headergroup.headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cel) => (
                            <td key={cel.id}>
                                {flexRender(cel.column.columnDef.cell, cel.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
