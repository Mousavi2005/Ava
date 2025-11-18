import siteLogo from "../assets/logo/Logo.svg"
import speechIcon from "../assets/icons/speech.svg"
import archiveIcon from "../assets/icons/archive.svg"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { setActivePage } from "../slices/pageSlice"
import { useNavigate } from "react-router-dom"

function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activePage = useSelector((state: RootState) => state.page.activePage)
    console.log(activePage);


    return (
        <div className="w-[170px] h-screen rounded-tl-[10px] rounded-bl-[10px] bg-gradient-to-b from-[rgba(0,181,160,1)] to-[rgba(0,198,155,1)]">
            <div className='w-full h-[50%] flex flex-col items-center justify-between pt-12'>
                <img src={siteLogo} />

                <div className='flex flex-col items-center justify-between gap-8'>
                    <button
                        className={`flex items-center justify-around rounded-[10px] w-[150px] h-12 ${activePage === 'transcribe' ? "bg-[rgba(2,129,110,1)]" : ""}`}
                        onClick={() => {
                            dispatch(setActivePage('transcribe'))
                            navigate('/transcribe')
                        }}

                    >
                        <span className={`text-[rgba(255,255,255,1)] text-base ${activePage === 'transcribe' ? "font-bold" : "font-normal"} `}>تبدیل گفتار</span>
                        <img src={speechIcon} className={`${activePage === 'transcribe' ? "w-[25px] h-[25px]" : "w-5 h-5"}`} />
                    </button>

                    <button
                        className={`flex items-center justify-around rounded-[10px]  w-[150px] h-12 ${activePage === 'archive' ? "bg-[rgba(2,129,110,1)]" : ""}`}
                        onClick={() => {
                            dispatch(setActivePage('archive'))
                            navigate('/archive')
                        }}

                    >
                        <span className={`w-10 h-7 text-[rgba(255,255,255,1)] text-base ${activePage === 'archive' ? "font-bold" : "font-normal"}`} >آرشیو</span>
                        <img src={archiveIcon} className={`${activePage === 'archive' ? "w-[25px] h-[25px]" : "w-5 h-5"}`} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
