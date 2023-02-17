import React, { useEffect, useRef } from "react";

const Modal = ({ children, modalTitle, modalIsOpen, setModalIsOpen }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (modalIsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalIsOpen]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setModalIsOpen(false);
        }
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    return (
        modalIsOpen && (
            <>
                <div ref={ref} className="fixed inset-0 z-50 flex w-full items-center justify-center p-4">
                    <div className="relative max-h-screen w-full max-w-2xl">
                        <div className="relative rounded-lg bg-white shadow">
                            <div className="flex select-none items-center justify-between rounded-t border-b py-3 pl-6 pr-4">
                                <h2 className="text-lg font-semibold text-gray-900">{modalTitle}</h2>
                                <div className="flex flex-row items-center justify-center">
                                    <button type="button" className="inline-flex p-2 text-gray-400 hover:text-gray-600" onClick={handleCloseModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden="true"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="max-h-[80vh] space-y-6 overflow-y-auto overflow-x-hidden p-6">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 w-full h-full"></div>
            </>
        )
    );
}

export default Modal;