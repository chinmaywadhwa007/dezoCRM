import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Laptop,
  HeartPulse,
  GraduationCap,
  Palmtree,
  Zap,
  Building2,
  Send
} from 'lucide-react';

export interface JobOpening {
  id: string;
  title: string;
  department: 'Engineering & AI' | 'Product & Design' | 'Sales & Marketing' | 'Customer Success';
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-Site';
  employmentType: string;
  salary: string;
  postedDate: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  featured?: boolean;
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'ai-eng-01',
    title: 'Senior Full-Stack AI Engineer',
    department: 'Engineering & AI',
    location: 'Remote (US/EU/APAC)',
    workType: 'Remote',
    employmentType: 'Full-Time',
    salary: '$130,000 - $170,000',
    postedDate: '2 days ago',
    experience: '4+ Years',
    featured: true,
    description: 'Lead the architectural design and implementation of DezoAI copilot workflows, multi-agent frameworks, and real-time CRM predictive engines.',
    responsibilities: [
      'Architect scalable agentic workflows integrating Large Language Models with enterprise CRM data stores.',
      'Develop reactive front-end dashboards in React, TypeScript, and Tailwind CSS.',
      'Optimize API response latencies and vector embedding retrievals for sub-50ms query times.',
      'Collaborate with AI Researchers to deploy fine-tuned domain models for School ERP governance.'
    ],
    requirements: [
      'Strong proficiency in TypeScript, React, Node.js, and Python.',
      'Hands-on experience with OpenAI APIs, LangChain, LlamaIndex, or custom vector databases (Pinecone/Qdrant).',
      'Proven track record of shipping production SaaS web applications.',
      'Deep understanding of microservices architecture, Docker, and PostgreSQL.'
    ],
    skills: ['TypeScript', 'React', 'Python', 'LLMs', 'Node.js', 'Vector DB']
  },
  {
    id: 'product-designer-02',
    title: 'Lead Product Designer (UI/UX)',
    department: 'Product & Design',
    location: 'Hybrid (San Francisco, CA)',
    workType: 'Hybrid',
    employmentType: 'Full-Time',
    salary: '$115,000 - $150,000',
    postedDate: '3 days ago',
    experience: '5+ Years',
    featured: true,
    description: 'Craft beautiful, high-converting enterprise interfaces, interactive 3D visualizations, and intuitive design systems for Dezoryn Technologies.',
    responsibilities: [
      'Own the end-to-end design lifecycle from user research wireframes to pixel-perfect Figma components.',
      'Develop micro-animations and smooth transition guidelines for complex ERP dashboards.',
      'Conduct usability tests with sales teams, enterprise managers, and campus administrators.',
      'Maintain and evolve the unified Dezo Design System.'
    ],
    requirements: [
      'Expertise in Figma, Framer, and modern prototyping tools.',
      'A stunning portfolio demonstrating complex SaaS/B2B data dashboard design.',
      'Understanding of modern CSS, Tailwind design tokens, and web animation principles.',
      'Exceptional communication and user-empathy skills.'
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research']
  },
  {
    id: 'sales-mgr-03',
    title: 'Enterprise Sales Account Executive',
    department: 'Sales & Marketing',
    location: 'Remote (North America)',
    workType: 'Remote',
    employmentType: 'Full-Time',
    salary: '$120,000 - $160,000 + Uncapped OTE',
    postedDate: '1 week ago',
    experience: '3+ Years',
    featured: false,
    description: 'Drive new revenue expansion by closing mid-market and enterprise CRM & School ERP contracts across global markets.',
    responsibilities: [
      'Manage full sales cycles from qualified lead qualification to contract execution.',
      'Deliver tailored product demonstrations highlighting AI scoring and ERP automation.',
      'Partner with Solution Architects to respond to enterprise RFPs and custom SLA queries.',
      'Maintain strong pipeline hygiene in Dezoryn Technologies.'
    ],
    requirements: [
      '3+ years of successful SaaS B2B sales experience with proven quota attainment.',
      'Familiarity with CRM platforms, ERP software, or EdTech industry vertical.',
      'Strong consultative closing skills and executive-level pitch confidence.',
      'Self-starter mindset comfortable in a high-growth environment.'
    ],
    skills: ['B2B SaaS Sales', 'Enterprise CRM', 'Consultative Selling', 'Pipeline Mgmt']
  },
  {
    id: 'backend-arch-04',
    title: 'Senior Backend Systems Architect',
    department: 'Engineering & AI',
    location: 'Remote (Global)',
    workType: 'Remote',
    employmentType: 'Full-Time',
    salary: '$140,000 - $185,000',
    postedDate: '4 days ago',
    experience: '6+ Years',
    featured: true,
    description: 'Architect multi-tenant backend infrastructure capable of handling millions of daily CRM transactions with high availability.',
    responsibilities: [
      'Design distributed microservices, message queues, and real-time WebSocket pipelines.',
      'Optimize complex PostgreSQL database queries, indexing, and transactional partitioning.',
      'Implement enterprise SOC-2 security protocols, encryption at rest/transit, and role-based access control.',
      'Mentor junior engineers and champion CI/CD DevOps best practices.'
    ],
    requirements: [
      'Mastery of Go, Node.js, or Rust with deep PostgreSQL and Redis expertise.',
      'Experience scaling high-throughput distributed systems in AWS/GCP.',
      'Familiarity with Kubernetes, Docker, Terraform, and event-driven architectures (Kafka/NATS).',
      'Strong CS fundamentals in data structures, concurrency, and security.'
    ],
    skills: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS']
  },
  {
    id: 'customer-success-05',
    title: 'School ERP Customer Success Specialist',
    department: 'Customer Success',
    location: 'Hybrid (New York / Remote)',
    workType: 'Hybrid',
    employmentType: 'Full-Time',
    salary: '$85,000 - $110,000',
    postedDate: '5 days ago',
    experience: '2+ Years',
    featured: false,
    description: 'Guide educational institutions through seamless Dezo School ERP onboarding, module configuration, and ongoing success.',
    responsibilities: [
      'Lead interactive onboarding workshops for campus administrators, teachers, and registrars.',
      'Configure student database structures, fee billing rules, and examination reporting modules.',
      'Monitor customer health scores and proactively prevent account churn.',
      'Gather feature requests to inform the Product roadmap.'
    ],
    requirements: [
      'Prior experience in EdTech customer success, account management, or SaaS training.',
      'Excellent presentation skills and empathy for non-technical users.',
      'Ability to troubleshoot configuration workflows calmly under pressure.',
      'Bachelor degree or equivalent practical experience.'
    ],
    skills: ['EdTech', 'Customer Success', 'Product Onboarding', 'SaaS Training']
  },
  {
    id: 'ai-research-06',
    title: 'AI Research Scientist (Agentic Intelligence)',
    department: 'Engineering & AI',
    location: 'Remote (US / EU)',
    workType: 'Remote',
    employmentType: 'Full-Time',
    salary: '$150,000 - $200,000 + Stock Options',
    postedDate: 'Just now',
    experience: '3+ Years',
    featured: true,
    description: 'Pioneer novel autonomous agent architectures and domain-specific fine-tuning for predictive enterprise workflow execution.',
    responsibilities: [
      'Conduct original research on multi-agent collaboration, memory retrieval, and planning algorithms.',
      'Fine-tune open-weight models (Llama 3, Mistral) on structured business decision datasets.',
      'Publish research findings and translate benchmarks into production copilot features.',
      'Evaluate model safety, hallucination suppression, and alignment techniques.'
    ],
    requirements: [
      'PhD or Master degree in Computer Science, Machine Learning, or related quantitative field.',
      'Strong publication record or hands-on research experience in LLMs/RLHF.',
      'Deep fluency in PyTorch, Transformers, vLLM, and LoRA/QLoRA fine-tuning.',
      'Passionate about pushing agentic AI limits in commercial SaaS.'
    ],
    skills: ['PyTorch', 'Agentic AI', 'LLM Fine-Tuning', 'Transformers', 'Python']
  }
];

