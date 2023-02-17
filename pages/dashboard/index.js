/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { collectionGroup, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import Auth from "../../components/Auth";

const index = () => {
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

    const InvitationLists = ({ userData }) => {
        const [invitationData, setInvitationData] = useState([]);
        const [isInvitationLoaded, setInvitationLoaded] = useState(null);

        useEffect(() => {
            setInvitationLoaded(false);

            const unsubscribe = onSnapshot(query(collectionGroup(firestoreDatabase, "invitation"), where("invitationUserUID", "==", `${userData}`), orderBy("invitationCreated", "desc")), (doc) => {
                let dataArray = [];

                doc.docs.forEach((data) => {
                    dataArray.push({
                        id: data.id,
                        ...data.data()
                    });
                });

                setInvitationData(dataArray);

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

        return (
            <>
                {isInvitationLoaded && (
                    invitationData.length > 0 ? (
                        invitationData.map((item, index) => (
                            <Link key={index} className="hover:shadow transition-shadow border px-4 py-2 rounded-md mb-3 last:mb-0 cursor-pointer select-none w-full flex items-start justify-center flex-col hover:text-blue-600" href={`/dashboard/edit/${item.id}`}>
                                <span className="font-medium mb-1">{item.invitationTitle ? item.invitationTitle : 'Judul Undangan'}</span>
                                <span className="text-sm mb-1 text-gray-500 line-clamp-1">{item.invitationCategory === 3 ? "Undangan Tasyakuran Aqiqah" : item.invitationCategory === 2 ? "Undangan Pernikahan (Resepsi)" : "Undangan Pernikahan (Ngunduh Mantu)"}</span>
                                <span className="text-sm text-gray-500 line-clamp-1">{item.invitationCreated.toDate().toLocaleDateString("id-ID", { timeZone: 'Asia/Jakarta', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </Link>
                        ))
                    ) : (
                        <div className="p-4 mb-4 text-sm text-yellow-800 rounded-md bg-yellow-50 border border-yellow-300" role="alert">
                            <p>Maaf, sepertinya kamu belum memiliki Undangan. Silahkan klik tombol <strong>Buat Undangan Baru</strong> diatas untuk membuat Undangan kamu.</p>
                        </div>
                    )
                )}
            </>
        )
    };

    const handleUserData = (userData) => {
        return (
            <>
                <Navbar userData={userData} />
                <div className="max-w-3xl mx-auto px-4 py-6 pt-20">
                    <Link href="./dashboard/create" className="w-full p-2.5 text-center focus:ring-2 focus:ring-blue-400 bg-blue-500 text-white rounded-md border border-blue-500 font-medium text-sm line-clamp-1 mb-4">Buat Undangan Baru</Link>

                    <InvitationLists userData={userData.uid} />
                </div>
            </>
        )
    };

    return (
        <>
            <Head>
                <title>Dashboard | SalamKami</title>
            </Head>

            <Auth onUserData={handleUserData} />
        </>
    )
};

export default index;