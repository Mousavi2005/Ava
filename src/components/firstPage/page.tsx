import Sidebar from "../sidebar"
import DropDown from "../dropdown"
import HeaderText from "../text/transcribePage/discreption"
import Interact from "./interact"
import Language from "../language"

export default function FirstPage() {
    return (
        <>

            <DropDown></DropDown>

            <div className="w-screen h-screen flex">

                <div className='w-full flex flex-col items-center justify-around py-7 gap-5'>
                    <HeaderText></HeaderText>
                    <div className="h-full flex flex-col gap-4">
                        <Interact></Interact>
                        <Language></Language>
                    </div>
                </div>

                <Sidebar></Sidebar>
            </div>


        </>
    )
}
