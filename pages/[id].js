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
import Metadata from "../components/Metadata";

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

                    document.title = `Undangan Pernikahan ${doc.data().invitationData.male.name}`;
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
                        <Metadata
                            title={`Undangan Pernikahan ${item.invitationData.female.name} & ${item.invitationData.male.name}`}
                            description={item.invitationData.reception.dateTime}
                            themeColor={item.invitationTheme ? Themes[item.invitationTheme].colorMain : "#ffffff"}
                        />

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