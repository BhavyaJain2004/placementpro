// require('dotenv').config();
// const mongoose = require('mongoose');
// const Company = require('./models/Company');

// const companies = [
//   {
//     name: 'Hevo Data', domain: 'hevodata.com', type: 'Product',
//     package: 'Stipend: ₹35,000/month | CTC: ₹8 LPA + Benefits + Relocation Bonus', testType: 'Both', year: 2024,
//     eligibility: '70% throughout academic career, No Backlogs',
//     testDetails: 'Visited campus 4 times in 2024. Roles: Account Based Marketing Associate, Marketing Associate, Technical Research Analyst Intern, Associate Technical Writer. Online Test (Virtual) → Video Introduction → PPT at campus → Case Study/Live Exercise → Technical & HR Interview.',
//     process: [
//       { round: 'Online Test', description: 'Virtual aptitude and technical screening test' },
//       { round: 'Video Introduction', description: 'Submit a short video introduction virtually' },
//       { round: 'PPT', description: 'Pre-placement talk at KIIT Campus physically' },
//       { round: 'Case Study / Live Exercise', description: 'Live activity at KIIT Campus physically — shortlisted students only' },
//       { round: 'Technical & HR Interview', description: 'Final interview at KIIT Campus physically. Internship to PPO: Mid-review Aug 31, End-review Nov 30, FTE start July 1 2025' }
//     ],
//     dsaTopics: ['Communication Skills', 'Marketing Basics', 'SQL', 'Problem Solving', 'Aptitude'],
//     tips: 'Visited 4 times — high chance of getting in. Video intro matters a lot, be confident. PPO conversion rate is good. Focus on communication over coding.'
//   },
//   {
//     name: 'JP Morgan Chase', domain: 'jpmorgan.com', type: 'Product',
//     package: 'Will be informed (top-tier compensation)', testType: 'Coding', year: 2024,
//     eligibility: '8.50 or above CGPA in B.Tech, No Backlogs, Not more than 1 year gap in academic career',
//     testDetails: 'Online Coding Test → Video Interview → Code for Good (in-person hackathon at JPMC offices in Mumbai/Bangalore/Hyderabad). Locations: Bengaluru/Hyderabad/Mumbai.',
//     process: [
//       { round: 'Online Coding Test', description: 'HackerRank based coding assessment — DSA focused' },
//       { round: 'Video Interview', description: 'Virtual technical + behavioral interview' },
//       { round: 'Code for Good', description: 'In-person hackathon event at JPMC offices. June-July 2024. Final selection round — build a social good project in a team' }
//     ],
//     dsaTopics: ['Arrays', 'Trees', 'Dynamic Programming', 'Graphs', 'System Design', 'Java'],
//     tips: 'Very high CGPA cutoff (8.5). One of the most prestigious recruiters. Code for Good is a team hackathon — leadership and teamwork matter. Prepare strong DSA + Java basics.'
//   },
//   {
//     name: 'NVIDIA', domain: 'nvidia.com', type: 'Product',
//     package: 'Stipend: ₹75,000/month | B.Tech CTC: ~₹29 LPA | M.Tech CTC: ~₹32.9 LPA', testType: 'Both', year: 2024,
//     eligibility: '7.80 or above CGPA in Current Degree, No Backlogs',
//     testDetails: 'Internship duration 6 months (July–Dec 2024). Locations: Pune, Bangalore, Hyderabad. Online Test → 2 rounds of interviews.',
//     process: [
//       { round: 'Online Test', description: 'Aptitude + Technical MCQs — OS, Computer Architecture, DSA' },
//       { round: 'Interview Round 1', description: 'Technical — DSA + CS fundamentals + C/C++' },
//       { round: 'Interview Round 2', description: 'Deep technical + HR discussion' }
//     ],
//     dsaTopics: ['C/C++', 'OS Concepts', 'Computer Architecture', 'Arrays', 'Trees', 'Graphs', 'GPU Basics'],
//     tips: 'Best package on campus. Focus heavily on OS, Computer Architecture, C/C++ along with DSA. Very competitive — only top students. Hardware knowledge is a plus.'
//   },
//   {
//     name: 'AlgoUniversity', domain: 'algouniversity.com', type: 'Startup',
//     package: 'SWE Intern: ₹80,000/month | Other profiles: ₹30,000/month | SWE FTE: ₹20–22 LPA | Others: ₹10–15 LPA', testType: 'Coding', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profiles: SWE Intern, Business Development Associate, Growth Intern, CEO Office, Problem Setting Intern. Registration → 3-Day Program → Shortlisting → Online Test.',
//     process: [
//       { round: 'Registration', description: 'Register for the 3-day program' },
//       { round: '3-Day Program', description: 'Participate in the program — performance evaluated' },
//       { round: 'Shortlisting', description: 'Based on program performance' },
//       { round: 'Online Test', description: 'Coding + problem solving test (tentatively 30th March 2024)' }
//     ],
//     dsaTopics: ['Problem Solving', 'DSA', 'Competitive Programming', 'Algorithms'],
//     tips: 'Ed-tech company with great SWE package. No CGPA bar — just no backlogs. SWE intern stipend of 80k is exceptional. Strong DSA skills needed.'
//   },
//   {
//     name: 'Hyprbots Systems', domain: 'hyprbots.com', type: 'Startup',
//     package: 'Stipend: ₹35,000/month | CTC: ₹8.40 LPA (post PPO)', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs in B.Tech',
//     testDetails: 'Profile: Business Development – US Market, SaaS Sales. Internship 1 month. PPT → Interviews → Final Interview at KIIT Campus physically.',
//     process: [
//       { round: 'PPT', description: 'Pre-placement talk' },
//       { round: 'Interviews', description: 'Technical + sales aptitude rounds' },
//       { round: 'Final Interview', description: 'At KIIT Campus physically' }
//     ],
//     dsaTopics: ['Communication', 'SaaS Sales Basics', 'Business Development'],
//     tips: 'US market SaaS sales role. Strong communication skills and US market knowledge needed. Good for students interested in sales/business roles.'
//   },
//   {
//     name: 'Lexmark International', domain: 'lexmark.com', type: 'Product',
//     package: 'Stipend: ₹30,000/month | CTC: ₹10.50 LPA (post PPO)', testType: 'Both', year: 2024,
//     eligibility: '85% in 10th & 12th/Diploma, 8.00 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Internship 3 months (May 2024). Process: Interviews only.',
//     process: [
//       { round: 'Technical Interview', description: 'Core CS concepts + domain knowledge' },
//       { round: 'HR Interview', description: 'Behavioral + fitment round' }
//     ],
//     dsaTopics: ['OOPS', 'Java', 'DSA Basics', 'Problem Solving'],
//     tips: 'High academic bar (85% in 10th/12th + 8 CGPA). Good package for service company. Focus on OOPS and Java fundamentals.'
//   },
//   {
//     name: 'Morgan Stanley', domain: 'morganstanley.com', type: 'Product',
//     package: 'Stipend: ₹87,000/month', testType: 'Both', year: 2024,
//     eligibility: '8.00 or above CGPA in Current Degree, No Backlogs',
//     testDetails: 'Apprenticeship Program. Location: Mumbai/Bangalore (physically). Internship 6 months (July 2024). Online Test → 2 Rounds of Interviews.',
//     process: [
//       { round: 'Online Test', description: 'Quantitative aptitude + coding questions' },
//       { round: 'Interview Round 1', description: 'Technical round — DSA + CS fundamentals + Finance basics' },
//       { round: 'Interview Round 2', description: 'Technical + behavioral interview' }
//     ],
//     dsaTopics: ['Arrays', 'LinkedList', 'Trees', 'Dynamic Programming', 'Hashing', 'Finance Basics'],
//     tips: '87k/month stipend is one of the best. Finance domain knowledge helps a lot. Strong DSA required. Very prestigious brand name.'
//   },
//   {
//     name: 'Philips', domain: 'philips.com', type: 'Product',
//     package: 'B.Tech Stipend: ₹45,000/month | B.Tech CTC: ₹11.50 LPA + ₹3 LPA joining bonus | M.Tech Stipend: ₹55,000/month | M.Tech CTC: ₹12 LPA + ₹3 LPA joining bonus', testType: 'Both', year: 2024,
//     eligibility: '70% throughout academic career for B.Tech, 60% for M.Tech, No Backlogs, Max 2 years gap allowed',
//     testDetails: 'Internship 10–11 months (July 2024). Locations: Bangalore/Pune. Online Assessment → Technical Interview → Manager Interview → HR/HireVue.',
//     process: [
//       { round: 'Online Assessment', description: 'Aptitude + Technical MCQs' },
//       { round: 'Technical Interview', description: 'Core technical concepts + DSA + domain knowledge' },
//       { round: 'Manager Interview', description: 'Project discussion + problem-solving approach' },
//       { round: 'HR / HireVue', description: 'HR round or HireVue video interview' }
//     ],
//     dsaTopics: ['Arrays', 'Strings', 'OOPS', 'SQL', 'Embedded Basics', 'Problem Solving'],
//     tips: 'Excellent joining bonus (3 LPA). Manager round is behavioral — prepare STAR method answers. Long internship (10–11 months) with good PPO chances.'
//   },
//   {
//     name: 'Infosys', domain: 'infosys.com', type: 'Service',
//     package: 'Specialist Programmer: ₹9.50 LPA', testType: 'Both', year: 2024,
//     eligibility: '60% aggregate in 10th, 12th & 6.00 or above CGPA in B.Tech, No Backlogs, Willing to relocate',
//     testDetails: 'Pan India locations. Online Test (Virtual) → Interviews (Physically). InfyTQ platform used for tests.',
//     process: [
//       { round: 'Online Test (InfyTQ)', description: 'Aptitude + Verbal + Logical Reasoning + Coding on InfyTQ platform. Conducted virtually.' },
//       { round: 'Technical Interview', description: 'Core CS subjects — OOPS, DBMS, OS, DSA basics. Ask about projects.' },
//       { round: 'HR Interview', description: 'Standard HR questions, relocation willingness, why Infosys' }
//     ],
//     dsaTopics: ['Arrays', 'Strings', 'Sorting', 'OOPS', 'DBMS', 'SQL', 'OS Basics'],
//     tips: 'Largest mass recruiter. Practice InfyTQ mock tests — very similar to actual test. 6 CGPA bar makes it accessible. Specialist Programmer track (9.5 LPA) is best profile to target.'
//   },
//   {
//     name: 'Accenture', domain: 'accenture.com', type: 'Service',
//     package: 'ASE/AASE: ₹4.5–8 LPA (varies by profile)', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs in B.Tech (very accessible)',
//     testDetails: 'Profiles: Associate Software Engineer (ASE), Advanced Associate Software Engineer (AASE). 202 students with LOR. PPT → Cognitive + Technical + Communication Assessment → Interview.',
//     process: [
//       { round: 'PPT', description: 'Pre-Placement Talk on 26th July 2024' },
//       { round: 'Cognitive Assessment', description: 'Logical reasoning + quantitative aptitude' },
//       { round: 'Technical Assessment', description: 'Technical MCQs + basic coding' },
//       { round: 'Communication Test', description: 'English communication assessment — spoken + written' },
//       { round: 'Interview', description: 'Technical + HR discussion for shortlisted students' }
//     ],
//     dsaTopics: ['Arrays', 'Strings', 'Sorting', 'Basic OOPS', 'SQL', 'Aptitude'],
//     tips: 'No CGPA cutoff — just no backlogs. Communication test is important, practice spoken English. Two tracks: ASE (lower package) and AASE (higher package). Large recruiter — good chance of selection.'
//   },
//   {
//     name: 'Deloitte', domain: 'deloitte.com', type: 'Service',
//     package: 'Competitive (role-dependent)', testType: 'Both', year: 2024,
//     eligibility: 'Analyst: 6.00+ CGPA, No Backlogs | Analytics Specialist: 6.50+ CGPA, 60% in 10th, 12th',
//     testDetails: 'Pan India. Online Test (Virtual) → Further Rounds. Two profiles: Analyst and Analytics Specialist Assistant.',
//     process: [
//       { round: 'Online Test', description: 'Aptitude + Technical + Verbal Reasoning — conducted virtually on 14th August 2024' },
//       { round: 'Further Rounds', description: 'Technical and HR interviews for shortlisted students (20th August 2024)' }
//     ],
//     dsaTopics: ['Arrays', 'SQL', 'DBMS', 'Basic DSA', 'Analytics Basics', 'Statistics'],
//     tips: 'Good brand name. Deloitte US India profiles are prestigious. Analytics role needs stats/data knowledge. Focus on aptitude and reasoning for online test.'
//   },
//   {
//     name: 'Turing AI', domain: 'turing.com', type: 'Product',
//     package: 'Stipend: To be notified | CTC: ₹3.50 LPA', testType: 'Coding', year: 2024,
//     eligibility: '60% in 10th & 12th, 7.00 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profiles: Data Scientist, Software Engineer. Remote (WFH). Online Test → Written Assessment → Interview.',
//     process: [
//       { round: 'Online Test', description: 'Two coding challenges' },
//       { round: 'Written Assessment', description: 'Technical written evaluation' },
//       { round: 'Interview', description: 'Technical discussion' }
//     ],
//     dsaTopics: ['Python', 'Machine Learning Basics', 'DSA', 'Problem Solving'],
//     tips: 'Remote work opportunity. Lower package but remote flexibility. Good for Data Science enthusiasts.'
//   },
//   {
//     name: 'Equal', domain: 'equal.com', type: 'Startup',
//     package: 'Stipend: ₹50,000/month | CTC: ₹15–20 LPA (post successful internship)', testType: 'Both', year: 2024,
//     eligibility: '6.00 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profile: Full Stack Intern. Location: Hyderabad. 6 months internship.',
//     process: [
//       { round: 'Process', description: 'To be notified after registration' }
//     ],
//     dsaTopics: ['Full Stack Development', 'React', 'Node.js', 'MongoDB', 'DSA Basics'],
//     tips: 'Excellent CTC potential (15–20 LPA) post internship. 50k stipend is great for a startup. Full Stack skills required — React + Node.js.'
//   },
//   {
//     name: 'Pando AI', domain: 'pando.ai', type: 'Startup',
//     package: 'Stipend: ₹25,000/month | CTC: ₹6 LPA fixed + ₹2 LPA variable + 62k allowances = ₹8.62 LPA total', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Visited twice. Internship 6 months. Online Test → PPT at campus → Interview at campus physically.',
//     process: [
//       { round: 'Online Test', description: 'Virtual screening test' },
//       { round: 'PPT', description: 'Pre-placement talk at KIIT Campus physically' },
//       { round: 'Interview', description: 'Technical + HR at KIIT Campus physically' }
//     ],
//     dsaTopics: ['Supply Chain Basics', 'Python', 'DSA', 'Problem Solving'],
//     tips: 'Supply chain tech company. Visited twice — good hiring intent. No CGPA cutoff. Total package with allowances is 8.62 LPA.'
//   },
//   {
//     name: 'CRTD Technologies', domain: 'crtdtech.com', type: 'Startup',
//     package: 'Stipend: ₹35,000/month | PPO possible at ₹7 LPA', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profile: Software Developer Intern. Remote/Work from office. 3 months. PPT → GD → Coding Round → HR Round.',
//     process: [
//       { round: 'PPT', description: 'Pre-placement talk' },
//       { round: 'Group Discussion', description: 'Topic-based GD round' },
//       { round: 'Coding Round', description: 'Technical coding assessment' },
//       { round: 'HR Round', description: 'Final HR interview' }
//     ],
//     dsaTopics: ['Web Development', 'DSA Basics', 'Problem Solving', 'OOPS'],
//     tips: 'GD round — practice group discussion topics. Remote option available. Good for students who want dev experience.'
//   },
//   {
//     name: 'rtCamp Solutions', domain: 'rtcamp.com', type: 'Product',
//     package: 'Stipend: ₹50,000/month | CTC: ₹12–18 LPA (on confirmation)', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs, Solid CS fundamentals, Well-maintained GitHub profile with codebase',
//     testDetails: 'Visited 3 times in 2024. Profile: Software Engineer (Trainee). Remote/WFH. 6 months internship (Jan 2025). Shortlisting → Interview.',
//     process: [
//       { round: 'Shortlisting', description: 'Resume + GitHub profile shortlisting. Active GitHub profile is MANDATORY.' },
//       { round: 'Interview', description: 'Technical interview — WordPress, PHP, JS, open source contribution discussion' }
//     ],
//     dsaTopics: ['WordPress', 'PHP', 'JavaScript', 'Open Source', 'GitHub', 'Web Dev'],
//     tips: 'Visited 3 times — high interest in KIIT. GitHub profile is critical — build projects. WordPress/PHP expertise needed. Remote work. 50k stipend + 12–18 LPA CTC is excellent.'
//   },
//   {
//     name: 'A.P. Moller Maersk', domain: 'maersk.com', type: 'Product',
//     package: 'Stipend: ₹50,000/month | CTC: ₹10.83 LPA', testType: 'Both', year: 2024,
//     eligibility: '7.00 or above CGPA upto 6th Sem in B.Tech, No Backlogs',
//     testDetails: 'Profile: Corporate Platforms. Location: Bangalore. 1 year internship (July 2024). Online Assessment → PPT → Interviews.',
//     process: [
//       { round: 'Online Assessment', description: 'Technical + aptitude test' },
//       { round: 'PPT', description: 'Pre-placement talk' },
//       { round: 'Interviews', description: 'Technical + HR interview rounds' }
//     ],
//     dsaTopics: ['Supply Chain', 'DSA', 'Python', 'SQL', 'Problem Solving'],
//     tips: 'Maersk is global shipping/logistics leader. 1-year internship with good pay. Logistics domain knowledge is a plus.'
//   },
//   {
//     name: 'YugaByte Software', domain: 'yugabyte.com', type: 'Product',
//     package: 'Stipend: ₹80,000/month | CTC: ₹21 LPA base + ₹9000 stock units (~₹20 LPA + employee benefits)', testType: 'Coding', year: 2024,
//     eligibility: '8.00 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profile: SDET (Software Development Engineer in Test). Location: Bangalore/Pune (on-site). 6 months (July–December).',
//     process: [
//       { round: 'Online Test', description: 'Tentatively 16th May 2024 — coding + technical MCQs' },
//       { round: 'Interview', description: 'Tentatively 24th May 2024 — technical + SDET-specific discussion' }
//     ],
//     dsaTopics: ['Java', 'Testing Frameworks', 'DSA', 'Databases', 'Distributed Systems'],
//     tips: 'Database company (YugabyteDB). 80k stipend! High 8 CGPA bar. SDET role — testing knowledge + coding both needed. Stock units add significant value.'
//   },
//   {
//     name: 'Hike', domain: 'hike.in', type: 'Product',
//     package: 'To be notified', testType: 'Coding', year: 2024,
//     eligibility: '7.00 or above CGPA in B.Tech',
//     testDetails: 'Profiles: SDE Backend/Server, SDE Android. Online HackerRank Assignment → Hangout Interviews (multiple rounds).',
//     process: [
//       { round: 'HackerRank Assignment', description: '60–90 minutes online coding assignment' },
//       { round: 'DS & Algorithms Round', description: 'Technical interview focused on DSA' },
//       { round: 'Problem Solving + OS + Language Round', description: 'OS concepts + language-specific + problem solving' },
//       { round: 'Multithreading & Synchronisation', description: 'Concurrency and threading concepts' },
//       { round: 'Code & Culture Round', description: 'Hike culture fit + coding discussion' }
//     ],
//     dsaTopics: ['Arrays', 'Trees', 'Graphs', 'OS Concepts', 'Multithreading', 'Android Dev', 'Backend'],
//     tips: 'Multiple technical rounds. Strong DSA + OS knowledge needed. Android role needs Android dev experience. Culture round is conversational.'
//   },
//   {
//     name: 'Junglee Games', domain: 'jungleegames.com', type: 'Startup',
//     package: 'Stipend: ₹40,000/month | FTE: ₹14 LPA fixed + ₹1.4L bonus + retention bonuses = up to ₹21.4 LPA over 3 years', testType: 'Both', year: 2024,
//     eligibility: '60% throughout academic career, No Backlogs',
//     testDetails: 'Profile: SDE Intern. Locations: Bengaluru & Gurugram. 12 months. Online Test → Campus Presentation → Technical & HR Interviews (same day results).',
//     process: [
//       { round: 'Online Test', description: '90 min test (virtual) — DSA + Aptitude. 25th May 2024 (10 AM–1 PM window)' },
//       { round: 'Campus Presentation', description: 'In-person presentation at college — 30th May 2024 (9:30–10:30 AM)' },
//       { round: 'Technical Interview', description: 'DSA + technical concepts — 30th May 2024' },
//       { round: 'HR Interview', description: 'HR round — 30th May. Results declared same day at 7:30 PM! Letter of Intent provided same day.' }
//     ],
//     dsaTopics: ['Arrays', 'Strings', 'Dynamic Programming', 'Trees', 'Game Logic', 'Problem Solving'],
//     tips: 'Gaming company with amazing retention bonuses. Results same day! Low CGPA bar (60%). Fast hiring process. Great for low-CGPA students who code well.'
//   },
//   {
//     name: 'Toplyne', domain: 'toplyne.ai', type: 'Startup',
//     package: 'Stipend: ₹55,000/month | CTC: ₹15–18 LPA + ESOP', testType: 'Coding', year: 2024,
//     eligibility: '8.50 or above CGPA in B.Tech upto 6th Sem, No Backlogs',
//     testDetails: 'Profile: SDE Intern (Backend, Frontend). Location: Bengaluru (Jan 2025). PPT/Online Test → Technical Round 1 → Technical Round 2 + Manager Chat.',
//     process: [
//       { round: 'PPT / Online Test', description: 'Pre-placement talk + online screening' },
//       { round: 'Technical Round 1', description: 'DSA problem solving + coding' },
//       { round: 'Technical Round 2 + Manager', description: 'Advanced technical + manager discussion on product/engineering thinking' }
//     ],
//     dsaTopics: ['Arrays', 'Trees', 'Dynamic Programming', 'System Design', 'Backend', 'APIs'],
//     tips: 'Product-led growth startup. Very high CGPA bar (8.5). Strong DSA + product thinking valued. ESOPs add long-term value. 55k stipend excellent for startup.'
//   },
//   {
//     name: 'Pine Labs', domain: 'pinelabs.com', type: 'Product',
//     package: 'Stipend: ₹40,000/month | CTC: ₹11 LPA', testType: 'Coding', year: 2024,
//     eligibility: '8.50 or above CGPA in Current Degree, No Backlogs',
//     testDetails: 'Profile: Software Engineer Intern. Locations: Noida, Bangalore, Pune, Mumbai. 10 months (3rd September 2024). Online Technical Assessment → Panel Interviews.',
//     process: [
//       { round: 'Online Technical Assessment', description: 'Coding questions + technical MCQs' },
//       { round: 'Panel Interview', description: 'Multiple interviewers — DSA + System Design + CS fundamentals' }
//     ],
//     dsaTopics: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'System Design', 'FinTech Basics'],
//     tips: 'FinTech company (payments). High CGPA bar (8.5). Good 40k stipend + 11 LPA. Prepare system design basics. Panel interview has multiple people — stay calm.'
//   },
//   {
//     name: 'Bain & Company', domain: 'bain.com', type: 'Product',
//     package: 'Stipend: ₹40,000/month + ₹30,000 relocation | CTC: ₹9.9 LPA fixed + ₹1.1L bonus + ₹3L signing bonus = ₹14 LPA total', testType: 'Both', year: 2024,
//     eligibility: '60% throughout academic career, No Backlogs',
//     testDetails: 'Profile: Intern Analyst. Locations: Gurgaon/Bangalore. 6 months (January 2025). Registration on BCN portal MANDATORY → PPT → Online Test → Case Study Workshop → 2 Virtual Interviews.',
//     process: [
//       { round: 'BCN Portal Registration', description: 'Mandatory registration on Bain career portal BEFORE applying' },
//       { round: 'PPT', description: 'Pre-placement talk virtually on 26th July 2024' },
//       { round: 'Online Test', description: 'Aptitude + case reasoning on 29th July 2024 (virtually)' },
//       { round: 'Case Study Workshop', description: 'Virtual case study workshop on 31st July 2024 — shortlisted students only' },
//       { round: 'Virtual Interviews', description: '2 rounds — case study interview + behavioral/fit interview' }
//     ],
//     dsaTopics: ['Case Frameworks', 'Analytical Reasoning', 'Business Problem Solving', 'Communication'],
//     tips: 'Consulting firm — no hardcore DSA needed. Case study prep is KEY (practice BCG/McKinsey case frameworks). 3 LPA signing bonus paid in 3 tranches. Excellent brand. 60% bar is accessible.'
//   },
//   {
//     name: 'ION Group', domain: 'iongroup.com', type: 'Product',
//     package: 'CTC: ₹17.30 LPA (₹15 LPA fixed)', testType: 'Both', year: 2024,
//     eligibility: '75% throughout academic career, No Backlogs',
//     testDetails: 'Profiles: Software Developer, Technical Analyst. Locations: Noida, Gurgaon, Hyderabad, Pune, Mumbai. Joining Jan 2025. PPT → Online Test → Multi-Round Interview → Final at Noida office.',
//     process: [
//       { round: 'PPT', description: 'Pre-placement talk on 25th July 2024' },
//       { round: 'Online Test', description: 'Technical + aptitude assessment on 25th July 2024' },
//       { round: 'Interview', description: 'Technical + Case Study + Stakeholder + Culture Fit + Future Fit rounds on 29th July' },
//       { round: 'Final Interview', description: 'In-person at Noida office for final shortlist' }
//     ],
//     dsaTopics: ['Arrays', 'Graphs', 'Dynamic Programming', 'System Design', 'Financial Tech'],
//     tips: 'FinTech with great package (17.3 LPA). Multiple interview rounds — prepare case study. Final round is in Noida physically. Strong 75% academic bar.'
//   },
//   {
//     name: 'GlobalLogic (Hitachi)', domain: 'globallogic.com', type: 'Service',
//     package: 'CTC: ₹5.66 LPA', testType: 'Both', year: 2024,
//     eligibility: '60% throughout academic career, No Backlogs, Max 1 year gap, No correspondence courses',
//     testDetails: 'Profile: Software Engineer. Locations: Noida/GGN/Bangalore/Hyderabad/Pune/Nagpur/Chennai. Online Assessment → Technical Interview → Managerial Interview → HR Interview.',
//     process: [
//       { round: 'Online Assessment', description: 'Technical MCQs + Aptitude + Reasoning' },
//       { round: 'Technical Interview', description: 'Core CS concepts + coding discussion' },
//       { round: 'Managerial Interview', description: 'Behavioral + situational questions' },
//       { round: 'HR Interview', description: 'Standard HR round' }
//     ],
//     dsaTopics: ['Arrays', 'OOPS', 'DBMS', 'OS', 'Basic DSA', 'Aptitude'],
//     tips: 'Hitachi subsidiary. Good for service background. Low package (5.66 LPA). Accessible 60% cutoff. Focus on CS fundamentals. No correspondence courses allowed.'
//   },
//   {
//     name: 'Tredence Analytics', domain: 'tredence.com', type: 'Product',
//     package: 'CTC: ₹10 LPA', testType: 'Both', year: 2024,
//     eligibility: '70% throughout academic career, No Backlogs',
//     testDetails: 'Profile: Analyst. Locations: Bengaluru, Chennai, Gurugram, Pune, Kolkata.',
//     process: [
//       { round: 'Shortlisting', description: 'Resume + academic performance' },
//       { round: 'Analytics Assessment', description: 'Analytics + technical test' },
//       { round: 'Interview', description: 'Technical + HR rounds' }
//     ],
//     dsaTopics: ['SQL', 'Python', 'Statistics', 'Data Analytics', 'Excel', 'Problem Solving'],
//     tips: 'Analytics company. Focus on SQL, Python, statistics. Data analytics knowledge valued. Good 10 LPA for analytics role.'
//   },
//   {
//     name: 'Chubb', domain: 'chubb.com', type: 'Product',
//     package: 'Stipend: ₹35,000/month | CTC: ₹9.52 LPA + ₹1.6L relocation/joining bonus | Variable: 0–0.95L', testType: 'Coding', year: 2024,
//     eligibility: '70% throughout academic career, No Backlogs',
//     testDetails: 'Profile: Trainee Software Engineer. Location: Hyderabad. Visited twice. 6 months internship. PPT → HackerRank Test at campus → Interview.',
//     process: [
//       { round: 'PPT', description: 'Virtual pre-placement talk' },
//       { round: 'HackerRank Test', description: 'Coding test conducted at KIIT Campus physically on 16th August' },
//       { round: 'Interview', description: 'Technical + HR interview rounds' }
//     ],
//     dsaTopics: ['Arrays', 'Strings', 'Trees', 'Dynamic Programming', 'Java', 'Problem Solving'],
//     tips: 'Insurance tech company. Visited twice — good recruitment intent. HackerRank on campus. Good package (9.52 LPA + 1.6L bonus). Prepare medium DSA problems.'
//   },
//   {
//     name: 'Amagi Media Labs', domain: 'amagi.com', type: 'Product',
//     package: 'Stipend: ₹30,000/month | CTC: ₹12 LPA + ₹3 LPA retention bonus', testType: 'Coding', year: 2024,
//     eligibility: '80% throughout academic career, No Backlogs',
//     testDetails: 'Profile: SDE-1. Location: Bangalore (in-office, 5 days/week). 11–12 months internship. Online Technical Test → 2 Interview Rounds. FTE conversion based on performance.',
//     process: [
//       { round: 'Online Technical Test', description: 'DSA + technical knowledge — 3 offers given' },
//       { round: 'Interview Round 1', description: 'Technical — DSA + CS concepts' },
//       { round: 'Interview Round 2', description: 'Advanced technical + system design discussion' }
//     ],
//     dsaTopics: ['Arrays', 'Trees', 'Graphs', 'System Design', 'Cloud', 'Distributed Systems'],
//     tips: 'Media tech (cloud TV). High bar (80%). 12 LPA + 3 LPA retention is great. Focus on distributed systems + DSA. Only 3 offers — very selective.'
//   },
//   {
//     name: 'Micron Technology', domain: 'micron.com', type: 'Product',
//     package: 'To be disclosed', testType: 'Both', year: 2024,
//     eligibility: '6.00 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profile: Quality Assurance Automation Engineer. Location: Hyderabad. Full-time joining Jun/Jul 2025. Internship Jan–Jun 2025. All rounds virtual.',
//     process: [
//       { round: 'PPT', description: 'Virtual pre-placement talk on 8th August 2024 at 12 PM' },
//       { round: 'Online Test', description: 'Technical + aptitude test on 8th August 2024 at 4 PM (virtually)' },
//       { round: 'Interview', description: 'Virtual technical interview on 21st August 2024 at 10 AM' }
//     ],
//     dsaTopics: ['C/C++', 'OS Concepts', 'Computer Architecture', 'Testing', 'Automation', 'Memory Systems'],
//     tips: 'Semiconductor/memory chip company. Low 6 CGPA bar — very accessible. QA Automation role — testing knowledge + coding both needed. C/C++ and hardware concepts important.'
//   },
//   {
//     name: 'Plotline', domain: 'plotline.so', type: 'Startup',
//     package: 'Stipend: ₹55,000/month | CTC: ₹14–18 LPA', testType: 'Coding', year: 2024,
//     eligibility: '80% throughout academic career, No Backlogs',
//     testDetails: 'Profile: SDE Intern (Backend/Frontend/Mobile). Location: Bengaluru (work from office). 6 months (Jan 2025). Coding Test → Technical Discussion → Non-Tech Discussion.',
//     process: [
//       { round: 'Coding Test', description: 'DSA + problem solving coding round' },
//       { round: 'Technical Discussion', description: 'Deep dive into solutions + new problems + tech stack discussion' },
//       { round: 'Non-Tech Discussion', description: 'Culture fit + product thinking + why Plotline' }
//     ],
//     dsaTopics: ['Arrays', 'Trees', 'Dynamic Programming', 'Backend APIs', 'System Design', 'Mobile Dev'],
//     tips: 'Early-stage startup with great compensation. High 80% academic bar. Strong coding + product thinking valued. 55k stipend excellent. Non-tech round — research Plotline product beforehand.'
//   },
//   {
//     name: 'Junglee Games (2nd Visit)', domain: 'jungleegames.com', type: 'Startup',
//     package: 'Same as first visit', testType: 'Both', year: 2024,
//     eligibility: '60% throughout academic career, No Backlogs',
//     testDetails: 'Second campus visit. Same process as before.',
//     process: [
//       { round: 'Online Test', description: 'DSA + Aptitude (virtual)' },
//       { round: 'Technical Interview', description: 'DSA + technical concepts' },
//       { round: 'HR Interview', description: 'Behavioral round — results same day' }
//     ],
//     dsaTopics: ['Arrays', 'Dynamic Programming', 'Trees', 'Problem Solving'],
//     tips: 'Second chance if missed first visit. Same process. Low CGPA bar (60%). Good opportunity.'
//   },
//   {
//     name: 'Wabtec Corporation', domain: 'wabtec.com', type: 'Product',
//     package: 'B.Tech Stipend: ₹30,000/month | M.Tech Stipend: ₹35,000/month', testType: 'Both', year: 2024,
//     eligibility: '60% throughout academic career, No Backlogs',
//     testDetails: 'Location: Bangalore. Post-internship PAN India (Hosur, Bangalore, Kolkata, Bihar). 6 months to 1 year (Sep 2024).',
//     process: [
//       { round: 'Shortlisting', description: 'Resume-based shortlisting' },
//       { round: 'Technical Interview', description: 'Domain + technical discussion' },
//       { round: 'HR Interview', description: 'Behavioral round' }
//     ],
//     dsaTopics: ['Core Engineering', 'Problem Solving', 'Basic Programming', 'Railway Tech'],
//     tips: 'Transportation/railway tech. Low eligibility (60%). Accessible for average CGPA students. PAN India locations available post-internship.'
//   },
//   {
//     name: 'OneBanc', domain: 'onebanc.in', type: 'Startup',
//     package: 'DevOps: ₹20k stipend/₹5–7 LPA | UI/UX: ₹25k/₹8–10 LPA | Android/iOS/Frontend/Backend: ₹25k/₹8–10 LPA', testType: 'Both', year: 2024,
//     eligibility: '80% throughout academic career, No Backlogs',
//     testDetails: 'Profiles: DevOps, UI/UX, Android, iOS, Frontend, Backend. Location: Gurugram (work from office). Visited twice. Relocation to Gurugram MANDATORY. Company covers travel, meals, stay during Pre-Hiring Evaluation.',
//     process: [
//       { round: 'Group Discussion', description: 'Topic-based GD round' },
//       { round: 'Virtual Interview', description: '30 minutes virtual interview' },
//       { round: 'Aptitude Test', description: '15 minutes aptitude assessment' },
//       { round: 'Pre-Hiring Evaluation', description: '2 days at Gurugram office physically — company pays for travel, stay, meals' }
//     ],
//     dsaTopics: ['Role-specific: Frontend (React), Backend (Node), Android, iOS, DevOps', 'DSA Basics'],
//     tips: 'High academic bar (80%). Gurgaon relocation is mandatory but company covers all costs for evaluation. Multiple tech profiles available. Good for students wanting fintech startup experience.'
//   },
//   {
//     name: 'Genspark (formerly ProGrad)', domain: 'genspark.ai', type: 'Startup',
//     package: 'Training Stipend: ₹15,000/month | First 3 months: ₹15,000/month | Post 3 months: ₹20,000/month | CTC: ₹10 LPA', testType: 'Coding', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profile: Associate Software Engineer. Location: Delhi (work from office). 8 weeks training. Online Technical Test × 2 → Coding Task + Review → Technical Interview → Final Technical + Cultural Fitment.',
//     process: [
//       { round: 'Online Technical Test 1', description: 'Aptitude + basic technical' },
//       { round: 'Online Technical Test 2', description: 'Advanced technical screening' },
//       { round: 'Coding Task + Review', description: 'Take-home coding task followed by review discussion' },
//       { round: 'Technical Interview', description: 'Deep technical interview' },
//       { round: 'Final Round', description: 'Technical + Cultural Fitment by Simpplr team' }
//     ],
//     dsaTopics: ['DSA', 'Web Development', 'Problem Solving', 'System Thinking'],
//     tips: 'No CGPA bar — just no backlogs. Multiple rounds but thorough process. Training period with lower stipend. Good for students with no CGPA advantage but strong skills.'
//   },
//   {
//     name: 'Cognida AI', domain: 'cognida.ai', type: 'Startup',
//     package: 'Stipend: ₹20,000/month | CTC: ₹7 LPA', testType: 'Coding', year: 2024,
//     eligibility: '7.00 or above CGPA in B.Tech/MCA, No Backlogs',
//     testDetails: 'Profile: Software Developer. Location: Hyderabad. 4–6 months (Dec 2024). Online Coding Test → Interviews.',
//     process: [
//       { round: 'Online Coding Test', description: 'DSA coding problems' },
//       { round: 'Technical Interview', description: 'DSA + tech stack discussion' },
//       { round: 'HR Interview', description: 'Behavioral round' }
//     ],
//     dsaTopics: ['DSA', 'Python', 'AI/ML Basics', 'Problem Solving'],
//     tips: 'AI-focused startup. MCA students also eligible. Good for AI/ML interested students. Hyderabad location.'
//   },
//   {
//     name: 'DeltaX', domain: 'deltax.net', type: 'Product',
//     package: 'CTC: ₹7 LPA (No stipend during 4-month virtual training Jan–Apr 2025)', testType: 'Both', year: 2024,
//     eligibility: '50% or above throughout academic career, No Backlogs',
//     testDetails: 'Profile: Associate Product Engineer. Locations: Bangalore, Hyderabad, Pune. Full-time. Training mode: Virtual. Online MCQ Test → Online Coding Test → Interview.',
//     process: [
//       { round: 'Online MCQ Test', description: 'Aptitude + technical MCQs' },
//       { round: 'Online Coding Test', description: 'Coding assessment' },
//       { round: 'Interview', description: 'Technical + HR interview' }
//     ],
//     dsaTopics: ['DSA Basics', 'Web Dev', 'Problem Solving', 'Ad Tech'],
//     tips: 'Very low eligibility bar (50%) — most accessible company. No stipend during training (4 months virtual). Good for low percentage students. Ad-tech domain.'
//   },
//   {
//     name: 'TheMathCompany (2nd Visit)', domain: 'themathcompany.com', type: 'Product',
//     package: 'Year 1: ₹5.5 LPA (4.5L fixed + 1L bonus) | Year 2: ₹8 LPA | Year 3: ₹12.5 LPA', testType: 'Both', year: 2024,
//     eligibility: '6.50 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profile: Trainee Analyst. Location: Bengaluru. Visited twice. Round 1: Online Assessment (Logical, Quant, Pseudocode, Communication) → Round 2: PPT + Technical + HR.',
//     process: [
//       { round: 'Online Assessment', description: 'Logical Reasoning + Quantitative Aptitude + Pseudocode + Communication Test (10th August 2024)' },
//       { round: 'Pre-placement Talk', description: 'Company overview and role discussion' },
//       { round: 'Technical + HR Rounds', description: 'Technical interview + HR discussion (at campus)' }
//     ],
//     dsaTopics: ['Analytics', 'Statistics', 'Pseudocode', 'Logical Reasoning', 'Quantitative Aptitude'],
//     tips: 'Analytics consulting firm. Great growth trajectory (5.5 → 8 → 12.5 LPA). Communication test is unique — practice clearly explaining technical concepts. Pseudocode round — focus on logic, not syntax.'
//   },
//   {
//     name: 'Ayaskanta Analytics', domain: 'ayaskanta.com', type: 'Startup',
//     package: 'Stipend: ₹10,000–₹20,000/month', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profile: Software Trainee Developer Intern. Location: Pune (Karve Nagar). 3 months (June 2024). Online Aptitude Test → Interview (Tech + HR).',
//     process: [
//       { round: 'Online Aptitude Test', description: 'Aptitude and reasoning test' },
//       { round: 'Technical + HR Interview', description: 'Combined tech and HR round' }
//     ],
//     dsaTopics: ['DSA Basics', 'Web Dev', 'Problem Solving', 'Data Analytics'],
//     tips: 'Small analytics firm in Pune. Lower stipend but good learning opportunity. Simple 2-round process.'
//   },
//   {
//     name: 'Celebal Technology', domain: 'celebaltech.com', type: 'Service',
//     package: 'No stipend (summer internship)', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profile: Summer Internship. Virtual. 2 months.',
//     process: [
//       { round: 'Registration', description: 'Register for summer internship' },
//       { round: 'Selection', description: 'Based on registration and profile' }
//     ],
//     dsaTopics: ['Data Science', 'Python', 'Machine Learning', 'Azure'],
//     tips: 'No stipend but good tech exposure (Microsoft Azure/SAP). Good for resume building. Free internship — easy to get.'
//   },
//   {
//     name: 'Sprouts AI', domain: 'sprouts.ai', type: 'Startup',
//     package: 'Stipend: ₹25,000/month | CTC: ₹7 LPA (₹5L fixed + ₹2L variable)', testType: 'Both', year: 2024,
//     eligibility: '7.00 or above CGPA in B.Tech, No Backlogs, Relevant skills and positive attitude',
//     testDetails: 'Profile: Account-Based Marketing. Location: Bangalore. 10 months (mid-June 2024). Online Test → Task Assignment → Culture Fit Interview.',
//     process: [
//       { round: 'Online Test', description: 'Aptitude + marketing basics' },
//       { round: 'Task Assignment', description: 'Practical marketing task' },
//       { round: 'Culture Fit Interview', description: 'Attitude + fit assessment' }
//     ],
//     dsaTopics: ['Marketing', 'Communication', 'B2B SaaS', 'Analytics'],
//     tips: 'Marketing/sales role — not pure tech. Good for students interested in marketing + tech. Culture fit matters a lot here.'
//   },
//   {
//     name: 'PeopleHum Technologies', domain: 'peoplehum.com', type: 'Product',
//     package: 'Dev Stipend: ₹28,000/month, CTC: ₹7 LPA | SDET Stipend: ₹25,000/month, CTC: ₹5.75 LPA', testType: 'Coding', year: 2024,
//     eligibility: '80% or above throughout academic career, No Backlogs',
//     testDetails: 'Profiles: Software Engineering (Dev), SDET. Locations: Bangalore, Hyderabad, Pune. 6 months (Jan 2025).',
//     process: [
//       { round: 'Shortlisting', description: 'Based on academic performance (80% cutoff)' },
//       { round: 'Technical Assessment', description: 'Coding + technical MCQs' },
//       { round: 'Interview', description: 'Technical + HR rounds' }
//     ],
//     dsaTopics: ['DSA', 'Java/Python', 'Testing Basics', 'OOPS', 'System Design Basics'],
//     tips: 'HR-tech company. High 80% academic bar. Two profiles — Dev and SDET. SDET package lower. Focus on DSA and OOPS for Dev role.'
//   },
//   {
//     name: 'Brakes India', domain: 'brakesindia.com', type: 'Product',
//     package: 'Stipend: ₹15,000/month | Year 1: ₹3.79 LPA | Year 1.5: ₹4.41 LPA | Year 2: ₹5.13 LPA', testType: 'Both', year: 2024,
//     eligibility: '80% in 10th & 12th, 7.50 or above in B.Tech, No Backlogs',
//     testDetails: 'Profile: Graduate Engineer Trainee. 6 months internship (Jan 2025). Technical + Aptitude Test → Group Discussion → Technical + HR Interview.',
//     process: [
//       { round: 'Technical + Aptitude Test', description: 'Combined technical and aptitude test' },
//       { round: 'Group Discussion', description: 'GD round — topic based' },
//       { round: 'Interview', description: 'Technical + HR interview' }
//     ],
//     dsaTopics: ['Core Engineering', 'Automotive Basics', 'Problem Solving', 'Technical Aptitude'],
//     tips: 'Automotive component manufacturer. High academic bar (80% in 10th/12th + 7.5 CGPA). Core engineering company — not pure software. GD round important.'
//   },
//   {
//     name: 'Affinsys', domain: 'affinsys.com', type: 'Service',
//     package: 'Stipend: ₹20,000/month | CTC: ₹8.50 LPA | Service Bond: ₹3L for 2 years', testType: 'Both', year: 2024,
//     eligibility: '8.50 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profile: Software Engineer. Location: Bangalore. 1 year mandatory internship.',
//     process: [
//       { round: 'Process', description: 'To be informed after registration' }
//     ],
//     dsaTopics: ['DSA', 'Java', 'OOPS', 'DBMS', 'Problem Solving'],
//     tips: 'High CGPA bar (8.5). Service bond of ₹3L for 2 years employment + internship. Good 8.5 LPA CTC. Plan for bond commitment.'
//   },
//   {
//     name: 'Restroworks (formerly Posist)', domain: 'restroworks.com', type: 'Product',
//     package: 'Training: ₹23,000/month | Probation (3 months): ₹25,000/month | FTE: ₹9–12 LPA', testType: 'Coding', year: 2024,
//     eligibility: '6.00 or above CGPA in B.Tech, No Backlogs',
//     testDetails: 'Profile: MEAN Stack Developer. Location: Delhi. 3 months training + 3 months probation.',
//     process: [
//       { round: 'Process', description: 'To be informed — MEAN Stack technical screening expected' }
//     ],
//     dsaTopics: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JavaScript', 'DSA Basics'],
//     tips: 'Restaurant tech company. MEAN Stack role — strong full-stack skills needed. Delhi location. Good 9–12 LPA post conversion. Low 6 CGPA bar.'
//   },
//   {
//     name: 'GoComet', domain: 'gocomet.com', type: 'Startup',
//     package: 'QA Stipend: ₹29,166/month, CTC: ₹4.5–5.5 LPA | DevOps/Cybersecurity Stipend: ₹25k–45k/month, CTC: ₹8–12 LPA', testType: 'Coding', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profiles: QA Intern (6 months), DevOps & Cybersecurity Intern (1 year). Location: Bangalore.',
//     process: [
//       { round: 'Process', description: 'To be notified' }
//     ],
//     dsaTopics: ['QA Testing', 'DevOps Tools', 'Cybersecurity Basics', 'Python', 'Linux'],
//     tips: 'Logistics tech startup. No CGPA bar. DevOps/Cybersecurity track has better package (8–12 LPA). Good for students interested in infrastructure and security.'
//   },
//   {
//     name: 'EPAM Systems', domain: 'epam.com', type: 'Service',
//     package: 'Stipend: ₹25,000/month | CTC: ₹8 LPA', testType: 'Coding', year: 2024,
//     eligibility: '70% throughout academic career, No Backlogs',
//     testDetails: 'Location: Pan India. 6 months internship.',
//     process: [
//       { round: 'Technical Test', description: 'Coding + technical screening' },
//       { round: 'Interview', description: 'Technical + HR discussion' }
//     ],
//     dsaTopics: ['DSA', 'Java/.NET', 'OOPS', 'Problem Solving', 'Web Dev'],
//     tips: 'Global IT services. Good stipend (25k) for service company. 70% academic bar. Pan India locations. Diverse tech stack.'
//   },
//   {
//     name: 'CME Group', domain: 'cmegroup.com', type: 'Product',
//     package: 'To be informed', testType: 'Coding', year: 2024,
//     eligibility: '8.00 CGPA in academics',
//     testDetails: 'Visited twice. Largest derivatives marketplace globally. Code-a-thon at Cisco Office Bangalore on 9th & 10th July 2024.',
//     process: [
//       { round: 'Selection', description: 'Shortlisting on 25th June 2024' },
//       { round: 'Code-a-thon', description: 'Coding event at CME/Cisco Office Bangalore on 9th & 10th July 2024' }
//     ],
//     dsaTopics: ['DSA', 'Algorithms', 'Financial Markets Basics', 'Java/C++'],
//     tips: 'World largest derivatives marketplace. High CGPA bar (8 CGPA). Code-a-thon format — prepare competitive programming. Finance knowledge is a plus.'
//   },
//   {
//     name: 'Quantzig', domain: 'quantzig.com', type: 'Product',
//     package: 'CTC: ₹6 LPA', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profile: Associate Analytic Consultant. PAN India.',
//     process: [
//       { round: 'Case Study', description: 'Analytical case study problem' },
//       { round: 'Post Case Study Selection', description: 'Based on case performance' },
//       { round: 'Technical Discussion', description: 'Analytics + technical discussion' }
//     ],
//     dsaTopics: ['Analytics', 'Statistics', 'Case Solving', 'SQL', 'Python'],
//     tips: 'Analytics consulting. Case study is the main filter. No CGPA cutoff — skills matter. 6 LPA for analytics role.'
//   },
//   {
//     name: 'TC Group (TechCurators & TransCurators)', domain: 'techcurators.com', type: 'Startup',
//     package: 'To be informed during PPT', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profiles: Growth & Strategy (All branches), Technical Project Manager (CSE/IT), Technical Content Engineer (CSE/IT), AI Developer (B.Tech). Location: Delhi/Bangalore (full-time in-office). 1 year.',
//     process: [
//       { round: 'PPT', description: 'Pre-placement talk' },
//       { round: 'Puzzle Round', description: 'Analytical puzzle solving round' },
//       { round: 'Group Discussion', description: 'GD round' },
//       { round: 'Technical Interview', description: 'Technical discussion based on profile' }
//     ],
//     dsaTopics: ['Problem Solving', 'Puzzles', 'AI/ML (for AI Dev role)', 'Project Management', 'Content Writing'],
//     tips: 'Multiple profiles across different branches. Puzzle round is unique — practice logical puzzles. AI Developer role is best for CSE students. 1-year commitment.'
//   },
//   {
//     name: 'Syncron', domain: 'syncron.com', type: 'Product',
//     package: 'Stipend: ₹30,000/month | CTC: ₹10–11 LPA', testType: 'Both', year: 2024,
//     eligibility: 'No Backlogs',
//     testDetails: 'Profile: Associate Talent Acquisition Specialist. 6 months–1 year (Nov 2024 or Jan 2025).',
//     process: [
//       { round: 'Process', description: 'To be notified' }
//     ],
//     dsaTopics: ['HR Tech', 'Communication', 'Recruitment Basics'],
//     tips: 'HR/talent acquisition role — not pure tech. Good for students interested in HR tech. 10–11 LPA CTC is competitive.'
//   },
//   {
//     name: 'Vivriti Capital', domain: 'vivriticapital.com', type: 'Product',
//     package: 'Stipend: ₹25,000/month | CTC: ₹10–11 LPA', testType: 'Both', year: 2024,
//     eligibility: '80% throughout academic career, No Backlogs',
//     testDetails: 'Location: Chennai. 3–6 months (July 2024–Jan 2025).',
//     process: [
//       { round: 'Process', description: 'To be notified' }
//     ],
//     dsaTopics: ['Finance Tech', 'DSA', 'Python', 'SQL', 'Analytics'],
//     tips: 'FinTech/credit company. High 80% academic bar. Chennai location. Good CTC for FinTech. Finance domain knowledge helps.'
//   }
// ];