const COMPANY_BENEFITS = [
  {
    icon: Laptop,
    title: '100% Remote-First',
    desc: 'Work from anywhere in the world with flexible core working hours.'
  },
  {
    icon: Zap,
    title: 'Competitive Pay & Equity',
    desc: 'Top-tier base salaries plus meaningful equity stock options in high-growth SaaS.'
  },
  {
    icon: HeartPulse,
    title: 'Comprehensive Healthcare',
    desc: 'Full medical, dental, and vision insurance for you and your dependents.'
  },
  {
    icon: GraduationCap,
    title: '$2,000 Learning Budget',
    desc: 'Annual stipend for courses, technical books, certifications, and tech conferences.'
  },
  {
    icon: Palmtree,
    title: 'Flexible PTO & Retreats',
    desc: 'Unlimited vacation policy plus annual company-wide retreats in tropical destinations.'
  },
  {
    icon: Building2,
    title: 'Latest Tech Hardware',
    desc: 'Brand new M3 Max MacBook Pro, 4K monitor, and home office stipend on Day 1.'
  }
];

export const CareersSection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Job for Modal Application
  const [activeJobModal, setActiveJobModal] = useState<JobOpening | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [applicantForm, setApplicantForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    resumeUrl: '',
    coverLetter: ''
  });

  const departments = ['All', 'Engineering & AI', 'Product & Design', 'Sales & Marketing', 'Customer Success'];

  // Filter Jobs
  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesWorkType = selectedWorkType === 'All' || job.workType === selectedWorkType;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesWorkType && matchesSearch;
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setActiveJobModal(null);
      setApplicantForm({ fullName: '', email: '', phone: '', linkedin: '', resumeUrl: '', coverLetter: '' });
    }, 2500);
  };

  return (
    <div id="careers" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 sm:py-12 lg:py-20 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-16">

        {/* ---------------------------------------------------- */}
        {/* 1. HERO HEADER                                       */}
        {/* ---------------------------------------------------- */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />
            Careers at Dezoryn Technologies
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Build the Future of{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enterprise AI & Campus Governance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed px-2 sm:px-0 font-medium"
          >
            We are looking for passionate engineers, designers, creators, and leaders to revolutionize how businesses and educational institutions operate. Explore open roles below.
          </motion.p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 2. COMPANY BENEFITS GRID                             */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {COMPANY_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/90 backdrop-blur-xl shadow-sm sm:shadow-md hover:shadow-cyan-500/10 hover:border-cyan-500/40 transition-all space-y-3"
              >
                <div className="p-3 w-fit rounded-xl bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3. JOB SEARCH & FILTERS BAR                          */}
        {/* ---------------------------------------------------- */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl backdrop-blur-2xl space-y-4 sm:space-y-5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title or keyword..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDept === dept
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-transparent'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Work Type Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Showing <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{filteredJobs.length}</strong> open positions
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-cyan-500" /> Work Location:
              </span>
              {['All', 'Remote', 'Hybrid'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedWorkType(type)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    selectedWorkType === type
                      ? 'bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 4. JOB OPENINGS LISTING GRID                        */}
        {/* ---------------------------------------------------- */}
        <div className="space-y-4 sm:space-y-5">
          {filteredJobs.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-3 shadow-sm">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching job openings found</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Try adjusting your search criteria or selecting a different department filter.</p>
              <button
                onClick={() => {
                  setSelectedDept('All');
                  setSelectedWorkType('All');
                  setSearchQuery('');
                }}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 ${
                  job.featured
                    ? 'bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950 border-2 border-cyan-500/40 dark:border-cyan-500/40 shadow-xl shadow-cyan-500/5 text-slate-900 dark:text-white'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 shadow-md hover:shadow-xl hover:border-cyan-500/40'
                }`}
              >
                {/* Left Job Info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Featured Tag */}
                    {job.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> Featured Role
                      </span>
                    )}

                    {/* Department Badge */}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-slate-700">
                      {job.department}
                    </span>

                    {/* Work Type Badge */}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      {job.workType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed font-medium">
                      {job.description}
                    </p>
                  </div>

                  {/* Metadata Row: Location, Salary, Experience */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-extrabold text-emerald-700 dark:text-emerald-400">
                      <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {job.experience} exp
                    </span>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right CTA Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800/50">
                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group-hover:scale-105 cursor-pointer"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. JOB APPLICATION MODAL DIALOG                      */}
      {/* ---------------------------------------------------- */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 backdrop-blur-xl bg-slate-950/70 font-['Plus_Jakarta_Sans',sans-serif]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl max-h-[92vh] rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 text-slate-900 dark:text-white shadow-2xl overflow-hidden flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-950/60">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30">
                    {activeJobModal.department}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                    {activeJobModal.title}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-600 dark:text-slate-400 mt-1 flex-wrap font-medium">
                    <span>{activeJobModal.location}</span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">{activeJobModal.salary}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveJobModal(null)}
                  className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Scroll */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                {applicationSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 sm:p-8 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Application Submitted!</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      Thank you for applying to Dezoryn Technologies! Our talent acquisition team will review your details and reach out within 2 business days.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Role Responsibilities */}
                    <div className="space-y-2">
                      <h4 className="text-xs sm:text-sm font-extrabold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">What You Will Do</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-slate-700 dark:text-slate-300 font-medium">
                        {activeJobModal.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-2">
                      <h4 className="text-xs sm:text-sm font-extrabold text-purple-800 dark:text-purple-300 uppercase tracking-wider">What We Are Looking For</h4>
                      <ul className="space-y-1.5 pl-4 list-disc text-slate-700 dark:text-slate-300 font-medium">
                        {activeJobModal.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Application Form */}
                    <form onSubmit={handleApplicationSubmit} className="space-y-3.5 sm:space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Apply For This Role
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={applicantForm.fullName}
                            onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                            placeholder="Alex Mercer"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={applicantForm.email}
                            onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                            placeholder="alex@example.com"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn / Portfolio URL *</label>
                          <input
                            type="url"
                            required
                            value={applicantForm.linkedin}
                            onChange={(e) => setApplicantForm({ ...applicantForm, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/alex"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Resume Link (Drive/Dropbox/PDF) *</label>
                          <input
                            type="url"
                            required
                            value={applicantForm.resumeUrl}
                            onChange={(e) => setApplicantForm({ ...applicantForm, resumeUrl: e.target.value })}
                            placeholder="https://drive.google.com/your-resume.pdf"
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Note / Why Dezoryn Technologies? (Optional)</label>
                        <textarea
                          rows={2}
                          value={applicantForm.coverLetter}
                          onChange={(e) => setApplicantForm({ ...applicantForm, coverLetter: e.target.value })}
                          placeholder="Briefly tell us why you'd be a great fit..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none resize-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                      >
                        Submit Job Application
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CareersPage = CareersSection;
export default CareersSection;
