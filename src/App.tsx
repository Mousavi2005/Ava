import './App.css'
import FirstPage from './components/firstPage/page'
import ArchivePage from './components/archivePage/page'
import { useSelector } from 'react-redux'
import type { RootState } from './store/store'

function App() {

    const activePage = useSelector((state: RootState) => state.page.activePage)

    return (
        <div className=' w-screen h-screen relative flex justify-end'>

            {activePage === 'transcribe' ?
                <FirstPage></FirstPage>

                :
                <ArchivePage></ArchivePage>

            }



        </div>
    )
}

export default App
