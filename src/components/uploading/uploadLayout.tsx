import ToggleHeader from "../toggleHeader/page"
import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import SectionOne from "./SectionOne"
import SectionTwo from "./section2/sectionTwo"
import SectionThree from "./sectionThree"

function Uploading() {
    const activeSection = useSelector((state: RootState) => state.toggle.active)
    console.log(activeSection);

    return (
        <div className="w-[653px] h-[477px]">
            {/* togglr header */}
            <ToggleHeader></ToggleHeader>

            <div
                className={`${activeSection === 'mic' ? "border-[rgba(0,186,159,1)] rounded-tr-none" : activeSection === 'upload' ? "border-[rgba(17,138,211,1)]" : "border-[rgba(255,22,84,1)]"} w-[653px] h-[429px] flex flex-col items-center justify-center gap-2 rounded-[25px] border-[1px] shadow-[1px_1px_50px_0_rgba(99,99,99,0.05)]`}>
                {activeSection === 'mic' ?
                    <SectionOne></SectionOne>
                    :
                    activeSection === 'upload' ?
                        <SectionTwo></SectionTwo>
                        :
                        <SectionThree></SectionThree>
                }

            </div>



        </div>
    )
}

export default Uploading
