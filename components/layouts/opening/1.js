import React from "react";
import Themes from "../../../public/themes.json"
import Ornaments from "../Ornaments";

const Opening1 = ({ item, children }) => {
    return (
        <div className="glide__slide layout_cover text-center">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-[''] ">
                    <div className="animate_animated animate_fadeIn animate_slower mb-5 h-full max-h-[280px] w-full flex-shrink-0 flex-grow-0 overflow-hidden rounded-xl border-[4px] p-2 shadow-md" style={{ borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                        <span className="h-full w-full rounded-lg bg-cover bg-center block bg-no-repeat" style={{ backgroundImage: `url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgW_k_Cs22FCyw6hBXv1jI6b_kf6tHqodYRbc8cg_fXdsIGBMb7XdLlAbtog854Jh5uS8b7b40P40JmRhB8cvcViMIxH-vfg-2ZzO7y-2_KvEkotnWCM3wJWOR9RoH0P9RwMJPssSJoUj-nmnRUhuaLRet536NVLzTjHf_Fau4DK27Pl1AphZEflOBU/s600/BGs.jpg")` }}></span>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower text-center text-sm"><em>Bismillahirohmanirrohiim</em></div>
                    <div className="animate_animated animate_fadeInUp animate_slower mb-5 text-center text-sm"><em>Assalamu&apos;alaikum Warahmatullahi Wabarokatuh</em></div>
                    <div className="animate_animated animate_fadeInUp animate_slower text-center text-sm">Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/Saudari pada acara {item.invitationCategory === 3 ? `Tasyakuran Aqiqah anak ${item.invitationData.male.child}` : "Pernikahan"} kami.</div>
                </div>
            </div>

            <Ornaments item={item} />
        </div>
    );
}

export default Opening1;