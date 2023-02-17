import React, { useEffect, useState } from "react";
import Themes from "../../../public/themes.json"
import Link from "next/link";
import Ornaments from "../Ornaments";


const Maps1 = ({ item, children }) => {
    let mapsURL = item.invitationData.reception.maps ? item.invitationData.reception.maps : "https://www.google.com/maps/place/5%C2%B020'49.2%22S+104%C2%B057'00.4%22E/@-5.3470008,104.9479173,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x17232c6d01b25baf!8m2!3d-5.3470008!4d104.950106";

    if (item.invitationData.reception.maps) {
        const match = item.invitationData.reception.maps.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

        if (match) {
            mapsURL = `${parseFloat(match[1])}, ${parseFloat(match[2])}`;
        }
    }

    return (
        <div className="glide__slide layout_cover text-center">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-[''] ">
                    <div className="animate_animated animate_fadeInDown animate_slower mb-6 text-center">
                        <div className="mb-2 font-fontSecondary text-3xl" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>Lokasi {item.invitationCategory === 3 ? "Acara" : "Resepsi"}</div>
                    </div>
                    <div className="animate_animated animate_fadeIn animate_slower relative mb-6 w-full overflow-hidden rounded-xl pb-[50vh] shadow-lg">
                        <iframe width="100%" loading="lazy" height="100%" allowFullScreen src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCoDckKi8TfOgUzbns6gt5alsAJ-5HfpuE&zoom=17&q=${mapsURL}`} className="absolute"></iframe>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower mb-6 text-center">{item.invitationData.reception.address}</div>
                    <Link className="animate_animated animate_fadeInUp animate_slower animate__delay-005s rounded-full py-2 px-4 transition-shadow hover:shadow text-sm" href={`https://www.google.com/maps/place/?q=${mapsURL}`} target="_blank" rel="nofollow noopener noreferer" style={{ backgroundColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, color: item.invitationTheme ? Themes[item.invitationTheme].colorBackground : Themes[1].colorBackground }}>Lihat Petunjuk Ke Lokasi</Link>
                </div>
            </div>

            <Ornaments item={item} />
        </div>
    );
}

export default Maps1;