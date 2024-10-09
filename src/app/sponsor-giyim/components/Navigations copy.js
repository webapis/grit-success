'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import navData from '../nav/navigation.json'

const Navigation = () => {



    const renderNavItem = (item) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleOpen = () => setIsOpen(!isOpen);

        return (
            <li key={item.uid || item.title} className="mb-2">
                <div className="flex items-center">
                    {item.children && item.children.length > 0 ? (
                        <button onClick={toggleOpen} className="mr-2">
                            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                    ) : null}
                    {item.uid ? (
                        <Link href={`/category/${item.uid}`}>
                            <span className="text-blue-600 hover:underline">{item.title}</span>
                        </Link>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </div>
                {item.children && item.children.length > 0 && isOpen && (
                    <ul className="ml-4 mt-2">
                        {item.children.map(child => renderNavItem(child))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <nav className="p-4 bg-gray-100 rounded-lg">
            <ul>
                {navData.map(item => renderNavItem(item))}
            </ul>
        </nav>
    );
};

export default Navigation;