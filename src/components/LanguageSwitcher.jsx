import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "German" },
    { code: "es", label: "Spanish" },
    { code: "it", label: "Italian" },
];

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef(null);
    const currentLocaleCode = pathname?.split("/")[1] || "en";

    const currentLanguage =
        languages.find((lang) => lang.code === currentLocaleCode) || languages[0];

    const [selected, setSelected] = useState(currentLanguage.label);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const onClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    useEffect(() => {
        const newLang = languages.find((l) => l.code === currentLocaleCode);
        if (newLang) setSelected(newLang.label);
    }, [currentLocaleCode]);

    const switchLocale = (label) => {
        const langObj = languages.find((l) => l.label === label);
        if (!langObj) return;

        if (langObj.label === selected) {
            setIsOpen(false);
            return;
        }

        const segments = pathname.split("/");
        segments[1] = langObj.code;
        const newPath = segments.join("/") || `/${langObj.code}`;

        window.location.href = newPath;
        setIsOpen(false);
    };


    return (
        <div
            ref={dropdownRef}
            className="relative w-[120px] max-[700px]:w-[100px]"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-full text-[#3a3a3a] rounded-lg pl-2 pr-4 border border-gray-500 bg-[#ff00] text-left cursor-pointer focus:outline-none flex items-center max-[700px]:h-8 max-[700px]:rounded-md max-[700px]:pl-1 max-[700px]:pr-2 max-[700px]:text-sm"
            >
                <img
                    src="/images/icons/globe-gray.png"
                    alt="globe icon"
                    className="w-4 mr-2 max-[700px]:w-3 max-[700px]:mr-1.5"
                />
                {selected}
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-full rounded-lg border border-gray-500 bg-[#f3f3ef] text-black overflow-hidden z-20">
                    {languages.map(({ label }, idx) => (
                        <li
                            key={idx}
                            onClick={() => switchLocale(label)}
                            className={`px-4 py-3 cursor-pointer transition-colors ${label === selected ? "bg-gray-300" : "hover:bg-gray-200"
                                } max-[700px]:px-3 max-[700px]:py-2 max-[700px]:text-sm`}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
