import Sidebar from "../sidebar/sidebar"
import DropDown from "../dropdown/dropdown"
import HeaderText from "../texts/header/headerTexts"
import Uploading from "../uploading/uploadLayout"

export default function FirstPage() {
    return (
        <>

            <DropDown></DropDown>

            <div className='w-full flex flex-col items-center justify-around py-8'>
                <HeaderText></HeaderText>
                <Uploading></Uploading>
            </div>

            <Sidebar></Sidebar>
        </>
    )
}
