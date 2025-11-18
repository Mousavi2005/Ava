import axios from 'axios';
import ActiveChainIcon from '../../assets/icons/active/activeChain.svg'
import LinkText from '../text/transcribePage/link'
import { useEffect, useState } from 'react'

export default function PasteLink() {

    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [transcription, setTranscription] = useState(null);
    const [succes, setsuccess] = useState(false)
    // const [error, setError] = useState(null);

    async function transcribeUrl(url: string) {
        const token = import.meta.env.VITE_API_TOKEN;
        try {
            // Make sure the URL is properly encoded and clean
            const cleanUrl = url.trim();

            const response = await axios.post(
                "https://harf.roshan-ai.ir/api/transcribe_files/", // Note: Just the endpoint, no URL appended
                {
                    media_urls: [cleanUrl] // URL goes in the request body
                },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("SUCCESS:", response.status, response.data);
            return response.data;

        } catch (err: any) {
            console.error("ERROR STATUS:", err.response?.status);
            console.error("ERROR DATA:", err.response?.data);
            throw err;
        }
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // setError(null);

        try {
            const response = await transcribeUrl(url);
            setTranscription(response[0]);
            setsuccess(true)
            console.log('Transcription Result:', response);
        } catch (err) {
            // setError(err.message);
            console.error('Transcription failed:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (succes) {
            alert('لینک با موفقیت دریافت شد')
        }
    }, [succes])
    console.log(transcription);

    return (
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
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-[280px] rounded-[50px] px-2 outline-none"
                />
            </form>


            <LinkText></LinkText>
        </div>
    )
}
