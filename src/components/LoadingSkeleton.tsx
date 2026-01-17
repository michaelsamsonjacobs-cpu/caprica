'use client';

import React from 'react';

interface LoadingSkeletonProps {
    type?: 'card' | 'text' | 'avatar' | 'button' | 'table-row';
    count?: number;
    className?: string;
}

// Skeleton base styles
const baseStyles = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded";

export function LoadingSkeleton({ type = 'text', count = 1, className = '' }: LoadingSkeletonProps) {
    const items = Array.from({ length: count }, (_, i) => i);

    switch (type) {
        case 'card':
            return (
                <>
                    {items.map((i) => (
                        <div key={i} className={`p-6 border border-gray-200 dark:border-gray-700 rounded-xl ${className}`}>
                            <div className={`h-6 w-3/4 mb-4 ${baseStyles}`} />
                            <div className={`h-4 w-1/2 mb-3 ${baseStyles}`} />
                            <div className={`h-4 w-full mb-2 ${baseStyles}`} />
                            <div className={`h-4 w-5/6 mb-4 ${baseStyles}`} />
                            <div className="flex gap-2">
                                <div className={`h-8 w-20 ${baseStyles}`} />
                                <div className={`h-8 w-20 ${baseStyles}`} />
                            </div>
                        </div>
                    ))}
                </>
            );

        case 'text':
            return (
                <>
                    {items.map((i) => (
                        <div key={i} className={`h-4 w-full mb-2 ${baseStyles} ${className}`} />
                    ))}
                </>
            );

        case 'avatar':
            return (
                <>
                    {items.map((i) => (
                        <div key={i} className={`h-12 w-12 rounded-full ${baseStyles} ${className}`} />
                    ))}
                </>
            );

        case 'button':
            return (
                <>
                    {items.map((i) => (
                        <div key={i} className={`h-10 w-24 ${baseStyles} ${className}`} />
                    ))}
                </>
            );

        case 'table-row':
            return (
                <>
                    {items.map((i) => (
                        <div key={i} className={`flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
                            <div className={`h-4 w-1/4 ${baseStyles}`} />
                            <div className={`h-4 w-1/4 ${baseStyles}`} />
                            <div className={`h-4 w-1/4 ${baseStyles}`} />
                            <div className={`h-4 w-1/4 ${baseStyles}`} />
                        </div>
                    ))}
                </>
            );

        default:
            return <div className={`h-4 w-full ${baseStyles} ${className}`} />;
    }
}

// Job Card Skeleton
export function JobCardSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`h-6 w-2/3 ${baseStyles}`} />
                        <div className={`h-6 w-16 ${baseStyles}`} />
                    </div>
                    <div className={`h-4 w-1/2 mb-3 ${baseStyles}`} />
                    <div className={`h-4 w-3/4 mb-2 ${baseStyles}`} />
                    <div className={`h-4 w-2/3 mb-4 ${baseStyles}`} />
                    <div className="flex gap-2 mt-4">
                        <div className={`h-6 w-16 rounded-full ${baseStyles}`} />
                        <div className={`h-6 w-20 rounded-full ${baseStyles}`} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Company Card Skeleton (for SkillBridge)
export function CompanyCardSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`h-12 w-12 rounded-lg ${baseStyles}`} />
                        <div className="flex-1">
                            <div className={`h-5 w-2/3 mb-2 ${baseStyles}`} />
                            <div className={`h-4 w-1/2 ${baseStyles}`} />
                        </div>
                    </div>
                    <div className={`h-4 w-full mb-2 ${baseStyles}`} />
                    <div className={`h-4 w-5/6 mb-4 ${baseStyles}`} />
                    <div className="flex flex-wrap gap-2">
                        <div className={`h-6 w-16 rounded-full ${baseStyles}`} />
                        <div className={`h-6 w-20 rounded-full ${baseStyles}`} />
                        <div className={`h-6 w-14 rounded-full ${baseStyles}`} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Page Loading Skeleton
export function PageLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 animate-pulse">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className={`h-10 w-1/3 mb-4 ${baseStyles}`} />
                <div className={`h-6 w-2/3 mb-8 ${baseStyles}`} />

                {/* Search/Filter Bar */}
                <div className="flex gap-4 mb-8">
                    <div className={`h-12 w-64 ${baseStyles}`} />
                    <div className={`h-12 w-40 ${baseStyles}`} />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={`h-48 ${baseStyles}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LoadingSkeleton;
