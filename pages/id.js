/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';
import glide from "@glidejs/glide";

const ids = () => {
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();
    const pathQueryID = router.query.id;
    const pathQueryTo = router.query.to || router.query.kepada;

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const dayNames = [
        "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"
    ];

    const addLeadingZeros = (number, length) => {
        let str = number.toString();
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    };

    const getMonthName = (month) => {
        const monthIndex = parseInt(month, 10) - 1;
        return monthNames[monthIndex];
    };

    const getDayName = (day) => {
        const dayIndex = parseInt(day, 10) - 1;
        return dayNames[dayIndex];
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 3000);
    }, []);

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

    const invitationType = (type) => {
        let types = '';
        if (type === 1) {
            types = 'UNDANGAN PERNIKAHAN'
        } else {
            types = 'UNDANGAN TASYAKURAN AQIQAH'
        }

        return types;
    };

    initializeApp({
        apiKey: "AIzaSyAHOv64OFwobOVReOdO7I0FDn14ALio4Sk",
        authDomain: "salamkami-website.firebaseapp.com",
        projectId: "salamkami-website",
        storageBucket: "salamkami-website.appspot.com",
        messagingSenderId: "710379476608",
        appId: "1:710379476608:web:9463f2d56ca7690f0eb865"
    });
    const firestoreDatabase = getFirestore();

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const userData = onSnapshot(doc(firestoreDatabase, `web/${pathQueryID}`), (doc) => {
            const docData = doc.data();

            setUserData(docData);

            if (!doc.metadata.hasPendingWrites) {
                userData()
            }
        });
    }, [firestoreDatabase, pathQueryID]);




    const getDate = (data, request) => {
        const dateParts = data.split('-');

        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // JavaScript Date uses 0-based months
        const year = parseInt(dateParts[2]);

        const date = new Date(year, month, day);

        if (request === 'day') {
            const options = {
                weekday: 'long'
            };

            return date.toLocaleDateString('ID', options)
        } else if (request === 'date') {
            const options = {
                day: '2-digit',
            };

            return date.toLocaleDateString('ID', options)
        } else if (request === 'month') {
            const options = {
                month: 'long'
            };

            return date.toLocaleDateString('ID', options)
        } else if (request === 'year') {
            return year
        } else {
            return date
        }
    };

    const CountDown = ({ date }) => {
        const [countdown, setCountdown] = useState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        });

        useEffect(() => {
            const intervalId = setInterval(() => {
                const currentDate = new Date();
                const diff = (new Date(date) - currentDate) / 1000;

                setCountdown({
                    days: ('0' + Math.floor(diff / (60 * 60 * 24))).slice(-2),
                    hours: ('0' + Math.floor(diff / (60 * 60)) % 24).slice(-2),
                    minutes: ('0' + Math.floor(diff / 60) % 60).slice(-2),
                    seconds: ('0' + Math.floor(diff) % 60).slice(-2)
                });
            }, 1000);

            return () => {
                clearInterval(intervalId)
            };
        }, [date]);

        return (
            <div className="flex w-full flex-col">
                <div className="flex gap-2 text-center">
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-lg border border-colorMain p-1 text-colorMain">
                        <div className="number text-2xl font-bold">{countdown.days}</div>
                        <div className="text">Hari</div>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-lg border border-colorMain p-1 text-colorMain [animation-delay:calc(var(--animate-duration)*.25)]">
                        <div className="number text-2xl font-bold">{countdown.hours}</div>
                        <div className="text">Jam</div>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-lg border border-colorMain p-1 text-colorMain [animation-delay:calc(var(--animate-duration)*.5)]">
                        <div className="number text-2xl font-bold">{countdown.minutes}</div>
                        <div className="text">Menit</div>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-lg border border-colorMain p-1 text-colorMain [animation-delay:calc(var(--animate-duration)*.75)]">
                        <div className="number text-2xl font-bold">{countdown.seconds}</div>
                        <div className="text">Detik</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {userData && (
                <>
                    <div className="glide relative h-screen w-full overflow-hidden">
                        <div className="glide__track h-full overflow-hidden" data-glide-el="track">
                            <div className="glide__slides relative flex whitespace-nowrap p-0 will-change-transform h-full overflow-hidden">
                                {userData.slideCover.type !== 0 && (
                                    <div className="glide__slide layout_cover text-center glide__slide--active">
                                        <div className="mx-auto h-full max-w-xl">
                                            <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                                                {userData.slideCover.type === 1 ? (
                                                    <>
                                                        {userData.invitationType === 1 ? (
                                                            <div className="mb-11 flex flex-col items-center justify-center text-center">
                                                                <div className="flex w-full items-center justify-between">
                                                                    <div className="animate_animated animate_fadeInLeft animate_slower mr-4 mb-4 flex flex-col items-center justify-center">
                                                                        <div className="mb-2 font-fontSecondary text-[36px]" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.nameShort}</div>
                                                                        <div className="text-sm">{userData.info.female.name}</div>
                                                                    </div>
                                                                    <div className="animate_animated animate_fadeInDown animate_slower h-20 w-[50px] border-t-[3px] border-r-[3px]" style={{ borderColor: `${userData.theme.colorMain}` }}></div>
                                                                </div>
                                                                <div className="flex w-full items-center justify-between">
                                                                    <div className="animate_animated animate_fadeInUp animate_slower h-20 w-[50px] border-b-[3px] border-l-[3px]" style={{ borderColor: `${userData.theme.colorMain}` }}></div>
                                                                    <div className="animate_animated animate_fadeInRight animate_slower mt-4 ml-4 flex flex-col items-center justify-center">
                                                                        <div className="mb-2 text-sm">{userData.info.male.name}</div>
                                                                        <div className="font-fontSecondary text-[36px]" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.nameShort}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center text-center">
                                                                <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                <div className="animate_animated animate_fadeInUp animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : userData.slideCover.type === 2 ? (
                                                    <>
                                                        {userData.invitationType === 1 ? (
                                                            <div className="mb-7 flex flex-col items-center justify-center text-center">
                                                                <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                <div className="animate_animated animate_fadeInUp animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.nameShort} & {userData.info.male.nameShort}</div>
                                                            </div>
                                                        ) : (
                                                            <div className="mb-7 flex flex-col items-center justify-center text-center">
                                                                <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                <div className="animate_animated animate_fadeInUp animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : userData.slideCover.type === 3 ? (
                                                    <>
                                                        {userData.invitationType === 1 ? (
                                                            <>
                                                                <div className="flex flex-col items-center justify-center text-center">
                                                                    <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                    <div className="animate_animated animate_fadeInDown animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.nameShort} & {userData.info.male.nameShort}</div>
                                                                </div>
                                                                <div className="animate_animated animate_fadeIn animate_slower my-4 h-[200px] w-[200px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-full border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                    <img className="h-full w-full rounded-full bg-white object-cover" alt={userData.info.female.nameShort + " & " + userData.info.male.nameShort} src={userData.images.both} />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex flex-col items-center justify-center text-center">
                                                                    <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                    <div className="animate_animated animate_fadeInDown animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                                </div>
                                                                <div className="animate_animated animate_fadeIn animate_slower my-4 h-[200px] w-[200px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-full border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                    <img className="h-full w-full rounded-full bg-white object-cover" alt={userData.info.male.name} src={userData.images.both} />
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="mb-4 flex flex-col items-center justify-center text-center">
                                                        {userData.invitationType === 1 ? (
                                                            <>
                                                                <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                <div className="animate_animated animate_fadeInLeft animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.nameShort}</div>
                                                                <div className="animate_animated animate_fadeIn animate_slower font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>&</div>
                                                                <div className="animate_animated animate_fadeInRight animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.nameShort}</div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="animate_animated animate_fadeInDown animate_slower mb-3">{invitationType(userData.invitationType)}</div>
                                                                <div className="animate_animated animate_fadeInUp animate_slower font-fontSecondary text-5xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="animate_animated animate_fadeInUp animate_slower item-center mt-8 flex flex-col items-center justify-center text-sm">
                                                    <span>Kepada Yth,</span>
                                                    <span>Bapak/Ibu/Saudara/Saudari</span>
                                                </div>

                                                <div id="text_kepada" className="animate_animated animate_fadeInUp animate_slower mt-4 text-lg font-bold" style={{ color: `${userData.theme.colorMain}` }}>{pathQueryTo || 'Tamu Undangan'}</div>

                                                <div className="animate_animated animate_fadeInUp animate_slower text-sm mt-4">di Tempat</div>

                                                <button id="button_swipe" className="animate_animated border mt-8 animate_fadeInUp animate_slower rounded-full py-2 px-4 shadow-sm transition-shadow hover:shadow-lg" type="button" aria-label="Buka Undangan" onClick={startInvitation} style={{ backgroundColor: `${userData.theme.colorMain}`, borderColor: `${userData.theme.colorMain}`, color: `${userData.theme.colorBackground}` }}>Buka Undangan</button>
                                            </div>
                                        </div>

                                        <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 -z-10">
                                            {userData && userData.theme && (
                                                <>
                                                    {userData.theme.ornamentTop && (
                                                        <span className="animate_animated animate_fadeInTopLeft animate_slower absolute top-0 left-0 h-full w-1/2 bg-contain bg-left-top bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentTop})` }}></span>
                                                    )}

                                                    {userData.theme.ornamentBottom && (
                                                        <span className="animate_animated animate_fadeInBottomRight animate_slower absolute bottom-0 right-0 h-full w-1/2 bg-contain bg-right-bottom bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentBottom})` }}></span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {userData.slideOpening.type !== 0 && (
                                    <div className="glide__slide layout_opening text-center">
                                        <div className="mx-auto h-full max-w-xl">
                                            <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                                                {userData.slideOpening.type === 1 ? (
                                                    <>
                                                        <div className="animate_animated animate_fadeIn animate_slower mb-5 h-[280px] w-full flex-shrink-0 flex-grow-0 overflow-hidden rounded-xl border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                            <img className="h-full w-full rounded-xl object-cover" alt={userData.invitationType === 1 ? userData.info.male.name : userData.info.female.nameShort + " & " + userData.info.male.nameShort} src={userData.images.both} />
                                                        </div>
                                                        <div dangerouslySetInnerHTML={{ __html: userData.slideOpening.textFirst }} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="animate_animated animate_fadeIn animate_slower mb-5 h-[280px] w-full flex-shrink-0 flex-grow-0 overflow-hidden rounded-xl border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                            <img className="h-full w-full rounded-xl object-cover" alt={userData.invitationType === 1 ? userData.info.male.name : userData.info.female.nameShort + " & " + userData.info.male.nameShort} src={userData.images.both} />
                                                        </div>
                                                        <div dangerouslySetInnerHTML={{ __html: userData.slideOpening.textFirst }} />
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 -z-10">
                                            {userData && userData.theme && (
                                                <>
                                                    {userData.theme.ornamentTop && (
                                                        <span className="animate_animated animate_fadeInTopLeft animate_slower absolute top-0 left-0 h-full w-1/2 bg-contain bg-left-top bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentTop})` }}></span>
                                                    )}

                                                    {userData.theme.ornamentBottom && (
                                                        <span className="animate_animated animate_fadeInBottomRight animate_slower absolute bottom-0 right-0 h-full w-1/2 bg-contain bg-right-bottom bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentBottom})` }}></span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {userData.slideBride.type !== 0 && (
                                    <div className="glide__slide layout_bride text-center">
                                        <div className="mx-auto h-full max-w-xl">
                                            <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                                                {userData.invitationType === 1 ? (
                                                    <>
                                                        {userData.slideBride.type === 1 ? (
                                                            <>
                                                                <div className="animate_animated animate_fadeInDown animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.name}</div>
                                                                <div className="animate_animated animate_fadeInLeft animate_slower flex flex-col items-center justify-center">
                                                                    <span>Putri {userData.info.female.child} dari:</span>
                                                                    <span>Bapak {userData.info.female.dad} & Ibu {userData.info.female.mom}</span>
                                                                </div>
                                                                <div className="my-6 flex items-center justify-center">
                                                                    <div className="animate_animated animate_fadeInLeft animate_slower mr-2 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                        <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.female} alt={userData.info.female.name} />
                                                                    </div>
                                                                    <div className="animate_animated animate_fadeInRight animate_slower ml-2 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                        <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.male} alt={userData.info.male.name} />
                                                                    </div>
                                                                </div>
                                                                <div className="animate_animated animate_fadeInUp animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                                <div className="animate_animated animate_fadeInRight animate_slower flex flex-col items-center justify-center">
                                                                    <span>Putra {userData.info.male.child} dari: </span>
                                                                    <span>Bapak {userData.info.male.dad} & Ibu {userData.info.male.mom}</span>
                                                                </div>
                                                            </>
                                                        ) : userData.slideBride.type === 2 ? (
                                                            <>
                                                                <div className="animate_animated animate_fadeInLeft animate_slow mb-3 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                    <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.female} alt={userData.info.female.name} />
                                                                </div>
                                                                <div className="animate_animated animate_fadeInRight animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.name}</div>
                                                                <div className="animate_animated animate_fadeInRight animate_slower mb-6 flex flex-col items-center justify-center">
                                                                    <span>Putri {userData.info.female.child} dari:</span>
                                                                    <span>Bapak {userData.info.female.dad} & Ibu {userData.info.female.mom}</span>
                                                                </div>
                                                                <div className="animate_animated animate_fadeInRight animate_slow mb-3 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                    <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.male} alt={userData.info.male.name} />
                                                                </div>
                                                                <div className="animate_animated animate_fadeInLeft animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                                <div className="animate_animated animate_fadeInLeft animate_slower flex flex-col items-center justify-center">
                                                                    <span>Putra {userData.info.male.child} dari: </span>
                                                                    <span>Bapak {userData.info.male.dad} & Ibu {userData.info.male.mom}</span>
                                                                </div>
                                                            </>
                                                        ) : userData.slideBride.type === 3 ? (
                                                            <>
                                                                <div className="my-6 flex items-center justify-center">
                                                                    <div className="animate_animated animate_fadeInLeft animate_slow mr-2 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                        <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.female} alt={userData.info.female.name} />
                                                                    </div>
                                                                    <div className="animate_animated animate_fadeInRight animate_slow ml-2 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                        <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.male} alt={userData.info.male.name} />
                                                                    </div>
                                                                </div>

                                                                <div className="animate_animated animate_fadeInRight animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.name}</div>
                                                                <div className="animate_animated animate_fadeInRight animate_slower mb-6 flex flex-col items-center justify-center">
                                                                    <span>Putri {userData.info.female.child} dari:</span>
                                                                    <span>Bapak {userData.info.female.dad} & Ibu {userData.info.female.mom}</span>
                                                                </div>

                                                                <div className="animate_animated animate_fadeInLeft animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                                <div className="animate_animated animate_fadeInLeft animate_slower flex flex-col items-center justify-center">
                                                                    <span>Putra {userData.info.male.child} dari:</span>
                                                                    <span>Bapak {userData.info.male.dad} & Ibu {userData.info.male.mom}</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="animate_animated animate_fadeInDown animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.female.name}</div>
                                                                <div className="animate_animated animate_fadeInLeft animate_slower flex flex-col items-center justify-center">
                                                                    <span>Putri {userData.info.female.child} dari:</span>
                                                                    <span>Bapak {userData.info.female.dad} & Ibu {userData.info.female.mom}</span>
                                                                </div>
                                                                <div className="my-6 flex items-center justify-center">
                                                                    <div className="animate_animated animate_fadeInLeft animate_slower mr-2 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                        <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.female} alt={userData.info.female.name} />
                                                                    </div>
                                                                    <div className="animate_animated animate_fadeInRight animate_slower ml-2 h-[200px] w-[150px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-lg border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                                        <img className="h-full w-full rounded-lg bg-white object-cover" src={userData.images.male} alt={userData.info.male.name} />
                                                                    </div>
                                                                </div>
                                                                <div className="animate_animated animate_fadeInUp animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                                <div className="animate_animated animate_fadeInRight animate_slower flex flex-col items-center justify-center">
                                                                    <span>Putra {userData.info.male.child} dari: </span>
                                                                    <span>Bapak {userData.info.male.dad} & Ibu {userData.info.male.mom}</span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="animate_animated animate_fadeIn animate_slower mb-5 h-[280px] w-full flex-shrink-0 flex-grow-0 overflow-hidden rounded-xl border-[4px] p-2 shadow-md" style={{ borderColor: `${userData.theme.colorMain}` }}>
                                                            <img className="h-full w-full rounded-xl object-cover" alt={userData.invitationType === 1 ? userData.info.male.name : userData.info.female.nameShort + " & " + userData.info.male.nameShort} src={userData.images.both} />
                                                        </div>
                                                        <div className="animate_animated animate_fadeInUp animate_slow mb-2 font-fontSecondary text-3xl" style={{ color: `${userData.theme.colorMain}` }}>{userData.info.male.name}</div>
                                                        <div className="animate_animated animate_fadeInUp animate_slower flex flex-col items-center justify-center">
                                                            <span>Putra {userData.info.male.child} dari: </span>
                                                            <span>Bapak {userData.info.male.dad} & Ibu {userData.info.male.mom}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 -z-10">
                                            {userData && userData.theme && (
                                                <>
                                                    {userData.theme.ornamentTop && (
                                                        <span className="animate_animated animate_fadeInTopLeft animate_slower absolute top-0 left-0 h-full w-1/2 bg-contain bg-left-top bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentTop})` }}></span>
                                                    )}

                                                    {userData.theme.ornamentBottom && (
                                                        <span className="animate_animated animate_fadeInBottomRight animate_slower absolute bottom-0 right-0 h-full w-1/2 bg-contain bg-right-bottom bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentBottom})` }}></span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {userData.slideDate.type !== 0 && (
                                    <div className="glide__slide layout_date text-center">
                                        <div className="mx-auto h-full max-w-xl">
                                            <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-['']">
                                                <div className="animate_animated animate_fadeInLeft animate_slower mb-6 text-center">
                                                    <div className="mb-2 font-fontSecondary text-3xl text-colorMain">Akad Nikah</div>
                                                    <div className="mb-1 font-medium">{getDate(userData.info.contract.date, 'day')}, {getDate(userData.info.contract.date, 'date')} {getDate(userData.info.contract.date, 'month')} {getDate(userData.info.contract.date, 'year')} - Pukul 08:10 s/d Selesai.</div>
                                                    <div className="italic">{userData.info.contract.address}</div>
                                                </div>
                                                <div className="animate_animated animate_fadeInRight animate_slower mb-8 text-center">
                                                    <div className="mb-2 font-fontSecondary text-3xl text-colorMain">Resepsi</div>
                                                    <div className="mb-1 font-medium">{getDate(userData.info.reception.date, 'day')}, {getDate(userData.info.reception.date, 'date')} {getDate(userData.info.reception.date, 'month')} {getDate(userData.info.reception.date, 'year')} - Pukul 10:00 WIB s/d Selesai.</div>
                                                    <div className="italic">{userData.info.reception.address}</div>
                                                </div>

                                                <CountDown date={getDate(userData.info.reception.date)} />

                                                <a href={`https://calendar.google.com/calendar/event?action=TEMPLATE&dates=${getDate(userData.info.reception.date)}00ID/${getDate(userData.info.reception.date)}00ID&text=Pernikahan {{nameFemaleShort}} dan {{nameMaleShort}}&details=Pernikahan {{nameFemaleShort}} dan {{nameMaleShort}}&location={{receptionLocation}}&recur=RRULE:FREQ%3DWEEKLY;INTERVAL%3D3`} target="_blank" className="animate_animated animate_fadeInUp animate_slower mt-8 rounded-full bg-colorMain py-2 px-4 text-colorBackground transition-shadow line-clamp-1 [animation-delay:calc(var(--animate-duration)*1)] hover:shadow-lg" rel="nofollow noopener noreferrer">Tambahkan Pengingat di Kalender</a>
                                            </div>
                                        </div>

                                        <div className="pointer-events-none absolute top-0 left-0 right-0 bottom-0 -z-10">
                                            {userData && userData.theme && (
                                                <>
                                                    {userData.theme.ornamentTop && (
                                                        <span className="animate_animated animate_fadeInTopLeft animate_slower absolute top-0 left-0 h-full w-1/2 bg-contain bg-left-top bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentTop})` }}></span>
                                                    )}

                                                    {userData.theme.ornamentBottom && (
                                                        <span className="animate_animated animate_fadeInBottomRight animate_slower absolute bottom-0 right-0 h-full w-1/2 bg-contain bg-right-bottom bg-no-repeat sm:w-[20%]" style={{ backgroundImage: `url(${userData.theme.ornamentBottom})` }}></span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div >
                    <div className="animate_kenburns fixed top-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${userData.theme.ornamentBackground})` }}></div>
                </>
            )}
        </>
    );
};

export default ids;