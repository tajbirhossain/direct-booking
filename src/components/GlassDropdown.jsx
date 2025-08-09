import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const GlassDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { t } = useTranslation()

    const options = ['Website Development', 'Digital Marketing', 'Paid Ad’s', 'Others'];

    return (
        <div className="relative w-[calc(50%-10px)] max-[450px]:w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="glassInput h-16 w-full rounded-2xl px-5 text-gray-400 border-[1.5px] border-gray-700 backdrop-blur-2xl text-left focus:outline-none"
            >
                {value || t('contact.inputs.service')}
            </button>

            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 w-full rounded-2xl border-[1.5px] border-gray-700 backdrop-blur-2xl bg-white/10 text-white z-50 overflow-hidden shadow-xl">
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className="px-5 py-3 hover:bg-white/20 cursor-pointer transition-all duration-150"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GlassDropdown;
