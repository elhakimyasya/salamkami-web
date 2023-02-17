import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react"
import Dropdown from "./Dropdown";

const Navbar = ({ userData }) => {
    const router = useRouter();
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const logout = () => {
        const firebaseAuth = getAuth();

        signOut(firebaseAuth).then(() => {
            router.push("/dashboard")
        })
    };

    return (
        <>
            <header className="w-full flex flex-col items-center justify-center py-2 shadow-md min-h-[64px] select-none fixed top-0 bg-white z-50">
                <div className="relative flex items-center justify-between flex-row w-full max-w-3xl px-4 ">
                    <Link href="../../dashboard" className="flex items-center justify-start flex-row max-w-3xl">
                        <Image width={36} height={36} src="/logo.png" alt="SalamKami" className="w-9 h-9 mr-3" />
                        <span className="font-bold line-clamp-1">SalamKami</span>
                    </Link>

                    {userData && (
                        <div className="relative flex items-center justify-end">
                            <button className="focus:ring-2 focus:ring-blue-400 rounded-full overflow-hidden w-8 h-8 flex-shrink-0 flex-grow-0" type="button" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
                                <Image width={32} height={32} src={userData.photoURL} alt={userData.displayName} title={userData.displayName} />
                            </button>

                            <Dropdown dropdownIsOpen={dropdownIsOpen} setDropdownIsOpen={setDropdownIsOpen}>
                                <ul className="py-2 text-sm text-gray-700 ">
                                    <li>
                                        <button className="block px-4 py-2 hover:bg-gray-100 w-full text-start" type="button" aria-label="Keluar" onClick={logout}>Keluar</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

export default Navbar;