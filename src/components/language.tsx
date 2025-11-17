import { useState } from "react"

import dropIcon from '../assets/icons/dropIcon.svg'
import dropIcon2 from '../assets/icons/dropIcon2.svg'

type Language = 'fa' | 'en'

export default function Language() {

    const [active, setActive] = useState(false)
    const [language, setLanguage] = useState<Language>('fa')

    console.log(language);

    return (
        <>
            {active ? (
                <div className="w-[180px] flex flex-row-reverse items-start justify-between">
                    <span className="text-[14px] font-light pt-2 text-[rgba(98,98,98,1)]" >: زبان گفتار</span>
                    <div className=" w-[105px] h-[81px] flex flex-col items-center border-[rgba(0,186,159,1)] rounded-[20px] border-[1.5px] p-2">

                        <button
                            onClick={() => { setActive(false), setLanguage('fa') }}
                            className="flex items-center justify-around w-full h-[37px] rounded-[20px] px-2">
                            <img src={dropIcon2} alt="" className="w-[9.8px] h-[6.5px]" />
                            <span className="text-[rgba(0,186,159,1)]">فارسی</span>
                        </button>

                        <hr className="w-[75%] border border-teal-400 mt-2" />

                        <button
                            onClick={() => { setActive(false), setLanguage('en') }}
                            className="flex items-center justify-around w-full h-[37px] rounded-[20px] px-2">
                            <div className="w-[18px] h-[18px]"></div>
                            <span className="text-[rgba(0,186,159,1)]">انگلیسی</span>
                        </button>

                    </div>
                </div>
            ) : (
                <div className="w-[180px] flex flex-row-reverse items-start justify-between">
                    <span className="text-[14px] font-light pt-2 text-[rgba(98,98,98,1)]" >: زبان گفتار</span>
                    <button
                        onClick={() => setActive(true)}
                        className=" flex items-center justify-around w-[105px] h-[37px] px-2 border-[rgba(0,186,159,1)] rounded-[20px] border-[1.5px]">
                        <img src={dropIcon} alt="" className="w-[9.8px] h-[6.5px]" />
                        <span className="text-[rgba(0,186,159,1)]">
                            {language === 'fa' ? "فارسی" : "انگلیسی"}
                        </span>
                    </button>
                </div>

            )}

        </>
    )
}
