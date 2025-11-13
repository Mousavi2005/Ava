import ActiveChainIcon from '../../assets/icons/active/activeChain.svg'
import LinkText from '../texts/upload/link'

export default function SectionThree() {
    return (
        <div className='flex flex-col gap-2 items-center justify-center'>

            <div className=" w-[328px] h-[46px] flex items-center pl-4 border-[0.5px] border-[rgba(255,22,84,1)] rounded-[50px]">

                <button className='w-[30px] h-[30px] bg-[rgba(255,22,84,1)] rounded-full  flex items-center justify-center'>
                    <img src={ActiveChainIcon} alt="" className="w-[15.8px] h-[12.9px]" />
                </button>
                <input
                    placeholder='example.com/sample.mp3'
                    className='w-[280px] rounded-[50px] px-2 outline-none'>
                </input>

            </div>

            <LinkText></LinkText>
        </div>
    )
}
