import React from 'react'

const slideCover3 = () => {
    return (
        <div className="glide__slide layout_cover text-center">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                    <div className="animate_animated animate_fadeInDown animate_slower mb-3">UNDANGAN PERNIKAHAN</div>
                    <div className="animate_animated animate_fadeInLeft animate_slower font-fontSecondary text-5xl">Erni</div>
                    <div className="animate_animated animate_fadeIn animate_slower font-fontSecondary text-3xl">&</div>
                    <div className="animate_animated animate_fadeInRight animate_slower font-fontSecondary text-5xl">Viqi</div>

                    <div className="animate_animated animate_fadeInUp animate_slower item-center mt-8 flex flex-col items-center justify-center text-sm">
                        <span>Kepada Yth,</span>
                        <span>Bapak/Ibu/Saudara/Saudari</span>
                    </div>

                    <div id="text_kepada" className="animate_animated animate_fadeInUp animate_slower mt-4 text-lg font-bold">Tamu Undangan</div>

                    <div className="animate_animated animate_fadeInUp animate_slower text-sm mt-4">di Tempat</div>

                    <button id="button_swipe" className="animate_animated border mt-8 animate_fadeInUp animate_slower rounded-full py-2 px-4 shadow-sm transition-shadow hover:shadow-lg" type="button" aria-label="Buka Undangan">Buka Undangan</button>
                </div>
            </div>
        </div>
    );
}

export default slideCover3;