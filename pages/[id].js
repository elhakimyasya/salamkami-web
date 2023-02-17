import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import Cover1 from "../components/layouts/cover/1"
import Opening1 from "../components/layouts/opening/1";
import Bride1 from "../components/layouts/bride/1";
import Date1 from "../components/layouts/date/1";
import Closing1 from "../components/layouts/closing/1";
import Loader from "../components/Loader";
import Head from "next/head";
import Themes from "../public/themes.json"

const Data = () => {
    const router = useRouter();
    const [firstRender, setFirstRender] = useState(true);
    const [invitationData, setInvitationData] = useState([]);
    const [isInvitationLoaded, setInvitationLoaded] = useState(null);

    if (firstRender) {
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

    useEffect(() => {
        const firestoreDatabase = getFirestore();

        if (router.query.id) {
            console.log(router.query.id)
            setInvitationLoaded(false);

            const unsubscribe = onSnapshot(doc(firestoreDatabase, `invitation/${router.query.id}`), (doc) => {
                if (doc.exists()) {
                    setInvitationData([{ id: doc.id, ...doc.data() }]);
                    setInvitationLoaded(true);
                }

                !doc.metadata.hasPendingWrites && unsubscribe();
            });

            return () => unsubscribe()
        }
    }, [router.query.id]);

    if (isInvitationLoaded === null) {
        return (
            <Loader />
        );
    };

    return (
        <>
            {isInvitationLoaded && (
                invitationData.map((item) => (
                    <div key={item.id}>
                        <Head>
                            <title>Undangan Pernikahan {item.invitationData.male.name}</title>
                            <meta charset="UTF-8" />
                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
                            <meta name="format-detection" content="telephone=no" />
                            <title>Undangan Pernikahan {item.invitationData.female.name} & {item.invitationData.male.name}</title>
                            <meta name="title" content={`Undangan Pernikahan ${item.invitationData.female.name} & ${item.invitationData.male.name}`} />
                            <meta name="description" content={item.invitationData.reception.dateTime} />

                            <meta name="author" content="SalamKami | EL Creative Developer" />
                            <meta name="copyright" content="SalamKami | EL Creative Developer" />
                            <meta name="distribution" content="Global" />
                            <meta name="target" content="all" />
                            <meta name="rating" content="general" />
                            <meta name="theme-color" content={item.invitationTheme ? Themes[item.invitationTheme].colorMain : "#ffffff"} />

                            <meta property="og:title" content={`Undangan Pernikahan ${item.invitationData.female.name} & ${item.invitationData.male.name}`} />
                            <meta property="og:description" content={item.invitationData.reception.dateTime} />
                            <meta property="og:site_name" content={`Undangan Pernikahan ${item.invitationData.female.name} & ${item.invitationData.male.name}`} />
                            <meta property="og:url" content="/" />
                            <meta property="og:locale" content="id" />
                            <meta property="og:type" content="website" />
                            <meta property="og:image" content="" />

                            <meta name="twitter:title" content={`Undangan Pernikahan ${item.invitationData.female.name} & ${item.invitationData.male.name}`} />
                            <meta name="twitter:description" content="{{receptionDate}}" />
                            <meta name="twitter:url" content="/" />
                            <meta name="twitter:image" content="" />
                            <meta name="twitter:card" content="summary_large_image" />

                            <link href="./favicon.ico" rel="icon" type="image/x-icon" />
                            <link href="./favicon.ico" rel="shortcut" type="image/icon" />
                            <link href="./favicon.ico" rel="apple-touch-startup-image" />
                            <link href="./favicon.ico" rel="apple-touch-icon" />
                        </Head>

                        <div className="glide relative h-screen w-full overflow-hidden">
                            <div className="glide__track h-full overflow-hidden" data-glide-el="track">
                                <div className="glide__slides">
                                    <Cover1 item={item} />
                                    <Opening1 item={item} />
                                    <Bride1 item={item} />
                                    <Date1 item={item} />
                                    <Closing1 item={item} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>

    );
}

export default Data;