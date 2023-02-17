import React from "react";
import Themes from "../../../public/themes.json"
import Ornaments from "../Ornaments";

const Closing1 = ({ item, children }) => {
    return (
        <div className="glide relative h-screen w-full overflow-hidden">
            <div className="glide__track h-full overflow-hidden" data-glide-el="track">
                <div className="glide__slide layout_cover text-center">
                    <div className="mx-auto h-full max-w-xl">
                        <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-[''] ">
                            <div className="animate_animated animate_fadeInDown animate_slower mb-4 font-fontSecondary text-3xl" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>Terimakasih</div>
                            <div className="animate_animated animate_fadeInDown animate_slower mb-3 text-center text-sm">Merupakan suatu kebahagiaan dan kehormatan apabila Bapak/Ibu/Saudara/Saudari berkenan hadir dan memberikan do&apos;a {item.invitationCategory !== 3 ? "restu untuk Pernikahan kami supaya menjadi yang Sakinnah, Mawaddah, Warahmah" : "atas Tasyakuran Aqiqah anak kami"}.</div>
                            <div className="animate_animated animate_fadeInDown animate_slow text-sm mb-4"><em>Kami yang berbahagia:</em></div>

                            <div className="flex flex-col items-center justify-center text-center font-fontSecondary" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                                {item.invitationCategory === 3 ? (
                                    <>
                                        <span className="animate_animated animate_fadeIn animate_slow text-3xl">{item.invitationData ? item.invitationData.male.nameFather : "Adzriel Fairuz"}</span>
                                        <span className="animate_animated animate_fadeIn animate_slower text-3xl">{item.invitationData ? item.invitationData.male.nameMother : "Areta Mahfeen"}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="animate_animated animate_fadeIn animate_slow text-3xl">{item.invitationData ? item.invitationData.female.name : "Haisha Azrina"}</span>
                                        <span className="animate_animated animate_fadeIn animate_slower text-3xl">{item.invitationData ? item.invitationData.male.name : "Fariz Advaita Alhasan"}</span>
                                    </>
                                )}
                            </div>

                            <div className="animate_animated animate_fadeInUp animate_slower mt-8 text-center text-sm"><em>Wassalamu&apos;alaikum Warahmatullahi Wabarokatuh</em></div>
                        </div>
                    </div>

                    <Ornaments item={item} />
                </div>
            </div>
        </div>
    );
}

export default Closing1;