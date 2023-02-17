import React from "react";
import Themes from "../../../public/themes.json"
import Ornaments from "../Ornaments";

const Bride1 = ({ item, children }) => {
    return (
        <div className="glide__slide layout_cover text-center">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                    {item.invitationCategory !== 3 ? (
                        <>
                            <div className="animate_animated animate_fadeIn animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>{item.invitationData ? item.invitationData.female.name : "Haisha Azrina"}</div>
                            <div className="animate_animated animate_fadeInLeft animate_slower flex flex-col items-center justify-center text-sm">
                                <span>Putri {item.invitationData.female.child ? item.invitationData.female.child : ""} dari:</span>
                                <span>Bapak {item.invitationData ? item.invitationData.female.nameFather : "Farhan Alfarezi"} & Ibu {item.invitationData ? item.invitationData.female.nameMother : "Samiyyah Samira"}</span>
                            </div>
                            <div className="my-6 flex items-center justify-center w-full">
                                <div className="animate_animated animate_fadeInLeft animate_slower mr-2 w-full h-full aspect-[9/12] overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                                    <span className="h-full w-full rounded-lg bg-cover bg-center block bg-no-repeat" style={{ backgroundImage: `url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrSWeStaaU5ZQ8LhD-w2aySRyG81Wwuxmq-Rjh2OhMRlXne2tx2dQDDurdKtmQ1jDAqbyHy44YSV-Qrr7wNaRqu9eAtRwbyZjUMtYGDSwr85CyqBBNZ8ID3pJ3hUGD0PfRJFSOvkosuEfA6aznyPQvBfCsTwR_OPwuydf5oAgdmtLkECwG1QGbsveZ/s600/BGs.jpg")` }}></span>
                                </div>
                                <div className="animate_animated animate_fadeInRight animate_slower ml-2 w-full h-full aspect-[9/12] overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                                    <span className="h-full w-full rounded-lg bg-cover bg-center block bg-no-repeat" style={{ backgroundImage: `url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd8_vyzfs9BY3TBgHd1FAfcSeZd9o09PsdEBbQkVhVGNwiE-MzSScVNjUQ1OTY8CWbvmM78T-wcB4rq7AuBC5Jw7pJo_fiO2AYoME1sD6kW9WL7gSwdGcmo22BVsTDGF-liWsBiup0iyHj_rFcyJJYuIbOJvaGaPYHYwK1rKzsd5NMOMRDlaRclbjW/s600/BGs.jpg")` }}></span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="animate_animated animate_fadeIn animate_slower mb-5 aspect-video w-full flex-shrink-0 flex-grow-0 overflow-hidden rounded-xl border-[4px] p-2 shadow-md" style={{ borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                            <span className="h-full w-full rounded-lg bg-cover bg-center block bg-no-repeat" style={{ backgroundImage: `url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgW_k_Cs22FCyw6hBXv1jI6b_kf6tHqodYRbc8cg_fXdsIGBMb7XdLlAbtog854Jh5uS8b7b40P40JmRhB8cvcViMIxH-vfg-2ZzO7y-2_KvEkotnWCM3wJWOR9RoH0P9RwMJPssSJoUj-nmnRUhuaLRet536NVLzTjHf_Fau4DK27Pl1AphZEflOBU/s600/BGs.jpg")` }}></span>
                        </div>
                    )}

                    <div className="animate_animated animate_fadeIn animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>{item.invitationData ? item.invitationData.male.name : "Fariz Advaita Alhasan"}</div>
                    <div className={`animate_animated flex flex-col items-center justify-center text-sm ${item.invitationCategory !== 3 ? "animate_fadeInRight animate_slower" : "animate_fadeInUp animate_slower"}`}>
                        <span>{item.invitationCategory !== 3 ? `Putra ${item.invitationData.male.child ? item.invitationData.male.child : ""} dari:` : `Anak ${item.invitationData.male.child ? item.invitationData.male.child : ""} dari:`}</span>
                        <span>Bapak {item.invitationData ? item.invitationData.male.nameFather : "Adzriel Fairuz"} & Ibu {item.invitationData ? item.invitationData.male.nameMother : "Areta Mahfeen"}</span>
                    </div>
                </div>
            </div>

            <Ornaments item={item} />
        </div>
    );
}

export default Bride1;