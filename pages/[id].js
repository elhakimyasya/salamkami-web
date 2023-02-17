import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import Cover1 from "../components/layouts/cover/1"
import Opening1 from "../components/layouts/opening/1";
import Bride1 from "../components/layouts/bride/1";
import Date1 from "../components/layouts/date/1";
import Closing1 from "../components/layouts/closing/1";
import Loader from "../components/Loader";
import Metadata from "../components/Metadata";
import Themes from "../public/themes.json"

const Data = ({ invitationData }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    };

    console.log(invitationData)

    return (
        <>
            <Metadata
                title={`Undangan Pernikahan ${invitationData[0].invitationData.female.name} & ${invitationData[0].invitationData.male.name}`}
                description={invitationData[0].invitationData.reception.dateTime}
                themeColor={invitationData[0].invitationTheme ? Themes[invitationData[0].invitationTheme].colorMain : "#ffffff"}
            />

            <div className="glide relative h-screen w-full overflow-hidden">
                <div className="glide__track h-full overflow-hidden" data-glide-el="track">
                    <div className="glide__slides">
                        <Cover1 item={invitationData[0]} />
                        <Opening1 item={invitationData[0]} />
                        <Bride1 item={invitationData[0]} />
                        <Date1 item={invitationData[0]} />
                        <Closing1 item={invitationData[0]} />
                    </div>
                </div>
            </div>
        </>
    )
};

export async function getServerSideProps({ params }) {
    const invitationData = [];

    initializeApp({
        apiKey: "AIzaSyAHOv64OFwobOVReOdO7I0FDn14ALio4Sk",
        authDomain: "salamkami-website.firebaseapp.com",
        projectId: "salamkami-website",
        storageBucket: "salamkami-website.appspot.com",
        messagingSenderId: "710379476608",
        appId: "1:710379476608:web:9463f2d56ca7690f0eb865"
    });

    const firestoreDatabase = getFirestore();

    const docRef = doc(firestoreDatabase, `invitation/${params.id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        invitationData.push({
            id: docSnap.id,
            ...docSnap.data(),
            invitationCreated: docSnap.data().invitationCreated.toDate().toISOString()
        });

        return {
            props: {
                invitationData,
            },
        };
    }

    return {
        notFound: true
    };
}

export default Data;