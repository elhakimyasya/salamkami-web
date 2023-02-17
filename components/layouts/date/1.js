import React, { useEffect, useState } from "react";
import Themes from "../../../public/themes.json"
import Link from "next/link";
import Ornaments from "../Ornaments";


const Date1 = ({ item, children }) => {
    const getDate = (data, request) => {
        const date = new Date(data);

        if (request === 'day') {
            const options = {
                weekday: 'long'
            };
            return date.toLocaleDateString('ID', options);
        } else if (request === 'date') {
            const options = {
                day: '2-digit',
            };
            return date.toLocaleDateString('ID', options);
        } else if (request === 'month') {
            const options = {
                month: 'long'
            };
            return date.toLocaleDateString('ID', options);
        } else if (request === 'month-digit') {
            const options = {
                month: '2-digit'
            };
            return date.toLocaleDateString('ID', options);
        } else if (request === 'year') {
            return date.getFullYear();
        } else if (request === 'hour') {
            return date.getHours().toString().padStart(2, '0');;
        } else if (request === 'minute') {
            return date.getMinutes().toString().padStart(2, '0');;
        } else {
            return date;
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
                <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-md border p-1" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                        <div className="number text-2xl font-bold">{countdown.days}</div>
                        <div className="text-xs">Hari</div>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-md border p-1 [animation-delay:calc(var(--animate-duration)*.25)]" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                        <div className="number text-2xl font-bold">{countdown.hours}</div>
                        <div className="text-xs">Jam</div>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-md border p-1 [animation-delay:calc(var(--animate-duration)*.5)]" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                        <div className="number text-2xl font-bold">{countdown.minutes}</div>
                        <div className="text-xs">Menit</div>
                    </div>
                    <div className="animate_animated animate_fadeInUp animate_slower w-full rounded-md border p-1 [animation-delay:calc(var(--animate-duration)*.75)]" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, borderColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>
                        <div className="number text-2xl font-bold">{countdown.seconds}</div>
                        <div className="text-xs">Detik</div>
                    </div>
                </div>
            </div>
        );
    };

    const getDateString = (date) => {
        return `${getDate(date, 'day')}, ${getDate(date, 'date')} ${getDate(date, 'month')} ${getDate(date, 'year')} - Pukul ${getDate(date, 'hour')}:${getDate(date, 'minute')} s/d Selesai.`
    };

    const getDateCalendar = (date) => {
        return `${getDate(date, 'year')}${getDate(date, 'month-digit')}${getDate(date, 'date')}T${getDate(date, 'hour')}${getDate(date, 'minute')}`
    };

    const dateContract = item.invitationData ? item.invitationData.contract.dateTime : new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const dateReception = item.invitationData ? item.invitationData.reception.dateTime : new Date(Date.now() + 10 * 24 * 60 * 60 * 2000).toISOString().slice(0, 16);

    return (
        <div className="glide__slide layout_cover text-center">
            <div className="mx-auto h-full max-w-xl">
                <div className="no-scrollbar flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-5 before:m-auto before:content-[''] after:m-auto after:content-[''] ">
                    {item.invitationCategory !== 3 && (
                        <div className="animate_animated animate_fadeInLeft animate_slower mb-6 text-center">
                            <div className="mb-2 font-fontSecondary text-3xl" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>Akad Nikah</div>
                            <div className="mb-2 text-sm font-medium">
                                {getDateString(dateContract)}
                            </div>

                            <div className="text-sm italic">{item.invitationData ? item.invitationData.contract.address : "Alamat Lengkap Acara Akad Nikah"}</div>
                        </div>
                    )}
                    <div className="animate_animated animate_fadeInRight animate_slower mb-8 text-center">
                        <div className="mb-2 font-fontSecondary text-3xl" style={{ color: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain }}>{item.invitationCategory !== 3 ? "Resepsi" : "Tasyakuran Aqiqah"}</div>
                        <div className="mb-2 text-sm font-medium">
                            {getDateString(dateReception)}
                        </div>
                        <div className="text-sm italic">{item.invitationData ? item.invitationData.reception.address : "Alamat Lengkap Acara Resepsi"}</div>
                    </div>

                    <CountDown date={getDate(item.invitationData ? item.invitationData.reception.dateTime : new Date(Date.now() + 10 * 24 * 60 * 60 * 2000).toISOString().slice(0, 16))} />

                    <Link href={`https://calendar.google.com/calendar/event?action=TEMPLATE&dates=${getDateCalendar(dateReception)}00ID/${getDateCalendar(dateReception)}00ID&text=Pernikahan ${item.invitationData ? `${item.invitationData.female.nameShort} dan ${item.invitationData.male.nameShort}` : "Azrina dan Fariz"}&details=Pernikahan ${item.invitationData ? `${item.invitationData.female.nameShort} dan ${item.invitationData.male.nameShort}` : "Azrina dan Fariz"}&location=${item.invitationData ? item.invitationData.reception.address : "Alamat Lengkap Acara"}&recur=RRULE:FREQ%3DWEEKLY;INTERVAL%3D3`} target="_blank" className="animate_animated animate_fadeInUp animate_slower mt-8 rounded-full py-2 px-4 transition-shadow line-clamp-1 [animation-delay:calc(var(--animate-duration)*1)] hover:shadow text-sm line-clamp-1" rel="nofollow noopener noreferrer" style={{ backgroundColor: item.invitationTheme ? Themes[item.invitationTheme].colorMain : Themes[1].colorMain, color: item.invitationTheme ? Themes[item.invitationTheme].colorBackground : Themes[1].colorBackground }}>Tambahkan Pengingat di Kalender</Link>
                </div>
            </div>

            <Ornaments item={item} />
        </div>
    );
}

export default Date1;