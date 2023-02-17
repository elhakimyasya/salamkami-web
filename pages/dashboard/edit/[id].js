/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import Navbar from "../../../components/Navbar";
import Auth from "../../../components/Auth";
import Themes from "../../../public/themes.json"
import Cover1 from "../../../components/layouts/cover/1";
import Opening1 from "../../../components/layouts/opening/1";
import Bride1 from "../../../components/layouts/bride/1";
import Date1 from "../../../components/layouts/date/1";
import Closing1 from "../../../components/layouts/closing/1";

const edit = () => {
    const router = useRouter();
    const routerValue = router.query.id;
    const [firstRender, setFirstRender] = useState(true);

    if (firstRender) {
        // Initialize Firebase
        initializeApp({
            apiKey: "AIzaSyAHOv64OFwobOVReOdO7I0FDn14ALio4Sk",
            authDomain: "salamkami-website.firebaseapp.com",
            projectId: "salamkami-website",
            storageBucket: "salamkami-website.appspot.com",
            messagingSenderId: "710379476608",
            appId: "1:710379476608:web:9463f2d56ca7690f0eb865"
        });

        setFirstRender(false);
    };

    const firestoreDatabase = getFirestore();

    const InvitationData = ({ userData }) => {
        const [invitationData, setInvitationData] = useState([]);
        const [isInvitationLoaded, setInvitationLoaded] = useState(null);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setInvitationLoaded(false);

            const unsubscribe = onSnapshot(doc(firestoreDatabase, `invitation/${routerValue}`), (doc) => {
                let dataArray = [];
                if (doc.exists && doc.data() && Object.keys(doc.data()).length > 0 && doc.data().invitationUserUID === userData.uid) {
                    dataArray.push({
                        id: doc.id,
                        ...doc.data()
                    });

                    setInvitationData(dataArray)
                } else {
                    router.push("/dashboard")
                };

                setInvitationLoaded(true);

                !doc.metadata.hasPendingWrites && unsubscribe();
            });

            return () => unsubscribe()
        }, [userData]);

        if (isInvitationLoaded === null) {
            return (
                <Loader />
            );
        };

        const submitForm = async (event) => {
            event.preventDefault();

            if (!loading) {
                setLoading(true);

                const formData = new FormData(event.target);
                const formValues = {};

                // loop through each input and add its value to the `values` object
                for (let pair of formData.entries()) {
                    formValues[pair[0]] = pair[1];
                };

                const documentReference = doc(firestoreDatabase, "invitation", routerValue)
                await setDoc(documentReference, {
                    invitationData: {
                        male: {
                            name: formValues.inputInvitationNameMale,
                            nameShort: formValues.inputInvitationNameMaleShort,
                            nameFather: formValues.inputInvitationNameMaleFather,
                            nameMother: formValues.inputInvitationNameMaleMother,
                            child: formValues.inputInvitationMaleChild ? formValues.inputInvitationMaleChild : "",
                        },
                        female: {
                            name: formValues.inputInvitationNameFemale ? formValues.inputInvitationNameFemale : "",
                            nameShort: formValues.inputInvitationNameFemaleShort ? formValues.inputInvitationNameFemaleShort : "",
                            nameFather: formValues.inputInvitationNameFemaleFather ? formValues.inputInvitationNameFemaleFather : "",
                            nameMother: formValues.inputInvitationNameFemaleMother ? formValues.inputInvitationNameFemaleMother : "",
                            child: formValues.inputInvitationFemaleChild ? formValues.inputInvitationFemaleChild : "",
                        },
                        contract: {
                            dateTime: formValues.inputInvitationContractDate ? formValues.inputInvitationContractDate : "",
                            address: formValues.inputInvitationContractAddress ? formValues.inputInvitationContractAddress : "",
                        },
                        reception: {
                            dateTime: formValues.inputInvitationReceptionDate,
                            address: formValues.inputInvitationReceptionAddress,
                            maps: formValues.inputInvitationReceptionMaps ? formValues.inputInvitationReceptionMaps : ""
                        }
                    }
                }, {
                    merge: true
                }).then(() => {
                    const unsubscribe = onSnapshot(documentReference, (doc) => {
                        let dataArray = [];

                        dataArray.push({
                            ...doc.data()
                        });

                        setInvitationData(dataArray);

                        !doc.metadata.hasPendingWrites && unsubscribe();
                    });

                    setLoading(false);

                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    return () => unsubscribe()
                }).catch((error) => {
                    console.log(error)
                });
            }
        };



        return (
            <>

                {isInvitationLoaded && (
                    invitationData.map((item) => (
                        <div key={item.id} className="w-full">
                            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border hover:shadow transition-shadow">
                                <div className="flex w-full select-none flex-row items-center justify-between py-2 pl-2 pr-3">
                                    <button type="button" className="mr-2 inline-flex cursor-move p-2 text-gray-400 hover:text-gray-600" aria-label="Urutkan" title="Urutkan">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                                    </button>

                                    <span className="w-full line-clamp-1">Slide Cover</span>

                                    <div className="flex flex-row items-center justify-center">
                                        <label htmlFor="iii" className="relative inline-flex cursor-pointer items-center justify-center">
                                            <input id="iii" type="checkbox" defaultValue="" className="sr-only peer" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="sr-only">Enable/Disable</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full border-t">
                                    <div className="max-w-sm mx-auto overflow-hidden">
                                        <Cover1 item={item} className="aspect-[9/18] " />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border hover:shadow transition-shadow">
                                <div className="flex w-full select-none flex-row items-center justify-between py-2 pl-2 pr-3">
                                    <button type="button" className="mr-2 inline-flex cursor-move p-2 text-gray-400 hover:text-gray-600" aria-label="Urutkan" title="Urutkan">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                                    </button>

                                    <span className="w-full line-clamp-1">Slide Opening</span>

                                    <div className="flex flex-row items-center justify-center">
                                        <label htmlFor="iii" className="relative inline-flex cursor-pointer items-center justify-center">
                                            <input id="iii" type="checkbox" defaultValue="" className="sr-only peer" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="sr-only">Enable/Disable</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full border-t">
                                    <div className="max-w-sm mx-auto overflow-hidden">
                                        <Opening1 item={item} className="aspect-[9/18] " />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border hover:shadow transition-shadow">
                                <div className="flex w-full select-none flex-row items-center justify-between py-2 pl-2 pr-3">
                                    <button type="button" className="mr-2 inline-flex cursor-move p-2 text-gray-400 hover:text-gray-600" aria-label="Urutkan" title="Urutkan">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                                    </button>

                                    <span className="w-full line-clamp-1">Slide Bride & Groom</span>

                                    <div className="flex flex-row items-center justify-center">
                                        <label htmlFor="iii" className="relative inline-flex cursor-pointer items-center justify-center">
                                            <input id="iii" type="checkbox" defaultValue="" className="sr-only peer" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="sr-only">Enable/Disable</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full border-t">
                                    <div className="max-w-sm mx-auto overflow-hidden">
                                        <Bride1 item={item} className="aspect-[9/18] " />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border hover:shadow transition-shadow">
                                <div className="flex w-full select-none flex-row items-center justify-between py-2 pl-2 pr-3">
                                    <button type="button" className="mr-2 inline-flex cursor-move p-2 text-gray-400 hover:text-gray-600" aria-label="Urutkan" title="Urutkan">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                                    </button>

                                    <span className="w-full line-clamp-1">Slide Date</span>

                                    <div className="flex flex-row items-center justify-center">
                                        <label htmlFor="iii" className="relative inline-flex cursor-pointer items-center justify-center">
                                            <input id="iii" type="checkbox" defaultValue="" className="sr-only peer" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="sr-only">Enable/Disable</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full border-t">
                                    <div className="max-w-sm mx-auto overflow-hidden">
                                        <Date1 item={item} className="aspect-[9/18] " />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border hover:shadow transition-shadow">
                                <div className="flex w-full select-none flex-row items-center justify-between py-2 pl-2 pr-3">
                                    <button type="button" className="mr-2 inline-flex cursor-move p-2 text-gray-400 hover:text-gray-600" aria-label="Urutkan" title="Urutkan">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                                    </button>

                                    <span className="w-full line-clamp-1">Slide Closing</span>

                                    <div className="flex flex-row items-center justify-center">
                                        <label htmlFor="iii" className="relative inline-flex cursor-pointer items-center justify-center">
                                            <input id="iii" type="checkbox" defaultValue="" className="sr-only peer" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="sr-only">Enable/Disable</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-full border-t">
                                    <div className="max-w-sm mx-auto overflow-hidden">
                                        <Closing1 item={item} className="aspect-[9/18] " />
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={submitForm}>
                                <h2 className="border-b font-medium text-lg pb-2 mb-4">{item.invitationCategory === 3 ? "Informasi Dasar" : "Informasi Mempelai Pria"}</h2>
                                <div className="mb-4 w-full">
                                    <label htmlFor="input_invitation_male_name" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Lengkap <span className="text-red-600">*</span></label>
                                    <input type="text" id="input_invitation_male_name" name="inputInvitationNameMale" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={item.invitationCategory === 3 ? "Nama Lengkap Anak" : "Nama Lengkap Mempelai Pria"} required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.male.name : ""} />
                                </div>
                                <div className="mb-4 w-full">
                                    <label htmlFor="input_invitation_male_name_short" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Panggilan <span className="text-red-600">*</span></label>
                                    <input type="text" id="input_invitation_male_name_short" name="inputInvitationNameMaleShort" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={item.invitationCategory === 3 ? "Nama Panggilan Anak" : "Nama Panggilan Mempelai Pria"} required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.male.nameShort : ""} />
                                </div>
                                <div className="mb-4 w-full">
                                    <label htmlFor="input_invitation_male_child" className="block mb-1 text-sm font-medium text-gray-600 select-none">Anak Ke (Opsional)</label>
                                    <select id="input_invitation_male_child" name="inputInvitationMaleChild" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Anak Ke" autoComplete="off" defaultValue={item.invitationData ? item.invitationData.male.child : ""}>
                                        <option disabled>Anak Ke</option>
                                        <option value=" ">Kosongkan</option>
                                        <option value="Pertama">Pertama</option>
                                        <option value="Kedua">Kedua</option>
                                        <option value="Ketiga">Ketiga</option>
                                        <option value="Keempat">Keempat</option>
                                        <option value="Kelima">Kelima</option>
                                        <option value="Keenam">Keenam</option>
                                        <option value="Ketujuh">Ketujuh</option>
                                        <option value="Kedelapan">Kedelapan</option>
                                        <option value="Kesembilan">Kesembilan</option>
                                        <option value="Kesepuluh">Kesepuluh</option>
                                    </select>
                                </div>
                                <div className="mb-4 w-full">
                                    <label htmlFor="input_invitation_male_name_father" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Ayah <span className="text-red-600">*</span></label>
                                    <input type="text" id="input_invitation_male_name_father" name="inputInvitationNameMaleFather" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={item.invitationCategory === 3 ? "Nama Ayah" : "Nama Ayah Mempelai Pria"} required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.male.nameFather : ""} />
                                </div>
                                <div className="mb-8 w-full">
                                    <label htmlFor="input_invitation_male_name_mother" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Ibu <span className="text-red-600">*</span></label>
                                    <input type="text" id="input_invitation_male_name_mother" name="inputInvitationNameMaleMother" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={item.invitationCategory === 3 ? "Nama Ibu" : "Nama Ibu Mempelai Pria"} required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.male.nameMother : ""} />
                                </div>

                                {item.invitationCategory !== 3 && (
                                    <>
                                        <h2 className="border-b font-medium text-lg pb-2 mb-4">Informasi Mempelai Wanita</h2>
                                        <div className="mb-4 w-full">
                                            <label htmlFor="input_invitation_female_name" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Lengkap <span className="text-red-600">*</span></label>
                                            <input type="text" id="input_invitation_female_name" name="inputInvitationNameFemale" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Nama Lengkap Mempelai Wanita" required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.female.name : ""} />
                                        </div>
                                        <div className="mb-4 w-full">
                                            <label htmlFor="input_invitation_female_name_short" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Panggilan <span className="text-red-600">*</span></label>
                                            <input type="text" id="input_invitation_female_name_short" name="inputInvitationNameFemaleShort" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Nama Panggilan Mempelai Wanita" required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.female.nameShort : ""} />
                                        </div>
                                        <div className="mb-4 w-full">
                                            <label htmlFor="input_invitation_female_child" className="block mb-1 text-sm font-medium text-gray-600 select-none">Anak Ke (Opsional)</label>
                                            <select id="input_invitation_female_child" name="inputInvitationFemaleChild" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Anak Ke" autoComplete="off" defaultValue={item.invitationData ? item.invitationData.female.child : ""}>
                                                <option disabled>Anak Ke</option>
                                                <option value=" ">Kosongkan</option>
                                                <option value="Pertama">Pertama</option>
                                                <option value="Kedua">Kedua</option>
                                                <option value="Ketiga">Ketiga</option>
                                                <option value="Keempat">Keempat</option>
                                                <option value="Kelima">Kelima</option>
                                                <option value="Keenam">Keenam</option>
                                                <option value="Ketujuh">Ketujuh</option>
                                                <option value="Kedelapan">Kedelapan</option>
                                                <option value="Kesembilan">Kesembilan</option>
                                                <option value="Kesepuluh">Kesepuluh</option>
                                            </select>
                                        </div>
                                        <div className="mb-4 w-full">
                                            <label htmlFor="input_invitation_female_name_father" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Ayah <span className="text-red-600">*</span></label>
                                            <input type="text" id="input_invitation_female_name_father" name="inputInvitationNameFemaleFather" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Nama Ayah Mempelai Wanita" required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.female.nameFather : ""} />
                                        </div>
                                        <div className="mb-8 w-full">
                                            <label htmlFor="input_invitation_female_name_mother" className="block mb-1 text-sm font-medium text-gray-600 select-none">Nama Ibu <span className="text-red-600">*</span></label>
                                            <input type="text" id="input_invitation_female_name_mother" name="inputInvitationNameFemaleMother" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Nama Ibu Mempelai Wanita" required autoComplete="off" defaultValue={item.invitationData ? item.invitationData.female.nameMother : ""} />
                                        </div>

                                        <h2 className="border-b font-medium text-lg pb-2 mb-4">Informasi Acara Akad Nikah</h2>
                                        <div className="mb-4 w-full">
                                            <label htmlFor="input_invitation_contract_date" className="block mb-1 text-sm font-medium text-gray-600 select-none">Tanggal Acara <span className="text-red-600">*</span></label>
                                            <input type="datetime-local" id="input_invitation_contract_date" name="inputInvitationContractDate" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required autoComplete="off" min={new Date().toISOString().slice(0, 16)} max={(new Date().getFullYear() + 10) + '-12-31T23:59'} defaultValue={item.invitationData ? item.invitationData.contract.dateTime : new Date().toISOString().slice(0, 16)} />
                                            <p className="mt-2 text-xs text-gray-500">Format: BULAN / TANGGAL / TAHUN, JAM : MENIT .</p>
                                        </div>
                                        <div className="mb-8 w-full">
                                            <label htmlFor="input_invitation_contract_address" className="block mb-1 text-sm font-medium text-gray-600 select-none">Alamat Lengkap Acara <span className="text-red-600">*</span></label>
                                            <textarea id="input_invitation_contract_address" name="inputInvitationContractAddress" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Alamat Lengkap Acara Akad Nikah" required defaultValue={item.invitationData ? item.invitationData.contract.address : ""}></textarea>
                                        </div>
                                    </>
                                )}

                                <h2 className="border-b font-medium text-lg pb-2 mb-4">Informasi Acara {item.invitationCategory === 3 ? "Aqiqah" : item.invitationCategory === 2 ? "Ngunduh Mantu" : "Resepsi"}</h2>

                                <div className="mb-4 w-full">
                                    <label htmlFor="input_invitation_reception_date" className="block mb-1 text-sm font-medium text-gray-600 select-none">Tanggal Acara <span className="text-red-600">*</span></label>
                                    <input type="datetime-local" id="input_invitation_reception_date" name="inputInvitationReceptionDate" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required autoComplete="off" min={new Date().toISOString().slice(0, 16)} max={(new Date().getFullYear() + 10) + '-12-31T23:59'} defaultValue={item.invitationData ? item.invitationData.reception.dateTime : new Date().toISOString().slice(0, 16)} />
                                    <p className="mt-2 text-xs text-gray-500">Format: BULAN / TANGGAL / TAHUN, JAM : MENIT.</p>
                                </div>
                                <div className="mb-4 w-full">
                                    <label htmlFor="input_invitation_reception_address" className="block mb-1 text-sm font-medium text-gray-600 select-none">Alamat Lengkap Acara <span className="text-red-600">*</span></label>
                                    <textarea id="input_invitation_reception_address" name="inputInvitationReceptionAddress" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={item.invitationCategory === 3 ? "Alamat Lengkap Acara Aqiqah" : item.invitationCategory === 2 ? "Alamat Lengkap Acara Ngunduh Mantu" : "Alamat Lengkap Acara Resepsi"} required defaultValue={item.invitationData ? item.invitationData.reception.address : ""}></textarea>
                                </div>
                                <div className="mb-8 w-full">
                                    <label htmlFor="input_invitation_reception_maps" className="block mb-1 text-sm font-medium text-gray-600 select-none">Drop Point Lokasi Acara</label>
                                    <input type="text" id="input_invitation_reception_maps" name="inputInvitationReceptionMaps" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Drop Point Lokasi Acara / URL Google Maps" autoComplete="off" defaultValue={item.invitationData ? item.invitationData.reception.maps : ""} />
                                    <p className="mt-2 text-xs text-gray-500">Jika tidak diisi, maka Slide Maps tidak akan ditampilkan.</p>
                                </div>

                                <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center">
                                    <button className="w-full p-2.5 text-center focus:ring-2 focus:ring-blue-400 bg-blue-500 text-white rounded-md border border-blue-500 font-medium text-sm line-clamp-1" type="submit">
                                        {loading ? (<>Menyimpan Undangan...</>) : (<>Simpan</>)}
                                    </button>
                                </div>
                            </form>


                            {/* 


                            <div className="w-full grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                                <div className="border py-3 px-4 rounded-md flex items-center justify-center flex-col select-none hover:shadow transition-shadow cursor-pointer text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" className="mb-1"><path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z" /></svg>
                                    <span className="line-clamp-1 text-sm font-medium">Tema</span>
                                </div>
                                <div className="border py-3 px-4 rounded-md flex items-center justify-center flex-col select-none hover:shadow transition-shadow cursor-pointer text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" className="mb-1"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
                                    <span className="line-clamp-1 text-sm font-medium">Pengaturan</span>
                                </div>
                                <div className="border py-3 px-4 rounded-md flex items-center justify-center flex-col select-none hover:shadow transition-shadow cursor-pointer text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" className="mb-1"><path d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z" /></svg>
                                    <span className="line-clamp-1 text-sm font-medium">Musik</span>
                                </div>
                            </div>

                            <div className="mb-3 flex w-full flex-col items-center justify-center rounded-lg border hover:shadow transition-shadow">
                                <div className="flex w-full select-none flex-row items-center justify-between py-2 pl-2 pr-3">
                                    <button type="button" className="mr-2 inline-flex cursor-not-allowed p-2 text-gray-400" aria-label="Urutkan" title="Urutkan">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" /></svg>
                                    </button>

                                    <span className="w-full line-clamp-1">Slide Cover 1</span>

                                    <div className="flex flex-row items-center justify-center">
                                        <label htmlFor="iii" className="relative inline-flex cursor-pointer items-center justify-center">
                                            <input id="iii" type="checkbox" defaultValue="" className="sr-only peer" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-400 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="sr-only">Enable/Disable</span>
                                         <span className="text-red-600">*</span></label>
                                    </div>
                                </div>
                                <div id="slide_cover_preview" className="hidden w-full">
                                </div>
                            </div> */}
                        </div>
                    ))
                )}
            </>
        )
    };

    const handleUserData = (userData) => {
        return (
            <>
                <Navbar userData={userData} />
                <div className="max-w-3xl mx-auto px-4 py-6 pt-20">
                    <InvitationData userData={userData} />
                </div>
            </>
        )
    };

    return (
        <>
            <Head>
                <title>Edit Undangan | SalamKami</title>
            </Head>

            <Auth onUserData={handleUserData} />
        </>
    );
}

export default edit;