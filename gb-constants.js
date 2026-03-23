/* gb-constants.js — Shared constants for TeacherDashboard */

/* ── Student Display Helpers ───────────────────────────────── */
const PRONOUNS_OPTIONS = ['he/him','she/her','they/them','prefer not to say'];

/* ── Courses ────────────────────────────────────────────────── */
const DEFAULT_COURSES = {
  sci8:  { id:'sci8',  name:'Science 8',                      gradingSystem:'proficiency', calcMethod:'mostRecent', decayWeight:0.65, curriculumTags:['SCI8'] },
  ss10:  { id:'ss10',  name:'Social Studies 10',               gradingSystem:'proficiency', calcMethod:'mostRecent', decayWeight:0.65, curriculumTags:['SS10'] },
  phe12: { id:'phe12', name:'Physical & Health Education 12',  gradingSystem:'proficiency', calcMethod:'mostRecent', decayWeight:0.65, curriculumTags:['PHE12'] },
  math9: { id:'math9', name:'Mathematics 9',                   gradingSystem:'proficiency', calcMethod:'mostRecent', decayWeight:0.65, curriculumTags:['MATH9'] }
};

/* ── Learning Map: Sections & Tags ──────────────────────────── */
const LEARNING_MAP = {
  sci8: {
    subjects: [
      { id: 'SCI8', name: 'Science 8', color: '#0891b2' }
    ],
    sections: [
      {
        id: 'SCI8_questioning_and_pred', subject: 'SCI8', name: 'Questioning and Predicting', shortName: 'Questioning', color: '#0891b2',
        tags: [
          { id: 'QAP', label: 'Question and Predict', text: '',
            i_can_statements: ['I can identify a scientific question that genuinely interests me and pursue it with curiosity.','I can make careful observations of the natural world and generate questions based on what I notice.','I can formulate a hypothesis and predict what I think will happen in an investigation.'] }
        ]
      },
      {
        id: 'SCI8_planning_and_conduc', subject: 'SCI8', name: 'Planning and Conducting', shortName: 'Planning', color: '#0891b2',
        tags: [
          { id: 'PI', label: 'Plan Investigations', text: '',
            i_can_statements: ['I can plan a fair test by identifying and controlling variables.','I can choose the right tools and methods to collect accurate and reliable data.','I can use appropriate SI units and convert between units when needed.','I can follow safety and ethical guidelines during investigations.'] }
        ]
      },
      {
        id: 'SCI8_processing_and_anal', subject: 'SCI8', name: 'Processing and Analyzing Data and Information', shortName: 'Processing', color: '#0891b2',
        tags: [
          { id: 'IP', label: 'Identify Patterns', text: '',
            i_can_statements: ['I can organize data into tables and graphs to reveal patterns.','I can analyze my data to identify trends, patterns, and relationships.','I can apply First Peoples knowledge and perspectives as valid sources of scientific understanding.','I can use scientific understanding to draw conclusions supported by evidence.'] }
        ]
      },
      {
        id: 'SCI8_evaluating', subject: 'SCI8', name: 'Evaluating', shortName: 'Evaluating', color: '#0891b2',
        tags: [
          { id: 'EM', label: 'Evaluate Methods', text: '',
            i_can_statements: ['I can identify sources of error in my investigation and suggest specific improvements.','I can evaluate the quality of my data and explain how it could be made more reliable.','I can consider the social, ethical, and environmental implications of a scientific issue.','I can exercise informed skepticism \u2014 questioning claims and demanding evidence.'] }
        ]
      },
      {
        id: 'SCI8_applying_and_innova', subject: 'SCI8', name: 'Applying and Innovating', shortName: 'Applying', color: '#0891b2',
        tags: [
          { id: 'CA', label: 'Community Applications', text: '',
            i_can_statements: ['I can apply what I\'ve learned in science to a new situation or problem.','I can design a project or solution that addresses a real need in my community or the world.','I can generate and refine creative ideas when problem-solving.'] }
        ]
      },
      {
        id: 'SCI8_communicating', subject: 'SCI8', name: 'Communicating', shortName: 'Communicating', color: '#0891b2',
        tags: [
          { id: 'SC', label: 'Scientific Communication', text: '',
            i_can_statements: ['I can communicate my scientific findings clearly using appropriate scientific vocabulary.','I can use digital tools to represent and share scientific information.','I can express how my local environment and First Peoples perspectives relate to the science I\'m learning.'] }
        ]
      }
    ]
  },
  ss10: {
    subjects: [
      { id: 'SS10', name: 'Social Studies 10', color: '#dc2626' }
    ],
    sections: [
      {
        id: 'SS10_use_social_studies', subject: 'SS10', name: 'Use Social Studies Inquiry Processes and Skills', shortName: 'Inquiry', color: '#dc2626',
        tags: [
          { id: 'USS', label: 'Use Social Studies Inquiry', text: '',
            i_can_statements: ['I can develop meaningful research questions about Canadian history and current events.','I can collect and organize information from a variety of credible sources.','I can present my conclusions clearly in writing, discussion, or multimedia.','I can adjust my conclusions when I find new or contradictory evidence.'] }
        ]
      },
      {
        id: 'SS10_significance', subject: 'SS10', name: 'Significance', shortName: 'Significance', color: '#dc2626',
        tags: [
          { id: 'AS', label: 'Assess the Significance', text: '',
            i_can_statements: ['I can explain what makes a person, event, or development historically significant.','I can show how the same event can be seen as more or less significant depending on who you ask.','I can evaluate significance using criteria like duration, breadth of impact, and depth of change.'] }
        ]
      },
      {
        id: 'SS10_evidence', subject: 'SS10', name: 'Evidence', shortName: 'Evidence', color: '#dc2626',
        tags: [
          { id: 'ACA', label: 'Assess Competing Accounts', text: '',
            i_can_statements: ['I can compare two accounts of the same event and evaluate which is better supported.','I can identify bias, perspective, and purpose in a historical or media source.','I can explain what makes some evidence stronger than others.','I can identify gaps or silences in historical accounts.'] }
        ]
      },
      {
        id: 'SS10_continuity_and_chan', subject: 'SS10', name: 'Continuity and Change', shortName: 'Continuity', color: '#dc2626',
        tags: [
          { id: 'CCC', label: 'Compare and Contrast Continuities', text: '',
            i_can_statements: ['I can describe how life changed for Canadians during a specific era.','I can identify what aspects of Canadian society have remained consistent across time.','I can show how the same historical period was experienced differently by different groups (e.g., First Nations vs. settlers, men vs. women).'] }
        ]
      },
      {
        id: 'SS10_cause_and_consequen', subject: 'SS10', name: 'Cause and Consequence', shortName: 'Cause', color: '#dc2626',
        tags: [
          { id: 'AHU', label: 'Assess How Underlying Conditions', text: '',
            i_can_statements: ['I can identify multiple layers of cause for a historical event.','I can evaluate how one person\'s or group\'s actions changed the course of events.','I can trace the short- and long-term consequences of a policy, law, or decision.','I can distinguish between causes that were economic, political, social, or ideological.'] }
        ]
      },
      {
        id: 'SS10_perspective', subject: 'SS10', name: 'Perspective', shortName: 'Perspective', color: '#dc2626',
        tags: [
          { id: 'EID', label: 'Explain and Infer Different', text: '',
            i_can_statements: ['I can explain how a Canadian government policy was seen differently by different communities.','I can take the perspective of a marginalized group and explain how they experienced a historical event.','I can compare how Indigenous and non-Indigenous Canadians might view the same law or event.'] }
        ]
      },
      {
        id: 'SS10_ethical_judgment', subject: 'SS10', name: 'Ethical Judgment', shortName: 'Ethics', color: '#dc2626',
        tags: [
          { id: 'MRE', label: 'Make Reasoned Ethical Judgments', text: '',
            i_can_statements: ['I can make an ethical judgment about a Canadian government policy while considering historical context.','I can discuss what \'reconciliation\' means and what it might require of individuals and the government.','I can evaluate whether apologies and redress are adequate responses to historical injustices.','I can distinguish between acknowledging wrongdoing and assigning collective guilt.'] }
        ]
      }
    ]
  },
  phe12: {
    subjects: [
      { id: 'PHE12', name: 'Physical and Health Education 12', color: '#059669' }
    ],
    sections: [
      {
        id: 'PHE12_physical_literacy', subject: 'PHE12', name: 'Physical Literacy', shortName: 'Physical', color: '#059669',
        tags: [
          { id: 'DER', label: 'Develop Refine', text: '',
            i_can_statements: ['I can apply sophisticated movement skills and strategies across a diverse range of physical activities, including lifetime and recreational activities.','I can analyze and teach movement concepts and tactical strategies to others.','I can design and implement a personal training monitoring system that guides safe and effective fitness development.','I can lead and model excellence in safety, fair play, and sportsmanship as a senior student and community member.','I can articulate a detailed, realistic personal physical activity plan for post-graduation life.'] }
        ]
      },
      {
        id: 'PHE12_healthy_and_active', subject: 'PHE12', name: 'Healthy and Active Living', shortName: 'Healthy Living', color: '#059669',
        tags: [
          { id: 'PAD', label: 'Participate Daily', text: '',
            i_can_statements: ['I can independently sustain a fitness program aligned with evidence-based guidelines for adult health.','I can synthesize knowledge of health determinants into a coherent understanding of how lifestyle, environment, and society shape wellness.','I can develop a comprehensive, realistic nutrition strategy for post-graduation life, accounting for budget, time, and social context.','I can critically deconstruct wellness culture, health trends, and commercial health messaging using research literacy.','I can create and present a comprehensive personal wellness plan for post-graduation life, integrating all dimensions of health.'] }
        ]
      },
      {
        id: 'PHE12_social_and_communi', subject: 'PHE12', name: 'Social and Community Health', shortName: 'Social Health', color: '#059669',
        tags: [
          { id: 'PRS', label: 'Propose Strategies', text: '',
            i_can_statements: ['I can lead others in recognizing and responding to unsafe, coercive, and exploitative situations with confidence and effectiveness.','I can take a leadership role in challenging discrimination, stereotyping, and oppression in my school and community.','I can mentor peers in developing healthy relationship skills and support those experiencing relationship difficulties.','I can design, lead, and evaluate meaningful health promotion initiatives within my school or community.'] }
        ]
      },
      {
        id: 'PHE12_mental_well_being', subject: 'PHE12', name: 'Mental Well-being', shortName: 'Mental Health', color: '#059669',
        tags: [
          { id: 'DEA', label: 'Describe and Assess', text: '',
            i_can_statements: ['I can evaluate and advocate for evidence-based mental well-being strategies at individual, school, and community levels.','I can demonstrate sophisticated mental health literacy \u2014 accurately describing disorders, treatments, and support systems \u2014 and apply it in peer advocacy.','I can design and evaluate a personal mental wellness plan that addresses the unique stressors of post-graduation transition.','I can articulate how my identity, experiences, and values will shape my well-being and relationships in adult life.'] }
        ]
      }
    ]
  },
  math9: {
    subjects: [
      { id: 'MATH9', name: 'Mathematics 9', color: '#7c3aed' }
    ],
    sections: [
      {
        id: 'MATH9_reasoning_and_anal', subject: 'MATH9', name: 'Reasoning and Analyzing', shortName: 'Reasoning', color: '#7c3aed',
        tags: [
          { id: 'RC', label: 'Reading Comprehension', text: '',
            i_can_statements: ['I can use logical reasoning and pattern recognition to solve mathematical problems.','I can estimate reasonably with rational numbers and judge whether my answers make sense.','I can apply mental math strategies flexibly for rational number and algebraic computations.','I can use graphing technology to explore linear relations and test algebraic conjectures.','I can model real-world problems using rational numbers, ratios, and linear relationships.'] }
        ]
      },
      {
        id: 'MATH9_understanding_and', subject: 'MATH9', name: 'Understanding and Solving', shortName: 'Solving', color: '#7c3aed',
        tags: [
          { id: 'PS', label: 'Problem Solving', text: '',
            i_can_statements: ['I can choose and apply multiple strategies to solve algebraic and geometric problems.','I can visualize and sketch diagrams to support understanding of linear relations and similarity.','I can solve problems connected to real-world, cultural, and place-based contexts.'] }
        ]
      },
      {
        id: 'MATH9_communicating_and', subject: 'MATH9', name: 'Communicating and Representing', shortName: 'Communicating', color: '#7c3aed',
        tags: [
          { id: 'CS', label: 'Communication Skills', text: '',
            i_can_statements: ['I can use correct mathematical vocabulary when discussing algebra, data, and geometry.','I can explain and justify my mathematical reasoning using multiple representations.','I can represent relationships using tables, graphs, equations, and diagrams.'] }
        ]
      },
      {
        id: 'MATH9_connecting_and_ref', subject: 'MATH9', name: 'Connecting and Reflecting', shortName: 'Connecting', color: '#7c3aed',
        tags: [
          { id: 'MC', label: 'Make Connections', text: '',
            i_can_statements: ['I can reflect on my problem-solving approaches and identify what strategies were most effective.','I can connect math to science, social studies, and my community.','I can incorporate First Peoples mathematical knowledge and cultural contexts into my mathematical thinking.'] }
        ]
      }
    ]
  }
};

