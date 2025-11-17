import Sidebar from "../sidebar/sidebar"
import DropDown from "../dropdown/dropdown"
import HeaderText from "../texts/header/headerTexts"
import Uploading from "../uploading/uploadLayout"
import Language from "../language"

export default function FirstPage() {
    return (
        <>

            <DropDown></DropDown>

            <div className='w-full flex flex-col items-center justify-around py-7 gap-5'>
                <HeaderText></HeaderText>
                <div className="h-full flex flex-col gap-4">
                    <Uploading></Uploading>
                    <Language></Language>
                </div>
                {/* <Uploading></Uploading> */}
            </div>

            <Sidebar></Sidebar>
        </>
    )
}
