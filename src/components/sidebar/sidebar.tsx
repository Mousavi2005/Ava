import siteLogo from "../../assets/logo/Logo.svg"
import speechIcon from "../../assets/icons/speech.svg"
import archiveIcon from "../../assets/icons/archive.svg"

function Sidebar() {

    return (
        <div className="w-[166px] h-full rounded-tl-[10px] rounded-bl-[10px] bg-gradient-to-b from-[rgba(0,181,160,1)] to-[rgba(0,198,155,1)]">
            <div className='w-full h-[50%] flex flex-col items-center justify-between pt-12'>
                <img src={siteLogo} />

                <div className='flex flex-col items-center justify-between gap-8'>
                    <button className='flex items-center justify-around rounded-[10px] w-[150px] h-12 bg-[rgba(2,129,110,1)]'>
                        <span className=' text-[rgba(255,255,255,1)] font-bold text-base'>تبدیل گفتار</span>
                        <img src={speechIcon} className='w-[22px] h-[25px]' />
                    </button>

                    <button className='flex items-center justify-around rounded-[10px] w-[87px] h-7'>
                        <span className=' w-10 h-7 text-[rgba(255,255,255,1)] font-normal text-base'>آرشیو</span>
                        <img src={archiveIcon} className='w-5 h-5' />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