/* ── BC Ministry of Education — Special Education Designations ── */
const BC_DESIGNATIONS = {
  A: { name:'Physically Dependent', desc:'Completely dependent on others for daily living needs (feeding, dressing, toileting, mobility)', level:1, iep:true, modified:true },
  B: { name:'Deafblind', desc:'Combined visual and auditory impairment causing significant communication and education difficulties', level:1, iep:true, modified:true },
  C: { name:'Moderate–Profound Intellectual Disability', desc:'IQ 3+ standard deviations below mean with similar adaptive functioning delays', level:2, iep:true, modified:true },
  D: { name:'Physical Disability / Chronic Health', desc:'Nervous system impairments, musculoskeletal conditions, or chronic health issues significantly impacting education', level:2, iep:true, modified:false },
  E: { name:'Visual Impairment', desc:'Vision insufficient for independent participation in daily activities', level:2, iep:true, modified:false },
  F: { name:'Deaf or Hard of Hearing', desc:'Medically diagnosed hearing loss creating substantial educational difficulty', level:2, iep:true, modified:false },
  G: { name:'Autism Spectrum Disorder', desc:'Neurodevelopmental disability affecting social relationships, communication, interests, and sensory responsiveness', level:2, iep:true, modified:false },
  H: { name:'Intensive Behaviour / Serious Mental Illness', desc:'Severe behavioural or mental health needs requiring intensive intervention', level:3, iep:true, modified:false },
  K: { name:'Mild Intellectual Disability', desc:'IQ 2+ standard deviations below mean (typically 55–69)', level:0, iep:true, modified:true },
  P: { name:'Gifted', desc:'Exceptionally high capability in intellect, creativity, or discipline-specific skills', level:0, iep:true, modified:false },
  Q: { name:'Learning Disability', desc:'Difficulties acquiring, organizing, or using verbal/nonverbal information despite average intellect', level:0, iep:true, modified:false },
  R: { name:'Moderate Behaviour Support / Mental Illness', desc:'Moderate-level behavioural disorders or mental illness affecting school functioning', level:0, iep:true, modified:false },
};

