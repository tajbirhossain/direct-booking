'use client'
import React from 'react';

const cardsData = [
    {
        tag: 'JUNE SPRINT',
        title: 'Frontend Dev.',
        subtitle: 'Front-End Developer, Producer',
        weeks: [8, 20, 15, 12],
        total: 42,
        color: 'bg-blue-500',
    },
    {
        tag: 'JULY PLAN',
        title: 'Backend Dev.',
        subtitle: 'Node.js, MongoDB, API',
        weeks: [10, 25, 18, 15],
        total: 55,
        color: 'bg-yellow-400',
    },
    {
        tag: 'AUGUST GOALS',
        title: 'UI/UX Design',
        subtitle: 'Figma, Prototyping, UX Research',
        weeks: [5, 12, 8, 10],
        total: 35,
        color: 'bg-pink-400',
    },
];

export default function AutoScrollCards() {
    const duplicatedCards = [...cardsData, ...cardsData];

    return (
        <div className="w-full overflow-hidden">
            <div className="scroll-track flex gap-[30px] w-fit animate-marquee">
                {duplicatedCards.map((card, index) => (
                    <div key={index} className="flex-shrink-0">
                        <div
                            className="w-[720px] h-[290px] rounded-4xl overflow-hidden flex relative 
                            before:size-5 before:rounded-full before:bg-[#f3f3ef] before:content-[''] 
                            before:absolute before:top-0 before:left-[65%] before:-translate-y-1/2 before:-translate-x-1/2
                            after:size-5 after:rounded-full after:bg-[#f3f3ef] after:content-[''] 
                            after:absolute after:-bottom-5 after:left-[65%] after:-translate-y-1/2 after:-translate-x-1/2"
                        >
                            <div className="w-[65%] bg-gray-200 p-3.5">
                                <span className={`w-fit block ${card.color} rounded-full py-3 px-5 mb-4`}>
                                    {card.tag}
                                </span>
                                <h3 className="text-5xl">{card.title}</h3>
                                <p className="text-xl text-gray-600 mb-8">{card.subtitle}</p>
                                <div className="flex">
                                    {card.weeks.map((h, i) => (
                                        <div
                                            key={i}
                                            className={`px-3 ${i !== 0 ? 'border-l-[1px] border-l-gray-300' : ''} ${i !== card.weeks.length - 1 ? 'border-r-[1px] border-r-gray-300' : ''
                                                }`}
                                        >
                                            <span className="text-xl">Week {i + 1}</span>
                                            <h4 className="text-5xl">
                                                {h}
                                                <span className="text-xl">h</span>
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`w-[35%] ${card.color} py-3.5 px-5 flex flex-col justify-between`}>
                                <span className="w-fit block bg-[#f3f3ef] rounded-full py-3 px-5 mb-4">TOTAL</span>
                                <h3 className="text-5xl">
                                    {card.total} <br />
                                    <span>Hours</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
