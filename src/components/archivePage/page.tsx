import DropDown from "../dropdown/dropdown";
import Sidebar from "../sidebar/sidebar";
import ArchiveContent from "./archiveContent";
import ArchiveHeaderText from "./ArchiveHeaderText";

export default function ArchivePage() {

    return (
        <>
            <DropDown></DropDown>
            <div className='w-full flex flex-col items-center justify-center gap-3'>
                {/* <HeaderText></HeaderText>
                <Uploading></Uploading> */}
                <ArchiveHeaderText></ArchiveHeaderText>
                <ArchiveContent></ArchiveContent>
            </div>
            <Sidebar></Sidebar>
        </>
    )
}
