export interface Project {
    title: string;
    description: string;
    tags: string[];
    status: 'Live' | 'Beta' | 'Alpha';
    price?: 'Free' | 'Paid';
    image: string;
    link?: string;
    category?: string;
    featured?: boolean;
    version?: string; // For featured project display
}

export const PROJECTS: Project[] = [
    {
        title: 'Gyrolog',
        description: 'A personal operating system connecting daily experiences, personal memory, and chosen direction through AI-assisted capture and reflection.',
        tags: ['Personal OS', 'AI', 'Mobile'],
        status: 'Alpha',
        image: '/brand/gyrolog-mark.svg',
        category: 'Mobile',
        link: '/gyrolog',
        featured: true,
        version: 'In development',
    },
    {
        title: 'WickdAlgo',
        description: 'Reproducible financial market research and testable strategies, grounded in inspectable market structure.',
        tags: ['Market structure', 'Research', 'Strategy testing'],
        status: 'Alpha',
        image: '/brand/wickdalgo-mark.svg',
        category: 'Research',
        link: 'mailto:tech@kukso.com?subject=WickdAlgo%20enquiry',
    },
    {
        title: 'FirstSpawn',
        description: 'Minecraft server discovery with community voting and separate trust signals to help players find their next community.',
        tags: ['Server discovery', 'Community', 'Minecraft'],
        status: 'Alpha',
        price: 'Free',
        image: '/content/logo_firstspawn.png',
        category: 'Web',
        link: 'https://www.firstspawn.com/en?utm_source=kukso&utm_medium=projectcard',
        version: 'In development',
    },
    // {
    //     title: 'Discipline vs Dopamine',
    //     description: 'Habit-tracker mobile app with enhanced AI features.',
    //     tags: ['ReactNative', 'TypeScript', 'Zustand'],
    //     status: 'Alpha',
    //     price: 'Free',
    //     image: '/content/logo_dd.png',
    //     category: 'Mobile'
    // },
    {
        title: 'KuksoLib',
        description: 'The core plugin for our Minecraft plugins.',
        tags: ['Java', 'Paper', 'Spigot'],
        status: 'Live',
        price: 'Free',
        image: '/content/logo_kuksolib.png',
        category: 'Minecraft',
        link: '/docs/category/cublexcore',
    },
    {
        title: 'KuksoWorlds',
        description: 'Lightweight solution for world moderation.',
        tags: ['Java', 'Paper', 'Spigot'],
        status: 'Live',
        price: 'Free',
        image: '/content/logo_kuksoworlds.png',
        category: 'Minecraft',
        // link: '/docs/category/cubworlds',
        link: 'https://www.spigotmc.org/resources/126015/',
    },
    {
        title: 'KuksoDialogs',
        description: 'A plugin utilizing Paper 1.21.6 API for dialog moderation.',
        tags: ['Java', 'Paper', 'Spigot'],
        status: 'Live',
        price: 'Free',
        image: '/content/logo_kuksodialogs.png',
        category: 'Minecraft',
        // link: '/docs/category/cubdialogs',
        link: 'https://www.spigotmc.org/resources/128631/',
    },
    {
        title: 'KuksoItems',
        description: 'Custom items with client-side item-name and item-lore support.',
        tags: ['Java', 'Paper', 'Spigot'],
        status: 'Alpha',
        price: 'Paid',
        image: '/content/logo_kuksoitems.png',
        category: 'Minecraft',
        //link: '/docs/category/cubdialogs',
    },
    {
        title: 'KuksoDungeons',
        description: 'Procedural dungeon generation with unlimited capabilities.',
        tags: ['Java', 'Paper', 'Spigot'],
        status: 'Alpha',
        price: 'Paid',
        image: '/content/logo_kuksodungeons.png',
        category: 'Minecraft',
        //link: '/docs/category/cubdialogs',
    },
    // {
    //     title: 'Luminal Call',
    //     description: 'A psychological horror game where light is your only weapon against the encroaching darkness.',
    //     tags: ['Unity', 'C#', 'Horror'],
    //     status: 'Beta',
    //     image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1974', // Dark/Light placeholder
    //     link: '/projects/luminal-call',
    //     category: 'Game Dev'
    // },
    // {
    //     title: 'Void Walker',
    //     description: 'An experimental roguelike game where you traverse through glitched dimensions.',
    //     tags: ['Unity', 'C#', 'ProcGen'],
    //     status: 'Beta',
    //     image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=1974', // Glitch art placeholder
    //     category: 'Game Dev'
    // },
];

// Helper to get the featured project
export function getFeaturedProject(): Project | undefined {
    return PROJECTS.find(p => p.featured);
}
