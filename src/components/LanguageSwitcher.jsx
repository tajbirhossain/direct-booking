import React from "react";



const LanguageSwitcher = ({ languages, isOpen, setIsOpen, selected, switchLocale }) => {

    return (
        <div className="relative w-[120px] max-[700px]:w-[100px]" >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-10 w-full text-white rounded-lg pl-2 pr-4 border border-gray-500 bg-[#ff00] text-left cursor-pointer focus:outline-none flex items-center max-[700px]:h-8 max-[700px]:rounded-md max-[700px]:pl-1 max-[700px]:pr-2 max-[700px]:text-sm"
            >
                <img
                    src="/images/icons/globe.png"
                    alt="globe icon"
                    className="w-4 mr-2 max-[700px]:w-3 max-[700px]:mr-1.5 invert"
                />
                {selected}
            </button>

            
        </div>
    );
};

export default LanguageSwitcher;