// async function seedCompanies() {
//   await mongoose.connect(process.env.MONGO_URI);
//   console.log('Connected to MongoDB');
//   await Company.deleteMany({});
//   console.log('Cleared existing companies');
//   const inserted = await Company.insertMany(companies);
//   console.log(`✅ Inserted ${inserted.length} companies from the sheet`);
//   process.exit(0);
// }

// seedCompanies().catch(err => { console.error(err); process.exit(1); });

// require('dotenv').config();
// const mongoose = require('mongoose');
// const Company = require('./models/Company');

// const companies = [
//   { name:'NVIDIA',domain:'nvidia.com',type:'Product',package:'Stipend: ₹75,000/month | B.Tech CTC: ~₹29 LPA | M.Tech: ~₹32.9 LPA',testType:'Both',year:2024,eligibility:'7.80 or above CGPA, No Backlogs',testDetails:'Best package on campus. Internship 6 months. Locations: Pune/Bangalore/Hyderabad. Aptitude + Technical test → 2 interview rounds.',process:[{round:'Online Test',description:'Aptitude + Technical MCQs covering OS, Computer Architecture, C/C++, DSA'},{round:'Technical Interview 1',description:'DSA + CS fundamentals + C/C++ deep dive'},{round:'Technical Interview 2',description:'Advanced technical + HR discussion'}],dsaTopics:['C/C++','OS Concepts','Computer Architecture','Arrays','Trees','Graphs'],tips:'Best package on campus. Focus on OS + Computer Architecture + C/C++ as much as DSA. Very competitive — only 8+ CGPA students realistically. Hardware background is a huge plus.'},
//   { name:'YugaByte Software',domain:'yugabyte.com',type:'Product',package:'Stipend: ₹80,000/month | CTC: ₹21 LPA base + stock units',testType:'Coding',year:2024,eligibility:'8.00 or above CGPA, No Backlogs',testDetails:'Profile: SDET. Location: Bangalore/Pune (on-site). 6 months. Online test → Interview.',process:[{round:'Online Test',description:'Coding + technical MCQs (16th May 2024)'},{round:'Interview',description:'Technical + SDET-specific discussion (24th May 2024)'}],dsaTopics:['Java','Testing Frameworks','DSA','Distributed Databases','SQL'],tips:'80k stipend — highest on campus. SDET role needs testing knowledge + coding. Database company — basics of distributed systems important.'},
//   { name:'Morgan Stanley',domain:'morganstanley.com',type:'Product',package:'Stipend: ₹87,000/month',testType:'Both',year:2024,eligibility:'8.00 or above CGPA, No Backlogs',testDetails:'Apprenticeship Program. Locations: Mumbai/Bangalore. 6 months (July 2024). Online Test → 2 Interview Rounds.',process:[{round:'Online Test',description:'Quantitative aptitude + coding questions'},{round:'Technical Interview 1',description:'DSA + CS fundamentals + basic finance'},{round:'Technical Interview 2',description:'Technical + behavioral round'}],dsaTopics:['Arrays','LinkedList','Trees','Dynamic Programming','Hashing','Finance Basics'],tips:'87k/month — highest stipend. Finance domain knowledge is a plus. Strong DSA required. Very prestigious.'},
//   { name:'JP Morgan Chase',domain:'jpmorgan.com',type:'Product',package:'Top-tier (will be informed)',testType:'Coding',year:2024,eligibility:'8.50 or above CGPA, No Backlogs, Not more than 1 year gap',testDetails:'Locations: Bengaluru/Hyderabad/Mumbai. Online Coding Test → Video Interview → Code for Good in-person hackathon at JPMC offices.',process:[{round:'Online Coding Test',description:'HackerRank DSA-focused assessment'},{round:'Video Interview',description:'Virtual technical + behavioral round'},{round:'Code for Good',description:'In-person hackathon at JPMC offices (June–July). Team event — build social good project. Final round.'}],dsaTopics:['Arrays','Trees','Dynamic Programming','Graphs','System Design','Java'],tips:'Highest CGPA cutoff (8.5). Code for Good is a team hackathon — leadership + teamwork matter. Most prestigious. Strong DSA + Java needed.'},
//   { name:'Plotline',domain:'plotline.so',type:'Startup',package:'Stipend: ₹55,000/month | CTC: ₹14–18 LPA',testType:'Coding',year:2024,eligibility:'80% throughout academic career, No Backlogs',testDetails:'Profile: SDE Intern (Backend/Frontend/Mobile). Bengaluru in-office. 6 months (Jan 2025). Coding Test → Technical Discussion → Non-Tech Discussion.',process:[{round:'Coding Test',description:'DSA + problem solving'},{round:'Technical Discussion',description:'Deep dive into solutions + new problems'},{round:'Non-Tech Discussion',description:'Culture fit + product thinking + why Plotline'}],dsaTopics:['Arrays','Trees','DP','Backend APIs','System Design','Mobile Dev'],tips:'Great package for startup. Research Plotline product before non-tech round. Strong coding + product thinking both valued.'},
//   { name:'Toplyne',domain:'toplyne.ai',type:'Startup',package:'Stipend: ₹55,000/month | CTC: ₹15–18 LPA + ESOPs',testType:'Coding',year:2024,eligibility:'8.50 or above CGPA upto 6th Sem, No Backlogs',testDetails:'Profile: SDE Intern (Backend/Frontend). Bengaluru. Jan 2025. PPT/Online Test → Technical Round 1 → Technical Round 2 + Manager Chat.',process:[{round:'PPT / Online Test',description:'Pre-placement talk + online screening'},{round:'Technical Round 1',description:'DSA problem solving + coding'},{round:'Technical Round 2 + Manager',description:'Advanced technical + manager discussion on product/engineering thinking'}],dsaTopics:['Arrays','Trees','DP','System Design','Backend','APIs'],tips:'Very high CGPA bar (8.5). ESOPs add long-term value. Product-led growth startup.'},
//   { name:'ION Group',domain:'iongroup.com',type:'Product',package:'CTC: ₹17.30 LPA (₹15 LPA fixed)',testType:'Both',year:2024,eligibility:'75% throughout academic career, No Backlogs',testDetails:'Profiles: Software Developer, Technical Analyst. Noida/Gurgaon/Hyderabad/Pune/Mumbai. Jan 2025. PPT → Online Test → Multi-Round Interview → Final at Noida office in person.',process:[{round:'PPT',description:'Pre-placement talk (25th July)'},{round:'Online Test',description:'Technical + aptitude (25th July)'},{round:'Interviews',description:'Technical + Case Study + Stakeholder + Culture Fit (29th July)'},{round:'Final Interview',description:'In-person at Noida office'}],dsaTopics:['Arrays','Graphs','DP','System Design','Financial Tech'],tips:'Great package (17.3 LPA). Multiple rounds — prepare case study. Final round at Noida physically.'},
//   { name:'Bain & Company',domain:'bain.com',type:'Product',package:'Stipend: ₹40,000/month + ₹30,000 relocation | CTC: ₹9.9L + ₹1.1L bonus + ₹3L signing = ₹14 LPA total',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs',testDetails:'Profile: Intern Analyst. Gurgaon/Bangalore. 6 months Jan 2025. BCN portal registration MANDATORY → PPT → Online Test → Case Study Workshop → 2 Virtual Interviews.',process:[{round:'BCN Portal Registration',description:'MANDATORY — register on Bain career portal before anything else'},{round:'PPT',description:'Virtual PPT (26th July)'},{round:'Online Test',description:'Aptitude + case reasoning (29th July)'},{round:'Case Study Workshop',description:'Virtual workshop (31st July) — shortlisted only'},{round:'Virtual Interviews',description:'2 rounds — case interview + behavioral fit'}],dsaTopics:['Case Frameworks','Analytical Reasoning','Business Problem Solving','Communication'],tips:'Consulting firm — NO hardcore DSA. Case study prep is EVERYTHING. Practice BCG/McKinsey frameworks. ₹3L signing bonus. Accessible 60% bar.'},
//   { name:'Pine Labs',domain:'pinelabs.com',type:'Product',package:'Stipend: ₹40,000/month | CTC: ₹11 LPA',testType:'Coding',year:2024,eligibility:'8.50 or above CGPA, No Backlogs',testDetails:'Profile: Software Engineer Intern. Noida/Bangalore/Pune/Mumbai. 10 months (Sept 2024). Online Technical Assessment → Panel Interviews.',process:[{round:'Online Technical Assessment',description:'Coding + technical MCQs'},{round:'Panel Interview',description:'Multiple interviewers — DSA + System Design + CS fundamentals'}],dsaTopics:['Arrays','Trees','Graphs','DP','System Design'],tips:'FinTech payments. High CGPA bar (8.5). Panel interview — stay calm. Prepare basic system design.'},
//   { name:'Amagi Media Labs',domain:'amagi.com',type:'Product',package:'Stipend: ₹30,000/month | CTC: ₹12 LPA + ₹3 LPA retention bonus',testType:'Coding',year:2024,eligibility:'80% throughout academic career, No Backlogs',testDetails:'Profile: SDE-1. Bangalore in-office 5 days. 11–12 months. Online Technical Test → 2 Interview Rounds. Only 3 offers given.',process:[{round:'Online Technical Test',description:'DSA + technical knowledge'},{round:'Interview Round 1',description:'Technical — DSA + CS concepts'},{round:'Interview Round 2',description:'Advanced technical + system design'}],dsaTopics:['Arrays','Trees','Graphs','System Design','Cloud','Distributed Systems'],tips:'Media cloud tech. High bar (80%) + only 3 offers. Very selective. Focus on distributed systems + strong DSA.'},
//   { name:'Philips',domain:'philips.com',type:'Product',package:'B.Tech: Stipend ₹45k/month, CTC ₹11.5 LPA + ₹3L joining bonus | M.Tech: Stipend ₹55k/month, CTC ₹12 LPA + ₹3L bonus',testType:'Both',year:2024,eligibility:'70% for B.Tech, 60% for M.Tech, No Backlogs, Max 2 years gap',testDetails:'Internship 10–11 months (July 2024). Bangalore/Pune. Online Assessment → Technical Interview → Manager Interview → HR/HireVue.',process:[{round:'Online Assessment',description:'Aptitude + Technical MCQs'},{round:'Technical Interview',description:'Core technical + DSA + domain knowledge'},{round:'Manager Interview',description:'Project discussion + STAR method behavioral questions'},{round:'HR / HireVue',description:'HR round or HireVue video interview'}],dsaTopics:['Arrays','Strings','OOPS','SQL','Problem Solving'],tips:'Excellent ₹3L joining bonus. Manager round is behavioral — prepare STAR method. Long internship (10–11 months) with good PPO chances.'},
//   { name:'Hevo Data',domain:'hevodata.com',type:'Product',package:'Stipend: ₹35,000/month | CTC: ₹8 LPA + Insurance + Subsidised Lunch + Wellness + Relocation up to ₹25,000',testType:'Both',year:2024,eligibility:'70% throughout academic career, No Backlogs',testDetails:'Visited campus 4 times in 2024! Roles: Account Based Marketing Associate, Technical Research Analyst, Associate Technical Writer. 5–6 months internship → PPO possible. Mid-review: Aug 31, End-review: Nov 30, FTE start: July 2025.',process:[{round:'Online Test',description:'Virtual aptitude + technical screening'},{round:'Video Introduction',description:'Short video intro — very important for marketing roles, be confident and clear'},{round:'PPT',description:'Pre-placement talk at KIIT Campus physically'},{round:'Case Study / Live Exercise',description:'Live activity at campus — shortlisted students'},{round:'Technical & HR Interview',description:'Final interview at KIIT Campus physically'}],dsaTopics:['Communication','SQL','Marketing Basics','Aptitude','Problem Solving'],tips:'Visited 4 times — VERY high recruitment intent. Video intro matters enormously — practice it. PPO conversion is good. Communication > coding here. Multiple roles available.'},
//   { name:'A.P. Moller Maersk',domain:'maersk.com',type:'Product',package:'Stipend: ₹50,000/month | CTC: ₹10.83 LPA',testType:'Both',year:2024,eligibility:'7.00 or above CGPA upto 6th Sem, No Backlogs',testDetails:'Profile: Corporate Platforms. Location: Bangalore. 1 year internship (July 2024). Online Assessment → PPT → Interviews.',process:[{round:'Online Assessment',description:'Technical + aptitude test'},{round:'PPT',description:'Pre-placement talk'},{round:'Interviews',description:'Technical + HR rounds'}],dsaTopics:['DSA','Python','SQL','Supply Chain Basics'],tips:'Global shipping leader. Great stipend (50k) + 10.83 LPA. 1-year internship. Logistics domain knowledge is a bonus.'},
//   { name:'Chubb',domain:'chubb.com',type:'Product',package:'Stipend: ₹35,000/month | CTC: ₹9.52 LPA + ₹1.6L relocation bonus | Variable: up to ₹0.95L',testType:'Coding',year:2024,eligibility:'70% throughout academic career, No Backlogs',testDetails:'Profile: Trainee Software Engineer. Hyderabad. Visited twice. 6 months. PPT → HackerRank Test at campus → Interview.',process:[{round:'PPT',description:'Virtual pre-placement talk'},{round:'HackerRank Test',description:'Coding test at KIIT Campus (16th August)'},{round:'Interview',description:'Technical + HR interview'}],dsaTopics:['Arrays','Strings','Trees','DP','Java'],tips:'Insurance tech. Visited twice — good hiring intent. HackerRank on campus (medium difficulty). ₹1.6L joining bonus is great.'},
//   { name:'rtCamp Solutions',domain:'rtcamp.com',type:'Product',package:'Stipend: ₹50,000/month | CTC: ₹12–18 LPA',testType:'Both',year:2024,eligibility:'No Backlogs, Strong CS fundamentals, Active GitHub profile with projects — MANDATORY',testDetails:'Visited 3 times! Profile: Software Engineer Trainee. Remote/WFH. 6 months (Jan 2025). GitHub Shortlisting → Interview.',process:[{round:'GitHub Shortlisting',description:'Active GitHub profile is MANDATORY. Real projects reviewed. No GitHub = no call.'},{round:'Interview',description:'WordPress, PHP, JavaScript, open source contributions discussion'}],dsaTopics:['WordPress','PHP','JavaScript','GitHub','Open Source','Web Development'],tips:'Visited 3 times — high interest in KIIT. GitHub is THE most critical factor — build projects NOW. Remote WFH. 50k stipend + 12–18 LPA CTC is exceptional.'},
//   { name:'AlgoUniversity',domain:'algouniversity.com',type:'Startup',package:'SWE Intern: ₹80,000/month | Others: ₹30,000/month | SWE FTE: ₹20–22 LPA',testType:'Coding',year:2024,eligibility:'No Backlogs only',testDetails:'Profiles: SWE Intern, Business Dev Associate, Growth Intern, CEO Office, Problem Setting Intern. Registration → 3-Day Program → Shortlisting → Online Test.',process:[{round:'Registration',description:'Register for 3-day program'},{round:'3-Day Program',description:'Participate and get evaluated throughout'},{round:'Online Test',description:'Coding + problem solving test'}],dsaTopics:['DSA','Competitive Programming','Problem Solving','Algorithms'],tips:'SWE stipend of ₹80k is extraordinary. No CGPA bar — just skills. Strong DSA needed for SWE track.'},
//   { name:'Junglee Games',domain:'jungleegames.com',type:'Startup',package:'Stipend: ₹40,000/month | FTE: ₹14 LPA + ₹1.4L bonus + retention bonuses = up to ₹21.4 LPA total',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs',testDetails:'Profile: SDE Intern. Bengaluru & Gurugram. 12 months. Visited twice. Online Test → Campus Presentation → Technical + HR Interviews → Results same day with Letter of Intent.',process:[{round:'Online Test',description:'90 min DSA + Aptitude (virtual)'},{round:'Campus Presentation',description:'In-person at college'},{round:'Technical Interview',description:'DSA + technical concepts'},{round:'HR Interview',description:'Behavioral — Letter of Intent issued same day!'}],dsaTopics:['Arrays','Strings','DP','Trees','Game Logic'],tips:'Results + LOI same day! Low CGPA bar (60%) — great for average CGPA students with strong coding. Retention bonuses make total package excellent.'},
//   { name:'Equal',domain:'equal.in',type:'Startup',package:'Stipend: ₹50,000/month | CTC: ₹15–20 LPA post successful internship',testType:'Both',year:2024,eligibility:'6.00 or above CGPA, No Backlogs',testDetails:'Profile: Full Stack Intern. Hyderabad. 6 months.',process:[{round:'Screening',description:'Technical screening round'},{round:'Interview',description:'Full stack technical + HR'}],dsaTopics:['React','Node.js','MongoDB','Full Stack','DSA Basics'],tips:'Excellent CTC potential (₹15–20 LPA) post internship. 50k stipend exceptional for startup. React + Node.js + MongoDB skills key.'},
//   { name:'Pando AI',domain:'pando.ai',type:'Startup',package:'Stipend: ₹25,000/month | Total CTC: ₹8.62 LPA (₹6L fixed + ₹2L variable + ₹62K allowances)',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Supply chain AI. Visited twice. 6 months. Online Test → PPT at campus → Interview at campus.',process:[{round:'Online Test',description:'Virtual screening'},{round:'PPT',description:'Pre-placement talk at KIIT physically'},{round:'Interview',description:'Technical + HR at campus'}],dsaTopics:['Python','DSA','Supply Chain Basics'],tips:'Visited twice — good intent. No CGPA bar. Allowances bring total to 8.62 LPA. Supply chain AI domain.'},
//   { name:'TCS (NQT)',domain:'tcs.com',type:'Service',package:'Ninja: ₹3.36 LPA | Digital: ₹7 LPA | Prime: ₹9–11.5 LPA',testType:'Both',year:2024,eligibility:'60% throughout (10th, 12th, Graduation), No Backlogs, Max 2 years gap',testDetails:'TCS National Qualifier Test (NQT). Three tracks: Ninja/Digital/Prime based on score. Higher score = higher package. Online test → Technical + Managerial + HR interviews.',process:[{round:'TCS NQT Online Test',description:'Verbal + Reasoning + Numerical + Coding (2 Qs) + Advanced Coding for Prime track. Higher score = higher package track.'},{round:'Technical Interview',description:'OOPS, DBMS, OS, DSA basics. Ask about projects. Very important.'},{round:'Managerial Interview',description:'Behavioral questions. Discuss projects in detail.'},{round:'HR Interview',description:'Why TCS, relocation willingness, career goals'}],dsaTopics:['Arrays','Strings','Sorting','OOPS','DBMS','SQL','OS Basics','Aptitude'],tips:'Largest recruiter in India. Practice on TCS iON portal — free NQT mocks. Score well in Advanced Coding to land Digital/Prime track. Very high selection chances. Always say yes to relocation.'},
//   { name:'Infosys',domain:'infosys.com',type:'Service',package:'Specialist Programmer: ₹9.50 LPA | Systems Engineer: ₹3.6 LPA',testType:'Both',year:2024,eligibility:'60% in 10th & 12th, 6.00 or above CGPA, No Backlogs, Willing to relocate',testDetails:'InfyTQ platform. Online Test → Technical → HR. SP track (₹9.5 LPA) requires higher scores.',process:[{round:'InfyTQ Online Test',description:'Aptitude + Verbal + Logical + Coding. Practice on InfyTQ portal. Test virtually conducted.'},{round:'Technical Interview',description:'OOPS, DBMS, OS basics, DSA, projects. Prepare all CS fundamentals.'},{round:'HR Interview',description:'Why Infosys, relocation, career plans'}],dsaTopics:['Arrays','Strings','Sorting','OOPS','DBMS','SQL','OS Basics'],tips:'Second largest recruiter. Practice InfyTQ mock tests extensively. Target Specialist Programmer track for ₹9.5 LPA. Low 6 CGPA bar. Always say yes to relocation.'},
//   { name:'Wipro',domain:'wipro.com',type:'Service',package:'Turbo: ₹6.5–7 LPA | Elite: ₹3.5 LPA | NLTH: ₹5 LPA',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs, Max 1 year gap',testDetails:'Multiple tracks based on test performance. Online Assessment → Technical Interview → HR Interview.',process:[{round:'Online Assessment',description:'Aptitude + English + Coding (2 Qs). Performance determines track.'},{round:'Technical Interview',description:'OOPS, DBMS, DSA basics, projects'},{round:'HR Interview',description:'Relocation, salary expectations, why Wipro'}],dsaTopics:['Arrays','Strings','OOPS','DBMS','SQL','Basic Coding'],tips:'Target Turbo track (₹6.5–7 LPA) — needs better coding score. Accessible 60% cutoff. Max 1 year gap allowed.'},
//   { name:'HCL Technologies',domain:'hcltech.com',type:'Service',package:'CTC: ₹3.5–4.5 LPA',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs, Max 2 years gap',testDetails:'Profiles: Graduate Engineer Trainee, Technical Support. Online Assessment → GD → Technical + HR Interview.',process:[{round:'Online Assessment',description:'Aptitude + Verbal + Technical MCQs + Coding'},{round:'Group Discussion',description:'Topic-based GD — tech topics preferred'},{round:'Technical Interview',description:'CS fundamentals, projects, OOPS, DBMS'},{round:'HR Interview',description:'Standard HR round'}],dsaTopics:['Arrays','Strings','OOPS','DBMS','SQL','Networking Basics'],tips:'Mass recruiter with GD round — practice group discussion. Multiple locations PAN India. Accessible for most students.'},
//   { name:'Cognizant',domain:'cognizant.com',type:'Service',package:'Programmer Analyst: ₹4 LPA | GenC Next: ₹5.5 LPA | GenC Elevate: ₹8 LPA',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs',testDetails:'Three tracks based on test performance. Online Assessment (CoCubes/AMCAT) → Technical Interview → HR Interview.',process:[{round:'Online Assessment',description:'Aptitude + Reasoning + English + Coding. Score determines track.'},{round:'Technical Interview',description:'OOPS, DBMS, DSA basics, projects, code review'},{round:'HR Interview',description:'Why Cognizant, relocation, career plans'}],dsaTopics:['Arrays','Strings','OOPS','DBMS','SQL','Basic DSA'],tips:'Target GenC Elevate (₹8 LPA) — requires best performance. Practice CoCubes mock tests. Very accessible 60% cutoff.'},
//   { name:'Capgemini',domain:'capgemini.com',type:'Service',package:'CTC: ₹3.8–7 LPA',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs',testDetails:'Online Assessment (Cocubes — pseudocode format) → Technical → HR Interview.',process:[{round:'Online Assessment',description:'Pseudo coding + Aptitude + Behavioral. No actual coding — pseudocode logic only.'},{round:'Technical Interview',description:'CS fundamentals, OOPS, DBMS, projects'},{round:'HR Interview',description:'Standard HR round'}],dsaTopics:['Pseudocode Logic','OOPS','DBMS','SQL','Aptitude'],tips:'Unique pseudocode test — practice logic without worrying about syntax. Good accessible option. 60% cutoff.'},
//   { name:'Accenture',domain:'accenture.com',type:'Service',package:'ASE: ₹4.5 LPA | AASE: ₹8 LPA',testType:'Both',year:2024,eligibility:'No Backlogs only (very accessible)',testDetails:'Profiles: ASE, AASE. 202 offers. PPT → Cognitive + Technical + Communication Assessments → Interview.',process:[{round:'PPT',description:'Pre-Placement Talk (26th July)'},{round:'Cognitive Assessment',description:'Logical reasoning + quantitative aptitude'},{round:'Technical Assessment',description:'Technical MCQs + basic coding'},{round:'Communication Test',description:'English communication — spoken + written'},{round:'Interview',description:'Technical + HR for shortlisted'}],dsaTopics:['Arrays','Strings','Basic OOPS','SQL','Aptitude'],tips:'NO CGPA cutoff — just no backlogs. Communication test is key. Target AASE track (₹8 LPA). 202 offers — very high selection rate.'},
//   { name:'Deloitte',domain:'deloitte.com',type:'Service',package:'Competitive (role-dependent)',testType:'Both',year:2024,eligibility:'6.00 CGPA for Analyst | 6.50 CGPA for Analytics Specialist, No Backlogs',testDetails:'Profiles: Analyst, Analytics Specialist (Audit & Assurance). Online Test (14th August) → Further Rounds (20th August).',process:[{round:'Online Test',description:'Aptitude + Technical + Verbal — virtually on 14th August'},{round:'Technical + HR',description:'Interviews for shortlisted (20th August)'}],dsaTopics:['SQL','DBMS','Basic DSA','Analytics','Statistics'],tips:'Good brand. Analytics role needs stats. Low 6 CGPA bar. Deloitte US India profiles most prestigious.'},
//   { name:'GlobalLogic (Hitachi)',domain:'globallogic.com',type:'Service',package:'CTC: ₹5.66 LPA',testType:'Both',year:2024,eligibility:'60% throughout academic career, No Backlogs, Max 1 year gap, No correspondence courses',testDetails:'Profile: Software Engineer. Noida/GGN/Bangalore/Hyderabad/Pune/Nagpur/Chennai. Online Assessment → Technical → Managerial → HR.',process:[{round:'Online Assessment',description:'Technical MCQs + Aptitude + Reasoning'},{round:'Technical Interview',description:'Core CS + coding discussion'},{round:'Managerial Interview',description:'Behavioral + situational'},{round:'HR Interview',description:'Standard HR'}],dsaTopics:['Arrays','OOPS','DBMS','OS','DSA Basics'],tips:'Hitachi subsidiary. 60% accessible cutoff. Multiple city options. No correspondence courses. CS fundamentals focus.'},
//   { name:'EPAM Systems',domain:'epam.com',type:'Service',package:'Stipend: ₹25,000/month | CTC: ₹8 LPA',testType:'Coding',year:2024,eligibility:'70% throughout academic career, No Backlogs',testDetails:'Pan India. 6 months internship. Technical Test → Interview.',process:[{round:'Technical Test',description:'Coding + technical screening'},{round:'Technical Interview',description:'DSA + tech stack'},{round:'HR Interview',description:'Behavioral round'}],dsaTopics:['DSA','Java/.NET','OOPS','Problem Solving','Web Dev'],tips:'Global IT. Good 25k stipend + 8 LPA. 70% bar. Diverse tech stack.'},
//   { name:'TheMathCompany (2MC)',domain:'themathcompany.com',type:'Product',package:'Year 1: ₹5.5 LPA | Year 2: ₹8 LPA | Year 3: ₹12.5 LPA',testType:'Both',year:2024,eligibility:'6.50 or above CGPA, No Backlogs',testDetails:'Profile: Trainee Analyst. Bengaluru. Visited twice. Online Assessment (Logical+Quant+Pseudocode+Communication) → PPT + Technical + HR.',process:[{round:'Online Assessment',description:'Logical Reasoning + Quant + Pseudocode + Communication Test (10th August)'},{round:'PPT',description:'Pre-placement talk'},{round:'Technical + HR',description:'Interview at campus'}],dsaTopics:['Analytics','Statistics','Pseudocode','Logical Reasoning','Quant'],tips:'Great growth (5.5→8→12.5 LPA in 3 years). Pseudocode round — focus on logic not syntax. Communication test — explain clearly. Analytics consulting firm.'},
//   { name:'Tredence Analytics',domain:'tredence.com',type:'Product',package:'CTC: ₹10 LPA',testType:'Both',year:2024,eligibility:'70% throughout, No Backlogs',testDetails:'Profile: Analyst. Bengaluru/Chennai/Gurugram/Pune/Kolkata.',process:[{round:'Shortlisting',description:'Resume + academic performance'},{round:'Analytics Assessment',description:'Analytics + technical test'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['SQL','Python','Statistics','Data Analytics','Excel'],tips:'Analytics consulting. SQL + Python + stats focus. Good 10 LPA.'},
//   { name:'Cognida AI',domain:'cognida.ai',type:'Startup',package:'Stipend: ₹20,000/month | CTC: ₹7 LPA',testType:'Coding',year:2024,eligibility:'7.00 or above CGPA, No Backlogs',testDetails:'Profile: Software Developer. Hyderabad. 4–6 months (Dec 2024). Coding Test → Technical → HR.',process:[{round:'Online Coding Test',description:'DSA problems'},{round:'Technical Interview',description:'DSA + tech stack'},{round:'HR Interview',description:'Behavioral'}],dsaTopics:['DSA','Python','AI/ML Basics'],tips:'AI startup. MCA eligible too. Good for AI/ML enthusiasts. Hyderabad.'},
//   { name:'Genspark (formerly ProGrad)',domain:'genspark.ai',type:'Startup',package:'Training: ₹15k/month → ₹20k/month | CTC: ₹10 LPA',testType:'Coding',year:2024,eligibility:'No Backlogs only',testDetails:'Profile: Associate Software Engineer. Delhi WFO. 8 weeks training. 5 rounds.',process:[{round:'Online Tech Test 1',description:'Aptitude + basic technical'},{round:'Online Tech Test 2',description:'Advanced technical'},{round:'Coding Task + Review',description:'Take-home task + review'},{round:'Technical Interview',description:'Deep technical'},{round:'Final Round',description:'Technical + Cultural Fitment by Simpplr'}],dsaTopics:['DSA','Web Dev','Problem Solving'],tips:'No CGPA bar. Multiple rounds. Lower stipend during training. Good for skills > CGPA students.'},
//   { name:'DeltaX',domain:'deltax.net',type:'Product',package:'CTC: ₹7 LPA (No stipend during 4-month virtual training)',testType:'Both',year:2024,eligibility:'50% or above, No Backlogs',testDetails:'Profile: Associate Product Engineer. Bangalore/Hyderabad/Pune. MCQ → Coding → Interview.',process:[{round:'Online MCQ Test',description:'Aptitude + technical MCQs'},{round:'Online Coding Test',description:'Coding assessment'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['DSA Basics','Web Dev','Problem Solving','Ad Tech'],tips:'LOWEST eligibility bar (50%) on campus — most accessible. No stipend during training. Best option for low % students. Ad-tech domain.'},
//   { name:'Quantzig',domain:'quantzig.com',type:'Product',package:'CTC: ₹6 LPA',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Profile: Associate Analytic Consultant. PAN India. Case Study → Technical Discussion.',process:[{round:'Case Study',description:'Analytical case problem'},{round:'Technical Discussion',description:'Analytics + technical discussion'}],dsaTopics:['Analytics','Statistics','SQL','Python'],tips:'Case study is main filter. No CGPA bar. Analytics role.'},
//   { name:'GoComet',domain:'gocomet.com',type:'Startup',package:'QA: ₹29k/month, ₹4.5–5.5 LPA | DevOps/Cyber: ₹25k–45k/month, ₹8–12 LPA',testType:'Coding',year:2024,eligibility:'No Backlogs',testDetails:'Profiles: QA Intern (6 months), DevOps & Cybersecurity (1 year). Bangalore.',process:[{round:'Shortlisting',description:'Resume screening'},{round:'Technical Interview',description:'Role-specific technical'},{round:'HR Interview',description:'Behavioral'}],dsaTopics:['QA Testing','DevOps Tools','Cybersecurity','Python','Linux'],tips:'No CGPA bar. DevOps/Cybersecurity track has much better package. Great for infrastructure/security students.'},
//   { name:'Lexmark International',domain:'lexmark.com',type:'Product',package:'Stipend: ₹30,000/month | CTC: ₹10.50 LPA (post PPO)',testType:'Both',year:2024,eligibility:'85% in 10th & 12th, 8.00 or above CGPA, No Backlogs',testDetails:'Internship 3 months (May 2024). Process: Interviews only.',process:[{round:'Technical Interview',description:'Core CS concepts + OOPS + projects'},{round:'HR Interview',description:'Behavioral + fitment round'}],dsaTopics:['OOPS','Java','DSA Basics','Problem Solving'],tips:'High academic bar (85% + 8 CGPA). Good PPO potential at 10.5 LPA. OOPS and Java fundamentals focus.'},
//   { name:'Micron Technology',domain:'micron.com',type:'Product',package:'To be disclosed',testType:'Both',year:2024,eligibility:'6.00 or above CGPA, No Backlogs',testDetails:'Profile: QA Automation Engineer. Hyderabad. FTE Jun/Jul 2025. Internship Jan–Jun 2025. All virtual.',process:[{round:'PPT',description:'Virtual PPT 8th August at 12 PM'},{round:'Online Test',description:'Technical + aptitude 8th August at 4 PM'},{round:'Interview',description:'Virtual technical 21st August'}],dsaTopics:['C/C++','OS','Computer Architecture','Testing','Automation'],tips:'Semiconductor company. Low 6 CGPA bar. QA Automation — testing + coding both needed. C/C++ important.'},
//   { name:'Hyprbots Systems',domain:'hyprbots.com',type:'Startup',package:'Stipend: ₹35,000/month | CTC: ₹8.40 LPA post PPO',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Profile: Business Development – US Market, SaaS Sales. Bangalore. 1 month internship.',process:[{round:'PPT',description:'Pre-placement talk'},{round:'Interviews',description:'Technical + sales aptitude'},{round:'Final Interview',description:'At KIIT Campus physically'}],dsaTopics:['Communication','SaaS Sales','Business Development'],tips:'US market SaaS sales role. Strong communication + confidence. Good for non-pure-coding students.'},
//   { name:'CRTD Technologies',domain:'crtdtech.com',type:'Startup',package:'Stipend: ₹35,000/month | PPO: ₹7 LPA',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Profile: Software Developer Intern. Remote/WFO. 3 months. PPT → GD → Coding → HR.',process:[{round:'PPT',description:'Pre-placement talk'},{round:'Group Discussion',description:'Topic-based GD'},{round:'Coding Round',description:'Technical coding assessment'},{round:'HR Round',description:'Final HR interview'}],dsaTopics:['Web Dev','DSA Basics','Problem Solving','OOPS'],tips:'GD round — practice tech discussion topics. Remote option. Good dev experience.'},
//   { name:'OneBanc',domain:'onebanc.in',type:'Startup',package:'DevOps: ₹20k/₹5–7 LPA | UI/UX/Android/iOS/Frontend/Backend: ₹25k/₹8–10 LPA',testType:'Both',year:2024,eligibility:'80% throughout academic career, No Backlogs',testDetails:'6 profiles available. Gurugram WFO MANDATORY. Company covers travel+meals+stay for evaluation. Visited twice.',process:[{round:'Group Discussion',description:'Topic-based GD'},{round:'Virtual Interview',description:'30 min virtual interview'},{round:'Aptitude Test',description:'15 min aptitude'},{round:'Pre-Hiring Evaluation',description:'2 days at Gurugram office — company pays all costs'}],dsaTopics:['Role-specific','React (Frontend)','Node.js (Backend)','Android','DevOps Tools'],tips:'High 80% bar but 6 different tech profiles. Gurugram relocation mandatory but company covers costs for evaluation. Good FinTech startup.'},
//   { name:'Alstom',domain:'alstomgroup.com',type:'Product',package:'B.Tech CTC: ₹6.80 LPA',testType:'Both',year:2024,eligibility:'60% in 10th/12th & 6.50 or above CGPA, No Backlogs',testDetails:'Profile: Graduate Engineer Trainee. PPT → Online Test → GD → Technical → HR.',process:[{round:'PPT',description:'Pre-placement talk'},{round:'Online Test',description:'Technical + aptitude'},{round:'Group Discussion',description:'GD round'},{round:'Technical Interview',description:'Domain + technical'},{round:'HR Interview',description:'Behavioral'}],dsaTopics:['Core Engineering','Transportation Tech','Problem Solving'],tips:'Makes metro trains! GD round included. Accessible 60% + 6.5 CGPA. Core engineering company.'},
//   { name:'Sprouts AI',domain:'sprouts.ai',type:'Startup',package:'Stipend: ₹25,000/month | CTC: ₹7 LPA',testType:'Both',year:2024,eligibility:'7.00 or above CGPA, No Backlogs',testDetails:'Profile: Account-Based Marketing. Bangalore. 10 months.',process:[{round:'Online Test',description:'Aptitude + marketing basics'},{round:'Task Assignment',description:'Practical marketing task'},{round:'Culture Fit Interview',description:'Attitude assessment'}],dsaTopics:['Marketing','Communication','B2B SaaS'],tips:'Marketing/sales role — not pure coding. Culture fit matters enormously. Good for marketing + AI intersection.'},
//   { name:'CME Group',domain:'cmegroup.com',type:'Product',package:'Top-tier (to be informed)',testType:'Coding',year:2024,eligibility:'8.00 CGPA or above',testDetails:'Worlds largest derivatives marketplace. Visited twice. Code-a-thon at Cisco Office Bangalore (9th & 10th July).',process:[{round:'Shortlisting',description:'25th June — CGPA + profile'},{round:'Code-a-thon',description:'Coding competition at Cisco/CME Bangalore 9th & 10th July 2024'}],dsaTopics:['DSA','Algorithms','Competitive Programming','Java/C++'],tips:'Code-a-thon format — prepare competitive programming. Finance knowledge bonus. High CGPA bar (8.0).'},
//   { name:'Zen Data Shastra',domain:'zendatashastra.com',type:'Startup',package:'Stipend: ₹17,500/month | ₹21 LPA over 3 years (bond period)',testType:'Both',year:2024,eligibility:'7.50 or above CGPA, No Backlogs',testDetails:'Profile: Associate Business Analyst. Bengaluru. Service Bond: 3 years.',process:[{round:'Assessment',description:'Aptitude + analytical'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['Analytics','SQL','Python','Business Analysis'],tips:'3-year service bond. ₹21 LPA over 3 years = ~₹7 LPA/year avg. Consider bond carefully.'},
//   { name:'High Radius',domain:'highradius.com',type:'Product',package:'To be informed',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Profiles: Consulting, Product Engineering, Sales & Marketing.',process:[{round:'Assessment',description:'Role-specific assessment'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['FinTech','Product Engineering','DSA','Consulting Basics'],tips:'FinTech SaaS. Multiple profiles tech + non-tech. Order-to-cash domain. No CGPA bar.'},
//   { name:'Brakes India',domain:'brakesindia.com',type:'Product',package:'Stipend: ₹15,000/month | CTC Year 1: ₹3.79 → Year 2: ₹5.13 LPA',testType:'Both',year:2024,eligibility:'80% in 10th & 12th, 7.50 or above CGPA, No Backlogs',testDetails:'Profile: Graduate Engineer Trainee. 6 months (Jan 2025). Test → GD → Technical + HR.',process:[{round:'Technical + Aptitude Test',description:'Combined test'},{round:'Group Discussion',description:'GD round'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['Core Engineering','Automotive','Problem Solving'],tips:'Automotive company (brakes). High academic bar. Core engineering — not pure software.'},
//   { name:'Restroworks (formerly Posist)',domain:'restroworks.com',type:'Product',package:'Training: ₹23k/month | Probation: ₹25k/month | FTE: ₹9–12 LPA',testType:'Coding',year:2024,eligibility:'6.00 or above CGPA, No Backlogs',testDetails:'Profile: MEAN Stack Developer. Delhi. 3 months training + 3 months probation.',process:[{round:'Technical Screening',description:'MEAN Stack + DSA basics'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['MongoDB','Express.js','Angular','Node.js','JavaScript'],tips:'Restaurant tech. MEAN Stack skills key. Low 6 CGPA bar. Delhi location.'},
//   { name:'PeopleHum Technologies',domain:'peoplehum.com',type:'Product',package:'Dev: ₹28k/month, ₹7 LPA | SDET: ₹25k/month, ₹5.75 LPA',testType:'Coding',year:2024,eligibility:'80% or above, No Backlogs',testDetails:'Profiles: Software Engineering Dev, SDET. Bangalore/Hyderabad/Pune. 6 months (Jan 2025).',process:[{round:'Technical Assessment',description:'Coding + MCQs'},{round:'Interview',description:'Technical + HR'}],dsaTopics:['DSA','Java/Python','Testing','OOPS'],tips:'HR-tech. High 80% bar. Dev has better package than SDET.'},
//   { name:'IRISCarbon',domain:'iriscarbon.com',type:'Startup',package:'Stipend: ₹25,000/month | CTC: ₹6 LPA',testType:'Both',year:2024,eligibility:'6.00 or above CGPA, No Backlogs',testDetails:'Profile: Sales Development Rockstar – Intern. Hyderabad. 1 year (July 2024).',process:[{round:'Process',description:'To be informed'}],dsaTopics:['Sales','Communication','ESG Basics'],tips:'ESG/carbon reporting startup. Sales role. Low 6 CGPA bar. Good for sustainability + tech interest.'},
//   { name:'TC Group (TechCurators)',domain:'techcurators.com',type:'Startup',package:'To be informed during PPT',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Profiles: Growth & Strategy (all branches), Technical PM, Technical Content Engineer, AI Developer (CSE). Delhi/Bangalore in-office. 1 year.',process:[{round:'PPT',description:'Pre-placement talk'},{round:'Puzzle Round',description:'Logical puzzles — unique round!'},{round:'Group Discussion',description:'GD round'},{round:'Technical Interview',description:'Role-specific technical'}],dsaTopics:['Puzzles','Problem Solving','AI/ML (for AI Dev role)'],tips:'Puzzle round is unique — practice logical puzzles/brain teasers. AI Developer role best for CSE students. Multiple branch profiles available.'},
//   { name:'Celebal Technology',domain:'celebaltech.com',type:'Service',package:'No stipend (summer internship)',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Summer Internship. Virtual. 2 months.',process:[{round:'Registration',description:'Register for program'},{round:'Selection',description:'Profile-based selection'}],dsaTopics:['Python','Azure','SAP','Data Science','ML'],tips:'No stipend but Azure/SAP tech exposure. Easy to get. Microsoft partner. Good for resume.'},
//   { name:'Physics Wallah',domain:'pw.live',type:'Startup',package:'Performance-based incentives + certificate',testType:'Both',year:2024,eligibility:'No Backlogs',testDetails:'Profile: Internship Recruitment Drive. Virtual WFH. 6 months. Immediately joining.',process:[{round:'Application',description:'Apply online'},{round:'Process',description:'To be informed'}],dsaTopics:['EdTech','Communication','Teaching Basics'],tips:'EdTech company. More sales/teaching than coding. Incentive-based. Good for communication-strong students.'}
// ];

