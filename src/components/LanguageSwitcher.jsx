import React, { useState } from 'react';

const LanguageSwitcher = () => {
    const [selected, setSelected] = useState('English');
    const [isOpen, setIsOpen] = useState(false);

    const languages = ['English', 'German', 'Spanish', 'Italian'];

    return (
        <div className="relative w-[120px] max-[700px]:w-[100px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-full rounded-lg pl-2 pr-4 border border-gray-500 bg-[#ff00] text-left cursor-pointer focus:outline-none flex items-center max-[700px]:h-8 max-[700px]:rounded-md max-[700px]:pl-1 max-[700px]:pr-2 max-[700px]:text-sm"
            >
                <img src="/images/icons/globe.png" alt="" className='w-4 mr-2 max-[700px]:w-3 max-[700px]:mr-1.5' />
                {selected}
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-full rounded-lg border border-gray-500 bg-[#f3f3ef] text-black overflow-hidden">
                    {languages.map((lang, idx) => (
                        <li
                            key={idx}
                            onClick={() => {
                                setSelected(lang);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-3 cursor-pointer transition-colors ${lang === selected
                                ? 'bg-gray-300'
                                : 'hover:bg-gray-200'
                                }
                                max-[700px]:px-3 max-[700px]:py-2 max-[700px]:text-sm`}
                        >
                            {lang}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
