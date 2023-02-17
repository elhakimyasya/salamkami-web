import React from 'react'

const slideCover1 = ({ colorBackground, colorMain, ornamentTop, ornamentBottom }) => {
    return (
        <div className="glide__slide layout_cover text-center">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                    <div className="mb-11 flex flex-col items-center justify-center text-center">
                        <div className="flex w-full items-center justify-between">
                            <div className="animate_animated animate_fadeInLeft animate_slower mr-4 mb-4 flex flex-col items-center justify-center">
                                <div className="mb-2 font-fontSecondary text-[36px]" style={{ color: colorMain }}>Erni</div>
                                <div className="text-sm">Erni Safitri</div>
                            </div>
                            <div className="animate_animated animate_fadeInDown animate_slower h-20 w-[50px] border-t-[3px] border-r-[3px]" style={{ borderColor: colorMain }}></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="animate_animated animate_fadeInUp animate_slower h-20 w-[50px] border-b-[3px] border-l-[3px]" style={{ borderColor: colorMain }}></div>
                            <div className="animate_animated animate_fadeInRight animate_slower mt-4 ml-4 flex flex-col items-center justify-center">
                                <div className="mb-2 text-sm">Viqi Imara Lubaba</div>
                                <div className="font-fontSecondary text-[36px]" style={{ color: colorMain }}>Viqi</div>
                            </div>
                        </div>
                    </div>

                    <div className="animate_animated animate_fadeInUp animate_slower item-center mt-8 flex flex-col items-center justify-center text-sm">
                        <span>Kepada Yth,</span>
                        <span>Bapak/Ibu/Saudara/Saudari</span>
                    </div>

                    <div id="text_kepada" className="animate_animated animate_fadeInUp animate_slower mt-4 text-lg font-bold" style={{ color: colorMain }}>Tamu Undangan</div>

                    <div className="animate_animated animate_fadeInUp animate_slower text-sm mt-4">di Tempat</div>

                    <button id="button_swipe" className="animate_animated border mt-8 animate_fadeInUp animate_slower rounded-full py-2 px-4 shadow-sm transition-shadow hover:shadow-lg" type="button" aria-label="Buka Undangan" style={{ backgroundColor: colorMain, color: colorBackground }}>Buka Undangan</button>
                </div>
            </div>

            <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 -z-10">
                <span className="animate_animated animate_fadeInTopLeft animate_slower absolute top-0 left-0 h-full w-1/2 bg-contain bg-left-top bg-no-repeat" style={{ backgroundImage: `url(${ornamentTop})` }}></span>
                <span className="animate_animated animate_fadeInBottomRight animate_slower absolute bottom-0 right-0 h-full w-1/2 bg-contain bg-right-bottom bg-no-repeat" style={{ backgroundImage: `url(${ornamentBottom})` }}></span>
            </div>
        </div>
    );
}

export default slideCover1;