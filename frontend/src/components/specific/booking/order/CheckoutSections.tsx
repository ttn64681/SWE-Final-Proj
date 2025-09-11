'use client';

import { useState } from "react";

export default function OrderDetails() {


    // Number n from 1 <= n < 4
    const [section, setSection] = useState(1);

    return (
        <div className="flex flex-col gap-4">
            <div className={`bg-amber-400${section === 1 ? "h-1/2" : "h-1/6"}`}></div>
            <div className={`bg-green-500${section === 2 ? "h-1/2" : "h-1/6"}`}></div>
            <div className={`bg-purple-500${section === 3 ? "h-1/2" : "h-1/6"}`}></div>
            <div className={`bg-pink-600${section === 4 ? "h-1/2" : "h-1/6"}`}></div>
        </div>
    );
}