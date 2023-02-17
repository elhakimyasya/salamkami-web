import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useState } from "react";

const index = () => {
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

    const Auth = () => {
        const [isSignedIn, setIsSignedIn] = useState(false);

        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        });

        const signInOption = () => {
            signInWithRedirect(firebaseAuth, new GoogleAuthProvider).then(() => {

            }).catch((error) => {
                console.log(error)
            })
        };

        return (
            <>
                {isSignedIn ? (
                    <div className="grid grid-cols-3 gap-3 w-full">
                        <button className="hover:shadow-md transition-shadow rounded-lg border py-4 px-2 flex items-center justify-center flex-col cursor-pointer select-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true" className="mb-1"><path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z" /></svg>
                            <span className="line-clamp-1 text-sm font-medium">Tema</span>
                        </button>
                        <button className="hover:shadow-md transition-shadow rounded-lg border py-4 px-2 flex items-center justify-center flex-col cursor-pointer select-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true" className="mb-1"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
                            <span className="line-clamp-1 text-sm font-medium">Pengaturan</span>
                        </button>
                        <button className="hover:shadow-md transition-shadow rounded-lg border py-4 px-2 flex items-center justify-center flex-col cursor-pointer select-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true" className="mb-1"><path d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z" /></svg>
                            <span className="line-clamp-1 text-sm font-medium">Musik</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center justify-center rounded-lg border py-3 px-3">
                        <button className="border rounded-lg hover:shadow-md inline-flex items-center justify-center flex-row px-3 py-2 transition-shadow" type='button' aria-label='Sign in with Google' onClick={signInOption}>
                            <svg className='mr-2' width={24} height={24} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>
                            <span className="line-clamp-1 text-sm font-medium">Login dengan Google</span>
                        </button>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto p-4">
            <Auth />
        </div>
    );
}

export default index;