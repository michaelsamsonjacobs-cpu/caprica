export interface SuccessStory {
    id: string;
    user: string;
    rank: string;
    mosCode: string;
    mosTitle: string;
    newRole: string;
    company: string;
    quote: string;
    dayInTheLife: string; // The "cinematic" description for the thumbnail
    imagePrompt: string; // Internal prompt for generation
    tags: string[];
}

export const SUCCESS_STORIES: SuccessStory[] = [
    {
        id: "story-1",
        user: "Sarah Jenkins",
        rank: "E-5",
        mosCode: "17C",
        mosTitle: "Cyber Operations Specialist",
        newRole: "Threat Intelligence Analyst",
        company: "CrowdStrike",
        quote: "The Army taught me to think like the enemy. Now I use that mindset to protect Fortune 500 companies from state-sponsored attacks.",
        dayInTheLife: "Working in a dimly lit, high-tech SOC (Security Operations Center) with multiple monitors displaying live threat maps.",
        imagePrompt: "cinematic shot of a female cybersecurity analyst in a modern dark security operations center, glowing blue screens with code and maps, intense focus, wearing a hoodie and headset, shallow depth of field, high production value, technological atmosphere",
        tags: ["Tech", "Cybersecurity", "Remote"]
    },
    {
        id: "story-2",
        user: "Marcus Thorne",
        rank: "E-6",
        mosCode: "11B",
        mosTitle: "Infantryman",
        newRole: "Operations Manager",
        company: "Amazon Class A Fulfillment",
        quote: "Leading a squad is exactly like leading a shift. It's about taking care of your people and mission accomplishment. The environment changes, the leadership doesn't.",
        dayInTheLife: "Standing on the catwalk of a massive, busy automated warehouse, overseeing the floor operations with a tablet in hand.",
        imagePrompt: "cinematic wide shot of a male operations manager standing on a high walkway overlooking a massive futuristic amazon warehouse with robots and conveyors, confident posture, holding a tablet, industrial lighting, dynamic angle",
        tags: ["Leadership", "Operations", "Management"]
    },
    {
        id: "story-3",
        user: "Elena Rodriguez",
        rank: "E-4",
        mosCode: "68W",
        mosTitle: "Combat Medic",
        newRole: "ER Shift Lead",
        company: "Methodist Hospital",
        quote: "Chaos in the ER feels slow compared to a dustoff. My ability to stay calm when everyone else panics is my superpower here.",
        dayInTheLife: "In a busy hospital corridor, confidently directing a team of nurses while checking a patient's vitals.",
        imagePrompt: "cinematic shot of a female nurse in scrubs walking purposefully down a busy hospital hallway, focused expression, medical equipment in background, motion blur on background characters, sharp focus on subject, dramatic hospital lighting",
        tags: ["Healthcare", "Medical", "High Stress"]
    },
    {
        id: "story-4",
        user: "David Kim",
        rank: "O-3",
        mosCode: "15A",
        mosTitle: "Aviation Officer",
        newRole: "Commercial Pilot",
        company: "Delta Airlines",
        quote: "The Blackhawk gave me the hands. The Army gave me the discipline. The transition was seamless, just with better coffee and no night vision goggles.",
        dayInTheLife: "Sitting in the cockpit of a modern airliner at sunset, performing pre-flight checks with a view of the runway.",
        imagePrompt: "cinematic shot from inside an airplane cockpit looking at a male pilot with headset, sunset visible through the windshield, illuminated instrument panel, dashboard lights, professional atmosphere, 4k detail",
        tags: ["Aviation", "Travel", "Pilot"]
    },
    {
        id: "story-5",
        user: "Tyrone Washington",
        rank: "E-7",
        mosCode: "92Y",
        mosTitle: "Unit Supply Specialist",
        newRole: "Global Supply Chain Analyst",
        company: "Nike",
        quote: "I used to account for millions in sensitive equipment. Now I optimize global shipping routes. The scale is bigger, but the logistics principles are identical.",
        dayInTheLife: "In a sleek modern office conference room, pointing at a global logistics map on a smart screen during a presentation.",
        imagePrompt: "cinematic shot of a male professional in a modern glass office presenting data on a large digital screen to colleagues, business casual, confident, global map on screen, warm office lighting, corporate success vibe",
        tags: ["Logistics", "Business", "Global"]
    },
    {
        id: "story-6",
        user: "Jessica Chen",
        rank: "E-5",
        mosCode: "35F",
        mosTitle: "Intel Analyst",
        newRole: "Business Intelligence Lead",
        company: "Google",
        quote: "Turning raw data into actionable intelligence is what I did for commanders. Now I do it for product VPs. The mission is different, the process is the same.",
        dayInTheLife: "Working at a standing desk in a vibrant open-plan tech office, whiteboarding complex data structures.",
        imagePrompt: "cinematic shot of a female data analyst writing complex diagrams on a glass wall in a sunny modern tech office, plants in background, creative atmosphere, intellectual focus, high quality photography",
        tags: ["Tech", "Data", "Analysis"]
    },
    {
        id: "story-7",
        user: "Michael O'Conner",
        rank: "E-6",
        mosCode: "12B",
        mosTitle: "Combat Engineer",
        newRole: "Construction Project Manager",
        company: "Bechtel",
        quote: "We used to build bridges under fire. Building skyscrapers on a schedule? That's a walk in the park.",
        dayInTheLife: "On a construction site wearing a hard hat and vest, reviewing blueprints with a foreman, steel beams in the background.",
        imagePrompt: "cinematic shot of a male construction manager in hard hat and safety vest on a high-rise construction site, looking at blueprints, city skyline in background, golden hour sun, gritty but professional texture",
        tags: ["Construction", "Engineering", "Field Work"]
    },
    {
        id: "story-8",
        user: "Samantha Valez",
        rank: "E-4",
        mosCode: "25B",
        mosTitle: "IT Specialist",
        newRole: "System Admin",
        company: "Salesforce",
        quote: "Fixing comms in the desert taught me resourcefulness. Troubleshooting servers in AC is a luxury I appreciate every day.",
        dayInTheLife: "Inside a cool, blue-lit server room, inspecting a rack of high-end enterprise hardware.",
        imagePrompt: "cinematic shot of a female IT specialist checking cables in a futuristic blue-lit server aisle, data center, depth of field, technical professionalism, clean aesthetic",
        tags: ["IT", "Tech", "Infrastructure"]
    }
];
