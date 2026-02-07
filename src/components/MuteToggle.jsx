import { Volume2, VolumeX } from 'lucide-react';
import { useVideoContext } from '../context/VideoContext';

export default function MuteToggle({ className = "" }) {
    const { isMuted, toggleMute } = useVideoContext();

    return (
        <button
            onClick={toggleMute}
            className={`p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all border border-white/10 text-white ${className}`}
            title={isMuted ? "Unmute Video" : "Mute Video"}
        >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
    );
}