const PROF_LABELS = { 0:'No Evidence', 1:'Emerging', 2:'Developing', 3:'Proficient', 4:'Extending' };
const PROF_COLORS = { 0:'#bbb', 1:'var(--score-1)', 2:'var(--score-2)', 3:'var(--score-3)', 4:'var(--score-4)' };
const PROF_TINT = { 0:'rgba(187,187,187,0.12)', 1:'rgba(211,47,47,0.10)', 2:'rgba(192,122,0,0.10)', 3:'rgba(46,125,50,0.10)', 4:'rgba(21,101,192,0.12)' };
const CORE_COMPETENCIES = [
  { id:'COM', label:'Communicating', group:'Communication', color:'#e67700' },
  { id:'COL', label:'Collaborating', group:'Communication', color:'#e67700' },
  { id:'CT',  label:'Creative Thinking', group:'Thinking', color:'var(--score-4)' },
  { id:'CRT', label:'Critical & Reflective Thinking', group:'Thinking', color:'var(--score-4)' },
  { id:'PPI', label:'Personal & Cultural Identity', group:'Personal & Social', color:'var(--score-3)' },
  { id:'PAR', label:'Personal Awareness & Responsibility', group:'Personal & Social', color:'var(--score-3)' },
  { id:'SAR', label:'Social Awareness & Responsibility', group:'Personal & Social', color:'var(--score-3)' }
];
function getCoreCompetency(id) { return CORE_COMPETENCIES.find(c => c.id === id); }

