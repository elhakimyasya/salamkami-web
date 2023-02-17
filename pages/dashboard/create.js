/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Auth from "../../components/Auth";
import ThemeData from "../../public/themes.json"

const create = () => {
    const router = useRouter();
    const queryThemeID = router.query.theme;

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

    const InputForm = ({ userData }) => {
        const [loading, setLoading] = useState(false);
        const [inputInvitationURL, setInputInvitationURL] = useState('');
        const [inputInvitationTitle, setInputInvitationTitle] = useState('');
        const [inputInvitationCategory, setInputInvitationCategory] = useState(1);
        const [isExist, setIsExist] = useState(false);

        const submitForm = async (event) => {
            event.preventDefault();

            if (!loading) {
                setLoading(true);

                const documentReference = doc(firestoreDatabase, "invitation", inputInvitationURL);
                const documentSnapshot = await getDoc(documentReference);

                if (!documentSnapshot.exists()) {
                    await setDoc(documentReference, {
                        invitationCategory: parseInt(inputInvitationCategory),
                        invitationCreated: serverTimestamp(),
                        invitationTheme: queryThemeID ? queryThemeID : 1,
                        invitationTitle: inputInvitationTitle,
                        invitationUserUID: userData,
                    }).then(() => {
                        router.push('/dashboard')
                    });

                    setIsExist(false);
                } else {
                    setIsExist(true);
                };

                setLoading(false)
            }
        };

        return (
            <form onSubmit={submitForm}>
                <div className="mb-4 w-full">
                    <label htmlFor="input_invitation_category" className="block mb-1 text-sm font-medium text-gray-600">Kategori Undangan <span className="text-red-600">*</span></label>
                    <select id="input_invitation_category" className="border bg-transparent text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer" required value={inputInvitationCategory} onChange={(event) => setInputInvitationCategory(event.target.value)}>
                        <option defaultValue disabled>Pilih Kategori Undangan</option>
                        <option value="1">Undangan Pernikahan (Resepsi)</option>
                        <option value="2">Undangan Pernikahan (Ngunduh Mantu)</option>
                        <option value="3">Undangan Tasyakuran Aqiqah</option>
                    </select>
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="input_invitation_title" className="block mb-1 text-sm font-medium text-gray-600">Judul Undangan</label>
                    <input type="text" id="input_invitation_title" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Judul Undangan Kamu" required value={inputInvitationTitle} onChange={(event) => setInputInvitationTitle(event.target.value)} autoComplete="off" />
                    <p className="mt-2 text-xs text-gray-500">Contoh: <code>`Undangan Pernikahan Aku dan Kamu`</code>.</p>
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="input_invitation_url" className="block mb-1 text-sm font-medium text-gray-600">URL Undangan <span className="text-red-600">*</span></label>
                    <div className="flex items-center justify-start flex-row">
                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-200 h-full p-2.5 rounded-l-md border">undangan.salamkami.com/</span>
                        <input type="text" id="input_invitation_url" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="url-undangan-kamu" required value={inputInvitationURL} onChange={(event) => {
                            let value = event.target.value;
                            value = value.toLowerCase().replace(/\s+/g, '-');
                            setInputInvitationURL(value.replace(/[^\w-]+/g, ''));
                        }} autoComplete="off" />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Contoh: <code>`aku-dan-kamu`</code>.</p>
                    {isExist && <p className="mt-2 text-sm text-red-600">URL Undangan yang kamu buat sudah ada yang menggunakan.</p>}
                </div>

                <div className="w-full mt-4 flex flex-col-reverse md:flex-row items-center justify-center">
                    <Link href="/dashboard" className="w-full md:w-auto flex-shrink-0 flex-grow-0 py-2.5 px-4 mt-2 mr-0 md:mt-0 md:mr-2 text-center focus:ring-2 focus:ring-gray-400 bg-gray-600 text-white rounded-md border border-gray-600 font-medium text-sm line-clamp-1">Batalkan</Link>
                    <button className="w-full p-2.5 text-center focus:ring-2 focus:ring-blue-400 bg-blue-500 text-white rounded-md border border-blue-500 font-medium text-sm line-clamp-1" type="submit">
                        {loading ? (<>Membuat Undangan...</>) : (<>Buat Undangan</>)}
                    </button>
                </div>
            </form>
        );
    };

    const handleUserData = (userData) => {
        return (
            <>
                <Navbar userData={userData} />

                <div className="max-w-3xl mx-auto px-4 py-6 md:pt-24 pt-20">
                    <InputForm userData={userData.uid} />
                </div>
            </>
        )
    };

    return (
        <>
            <Head>
                <title>Buat Undangan | SalamKami</title>
            </Head>

            <Auth onUserData={handleUserData} />
        </>
    );
}

export default create;