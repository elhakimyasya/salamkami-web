/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

const edit = () => {
    const router = useRouter();
    const routerValue = router.query.id;

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

    const InvitationData = ({ userUID }) => {
        const [invitationData, setInvitationData] = useState([]);
        const [isInvitationLoaded, setInvitationLoaded] = useState(null);

        useEffect(() => {
            setInvitationLoaded(false);

            const unsubscribe = onSnapshot(doc(firestoreDatabase, `invitation/${routerValue}`), (doc) => {
                let dataArray = [];
                if (doc.exists && doc.data() && Object.keys(doc.data()).length > 0) {
                    dataArray.push({
                        id: doc.id,
                        ...doc.data()
                    });

                    setInvitationData(dataArray)
                } else {
                    router.push("../dashboard")
                };

                setInvitationLoaded(true);

                !doc.metadata.hasPendingWrites && unsubscribe();
            });

            return () => unsubscribe()
        }, [userUID]);

        if (isInvitationLoaded === null) {
            return (
                <Loader />
            );
        };

        return (
            <>
                {isInvitationLoaded && (
                    invitationData.length > 0 && (
                        invitationData.map((data, index) => (
                            data.invitationTitle
                        ))
                    )
                )}
                {invitationData.invitationTheme}
            </>
        )
    }

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
                    <InvitationData userUID={userData} />
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
                <title>Edit Undangan | SalamKami</title>
            </Head>

            <Navbar />

            <div className="max-w-lg mx-auto px-4 py-6 md:pt-24 pt-20">
                <Auth />
            </div>
        </>
    );
}

export default edit;