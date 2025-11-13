import './App.css'
import DropDown from './components/dropdown/dropdown'
import Sidebar from './components/sidebar/sidebar'
import HeaderText from './components/texts/header/headerTexts'
import Uploading from './components/uploading/uploadLayout'

function App() {

    return (
        <div className=' w-screen h-screen relative flex justify-end'>
            <DropDown></DropDown>

            <div className='w-full flex flex-col items-center'>
                <HeaderText></HeaderText>
                <Uploading></Uploading>
            </div>

            <Sidebar></Sidebar>


        </div>
    )
}

export default App
