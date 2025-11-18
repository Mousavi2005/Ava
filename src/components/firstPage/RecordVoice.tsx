import RecordText from "../text/transcribePage/record"
import ActiveMicIcon from '../../assets/icons/active/activeMic.svg'

export default function RecordVoice() {
    return (
        <>
            <button className="w-[62px] h-[62px] bg-[rgba(0,179,161,1)] rounded-full flex items-center justify-center">
                <img src={ActiveMicIcon} alt="" className="w-[19.6px] h-[32.7px]" />
            </button>
            <RecordText></RecordText>
        </>
    )
}
