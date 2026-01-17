'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import RecruitConnectModal from '@/components/RecruitConnectModal';
import { SUCCESS_STORIES, SuccessStory } from '@/data/success-stories-data';

// Helper to get image path
const getStoryImage = (story: SuccessStory) => {
    // Map story IDs to the generated filenames
    const imageMap: Record<string, string> = {
        'story-1': 'story_cyber_17c_1768690608192.png',
        'story-2': 'story_ops_11b_1768690620975.png',
        'story-3': 'story_medic_68w_1768690633292.png',
        'story-4': 'story_pilot_15a_1768690645443.png',
        'story-5': 'story_supply_92y_1768690686947.png',
        'story-6': 'story_intel_35f_1768690699384.png',
        'story-7': 'story_engineer_12b_1768690711456.png',
        'story-8': 'story_it_25b_1768690723788.png',
    };

    // In production, these should be moved to /public/stories/
    // Since we are in the artifact directory, we need to copy them or reference them.
    // For this context, we'll assume they will be served correctly if placed in public.
    // NOTE: The user needs to move these images to /public/stories/ manually or we script it.
    // Since we can't easily script the move from brain to src/public with write_to_file,
    // We will assume the user (or a followup step) handles the asset move.
    // For now, let's just point to the filename and we'll handle the move.

    return `/stories/${imageMap[story.id]}`;
};


export default function StoriesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState<{ user: string; role: string; mosCode: string } | undefined>();
    const [filter, setFilter] = useState('For You');

    const handleConnectClick = (story: SuccessStory) => {
        setSelectedStory({
            user: story.user,
            role: story.mosTitle,
            mosCode: story.mosCode
        });
        setIsModalOpen(true);
    };

    const categories = ['For You', 'Tech', 'Medical', 'Logistics', 'Aviation', 'Leadership'];

    const filteredStories = filter === 'For You'
        ? SUCCESS_STORIES
        : SUCCESS_STORIES.filter(s => s.tags.some(t => t.includes(filter) || s.mosTitle.includes(filter)));

    return (
        <div className="min-h-screen bg-black">
            <Header />

            <div className="max-w-md mx-auto pt-20 pb-20">
                {/* Categories */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 px-4 scrollbar-hide">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setFilter(cat)}
                            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${filter === cat
                                    ? 'bg-white text-black scale-105 shadow-lg shadow-white/20'
                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Stories Feed */}
                <div className="space-y-8 px-4">
                    {filteredStories.map((story) => (
                        <div key={story.id} className="relative aspect-[9/16] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/50 group">

                            {/* Cinematic Image */}
                            <img
                                // Note: In a real deploy, ensure these images exist in public/stories
                                // We are using the mapping logic above.
                                src={`/_next/image?url=${encodeURIComponent(getStoryImage(story))}&w=1200&q=75`}
                                // Fallback for dev if image loading fails to default placeholder
                                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80' }}
                                alt={story.dayInTheLife}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95" />

                            {/* Top Info */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                    {story.mosCode} • {story.rank}
                                </span>
                                <span className="bg-green-500/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-green-400/30 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                                    Now at {story.company}
                                </span>
                            </div>

                            {/* Bottom Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                                <div className="flex items-end gap-4 mb-4">
                                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-black border-2 border-white shadow-lg text-lg">
                                        {story.user[0]}
                                    </div>
                                    <div className="mb-1">
                                        <h3 className="font-bold text-white text-lg leading-none shadow-black drop-shadow-md mb-1">{story.user}</h3>
                                        <p className="text-amber-400 font-bold text-sm bg-black/40 backdrop-blur-md px-2 py-0.5 rounded inline-block">
                                            {story.newRole}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 mb-6">
                                    <p className="text-white/90 text-sm leading-relaxed italic">
                                        "{story.quote}"
                                    </p>
                                    <div className="mt-2 text-xs text-slate-300 font-medium">
                                        Daily Life: {story.dayInTheLife}
                                    </div>
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={() => handleConnectClick(story)}
                                    className="w-full py-4 bg-amber-500 text-slate-900 font-bold text-lg rounded-2xl hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <span>🚀</span> Launch Similar Career
                                </button>
                            </div>

                            {/* Side Interactions */}
                            <div className="absolute bottom-32 right-4 flex flex-col gap-6 items-center">
                                <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all active:scale-90 border border-white/10">
                                    <span className="text-2xl drop-shadow-lg">❤️</span>
                                </div>
                                <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all active:scale-90 border border-white/10">
                                    <span className="text-2xl drop-shadow-lg">📤</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <RecruitConnectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                storyContext={selectedStory}
            />
        </div>
    );
}