// async function seedCompanies() {
//   await mongoose.connect(process.env.MONGO_URI);
//   console.log('✅ Connected to MongoDB');
//   await Company.deleteMany({});
//   console.log('🗑️  Cleared existing companies');
//   const inserted = await Company.insertMany(companies);
//   console.log(`✅ Inserted ${inserted.length} companies!`);
//   process.exit(0);
// }

// seedCompanies().catch(err => { console.error('❌', err.message); process.exit(1); });


require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');

const companies = [
  {
    name:'Hevo Data',domain:'hevodata.com',type:'Product',year:2024,
    package:'Stipend: ₹35,000/month | CTC: ₹8 LPA + Insurance + Subsidised Lunch + Wellness Reimbursements + Relocation up to ₹25,000',
    testType:'Both',
    eligibility:'70% throughout academic career, No Backlogs',
    testDetails:'Visited campus 4 times in 2024. Roles: Account Based Marketing Associate, Marketing Associate, Technical Research Analyst Intern, Associate Technical Writer. Internship 5–6 months. PPO program: Mid-review Aug 31, End-review Nov 30, FTE start July 1 2025.',
    process:[{round:'Online Test',description:'Virtual aptitude + technical screening test'},{round:'Video Introduction',description:'Submit a short video intro virtually — critical for marketing roles, be confident and articulate'},{round:'PPT',description:'Pre-placement talk at KIIT Campus physically'},{round:'Case Study / Live Exercise',description:'Live activity at KIIT Campus — shortlisted students only'},{round:'Technical & HR Interview',description:'Final interview at KIIT Campus physically'}],
    dsaTopics:['Communication Skills','SQL','Marketing Basics','Aptitude','Problem Solving'],
    tips:'Visited 4 times — extremely high recruitment intent. Video intro is critical — practice it multiple times. PPO conversion rate is good. Communication matters more than coding here.'
  },
  {
    name:'JP Morgan Chase',domain:'jpmorgan.com',type:'Product',year:2024,
    package:'Top-tier (will be informed)',
    testType:'Coding',
    eligibility:'8.50 or above CGPA in B.Tech, No Backlogs, Not more than 1 year gap from 10th to 1st year B.Tech',
    testDetails:'Locations: Bengaluru/Hyderabad/Mumbai. Role: Software Engineer.',
    process:[{round:'Online Coding Test',description:'HackerRank DSA-focused coding assessment'},{round:'Video Interview',description:'Virtual technical + behavioral round'},{round:'Code for Good',description:'In-person hackathon at JPMC offices Mumbai/Bangalore/Hyderabad (June–July 2024). Team event — build social good project. Final selection round.'}],
    dsaTopics:['Arrays','Trees','Dynamic Programming','Graphs','System Design','Java'],
    tips:'Highest CGPA cutoff on campus (8.5). Code for Good is a team hackathon — teamwork + leadership matter equally. Most prestigious recruiter. Prepare strong DSA + Java.'
  },
  {
    name:'NVIDIA',domain:'nvidia.com',type:'Product',year:2024,
    package:'Stipend: ₹75,000/month | B.Tech CTC: ~₹29 LPA | M.Tech CTC: ~₹32.9 LPA',
    testType:'Both',
    eligibility:'7.80 or above CGPA in Current Degree, No Backlogs',
    testDetails:'Internship 6 months (July–Dec 2024). Locations: Pune, Bangalore, Hyderabad. Interviews on 15th or 18th March 2024.',
    process:[{round:'Online Test',description:'Aptitude and Technical MCQs — OS, Computer Architecture, C/C++, DSA'},{round:'Technical Interview 1',description:'DSA + CS fundamentals + C/C++ deep dive'},{round:'Technical Interview 2',description:'Advanced technical + HR discussion'}],
    dsaTopics:['C/C++','OS Concepts','Computer Architecture','Arrays','Trees','Graphs'],
    tips:'Best package on campus. Focus heavily on OS + Computer Architecture + C/C++ alongside DSA. Very competitive. Hardware background is a huge plus.'
  },
  {
    name:'AlgoUniversity',domain:'algouniversity.com',type:'Startup',year:2024,
    package:'SWE Intern: ₹80,000/month | Other profiles: ₹30,000/month | SWE FTE: ₹20–22 LPA | Others: ₹10–15 LPA',
    testType:'Coding',
    eligibility:'No Backlogs',
    testDetails:'Location: Hyderabad. Duration: 2 months. Roles: SWE Intern, Business Development Associate, Growth Intern, CEO Office, Problem Setting Intern.',
    process:[{round:'Registration',description:'Register for the 3-day program'},{round:'3-Day Program',description:'Participate and get evaluated throughout the program'},{round:'Shortlisting',description:'Based on program performance'},{round:'Online Test',description:'Coding + problem solving test (tentatively 30th March 2024)'}],
    dsaTopics:['DSA','Competitive Programming','Problem Solving','Algorithms'],
    tips:'SWE stipend of ₹80k is extraordinary. No CGPA bar — just no backlogs. Strong DSA skills key for SWE track. Problem Setting role ideal for competitive programmers.'
  },
  {
    name:'Hyprbots Systems',domain:'hyprbots.com',type:'Startup',year:2024,
    package:'Stipend: ₹35,000/month | CTC: ₹8.40 LPA post PPO conversion',
    testType:'Both',
    eligibility:'No Backlogs in B.Tech',
    testDetails:'Location: Bangalore. Duration: 1 month. Role: Business Development – US Market, SaaS Sales – US Market.',
    process:[{round:'PPT',description:'Pre-placement talk'},{round:'Interviews',description:'Technical + sales aptitude rounds'},{round:'Final Interview',description:'At KIIT Campus physically'}],
    dsaTopics:['Communication','SaaS Sales Basics','Business Development','US Market Knowledge'],
    tips:'US market SaaS sales role — not pure coding. Strong communication + confidence needed. Good for students interested in sales/business over pure development.'
  },
  {
    name:'Lexmark International',domain:'lexmark.com',type:'Product',year:2024,
    package:'Stipend: ₹30,000/month | CTC: ₹10.50 LPA post PPO',
    testType:'Both',
    eligibility:'85% in 10th, 12th/Diploma & 8.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Internship 3 months (May 2023/2024). Will be informed about location.',
    process:[{round:'Technical Interview',description:'Core CS concepts + OOPS + projects discussion'},{round:'HR Interview',description:'Behavioral + fitment round'}],
    dsaTopics:['OOPS','Java','DSA Basics','Problem Solving'],
    tips:'High academic bar (85% in 10th/12th + 8 CGPA). Good PPO potential at ₹10.5 LPA. Focus on OOPS and Java fundamentals. Only interviews — no online test.'
  },
  {
    name:'KPIT Technologies',domain:'kpit.com',type:'Product',year:2024,
    package:'To be informed',
    testType:'Both',
    eligibility:'60% throughout academic career, No Backlogs in B.Tech',
    testDetails:'Automotive/embedded tech company. Process details to be notified.',
    process:[{round:'Online Test',description:'Aptitude + technical assessment'},{round:'Interview',description:'Technical + HR discussion'}],
    dsaTopics:['C/C++','Embedded Systems','Automotive Tech','Problem Solving'],
    tips:'Automotive software company. Embedded systems + C/C++ knowledge is valuable. Accessible 60% cutoff. Good for students interested in automotive domain.'
  },
  {
    name:'Zen Data Shastra LLP',domain:'zendatashastra.com',type:'Startup',year:2024,
    package:'₹17,500/month stipend | ₹21 LPA total over 3-year bond period',
    testType:'Both',
    eligibility:'7.50 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Bengaluru. Joining: May/June 2025. Role: Associate Business Analyst. Service Bond: 3 Years.',
    process:[{round:'Assessment',description:'Aptitude + analytical test'},{round:'Interview',description:'Technical + HR discussion'}],
    dsaTopics:['Analytics','SQL','Python','Business Analysis','Statistics'],
    tips:'3-year service bond. ₹21 LPA over 3 years = ~₹7 LPA/year average. Analytics/BA role — not pure coding. Think carefully about the bond before committing.'
  },
  {
    name:'High Radius',domain:'highradius.com',type:'Product',year:2024,
    package:'To be informed',
    testType:'Both',
    eligibility:'No Backlogs in B.Tech',
    testDetails:'Profiles: Consulting, Product Engineering, Sales & Marketing. FinTech SaaS company (Order-to-Cash automation).',
    process:[{round:'Assessment',description:'Role-specific technical + aptitude test'},{round:'Interview',description:'Technical + HR rounds'}],
    dsaTopics:['FinTech','Product Engineering','DSA','Consulting Basics','Java'],
    tips:'FinTech SaaS — multiple profiles including tech and non-tech. No CGPA bar. Order-to-cash domain knowledge is a plus. Good company to learn enterprise software.'
  },
  {
    name:'PWC',domain:'pwc.in',type:'Service',year:2024,
    package:'To be informed',
    testType:'Both',
    eligibility:'To be informed',
    testDetails:'Big 4 consulting firm. Process details to be notified.',
    process:[{round:'Online Test',description:'Aptitude + reasoning + domain test'},{round:'Interview',description:'Case study + technical + HR rounds'}],
    dsaTopics:['Case Studies','Analytics','Consulting Frameworks','Communication'],
    tips:'Big 4 consulting. Case study preparation key. Analytics and business thinking valued. Brand name is excellent for career growth.'
  },
  {
    name:'Turing AI',domain:'turing.com',type:'Product',year:2024,
    package:'CTC: ₹3.50 LPA',
    testType:'Coding',
    eligibility:'60% in 10th & 12th, 7.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Remote (WFH). Roles: Data Scientist, Software Engineer.',
    process:[{round:'Online Coding Test 1',description:'First coding challenge'},{round:'Online Coding Test 2',description:'Second coding challenge'},{round:'Written Assessment',description:'Technical written evaluation'},{round:'Interview',description:'Technical discussion'}],
    dsaTopics:['Python','Machine Learning Basics','DSA','Problem Solving'],
    tips:'Remote work opportunity. Lower package but WFH flexibility. Good for Data Science enthusiasts. Multiple test rounds — prepare DSA + Python well.'
  },
  {
    name:'CME Group',domain:'cmegroup.com',type:'Product',year:2024,
    package:'Top-tier (to be informed)',
    testType:'Coding',
    eligibility:'8 CGPA or above in academics',
    testDetails:'Worlds largest derivatives marketplace. Visited campus twice (April + July 2024). Code-a-thon at Cisco Office Bangalore Campus on 9th & 10th July 2024.',
    process:[{round:'Shortlisting',description:'Based on CGPA (8+) and profile — 25th June 2024'},{round:'Code-a-thon',description:'Competitive coding event at Cisco Office Bangalore — 9th & 10th July 2024'}],
    dsaTopics:['DSA','Algorithms','Competitive Programming','Java/C++','Financial Markets Basics'],
    tips:'World\'s largest derivatives marketplace. Code-a-thon format — prepare competitive programming. Visited twice — high interest. Finance domain knowledge is a bonus. High 8 CGPA bar.'
  },
  {
    name:'Equal',domain:'equal.in',type:'Startup',year:2024,
    package:'Stipend: ₹50,000/month | CTC: ₹15–20 LPA post successful internship',
    testType:'Both',
    eligibility:'6.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Hyderabad. Duration: 6 months internship. Role: Full Stack Intern.',
    process:[{round:'Process',description:'To be notified after registration'}],
    dsaTopics:['React','Node.js','MongoDB','Full Stack Development','DSA Basics'],
    tips:'Excellent CTC potential (₹15–20 LPA) post internship. ₹50k stipend exceptional for startup. Full Stack skills key — React + Node.js + MongoDB stack.'
  },
  {
    name:'Exxat',domain:'exxat.com',type:'Product',year:2024,
    package:'Will be informed',
    testType:'Both',
    eligibility:'No Backlogs in B.Tech',
    testDetails:'Location: Bengaluru (On-site). Roles: Intern – Product Operations, Product Management, Sales and Marketing. PPT on 10th April 2024.',
    process:[{round:'PPT',description:'Pre-placement talk on 10th April 2024 at 5:00 PM'},{round:'Further Process',description:'Will be notified in due course'}],
    dsaTopics:['Product Management','Sales','Communication','Problem Solving'],
    tips:'Healthcare software company. Multiple non-tech roles available. Product + sales orientation. Good for students interested in product management or healthcare tech.'
  },
  {
    name:'Pando AI',domain:'pando.ai',type:'Startup',year:2024,
    package:'Stipend: ₹25,000/month | CTC: ₹6 LPA fixed + ₹2 LPA variable + ₹62K allowances = ₹8.62 LPA total',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Supply chain AI company. Visited campus twice (April + June 2024). Internship 6 months. Process: Online Test → PPT at campus → Interview at campus physically.',
    process:[{round:'Online Test',description:'Virtual screening test (20th April 2024)'},{round:'PPT',description:'Pre-placement talk at KIIT Campus physically (22nd April at 6:30 PM)'},{round:'Interview',description:'Technical + HR at KIIT Campus physically (23rd April)'}],
    dsaTopics:['Python','DSA','Supply Chain Basics','Problem Solving'],
    tips:'Visited twice — strong hiring intent. No CGPA bar. Total package ₹8.62 LPA including allowances. Supply chain AI is a growing domain.'
  },
  {
    name:'TalentServe',domain:'talentserve.in',type:'Startup',year:2024,
    package:'₹30,000/month',
    testType:'Both',
    eligibility:'6.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Duration: 2–3 months. Immediate joining. Role: Intern.',
    process:[{round:'Shortlisting',description:'Resume screening'},{round:'Aptitude Test',description:'Critical Thinking & Logical Reasoning test'}],
    dsaTopics:['Aptitude','Logical Reasoning','Communication','Problem Solving'],
    tips:'Short 2–3 month internship. Immediate joining. Lower package but quick way to get experience. Critical thinking test is the main filter.'
  },
  {
    name:'Amazon',domain:'amazon.com',type:'Product',year:2024,
    package:'Top-tier (role-dependent)',
    testType:'Coding',
    eligibility:'Students with Disability (special drive) | ML Summer School (merit-based)',
    testDetails:'Two separate drives: 1) Students with Disability drive. 2) Machine Learning Summer School (June 2024). Both highly prestigious.',
    process:[{round:'Online Assessment',description:'Aptitude + coding + work simulation for disability drive'},{round:'ML Summer School',description:'Application + selection process for ML Summer School'}],
    dsaTopics:['Arrays','Trees','Graphs','Dynamic Programming','System Design','Machine Learning'],
    tips:'Two different drives. Disability drive is specifically for differently-abled students. ML Summer School is merit-based for all. Both are highly prestigious opportunities.'
  },
  {
    name:'Japan Third Party (Japanese IT Companies)',domain:'',type:'Product',year:2024,
    package:'Competitive Japanese salary (high purchasing power)',
    testType:'Both',
    eligibility:'No Backlogs, Passionate for IT, Japanese Language NOT required',
    testDetails:'Role: System Engineer. Work location: Japan. 7-step selection process.',
    process:[{round:'Application',description:'Step 1: Application'},{round:'Technical Assessment Selection',description:'Step 2: Selection for Technical Assessments'},{round:'Technical Assessment',description:'Step 3: Technical Assessment — coding + CS fundamentals'},{round:'English Interview',description:'Step 4: International-level English required. Mother tongue influence will eliminate candidates.'},{round:'Virtual Training + Project',description:'Step 5: Virtual training and project round'},{round:'Golden Ticket',description:'Step 6: Golden ticket opportunity for few exceptional students'},{round:'CEO Panel Interview',description:'Step 7: Final CEO panel interview'}],
    dsaTopics:['DSA','Programming','English Communication','Logical Reasoning'],
    tips:'Japanese language NOT required. English communication is heavily evaluated — eliminate mother tongue influence. 7-step process is long. Japan provides high quality of life.'
  },
  {
    name:'Frontend/Fullstack Developer (Unnamed Company)',domain:'',type:'Startup',year:2024,
    package:'Stipend: ₹20,000/month (6+ months) or ₹15,000/month (under 6 months)',
    testType:'Coding',
    eligibility:'To be notified',
    testDetails:'Location: Hyderabad (preferred) / Remote (temporarily). Duration: Till June 2025. Service Agreement: 1 year. Roles: Frontend Developer, Full Stack Developer.',
    process:[{round:'Round 1',description:'Coding Test — Web Development / DSA / Algorithms / Problem Solving'},{round:'Round 2',description:'Code Pairing Interview'},{round:'Round 3',description:'Web Apps related Interview'},{round:'Round 4',description:'HR / Bar Raiser Interview'}],
    dsaTopics:['Web Development','React/Angular','Node.js','DSA','Problem Solving'],
    tips:'4-round process. Bar Raiser round is important — be prepared for tough behavioral + technical questions. 1-year service agreement. Hyderabad or Remote option.'
  },
  {
    name:'CRTD Technologies',domain:'crtdtech.com',type:'Startup',year:2024,
    package:'Stipend: ₹35,000/month | PPO: ₹7 LPA for outstanding performers',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Remote/Work from office. Duration: 3 months. Role: Software Developer Intern.',
    process:[{round:'PPT',description:'Pre-placement talk'},{round:'Group Discussion',description:'Topic-based GD round'},{round:'Coding Round',description:'Technical coding assessment'},{round:'HR Round',description:'Final HR interview'}],
    dsaTopics:['Web Development','DSA Basics','Problem Solving','OOPS'],
    tips:'GD round — practice discussing tech topics. Remote option available. ₹35k stipend is good for startup. PPO of ₹7 LPA for outstanding performers.'
  },
  {
    name:'Physics Wallah',domain:'pw.live',type:'Startup',year:2024,
    package:'Performance-based incentives + Internship certificate',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Virtual (WFH). Duration: 6 months. Immediate joining. Role: Internship Recruitment Drive.',
    process:[{round:'Application',description:'Apply online'},{round:'Process',description:'To be informed'}],
    dsaTopics:['EdTech','Communication','Teaching Basics','Content Creation'],
    tips:'EdTech company. More sales/teaching/content creation than coding. Incentive-based pay. Good for communication-strong students. Brand recognition is high (2nd largest EdTech).'
  },
  {
    name:'Salesforce',domain:'salesforce.com',type:'Product',year:2024,
    package:'To be informed',
    testType:'Both',
    eligibility:'To be informed',
    testDetails:'CRM software giant. Internship drive. Process to be informed.',
    process:[{round:'Online Assessment',description:'Technical + aptitude screening'},{round:'Interview',description:'Technical + HR rounds'}],
    dsaTopics:['Apex (Salesforce Language)','Java','DSA','Cloud Computing','CRM Basics'],
    tips:'Global CRM leader. Salesforce skills are highly valued in market. Cloud + CRM domain. Good brand for resume. Specific Salesforce certification knowledge helps.'
  },
  {
    name:'Ayaskanta Analytics',domain:'ayaskanta.com',type:'Startup',year:2024,
    package:'₹10,000–₹20,000/month',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Pune (Krishnai Plaza, Karve Nagar). Duration: 3 months (June 2024). Role: Software Trainee Developer Intern.',
    process:[{round:'Online Aptitude Test',description:'Aptitude and reasoning test'},{round:'Technical + HR Interview',description:'Combined tech and HR round'}],
    dsaTopics:['DSA Basics','Web Development','Problem Solving','Data Analytics'],
    tips:'Small analytics firm in Pune. Lower stipend but good learning opportunity. Simple 2-round process. Good as first internship option.'
  },
  {
    name:'YugaByte Software (YugabyteDB)',domain:'yugabyte.com',type:'Product',year:2024,
    package:'Stipend: ₹80,000/month | CTC: ₹21 LPA base + 9000 stock units ≈ ₹20 LPA + benefits',
    testType:'Coding',
    eligibility:'8.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Bangalore/Pune (on-site). Duration: 6 months (July–December). Role: SDET (Software Development Engineer in Test).',
    process:[{round:'Online Test',description:'Coding + technical MCQs — tentatively 16th May 2024'},{round:'Interview',description:'Technical + SDET-specific discussion — tentatively 24th May 2024'}],
    dsaTopics:['Java','Testing Frameworks','DSA','Distributed Databases','SQL'],
    tips:'₹80k stipend — joint highest on campus. SDET role needs testing knowledge + coding both. Database company — basics of distributed systems helpful. High 8 CGPA bar.'
  },
  {
    name:'Hike',domain:'hike.in',type:'Product',year:2024,
    package:'To be notified (competitive)',
    testType:'Coding',
    eligibility:'7.00 or above CGPA in B.Tech',
    testDetails:'Roles: SDE Backend/Server, SDE Android. HackerRank Assignment (60–90 mins) → Multiple Hangout Interview rounds.',
    process:[{round:'HackerRank Assignment',description:'60–90 minute online coding assignment'},{round:'DS & Algorithms Round',description:'Technical interview — DSA focused (45–60 mins)'},{round:'Problem Solving + OS + Language',description:'OS concepts + language-specific problems (45–60 mins)'},{round:'Multithreading Round',description:'Concurrency and threading concepts'},{round:'Code & Culture Round',description:'Hike culture fit + final coding discussion'}],
    dsaTopics:['Arrays','Trees','Graphs','OS Concepts','Multithreading','Android Dev','Backend Systems'],
    tips:'5 interview rounds total. Strong DSA + OS knowledge needed. Android role needs mobile dev experience. 7 CGPA bar — accessible for decent CGPA students.'
  },
  {
    name:'RiskWise Analytics',domain:'riskwise.in',type:'Startup',year:2024,
    package:'Stipend: ₹5,000–₹12,000/month (negotiable) | CTC: ₹7–12 LPA',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Remote + Guwahati (on-site preference). Duration: 8–12 weeks.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['Risk Analytics','Python','Statistics','Data Science'],
    tips:'Analytics startup. Lower stipend but good learning. Remote option. Risk analytics is niche but growing domain. No CGPA bar.'
  },
  {
    name:'Morgan Stanley',domain:'morganstanley.com',type:'Product',year:2024,
    package:'Stipend: ₹87,000/month',
    testType:'Both',
    eligibility:'8.00 or above CGPA in Current Degree, No Backlogs',
    testDetails:'Location: Mumbai/Bangalore (physically). Duration: 6 months (July 2024). Role: Apprenticeship Program.',
    process:[{round:'Online Test',description:'Quantitative aptitude + coding questions'},{round:'Technical Interview 1',description:'DSA + CS fundamentals + basic finance concepts'},{round:'Technical Interview 2',description:'Advanced technical + behavioral round'}],
    dsaTopics:['Arrays','LinkedList','Trees','Dynamic Programming','Hashing','Finance Basics'],
    tips:'₹87k/month — highest stipend on campus. Finance domain knowledge is a plus. Strong DSA required. Extremely prestigious — great for career launch.'
  },
  {
    name:'GeeksForGeeks',domain:'geeksforgeeks.org',type:'Product',year:2024,
    package:'To be informed',
    testType:'Both',
    eligibility:'To be informed',
    testDetails:'Job A-Thon 33rd Edition Hiring Challenge. 4-part contest: DSA Coding (100 marks) + Programming Logic MCQ (25 marks) + Logical Reasoning MCQ (25 marks) + Quantitative Aptitude MCQ (25 marks).',
    process:[{round:'Job A-Thon Contest',description:'DSA coding problems (100 marks) + MCQ on Programming Logic (25) + Logical Reasoning MCQ (25) + Quantitative Aptitude MCQ (25)'}],
    dsaTopics:['DSA','Programming Logic','Logical Reasoning','Quantitative Aptitude'],
    tips:'Contest-based hiring. Strong in all 4 sections needed. DSA section has highest weightage. GFG is good for editorial/content + engineering roles.'
  },
  {
    name:'rtCamp Solutions',domain:'rtcamp.com',type:'Product',year:2024,
    package:'Stipend: ₹50,000/month | CTC: ₹12–18 LPA on confirmation',
    testType:'Both',
    eligibility:'No Backlogs, Solid CS fundamentals, Active GitHub profile with codebase — MANDATORY',
    testDetails:'Visited campus 3 times (May, June, July 2024). Location: Remote/WFH. Duration: 6 months (January 2025). Role: Software Engineer / Software Engineer Trainee.',
    process:[{round:'GitHub Profile Shortlisting',description:'Active GitHub profile is MANDATORY. Real projects reviewed. No active GitHub = no call from them.'},{round:'Interview',description:'WordPress, PHP, JavaScript, open source contribution discussion'}],
    dsaTopics:['WordPress','PHP','JavaScript','GitHub','Open Source','Web Development'],
    tips:'Visited 3 times — very high interest in KIIT. GitHub profile is THE most critical factor — start building projects NOW. Remote WFH. ₹50k stipend + ₹12–18 LPA CTC is exceptional.'
  },
  {
    name:'Philips',domain:'philips.com',type:'Product',year:2024,
    package:'B.Tech: Stipend ₹45k/month, CTC ₹11.5 LPA + ₹3L joining bonus | M.Tech: Stipend ₹55k/month, CTC ₹12 LPA + ₹3L joining bonus',
    testType:'Both',
    eligibility:'70% throughout academic career for B.Tech | 60% for M.Tech | No Backlogs | Max 2 years gap allowed',
    testDetails:'Location: Bangalore/Pune. Duration: 10–11 months (July 2024). Joining: July 2024.',
    process:[{round:'Online Assessment',description:'Aptitude + Technical MCQs'},{round:'Technical Interview',description:'Core technical + DSA + domain knowledge'},{round:'Manager Interview',description:'Project discussion + STAR method behavioral questions'},{round:'HR / HireVue',description:'HR round or HireVue video interview'}],
    dsaTopics:['Arrays','Strings','OOPS','SQL','Problem Solving','Embedded Basics'],
    tips:'Excellent ₹3L joining bonus. Manager round is behavioral — prepare STAR method answers. Long internship (10–11 months) with good PPO chances. Max 2-year gap allowed.'
  },
  {
    name:'Sprouts AI',domain:'sprouts.ai',type:'Startup',year:2024,
    package:'Stipend: ₹25,000/month | CTC: ₹7 LPA (₹5L fixed + ₹2L variable)',
    testType:'Both',
    eligibility:'7.00 or above CGPA in B.Tech, No Backlogs, Relevant skills and positive attitude',
    testDetails:'Location: Bangalore. Duration: 10 months (may extend 2 more). Joining: Mid-June 2024. Role: Account-Based Marketing.',
    process:[{round:'Online Test',description:'Aptitude + marketing basics'},{round:'Task Assignment',description:'Practical marketing task evaluation'},{round:'Culture Fit Interview',description:'Attitude + team fit assessment'}],
    dsaTopics:['Marketing','Communication','B2B SaaS','Analytics'],
    tips:'Marketing/sales role — not pure tech. Culture fit matters enormously here. Good for students interested in marketing + AI intersection. Positive attitude is explicitly evaluated.'
  },
  {
    name:'Junglee Games',domain:'jungleegames.com',type:'Startup',year:2024,
    package:'Stipend: ₹40,000/month | FTE: ₹14 LPA fixed + ₹1.4L bonus + retention bonuses (₹1L + ₹2L + ₹3L) = up to ₹21.4 LPA over 3 years',
    testType:'Both',
    eligibility:'60% throughout academic career, No Backlogs',
    testDetails:'Locations: Bengaluru & Gurugram. Duration: 12 months. Role: SDE Intern. Results declared same day with Letter of Intent.',
    process:[{round:'Online Test',description:'90 min DSA + Aptitude test (virtual). 25th May Saturday 10 AM–1 PM window.'},{round:'Campus Presentation',description:'In-person presentation at college — 30th May 9:30–10:30 AM'},{round:'Technical + HR Interviews',description:'30th May 11 AM–7 PM — only online test clearers proceed'},{round:'Results + LOI',description:'30th May at 7:30 PM — results declared and Letter of Intent issued same day!'}],
    dsaTopics:['Arrays','Strings','Dynamic Programming','Trees','Game Logic'],
    tips:'Results + LOI same day! Low CGPA bar (60%) — great for average CGPA students with strong coding. 12-month internship. Retention bonuses make total package excellent over 3 years.'
  },
  {
    name:'Skolar',domain:'skolar.in',type:'Startup',year:2024,
    package:'Inside Sales Specialist: ₹4–6 LPA | Academic Counsellor: ₹4.20 LPA (₹2.40L + ₹1.80L variable)',
    testType:'Both',
    eligibility:'50% throughout Academic Career, No Backlogs',
    testDetails:'Location: Bengaluru. Working days: 6 days/week. Probation: 4–6 months. Roles: Inside Sales Specialist, Academic Counsellor.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['Sales','Communication','EdTech Domain','Academic Counselling'],
    tips:'Lowest eligibility bar along with DeltaX (50%). Sales roles. 6-day work week. Good for students who want sales experience in EdTech startup.'
  },
  {
    name:'Celebal Technology',domain:'celebaltech.com',type:'Service',year:2024,
    package:'No stipend (summer internship)',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Virtual. Duration: 2 months. Role: Summer Internship.',
    process:[{round:'Registration',description:'Register for summer internship program'},{round:'Selection',description:'Profile-based selection'}],
    dsaTopics:['Python','Microsoft Azure','SAP','Data Science','Machine Learning'],
    tips:'No stipend but valuable Azure/SAP tech exposure. Microsoft partner company. Easy to get. Good for resume building and learning cloud tech. Free certification opportunities.'
  },
  {
    name:'Timechain Labs',domain:'timechainlabs.io',type:'Startup',year:2024,
    package:'No stipend',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Virtual. Duration: 2 months (June 2024). Phased internship: Phase 1 – Product Manager, Phase 2 – UI/UX Design, Phase 3 – Developer.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['Web3/Blockchain Basics','Product Management','UI/UX Design','Development'],
    tips:'Blockchain/Web3 startup. No stipend. Good for exploring Web3 domain. 3 different roles in 3 phases. Resume builder for blockchain enthusiasts.'
  },
  {
    name:'Amagi Media Labs',domain:'amagi.com',type:'Product',year:2024,
    package:'Stipend: ₹30,000/month | CTC: ₹12 LPA + ₹3 LPA retention bonus',
    testType:'Coding',
    eligibility:'80% throughout academic career, No Backlogs',
    testDetails:'Location: Bangalore (in-office, 5 days/week). Duration: 11–12 months. Role: SDE-1. FTE conversion based on performance. Only 3 offers given.',
    process:[{round:'Online Technical Test',description:'DSA + technical knowledge test'},{round:'Interview Round 1',description:'Technical — DSA + CS concepts'},{round:'Interview Round 2',description:'Advanced technical + system design discussion'}],
    dsaTopics:['Arrays','Trees','Graphs','System Design','Cloud','Distributed Systems'],
    tips:'Media cloud tech company. High academic bar (80%) + only 3 offers — very selective. Focus on distributed systems + strong DSA. Good growth company.'
  },
  {
    name:'Mu Sigma',domain:'mu-sigma.com',type:'Product',year:2024,
    package:'To be informed',
    testType:'Both',
    eligibility:'To be informed',
    testDetails:'Analytics consulting/data science company. Process to be informed.',
    process:[{round:'Online Test',description:'Aptitude + analytical + reasoning'},{round:'Interview',description:'Case study + technical + HR'}],
    dsaTopics:['Analytics','Statistics','Problem Solving','Data Science','SQL'],
    tips:'Leading analytics company. Decision sciences domain. Analytical thinking + statistics knowledge valued. Good for data science enthusiasts.'
  },
  {
    name:'A.P. Moller Maersk',domain:'maersk.com',type:'Product',year:2024,
    package:'Stipend: ₹50,000/month | CTC: ₹10.83 LPA',
    testType:'Both',
    eligibility:'7.00 or above CGPA upto 6th Sem in B.Tech, No Backlogs',
    testDetails:'Location: Bangalore. Duration: 1 year (July 2024). Role: Corporate Platforms.',
    process:[{round:'Online Assessment',description:'Technical + aptitude test'},{round:'PPT',description:'Pre-placement talk'},{round:'Interviews',description:'Technical + HR interview rounds'}],
    dsaTopics:['DSA','Python','SQL','Supply Chain Basics','Problem Solving'],
    tips:'Global shipping/logistics leader. Great stipend (₹50k) + ₹10.83 LPA CTC. 1-year internship. Supply chain/logistics domain knowledge is a bonus.'
  },
  {
    name:'IRISCarbon',domain:'iriscarbon.com',type:'Startup',year:2024,
    package:'Stipend: ₹25,000/month | CTC: ₹6 LPA',
    testType:'Both',
    eligibility:'6.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Hyderabad. Duration: 1 year (July 2024). Role: Sales Development Rockstar – Intern.',
    process:[{round:'Process',description:'To be informed'}],
    dsaTopics:['Sales Development','Communication','ESG/Carbon Reporting Basics','CRM Tools'],
    tips:'ESG/carbon reporting startup — growing domain. Sales role. Low 6 CGPA bar. Good for students interested in sustainability + tech intersection.'
  },
  {
    name:'CISCO',domain:'cisco.com',type:'Product',year:2024,
    package:'Top-tier (networking major)',
    testType:'Coding',
    eligibility:'No Backlogs',
    testDetails:'Code-a-thon at Cisco Office Bangalore Campus on 9th & 10th July 2024. Shortlisting on 25th June 2024.',
    process:[{round:'Shortlisting',description:'Based on profile — 25th June 2024'},{round:'Code-a-thon',description:'Coding competition at Cisco Office Bangalore on 9th & 10th July 2024'}],
    dsaTopics:['DSA','Networking Concepts','Algorithms','C/C++','Python'],
    tips:'Global networking giant. Code-a-thon format — prepare competitive coding. Networking knowledge is a plus. Held at Cisco\'s own office — prestigious environment.'
  },
  {
    name:'Zluri',domain:'zluri.com',type:'Startup',year:2024,
    package:'Stipend: ₹25,000/month | CTC: ₹7 LPA (₹6 LPA fixed + ₹1 LPA variable)',
    testType:'Both',
    eligibility:'60% throughout academic career, No Backlogs',
    testDetails:'Location: Bangalore (in-office). Duration: 6 months. Joining: Will be informed. Role: GTM Intern.',
    process:[{round:'Process',description:'To be informed'}],
    dsaTopics:['SaaS','Go-To-Market','Sales','Communication','Product Knowledge'],
    tips:'SaaS management platform startup. GTM (Go-To-Market) role — sales + marketing + product. Accessible 60% bar. Good Bangalore startup experience.'
  },
  {
    name:'XPeri',domain:'xperi.com',type:'Product',year:2024,
    package:'Stipend: ₹50,000/month | CTC: To be notified',
    testType:'Coding',
    eligibility:'8.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Bangalore (Hybrid). Working days: Mon–Fri. Joining: 1st week of July 2024. Duration: 6 months (extendable + PPO possibility). Role: Software Engineer.',
    process:[{round:'MCQ & Coding Challenge',description:'Skill-based MCQ + coding challenge'},{round:'Technical Interviews',description:'2–3 rounds of technical interview (virtual)'}],
    dsaTopics:['DSA','C/C++','Embedded Systems','Media Technology','Problem Solving'],
    tips:'Media/entertainment tech company (DTS, TiVo parent). ₹50k stipend with 8 CGPA bar. PPO possibility. Hybrid work. Media tech domain is interesting.'
  },
  {
    name:'OneBanc',domain:'onebanc.in',type:'Startup',year:2024,
    package:'DevOps: ₹20k stipend/₹5–7 LPA | UI/UX/Android/iOS/Frontend/Backend: ₹25k stipend/₹8–10 LPA',
    testType:'Both',
    eligibility:'70–80% throughout academic career, No Backlogs',
    testDetails:'Visited twice (June + August 2024). Locations: Gurugram (WFO mandatory). Relocation to Gurugram is a must. Company covers travel, meals, stay during Pre-Hiring Evaluation. Roles: Module Owner, DevOps, UI/UX, Android, iOS, Frontend, Backend.',
    process:[{round:'Group Discussion',description:'Topic-based GD round'},{round:'Virtual Interview',description:'30 minute virtual interview'},{round:'Aptitude Test',description:'15 minute aptitude assessment'},{round:'Pre-Hiring Evaluation',description:'2 days at Gurugram office — company pays all travel, meals, stay costs'}],
    dsaTopics:['Role-specific','React (Frontend)','Node.js (Backend)','Android Dev','iOS Dev','DevOps Tools'],
    tips:'High eligibility bar. Gurugram WFO is mandatory. Company covers ALL evaluation costs (travel+stay+food). Multiple tech profiles across 6 roles. Good FinTech startup experience.'
  },
  {
    name:'TVS Motor Company',domain:'tvsmotor.com',type:'Product',year:2024,
    package:'Stipend: ₹25,000/month',
    testType:'Both',
    eligibility:'60% throughout academic career, No Backlogs',
    testDetails:'Roles: Digital Engineer, Data Analyst, Data Engineer.',
    process:[{round:'Shortlisting',description:'Resume + academic performance'},{round:'Technical Online Assessment',description:'Technical + aptitude test'},{round:'TVS Leadership Competency Assessment',description:'Leadership and competency evaluation'},{round:'Group Discussion / Presentation',description:'GD or presentation round'},{round:'Personal Interview',description:'Final personal interview'}],
    dsaTopics:['Data Engineering','Python','SQL','Analytics','Automotive Domain'],
    tips:'Automotive major. 5-round process including leadership competency — prepare behavioral answers. Data roles focus on Python + SQL + analytics. 60% accessible bar. Great brand.'
  },
  {
    name:'Zenken India (Japanese Companies)',domain:'zenken.com',type:'Product',year:2024,
    package:'Japanese salary standards (high)',
    testType:'Both',
    eligibility:'Aspiring to work with Japanese companies',
    testDetails:'Japanese language training + placement in Japanese companies.',
    process:[{round:'Process',description:'To be notified — Japanese language aptitude may be tested'}],
    dsaTopics:['Japanese Language Interest','IT Fundamentals','Communication'],
    tips:'Work in Japan opportunity. Japanese language learning provided. High quality of life in Japan. Good for adventurous students wanting international exposure.'
  },
  {
    name:'Toplyne',domain:'toplyne.ai',type:'Startup',year:2024,
    package:'Stipend: ₹50,000/month | CTC: ₹15–18 LPA + ESOPs',
    testType:'Coding',
    eligibility:'8.50 or above CGPA in B.Tech upto 6th Sem, No Backlogs',
    testDetails:'Location: To be informed. Duration: 6 months. Joining: To be notified. Role: SDE Intern.',
    process:[{round:'PPT / Online Test',description:'Pre-placement talk + online screening'},{round:'Technical Round 1',description:'DSA problem solving + coding'},{round:'Technical Round 2 + Manager Chat',description:'Advanced technical + manager discussion on product/engineering'}],
    dsaTopics:['Arrays','Trees','Dynamic Programming','System Design','Backend','APIs'],
    tips:'Very high CGPA bar (8.5). ESOPs add long-term value. Product-led growth startup. ₹50k stipend + ESOPs is excellent combination.'
  },
  {
    name:'BLUEKAKTUS',domain:'bluekaktus.com',type:'Startup',year:2024,
    package:'Stipend: ₹18,000/month | CTC: ₹6.50 LPA fixed + ₹1.50 LPA variable',
    testType:'Both',
    eligibility:'7.50 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: New Delhi. Duration: 6 months. Role: Inside Sales Intern.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['Sales','Communication','Fashion Tech','B2B SaaS'],
    tips:'Fashion tech startup. Inside sales role. Delhi location. 7.5 CGPA bar. Performance-based variable component. Fashion + tech is a niche growing domain.'
  },
  {
    name:'EduBild Technologies (KamtechAssociates)',domain:'edubild.com',type:'Startup',year:2024,
    package:'CTC: ₹4–5 LPA',
    testType:'Both',
    eligibility:'Not mentioned',
    testDetails:'Location: Jaipur, Rajasthan & Bangalore Urban. Duration: Not mentioned.',
    process:[{round:'AI Interview',description:'AI-based automated interview screening'},{round:'Interviews',description:'Technical + HR rounds'}],
    dsaTopics:['Web Development','Problem Solving','Tech Skills','AI Interview Prep'],
    tips:'Interesting — uses AI Interview technology. Good opportunity to experience AI-based hiring. EdTech startup. Jaipur + Bangalore locations.'
  },
  {
    name:'Genspark (formerly ProGrad)',domain:'genspark.ai',type:'Startup',year:2024,
    package:'Training: ₹15,000/month | Post-training first 3 months: ₹15,000/month | Post-training: ₹20,000/month till graduation | CTC: ₹10 LPA',
    testType:'Coding',
    eligibility:'No Backlogs',
    testDetails:'Location: Delhi (Work From Office). Training: 8 weeks. Role: Associate Software Engineer.',
    process:[{round:'Online Technical Test 1',description:'Aptitude + basic technical'},{round:'Online Technical Test 2',description:'Advanced technical screening'},{round:'Coding Task + Review',description:'Take-home coding task + review discussion'},{round:'Technical Interview',description:'Deep technical interview'},{round:'Final Round',description:'Technical + Cultural Fitment by Simpplr team'}],
    dsaTopics:['DSA','Web Development','Problem Solving','System Thinking'],
    tips:'No CGPA bar — just skills matter. 5 rounds total. Lower stipend during training phase. Good for students with strong skills but lower CGPA. Delhi WFO.'
  },
  {
    name:'Plotline',domain:'plotline.so',type:'Startup',year:2024,
    package:'Stipend: ₹55,000/month | CTC: ₹14–18 LPA',
    testType:'Coding',
    eligibility:'80% throughout academic career, No Backlogs',
    testDetails:'Location: Bengaluru (work from office). Duration: 6 months (Jan 2025). Role: SDE Intern in Backend, Frontend, Mobile.',
    process:[{round:'Coding Test',description:'DSA + problem solving coding round'},{round:'Technical Discussion',description:'Deep dive into solutions + new problems + tech stack discussion'},{round:'Non-Tech Discussion',description:'Culture fit + product thinking + why Plotline'}],
    dsaTopics:['Arrays','Trees','Dynamic Programming','Backend APIs','System Design','Mobile Dev'],
    tips:'Excellent package for startup. Research Plotline product before non-tech round. Strong coding + product thinking both valued. High 80% academic bar.'
  },
  {
    name:'Chubb',domain:'chubb.com',type:'Product',year:2024,
    package:'Stipend: ₹30k–₹35k/month | CTC: Fixed ₹8.55–₹9.52 LPA + Variable up to ₹0.95L + Relocation/Joining Bonus ₹1.6L',
    testType:'Coding',
    eligibility:'70% throughout academic career, No Backlogs',
    testDetails:'Visited twice (July + August 2024). Location: Hyderabad. Duration: 6 months. Role: Trainee Software Engineer. HackerRank test conducted at KIIT campus.',
    process:[{round:'PPT',description:'Virtual pre-placement talk'},{round:'HackerRank Test',description:'Coding test conducted at KIIT Campus — 16th August 2024'},{round:'Interview',description:'Technical + HR interview rounds'}],
    dsaTopics:['Arrays','Strings','Trees','Dynamic Programming','Java'],
    tips:'Insurance tech company. Visited twice — strong hiring intent. HackerRank on campus (medium level). ₹1.6L joining bonus is great. Total compensation is solid including bonus.'
  },
  {
    name:'Affinsys',domain:'affinsys.com',type:'Service',year:2024,
    package:'Stipend: ₹20,000/month | CTC: ₹8.50 LPA | Service Bond: ₹3L for 2 years of employment + internship',
    testType:'Both',
    eligibility:'8.50 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Whitefield, Bangalore. Duration: 1 year mandatory internship.',
    process:[{round:'Shortlisting',description:'Based on CGPA (8.5 bar) and resume'},{round:'Technical Interview',description:'DSA + Java + OOPS + DBMS'},{round:'HR Interview',description:'Bond discussion + behavioral questions'}],
    dsaTopics:['DSA','Java','OOPS','DBMS','Problem Solving'],
    tips:'High CGPA bar (8.5). ₹3L service bond for 2 years — think carefully before committing. Good ₹8.5 LPA CTC for service company. 1-year mandatory internship is long.'
  },
  {
    name:'Restroworks (formerly Posist)',domain:'restroworks.com',type:'Product',year:2024,
    package:'Training 3 months: ₹23,000/month | Probation 3 months: ₹25,000/month | FTE: ₹9–12 LPA',
    testType:'Coding',
    eligibility:'6.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Delhi. Duration: 3 months training + 3 months probation. Role: MEAN Stack Developer.',
    process:[{round:'Technical Screening',description:'MEAN Stack knowledge + DSA basics test'},{round:'Interview',description:'Technical + HR discussion'}],
    dsaTopics:['MongoDB','Express.js','Angular','Node.js','JavaScript','DSA Basics'],
    tips:'Restaurant tech company. MEAN Stack skills are key. Low 6 CGPA bar — accessible. Delhi location. Good ₹9–12 LPA FTE potential.'
  },
  {
    name:'Vivriti Capital',domain:'vivriticapital.com',type:'Product',year:2024,
    package:'Stipend: ₹25,000/month | CTC: ₹10–11 LPA',
    testType:'Both',
    eligibility:'80% throughout Academic Career, No Backlogs. Good Communication (Oral & Written).',
    testDetails:'Location: Chennai. Duration: 3–6 months (July 2024–Jan 2025).',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['FinTech','Python','SQL','Analytics','DSA'],
    tips:'FinTech credit company. High 80% academic bar. Chennai location. Good CTC for FinTech. Communication skills explicitly valued. Finance domain knowledge helpful.'
  },
  {
    name:'TC Group (TechCurators & TransCurators)',domain:'techcurators.com',type:'Startup',year:2024,
    package:'To be informed during PPT',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Delhi/Bangalore (full-time in-office). Duration: 1 year. Roles: Growth & Strategy (all branches + MCA), Technical Project Manager (CSE/IT), Technical Content Engineer (CSE/IT), AI Developer (B.Tech).',
    process:[{round:'PPT',description:'Pre-placement talk'},{round:'Puzzle Round',description:'Analytical puzzle solving — unique round, practice logical puzzles and brain teasers'},{round:'Group Discussion',description:'GD round'},{round:'Technical Interview',description:'Role-specific technical discussion'}],
    dsaTopics:['Problem Solving','Logical Puzzles','AI/ML (for AI Dev role)','Content Writing','Project Management'],
    tips:'Unique puzzle round — practice brain teasers and logical puzzles. AI Developer role best for CSE students. Multiple branch eligibility for some roles. 1-year commitment.'
  },
  {
    name:'DeltaX',domain:'deltax.net',type:'Product',year:2024,
    package:'CTC: ₹7 LPA (No stipend during 4-month virtual training Jan–Apr 2025)',
    testType:'Both',
    eligibility:'50% or above throughout academic career, No Backlogs',
    testDetails:'Location: Bangalore/Hyderabad/Pune. Training mode: Virtual (Jan–Apr 2025). Role: Associate Product Engineer.',
    process:[{round:'Online MCQ Test',description:'Aptitude + technical MCQs'},{round:'Online Coding Test',description:'Coding assessment'},{round:'Interview',description:'Technical + HR rounds'}],
    dsaTopics:['DSA Basics','Web Development','Problem Solving','Ad Tech Domain'],
    tips:'LOWEST eligibility bar on campus (50%) — most accessible company. No stipend during 4-month virtual training. Best option for low-percentage students. Ad-tech domain.'
  },
  {
    name:'TheMathCompany (2MC)',domain:'themathcompany.com',type:'Product',year:2024,
    package:'Year 1: ₹5.5 LPA (₹4.5L fixed + ₹1L bonus) | Year 2: ₹8 LPA | Year 3: ₹12.5 LPA',
    testType:'Both',
    eligibility:'6.50 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Bengaluru (Mahadevapura). Visited twice. Role: Trainee Analyst.',
    process:[{round:'Online Assessment',description:'Logical Reasoning + Quantitative Aptitude + Pseudocode + Communication Test (10th August 2024)'},{round:'PPT',description:'Pre-placement talk'},{round:'Technical + HR Rounds',description:'At campus — technical interview + HR discussion'}],
    dsaTopics:['Analytics','Statistics','Pseudocode Logic','Logical Reasoning','Quantitative Aptitude'],
    tips:'Great growth trajectory (₹5.5→₹8→₹12.5 LPA in 3 years). Unique pseudocode round — focus on logic not syntax. Communication test — explain clearly. Analytics consulting firm.'
  },
  {
    name:'Froker',domain:'froker.in',type:'Startup',year:2024,
    package:'Stipend: ₹15,000/month | CTC: ₹6–12 LPA',
    testType:'Coding',
    eligibility:'8.00 or above CGPA in B.Tech, No Backlogs. All branches for Product/Marketing roles.',
    testDetails:'Roles: Product Intern (all branches), Marketing Intern (all branches), React Native Developer (CSE/IT), MERN Stack Developer (CSE/IT).',
    process:[{round:'Shortlisting',description:'Based on CGPA (8.0 bar) and profile'},{round:'Process',description:'To be notified'}],
    dsaTopics:['React Native','MERN Stack','MongoDB','Express','React','Node.js'],
    tips:'Content-sharing/social media startup. Multiple roles — coding + non-coding. 8 CGPA bar. React Native + MERN Stack for technical roles. CTC range is wide (₹6–12 LPA).'
  },
  {
    name:'Accenture',domain:'accenture.com',type:'Service',year:2024,
    package:'ASE: ₹4.5 LPA | AASE: ₹8 LPA',
    testType:'Both',
    eligibility:'No Backlogs in B.Tech (very accessible)',
    testDetails:'202 offers with LOR. Roles: Associate Software Engineer (ASE), Advanced Associate Software Engineer (AASE). PPT on 26th July 2024.',
    process:[{round:'PPT',description:'Pre-Placement Talk on 26th July 2024'},{round:'Cognitive Assessment',description:'Logical reasoning + quantitative aptitude'},{round:'Technical Assessment',description:'Technical MCQs + basic coding'},{round:'Communication Test',description:'English communication — spoken + written'},{round:'Interview',description:'Technical + HR for shortlisted'}],
    dsaTopics:['Arrays','Strings','Basic OOPS','SQL','Aptitude','Communication'],
    tips:'NO CGPA cutoff — just no backlogs. Communication test is very important. Target AASE track (₹8 LPA) by performing well. 202 offers — very high selection rate. Large recruiter.'
  },
  {
    name:'Alstom',domain:'alstomgroup.com',type:'Product',year:2024,
    package:'B.Tech CTC: ₹6.80 LPA',
    testType:'Both',
    eligibility:'60% in 10th, 12th/Diploma & 6.50 or above CGPA in B.Tech | M.Tech: 60% + 65% in graduation | No Backlogs',
    testDetails:'Roles: Graduate Engineer Trainee (B.Tech), Post Graduate Engineer Trainee (M.Tech). Location and duration: To be informed during PPT.',
    process:[{round:'PPT',description:'Pre-placement talk'},{round:'Online Test',description:'Technical + aptitude assessment'},{round:'Group Discussion',description:'GD round'},{round:'Technical Interview',description:'Domain + technical discussion'},{round:'HR Interview',description:'Behavioral round'}],
    dsaTopics:['Core Engineering','Railway/Transportation Tech','Problem Solving','Embedded Systems'],
    tips:'Makes metro rail systems and transportation equipment. GD round included. Accessible 60% + 6.5 CGPA cutoff. Core engineering company — not pure software.'
  },
  {
    name:'Infosys',domain:'infosys.com',type:'Service',year:2024,
    package:'Specialist Programmer: ₹9.50 LPA | Systems Engineer: ₹3.6 LPA',
    testType:'Both',
    eligibility:'60% in 10th & 12th (65% Diploma) & 6.00 or above CGPA in B.Tech, No Backlogs. Willing to relocate PAN India.',
    testDetails:'Location: Pan India. InfyTQ platform used. Online Test → Interviews physically.',
    process:[{round:'InfyTQ Online Test',description:'Aptitude + Verbal + Logical Reasoning + Coding sections. Practice free mocks on InfyTQ portal.'},{round:'Technical Interview',description:'OOPS, DBMS, OS basics, DSA basics, projects. Prepare all CS fundamentals.'},{round:'HR Interview',description:'Why Infosys, relocation willingness, career plans'}],
    dsaTopics:['Arrays','Strings','Sorting','OOPS','DBMS','SQL','OS Basics'],
    tips:'Second largest mass recruiter. Practice InfyTQ mock tests extensively. Target Specialist Programmer track for ₹9.5 LPA — needs higher coding score. Always say yes to relocation.'
  },
  {
    name:'Tredence Analytics',domain:'tredence.com',type:'Product',year:2024,
    package:'CTC: ₹10 LPA',
    testType:'Both',
    eligibility:'70% throughout academic career, No Backlogs',
    testDetails:'Locations: Bengaluru, Chennai, Gurugram, Pune, Kolkata. Role: Analyst.',
    process:[{round:'Shortlisting',description:'Resume + academic performance'},{round:'Analytics Assessment',description:'Analytics + technical test'},{round:'Interview',description:'Technical + HR rounds'}],
    dsaTopics:['SQL','Python','Statistics','Data Analytics','Excel','Problem Solving'],
    tips:'Analytics consulting. Focus on SQL + Python + statistics. Data analytics knowledge valued. Good ₹10 LPA for analytics profile. Multiple city options.'
  },
  {
    name:'ION Group',domain:'iongroup.com',type:'Product',year:2024,
    package:'CTC: ₹17.30 LPA (₹15 LPA fixed)',
    testType:'Both',
    eligibility:'75% throughout academic career, No Backlogs',
    testDetails:'Locations: Noida, Gurgaon, Hyderabad, Pune, Mumbai. Joining: Tentatively Jan 2025. Roles: Software Developer, Technical Analyst.',
    process:[{round:'PPT',description:'Pre-placement talk on 25th July 2024'},{round:'Online Test',description:'Technical + aptitude on 25th July 2024'},{round:'Interviews',description:'Technical + Case Study + Stakeholder + Culture Fit + Future Fit on 29th July'},{round:'Final Interview',description:'In-person at Noida office for final shortlist'}],
    dsaTopics:['Arrays','Graphs','Dynamic Programming','System Design','Financial Tech'],
    tips:'Excellent package (₹17.3 LPA). Multiple interview rounds including case study. Final round is in Noida physically. Strong 75% academic bar. FinTech domain knowledge helps.'
  },
  {
    name:'EPAM Systems',domain:'epam.com',type:'Service',year:2024,
    package:'Stipend: ₹25,000/month | CTC: ₹8 LPA',
    testType:'Coding',
    eligibility:'70% throughout academic career, No Backlogs',
    testDetails:'Location: Pan India. Duration: 6 months internship.',
    process:[{round:'Technical Test',description:'Coding + technical screening'},{round:'Technical Interview',description:'DSA + tech stack discussion'},{round:'HR Interview',description:'Behavioral round'}],
    dsaTopics:['DSA','Java/.NET','OOPS','Problem Solving','Web Dev'],
    tips:'Global IT services. Good ₹25k stipend + ₹8 LPA CTC. 70% academic bar. Diverse tech stack — Java and .NET both used. Pan India locations.'
  },
  {
    name:'Quantzig',domain:'quantzig.com',type:'Product',year:2024,
    package:'CTC: ₹6 LPA',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: Pan India. Role: Associate Analytic Consultant.',
    process:[{round:'Case Study',description:'Analytical case problem — main filter'},{round:'Post Case Study Selection',description:'Based on case performance'},{round:'Technical Discussion',description:'Analytics + technical discussion'}],
    dsaTopics:['Analytics','Statistics','SQL','Python','Case Solving'],
    tips:'Analytics consulting. Case study is THE main filter. No CGPA bar — analytical thinking matters. ₹6 LPA for analytics role.'
  },
  {
    name:'Pine Labs',domain:'pinelabs.com',type:'Product',year:2024,
    package:'Stipend: ₹40,000/month | CTC: ₹11 LPA',
    testType:'Coding',
    eligibility:'8.50 or above CGPA in Current Degree, No Backlogs',
    testDetails:'Locations: Noida, Bangalore, Pune, Mumbai. Duration: 10 months (3rd September 2024). Role: Software Engineer Intern.',
    process:[{round:'Online Technical Assessment',description:'Coding + technical MCQs'},{round:'Panel Interview',description:'Multiple interviewers — DSA + System Design + CS fundamentals'}],
    dsaTopics:['Arrays','Trees','Graphs','Dynamic Programming','System Design'],
    tips:'FinTech payments company. High CGPA bar (8.5). Panel interview — stay calm with multiple interviewers. Prepare basic system design. 10-month long engagement.'
  },
  {
    name:'HumanResocia',domain:'humanresocia.co.jp',type:'Product',year:2024,
    package:'Data Scientist: ~₹44.52 Lakh/year (in Yen) | Software Engineer: ~₹42.37 Lakh/year (in Yen)',
    testType:'Both',
    eligibility:'8.80 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Locations: Tokyo, Osaka, Nagoya and other Japanese cities. Work in Japan.',
    process:[{round:'PPT',description:'Pre-placement talk'},{round:'Coding Test',description:'Technical coding assessment'},{round:'Interview',description:'Technical + HR discussion'}],
    dsaTopics:['DSA','Data Science','Machine Learning','Japanese Work Culture Awareness'],
    tips:'Work in Japan opportunity! Very high CGPA bar (8.8). Salary in Yen is equivalent to ~₹40+ LPA. High quality of life in Japan. Japanese language exposure helpful but not mandatory.'
  },
  {
    name:'GlobalLogic (Hitachi)',domain:'globallogic.com',type:'Service',year:2024,
    package:'CTC: ₹5.66 LPA',
    testType:'Both',
    eligibility:'60% throughout academic career, No Backlogs, Max 1 year gap from 10th to B.Tech, No correspondence/distance learning courses',
    testDetails:'Locations: Noida/GGN/Bangalore/Hyderabad/Pune/Nagpur/Chennai.',
    process:[{round:'Online Assessment',description:'Technical MCQs + Aptitude + Reasoning'},{round:'Technical Interview',description:'Core CS concepts + coding discussion'},{round:'Managerial Interview',description:'Behavioral + situational questions'},{round:'HR Interview',description:'Standard HR round'}],
    dsaTopics:['Arrays','OOPS','DBMS','OS Concepts','DSA Basics'],
    tips:'Hitachi subsidiary. 60% accessible cutoff. Multiple city options across India. No correspondence courses allowed. Focus on CS fundamentals. Good for service sector start.'
  },
  {
    name:'Bain & Company',domain:'bain.com',type:'Product',year:2024,
    package:'Stipend: ₹40,000/month + ₹30,000 relocation allowance | CTC: ₹9.9L fixed + ₹1.1L performance bonus + ₹3L signing bonus (3 tranches) = ₹14 LPA total',
    testType:'Both',
    eligibility:'60% throughout academic career, No Backlogs',
    testDetails:'Locations: Gurgaon/Bangalore. Duration: 6 months (January 2025). Role: Intern Analyst. BCN portal registration is MANDATORY before applying.',
    process:[{round:'BCN Portal Registration',description:'MANDATORY — register on Bain BCN career portal FIRST before anything else'},{round:'PPT',description:'Virtual pre-placement talk on 26th July 2024'},{round:'Online Test',description:'Aptitude + case reasoning on 29th July 2024 (virtually)'},{round:'Case Study Workshop',description:'Virtual workshop on 31st July 2024 — shortlisted only'},{round:'Virtual Interviews',description:'2 rounds — case study interview + behavioral/fit interview'}],
    dsaTopics:['Case Frameworks','Analytical Reasoning','Business Problem Solving','Communication'],
    tips:'Consulting firm — NO hardcore DSA. Case study prep is EVERYTHING. Practice BCG/McKinsey case frameworks. ₹3L signing bonus paid in tranches. Accessible 60% bar for a top company.'
  },
  {
    name:'Money Forward',domain:'moneyforward.com',type:'Product',year:2024,
    package:'5 million JPY or higher (~₹28 LPA or higher)',
    testType:'Coding',
    eligibility:'No Backlogs | Internship experience in software development (3+ months) | Coding experience required',
    testDetails:'Location: Japan (Hybrid — min 2 days office mandatory). Role: Software Engineer.',
    process:[{round:'Coding Assignment',description:'Take-home coding assignment'},{round:'Aptitude Test',description:'Technical aptitude test'},{round:'Final Interview',description:'Technical + HR final interview'}],
    dsaTopics:['DSA','Software Development','Backend Engineering','System Design'],
    tips:'Work in Japan! ₹28 LPA+ equivalent. Prior internship experience (3+ months) is required — have something on resume. Japanese FinTech company. High quality of life.'
  },
  {
    name:'Cognida AI',domain:'cognida.ai',type:'Startup',year:2024,
    package:'Stipend: ₹20,000/month | CTC: ₹7 LPA',
    testType:'Coding',
    eligibility:'7.00 or above CGPA in B.Tech/MCA, No Backlogs',
    testDetails:'Location: Hyderabad. Duration: 4–6 months (Dec 2024). Role: Software Developer.',
    process:[{round:'Online Coding Test',description:'DSA coding problems'},{round:'Technical Interview',description:'DSA + tech stack discussion'},{round:'HR Interview',description:'Behavioral round'}],
    dsaTopics:['DSA','Python','AI/ML Basics','Problem Solving'],
    tips:'AI-focused startup. MCA students also eligible. Good for AI/ML enthusiasts. Hyderabad location. 7 CGPA bar is reasonable.'
  },
  {
    name:'Micron Technology',domain:'micron.com',type:'Product',year:2024,
    package:'To be disclosed',
    testType:'Both',
    eligibility:'6.00 or above CGPA in B.Tech, No Backlogs',
    testDetails:'Location: Hyderabad. Full-time joining: Jun/Jul 2025. Internship: Jan–Jun 2025. Role: Quality Assurance Automation Engineer. All rounds virtual.',
    process:[{round:'PPT',description:'Virtual PPT on 8th August 2024 at 12 PM'},{round:'Online Test',description:'Technical + aptitude on 8th August 2024 at 4 PM (virtually)'},{round:'Interview',description:'Virtual technical interview on 21st August 2024 at 10 AM'}],
    dsaTopics:['C/C++','OS Concepts','Computer Architecture','Testing Automation','Memory Systems'],
    tips:'Semiconductor/memory chip company (makes DRAM, SSD). Low 6 CGPA bar — very accessible. QA Automation role needs testing + coding both. C/C++ and hardware concepts important.'
  },
  {
    name:'PeopleHum Technologies',domain:'peoplehum.com',type:'Product',year:2024,
    package:'Software Dev: Stipend ₹28k/month, CTC ₹7 LPA | SDET: Stipend ₹25k/month, CTC ₹5.75 LPA',
    testType:'Coding',
    eligibility:'80% or above throughout academic career, No Backlogs',
    testDetails:'Locations: Bangalore, Hyderabad, Pune. Duration: 6 months (January 2025). Roles: Software Engineering (Dev), SDET.',
    process:[{round:'Shortlisting',description:'Academic performance screening (80% bar)'},{round:'Technical Assessment',description:'Coding + technical MCQs'},{round:'Interview',description:'Technical + HR rounds'}],
    dsaTopics:['DSA','Java/Python','Testing Basics','OOPS','System Design Basics'],
    tips:'HR-tech company. High 80% academic bar. Dev track has better package than SDET. Focus on DSA + OOPS for Dev role. 3 city options available.'
  },
  {
    name:'Wabtec Corporation',domain:'wabtec.com',type:'Product',year:2024,
    package:'B.Tech Stipend: ₹30,000/month | M.Tech Stipend: ₹35,000/month',
    testType:'Both',
    eligibility:'60% throughout Academic Career, No Backlogs',
    testDetails:'Location: Bangalore. Post-internship: Pan India (Hosur, Bangalore, Kolkata, Bihar). Duration: 6 months–1 year (Sep 2024). Role: Intern.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['Core Engineering','Railway Transportation Tech','Problem Solving','Basic Programming'],
    tips:'Transportation/railway tech company. Low 60% eligibility. Pan India post-internship locations. Good for students interested in transportation tech. Not pure software.'
  },
  {
    name:'Syncron',domain:'syncron.com',type:'Product',year:2024,
    package:'Stipend: ₹30,000/month | CTC: ₹10–11 LPA',
    testType:'Both',
    eligibility:'No Backlogs',
    testDetails:'Location: To be notified. Duration: 6 months–1 year (starting Nov 2024 or Jan 2025). Role: Associate Talent Acquisition Specialist.',
    process:[{round:'Shortlisting',description:'Resume screening'},{round:'Interview',description:'Technical + HR discussion'}],
    dsaTopics:['HR Tech','Communication','Recruitment Fundamentals','Talent Acquisition'],
    tips:'HR-tech company. Talent Acquisition role — not pure coding. Good ₹10–11 LPA CTC. No CGPA bar — skills + communication matter most here.'
  },
  {
    name:'GoComet',domain:'gocomet.com',type:'Startup',year:2024,
    package:'QA Intern: Stipend ₹29,166/month, CTC ₹4.5–5.5 LPA | DevOps & Cybersecurity: Stipend ₹25k–45k/month, CTC ₹8–12 LPA',
    testType:'Coding',
    eligibility:'No Backlogs',
    testDetails:'Location: Bangalore. Durations: QA Intern (6 months), DevOps & Cybersecurity (1 year). Roles: QA Intern, DevOps & Cybersecurity Intern.',
    process:[{round:'Shortlisting',description:'Resume screening'},{round:'Technical Interview',description:'Role-specific technical discussion'},{round:'HR Interview',description:'Behavioral round'}],
    dsaTopics:['QA Testing','DevOps Tools','Cybersecurity Basics','Python','Linux','CI/CD'],
    tips:'Logistics tech startup. No CGPA bar. DevOps/Cybersecurity track has MUCH better package (₹8–12 LPA vs ₹4.5–5.5 LPA for QA). Great for infrastructure/security students.'
  },
  {
    name:'INRY',domain:'inry.com',type:'Service',year:2024,
    package:'Stipend: ₹30,000/month | CTC: ₹8.41 LPA after successful completion',
    testType:'Both',
    eligibility:'60% throughout Academic Career, 1 Backlogs Allowed, 1 Academic Year Gap Allowed, ServiceNow knowledge preferred',
    testDetails:'Location: Hyderabad. Duration: 6 months–1 year (2nd week of September 2024). Role: ServiceNow Associates.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['ServiceNow Platform','ITSM','JavaScript Basics','Problem Solving'],
    tips:'ServiceNow consulting company. Unique — 1 backlog allowed and 1 academic year gap allowed. ServiceNow is a high-demand niche skill. Good ₹8.41 LPA CTC. Learn ServiceNow basics.'
  },
  {
    name:'Brakes India',domain:'brakesindia.com',type:'Product',year:2024,
    package:'Stipend: ₹15,000/month | First 6 months FTE: ₹3.79 LPA | Next 6 months: ₹4.41 LPA | After 1 year: ₹5.13 LPA',
    testType:'Both',
    eligibility:'80% or above in 10th & 12th/Diploma | 7.50 or above in B.Tech | No Backlogs',
    testDetails:'Duration: 6 months (January 2025). Role: Graduate Engineer Trainee.',
    process:[{round:'Technical + Aptitude Test',description:'Combined technical and aptitude assessment'},{round:'Group Discussion',description:'GD round'},{round:'Interview',description:'Technical + HR interview'}],
    dsaTopics:['Core Engineering','Automotive Braking Systems','Problem Solving','Technical Aptitude'],
    tips:'Automotive component manufacturer (makes brakes for TVS, Hero etc.). High academic bar (80% + 7.5 CGPA). Core engineering role — not pure software. GD round is important.'
  },
  {
    name:'AMI (Advanced Microelectronic and Instruments)',domain:'ami.ac.in',type:'Product',year:2024,
    package:'CTC: ₹4.50–6.00 LPA',
    testType:'Both',
    eligibility:'60% throughout Academic Career, No Backlogs',
    testDetails:'Location: Chennai. Service Bond: 3 years. Role: System Software Engineer – Trainee.',
    process:[{round:'Online Test (Mettl)',description:'Technical + aptitude test on Mettl platform'},{round:'Interview',description:'Technical + HR rounds'}],
    dsaTopics:['C/C++','Embedded Systems','System Programming','Electronics Basics'],
    tips:'Electronics/instruments company. 3-year service bond. Chennai location. Mettl platform used for online test. Embedded + system programming focus. Good for electronics/embedded students.'
  },
  {
    name:'Deloitte',domain:'deloitte.com',type:'Service',year:2024,
    package:'Competitive (role-dependent)',
    testType:'Both',
    eligibility:'Analyst: 6.00 CGPA + No Backlogs | Analytics Specialist: 6.50 CGPA + 60% in 10th/12th + No Backlogs',
    testDetails:'Location: Pan India. Profiles: Analyst (Deloitte US India), Analytics Specialist Assistant (Audit & Assurance). Online Test on 14th August 2024 → Further rounds on 20th August.',
    process:[{round:'Online Test',description:'Aptitude + Technical + Verbal Reasoning — virtually on 14th August from 5 PM'},{round:'Technical + HR Interview',description:'Interviews for shortlisted students on 20th August'}],
    dsaTopics:['SQL','DBMS','Basic DSA','Analytics','Statistics','Aptitude'],
    tips:'Big 4 brand. Analytics role needs stats/data knowledge. Accessible 6 CGPA bar. Deloitte US India profiles are most prestigious. Good for data + consulting oriented students.'
  },
  {
    name:'OpenText',domain:'opentext.com',type:'Product',year:2024,
    package:'To be notified',
    testType:'Both',
    eligibility:'No Backlogs, Must be Indian Citizen with Aadhar card',
    testDetails:'Location: Bangalore and Hyderabad. Duration: 6 months.',
    process:[{round:'Process',description:'To be notified'}],
    dsaTopics:['DSA','Enterprise Software','Information Management','Java/.NET'],
    tips:'Enterprise software company. No CGPA bar — just no backlogs and Aadhar card required. Information management domain. Bangalore or Hyderabad locations. Package to be notified.'
  },
  {
    name:'TCS (NQT)',domain:'tcs.com',type:'Service',year:2024,
    package:'Ninja: ₹3.36 LPA | Digital: ₹7 LPA | Prime: ₹9–11.5 LPA',
    testType:'Both',
    eligibility:'60% throughout (10th, 12th, Graduation), No Backlogs, Max 2 years gap',
    testDetails:'TCS National Qualifier Test (NQT). Three tracks based on score. Pan India locations. Roles vary by track.',
    process:[{round:'TCS NQT Online Test',description:'Verbal + Numerical + Reasoning + Coding (2 questions) + Advanced Coding for Digital/Prime tracks. Higher score = higher package track. Practice free on TCS iON portal.'},{round:'Technical Interview',description:'OOPS, DBMS, OS basics, DSA, projects. Very important — prepare all CS fundamentals.'},{round:'Managerial Interview',description:'Behavioral questions, project discussion in detail.'},{round:'HR Interview',description:'Why TCS, relocation willingness, career goals, salary discussion'}],
    dsaTopics:['Arrays','Strings','Sorting','OOPS','DBMS','SQL','OS Basics','Aptitude'],
    tips:'Largest recruiter in India — high selection chances. Practice free NQT mocks on TCS iON portal. Score well in Advanced Coding to land Digital (₹7 LPA) or Prime (₹9+ LPA) track. Always say yes to relocation.'
  }
];

async function seedCompanies() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
  await Company.deleteMany({});
  console.log('🗑️  Cleared existing companies');
  const inserted = await Company.insertMany(companies);
  console.log(`✅ Inserted ${inserted.length} companies from sheet!`);
  process.exit(0);
}

seedCompanies().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });