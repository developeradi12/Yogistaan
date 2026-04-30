// components/VideoSection.tsx
"use client";

export const VideoSection = () => {
    return (
        <section className="w-full pb-4" style={{ height: "400px" }}>
            <div className="relative w-full h-full overflow-hidden">
                <video
                    src="video/video.mp4"
                    poster="/video-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-8">
                    <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4">
                        Featured
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Experience the Journey
                    </h2>
                   
                </div>
            </div>
        </section>
    );
};