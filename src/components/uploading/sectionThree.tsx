import ActiveChainIcon from '../../assets/icons/active/activeChain.svg'
import LinkText from '../texts/upload/link'
import { useState } from 'react'

export default function SectionThree() {
    const [url, setUrl] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // prevent page reload
        console.log('Submitted URL:', url);
        // handle your submission logic here
    };

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

            {/* <div className=" w-[328px] h-[46px] flex items-center pl-4 border-[0.5px] border-[rgba(255,22,84,1)] rounded-[50px]">

                <button
                    className='w-[30px] h-[30px] bg-[rgba(255,22,84,1)] rounded-full  flex items-center justify-center'>
                    <img src={ActiveChainIcon} alt="" className="w-[15.8px] h-[12.9px]" />
                </button>
                <input
                    placeholder='example.com/sample.mp3'
                    className='w-[280px] rounded-[50px] px-2 outline-none'>
                </input>

            </div> */}

            <LinkText></LinkText>
        </div>
    )
}
