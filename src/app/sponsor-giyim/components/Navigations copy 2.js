'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react'; // Only need this if you want to show icons for parent items
import navData from '../nav/navigation.json';

const Navigation = () => {
    const renderNavItem = (item) => {
        return (
            <li key={item.uid || item.title} className="mb-2">
                <div className="flex items-center">
                    {item.children && item.children.length > 0 && (
                        <ChevronDown size={16} className="mr-2" />
                    )}
                    {item.uid ? (
                        <Link href={`/category/${item.uid}`}>
                            <span className="text-blue-600 hover:underline">{item.title}</span>
                        </Link>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </div>
                {item.children && item.children.length > 0 && (
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