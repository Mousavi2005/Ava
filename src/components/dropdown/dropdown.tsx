import { useState } from "react"
import userIcon from "../../assets/icons/user.svg"
import dropIcon from "../../assets/icons/dropIcon.svg"
import dropIcon2 from "../../assets/icons/dropIcon2.svg"
import logout from "../../assets/icons/logout.svg"

function DropDown() {

    const [active, setActive] = useState(false)

    return (
        <>
            {active ? (
                <div className=" absolute top-[53px] left-[83px] w-[121px] h-[81px] flex flex-col items-center border-[rgba(0,186,159,1)] rounded-[20px] border-[1.5px] p-2">

                    <button
                        onClick={() => setActive(false)}
                        className="flex items-center justify-around w-[121px] h-[37px] rounded-[20px] px-2">
                        <img src={dropIcon2} alt="" className="w-[9.8px] h-[6.5px]" />
                        <span className="text-[rgba(0,186,159,1)]">مهمان</span>
                        <img src={userIcon} alt="" className="w-[18px] h-[18px]" />
                    </button>

                    <hr className="w-[75%] border border-teal-400 mt-2" />

                    <button className="flex items-center justify-around w-[121px] h-[37px] rounded-[20px] px-2">
                        <div className="w-[18px] h-[18px]"></div>
                        <span className="text-[rgba(0,186,159,1)]">خروج</span>
                        <img src={logout} alt="Logout" className="w-4 h-4" />
                    </button>

                </div>
            ) : (
                <button
                    onClick={() => setActive(true)}
                    className=" absolute top-[53px] left-[83px] flex items-center justify-around w-[121px] h-[37px] px-2 border-[rgba(0,186,159,1)] rounded-[20px] border-[1.5px]">
                    <img src={dropIcon} alt="" className="w-[9.8px] h-[6.5px]" />
                    <span className="text-[rgba(0,186,159,1)]">مهمان</span>
                    <img src={userIcon} alt="" className="w-[18px] h-[18px]" />
                </button>

            )}
        </>
    )
}

export default DropDown
