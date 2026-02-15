export const config = {
    // Personal Information
    name: "Your Name",
    title: "Professional Title", // e.g., "Full Stack Developer", "Data Scientist"
    location: "City, Country",
    email: "your.email@example.com",
    status: "Open for Opportunities", // Status indicator text

    // SEO / Meta
    siteDescription: "Portfolio of [Your Name], a [Your Title] based in [Location].",

    // Social Links
    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        resume: "/resume.pdf" // Path to resume in public folder
    },

    // About Section
    about: {
        title: "About Me",
        bio: [
            "I am a [Title] based in [Location]. My work focuses on [Key Focus Area 1] and [Key Focus Area 2].",
            "I have experience in [Skill 1], [Skill 2], and [Skill 3]. I enjoy solving complex problems and building efficient systems."
        ],
        skills: {
            tech: ["JavaScript", "React", "Node.js", "SQL", "Git"],
            design: ["Figma", "UI/UX", "Tailwind CSS"],
            soft: ["Problem Solving", "Communication", "Teamwork"]
        }
    },

    // Experience Section
    experience: [
        {
            company: "Company Name",
            role: "Your Role",
            period: "Month Year - Present",
            description: [
                "Responsibility or achievement 1.",
                "Responsibility or achievement 2.",
                "Responsibility or achievement 3."
            ],
            type: "tech" // used for icon selection
        },
        {
            company: "Previous Company",
            role: "Previous Role",
            period: "Month Year - Month Year",
            description: [
                "Worked on X project.",
                "Improved Y metric by Z%."
            ],
            type: "business"
        }
    ],

    // Projects / detailed content
    projects: [
        {
            title: "Project One",
            subtitle: "Project Category",
            tag: "Web App",
            description: "A brief description of your project. Mention the problem it solves and the technologies used.",
            tech: ["React", "Node.js", "MongoDB"],
            link: "https://example.com",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Project Two",
            subtitle: "Case Study",
            tag: "Design",
            description: "Another project description. Highlight your role and the outcome.",
            tech: ["Figma", "Design Systems"],
            link: "https://example.com",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
        }
    ],

    // Footer
    footer: {
        tagline: "Let's build something amazing.",
        cta: "Get in touch",
        copyright: "© 2026 Your Name. Built with React.",
        // "Buy Me A Coffee" link - remove if not needed
        buyMeACoffee: "https://buymeacoffee.com/yourusername"
    }
};
