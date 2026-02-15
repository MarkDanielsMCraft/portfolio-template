import React, { useState, useEffect, useRef } from 'react';
import {
    Github,
    Linkedin,
    Mail,
    ChevronRight,
    Code,
    Database,
    Layout,
    Terminal,
    Cpu,
    Coffee,
    ExternalLink,
    Code2,
    Globe,
    FileText,
    Download,
    Calendar,
    Clock,
    Menu,
    X,
    User,
    MapPin,
    Twitter
} from 'lucide-react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import ReactLenis from 'lenis/react';
import { config } from './config';

// --- Animated Components ---

const DecryptText = ({ text, className }) => {
    const [displayText, setDisplayText] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(text.split("").map((letter, index) => {
                if (index < iteration) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayText}</span>;
};

const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const SystemStatus = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-4 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-slate-300 shadow-xl">
            <div className="flex items-center gap-2">
                <Globe size={12} className="text-blue-500" />
                <span>ONLINE</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
                <Clock size={12} className="text-emerald-500" />
                <span>{time.toLocaleTimeString()}</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-bold">{config.status || "SYSTEM ONLINE"}</span>
            </div>
        </div>
    );
};

const RevealOnScroll = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <motion.div ref={ref} style={{ opacity, y }} transition={{ duration: 0.8, delay }}>
            {children}
        </motion.div>
    );
};