/* ── Traditional Gradebook — grading scale, points, weights ── */
const DEFAULT_GRADING_SCALE = {
  boundaries: [
    { min: 86, proficiency: 4 },
    { min: 73, proficiency: 3 },
    { min: 50, proficiency: 2 },
    { min: 0,  proficiency: 1 }
  ],
  labels: null
};

const SUBJECT_COLOURS = {
  'Applied Design, Skills and Technologies': '#6366f1',
  'Arts Education': '#db2777',
  'Career Education': '#d97706',
  'English Language Arts': '#2563eb',
  'Mathematics': '#7c3aed',
  'Physical and Health Education': '#059669',
  'Science': '#0891b2',
  'Social Studies': '#dc2626'
};

// Stable avatar colors — hash student ID to a color
const _AVATAR_COLORS = ['#2e7d32','#1565c0','#7b1fa2','#c62828','#e65100','#283593','#00695c','#ad1457','#4e342e','#00838f','#558b2f','#6a1b9a','#bf360c','#1a237e','#004d40'];

const CONFIDENCE_LABELS = { 1:'Beginning', 2:'Growing', 3:'Confident', 4:'Leading' };
const CONFIDENCE_COLORS = { 1:'var(--score-1)', 2:'var(--score-2)', 3:'var(--score-3)', 4:'var(--score-4)' };

/* ── Learner Profile: Observation dimensions & constants ──── */
const OBS_DIMS = ['engagement','collaboration','selfRegulation','resilience','curiosity','respect'];
const OBS_LABELS = {
  engagement:'Engagement', collaboration:'Collaboration', selfRegulation:'Self-Regulation',
  resilience:'Resilience', curiosity:'Curiosity & Risk-Taking', respect:'Respect & Reciprocity'
};
const OBS_SHORT = {
  engagement:'Eng', collaboration:'Collab', selfRegulation:'Self-Reg',
  resilience:'Resil', curiosity:'Curious', respect:'Respect'
};
const OBS_ICONS = {
  engagement:'🎯', collaboration:'🤝', selfRegulation:'🧘', resilience:'💪', curiosity:'🔍', respect:'🙏'
};
const OBS_LEVEL_LABELS = { 0:'Not Assessed', 1:'Needs Support', 2:'Developing', 3:'Growing', 4:'Thriving' };
const OBS_LEVEL_COLORS = { 0:'var(--text-3)', 1:'var(--score-1)', 2:'var(--score-2)', 3:'var(--score-3)', 4:'var(--score-4)' };

const OBS_SENTIMENTS = {
  strength: { icon:'✅', label:'Strength', color:'var(--score-3)', tint:'rgba(46,125,50,0.08)', border:'#2e7d32' },
  growth:   { icon:'🔄', label:'Growth',   color:'var(--active)',  tint:'rgba(0,122,255,0.08)', border:'#007AFF' },
  concern:  { icon:'⚠️', label:'Concern',  color:'var(--score-2)', tint:'rgba(192,122,0,0.08)', border:'#c07a00' }
};

const OBS_CONTEXTS = {
  'whole-class':   { icon:'👥', label:'Whole Class' },
  'small-group':   { icon:'👫', label:'Small Group' },
  'independent':   { icon:'🧑‍💻', label:'Independent' },
  'presentation':  { icon:'🎤', label:'Presentation' },
  'discussion':    { icon:'💬', label:'Discussion' }
};

/* ── Shared HTML: Unified Toolbar ──────────────────────────── */
const TB_SIDEBAR_SVG = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="2.5" width="13" height="11" rx="2"/><line x1="5.5" y1="2.5" x2="5.5" y2="13.5"/></svg>`;
const TB_PAGES = [
  { id:'dashboard', label:'Dashboard', href:'index.html' },
  { id:'assignments', label:'Assignments', href:'settings.html' },
  { id:'observations', label:'Observations', href:'observations.html' },
  { id:'spreadsheet', label:'Gradebook', href:'spreadsheet.html' },
  { id:'reports', label:'Reports', href:'reports.html' }
];
