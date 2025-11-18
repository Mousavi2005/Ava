import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

import dropIcon from '../assets/icons/dropIcon.svg'
import dropIcon2 from '../assets/icons/dropIcon2.svg'


type Language = 'fa' | 'en'

export default function Language() {

    const [active, setActive] = useState(false)
    const [language, setLanguage] = useState<Language>('fa')
    const uploadStatus = useSelector((state: RootState) => state.uploadFile.uploadStatus)
    const [disable, setDisable] = useState(false)
    useEffect(() => {
        if (uploadStatus === 'uploaded' || uploadStatus === 'isUploading') {
            setDisable(true)
        }
        setDisable(false)
    }, [uploadStatus])

    console.log(disable);

    return (
        <>
            {active ? (

                <div className={` w-[180px] flex flex-row-reverse items-start justify-between `}
                    style={{
                        opacity: disable ? 0.4 : 1
                    }}
                >
                    <span className="text-[14px] font-light pt-2 text-[rgba(98,98,98,1)]" >: زبان گفتار</span>
                    <div className=" w-[105px] h-[81px] flex flex-col items-center border-[rgba(0,186,159,1)] rounded-[20px] border-[1.5px] p-2">
                        {language === 'fa' ?
                            <>
                                <button
                                    onClick={() => {
                                        setActive(false), setLanguage('fa')
                                    }}
                                    disabled={uploadStatus === 'uploaded' || uploadStatus === 'isUploading'}
                                    className="flex items-center justify-around w-full h-[37px] rounded-[20px] px-2">
                                    <img src={dropIcon2} alt="" className="w-[9.8px] h-[6.5px]" />
                                    <span className="text-[rgba(0,186,159,1)]">فارسی</span>
                                </button>

                                <hr className="w-[75%] border border-teal-400 mt-2" />

                                <button
                                    onClick={() => { setActive(false), setLanguage('en') }}
                                    disabled={uploadStatus === 'uploaded' || uploadStatus === 'isUploading'}
                                    className="flex items-center justify-around w-full h-[37px] rounded-[20px] px-2">
                                    <div className="w-[18px] h-[18px]"></div>
                                    <span className="text-[rgba(0,186,159,1)]">انگلیسی</span>
                                </button>
                            </>
                            :
                            <>

                                <button
                                    onClick={() => {
                                        setActive(false), setLanguage('en')
                                    }}
                                    disabled={uploadStatus === 'uploaded' || uploadStatus === 'isUploading'}
                                    className="flex items-center justify-around w-full h-[37px] rounded-[20px] px-2">
                                    <img src={dropIcon2} alt="" className="w-[9.8px] h-[6.5px]" />
                                    <span className="text-[rgba(0,186,159,1)]">انگلیسی</span>
                                </button>

                                <hr className="w-[75%] border border-teal-400 mt-2" />

                                <button
                                    onClick={() => { setActive(false), setLanguage('fa') }}
                                    disabled={uploadStatus === 'uploaded' || uploadStatus === 'isUploading'}
                                    className="flex items-center justify-around w-full h-[37px] rounded-[20px] px-2">
                                    <div className="w-[18px] h-[18px]"></div>
                                    <span className="text-[rgba(0,186,159,1)]">فارسی</span>
                                </button>
                            </>
                        }

                    </div>
                </div>


            ) : (
                <div className={` w-[180px] flex flex-row-reverse items-start justify-between`}
                    style={{
                        opacity: disable ? 0.4 : 1
                    }}
                >
                    <span className="text-[14px] font-light pt-2 text-[rgba(98,98,98,1)]" >: زبان گفتار</span>
                    <button
                        onClick={() => setActive(true)}
                        disabled={uploadStatus === 'uploaded' || uploadStatus === 'isUploading'}
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
