import DropDown from "../dropdown";
import Sidebar from "../sidebar";
import Table from "./table";
import Description from "../text/archivePage/description";

export default function ArchivePage() {

    return (
        <>
            <DropDown></DropDown>

            <div className="w-screen h-screen flex">
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <div className="w-[1100px] h-[540px] flex flex-col justify-between">
                        <Description></Description>
                        <Table></Table>
                    </div>

                </div>
                <Sidebar></Sidebar>
            </div>

        </>
    )
}
