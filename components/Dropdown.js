import React, { useEffect, useRef } from "react";

const Dropdown = ({ children, dropdownIsOpen, setDropdownIsOpen }) => {
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setDropdownIsOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownIsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownIsOpen]);

    return (
        dropdownIsOpen && (
            <div ref={ref} className="absolute border z-10 bg-white divide-y rounded-lg shadow w-44 right-0 top-0">
                {children}
            </div>
        )
    );
};

export default Dropdown;