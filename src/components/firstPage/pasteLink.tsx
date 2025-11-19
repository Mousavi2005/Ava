import axios from 'axios';
import ActiveChainIcon from '../../assets/icons/active/activeChain.svg'
import LinkText from '../text/transcribePage/link'
import Expanded from './expanded';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLinkStatus, setUrl } from '../../slices/uploadLink';
import type { RootState } from '../../store/store';
import { transcribeRequest } from '../../api/harfApi';

export default function PasteLink() {
    const dispatch = useDispatch()
    // const [url, setUrl] = useState('');
    const url = useSelector((state: RootState) => state.uploadLink.url)
    const linkStatus = useSelector((state: RootState) => state.uploadLink.uploadStatus)
    const [segments, setSegments] = useState(null)


    async function transcribeUrl(url: string) {
        const res = await transcribeRequest(url)
        if (!res.ok) {
            console.log("socket error:", res.error);
            return undefined;
        }

        return res.data
    }

    // async function transcribeUrl(url: string) {
    //     const token = import.meta.env.VITE_API_TOKEN;

    //     try {
    //         const cleanUrl = url.trim();

    //         const response = await axios.post(
    //             "https://harf.roshan-ai.ir/api/transcribe_files/",
    //             {
    //                 media_urls: [cleanUrl]
    //             },
    //             {
    //                 headers: {
    //                     Authorization: token,
    //                     "Content-Type": "application/json"
    //                 }
    //             }
    //         );

    //         console.log("SUCCESS:", response.status, response.data);
    //         return response.data;

    //     } catch (err: any) {
    //         console.error("ERROR STATUS:", err.response?.status);
    //         console.error("ERROR DATA:", err.response?.data);
    //         throw err;
    //     }
    // }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await transcribeUrl(url);
            setSegments(response[0].segments)
            dispatch(setLinkStatus('uploaded'))

            console.log('Transcription Result:', response);

        } catch (err) {
            console.error('Transcription failed:', err);
        };
    }


    return (
        <>
            {linkStatus === 'uploaded' ?
                <Expanded segments={segments}></Expanded>
                :
                <div className='flex flex-col gap-2 items-center justify-center'>

                    <form onSubmit={handleSubmit} className="w-[328px] h-[46px] flex items-center pl-4 border-[0.5px] border-[rgba(255,22,84,1)] rounded-[50px]">
                        <button
                            type="submit"
                            className="w-[30px] h-[30px] bg-[rgba(255,22,84,1)] rounded-full flex items-center justify-center mr-2"
                        >
                            <img src={ActiveChainIcon} alt="Submit" className="w-[15.8px] h-[12.9px]" />
                        </button>
                        <input
                            type="text"
                            placeholder="example.com/sample.mp3"
                            value={url}
                            onChange={(e) => dispatch(setUrl(e.target.value))}
                            className="w-[280px] rounded-[50px] px-2 outline-none"
                        />
                    </form>


                    <LinkText></LinkText>
                </div>
            }
        </>
    )
}
