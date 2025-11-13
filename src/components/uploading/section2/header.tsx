import textIcon from "../../../assets/icons/textIcon.svg"
import timeIcon from "../../../assets/icons/timeIcon.svg"

export default function Header() {
    return (
        <div className="w-full flex items-center justify-between bg-red-300">

            <div>
                <button></button>
                <button>e</button>
                <button>e</button>
            </div>

            <div className="flex h-full items-center">
                <button className="flex items-center">
                    <span className="text-[14px] font-normal">متن زمان‌بندی شده</span>
                    <img src={timeIcon} alt="" className="w-[17px] h-[17px]" />
                </button>
                <button className="flex items-center">
                    <span className="text-[14px] font-normal">متن ساده</span>
                    <img src={textIcon} alt="" className="w-[17px] h-[17px]" />
                </button>

            </div>

        </div>
    )
}
