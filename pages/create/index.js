/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

const create = () => {
    const router = useRouter();
    const queryThemeID = router.query.theme;

    // Initialize Firebase
    initializeApp({
        apiKey: "AIzaSyAHOv64OFwobOVReOdO7I0FDn14ALio4Sk",
        authDomain: "salamkami-website.firebaseapp.com",
        projectId: "salamkami-website",
        storageBucket: "salamkami-website.appspot.com",
        messagingSenderId: "710379476608",
        appId: "1:710379476608:web:9463f2d56ca7690f0eb865"
    });
    const firestoreDatabase = getFirestore();
    const firebaseAuth = getAuth();

    const InputForm = ({ userUID }) => {
        const [loading, setLoading] = useState(false);
        const [inputInvitationURL, setInputInvitationURL] = useState('');
        const [inputInvitationTitle, setInputInvitationTitle] = useState('');
        const [inputInvitationCategory, setInputInvitationCategory] = useState(1);
        const [isExist, setIsExist] = useState(false);

        const submitForm = async (event) => {
            event.preventDefault();

            setLoading(true);

            const documentReference = doc(firestoreDatabase, "invitation", inputInvitationURL);
            const documentSnapshot = await getDoc(documentReference);

            if (!documentSnapshot.exists()) {
                await setDoc(documentReference, {
                    invitationCategory: parseInt(inputInvitationCategory),
                    invitationCreated: serverTimestamp(),
                    invitationTheme: queryThemeID ? queryThemeID : 1,
                    invitationTitle: inputInvitationTitle,
                    invitationUserUID: userUID,
                }).then(() => {
                    router.push('./dashboard')
                });

                setIsExist(false);
            } else {
                setIsExist(true);
            };

            setLoading(false)
        };

        return (
            <form onSubmit={submitForm}>
                <div className="mb-4 w-full">
                    <label htmlFor="input_invitation_category" className="block mb-2 text-sm font-medium">Kategori Undangan</label>
                    <select id="input_invitation_category" className="border bg-transparent text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 cursor-pointer" required value={inputInvitationCategory} onChange={(event) => setInputInvitationCategory(event.target.value)}>
                        <option defaultValue disabled>Pilih Kategori Undangan</option>
                        <option value="1">Undangan Pernikahan (Resepsi)</option>
                        <option value="2">Undangan Pernikahan (Ngunduh Mantu)</option>
                        <option value="3">Undangan Tasyakuran Aqiqah</option>
                    </select>
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="input_invitation_title" className="block mb-2 text-sm font-medium">Judul Undangan</label>
                    <input type="text" id="input_invitation_title" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Judul Undangan Kamu" required value={inputInvitationTitle} onChange={(event) => setInputInvitationTitle(event.target.value)} autoComplete="off" />
                    <p className="mt-2 text-sm text-gray-500">Contoh: <code>`Undangan Pernikahan Aku dan Kamu`</code>.</p>
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="input_invitation_url" className="block mb-2 text-sm font-medium">URL Undangan</label>
                    <div className="flex items-center justify-start flex-row">
                        <span className="inline-flex items-center px-3 text-sm text-gray-600 bg-gray-200 h-full p-2.5 rounded-l-md border">undangan.salamkami.com/</span>
                        <input type="text" id="input_invitation_url" className="bg-transparent block flex-1 min-w-0 w-full text-sm p-2.5 border rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="url-undangan-kamu" required value={inputInvitationURL} onChange={(event) => setInputInvitationURL(event.target.value)} autoComplete="off" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Buatlah URL Undangan secara singkat menggunakan huruf kecil dan tanpa spasi. Contoh: <code>`aku-dan-kamu`</code>.</p>
                    {isExist && <p className="mt-2 text-sm text-red-600">URL Undangan yang kamu buat sudah ada yang menggunakan.</p>}
                </div>

                <div className="w-full mt-4 flex flex-col-reverse md:flex-row items-center justify-center">
                    <Link href="./dashboard" className="w-full md:w-auto flex-shrink-0 flex-grow-0 py-2.5 px-4 mt-2 mr-0 md:mt-0 md:mr-2 text-center focus:ring-2 focus:ring-gray-400 bg-gray-600 text-white rounded-md border border-gray-600 font-medium text-sm line-clamp-1">Kembali</Link>
                    <button className="w-full p-2.5 text-center focus:ring-2 focus:ring-blue-400 bg-blue-500 text-white rounded-md border border-blue-500 font-medium text-sm line-clamp-1" type="submit">
                        {loading ? (<>Membuat Undangan...</>) : (<>Buat Undangan</>)}
                    </button>
                </div>
            </form>
        );
    };

    const Auth = () => {
        const [userData, setUserData] = useState(null);
        const [isSignedIn, setIsSignedIn] = useState(null);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    setUserData(user.uid);
                    setIsSignedIn(true);
                } else {
                    setIsSignedIn(false)
                };
            });

            return () => unsubscribe()
        }, []);

        const signInOption = () => {
            signInWithRedirect(firebaseAuth, new GoogleAuthProvider).then((data) => {
            }).catch((error) => {
                console.log(`Error: ${error}`)
            })
        };

        if (isSignedIn === null) {
            return (
                <Loader />
            );
        };

        return (
            <>
                {isSignedIn ? (
                    <InputForm userUID={userData} />
                ) : (
                    <div className="mx-auto text-center">
                        <button className="border rounded-lg hover:shadow-md inline-flex items-center justify-center flex-row px-3 py-2 transition-shadow mx-auto" type='button' aria-label='Sign in with Google' onClick={signInOption}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true" className="mr-2"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>
                            <span className="line-clamp-1 text-sm font-medium">Login dengan Google</span>
                        </button>
                    </div>
                )}
            </>
        )
    };

    return (
        <>
            <Head>
                <title>Buat Undangan | SalamKami</title>
            </Head>

            <Navbar/>

            <div className="max-w-lg mx-auto px-4 py-6 md:pt-24 pt-20">
                <Auth />
            </div>
        </>
    );
}

export default create;