const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const { x, y } = position;
    return (
        <motion.div
            className="relative"
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const SkillBadge = ({ text, category }) => (
    <span className={`
    px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-default
    ${category === 'tech' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40' :
            category === 'design' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/40' :
                category === 'soft' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/40' :
                    'bg-slate-800/50 border-slate-700 text-slate-300'}
  `}>
        {text}
    </span>
);

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Spotlight Logic
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ReactLenis root>
            <div
                className="min-h-screen bg-[#050B14] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden"
                onMouseMove={handleMouseMove}
            >
                <SystemStatus />

                {/* Background Layer */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute inset-0 z-[5] opacity-[0.02] mix-blend-overlay pointer-events-none"
                        style={{ backgroundImage: noiseBg }}
                    />

                    <motion.div
                        className="absolute inset-0 z-[2] opacity-40"
                        style={{
                            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.03),
                transparent 80%
              )
            `,
                        }}
                    />

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-900/15 rounded-full blur-[120px] mix-blend-screen"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], x: [0, 40, -40, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/15 rounded-full blur-[100px] mix-blend-screen"
                    />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10">

                    {/* Navigation */}
                    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050B14]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
                        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                            <Magnetic>
                                <a href="#" className="text-xl font-bold text-white tracking-tight flex items-center gap-2 group">
                                    <span className="group-hover:text-blue-400 transition-colors">{config.name}<span className="text-blue-500">.</span></span>
                                </a>
                            </Magnetic>

                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                                className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200"
                            >
                                {['About', 'Experience', 'Projects'].map((item) => (
                                    <Magnetic key={item}>
                                        <a href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors relative group block px-2 py-1">
                                            {item}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                                        </a>
                                    </Magnetic>
                                ))}
                                <Magnetic>
                                    <a href={`mailto:${config.email}`} className="block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 active:scale-95">
                                        Contact Me
                                    </a>
                                </Magnetic>
                            </motion.div>

                            <button className="md:hidden p-2 bg-white/5 rounded-lg text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </nav>

                    {/* Hero Section */}
                    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-20">
                        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

                            <motion.div
                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    {config.status}
                                </div>

                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[1.1] drop-shadow-lg">
                                    {config.title.split(' ')[0]} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 filter drop-shadow-lg">
                                        <DecryptText text={config.title.substring(config.title.indexOf(' ') + 1) || "Developer"} />
                                    </span>
                                </h1>

                                <p className="max-w-xl text-lg text-slate-200 leading-relaxed mb-8">
                                    {config.about.bio[0]}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Magnetic>
                                        <a href="#projects" className="group flex items-center gap-2 bg-white text-black hover:bg-blue-50 px-6 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-white/5 hover:shadow-white/10 active:scale-95">
                                            View Work <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </Magnetic>
                                    <div className="flex items-center gap-3">
                                        <Magnetic>
                                            <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="block p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all hover:border-white/20 text-slate-300 hover:text-white"><Github className="w-5 h-5" /></a>
                                        </Magnetic>
                                        <Magnetic>
                                            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="block p-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all hover:border-white/20 text-slate-300 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                                        </Magnetic>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Hero Visual - Code Snapshot */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative hidden md:block perspective-1000"
                            >
                                <TiltCard className="relative bg-[#0a101f]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur opacity-30" />

                                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4 relative z-10">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        </div>
                                        <div className="text-xs text-slate-400 font-mono ml-2">portfolio_config.js</div>
                                    </div>
                                    <div className="space-y-3 font-mono text-sm relative z-10">
                                        <div className="text-slate-300">// Your configuration</div>
                                        <div className="pl-0 flex gap-4">
                                            <span className="text-purple-400">const</span> <span className="text-yellow-200">developer</span> = {'{'}
                                        </div>
                                        <div className="pl-6 flex gap-4">
                                            <span className="text-blue-400">name</span>: <span className="text-green-300">"{config.name}"</span>,
                                        </div>
                                        <div className="pl-6 flex gap-4">
                                            <span className="text-blue-400">skills</span>: [<span className="text-green-300">"React"</span>, <span className="text-green-300">"Design"</span>],
                                        </div>
                                        <div className="pl-6 flex gap-4">
                                            <span className="text-blue-400">hardWorker</span>: <span className="text-orange-400">true</span>
                                        </div>
                                        <div className="pl-6 flex gap-4">
                                            <span className="text-purple-400">hire</span>() {'{'}
                                        </div>
                                        <div className="pl-12 flex gap-4">
                                            <span className="text-purple-400">return</span> <span className="text-green-300">"Contact Me!"</span>;
                                        </div>
                                        <div className="pl-6 text-slate-400">{'}'}</div>
                                        <div className="text-slate-400">{'}'}</div>
                                    </div>
                                </TiltCard>
                            </motion.div>

                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce cursor-pointer"
                            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                        >
                            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-400 to-transparent mx-auto" />
                        </motion.div>
                    </section>

                    {/* About Section */}
                    <section id="about" className="py-20 px-6 relative">
                        <div className="max-w-6xl mx-auto">
                            <RevealOnScroll>
                                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                    <User className="text-blue-500" /> {config.about.title}
                                </h2>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Main Bio */}
                                <RevealOnScroll>
                                    <TiltCard className="md:col-span-2 bg-[#0a101f]/80 border border-white/5 rounded-3xl p-8 h-full hover:border-blue-500/30 transition-all backdrop-blur-md group hover:bg-[#0a101f]">
                                        {config.about.bio.map((paragraph, i) => (
                                            <p key={i} className="text-lg text-slate-100 leading-relaxed mb-6 last:mb-0 group-hover:text-white transition-colors">
                                                {paragraph}
                                            </p>
                                        ))}
                                        <div className="mt-8 flex gap-6 text-sm font-medium text-slate-300">
                                            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><MapPin size={14} className="text-blue-400" /> {config.location}</span>
                                        </div>
                                    </TiltCard>
                                </RevealOnScroll>

                                {/* Resume Card */}
                                <RevealOnScroll delay={0.2}>
                                    <TiltCard className="bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-blue-900/10 transition-all relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400"><FileText size={24} /></div>
                                            <h3 className="text-xl font-bold text-white mb-1">Résumé</h3>
                                            <p className="text-sm text-slate-300">Check out my professional background.</p>
                                        </div>
                                        <div className="flex gap-2 mt-6 relative z-10">
                                            <Magnetic>
                                                <a href={config.social.resume} target="_blank" rel="noopener noreferrer" className="block w-full bg-white text-black py-2.5 px-4 rounded-lg text-center font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group">
                                                    View <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                                </a>
                                            </Magnetic>
                                            <Magnetic>
                                                <a href={config.social.resume} download className="block px-3 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white">
                                                    <Download size={18} />
                                                </a>
                                            </Magnetic>
                                        </div>
                                    </TiltCard>
                                </RevealOnScroll>

                                {/* Skills */}
                                <RevealOnScroll delay={0.3}>
                                    <TiltCard className="md:col-span-3 bg-[#0a101f]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden hover:border-white/10 transition-colors">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2"><Cpu size={16} /> Skills</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                            <div>
                                                <h4 className="text-white font-medium mb-3 text-sm">Tech</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {config.about.skills.tech.map((skill, i) => (
                                                        <SkillBadge key={i} text={skill} category="tech" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium mb-3 text-sm">Design</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {config.about.skills.design.map((skill, i) => (
                                                        <SkillBadge key={i} text={skill} category="design" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium mb-3 text-sm">Soft Skills</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {config.about.skills.soft.map((skill, i) => (
                                                        <SkillBadge key={i} text={skill} category="soft" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </RevealOnScroll>

                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section id="experience" className="py-20 px-6 bg-white/[0.01]">
                        <div className="max-w-4xl mx-auto">
                            <RevealOnScroll>
                                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Calendar className="text-blue-500" /> Experience</h2>
                            </RevealOnScroll>

                            <div className="space-y-12">
                                {config.experience.map((exp, idx) => (
                                    <RevealOnScroll key={idx} delay={idx * 0.1}>
                                        <div className="relative pl-8 md:pl-0">
                                            {/* Timeline Line */}
                                            <div className="absolute left-0 top-2 bottom-0 w-px bg-white/10 md:left-[140px]" />

                                            <div className="md:flex gap-12 group">
                                                <div className="hidden md:block w-[140px] text-right flex-shrink-0 pt-1">
                                                    <span className="text-sm font-bold text-slate-500 group-hover:text-blue-400 transition-colors">{exp.period}</span>
                                                </div>

                                                <div className="relative flex-1 bg-slate-900/20 border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all hover:bg-slate-900/40 backdrop-blur-sm">
                                                    {/* Dot */}
                                                    <div className="absolute left-[-37px] top-6 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:bg-blue-500 group-hover:border-blue-300 transition-colors md:left-[-55px]" />

                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                                                            <p className="text-blue-400 font-medium text-sm">{exp.role}</p>
                                                        </div>
                                                        <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                                                            {exp.type === 'tech' ? <Terminal className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                                                        </div>
                                                    </div>

                                                    <ul className="space-y-3">
                                                        {exp.description.map((point, i) => (
                                                            <li key={i} className="text-slate-300 text-sm leading-relaxed flex gap-3 group-hover:text-slate-200 transition-colors">
                                                                <ChevronRight size={14} className="mt-1 flex-shrink-0 text-slate-600 group-hover:text-blue-500 transition-colors" />
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* Mobile Period */}
                                                    <div className="md:hidden mt-4 pt-4 border-t border-white/5">
                                                        <span className="text-xs font-bold text-slate-500">{exp.period}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Projects */}
                    <section id="projects" className="py-24 px-6 relative">
                        <div className="max-w-6xl mx-auto">
                            <RevealOnScroll>
                                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Code2 className="text-blue-500" /> Projects</h2>
                            </RevealOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {config.projects.map((project, idx) => (
                                    <RevealOnScroll key={idx} delay={idx * 0.2}>
                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all backdrop-blur-md"
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                                />
                                                <div className="absolute bottom-4 left-4 z-20">
                                                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest shadow-lg">
                                                        {project.tag}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-8">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                                        <p className="text-sm text-slate-500 font-medium group-hover:text-slate-400 transition-colors">{project.subtitle}</p>
                                                    </div>
                                                    <Magnetic>
                                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all shadow-lg">
                                                            <ExternalLink size={18} />
                                                        </a>
                                                    </Magnetic>
                                                </div>

                                                <p className="text-slate-300 leading-relaxed mb-6 text-sm whitespace-pre-line">{project.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech.map((t, i) => (
                                                        <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 rounded-lg text-slate-400 border border-white/5 group-hover:border-white/10 group-hover:text-slate-300 transition-colors">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </RevealOnScroll>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                        <div className="absolute inset-0 bg-blue-900/5 blur-[100px] pointer-events-none" />

                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <RevealOnScroll>
                                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">{config.footer.tagline}</h2>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                                    <Magnetic>
                                        <a
                                            href={`mailto:${config.email}`}
                                            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                                        >
                                            <Mail size={20} /> {config.footer.cta}
                                        </a>
                                    </Magnetic>

                                    {config.footer.buyMeACoffee && (
                                        <Magnetic>
                                            <a
                                                href={config.footer.buyMeACoffee}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 text-yellow-200/80 hover:text-yellow-200 px-8 py-4 rounded-2xl font-bold text-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all group active:scale-95 backdrop-blur-md relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-yellow-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                <Coffee size={20} className="group-hover:rotate-12 transition-transform relative z-10" />
                                                <span className="relative z-10">Buy me a coffee</span>
                                            </a>
                                        </Magnetic>
                                    )}
                                </div>

                                <div className="flex flex-col md:flex-row justify-center items-center gap-6 bg-slate-900/50 border border-white/5 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-sm mb-16 hover:border-white/10 transition-colors">
                                    <p className="text-sm text-slate-500 italic">
                                        "Template design by <a href="https://mcraftportfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 font-semibold hover:text-blue-400 transition-colors">MCraft</a>"
                                    </p>
                                    <div className="h-px w-12 bg-white/10 md:h-8 md:w-px" />
                                    <Magnetic>
                                        <a
                                            href="https://buymeacoffee.com/markdanielsmcraft"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs font-bold bg-yellow-500/10 text-yellow-200 px-4 py-2 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all"
                                        >
                                            <Coffee size={14} /> Buy MCraft a coffee
                                        </a>
                                    </Magnetic>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 border-t border-white/5 pt-8">
                                    <p>{config.footer.copyright}</p>
                                    <div className="flex gap-6 mt-4 md:mt-0">
                                        <a href={config.social.linkedin} className="hover:text-blue-400 transition-colors">LinkedIn</a>
                                        <a href={config.social.github} className="hover:text-blue-400 transition-colors">GitHub</a>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </footer>

                </div>
            </div>
        </ReactLenis>
    );
};

export default App;
