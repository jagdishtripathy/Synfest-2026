import { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export function VideoProvider({ children }) {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <VideoContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </VideoContext.Provider>
    );
}

export function useVideoContext() {
    return useContext(VideoContext);
}
