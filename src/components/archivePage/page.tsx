import DropDown from "../dropdown/dropdown";
import Sidebar from "../sidebar/sidebar";
import ArchiveContent from "./archiveContent";
import ArchiveHeaderText from "./ArchiveHeaderText";

export default function ArchivePage() {

    return (
        <>
            <DropDown></DropDown>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className="flex flex-col items-end gap-5">
                    <ArchiveHeaderText></ArchiveHeaderText>
                    <ArchiveContent></ArchiveContent>
                </div>

            </div>
            <Sidebar></Sidebar>
        </>
    )
}
