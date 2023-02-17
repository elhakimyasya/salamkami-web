/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";

import SlideCover1 from "../../components/slides/cover/1";
import SlideCover2 from "../../components/slides/cover/2";
import SlideCover3 from "../../components/slides/cover/3";
import SlideCover4 from "../../components/slides/cover/4";

const edit = () => {
    const router = useRouter();
    const pathQueryID = router.query.id;

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

    const setData = (keys, values) => {
        setDoc(doc(firestoreDatabase, 'web', pathQueryID), {
            slideCoverLayout: values
        }, {
            merge: true
        })
    };

    const ButtonEditSlide = ({ target }) => {
        const [activeTarget, setActiveTarget] = useState(null)

        const handleClick = () => {
            setActiveTarget(target);

            const elements = Array.from(document.querySelectorAll('.glide__slide'))

            elements.forEach(element => {
                if (element.id !== target.slice(1)) {
                    element.classList.remove('glide__slide--active');
                    element.classList.remove('hidden');
                }
            });

            document.querySelector(target).classList.toggle('glide__slide--active');
            document.querySelector(target).classList.toggle('hidden');
        };

        return (
            <button type="button" className="inline-flex p-2 mr-2 text-gray-500 hover:text-blue-600" onClick={handleClick} aria-label="Edit Slide" title="Edit Slide">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2" /></svg>
            </button>
        )
    };

    const InputToggle = ({ id, target, state }) => {
        const [isChecked, setIsChecked] = useState(true)

        const handleChange = (event) => {
            setIsChecked(event.target.checked)
        };

        return (
            <div className="flex flex-row items-center justify-center">
                {isChecked && <ButtonEditSlide target={target} />}

                <label htmlFor={id} className="relative inline-flex cursor-pointer items-center justify-center">
                    <input id={id} type="checkbox" value="" className="sr-only peer" onChange={handleChange} disabled={state === 'disabled' && true} defaultChecked={isChecked} />
                    <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
        )
    };

    const LayoutCover = () => {
        const [selectedLayout, setSelectedLayout] = useState(null)

        const handleChange = (event) => {
            setSelectedLayout(event.target.value);
            setData('slideCoverLayout', Number(event.target.value))
        };

        return (
            <>
                <div className="w-full p-4 border-t">
                    <label htmlFor="slide_cover_layout" className="block mb-2 text-sm font-medium text-gray-900 ">Pilih Layout</label>
                    <select id="slide_cover_layout" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleChange}>
                        <option disabled>Pilih Layout</option>
                        <option value="1">Layout 1</option>
                        <option value="2">Layout 2</option>
                        <option value="3">Layout 3</option>
                        <option value="4">Layout 4</option>
                    </select>
                </div>

                <div className="aspect-[9/16] overflow-hidden">
                    {selectedLayout === '1' ? (
                        <SlideCover1 colorMain={userData && userData.theme.colorMain} colorBackground={userData && userData.theme.colorBackground} ornamentTop={userData && userData.theme.ornamentTop} ornamentBottom={userData && userData.theme.ornamentBottom} />
                    ) : selectedLayout === '2' ? (
                        <SlideCover1 colorMain={userData && userData.theme.colorMain} colorBackground={userData && userData.theme.colorBackground} ornamentTop={userData && userData.theme.ornamentTop} ornamentBottom={userData && userData.theme.ornamentBottom} />
                    ) : selectedLayout === '3' ? (
                        <SlideCover1 colorMain={userData && userData.theme.colorMain} colorBackground={userData && userData.theme.colorBackground} ornamentTop={userData && userData.theme.ornamentTop} ornamentBottom={userData && userData.theme.ornamentBottom} />
                    ) : selectedLayout === '4' ? (
                        <SlideCover1 colorMain={userData && userData.theme.colorMain} colorBackground={userData && userData.theme.colorBackground} ornamentTop={userData && userData.theme.ornamentTop} ornamentBottom={userData && userData.theme.ornamentBottom} />
                    ) : (
                        <SlideCover1 colorMain={userData && userData.theme.colorMain} colorBackground={userData && userData.theme.colorBackground} ornamentTop={userData && userData.theme.ornamentTop} ornamentBottom={userData && userData.theme.ornamentBottom} />
                    )}
                </div>
            </>
        )
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <form>
                <h2 className="font-bold text-lg mb-4 pb-2 w-full line-clamp-1 border-b">Informasi Mempelai Pria</h2>
                <div className="mb-4">
                    <label htmlFor="input_male_name" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                    <input type="text" id="input_male_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Lengkap Mempelai Pria" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="input_male_name_short" className="block mb-2 text-sm font-medium text-gray-900">Nama Panggilan</label>
                    <input type="text" id="input_male_name_short" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Panggilan Mempelai Pria" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="input_male_name_father" className="block mb-2 text-sm font-medium text-gray-900">Nama Ayah</label>
                    <input type="text" id="input_male_name_father" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Ayah Mempelai Pria" required />
                </div>
                <div className="mb-8">
                    <label htmlFor="input_male_name_mother" className="block mb-2 text-sm font-medium text-gray-900">Nama Ibu</label>
                    <input type="text" id="input_male_name_mother" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Ibu Mempelai Pria" required />
                </div>

                <h2 className="font-bold text-lg mb-4 pb-2 w-full line-clamp-1 border-b">Informasi Mempelai Wanita</h2>
                <div className="mb-4">
                    <label htmlFor="input_female_name" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                    <input type="text" id="input_female_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Lengkap Mempelai Wanita" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="input_female_name_short" className="block mb-2 text-sm font-medium text-gray-900">Nama Panggilan</label>
                    <input type="text" id="input_female_name_short" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Panggilan Mempelai Wanita" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="input_female_name_father" className="block mb-2 text-sm font-medium text-gray-900">Nama Ayah</label>
                    <input type="text" id="input_female_name_father" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Ayah Mempelai Wanita" required />
                </div>
                <div className="mb-8">
                    <label htmlFor="input_female_name_mother" className="block mb-2 text-sm font-medium text-gray-900">Nama Ibu</label>
                    <input type="text" id="input_female_name_mother" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Ibu Mempelai Wanita" required />
                </div>

                <h2 className="font-bold text-lg mb-4 pb-2 w-full line-clamp-1 border-b">Informasi Acara Akad Nikah</h2>
                <div className="mb-4">
                    <label htmlFor="input_contract_datetime" className="block mb-2 text-sm font-medium text-gray-900">Waktu, Hari & Tanggal</label>
                    <input type="text" id="input_contract_datetime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Waktu, Hari & Tanggal Akad Nikah" required />
                </div>
                <div className="mb-8">
                    <label htmlFor="input_contract_address" className="block mb-2 text-sm font-medium text-gray-900">Alamat Lengkap</label>
                    <textarea id="input_contract_address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Alamat Lengkap Akad Nikah" required ></textarea>
                </div>

                <h2 className="font-bold text-lg mb-4 pb-2 w-full line-clamp-1 border-b">Informasi Acara Resepsi/Ngunduh Mantu</h2>
                <div className="mb-4">
                    <label htmlFor="input_contract_datetime" className="block mb-2 text-sm font-medium text-gray-900">Waktu, Hari & Tanggal</label>
                    <input type="text" id="input_contract_datetime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Waktu, Hari & Tanggal Akad Nikah" required />
                </div>
                <div className="mb-8">
                    <label htmlFor="input_contract_address" className="block mb-2 text-sm font-medium text-gray-900">Alamat Lengkap</label>
                    <textarea id="input_contract_address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Alamat Lengkap Akad Nikah" required ></textarea>
                </div>
            </form>

            
            {/* Cover */}
            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border">
                <div className="flex w-full select-none flex-row items-center justify-between py-2 px-3">
                    <button type="button" className="mr-2 inline-flex cursor-not-allowed p-2 text-gray-400" aria-label="Urutkan" title="Urutkan">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                    </button>

                    <span className="w-full line-clamp-1">Slide Cover</span>

                    <InputToggle id="input_toggle_cover" target='#slide_cover_preview' state='disabled' />
                </div>
                <div id="slide_cover_preview" className="hidden w-full">
                    <LayoutCover />
                </div>
            </div>



            {/* <div className="fixed inset-0 z-50 w-full p-4 justify-center items-center flex">
                <div className="relative w-full max-w-2xl max-h-screen">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between pl-6 pr-4 py-3 border-b rounded-t select-none">
                            <h2 className="text-lg font-semibold text-gray-900">Edit Slide</h2>
                            <div className="flex items-center justify-center flex-row">
                                <button type="button" className="inline-flex p-2 text-gray-500 hover:text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-6 overflow-x-hidden overflow-y-auto max-h-[80vh]">
                            <p>
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p>
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                            <p>
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                            <p>
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                            <p>
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                            <p>
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div> */}

            {/* Opening */}
            <div className="flex flex-col items-center justify-center border rounded-lg w-full mb-3">
                <div className="py-2 px-3 select-none flex items-center justify-betewen flex-row w-full">
                    <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-600" aria-label="Urutkan" title="Urutkan">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                    </button>
                    <span className="w-full line-clamp-1">Slide Opening</span>

                    <InputToggle id="input_toggle_opening" target='#slide_opening_preview' state='enabled' />
                </div>
                <div id="slide_opening_preview" className="hidden mb-3 w-full">
                    <LayoutCover />
                </div>
            </div>

            {/* Love Story */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Love Story</span>
                <label htmlFor="input_toggle_love_story" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_love_story" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Bride */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Bride</span>
                <label htmlFor="input_toggle_bride" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_bride" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Date */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Date</span>
                <label htmlFor="input_toggle_date" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_date" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Maps */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Maps</span>
                <label htmlFor="input_toggle_maps" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_maps" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Gallery */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Gallery</span>
                <label htmlFor="input_toggle_gallery" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_gallery" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Gift */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Gift</span>
                <label htmlFor="input_toggle_gift" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_gift" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* RSVP */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide RSVP</span>
                <label htmlFor="input_toggle_rsvp" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_rsvp" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Protocol */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Protocol</span>
                <label htmlFor="input_toggle_protocol" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_protocol" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Quotes */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Quotes</span>
                <label htmlFor="input_toggle_quotes" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_quotes" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Closing */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Closing</span>
                <label htmlFor="input_toggle_closing" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_closing" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
            {/* Partners */}
            <div className="py-2 px-3 border rounded-lg select-none flex items-center justify-betewen flex-row mb-3">
                <button type="button" className="inline-flex p-2 cursor-move mr-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                </button>
                <span className="w-full">Slide Partners</span>
                <label htmlFor="input_toggle_partners" className="relative inline-flex items-center cursor-pointer justify-center">
                    <input id="input_toggle_partners" type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="sr-only">Enable/Disable</span>
                </label>
            </div>
        </div >
    );
}

export default edit;