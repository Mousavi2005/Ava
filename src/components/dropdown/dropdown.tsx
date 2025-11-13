import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import userIcon from "../../assets/icons/user.svg"
import dropIcon from "../../assets/icons/dropIcon.svg"

function DropDown() {

    const [active, setActive] = useState(true)

    return (
        <AnimatePresence>
            {active ? (
                <motion.div
                    key="first"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className=" absolute top-[53px] left-[83px] flex items-center justify-around w-[121px] h-[37px] border-[rgba(0,186,159,1)] rounded-[20px] border-[1.5px]"
                >
                    <img src={dropIcon} alt="" className="w-[9.8px] h-[6.5px]" />
                    <span className="text-[rgba(0,186,159,1)]">مهمان</span>
                    <img src={userIcon} alt="" className="w-[18px] h-[18px]" />
                    {/* <span>مهمان</span> */}
                    {/* <img src={dropIcon} alt="" className="w-[18px] h-[18px]"/> */}

                </motion.div>
            ) : (
                <motion.div
                    key="second"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className=""
                >
                    Second Div
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DropDown
