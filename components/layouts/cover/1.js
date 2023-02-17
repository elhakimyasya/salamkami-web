import React from "react";
import Themes from "../../../public/themes.json"
import Ornaments from "../Ornaments";
import glide from "@glidejs/glide";

const Cover1 = ({ item, children }) => {
    const startInvitation = () => {
        const glides = new glide('.glide', {
            autoplay: 8000,
            animationDuration: 600,
            animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
            hoverpause: true,
            gap: 0,
            rewind: false,
            type: 'slider',
        }).mount();

        glides.go('>');
    };

    return (
        <div className="glide__slide layout_cover text-center glide__slide--active">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                    {item.invitationCategory !== 3 ? (
                        <div className="mb-11 flex flex-col items-center justify-center text-center">
                            <div className="flex w-full items-center justify-between">
                                <div className="animate_animated animate_fadeInLeft animate_slower mr-4 mb-4 flex flex-col items-center justify-center">
                                    <div className="mb-2 font-fontSecondary text-[36px]" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>{item.invitationData ? item.invitationData.female.nameShort : "Azrina"}</div>
                                    <div className="text-sm">{item.invitationData ? item.invitationData.female.name : "Haisha Azrina"}</div>
                                </div>
                                <div className="animate_animated animate_fadeInDown animate_slower h-20 w-[50px] border-t-[3px] border-r-[3px]" style={{ borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}></div>
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <div className="animate_animated animate_fadeInUp animate_slower h-20 w-[50px] border-b-[3px] border-l-[3px]" style={{ borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}></div>
                                <div className="animate_animated animate_fadeInRight animate_slower mt-4 ml-4 flex flex-col items-center justify-center">
                                    <div className="mb-2 text-sm">{item.invitationData ? item.invitationData.male.name : "Fariz Advaita Alhasan"}</div>
                                    <div className="font-fontSecondary text-[36px]" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>{item.invitationData ? item.invitationData.male.nameShort : "Fariz"}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center">
                            <div className="flex flex-col items-center justify-center">
                                <div className="animate_animated animate_fadeInDown animate_slower mb-2 text-sm">UNDANGAN TASYAKURAN AQIQAH</div>
                                <div className="animate_animated animate_fadeInUp animate_slower font-fontSecondary text-[36px]" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>{item.invitationData ? item.invitationData.male.nameShort : "Fariz Advaita Alhasan"}</div>
                            </div>
                        </div>
                    )}

                    <div className="animate_animated animate_fadeInUp animate_slower item-center mt-8 flex flex-col items-center justify-center text-sm">
                        <span>Kepada Yth,</span>
                        <span>Bapak/Ibu/Saudara/Saudari</span>
                    </div>

                    <div id="text_kepada" className="animate_animated animate_fadeInUp animate_slower mt-4 text-lg font-bold" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>Tamu Undangan</div>

                    <div className="animate_animated animate_fadeInUp animate_slower text-sm mt-4">di Tempat</div>

                    <button className="animate_animated border mt-8 animate_fadeInUp animate_slower rounded-full py-2 px-4 shadow-sm text-sm transition-shadow hover:shadow" type="button" aria-label="Buka Undangan" onClick={startInvitation} style={{ backgroundColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, color: item.invitationTheme ? Themes[item.invitationTheme].colorBackground : Themes[1].colorBackground }}>Buka Undangan</button>
                </div>
            </div>

            <Ornaments item={item} />
        </div>
    );
}

export default Cover1;