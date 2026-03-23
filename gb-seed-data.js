/* gb-seed-data.js — Demo seed data for TeacherDashboard (extracted from gb-common.js) */

function seedIfNeeded() {
  /* ────────────────────────────────────────────────────────────
     Shared roster: Science 8 + Math 9 (grade 8/9 combo)
     ──────────────────────────────────────────────────────────── */
  const SHARED_ROSTER = [
    { id:'st1',  firstName:'Cece',    lastName:'Adeyemi',   preferred:'Cece',    pronouns:'she/her',   studentNumber:'STU-201', dateOfBirth:'2012-04-11', email:'', attendance:[], sortName:'Adeyemi Cece',    enrolledDate:'2025-09-02' },
    { id:'st2',  firstName:'Noor',    lastName:'Al-Rashid', preferred:'Noor',    pronouns:'she/her',   studentNumber:'STU-202', dateOfBirth:'2012-08-23', email:'', attendance:[], sortName:'Al-Rashid Noor',  enrolledDate:'2025-09-02' },
    { id:'st3',  firstName:'Sam',     lastName:'Blackwood', preferred:'Sam',     pronouns:'they/them', studentNumber:'STU-203', dateOfBirth:'2012-01-07', email:'', attendance:[], sortName:'Blackwood Sam',   enrolledDate:'2025-09-02' },
    { id:'st4',  firstName:'Liam',    lastName:'Chen',      preferred:'Liam',    pronouns:'he/him',    studentNumber:'STU-204', dateOfBirth:'2012-06-19', email:'', attendance:[], sortName:'Chen Liam',       enrolledDate:'2025-09-02' },
    { id:'st5',  firstName:'Mateo',   lastName:'Cruz',      preferred:'Mateo',   pronouns:'he/him',    studentNumber:'STU-205', dateOfBirth:'2012-11-02', email:'', attendance:[], sortName:'Cruz Mateo',      enrolledDate:'2025-09-02' },
    { id:'st6',  firstName:'Ethan',   lastName:'Dubois',    preferred:'Ethan',   pronouns:'he/him',    studentNumber:'STU-206', dateOfBirth:'2012-03-30', email:'', attendance:[], sortName:'Dubois Ethan',    enrolledDate:'2025-09-02' },
    { id:'st7',  firstName:'Jasper',  lastName:'Gill',      preferred:'Jas',     pronouns:'he/him',    studentNumber:'STU-207', dateOfBirth:'2012-09-14', email:'', attendance:[], sortName:'Gill Jasper',     enrolledDate:'2025-09-02' },
    { id:'st8',  firstName:'Fatima',  lastName:'Hassan',    preferred:'Fatima',  pronouns:'she/her',   studentNumber:'STU-208', dateOfBirth:'2012-12-05', email:'', attendance:[], sortName:'Hassan Fatima',   enrolledDate:'2025-09-02' },
    { id:'st9',  firstName:'Priya',   lastName:'Kaur',      preferred:'Priya',   pronouns:'she/her',   studentNumber:'STU-209', dateOfBirth:'2012-02-17', email:'', attendance:[], sortName:'Kaur Priya',      enrolledDate:'2025-09-02' },
    { id:'st10', firstName:'Jordan',  lastName:'Kim',       preferred:'Jordan',  pronouns:'he/him',    studentNumber:'STU-210', dateOfBirth:'2012-07-08', email:'', attendance:[], sortName:'Kim Jordan',      enrolledDate:'2025-09-02' },
    { id:'st11', firstName:'Ines',    lastName:'Larsen',    preferred:'Ines',    pronouns:'she/her',   studentNumber:'STU-211', dateOfBirth:'2012-05-25', email:'', attendance:[], sortName:'Larsen Ines',     enrolledDate:'2025-09-02' },
    { id:'st12', firstName:'Marcus',  lastName:'Lee',       preferred:'Marcus',  pronouns:'he/him',    studentNumber:'STU-212', dateOfBirth:'2012-10-13', email:'', attendance:[], sortName:'Lee Marcus',      enrolledDate:'2025-09-02' },
    { id:'st13', firstName:'Amara',   lastName:'Osei',      preferred:'Amara',   pronouns:'she/her',   studentNumber:'STU-213', dateOfBirth:'2012-01-29', email:'', attendance:[], sortName:'Osei Amara',      enrolledDate:'2025-09-02' },
    { id:'st14', firstName:'Sofia',   lastName:'Petrov',    preferred:'Sofia',   pronouns:'she/her',   studentNumber:'STU-214', dateOfBirth:'2012-08-04', email:'', attendance:[], sortName:'Petrov Sofia',    enrolledDate:'2025-09-02' },
    { id:'st15', firstName:'Tyler',   lastName:'Rowe',      preferred:'Tyler',   pronouns:'he/him',    studentNumber:'STU-215', dateOfBirth:'2012-04-22', email:'', attendance:[], sortName:'Rowe Tyler',      enrolledDate:'2025-09-02' },
    { id:'st16', firstName:'Aiden',   lastName:'Singh',     preferred:'Aiden',   pronouns:'he/him',    studentNumber:'STU-216', dateOfBirth:'2012-06-30', email:'', attendance:[], sortName:'Singh Aiden',     enrolledDate:'2025-09-02' },
    { id:'st17', firstName:'Olivia',  lastName:'Tam',       preferred:'Olivia',  pronouns:'she/her',   studentNumber:'STU-217', dateOfBirth:'2012-11-18', email:'', attendance:[], sortName:'Tam Olivia',      enrolledDate:'2025-09-02' },
    { id:'st18', firstName:'Raj',     lastName:'Venkatesh', preferred:'Raj',     pronouns:'he/him',    studentNumber:'STU-218', dateOfBirth:'2012-03-09', email:'', attendance:[], sortName:'Venkatesh Raj',   enrolledDate:'2025-09-02' },
    { id:'st19', firstName:'Maya',    lastName:'Wilson',    preferred:'Maya',    pronouns:'she/her',   studentNumber:'STU-219', dateOfBirth:'2012-09-27', email:'', attendance:[], sortName:'Wilson Maya',     enrolledDate:'2025-09-02' },
    { id:'st20', firstName:'Liv',     lastName:'Zhao',      preferred:'Liv',     pronouns:'she/her',   studentNumber:'STU-220', dateOfBirth:'2012-12-16', email:'', attendance:[], sortName:'Zhao Liv',        enrolledDate:'2025-09-02' },
    { id:'st21', firstName:'Hannah',  lastName:'Berg',      preferred:'Hannah',  pronouns:'she/her',   studentNumber:'STU-221', dateOfBirth:'2012-07-14', email:'', attendance:[], sortName:'Berg Hannah',     enrolledDate:'2025-09-02' },
    { id:'st22', firstName:'Darius',  lastName:'Thompson',  preferred:'Darius',  pronouns:'he/him',    studentNumber:'STU-222', dateOfBirth:'2012-02-08', email:'', attendance:[], sortName:'Thompson Darius', enrolledDate:'2025-09-02' },
    { id:'st23', firstName:'Mei',     lastName:'Wong',      preferred:'Mei',     pronouns:'she/her',   studentNumber:'STU-223', dateOfBirth:'2012-11-30', email:'', attendance:[], sortName:'Wong Mei',        enrolledDate:'2025-09-02' },
    { id:'st24', firstName:'Caleb',   lastName:'Firth',     preferred:'Caleb',   pronouns:'he/him',    studentNumber:'STU-224', dateOfBirth:'2012-05-17', email:'', attendance:[], sortName:'Firth Caleb',     enrolledDate:'2025-09-02' },
    { id:'st25', firstName:'Anisa',   lastName:'Jama',      preferred:'Anisa',   pronouns:'she/her',   studentNumber:'STU-225', dateOfBirth:'2012-09-03', email:'', attendance:[], sortName:'Jama Anisa',      enrolledDate:'2025-09-02' },
    { id:'st26', firstName:'Leo',     lastName:'Martineau', preferred:'Leo',     pronouns:'he/him',    studentNumber:'STU-226', dateOfBirth:'2012-01-22', email:'', attendance:[], sortName:'Martineau Leo',   enrolledDate:'2025-09-02' },
    { id:'st27', firstName:'Tessa',   lastName:'Ironside',  preferred:'Tessa',   pronouns:'she/her',   studentNumber:'STU-227', dateOfBirth:'2012-06-09', email:'', attendance:[], sortName:'Ironside Tessa',  enrolledDate:'2025-09-02' }
  ];

  /* ────────────────────────────────────────────────────────────
     Senior roster: SS10 + PHE12 (grade 10/12 students)
     ──────────────────────────────────────────────────────────── */
  const SENIOR_ROSTER = [
    { id:'sr1',  firstName:'Zara',    lastName:'Mitchell',   preferred:'Zara',    pronouns:'she/her',   studentNumber:'STU-301', dateOfBirth:'2009-05-12', email:'', attendance:[], sortName:'Mitchell Zara',    enrolledDate:'2025-09-02' },
    { id:'sr2',  firstName:'Owen',    lastName:'Park',       preferred:'Owen',    pronouns:'he/him',    studentNumber:'STU-302', dateOfBirth:'2009-10-03', email:'', attendance:[], sortName:'Park Owen',        enrolledDate:'2025-09-02' },
    { id:'sr3',  firstName:'Isla',    lastName:'Fernandez',  preferred:'Isla',    pronouns:'she/her',   studentNumber:'STU-303', dateOfBirth:'2009-02-28', email:'', attendance:[], sortName:'Fernandez Isla',   enrolledDate:'2025-09-02' },
    { id:'sr4',  firstName:'Dev',     lastName:'Sharma',     preferred:'Dev',     pronouns:'he/him',    studentNumber:'STU-304', dateOfBirth:'2009-07-15', email:'', attendance:[], sortName:'Sharma Dev',       enrolledDate:'2025-09-02' },
    { id:'sr5',  firstName:'Chloe',   lastName:'Nakamura',   preferred:'Chloe',   pronouns:'she/her',   studentNumber:'STU-305', dateOfBirth:'2009-12-01', email:'', attendance:[], sortName:'Nakamura Chloe',   enrolledDate:'2025-09-02' },
    { id:'sr6',  firstName:'Kai',     lastName:'Johansson',  preferred:'Kai',     pronouns:'they/them', studentNumber:'STU-306', dateOfBirth:'2009-04-19', email:'', attendance:[], sortName:'Johansson Kai',    enrolledDate:'2025-09-02' },
    { id:'sr7',  firstName:'Hana',    lastName:'Okafor',     preferred:'Hana',    pronouns:'she/her',   studentNumber:'STU-307', dateOfBirth:'2009-08-22', email:'', attendance:[], sortName:'Okafor Hana',      enrolledDate:'2025-09-02' },
    { id:'sr8',  firstName:'Luca',    lastName:'Bianchi',    preferred:'Luca',    pronouns:'he/him',    studentNumber:'STU-308', dateOfBirth:'2009-01-11', email:'', attendance:[], sortName:'Bianchi Luca',     enrolledDate:'2025-09-02' },
    { id:'sr9',  firstName:'Ava',     lastName:'Sinclair',   preferred:'Ava',     pronouns:'she/her',   studentNumber:'STU-309', dateOfBirth:'2009-06-05', email:'', attendance:[], sortName:'Sinclair Ava',     enrolledDate:'2025-09-02' },
    { id:'sr10', firstName:'Ravi',    lastName:'Gupta',      preferred:'Ravi',    pronouns:'he/him',    studentNumber:'STU-310', dateOfBirth:'2009-11-20', email:'', attendance:[], sortName:'Gupta Ravi',       enrolledDate:'2025-09-02' },
    { id:'sr11', firstName:'Elena',   lastName:'Volkov',     preferred:'Elena',   pronouns:'she/her',   studentNumber:'STU-311', dateOfBirth:'2009-03-17', email:'', attendance:[], sortName:'Volkov Elena',     enrolledDate:'2025-09-02' },
    { id:'sr12', firstName:'Jamal',   lastName:'Baptiste',   preferred:'Jamal',   pronouns:'he/him',    studentNumber:'STU-312', dateOfBirth:'2009-09-08', email:'', attendance:[], sortName:'Baptiste Jamal',   enrolledDate:'2025-09-02' },
    { id:'sr13', firstName:'Yuki',    lastName:'Tanaka',     preferred:'Yuki',    pronouns:'she/her',   studentNumber:'STU-313', dateOfBirth:'2009-05-30', email:'', attendance:[], sortName:'Tanaka Yuki',      enrolledDate:'2025-09-02' },
    { id:'sr14', firstName:'Marco',   lastName:'Silva',      preferred:'Marco',   pronouns:'he/him',    studentNumber:'STU-314', dateOfBirth:'2009-10-14', email:'', attendance:[], sortName:'Silva Marco',      enrolledDate:'2025-09-02' },
    { id:'sr15', firstName:'Aria',    lastName:'Nordstrom',  preferred:'Aria',    pronouns:'she/her',   studentNumber:'STU-315', dateOfBirth:'2009-02-06', email:'', attendance:[], sortName:'Nordstrom Aria',   enrolledDate:'2025-09-02' },
    { id:'sr16', firstName:'Tariq',   lastName:'Mansour',    preferred:'Tariq',   pronouns:'he/him',    studentNumber:'STU-316', dateOfBirth:'2009-07-23', email:'', attendance:[], sortName:'Mansour Tariq',    enrolledDate:'2025-09-02' },
    { id:'sr17', firstName:'Mila',    lastName:'Kowalski',   preferred:'Mila',    pronouns:'she/her',   studentNumber:'STU-317', dateOfBirth:'2009-12-09', email:'', attendance:[], sortName:'Kowalski Mila',    enrolledDate:'2025-09-02' },
    { id:'sr18', firstName:'Jesse',   lastName:'Whitehorse', preferred:'Jesse',   pronouns:'he/him',    studentNumber:'STU-318', dateOfBirth:'2009-04-02', email:'', attendance:[], sortName:'Whitehorse Jesse', enrolledDate:'2025-09-02' },
    { id:'sr19', firstName:'Suki',    lastName:'Pham',       preferred:'Suki',    pronouns:'she/her',   studentNumber:'STU-319', dateOfBirth:'2009-08-16', email:'', attendance:[], sortName:'Pham Suki',        enrolledDate:'2025-09-02' },
    { id:'sr20', firstName:'Brennan', lastName:'O\'Reilly',  preferred:'Brennan', pronouns:'he/him',    studentNumber:'STU-320', dateOfBirth:'2009-01-28', email:'', attendance:[], sortName:'O\'Reilly Brennan',enrolledDate:'2025-09-02' },
    { id:'sr21', firstName:'Nina',    lastName:'Cheng',      preferred:'Nina',    pronouns:'she/her',   studentNumber:'STU-321', dateOfBirth:'2009-04-25', email:'', attendance:[], sortName:'Cheng Nina',       enrolledDate:'2025-09-02' },
    { id:'sr22', firstName:'Amir',    lastName:'Hassan',     preferred:'Amir',    pronouns:'he/him',    studentNumber:'STU-322', dateOfBirth:'2009-08-11', email:'', attendance:[], sortName:'Hassan Amir',      enrolledDate:'2025-09-02' },
    { id:'sr23', firstName:'Freya',   lastName:'Olsen',      preferred:'Freya',   pronouns:'she/her',   studentNumber:'STU-323', dateOfBirth:'2009-12-19', email:'', attendance:[], sortName:'Olsen Freya',      enrolledDate:'2025-09-02' },
    { id:'sr24', firstName:'Dante',   lastName:'Rivera',     preferred:'Dante',   pronouns:'he/him',    studentNumber:'STU-324', dateOfBirth:'2009-03-07', email:'', attendance:[], sortName:'Rivera Dante',     enrolledDate:'2025-09-02' },
    { id:'sr25', firstName:'Leila',   lastName:'Khoury',     preferred:'Leila',   pronouns:'she/her',   studentNumber:'STU-325', dateOfBirth:'2009-07-30', email:'', attendance:[], sortName:'Khoury Leila',     enrolledDate:'2025-09-02' },
    { id:'sr26', firstName:'Finn',    lastName:'MacLeod',    preferred:'Finn',    pronouns:'he/him',    studentNumber:'STU-326', dateOfBirth:'2009-11-14', email:'', attendance:[], sortName:'MacLeod Finn',     enrolledDate:'2025-09-02' },
    { id:'sr27', firstName:'Preet',   lastName:'Dhaliwal',   preferred:'Preet',   pronouns:'she/her',   studentNumber:'STU-327', dateOfBirth:'2009-02-22', email:'', attendance:[], sortName:'Dhaliwal Preet',   enrolledDate:'2025-09-02' }
  ];

  const STIDS  = SHARED_ROSTER.map(s => s.id);
  const SRIDS  = SENIOR_ROSTER.map(s => s.id);

  /* helper: build score entries from a compact map */
  function buildScores(studentIds, assessments, scoreMap) {
    const sc = {};
    studentIds.forEach((sid, idx) => {
      sc[sid] = [];
      assessments.forEach(a => {
        const baseScore = scoreMap[a.id] ? scoreMap[a.id][idx] : 0;
        if (baseScore === 0) return; // blank — not yet assessed
        (a.tagIds||[]).forEach(tagId => {
          sc[sid].push({
            id: uid(), assessmentId: a.id, tagId, score: baseScore,
            date: a.date, type: a.type, note: '', created: a.created
          });
        });
      });
    });
    return sc;
  }

  /* helper: build quick obs from compact list */
  function buildObs(entries) {
    const obs = {};
    entries.forEach(s => {
      if (!obs[s.sid]) obs[s.sid] = [];
      const ts = new Date(s.date + 'T12:00:00');
      obs[s.sid].push({
        id: 'qo_seed_' + s.sid + '_' + obs[s.sid].length,
        text: s.text, dims: s.dims || [],
        sentiment: s.sentiment || null,
        context: s.context || null,
        created: ts.toISOString(), date: s.date
      });
    });
    return obs;
  }

  /* ════════════════════════════════════════════════════════════
     SCIENCE 8 — SCI8
     ════════════════════════════════════════════════════════════ */
  if (COURSES.sci8 && getStudents('sci8').length === 0) {
    saveStudents('sci8', JSON.parse(JSON.stringify(SHARED_ROSTER)));

    const sci8Assessments = [
      { id:'sci8a1',  title:'Cell Microscope Lab',              date:'2025-10-03', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'],      evidenceType:'lab',         notes:'Prepared and examined onion and cheek cells under 400x magnification.', coreCompetencyIds:['CRT','COM'],     rubricId:'rub_sci8_lab', created: new Date('2025-10-03').toISOString() },
      { id:'sci8a2',  title:'Immune System Quick Check',        date:'2025-10-17', type:'formative',  tagIds:['IP','SC'],            evidenceType:'quiz',        notes:'',                                                                      coreCompetencyIds:['CRT'],           created: new Date('2025-10-17').toISOString() },
      { id:'sci8a3',  title:'Disease Research Poster',          date:'2025-10-31', type:'summative',  tagIds:['QAP','IP','CA','SC','EM'], evidenceType:'project',     notes:'Research poster on a communicable disease — cause, transmission, immune response, prevention.', coreCompetencyIds:['COM','CRT','PAR'], rubricId:'rub_sci8_research', created: new Date('2025-10-31').toISOString() },
      { id:'sci8a4',  title:'KMT & States of Matter Lab',       date:'2025-11-14', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'],       evidenceType:'lab',         notes:'Heating/cooling curves and particle diagrams.',                         coreCompetencyIds:['CRT','COM'],     rubricId:'rub_sci8_lab', created: new Date('2025-11-14').toISOString() },
      { id:'sci8a5',  title:'Plate Tectonics Presentation',     date:'2025-12-05', type:'summative',  tagIds:['QAP','IP','EM','CA','SC'],      evidenceType:'observation', notes:'Group presentations on tectonic features.',                             coreCompetencyIds:['COM','COL','CRT'],rubricId:'rub_sci8_research', created: new Date('2025-12-05').toISOString() },
      { id:'sci8a6',  title:'Data Analysis Project',            date:'2025-12-19', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'],  evidenceType:'project',     notes:'Students collected real data, created graphs, calculated central tendency, and drew conclusions.', coreCompetencyIds:['CT','CRT','COM'], rubricId:'rub_sci8_lab', created: new Date('2025-12-19').toISOString() },
      { id:'sci8a7',  title:'Atomic Theory & Elements Quiz',    date:'2026-01-16', type:'formative',  tagIds:['IP','EM'],            evidenceType:'quiz',        notes:'Quick check on periodic table reading and element vs compound identification.',                  coreCompetencyIds:['CRT'],           created: new Date('2026-01-16').toISOString() },
      { id:'sci8a8',  title:'Energy Transfer Investigation',    date:'2026-02-06', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'], evidenceType:'lab',         notes:'Thermal energy transfer experiment using calorimetry.',                  coreCompetencyIds:['CRT','CT'],      rubricId:'rub_sci8_lab', created: new Date('2026-02-06').toISOString() },
      { id:'sci8a9',  title:'Ecosystem Connections Essay',      date:'2026-02-27', type:'summative',  tagIds:['QAP','IP','EM','CA','SC'],       evidenceType:'written',     notes:'Connecting cellular processes to ecosystem interactions.',               coreCompetencyIds:['COM','CRT'],     rubricId:'rub_sci8_research', created: new Date('2026-02-27').toISOString() },
      { id:'sci8a10', title:'Mid-Year Lab Skills Check',        date:'2026-03-14', type:'formative',  tagIds:['PI','EM'],            evidenceType:'observation', notes:'Observed lab technique during independent investigation.',              coreCompetencyIds:['PAR'],           created: new Date('2026-03-14').toISOString() },
      { id:'sci8a11', title:'Photosynthesis vs Respiration Comparison', date:'2025-09-19', type:'summative', tagIds:['QAP','IP','EM','CA','SC'],     evidenceType:'project',     notes:'Compare and contrast photosynthesis and cellular respiration using diagrams and written explanation.', coreCompetencyIds:['CRT','COM'], rubricId:'rub_sci8_research', created: new Date('2025-09-19').toISOString() },
      { id:'sci8a12', title:'Water Quality Field Study',       date:'2025-10-10', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'], evidenceType:'lab',         notes:'Field sampling at Burnaby Lake — tested pH, turbidity, dissolved oxygen.', coreCompetencyIds:['CRT','CT','COM'], rubricId:'rub_sci8_lab', created: new Date('2025-10-10').toISOString() },
      { id:'sci8a13', title:'Periodic Table Scavenger Hunt',   date:'2025-11-07', type:'formative',  tagIds:['IP','EM'],            evidenceType:'quiz',        notes:'Interactive activity matching elements to everyday uses.',                  coreCompetencyIds:['CRT'],           created: new Date('2025-11-07').toISOString() },
      { id:'sci8a14', title:'Circuit Design Challenge',        date:'2025-11-28', type:'summative',  tagIds:['QAP','PI','EM','CA'],      evidenceType:'project',     notes:'Design and build a working circuit with switch, resistor, and LED.',        coreCompetencyIds:['CRT','CT'],      rubricId:'rub_sci8_expdesign', created: new Date('2025-11-28').toISOString() },
      { id:'sci8a15', title:'Mineral Identification Lab',      date:'2025-12-12', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'],       evidenceType:'lab',         notes:'Used hardness, lustre, streak, and cleavage tests to identify 12 mineral samples.', coreCompetencyIds:['CRT','COM'], rubricId:'rub_sci8_lab', created: new Date('2025-12-12').toISOString() },
      { id:'sci8a16', title:'Climate Change Infographic',      date:'2026-01-10', type:'summative',  tagIds:['QAP','IP','EM','CA','SC'],      evidenceType:'project',     notes:'Research-based infographic on causes, effects, and mitigation of climate change.', coreCompetencyIds:['COM','CRT','PAR'], rubricId:'rub_sci8_research', created: new Date('2026-01-10').toISOString() },
      { id:'sci8a17', title:'Forces & Motion Quick Check',     date:'2026-01-31', type:'formative',  tagIds:['PI','EM'],            evidenceType:'quiz',        notes:'Short quiz on Newton\'s laws and force diagrams.',                          coreCompetencyIds:['CRT'],           created: new Date('2026-01-31').toISOString() },
      { id:'sci8a18', title:'Biodiversity Field Journal',      date:'2026-02-14', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'], evidenceType:'written',     notes:'Week-long field journal documenting species observations in school grounds.', coreCompetencyIds:['COM','CRT'],    rubricId:'rub_sci8_report', created: new Date('2026-02-14').toISOString() },
      { id:'sci8a19', title:'Chemical Reactions Lab',          date:'2026-03-07', type:'summative',  tagIds:['QAP','PI','IP','EM','CA','SC'], evidenceType:'lab',         notes:'Conducted five reaction types and classified products using observation and chemical equations.', coreCompetencyIds:['CRT','CT'], rubricId:'rub_sci8_lab', created: new Date('2026-03-07').toISOString() },
      { id:'sci8a20', title:'Science Fair Proposal',           date:'2026-03-21', type:'summative',  tagIds:['QAP','PI','EM','CA'],      evidenceType:'written',     notes:'Written proposal for science fair including question, hypothesis, procedure, and materials list.', coreCompetencyIds:['CRT','COM'], rubricId:'rub_sci8_expdesign', created: new Date('2026-03-21').toISOString() }
    ];
    // ── Science 8 Points-Based Quizzes (12) ──
    sci8Assessments.push(
      { id:'sci8q1',  title:'Cell Structure Quiz',        date:'2025-09-26', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-09-26').toISOString() },
      { id:'sci8q2',  title:'Periodic Table Quiz',        date:'2025-10-08', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:15, created: new Date('2025-10-08').toISOString() },
      { id:'sci8q3',  title:'KMT Vocabulary Check',       date:'2025-10-22', type:'formative',  tagIds:['SC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['COM'], scoreMode:'points', maxPoints:10, created: new Date('2025-10-22').toISOString() },
      { id:'sci8q4',  title:'Lab Safety Quiz',             date:'2025-11-05', type:'formative',  tagIds:['PI'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2025-11-05').toISOString() },
      { id:'sci8q5',  title:'Ecology Matching Quiz',       date:'2025-11-19', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-11-19').toISOString() },
      { id:'sci8q6',  title:'Chemical Formulas Quiz',      date:'2025-12-03', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:15, created: new Date('2025-12-03').toISOString() },
      { id:'sci8q7',  title:'Plate Tectonics Quiz',        date:'2025-12-17', type:'formative',  tagIds:['QAP'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-12-17').toISOString() },
      { id:'sci8q8',  title:'Energy Forms Quiz',           date:'2026-01-14', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-01-14').toISOString() },
      { id:'sci8q9',  title:'Microscope Skills Check',     date:'2026-01-28', type:'formative',  tagIds:['PI'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2026-01-28').toISOString() },
      { id:'sci8q10', title:'Scientific Method Quiz',      date:'2026-02-11', type:'formative',  tagIds:['QAP'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:15, created: new Date('2026-02-11').toISOString() },
      { id:'sci8q11', title:'Body Systems Quiz',           date:'2026-02-25', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-02-25').toISOString() },
      { id:'sci8q12', title:'Data Reading Quiz',           date:'2026-03-11', type:'formative',  tagIds:['IP'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-03-11').toISOString() }
    );
    // ── Science 8 Points-Based Unit Tests (5) ──
    sci8Assessments.push(
      { id:'sci8t1', title:'Cells & Body Systems Unit Test',  date:'2025-10-15', type:'summative', tagIds:['IP','SC'],      evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:60, created: new Date('2025-10-15').toISOString() },
      { id:'sci8t2', title:'Chemistry & Matter Unit Test',    date:'2025-11-26', type:'summative', tagIds:['IP','EM'],      evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2025-11-26').toISOString() },
      { id:'sci8t3', title:'Earth Science Unit Test',         date:'2025-12-10', type:'summative', tagIds:['QAP','IP'],     evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2025-12-10').toISOString() },
      { id:'sci8t4', title:'Ecology & Environment Unit Test', date:'2026-02-04', type:'summative', tagIds:['IP','CA'],      evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:60, created: new Date('2026-02-04').toISOString() },
      { id:'sci8t5', title:'Mid-Year Comprehensive Exam',     date:'2026-03-04', type:'summative', tagIds:['QAP','IP','EM'],evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:80, created: new Date('2026-03-04').toISOString() }
    );
    saveAssessments('sci8', sci8Assessments);

    /* ── Science 8 Rubrics ── */
    const sci8Rubrics = [
      {
        id: 'rub_sci8_lab',
        name: 'Lab Investigation Rubric',
        criteria: [
          {
            id: 'crit_sci8_lab_inquiry',
            name: 'Scientific Inquiry',
            tagIds: ['QAP', 'PI'],
            levels: {
              4: 'Independently designs controlled experiments with multiple variables, demonstrating sophisticated understanding of scientific method.',
              3: 'Plans and conducts fair tests with identified variables and appropriate safety procedures.',
              2: 'Follows a provided experimental procedure with some support in identifying variables.',
              1: 'Participates in experiments with significant teacher guidance; struggles to identify variables independently.'
            }
          },
          {
            id: 'crit_sci8_lab_data',
            name: 'Data & Analysis',
            tagIds: ['IP', 'EM'],
            levels: {
              4: 'Collects precise data, identifies subtle patterns, and provides insightful error analysis that extends beyond expected conclusions.',
              3: 'Collects accurate data, identifies major patterns, and provides reasonable error analysis.',
              2: 'Collects data with some inaccuracies; identifies obvious patterns but error analysis is incomplete.',
              1: 'Data collection is unreliable; struggles to identify patterns or sources of error without direct support.'
            }
          },
          {
            id: 'crit_sci8_lab_comm',
            name: 'Communication',
            tagIds: ['CA', 'SC'],
            levels: {
              4: 'Presents findings with clarity and precision, using sophisticated scientific vocabulary and making meaningful real-world connections.',
              3: 'Presents findings clearly using appropriate scientific vocabulary and connects results to relevant contexts.',
              2: 'Presents basic findings with limited scientific vocabulary; connections to real-world applications are surface-level.',
              1: 'Struggles to present findings coherently; scientific vocabulary is absent or misused.'
            }
          }
        ]
      },
      {
        id: 'rub_sci8_research',
        name: 'Research Project Rubric',
        criteria: [
          {
            id: 'crit_sci8_res_quality',
            name: 'Research Quality',
            tagIds: ['QAP', 'IP'],
            levels: {
              4: 'Evaluates multiple credible sources critically, synthesizing information to build a nuanced understanding of the topic.',
              3: 'Uses several credible sources and demonstrates solid understanding of the research topic.',
              2: 'Uses a limited number of sources with minimal evaluation of credibility; understanding remains surface-level.',
              1: 'Relies on a single source or unreliable sources; research lacks depth and accuracy.'
            }
          },
          {
            id: 'crit_sci8_res_analysis',
            name: 'Critical Analysis',
            tagIds: ['EM', 'CA'],
            levels: {
              4: 'Draws insightful connections between evidence and broader implications, evaluating significance with originality.',
              3: 'Connects evidence to key implications and evaluates the significance of findings appropriately.',
              2: 'Makes basic connections between evidence and conclusions but does not explore broader implications.',
              1: 'Restates information without analysis; does not connect evidence to conclusions.'
            }
          },
          {
            id: 'crit_sci8_res_present',
            name: 'Presentation',
            tagIds: ['SC'],
            levels: {
              4: 'Communicates with exceptional clarity, precise scientific vocabulary, and compelling visual design that enhances understanding.',
              3: 'Communicates clearly with appropriate scientific vocabulary and effective visual elements.',
              2: 'Communication is understandable but lacks scientific vocabulary; visual design is basic or unclear.',
              1: 'Presentation is disorganized and difficult to follow; scientific vocabulary and visuals are largely absent.'
            }
          }
        ]
      },
      {
        id: 'rub_sci8_report',
        name: 'Scientific Report Rubric',
        criteria: [
          {
            id: 'crit_sci8_report_hyp',
            name: 'Hypothesis & Method',
            tagIds: ['QAP', 'PI'],
            levels: {
              4: 'Crafts a precise, testable hypothesis and designs a method that anticipates confounding variables with clear scientific reasoning.',
              3: 'States a testable hypothesis and outlines a logical method with appropriate controls.',
              2: 'Hypothesis is present but vague; method is partially developed and missing key controls.',
              1: 'Hypothesis is untestable or absent; method lacks logical structure and needs significant teacher support.'
            }
          },
          {
            id: 'crit_sci8_report_results',
            name: 'Results & Discussion',
            tagIds: ['IP', 'EM'],
            levels: {
              4: 'Results are organized with precision and the discussion draws insightful connections to theory, acknowledging limitations thoughtfully.',
              3: 'Results are clearly presented and the discussion connects findings to the hypothesis with reasonable interpretation.',
              2: 'Results are present but disorganized; discussion restates findings without meaningful interpretation.',
              1: 'Results are incomplete or inaccurate; discussion is absent or does not relate to the original hypothesis.'
            }
          },
          {
            id: 'crit_sci8_report_writing',
            name: 'Scientific Writing',
            tagIds: ['SC'],
            levels: {
              4: 'Writing is polished and precise, using discipline-specific terminology naturally and maintaining a formal scientific tone throughout.',
              3: 'Writing is clear and organized with appropriate scientific vocabulary and a consistent formal tone.',
              2: 'Writing is understandable but informal in places; scientific vocabulary is used inconsistently.',
              1: 'Writing is disorganized and lacks scientific vocabulary; tone is conversational rather than formal.'
            }
          }
        ]
      },
      {
        id: 'rub_sci8_grouppres',
        name: 'Group Presentation Rubric',
        criteria: [
          {
            id: 'crit_sci8_grouppres_content',
            name: 'Content Knowledge',
            tagIds: ['IP', 'CA'],
            levels: {
              4: 'Demonstrates thorough, accurate content knowledge and extends ideas beyond the curriculum with creative real-world connections.',
              3: 'Demonstrates solid content knowledge and makes relevant connections to real-world contexts.',
              2: 'Content is mostly accurate but shallow; connections to broader contexts are limited or forced.',
              1: 'Content contains significant inaccuracies; understanding of key concepts is not evident.'
            }
          },
          {
            id: 'crit_sci8_grouppres_delivery',
            name: 'Delivery & Engagement',
            tagIds: ['SC'],
            levels: {
              4: 'Speaks with confidence and engages the audience through compelling visuals, pacing, and interaction that enhances understanding.',
              3: 'Speaks clearly, maintains audience attention, and uses visuals effectively to support key points.',
              2: 'Delivery is understandable but relies heavily on reading notes; visuals are present but do not enhance the message.',
              1: 'Delivery is difficult to follow; lacks eye contact and visuals are missing or distracting.'
            }
          },
          {
            id: 'crit_sci8_grouppres_collab',
            name: 'Collaboration',
            tagIds: ['QAP'],
            levels: {
              4: 'All group members contribute meaningfully, building on each other\'s ideas and demonstrating a seamless, well-rehearsed presentation.',
              3: 'Group members share responsibilities fairly and support one another during the presentation.',
              2: 'Contributions are uneven across the group; some members dominate while others are passive.',
              1: 'Little evidence of group collaboration; presentation feels like disconnected individual parts.'
            }
          }
        ]
      },
      {
        id: 'rub_sci8_datagraph',
        name: 'Data Collection & Graphing Rubric',
        criteria: [
          {
            id: 'crit_sci8_datagraph_accuracy',
            name: 'Data Accuracy',
            tagIds: ['PI', 'IP'],
            levels: {
              4: 'Collects data with meticulous precision, records appropriate units and significant figures, and identifies anomalies independently.',
              3: 'Collects accurate data with correct units and reasonable precision; notes obvious anomalies.',
              2: 'Data is mostly complete but contains errors in recording or units; anomalies go unnoticed.',
              1: 'Data is incomplete or unreliable; units are missing and precision is not considered.'
            }
          },
          {
            id: 'crit_sci8_datagraph_graph',
            name: 'Graph Construction & Interpretation',
            tagIds: ['IP', 'SC'],
            levels: {
              4: 'Constructs publication-quality graphs with appropriate scales, labels, and trend lines, and interprets patterns with sophisticated reasoning.',
              3: 'Constructs clear, correctly labelled graphs with appropriate scales and interprets major trends accurately.',
              2: 'Graphs are present but have errors in scale, labelling, or type; interpretation of trends is superficial.',
              1: 'Graphs are missing key elements or are inappropriate for the data; unable to interpret trends without support.'
            }
          }
        ]
      },
      {
        id: 'rub_sci8_expdesign',
        name: 'Experimental Design Rubric',
        criteria: [
          {
            id: 'crit_sci8_expdesign_vars',
            name: 'Variable Identification',
            tagIds: ['QAP', 'PI'],
            levels: {
              4: 'Identifies all variables with precision, explains the rationale for controls, and anticipates potential confounds in the design.',
              3: 'Correctly identifies independent, dependent, and controlled variables with clear explanations.',
              2: 'Identifies some variables but confuses their roles or overlooks important controlled variables.',
              1: 'Cannot distinguish between variable types without direct teacher guidance.'
            }
          },
          {
            id: 'crit_sci8_expdesign_procedure',
            name: 'Procedure & Safety',
            tagIds: ['PI', 'EM'],
            levels: {
              4: 'Writes a detailed, replicable procedure that proactively addresses safety risks and includes thoughtful contingency steps.',
              3: 'Writes a clear, step-by-step procedure with appropriate safety precautions identified.',
              2: 'Procedure is present but lacks detail for replication; safety precautions are mentioned but incomplete.',
              1: 'Procedure is vague or missing steps; safety considerations are absent.'
            }
          },
          {
            id: 'crit_sci8_expdesign_predict',
            name: 'Prediction & Reasoning',
            tagIds: ['QAP', 'CA'],
            levels: {
              4: 'Makes well-reasoned predictions grounded in scientific theory and explains the reasoning with depth and originality.',
              3: 'Makes logical predictions supported by prior knowledge and provides clear scientific reasoning.',
              2: 'Makes a prediction but the reasoning behind it is weak or not clearly connected to science concepts.',
              1: 'Prediction is a guess without scientific reasoning; cannot explain why the outcome is expected.'
            }
          }
        ]
      },
      {
        id: 'rub_sci8_reflect',
        name: 'Science Reflection Rubric',
        criteria: [
          {
            id: 'crit_sci8_reflect_self',
            name: 'Self-Assessment',
            tagIds: ['EM', 'CA'],
            levels: {
              4: 'Provides honest, detailed self-assessment with specific evidence, demonstrating strong metacognitive awareness of personal learning.',
              3: 'Accurately self-assesses strengths and areas for growth with supporting examples from their work.',
              2: 'Self-assessment is present but generic; lacks specific evidence or meaningful insight into learning.',
              1: 'Self-assessment is superficial or inaccurate; does not identify meaningful strengths or areas for growth.'
            }
          },
          {
            id: 'crit_sci8_reflect_growth',
            name: 'Growth Identification',
            tagIds: ['SC'],
            levels: {
              4: 'Articulates a clear growth trajectory with specific goals and strategies, connecting learning to future scientific pursuits.',
              3: 'Identifies areas of growth and sets reasonable goals for continued improvement in science.',
              2: 'Mentions growth in general terms but goals are vague and lack actionable strategies.',
              1: 'Does not identify growth or set goals; reflection is a summary rather than a forward-looking analysis.'
            }
          }
        ]
      }
    ];
    saveRubrics('sci8', sci8Rubrics);

    //  Distribution: Extending(st2,st9,st13), Proficient(st1,st3,st4,st5,st7,st8,st10,st11,st14,st17,st19,st20), Developing(st6,st12,st15,st16,st18), Emerging(st3 early only — shows growth)
    //  0 = not yet assessed (blank)
    const sci8ScoreMap = {
      sci8a1:  [3,4,2,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,2,4,3,3,2,3],
      sci8a2:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,3,4,2,3,2,3],
      sci8a3:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,2,3,3,4,3,3],
      sci8a4:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 2,3,4,3,3,2,3],
      sci8a5:  [3,4,3,4,3,2,3,3,4,3,3,2,4,3,2,3,3,2,3,3, 3,2,3,3,3,3,4],
      sci8a6:  [3,4,3,3,3,2,4,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,3,4,2,3,2,3],
      sci8a7:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,3,2,3,2,4,3, 3,2,3,3,4,3,3],
      sci8a8:  [4,4,3,3,3,2,3,4,4,3,3,2,4,3,2,3,3,2,3,3, 4,3,3,3,3,2,3],
      sci8a9:  [3,4,3,3,4,2,3,3,4,3,3,3,4,3,2,2,4,2,3,4, 3,2,4,3,3,3,3],
      sci8a10: [3,4,3,3,3,0,3,3,4,3,3,0,4,3,2,2,3,0,3,3, 3,3,3,2,3,0,3],
      sci8a11: [3,4,2,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,2,4,3,3,2,3],
      sci8a12: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,3,4,2,3,2,3],
      sci8a13: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,2,3,3,4,3,3],
      sci8a14: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 2,3,4,3,3,2,3],
      sci8a15: [3,4,3,3,3,2,4,3,4,3,3,2,4,3,2,3,3,2,3,3, 3,2,3,3,3,3,4],
      sci8a16: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,3, 3,3,4,2,3,2,3],
      sci8a17: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,3,2,3,2,4,3, 3,2,3,3,4,3,3],
      sci8a18: [4,4,3,3,3,2,3,4,4,3,3,2,4,3,2,3,3,2,3,3, 4,3,3,3,3,2,3],
      sci8a19: [3,4,3,3,4,2,3,3,4,3,3,3,4,3,2,2,4,2,3,4, 3,2,4,3,3,3,3],
      sci8a20: [3,4,3,3,3,0,3,3,4,3,3,0,4,3,2,2,3,0,3,3, 3,3,3,0,3,0,3],
      // ── Science 8 Quiz Scores (points-based) ──
      sci8q1:  [8,10,6,8,9,5,7,9,10,8,7,5,10,8,6,5,7,4,8,7, 8,6,10,7,9,5,8],
      sci8q2:  [12,15,10,13,12,7,11,13,15,12,11,8,14,12,9,8,11,6,12,11, 13,9,14,10,13,8,12],
      sci8q3:  [7,10,6,8,8,5,7,8,10,7,7,5,9,7,6,5,8,4,7,7, 8,6,9,7,8,5,7],
      sci8q4:  [9,10,7,9,8,6,8,9,10,8,8,6,10,8,7,6,8,5,8,8, 9,7,10,8,9,6,8],
      sci8q5:  [8,10,7,8,8,5,7,8,10,8,7,5,10,7,6,5,7,4,8,8, 7,6,10,7,8,5,8],
      sci8q6:  [12,15,9,12,12,7,11,12,15,11,10,7,14,11,8,7,12,6,11,12, 12,9,14,10,12,7,11],
      sci8q7:  [7,10,6,8,7,4,7,8,10,8,7,5,9,7,5,5,7,4,7,7, 8,6,9,6,8,5,7],
      sci8q8:  [8,10,7,8,8,5,8,9,10,8,7,5,10,8,6,5,8,4,8,8, 8,7,10,7,8,5,8],
      sci8q9:  [8,10,7,9,8,5,8,9,10,8,8,6,10,8,6,5,7,4,8,8, 9,7,10,7,8,6,8],
      sci8q10: [12,15,10,12,13,7,11,12,15,12,11,8,14,12,9,7,12,6,13,12, 12,9,14,10,13,8,12],
      sci8q11: [8,10,7,8,8,5,7,8,10,8,7,0,10,8,6,5,7,0,8,8, 8,6,10,7,8,0,8],
      sci8q12: [8,10,7,8,8,0,7,8,10,8,7,0,10,8,6,5,7,0,8,8, 8,0,10,7,8,0,8],
      // ── Science 8 Unit Test Scores (points-based) ──
      sci8t1:  [48,57,36,50,49,31,42,50,58,48,44,30,56,47,33,30,44,28,48,46, 50,36,56,42,50,32,46],
      sci8t2:  [40,48,32,42,41,26,36,42,49,40,38,26,47,40,28,26,37,24,40,39, 42,32,47,35,42,27,39],
      sci8t3:  [41,48,33,43,41,27,37,43,49,41,38,26,47,40,28,25,38,24,41,40, 43,33,47,36,42,27,40],
      sci8t4:  [49,57,37,50,50,31,43,51,58,49,44,30,56,48,33,31,44,28,49,47, 50,0,56,43,50,0,47],
      sci8t5:  [65,76,53,67,67,42,57,68,77,65,59,0,75,64,44,42,58,0,65,62, 66,53,75,56,67,0,62]
    };
    saveScores('sci8', buildScores(STIDS, sci8Assessments, sci8ScoreMap));

    // Score-level notes (assignment-level comments)
    const sci8ScoreNotes = getScores('sci8');
    // Cece (st1) on Disease Research Poster
    (sci8ScoreNotes['st1']||[]).filter(e => e.assessmentId==='sci8a3').forEach(e => { e.note = 'Used three independent sources without prompting. Conclusion was thorough.'; });
    // Noor (st2) on Energy Transfer Investigation
    (sci8ScoreNotes['st2']||[]).filter(e => e.assessmentId==='sci8a8').forEach(e => { e.note = 'Extended the investigation by proposing a non-linear comparison. Exceptional experimental design.'; });
    // Sam (st3) on Cell Microscope Lab — early struggle
    (sci8ScoreNotes['st3']||[]).filter(e => e.assessmentId==='sci8a1').forEach(e => { e.note = 'Struggled with focusing the microscope initially but persisted and got clear images by end of class.'; });
    // Ethan (st6) on KMT Lab
    (sci8ScoreNotes['st6']||[]).filter(e => e.assessmentId==='sci8a4').forEach(e => { e.note = 'Worked hard on this but the conclusion doesn\'t connect back to the hypothesis.'; });
    // Priya (st9) on Plate Tectonics
    (sci8ScoreNotes['st9']||[]).filter(e => e.assessmentId==='sci8a5').forEach(e => { e.note = 'Exceptional group dynamics — facilitated discussion so everyone contributed equally.'; });
    // Amara (st13) on Ecosystem Essay
    (sci8ScoreNotes['st13']||[]).filter(e => e.assessmentId==='sci8a9').forEach(e => { e.note = 'Made a sophisticated connection between cellular respiration and carbon cycling in ecosystems.'; });
    // Tyler (st15) on Data Analysis
    (sci8ScoreNotes['st15']||[]).filter(e => e.assessmentId==='sci8a6').forEach(e => { e.note = 'Graph was accurate but analysis stayed surface-level. Needs to push into explaining WHY patterns exist.'; });
    // Fatima (st8) on Biodiversity Field Journal
    (sci8ScoreNotes['st8']||[]).filter(e => e.assessmentId==='sci8a18').forEach(e => { e.note = 'Identified 14 species with detailed sketches and habitat notes. Went well beyond expectations.'; });
    // Jas (st7) on Circuit Design Challenge
    (sci8ScoreNotes['st7']||[]).filter(e => e.assessmentId==='sci8a14').forEach(e => { e.note = 'Built a parallel circuit with dimmer switch — creative extension beyond the assignment requirements.'; });
    // Marcus (st12) on Chemical Reactions Lab
    (sci8ScoreNotes['st12']||[]).filter(e => e.assessmentId==='sci8a19').forEach(e => { e.note = 'Identified reaction types correctly but struggled writing balanced equations. Improving with practice.'; });
    saveScores('sci8', sci8ScoreNotes);

    // Quick observations
    saveQuickObs('sci8', buildObs([
      { sid:'st1',  date:'2025-10-15', text:'Cece asked clarifying questions during the lab demo that showed she was thinking ahead about data collection.',                                 dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st1',  date:'2025-11-22', text:'Took initiative organizing her group\'s materials for the KMT lab without being asked.',                                                       dims:['selfRegulation','collaboration'], sentiment:'strength', context:'small-group' },
      { sid:'st1',  date:'2026-01-14', text:'Cece\'s quiz corrections showed she genuinely understood where she went wrong \u2014 not just fixing answers.',                                 dims:['resilience','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'st1',  date:'2026-02-20', text:'Volunteered to share her energy transfer results with the class. Explained her reasoning clearly and fielded questions well.',                   dims:['engagement'],                 sentiment:'strength', context:'presentation' },
      { sid:'st2',  date:'2025-10-08', text:'Showed excellent leadership during the group lab \u2014 delegated tasks effectively and kept the team on track.',                               dims:['engagement','collaboration'], sentiment:'strength', context:'small-group' },
      { sid:'st2',  date:'2025-11-20', text:'Asked a thoughtful question about why cells need energy that led to a great class discussion.',                                                 dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'st2',  date:'2026-02-12', text:'Independently designed an alternative experimental setup when the first one failed. Impressive problem-solving.',                                dims:['resilience','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'st2',  date:'2026-03-10', text:'Noor mentored two classmates through the lab skills check. Her explanations are patient and technically precise.',                               dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st3',  date:'2025-10-10', text:'Struggled with the microscope technique but persisted through three attempts before asking for help. Growth mindset in action.',                 dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'st3',  date:'2026-01-22', text:'Sam is starting to participate more in group discussions \u2014 offered two ideas during the brainstorm today.',                                 dims:['engagement','collaboration'], sentiment:'growth',   context:'small-group' },
      { sid:'st3',  date:'2025-11-14', text:'Sam worked steadily through the KMT particle diagrams. Accuracy improving noticeably since the cell unit.',                                     dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'st3',  date:'2026-02-28', text:'Asked a thoughtful question connecting energy transfer to cooking \u2014 first time Sam has voluntarily spoken up in a whole-class setting.',    dims:['curiosity','engagement'],     sentiment:'growth',   context:'whole-class' },
      { sid:'st4',  date:'2025-12-11', text:'Explained the difference between elements and compounds to a peer using clear everyday analogies.',                                              dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st4',  date:'2025-10-20', text:'Liam\'s cell diagrams were detailed and accurately labelled. He takes pride in precision.',                                                      dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st4',  date:'2026-01-22', text:'Helped set up lab equipment for the class without being asked. Reliable and thoughtful.',                                                        dims:['respect','selfRegulation'],   sentiment:'strength', context:'whole-class' },
      { sid:'st4',  date:'2026-03-05', text:'Liam\'s lab technique has become consistently strong. He double-checks measurements and records units carefully.',                               dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'st5',  date:'2025-10-28', text:'Mateo took a creative risk with his poster layout \u2014 really effective visual communication of the immune response.',                         dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'st5',  date:'2025-12-19', text:'Mateo\'s data analysis project showed strong graphing skills. He chose the right graph type and explained his reasoning.',                       dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st5',  date:'2026-02-06', text:'Worked productively with a partner he doesn\'t usually choose. Showed flexibility and maturity.',                                                dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st5',  date:'2026-03-12', text:'Mateo\'s mid-year lab skills check was solid \u2014 he moved carefully and recorded data with attention to units and precision.',                dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'st6',  date:'2025-11-18', text:'Needed a few reminders to stay on task during independent work time.',                                                                           dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st6',  date:'2026-02-10', text:'Showed genuine excitement when the heating curve matched the prediction. Most engaged I\'ve seen him this term.',                                dims:['engagement','curiosity'],     sentiment:'growth',   context:'whole-class' },
      { sid:'st6',  date:'2025-10-31', text:'Ethan rushed through the poster without checking rubric criteria. Quality suffered because of pacing.',                                          dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st6',  date:'2026-03-14', text:'Ethan completed the mid-year lab skills check with focus and care \u2014 a real shift from earlier in the year.',                                dims:['engagement','resilience'],    sentiment:'growth',   context:'independent' },
      { sid:'st7',  date:'2025-10-22', text:'Jas drew the most detailed and accurate cell diagram in the class. Real attention to scientific illustration.',                                  dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st7',  date:'2025-12-05', text:'Contributed a creative visual to the plate tectonics group presentation that clearly communicated subduction zones.',                             dims:['curiosity','collaboration'],  sentiment:'strength', context:'small-group' },
      { sid:'st7',  date:'2026-01-20', text:'Jas quietly helps classmates with diagrams during work time. Natural peer supporter.',                                                           dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st7',  date:'2026-03-01', text:'His ecosystem essay included hand-drawn diagrams that were more effective than any digital version. Creative scientific communication.',          dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'st8',  date:'2025-12-08', text:'Fatima independently looked up primary sources for her disease research poster. Self-directed learning at its best.',                            dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'st8',  date:'2025-10-10', text:'Fatima was the first to get a clear microscope image and helped three classmates adjust their focus settings.',                                  dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st8',  date:'2026-01-16', text:'Strong performance on the atomic theory quiz. Her periodic table reading skills are well above grade level.',                                    dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st8',  date:'2026-03-08', text:'Fatima asked a question about lab safety protocols that showed she\'d been reading ahead in the textbook. Always prepared.',                     dims:['curiosity','selfRegulation'], sentiment:'strength', context:'whole-class' },
      { sid:'st9',  date:'2025-12-05', text:'Presented tectonic plate research with real confidence \u2014 first time speaking to the whole class.',                                          dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'st9',  date:'2026-01-28', text:'Connected plate tectonics to a news article she found about earthquakes in Japan. Brought in the article to share.',                             dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st9',  date:'2026-03-10', text:'Priya organized a peer study session before the lab skills check. She made sure struggling students felt comfortable asking questions.',         dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st10', date:'2025-10-20', text:'Jordan worked steadily through the cell lab, producing clean, well-labelled diagrams. Quiet but consistent effort.',                            dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'st10', date:'2025-12-05', text:'Took on the most technical part of the group presentation and delivered it clearly. Growing confidence.',                                         dims:['engagement','resilience'],    sentiment:'growth',   context:'presentation' },
      { sid:'st10', date:'2026-01-22', text:'Jordan asked for feedback on his quiz corrections before submitting. Shows initiative in seeking improvement.',                                   dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'st10', date:'2026-02-20', text:'Noticed an error in the class data set during the energy transfer lab and flagged it to the group. Good scientific thinking.',                   dims:['curiosity','engagement'],     sentiment:'strength', context:'small-group' },
      { sid:'st10', date:'2026-03-12', text:'Jordan\'s lab technique has become noticeably more confident this term. He moves with purpose and records data efficiently.',                    dims:['engagement'],                sentiment:'growth',   context:'independent' },
      { sid:'st11', date:'2025-11-05', text:'Ines collaborated well during the disease research, dividing tasks fairly and checking in with group members.',                                  dims:['collaboration'],             sentiment:'strength', context:'small-group' },
      { sid:'st11', date:'2025-12-19', text:'Her data analysis graphs were among the most accurate in the class. Strong attention to scale and labelling.',                                   dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'st11', date:'2026-01-28', text:'Ines asked a perceptive question about why certain elements are more reactive \u2014 showed she was connecting ideas across units.',              dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'st11', date:'2026-02-27', text:'Her ecosystem essay was well-structured with clear topic sentences. Solid scientific writing.',                                                   dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st11', date:'2026-03-14', text:'Ines consistently follows safety procedures without reminders and helps peers remember theirs. Reliable lab partner.',                            dims:['selfRegulation','respect'],   sentiment:'strength', context:'small-group' },
      { sid:'st12', date:'2025-11-25', text:'Marcus struggled with the data analysis but kept trying \u2014 real improvement by end of class. Needs more practice with graph interpretation.',dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'st12', date:'2025-10-17', text:'Marcus found the immune system quiz challenging but asked good questions afterward about what he got wrong.',                                     dims:['resilience','curiosity'],     sentiment:'growth',   context:'independent' },
      { sid:'st12', date:'2026-01-16', text:'Still mixing up elements and compounds, but he\'s using the periodic table more confidently now.',                                               dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'st12', date:'2026-02-20', text:'Marcus volunteered to present his group\'s energy transfer findings. His explanation was clear even if the data was rough.',                      dims:['engagement','resilience'],    sentiment:'growth',   context:'presentation' },
      { sid:'st12', date:'2026-03-10', text:'Partnered with Noor for the lab skills check and showed improved technique. He\'s responding well to peer support.',                             dims:['collaboration','resilience'], sentiment:'growth',   context:'small-group' },
      { sid:'st13', date:'2025-10-14', text:'Led group discussion on vaccine research with confidence and clarity. Other students were visibly engaged.',                                      dims:['engagement','collaboration'], sentiment:'strength', context:'discussion' },
      { sid:'st13', date:'2026-02-27', text:'Made a sophisticated connection between cellular respiration and carbon cycling that I hadn\'t considered presenting. Shared it with the class.', dims:['curiosity','engagement'],    sentiment:'strength', context:'whole-class' },
      { sid:'st13', date:'2025-12-19', text:'Amara\'s data analysis project went beyond requirements \u2014 she calculated standard deviation and explained what it meant.',                  dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'st14', date:'2025-10-17', text:'Sofia did well on the immune system quiz and helped a classmate review her mistakes afterward.',                                                  dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st14', date:'2025-12-05', text:'Her plate tectonics presentation section was well-researched and clearly delivered. She\'s a confident speaker.',                                 dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'st14', date:'2026-01-20', text:'Sofia noticed a pattern in the periodic table that I hadn\'t highlighted yet \u2014 asked about it during class discussion.',                    dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'st14', date:'2026-02-15', text:'Completed the energy transfer lab efficiently and helped clean up the lab station thoroughly. Always dependable.',                               dims:['selfRegulation','respect'],   sentiment:'strength', context:'independent' },
      { sid:'st14', date:'2026-03-14', text:'Sofia\'s lab skills check was solid across all criteria. Consistent, reliable student.',                                                          dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'st15', date:'2026-01-20', text:'Tyler is showing more willingness to revise work after feedback. Rewrote his conclusion without being asked.',                                    dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'st15', date:'2025-11-14', text:'Tyler was off-task for much of the KMT lab. We had a conversation about what\'s getting in the way.',                                           dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st15', date:'2026-02-27', text:'Tyler\'s ecosystem essay showed he can write with depth when the topic interests him. His paragraph on food webs was strong.',                   dims:['engagement','curiosity'],     sentiment:'growth',   context:'independent' },
      { sid:'st16', date:'2026-02-18', text:'Aiden respectfully challenged a group member\'s data interpretation with evidence. Good scientific discourse.',                                   dims:['respect','curiosity'],        sentiment:'strength', context:'discussion' },
      { sid:'st16', date:'2025-11-14', text:'Aiden needs support staying focused during longer lab activities. Works better with a structured checklist.',                                     dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st16', date:'2026-01-16', text:'Showed improvement on the atomic theory quiz compared to earlier assessments. He\'s putting in effort outside of class.',                        dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'st16', date:'2026-03-05', text:'Aiden peer-reviewed a classmate\'s lab report and gave specific, constructive feedback. Surprising maturity.',                                    dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st17', date:'2025-11-05', text:'Olivia asked an incredible "what if" question about plate boundaries and ocean formation that pushed the whole class\'s thinking.',               dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'st17', date:'2025-12-19', text:'Olivia\'s data analysis project was thorough and well-organized. Her graphs communicated the story clearly.',                                     dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'st17', date:'2026-02-06', text:'Made an insightful connection between energy transfer and climate change during the lab debrief.',                                                dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st17', date:'2026-03-12', text:'Olivia volunteered to demonstrate proper pipetting technique for the class. Clear and confident.',                                               dims:['engagement','collaboration'], sentiment:'strength', context:'whole-class' },
      { sid:'st18', date:'2025-11-14', text:'Raj completed the KMT lab but his particle diagrams lacked detail. Needs to slow down and label more carefully.',                                dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st18', date:'2026-01-16', text:'Raj struggled with the atomic theory quiz but came in at lunch to review his mistakes. That initiative matters.',                                 dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'st18', date:'2026-02-06', text:'Raj worked more carefully during the energy transfer lab today. He checked measurements twice before recording. Progress.',                       dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'st18', date:'2026-03-05', text:'Asked for a checklist to help him stay on track during independent work. Good self-awareness about what he needs.',                               dims:['selfRegulation'],            sentiment:'growth',   context:'independent' },
      { sid:'st18', date:'2025-12-19', text:'Raj contributed useful ideas to his group during the data analysis project, especially around choosing graph types.',                              dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st19', date:'2026-03-05', text:'Maya offered to tutor during lunch \u2014 genuinely wants her peers to succeed. Spent 30 minutes helping two classmates with lab reports.',       dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st19', date:'2025-10-31', text:'Maya\'s disease research poster was visually clear and scientifically accurate. Strong all-around work.',                                         dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st19', date:'2025-12-19', text:'Maya asked thoughtful questions during the data analysis debrief that showed she was thinking critically about her results.',                     dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st19', date:'2026-02-06', text:'Maya worked patiently with a partner who needed extra support during the energy transfer lab. Natural teacher.',                                  dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st20', date:'2025-12-15', text:'Liv revised her lab conclusion after feedback without being asked. Shows strong self-regulation.',                                                dims:['resilience','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'st20', date:'2025-10-17', text:'Liv aced the immune system quiz and stayed behind to explain the difference between innate and adaptive immunity to a classmate.',                dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st20', date:'2026-01-22', text:'Liv\'s atomic theory quiz corrections were detailed and showed real understanding of where she went wrong.',                                      dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'st20', date:'2026-03-05', text:'Completed the ecosystem essay early and used the extra time to add a diagram that strengthened her argument. Self-directed.',                     dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'st21', date:'2025-10-15', text:'Hannah asked thoughtful questions during the microscope lab. She wanted to understand WHY the cells looked different, not just identify them.',   dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st21', date:'2025-12-05', text:'Hannah\'s plate tectonics presentation was well-organized and delivered with growing confidence.',                                                dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'st21', date:'2026-01-20', text:'Worked quietly but productively through the atomic theory material. Completed all practice problems accurately.',                                 dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'st21', date:'2026-02-20', text:'Hannah volunteered to explain the energy transfer concept to her lab group using a whiteboard diagram. Clear communication.',                     dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st21', date:'2026-03-10', text:'Hannah\'s ecosystem essay showed strong analytical thinking \u2014 she connected multiple concepts across units.',                               dims:['curiosity'],                 sentiment:'strength', context:'independent' },
      { sid:'st22', date:'2025-10-17', text:'Darius found the immune system quiz difficult but stayed focused and attempted every question. Doesn\'t give up easily.',                        dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'st22', date:'2025-12-05', text:'Darius was quiet during the group presentation but his research notes were the most detailed in the group.',                                      dims:['engagement'],                sentiment:'strength', context:'small-group' },
      { sid:'st22', date:'2026-01-16', text:'Still finding the chemistry content challenging but he\'s coming to tutorials and asking targeted questions. Real effort.',                       dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'st22', date:'2026-02-20', text:'Darius made a connection between energy transfer and cooking that showed practical understanding of the concept.',                                dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'st22', date:'2026-03-14', text:'Darius\'s lab technique has improved significantly \u2014 he measures carefully now and records data in an organized table.',                     dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'st23', date:'2025-10-03', text:'Mei\'s microscope work was exceptional \u2014 she found and sketched cell structures that other students missed entirely.',                       dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'st23', date:'2025-11-14', text:'Mei\'s KMT particle diagrams were the most scientifically accurate in the class. Real precision.',                                               dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st23', date:'2026-01-16', text:'Scored highest in the class on the atomic theory quiz. She studies independently and it shows.',                                                  dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'st23', date:'2026-02-27', text:'Mei\'s ecosystem essay connected Indigenous land management practices to ecological concepts. Thoughtful and well-researched.',                   dims:['curiosity','respect'],        sentiment:'strength', context:'independent' },
      { sid:'st23', date:'2026-03-14', text:'Mei helped calibrate the equipment during the lab skills check and explained the process to two classmates. Natural leader in the lab.',          dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'st24', date:'2025-10-31', text:'Caleb\'s disease research poster was solid but he relied too heavily on one source. We discussed broadening his research.',                       dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st24', date:'2025-12-19', text:'Caleb\'s data analysis graphs were accurate but his written analysis was thin. He can interpret data verbally better than in writing.',           dims:['engagement'],                sentiment:'growth',   context:'independent' },
      { sid:'st24', date:'2026-01-22', text:'Caleb asked a great question about why noble gases don\'t react. Led to a productive class discussion.',                                         dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st24', date:'2026-02-15', text:'Worked well with his energy transfer lab partner \u2014 took turns recording data and both contributed to the conclusion.',                      dims:['collaboration'],             sentiment:'strength', context:'small-group' },
      { sid:'st24', date:'2026-03-14', text:'Caleb\'s lab skills have steadily improved. He\'s more careful with measurements and his technique is becoming reliable.',                        dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'st25', date:'2025-10-14', text:'Anisa brought in a news article about antibiotic resistance that connected perfectly to our immune system unit. Great initiative.',               dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'st25', date:'2025-12-05', text:'Anisa\'s plate tectonics presentation was the most polished in her group. She rehearsed and it showed.',                                          dims:['engagement','selfRegulation'],sentiment:'strength', context:'presentation' },
      { sid:'st25', date:'2026-01-28', text:'Anisa helped organize a peer study group for the atomic theory quiz. Other students appreciated her leadership.',                                 dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'st25', date:'2026-02-27', text:'Her ecosystem essay was one of the strongest in the class \u2014 clear thesis, strong evidence, thoughtful conclusion.',                         dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st25', date:'2026-03-14', text:'Anisa\'s lab technique is consistently precise. She models good practice for the students around her.',                                           dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'st26', date:'2025-10-17', text:'Leo found the immune system quiz challenging. He tends to rush through questions without reading them carefully.',                                dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'st26', date:'2025-12-05', text:'Leo contributed well to the plate tectonics group presentation when given a specific, concrete task.',                                             dims:['collaboration','engagement'], sentiment:'growth',   context:'small-group' },
      { sid:'st26', date:'2026-01-22', text:'Leo is starting to ask for help earlier instead of struggling silently. He came to tutorial and made real progress.',                             dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'st26', date:'2026-02-20', text:'Leo\'s energy transfer lab data was more accurate than previous labs. He\'s slowing down and being more careful.',                                dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'st26', date:'2026-03-10', text:'Leo helped clean up the lab without being asked and made sure all equipment was stored correctly. Showing more responsibility.',                  dims:['respect','selfRegulation'],   sentiment:'growth',   context:'whole-class' },
      { sid:'st27', date:'2025-10-31', text:'Tessa\'s disease research poster was thorough and well-designed. She went beyond the rubric requirements.',                                       dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'st27', date:'2025-12-19', text:'Tessa\'s data analysis project included a creative comparison of two different data sets. She saw a pattern no one else noticed.',                dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'st27', date:'2026-01-28', text:'Tessa asked a question during the atomic theory lesson that showed she was already thinking about chemical bonding. Ahead of the curve.',        dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'st27', date:'2026-02-27', text:'Her ecosystem essay was beautifully written with strong scientific vocabulary. Tessa communicates science effectively.',                           dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'st27', date:'2026-03-14', text:'Tessa volunteered to demonstrate lab safety procedures for the class. She\'s becoming a real leader in the lab.',                                 dims:['engagement','collaboration'], sentiment:'strength', context:'whole-class' }
    ]));

    // Term ratings
    const sci8TR = {};
    sci8TR['st1']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Cece is a consistent, dependable student who takes care with her lab work and asks clarifying questions. She would benefit from taking more risks in class discussions and sharing her ideas more freely.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Cece has grown noticeably more confident this term. She volunteers to present, helps organize group work, and her written analysis has become more detailed and evidence-based.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st2']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Noor brings exceptional curiosity and scientific thinking to every investigation. She consistently extends experiments beyond requirements, asks questions that deepen class understanding, and models outstanding lab technique.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Noor continues to set the standard. This term she has taken on more of a mentoring role, guiding classmates through labs with patience and precision. Her scientific writing has become remarkably polished.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st3']  = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Sam is building confidence slowly but surely. They struggled early with lab technique but showed real persistence. Sam works best in smaller group settings and is beginning to share ideas more openly.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:4, curiosity:3, respect:4}, narrative:'Sam has made meaningful progress this term. They participate more in group discussions, ask questions in class, and their written work has improved in both depth and accuracy. The growth is real.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st4']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Liam is a reliable, detail-oriented student who produces consistently solid work. He explains concepts clearly to peers and takes pride in precision. He could push himself further by exploring questions beyond the curriculum.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Liam continues to be a steady, thoughtful contributor. His lab technique is now among the best in the class, and he has started asking deeper questions about the science behind procedures. A pleasure to teach.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st5']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:3, resilience:3, curiosity:4, respect:3}, narrative:'Mateo brings creative energy to science. His poster work showed real visual communication skills, and he takes risks with unconventional approaches. He would benefit from more careful data recording in labs.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mateo has become more methodical in his lab work this term while maintaining his creative strengths. He works well with a wider range of partners and his data recording has improved significantly.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st6']  = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:3, respect:3}, narrative:'Ethan shows growing resilience in science, particularly during labs where he can engage hands-on. He persists through difficulty and is learning to ask for help earlier. His curiosity in class discussions is genuine \u2014 he benefits from channeling that energy into his written analysis.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Ethan showed real improvement in Term 2, especially in the energy transfer unit where his excitement was visible. His lab skills check was his strongest assessment yet. He is learning to stay focused during independent work, though this remains an area for growth.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st7']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Jas has a gift for scientific illustration and visual communication. His diagrams are consistently the most detailed and accurate in the class. He quietly supports classmates and produces high-quality independent work.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Jas continues to excel in visual and hands-on science. This term he has stepped up as a peer helper, sharing his illustration skills with classmates. His ecosystem essay included original diagrams that were genuinely impressive.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st8']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Fatima is a self-directed learner who consistently goes beyond what is asked. She researches independently, prepares for labs thoroughly, and supports her peers generously. Her scientific curiosity is genuine and contagious.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Fatima has taken her self-directed learning to the next level this term. She reads ahead, asks questions that push the class, and her lab preparation is exemplary. She has also become a more confident collaborator.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st9']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Priya combines strong observation skills with genuine care for her classmates\' learning. Her presentations have become a class highlight, and she regularly connects science to current events. A real leader in the lab.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Priya has grown into a true scientific leader this term. She organized peer study sessions, connected energy concepts to real-world news, and her lab skills are now among the strongest in the class. A model student.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st10'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Jordan works quietly and consistently. He produces accurate work and follows instructions carefully. He is beginning to show more initiative, like volunteering for the group presentation, but could push himself to share his thinking more often.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Jordan has shown real growth this term. He caught a data error during the energy transfer lab, asked for feedback proactively on his quiz corrections, and his confidence in lab settings has improved noticeably. Keep pushing, Jordan.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st11'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Ines is a collaborative, organized student who contributes reliably to group work and produces accurate independent work. Her data analysis skills are strong. She could develop further by asking more questions and exploring her own scientific curiosity.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ines has started asking more probing questions this term and her curiosity is showing in her written work. She remains a reliable lab partner and her safety awareness is exemplary. Her ecosystem essay was well-structured and analytically strong.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st12'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Marcus finds some of the content challenging but shows real persistence. He keeps trying even when frustrated and has started asking for help earlier. His resilience is a genuine strength. He needs continued support with graph interpretation and data analysis.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:4, curiosity:3, respect:3}, narrative:'Marcus has shown encouraging growth. He volunteered to present, improved his technique with peer support, and his quiz corrections show he is learning from his mistakes. His resilience is becoming a real asset.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st13'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Amara is a standout scientific thinker. She makes connections across units that surprise me, leads group work with warmth and clarity, and consistently produces evidence-based conclusions. She sets the standard for the class.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Amara continues to be exceptional. Her ecosystem essay connected cellular respiration to carbon cycling in a way I will use as an exemplar. She leads without dominating and supports without doing the work for others. Truly outstanding.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st14'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Sofia is a confident, capable student who produces consistently strong work. Her presentation skills are excellent and she notices patterns that others miss. She could push further by exploring connections between science and other disciplines.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Sofia has broadened her engagement this term, asking questions about the periodic table that showed independent thinking and helping clean up lab stations regularly. Her lab skills check was solid across all criteria. Dependable and growing.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st15'] = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Tyler has the ability to do well in science but often needs prompting to engage fully. When he focuses, his work shows real understanding. His revision of the data analysis project after feedback was encouraging \u2014 more of that self-direction will make a big difference.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:2, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Tyler has shown improvement this term, particularly when topics interest him. His ecosystem essay paragraph on food webs was genuinely strong. He is starting to revise work after feedback without being asked, which is a positive shift.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st16'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:2, curiosity:3, respect:3}, narrative:'Aiden can be engaged and curious when topics catch his interest, but he struggles to maintain focus during longer independent tasks. He benefits from structured checklists and clear expectations. His curiosity in discussion is genuine.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Aiden has shown notable growth in self-regulation. He peer-reviewed a classmate\'s work thoughtfully, challenged data interpretations with evidence, and his quiz scores have improved. He is learning to channel his energy productively.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st17'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Olivia asks questions that push the whole class\'s thinking. Her curiosity is exceptional and she makes connections that show deep engagement with the material. Her data analysis project was thorough and well-organized.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Olivia continues to drive class discussions with insightful questions. This term she has also stepped into more collaborative roles, volunteering to demonstrate techniques and connecting energy concepts to climate change. A scientific thinker.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st18'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Raj finds some science content challenging and tends to rush through work without attention to detail. He contributes to group work and has useful ideas, but his individual output needs more care and precision. He would benefit from slowing down and using checklists.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Raj has shown real improvement in self-regulation this term. He came to tutorial voluntarily, asked for a checklist to stay on track, and his lab data accuracy has improved. He is learning to slow down and take care with his work. Encouraging progress.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st19'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Maya is a generous, thoughtful student who consistently supports her peers. Her disease research poster was strong and her collaborative spirit makes every group she joins more productive. She is a quiet leader.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Maya\'s generosity and patience with classmates is remarkable. She tutors at lunch, helps struggling students during labs, and her own work remains consistently strong. She asks critical questions during debriefs that show she thinks deeply about science.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st20'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:3, respect:4}, narrative:'Liv is a strong, self-directed student who revises her work proactively and produces consistently accurate results. She helps peers without being asked and her self-regulation is excellent. She could push herself further by exploring her own scientific questions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Liv has maintained her high standards and added more depth to her written analysis this term. Her ecosystem essay was completed early with extra diagrams, and her quiz corrections show genuine metacognitive skill. A consistently excellent student.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st21'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Hannah is a thoughtful student who asks genuine questions and works carefully through lab activities. She is quiet but engaged, and her work shows real understanding of the content.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Hannah has become more willing to share her ideas this term. She volunteered to explain concepts to her lab group and her written analysis connects ideas across units. Growing into a confident science student.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st22'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Darius finds the written and theoretical aspects of science challenging. He works hard when engaged, especially in labs, and his resilience during difficult tasks is genuine. He benefits from structured support and visual models.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:4, curiosity:3, respect:3}, narrative:'Darius has shown real improvement in Term 2. He attends tutorials, asks targeted questions, and his lab technique has become more precise. He made a practical connection between energy transfer and cooking that showed genuine understanding.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st23'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mei is one of the strongest science students in the class. Her lab work is exceptionally precise, her understanding of content is deep, and she studies independently. She could develop further by sharing her expertise more actively with peers.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Mei has begun sharing her skills more openly, helping calibrate equipment and explaining processes to classmates. Her ecosystem essay incorporated Indigenous perspectives on land management \u2014 thoughtful and well-researched. An exceptional student who is becoming a stronger collaborator.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st24'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Caleb produces solid work but tends to rely on a single source and rushes through written analysis. He can interpret data well verbally but struggles to translate that into written form. He asks good questions when curious.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:4, respect:3}, narrative:'Caleb has steadily improved his lab technique and is asking more questions in class. His question about noble gases sparked a productive discussion. His written analysis still needs more depth, but his data collection accuracy has improved.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st25'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Anisa is a proactive, well-organized student who brings relevant current events to class and helps organize peer study groups. Her presentations are polished and she takes pride in doing quality work.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Anisa continues to be a leader in the class. Her ecosystem essay was among the strongest submitted, and her lab technique is consistently precise. She organized a peer study group before the atomic theory quiz that other students found genuinely helpful.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st26'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:2, curiosity:2, respect:3}, narrative:'Leo tends to rush through tasks and finds sustained focus challenging. He works better with concrete, structured tasks and clear expectations. He contributes to group work when given a specific role but needs support staying on track independently.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Leo has shown growth this term in self-regulation. He asked for help earlier, came to tutorial, and his lab data accuracy has improved. He also started cleaning up lab stations without being asked \u2014 a small but meaningful shift in responsibility.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    sci8TR['st27'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Tessa is a strong, curious student who goes beyond the rubric requirements. Her disease research poster was thorough and her data analysis project included creative comparisons. She communicates science effectively in writing.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Tessa has stepped into a leadership role this term, volunteering to demonstrate safety procedures and asking questions that show she is thinking ahead of the curriculum. Her written work is consistently strong and her scientific vocabulary is impressive.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    saveTermRatings('sci8', sci8TR);
  }

  /* ════════════════════════════════════════════════════════════
     MATHEMATICS 9 — MATH9 (shared roster)
     ════════════════════════════════════════════════════════════ */
  if (COURSES.math9 && getStudents('math9').length === 0) {
    // Same students, different IDs for math9 course
    const math9Roster = SHARED_ROSTER.map((s, i) => Object.assign({}, s, { id: 'm' + (i+1) }));
    saveStudents('math9', math9Roster);
    const MIDS = math9Roster.map(s => s.id);

    const math9Assessments = [
      { id:'m9a1',  title:'Rational Numbers Quiz',          date:'2025-09-26', type:'formative',  tagIds:['RC','PS'],       evidenceType:'quiz',    notes:'',                                                                coreCompetencyIds:['CT'],           created: new Date('2025-09-26').toISOString() },
      { id:'m9a2',  title:'Linear Relations Unit Test',     date:'2025-10-24', type:'summative',  tagIds:['RC','PS','CS','MC'],  evidenceType:'written', notes:'Tables, graphs, equations, and word problems.',                    coreCompetencyIds:['CT','CRT'],     rubricId:'rub_math9_ps', created: new Date('2025-10-24').toISOString() },
      { id:'m9a3',  title:'Statistics Project',             date:'2025-11-14', type:'summative',  tagIds:['RC','PS','CS','MC'],  evidenceType:'project', notes:'Students surveyed peers, analyzed data, and presented findings.',   coreCompetencyIds:['COM','CT','CRT'],rubricId:'rub_math9_inv', created: new Date('2025-11-14').toISOString() },
      { id:'m9a4',  title:'Geometry Proof Set',             date:'2025-12-06', type:'summative',  tagIds:['RC','PS','CS','MC'],  evidenceType:'written', notes:'Similarity, Pythagorean theorem, and angle relationships.',        coreCompetencyIds:['CRT'],          rubricId:'rub_math9_ps', created: new Date('2025-12-06').toISOString() },
      { id:'m9a5',  title:'Financial Literacy Task',        date:'2026-01-17', type:'summative',  tagIds:['RC','PS','CS','MC'],       evidenceType:'project', notes:'Budget planning and compound interest exploration.',               coreCompetencyIds:['PAR','CT'],     rubricId:'rub_math9_inv', created: new Date('2026-01-17').toISOString() },
      { id:'m9a6',  title:'Polynomial Operations Test',     date:'2026-02-07', type:'summative',  tagIds:['RC','PS','CS','MC'],  evidenceType:'written', notes:'Adding, subtracting, multiplying polynomials.',                    coreCompetencyIds:['CT'],           rubricId:'rub_math9_ps', created: new Date('2026-02-07').toISOString() },
      { id:'m9a7',  title:'Data Collection Lab',            date:'2026-02-28', type:'formative',  tagIds:['CS','MC'],       evidenceType:'observation', notes:'Observed mathematical communication during group data collection.', coreCompetencyIds:['COM','COL'], created: new Date('2026-02-28').toISOString() },
      { id:'m9a8',  title:'Problem Solving Portfolio',      date:'2026-03-14', type:'summative',  tagIds:['RC','PS','CS','MC'], evidenceType:'portfolio', notes:'Collection of best problem-solving work with reflections.',  coreCompetencyIds:['CRT','PAR'],    rubricId:'rub_math9_ps', created: new Date('2026-03-14').toISOString() },
      { id:'m9a9',  title:'Income & Expenses Budget Project', date:'2025-09-19', type:'summative', tagIds:['RC','PS','CS','MC'],          evidenceType:'project',  notes:'Create a realistic monthly budget with income sources and expense categories.', coreCompetencyIds:['PAR','CT'],   rubricId:'rub_math9_realworld', created: new Date('2025-09-19').toISOString() },
      { id:'m9a10', title:'Pythagorean Theorem Proof',       date:'2025-10-10', type:'summative',  tagIds:['RC','PS','CS'],     evidenceType:'written',  notes:'Geometric and algebraic proofs of the Pythagorean theorem.',                    coreCompetencyIds:['CRT'],         rubricId:'rub_math9_proof', created: new Date('2025-10-10').toISOString() },
      { id:'m9a11', title:'Survey & Data Analysis',          date:'2025-10-31', type:'summative',  tagIds:['RC','PS','CS','MC'],          evidenceType:'project',  notes:'Design a survey, collect data from peers, and present findings with graphs.',   coreCompetencyIds:['COM','CT'],    rubricId:'rub_math9_inv', created: new Date('2025-10-31').toISOString() },
      { id:'m9a12', title:'Linear Equations Practice',       date:'2025-11-21', type:'formative',  tagIds:['RC','PS'],          evidenceType:'quiz',     notes:'Practice check on solving one- and two-step linear equations.',                 coreCompetencyIds:['CT'],          created: new Date('2025-11-21').toISOString() },
      { id:'m9a13', title:'Similarity & Scale Drawing',      date:'2025-12-19', type:'summative',  tagIds:['RC','PS','CS','MC'],          evidenceType:'project',  notes:'Apply similarity ratios to create accurate scale drawings of the school.',      coreCompetencyIds:['CRT','CT'],    rubricId:'rub_math9_ps', created: new Date('2025-12-19').toISOString() },
      { id:'m9a14', title:'Exponent Laws Quiz',              date:'2026-01-10', type:'formative',  tagIds:['RC','CS'],          evidenceType:'quiz',     notes:'Quick check on product, quotient, and power of a power rules.',                 coreCompetencyIds:['CT'],          created: new Date('2026-01-10').toISOString() },
      { id:'m9a15', title:'Tessellation Design Project',     date:'2026-01-31', type:'summative',  tagIds:['PS','CS','MC'],     evidenceType:'project',  notes:'Design a tessellation using transformations and explain the math behind it.',   coreCompetencyIds:['COM','CRT'],   rubricId:'rub_math9_comm', created: new Date('2026-01-31').toISOString() },
      { id:'m9a16', title:'Inequality Word Problems',        date:'2026-02-14', type:'summative',  tagIds:['RC','PS','CS','MC'],          evidenceType:'written',  notes:'Translate real-world scenarios into inequalities and solve.',                    coreCompetencyIds:['CRT','CT'],    rubricId:'rub_math9_ps', created: new Date('2026-02-14').toISOString() },
      { id:'m9a17', title:'Math in Architecture Presentation', date:'2026-02-21', type:'summative', tagIds:['RC','PS','CS','MC'],    evidenceType:'observation', notes:'Group presentations connecting geometry, measurement, and scale to architecture.', coreCompetencyIds:['COM','COL'], rubricId:'rub_math9_groupps', created: new Date('2026-02-21').toISOString() },
      { id:'m9a18', title:'Surface Area Challenge',          date:'2026-03-07', type:'summative',  tagIds:['RC','PS','CS','MC'],     evidenceType:'written',  notes:'Multi-step surface area and volume problems with composite 3D shapes.',         coreCompetencyIds:['CRT','CT'],    rubricId:'rub_math9_ps', created: new Date('2026-03-07').toISOString() },
      { id:'m9a19', title:'Probability Experiment',          date:'2026-03-18', type:'summative',  tagIds:['RC','PS','CS','MC'],          evidenceType:'lab',      notes:'Design and conduct a probability experiment, compare theoretical and experimental results.', coreCompetencyIds:['CRT','CT'], rubricId:'rub_math9_inv', created: new Date('2026-03-18').toISOString() },
      { id:'m9a20', title:'End of Unit Reflection',          date:'2026-03-21', type:'formative',  tagIds:['RC','PS','CS','MC'],          evidenceType:'written',  notes:'Reflective journal entry on mathematical growth and problem-solving strategies.', coreCompetencyIds:['PAR'],        rubricId:'rub_math9_journal', created: new Date('2026-03-21').toISOString() }
    ];
    // ── Math 9 Points-Based Quizzes (12) ──
    math9Assessments.push(
      { id:'m9q1',  title:'Integer Operations Quiz',       date:'2025-09-24', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2025-09-24').toISOString() },
      { id:'m9q2',  title:'Fraction Review Quiz',          date:'2025-10-07', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2025-10-07').toISOString() },
      { id:'m9q3',  title:'Linear Graphing Quiz',          date:'2025-10-21', type:'formative', tagIds:['CS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:15, created: new Date('2025-10-21').toISOString() },
      { id:'m9q4',  title:'Exponent Rules Quiz',           date:'2025-11-04', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2025-11-04').toISOString() },
      { id:'m9q5',  title:'Ratio & Proportion Quiz',       date:'2025-11-18', type:'formative', tagIds:['PS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2025-11-18').toISOString() },
      { id:'m9q6',  title:'Algebra Vocabulary Quiz',       date:'2025-12-02', type:'formative', tagIds:['CS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['COM'], scoreMode:'points', maxPoints:10, created: new Date('2025-12-02').toISOString() },
      { id:'m9q7',  title:'Pythagorean Theorem Quiz',      date:'2025-12-16', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:15, created: new Date('2025-12-16').toISOString() },
      { id:'m9q8',  title:'Probability Basics Quiz',       date:'2026-01-13', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2026-01-13').toISOString() },
      { id:'m9q9',  title:'Inequality Symbols Quiz',       date:'2026-01-27', type:'formative', tagIds:['CS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2026-01-27').toISOString() },
      { id:'m9q10', title:'Surface Area Formulas Quiz',    date:'2026-02-10', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2026-02-10').toISOString() },
      { id:'m9q11', title:'Data Types Quiz',               date:'2026-02-24', type:'formative', tagIds:['CS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['COM'], scoreMode:'points', maxPoints:10, created: new Date('2026-02-24').toISOString() },
      { id:'m9q12', title:'Order of Operations Quiz',      date:'2026-03-10', type:'formative', tagIds:['RC'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:10, created: new Date('2026-03-10').toISOString() }
    );
    // ── Math 9 Points-Based Unit Tests (5) ──
    math9Assessments.push(
      { id:'m9t1', title:'Rational Numbers Unit Test',      date:'2025-10-14', type:'summative', tagIds:['RC','PS'],      evidenceType:'written', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:50, created: new Date('2025-10-14').toISOString() },
      { id:'m9t2', title:'Linear Relations Unit Test',      date:'2025-11-25', type:'summative', tagIds:['RC','CS'],      evidenceType:'written', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:60, created: new Date('2025-11-25').toISOString() },
      { id:'m9t3', title:'Geometry & Measurement Test',     date:'2025-12-09', type:'summative', tagIds:['RC','PS'],      evidenceType:'written', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:50, created: new Date('2025-12-09').toISOString() },
      { id:'m9t4', title:'Statistics & Probability Test',   date:'2026-02-03', type:'summative', tagIds:['RC','CS'],      evidenceType:'written', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:50, created: new Date('2026-02-03').toISOString() },
      { id:'m9t5', title:'Mid-Year Comprehensive Exam',     date:'2026-03-03', type:'summative', tagIds:['RC','PS','CS'], evidenceType:'written', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:80, created: new Date('2026-03-03').toISOString() }
    );
    saveAssessments('math9', math9Assessments);

    /* ── Math 9 Rubrics ── */
    const math9Rubrics = [
      {
        id: 'rub_math9_ps',
        name: 'Problem Solving Rubric',
        criteria: [
          {
            id: 'crit_math9_ps_reason',
            name: 'Mathematical Reasoning',
            tagIds: ['RC', 'PS'],
            levels: {
              4: 'Selects and applies sophisticated strategies, uses estimation to verify reasonableness, and creates mathematical models that extend beyond the problem.',
              3: 'Selects appropriate strategies, estimates to check answers, and applies mathematical modelling to solve problems.',
              2: 'Applies a limited range of strategies with some success; estimation and modelling attempts are inconsistent.',
              1: 'Relies on trial-and-error without a clear strategy; does not estimate or model effectively.'
            }
          },
          {
            id: 'crit_math9_ps_comm',
            name: 'Communication',
            tagIds: ['CS'],
            levels: {
              4: 'Uses precise mathematical vocabulary, provides thorough justifications, and chooses representations that powerfully clarify thinking.',
              3: 'Uses appropriate mathematical vocabulary, justifies solutions, and selects suitable representations.',
              2: 'Uses some mathematical vocabulary but justifications are incomplete; representations are present but not always effective.',
              1: 'Mathematical vocabulary is absent or inaccurate; solutions lack justification and representations are missing.'
            }
          },
          {
            id: 'crit_math9_ps_conn',
            name: 'Connections',
            tagIds: ['MC'],
            levels: {
              4: 'Reflects deeply on mathematical thinking, makes insightful cross-curricular connections, and identifies patterns across mathematical domains.',
              3: 'Reflects on mathematical processes and makes connections between mathematics and other contexts.',
              2: 'Makes basic reflections on work but connections to other contexts are superficial or absent.',
              1: 'Does not reflect on mathematical thinking or make connections beyond the immediate problem.'
            }
          }
        ]
      },
      {
        id: 'rub_math9_inv',
        name: 'Investigation Rubric',
        criteria: [
          {
            id: 'crit_math9_inv_process',
            name: 'Process & Strategy',
            tagIds: ['RC', 'PS'],
            levels: {
              4: 'Demonstrates a systematic and creative approach, selects optimal tools, and persists through complex challenges with flexibility.',
              3: 'Uses a clear approach, selects appropriate tools, and persists through challenges to reach a solution.',
              2: 'Follows a basic approach but tool selection is limited; gives up or changes direction prematurely when faced with difficulty.',
              1: 'Lacks a clear plan of approach; struggles to select tools or persist without significant teacher guidance.'
            }
          },
          {
            id: 'crit_math9_inv_represent',
            name: 'Representation & Reflection',
            tagIds: ['CS', 'MC'],
            levels: {
              4: 'Uses multiple representations fluently, makes insightful connections between them, and reflects critically on the investigation process.',
              3: 'Uses appropriate representations, connects them to the problem context, and reflects on the investigation.',
              2: 'Uses one representation with limited connection to the context; reflection is descriptive rather than analytical.',
              1: 'Representation is incomplete or missing; does not reflect on the investigation process.'
            }
          }
        ]
      },
      {
        id: 'rub_math9_comm',
        name: 'Mathematical Communication Rubric',
        criteria: [
          {
            id: 'crit_math9_comm_written',
            name: 'Written Explanation',
            tagIds: ['CS'],
            levels: {
              4: 'Explanations are exceptionally clear, logically sequenced, and demonstrate a deep understanding of the math behind each step.',
              3: 'Explanations are clear and logical, showing understanding of the mathematical process used.',
              2: 'Explanations are present but skip steps or lack clarity in describing the mathematical reasoning.',
              1: 'Explanations are absent or do not convey understanding of the mathematical process.'
            }
          },
          {
            id: 'crit_math9_comm_visual',
            name: 'Visual Representation',
            tagIds: ['CS', 'MC'],
            levels: {
              4: 'Uses multiple visual representations creatively and accurately, making abstract concepts tangible and enhancing overall communication.',
              3: 'Uses appropriate visual representations that accurately support and clarify mathematical thinking.',
              2: 'Visual representations are attempted but contain errors or do not clearly connect to the mathematics.',
              1: 'Visual representations are missing or do not relate to the problem being communicated.'
            }
          }
        ]
      },
      {
        id: 'rub_math9_groupps',
        name: 'Group Problem Solving Rubric',
        criteria: [
          {
            id: 'crit_math9_groupps_strategy',
            name: 'Strategy Selection',
            tagIds: ['RC', 'PS'],
            levels: {
              4: 'Group selects and combines sophisticated strategies, adapting their approach fluidly as new information emerges during problem solving.',
              3: 'Group selects appropriate strategies and adjusts their approach when initial attempts are unsuccessful.',
              2: 'Group tries a strategy but does not adapt when it proves ineffective; limited range of approaches attempted.',
              1: 'Group cannot agree on a strategy or defaults to guessing without mathematical reasoning.'
            }
          },
          {
            id: 'crit_math9_groupps_accuracy',
            name: 'Mathematical Accuracy',
            tagIds: ['RC'],
            levels: {
              4: 'Calculations and solutions are consistently accurate, with the group verifying results through multiple methods.',
              3: 'Calculations are accurate and the group checks their work for reasonableness.',
              2: 'Some calculation errors are present that affect the final answer; checking is inconsistent.',
              1: 'Frequent errors in basic calculations that go unchecked; final answer is unreliable.'
            }
          },
          {
            id: 'crit_math9_groupps_collab',
            name: 'Collaboration & Discussion',
            tagIds: ['CS', 'MC'],
            levels: {
              4: 'All members contribute substantively, building on each other\'s ideas and respectfully challenging reasoning to deepen understanding.',
              3: 'Members share ideas, listen to one another, and work together to reach a shared solution.',
              2: 'Collaboration is uneven; some members dominate while others disengage from the mathematical discussion.',
              1: 'Little meaningful collaboration occurs; members work independently or one person does all the thinking.'
            }
          }
        ]
      },
      {
        id: 'rub_math9_realworld',
        name: 'Real-World Application Rubric',
        criteria: [
          {
            id: 'crit_math9_realworld_model',
            name: 'Problem Modelling',
            tagIds: ['RC', 'PS'],
            levels: {
              4: 'Constructs a sophisticated mathematical model that captures the complexity of the real-world situation and identifies assumptions clearly.',
              3: 'Creates an appropriate mathematical model that represents the key elements of the real-world situation.',
              2: 'Attempts to model the situation but oversimplifies or misrepresents important aspects of the problem.',
              1: 'Cannot translate the real-world situation into a mathematical model without significant support.'
            }
          },
          {
            id: 'crit_math9_realworld_solution',
            name: 'Solution & Interpretation',
            tagIds: ['CS', 'MC'],
            levels: {
              4: 'Solves accurately and interprets the result thoughtfully in context, evaluating whether the mathematical answer makes real-world sense.',
              3: 'Solves correctly and interprets the result in the context of the original problem.',
              2: 'Reaches a solution but interpretation back to the real-world context is weak or missing.',
              1: 'Solution is incorrect or incomplete; no attempt to interpret results in context.'
            }
          }
        ]
      },
      {
        id: 'rub_math9_proof',
        name: 'Proof & Justification Rubric',
        criteria: [
          {
            id: 'crit_math9_proof_logic',
            name: 'Logical Reasoning',
            tagIds: ['RC', 'PS'],
            levels: {
              4: 'Builds airtight logical arguments with each step justified, considering edge cases and generalizing beyond the specific problem.',
              3: 'Presents a logical sequence of steps with clear justification for each mathematical decision.',
              2: 'Some logical steps are present but gaps in reasoning make the argument incomplete or unconvincing.',
              1: 'Reasoning is disorganized or circular; cannot construct a logical argument to support the conclusion.'
            }
          },
          {
            id: 'crit_math9_proof_language',
            name: 'Mathematical Language',
            tagIds: ['CS'],
            levels: {
              4: 'Uses precise mathematical terminology and notation fluently, making the proof elegant and accessible to a mathematical audience.',
              3: 'Uses correct mathematical terminology and notation that clearly communicates the justification.',
              2: 'Some mathematical terminology is used but notation is inconsistent or informal language dominates.',
              1: 'Mathematical terminology and notation are largely absent; relies entirely on informal language.'
            }
          }
        ]
      },
      {
        id: 'rub_math9_journal',
        name: 'Math Journal Rubric',
        criteria: [
          {
            id: 'crit_math9_journal_reflect',
            name: 'Reflection & Metacognition',
            tagIds: ['MC'],
            levels: {
              4: 'Reflects deeply on learning, identifying specific moments of confusion and breakthrough, and articulating how thinking has evolved.',
              3: 'Reflects on what was learned and identifies strategies that helped or hindered understanding.',
              2: 'Reflection is surface-level, describing what was done rather than what was learned or how thinking changed.',
              1: 'Reflection is absent or consists only of statements like "it was easy" or "I didn\'t get it" without elaboration.'
            }
          },
          {
            id: 'crit_math9_journal_process',
            name: 'Process Documentation',
            tagIds: ['CS', 'RC'],
            levels: {
              4: 'Documents the full problem-solving journey including dead ends, revisions, and alternative approaches with clear mathematical reasoning.',
              3: 'Documents the problem-solving process clearly, showing key steps and reasoning used to reach a solution.',
              2: 'Documents some steps but the process is incomplete; reasoning behind decisions is not explained.',
              1: 'Only records final answers without showing the process or reasoning behind them.'
            }
          }
        ]
      }
    ];
    saveRubrics('math9', math9Rubrics);

    // Distribution: Extending(m2,m9,m13,m20), Proficient(m1,m3,m4,m5,m7,m8,m10,m11,m14,m17,m19), Developing(m6,m12,m15,m16), Emerging(m18)
    // Show growth: m3 starts at 2, moves to 3; m18 stays at 1-2
    const math9ScoreMap = {
      m9a1:  [3,4,2,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 3,2,3,3,4,2,3],
      m9a2:  [3,4,2,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 2,3,3,3,4,2,3],
      m9a3:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,4, 3,2,4,3,3,3,3],
      m9a4:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 3,3,3,2,4,2,3],
      m9a5:  [3,4,3,3,3,2,4,3,4,3,3,2,4,3,2,2,3,2,4,4, 3,2,3,3,3,3,4],
      m9a6:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,3,3,1,3,4, 3,3,4,3,3,2,3],
      m9a7:  [3,4,3,3,3,2,3,3,4,3,3,2,4,3,3,2,3,2,3,4, 3,2,3,3,4,3,3],
      m9a8:  [4,4,3,3,4,0,3,4,4,3,3,0,4,3,2,2,3,0,3,4, 3,3,4,2,3,0,3],
      m9a9:  [3,4,2,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 3,2,3,3,4,2,3],
      m9a10: [3,4,2,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 2,3,3,3,4,2,3],
      m9a11: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,2,3,4, 3,2,4,3,3,3,3],
      m9a12: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 3,3,3,2,4,2,3],
      m9a13: [3,4,3,3,3,2,4,3,4,3,3,2,4,3,2,2,3,2,4,4, 3,2,3,3,3,3,4],
      m9a14: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,3,3,1,3,4, 3,3,4,3,3,2,3],
      m9a15: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,3,2,3,2,3,4, 3,2,3,3,4,3,3],
      m9a16: [3,4,3,3,3,2,3,3,4,3,3,2,4,3,2,2,3,1,3,4, 3,3,4,2,3,2,3],
      m9a17: [3,4,3,3,4,2,3,3,4,3,3,2,4,3,2,3,3,2,3,4, 4,2,3,3,3,3,3],
      m9a18: [4,4,3,3,3,2,3,4,4,3,3,2,4,3,2,2,3,1,3,4, 3,3,4,3,3,2,3],
      m9a19: [3,4,3,3,4,0,3,3,4,3,3,0,4,3,2,2,3,0,3,4, 3,2,3,3,4,0,3],
      m9a20: [3,4,3,3,3,0,3,3,4,3,3,0,4,3,2,2,3,0,3,4, 3,3,3,0,3,0,3],
      // ── Math 9 Quiz Scores (points-based) ──
      m9q1:  [8,10,6,8,8,5,7,8,10,8,7,5,10,8,6,5,7,4,8,10, 7,6,9,7,9,5,8],
      m9q2:  [7,10,6,7,8,4,7,8,10,7,7,5,9,7,5,5,7,4,7,10, 8,6,10,7,8,5,7],
      m9q3:  [12,15,9,12,12,7,10,12,15,11,10,7,14,11,8,7,11,6,12,15, 12,9,14,10,13,7,11],
      m9q4:  [8,10,6,8,8,5,7,8,10,8,7,5,10,8,6,5,7,4,8,10, 7,7,10,7,9,5,8],
      m9q5:  [7,10,6,8,8,5,7,8,10,8,7,5,9,7,6,5,7,4,7,10, 8,6,9,7,8,5,7],
      m9q6:  [8,10,7,8,8,5,7,8,10,8,7,5,10,7,6,5,8,4,8,10, 7,6,9,7,8,5,8],
      m9q7:  [12,15,10,13,12,7,11,13,15,12,11,7,14,12,9,7,12,6,12,15, 12,9,14,10,13,7,12],
      m9q8:  [8,10,6,8,8,5,7,8,10,8,7,5,10,8,6,5,7,4,8,10, 8,7,10,7,9,5,8],
      m9q9:  [7,10,6,8,7,5,7,8,10,7,7,5,9,7,5,5,7,4,7,10, 7,6,9,7,8,5,7],
      m9q10: [8,10,7,8,8,5,7,8,10,8,7,5,10,8,6,5,7,4,8,10, 8,7,10,7,8,5,8],
      m9q11: [7,10,6,8,8,5,7,8,10,8,7,0,9,7,6,5,7,0,8,10, 7,6,9,7,8,0,8],
      m9q12: [8,10,7,8,8,0,7,8,10,8,7,0,10,8,6,5,7,0,8,10, 8,0,10,7,9,0,8],
      // ── Math 9 Unit Test Scores (points-based) ──
      m9t1:  [40,48,32,42,41,26,35,42,49,40,37,26,47,40,28,26,37,23,40,48, 38,32,47,35,42,27,39],
      m9t2:  [49,57,37,50,49,31,43,50,58,49,44,30,56,48,33,30,44,28,49,57, 48,36,56,42,50,32,46],
      m9t3:  [40,48,33,42,41,27,36,43,49,41,38,26,47,40,28,25,37,23,41,48, 42,33,47,36,42,27,39],
      m9t4:  [41,48,33,43,42,27,37,43,49,41,38,0,47,40,28,26,37,0,41,48, 42,33,47,36,42,0,40],
      m9t5:  [65,76,53,67,67,0,57,68,77,65,58,0,75,64,44,42,58,0,65,76, 66,53,75,56,67,0,62]
    };
    saveScores('math9', buildScores(MIDS, math9Assessments, math9ScoreMap));

    // Score notes
    const m9sc = getScores('math9');
    (m9sc['m2']||[]).filter(e => e.assessmentId==='m9a2').forEach(e => { e.note = 'Flawless work. Extended by creating her own real-world linear relation problem and solving it algebraically.'; });
    (m9sc['m3']||[]).filter(e => e.assessmentId==='m9a1').forEach(e => { e.note = 'Struggled with the algebraic manipulation but persisted through three attempts before asking for help.'; });
    (m9sc['m13']||[]).filter(e => e.assessmentId==='m9a5').forEach(e => { e.note = 'Amara connected the compound interest formula to exponential growth patterns on her own. Impressive transfer.'; });
    (m9sc['m18']||[]).filter(e => e.assessmentId==='m9a6').forEach(e => { e.note = 'Still confusing variables and constants. Needs targeted intervention on algebraic foundations.'; });
    (m9sc['m20']||[]).filter(e => e.assessmentId==='m9a8').forEach(e => { e.note = 'Portfolio reflections show genuine metacognitive growth. Liv can articulate exactly where her thinking shifted.'; });
    // Jordan (m10) on Tessellation Design Project
    (m9sc['m10']||[]).filter(e => e.assessmentId==='m9a15').forEach(e => { e.note = 'Creative tessellation using rotations and reflections. Mathematical explanation of the transformations was clear.'; });
    // Caleb (m24) on Surface Area Challenge
    (m9sc['m24']||[]).filter(e => e.assessmentId==='m9a18').forEach(e => { e.note = 'Needs to slow down and draw the nets before calculating. Careless errors on composite shapes.'; });
    // Anisa (m25) on Budget Project
    (m9sc['m25']||[]).filter(e => e.assessmentId==='m9a9').forEach(e => { e.note = 'Anisa connected compound interest to her family\'s savings plan — authentic engagement with the math.'; });
    saveScores('math9', m9sc);

    // Quick obs
    saveQuickObs('math9', buildObs([
      { sid:'m1',  date:'2025-10-08', text:'Cece worked steadily through the rational numbers practice. She checks her work carefully and catches her own errors.',                           dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m1',  date:'2025-12-06', text:'Cece\'s geometry proof set was well-organized with clear reasoning at each step.',                                                                dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m1',  date:'2026-01-20', text:'Cece made a thoughtful connection between compound interest and her savings account during the financial literacy task.',                          dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m1',  date:'2026-02-15', text:'Took time to help a classmate understand polynomial terms during independent work. Patient and clear.',                                            dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'m1',  date:'2026-03-14', text:'Cece\'s portfolio reflections show genuine metacognitive awareness. She can articulate where her thinking shifted on each problem.',               dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'m2',  date:'2025-10-15', text:'Noor explained ratio concepts to a peer beautifully using the whiteboard. Clear mathematical communication.',                                    dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'m2',  date:'2026-02-14', text:'Solved the polynomial challenge problems independently and then created her own for classmates to try.',                                          dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m2',  date:'2025-12-06', text:'Noor finished the geometry proof set early and spent the remaining time exploring extensions. Her proofs are elegant.',                            dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'m2',  date:'2026-03-10', text:'Noor\'s portfolio reflections are the most detailed in the class. She traces her thinking process with precision.',                                dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m3',  date:'2025-10-02', text:'Sam is building confidence with rational numbers \u2014 attempted all problems today without avoidance. Big shift from September.',               dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'m3',  date:'2025-11-14', text:'Sam contributed a creative graph design to the statistics project that made the data story clearer.',                                               dims:['curiosity','engagement'],     sentiment:'strength', context:'small-group' },
      { sid:'m3',  date:'2026-01-17', text:'Sam asked a thoughtful question about why interest compounds \u2014 first time volunteering in whole-class math discussion.',                     dims:['curiosity','engagement'],     sentiment:'growth',   context:'whole-class' },
      { sid:'m3',  date:'2026-02-07', text:'Sam\'s polynomial test showed clear improvement from the beginning of the year. They are building real algebraic fluency.',                       dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'m3',  date:'2026-03-14', text:'Sam\'s portfolio includes honest reflections about what was hard and what strategies helped. Real metacognitive growth.',                           dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'m4',  date:'2025-10-24', text:'Liam\'s linear relations test was thorough and well-organized. He shows his work clearly at every step.',                                         dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m4',  date:'2025-12-10', text:'Liam helped a struggling classmate understand the Pythagorean theorem using a visual model he drew.',                                              dims:['collaboration'],             sentiment:'strength', context:'small-group' },
      { sid:'m4',  date:'2026-01-22', text:'Liam connected the financial literacy task to his parents\' mortgage. He asked detailed questions about amortization.',                            dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m4',  date:'2026-02-28', text:'Liam\'s data collection lab was methodical and precise. He recorded measurements carefully and organized them in a clear table.',                 dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'m4',  date:'2026-03-14', text:'Liam\'s portfolio shows consistent quality across all entries. He reflects on his process with specificity.',                                      dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m5',  date:'2026-03-10', text:'Mateo made a strong connection between the statistics project and his family\'s small business. Brought real data from home.',                    dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m5',  date:'2025-10-24', text:'Mateo struggled with the equation portion of the linear relations test but his graphing was strong.',                                              dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'m5',  date:'2025-12-06', text:'Mateo worked through geometry proofs with determination. He asked for feedback and revised two proofs during class.',                               dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'m5',  date:'2026-02-07', text:'Mateo\'s polynomial multiplication work was accurate and well-organized. He\'s becoming more methodical.',                                         dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m5',  date:'2026-02-28', text:'Mateo brought an authentic data set from his family\'s shop and analyzed sales trends. Meaningful math.',                                          dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m6',  date:'2025-11-07', text:'Ethan needed redirection during group work but contributed well once engaged. The financial literacy context seemed to motivate him.',              dims:['selfRegulation'],            sentiment:'concern',  context:'small-group' },
      { sid:'m6',  date:'2025-10-24', text:'Ethan rushed through the linear relations test. Several errors were careless rather than conceptual.',                                             dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'m6',  date:'2026-01-22', text:'Ethan showed real interest during the financial literacy task. He asked practical questions about budgeting and saving.',                           dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m6',  date:'2026-02-28', text:'Ethan completed the data collection lab with better focus than usual. Having a concrete task helped him stay on track.',                           dims:['engagement','selfRegulation'],sentiment:'growth',   context:'small-group' },
      { sid:'m6',  date:'2026-03-05', text:'Ethan asked for extra practice problems on polynomials \u2014 first time he\'s sought out additional work independently.',                        dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'m7',  date:'2026-01-22', text:'Jas made a creative connection between geometry proofs and building design. Brought in photos of bridges to illustrate triangular stability.',    dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m7',  date:'2025-10-24', text:'Jas\'s linear relations graphs are beautifully drawn and accurately scaled. He takes real care with visual representation.',                      dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m7',  date:'2025-11-14', text:'Jas created an infographic for the statistics project that communicated the data story more clearly than any written report.',                     dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m7',  date:'2026-02-07', text:'Jas helped two classmates visualize polynomial multiplication using area models he drew on the whiteboard.',                                       dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'m7',  date:'2026-03-14', text:'Jas\'s portfolio is visually stunning and mathematically strong. His geometric diagrams are publication quality.',                                 dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m8',  date:'2025-10-24', text:'Fatima\'s linear relations test showed strong understanding. She translates between representations fluently.',                                    dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m8',  date:'2025-12-06', text:'Fatima completed the geometry proofs with precision and then helped a classmate check their work.',                                                dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'m8',  date:'2026-01-17', text:'Fatima researched compound interest independently and brought examples that extended beyond the assignment requirements.',                          dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'m8',  date:'2026-02-28', text:'Fatima\'s data collection lab was meticulous. She organized the group, assigned roles, and ensured accurate recording.',                           dims:['collaboration','selfRegulation'], sentiment:'strength', context:'small-group' },
      { sid:'m8',  date:'2026-03-14', text:'Fatima\'s portfolio reflections show she can identify exactly which strategies worked and why. Strong metacognition.',                             dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m9',  date:'2025-11-14', text:'Priya designed the most visually clear statistical display in the class. Her graph choices communicated the data story effectively.',              dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m9',  date:'2025-12-06', text:'Priya\'s geometry proofs were thorough and her diagrams supported each step of her reasoning.',                                                    dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m9',  date:'2026-01-17', text:'Priya connected the financial literacy task to social inequality in access to banking. Showed real social awareness.',                             dims:['curiosity','respect'],        sentiment:'strength', context:'discussion' },
      { sid:'m9',  date:'2026-03-10', text:'Priya organized a peer study session before the portfolio was due. She made sure every student had a chance to share their reflections.',          dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'m10', date:'2025-10-24', text:'Jordan worked through the linear relations test methodically. He checks each answer against the graph before moving on.',                         dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m10', date:'2025-12-06', text:'Jordan\'s geometry work is consistently accurate. He\'s a quiet worker who produces reliable results.',                                           dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m10', date:'2026-01-28', text:'Jordan asked for feedback on his financial literacy task before submitting. Good initiative.',                                                      dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'m10', date:'2026-02-28', text:'Jordan contributed actively to the data collection lab \u2014 he suggested a better way to organize the group\'s data table.',                    dims:['collaboration','curiosity'],  sentiment:'strength', context:'small-group' },
      { sid:'m10', date:'2026-03-14', text:'Jordan\'s portfolio is well-organized and his reflections show growing awareness of his own thinking process.',                                    dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'m11', date:'2025-10-24', text:'Ines\'s linear relations test was strong across all sections. She moves between tables, graphs, and equations with ease.',                         dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m11', date:'2025-11-14', text:'Ines organized her statistics project group efficiently and made sure every member contributed meaningfully.',                                     dims:['collaboration','selfRegulation'], sentiment:'strength', context:'small-group' },
      { sid:'m11', date:'2026-01-22', text:'Ines asked a precise question about why different compound interest formulas exist. She does her own research.',                                   dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'m11', date:'2026-02-07', text:'Ines\'s polynomial test was thorough with all work shown. She catches her own errors before submitting.',                                          dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m11', date:'2026-03-14', text:'Ines\'s portfolio reflections are thoughtful and specific. She identifies which strategies worked and plans for next time.',                        dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'m12', date:'2026-01-28', text:'Marcus asked for help early when stuck on polynomial multiplication \u2014 good self-awareness. Showed improvement after one-on-one support.',    dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'m12', date:'2025-10-24', text:'Marcus found the linear relations test challenging. He got frustrated but stayed to finish every question.',                                       dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'m12', date:'2025-12-06', text:'Marcus struggled with geometry proofs but made progress when I broke the process into smaller steps for him.',                                      dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'m12', date:'2026-02-28', text:'Marcus was more engaged during the data collection lab than usual. He said collecting real data feels more meaningful.',                            dims:['engagement','curiosity'],     sentiment:'growth',   context:'small-group' },
      { sid:'m12', date:'2026-03-10', text:'Marcus\'s portfolio includes honest reflections about his struggles. His self-awareness about where he needs help has improved.',                  dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'m13', date:'2025-12-10', text:'Amara helped three classmates with geometry proofs during work time. Her explanations are clear and patient.',                                     dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'m13', date:'2025-10-24', text:'Amara\'s linear relations test was flawless. She included extensions that connected the math to population growth patterns.',                      dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'m13', date:'2026-02-07', text:'Amara spotted a pattern in the polynomial practice that simplified the process. She shared it with the class.',                                    dims:['curiosity','collaboration'],  sentiment:'strength', context:'whole-class' },
      { sid:'m13', date:'2026-03-14', text:'Amara\'s portfolio is exceptional. Her reflections trace her thinking with honesty and insight. She uses mathematical language naturally.',        dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m14', date:'2025-10-24', text:'Sofia\'s linear relations test was solid. She draws neat, accurate graphs with clear labels.',                                                     dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m14', date:'2025-12-06', text:'Sofia worked through geometry proofs carefully and helped verify a classmate\'s reasoning.',                                                        dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'m14', date:'2026-01-17', text:'Sofia\'s financial literacy task was well-organized. She created a realistic budget that showed practical understanding.',                          dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m14', date:'2026-02-28', text:'Sofia communicated her mathematical reasoning clearly during the data collection lab debrief.',                                                    dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'m14', date:'2026-03-14', text:'Sofia\'s portfolio is consistently well-done. She reflects on her process with specificity and sets clear goals.',                                 dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'m15', date:'2025-11-14', text:'Tyler participated actively in the statistics project when the topic interested him. He analyzed sports data with real engagement.',               dims:['engagement','curiosity'],     sentiment:'strength', context:'small-group' },
      { sid:'m15', date:'2026-01-17', text:'Tyler found the financial literacy task motivating. He asked practical questions about credit cards and loans.',                                    dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m15', date:'2026-02-07', text:'Tyler struggled with polynomial operations but stayed after class to work through practice problems. That effort matters.',                        dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'m15', date:'2026-02-28', text:'Tyler was more focused during the data collection lab today. He recorded data carefully when working with a structured partner.',                  dims:['selfRegulation','engagement'],sentiment:'growth',   context:'small-group' },
      { sid:'m15', date:'2026-03-14', text:'Tyler\'s portfolio shows growth over the year. His later entries are more detailed and reflective than his early ones.',                           dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'m16', date:'2025-10-24', text:'Aiden needs more support with linear relations. He confuses slope and y-intercept but shows willingness to learn.',                                dims:['resilience'],                sentiment:'concern',  context:'independent' },
      { sid:'m16', date:'2025-12-06', text:'Aiden worked carefully through the geometry proof set when given a structured template.',                                                           dims:['engagement','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'m16', date:'2026-01-22', text:'Aiden asked a good question about why interest rates matter. The practical context helped him engage.',                                             dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m16', date:'2026-02-28', text:'Aiden contributed well to the data collection lab \u2014 he was focused and careful with measurements.',                                           dims:['engagement','selfRegulation'],sentiment:'growth',   context:'small-group' },
      { sid:'m16', date:'2026-03-10', text:'Aiden\'s portfolio reflections show he is becoming more aware of where he struggles and what strategies help.',                                     dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'m17', date:'2025-12-03', text:'Olivia advocated clearly for her problem-solving approach during group work. Well-reasoned mathematical argument.',                                dims:['engagement','curiosity'],     sentiment:'strength', context:'discussion' },
      { sid:'m17', date:'2025-10-24', text:'Olivia\'s linear relations test included thoughtful explanations for each solution. She doesn\'t just get the answer \u2014 she explains why.',    dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m17', date:'2026-01-17', text:'Olivia asked a question about ethical investing during the financial literacy task. She thinks beyond the math.',                                   dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'m17', date:'2026-02-14', text:'Olivia made a connection between polynomial patterns and music theory. Creative cross-curricular thinking.',                                       dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m17', date:'2026-03-14', text:'Olivia\'s portfolio reflections are among the most insightful in the class. She articulates her mathematical growth with precision.',              dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m18', date:'2026-02-20', text:'Raj continues to struggle with algebraic foundations but showed real effort today. Completed the guided practice sheet with support.',             dims:['resilience'],                sentiment:'concern',  context:'independent' },
      { sid:'m18', date:'2025-10-24', text:'Raj found the linear relations test very challenging. We are developing a support plan to address foundational gaps.',                             dims:['resilience'],                sentiment:'concern',  context:'independent' },
      { sid:'m18', date:'2025-12-06', text:'Raj used a geometry app to visualize the proofs \u2014 the digital tools helped him understand relationships between angles.',                   dims:['curiosity','engagement'],     sentiment:'growth',   context:'independent' },
      { sid:'m18', date:'2026-01-17', text:'Raj showed real engagement with the financial literacy task. Practical, real-world math motivates him more than abstract algebra.',                dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'m18', date:'2026-03-14', text:'Raj\'s portfolio shows effort even if the mathematical content is still developing. His reflections are honest about what\'s hard.',               dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'m19', date:'2025-10-24', text:'Maya\'s linear relations test was strong. She translated between representations smoothly and explained her thinking.',                            dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m19', date:'2025-11-14', text:'Maya helped organize the statistics project survey and ensured the sample was representative. Thoughtful research design.',                        dims:['collaboration','curiosity'],  sentiment:'strength', context:'small-group' },
      { sid:'m19', date:'2026-01-22', text:'Maya connected the financial literacy task to her part-time job. She calculated her actual hourly rate after deductions.',                         dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m19', date:'2026-02-07', text:'Maya helped a classmate work through polynomial factoring. She explains without giving answers.',                                                  dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'m19', date:'2026-03-10', text:'Maya\'s portfolio reflections trace her mathematical growth honestly. She identifies specific moments where her understanding shifted.',           dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'m20', date:'2025-10-28', text:'Liv solved the equation challenge problems independently then helped set up the data collection activity without being asked.',                   dims:['engagement','collaboration'], sentiment:'strength', context:'independent' },
      { sid:'m20', date:'2025-12-06', text:'Liv\'s geometry proofs were elegant and efficient. She finds the most direct path to each conclusion.',                                            dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'m20', date:'2026-01-17', text:'Liv extended the financial literacy task by researching different savings strategies and comparing their long-term outcomes.',                      dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'m20', date:'2026-02-28', text:'Liv took on a leadership role during the data collection lab, organizing the group and ensuring accurate measurements.',                           dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'m21', date:'2025-10-08', text:'Hannah worked carefully through rational numbers practice. She double-checks her work and rarely makes careless errors.',                         dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m21', date:'2025-12-06', text:'Hannah\'s geometry proofs were well-structured. She labels each step clearly and her reasoning is easy to follow.',                                dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m21', date:'2026-01-22', text:'Hannah asked a thoughtful question about how compound interest affects student loans. Practical and relevant.',                                    dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'m21', date:'2026-02-07', text:'Hannah helped a classmate organize their polynomial work using colour-coding. Effective peer support strategy.',                                   dims:['collaboration'],             sentiment:'strength', context:'small-group' },
      { sid:'m21', date:'2026-03-14', text:'Hannah\'s portfolio shows consistent effort and thoughtful reflection. She sets specific, achievable goals.',                                      dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'m22', date:'2025-10-24', text:'Darius found the linear relations test challenging but stayed focused and attempted every question.',                                              dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'m22', date:'2025-12-06', text:'Darius struggles with formal proof writing but understands the geometric relationships when we discuss them verbally.',                             dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'m22', date:'2026-01-17', text:'The financial literacy context motivated Darius. He created a realistic monthly budget and asked practical questions.',                            dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m22', date:'2026-02-28', text:'Darius was engaged during the data collection lab. He recorded measurements carefully and contributed to the group analysis.',                     dims:['engagement','collaboration'], sentiment:'growth',   context:'small-group' },
      { sid:'m22', date:'2026-03-14', text:'Darius\'s portfolio reflections are honest about his challenges. He is developing better self-awareness about what he needs.',                    dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'m23', date:'2025-10-24', text:'Mei\'s linear relations test was one of the strongest in the class. She moves between representations fluidly.',                                  dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m23', date:'2025-11-14', text:'Mei\'s statistics project used sophisticated graphing techniques and her data analysis went well beyond requirements.',                            dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m23', date:'2026-01-22', text:'Mei derived the compound interest formula from first principles before I showed it to the class. Exceptional mathematical thinking.',             dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m23', date:'2026-02-07', text:'Mei found a pattern in polynomial multiplication that she shared with the class. Her mathematical communication is outstanding.',                 dims:['curiosity','collaboration'],  sentiment:'strength', context:'whole-class' },
      { sid:'m23', date:'2026-03-14', text:'Mei\'s portfolio is exceptional. Every entry shows depth of thought and her reflections connect mathematical concepts across the year.',           dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'m24', date:'2025-10-24', text:'Caleb\'s linear relations test was solid but he left two word problems blank. He finds translating words to equations difficult.',                 dims:['resilience'],                sentiment:'concern',  context:'independent' },
      { sid:'m24', date:'2025-12-06', text:'Caleb worked through geometry proofs with determination. He benefits from visual models and manipulatives.',                                       dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'m24', date:'2026-01-22', text:'Caleb asked a good question about why interest is calculated differently depending on the account type.',                                          dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'m24', date:'2026-02-28', text:'Caleb organized his group\'s data table clearly during the collection lab. He works well with structured tasks.',                                  dims:['collaboration','selfRegulation'], sentiment:'strength', context:'small-group' },
      { sid:'m24', date:'2026-03-14', text:'Caleb\'s portfolio shows gradual improvement. His later problem solutions include more explanation than his early ones.',                          dims:['resilience','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'m25', date:'2025-10-24', text:'Anisa\'s linear relations test was excellent. She explained every answer and showed alternative solution methods.',                                dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'m25', date:'2025-11-14', text:'Anisa\'s statistical analysis in the project was thorough and her conclusions were well-supported by evidence.',                                   dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'m25', date:'2026-01-22', text:'Anisa organized a study group before the financial literacy task. She leads with encouragement.',                                                   dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'m25', date:'2026-02-07', text:'Anisa helped three classmates understand polynomial multiplication using a method she developed herself.',                                         dims:['collaboration','curiosity'],  sentiment:'strength', context:'small-group' },
      { sid:'m25', date:'2026-03-14', text:'Anisa\'s portfolio is one of the strongest in the class. Her reflections show genuine mathematical thinking and self-awareness.',                  dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'m26', date:'2025-10-24', text:'Leo rushed through the linear relations test. Several errors were avoidable if he had slowed down.',                                               dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'m26', date:'2025-12-06', text:'Leo\'s geometry proofs improved when I gave him a structured template to follow. He needs clear frameworks.',                                       dims:['engagement','selfRegulation'],sentiment:'growth',   context:'independent' },
      { sid:'m26', date:'2026-01-17', text:'Leo engaged well with the financial literacy task. The practical context kept his attention.',                                                      dims:['engagement','curiosity'],     sentiment:'growth',   context:'independent' },
      { sid:'m26', date:'2026-02-28', text:'Leo contributed well to the data collection lab when given a specific measurement role.',                                                           dims:['engagement','collaboration'], sentiment:'growth',   context:'small-group' },
      { sid:'m26', date:'2026-03-14', text:'Leo\'s portfolio is improving. His reflections in the second half of the year are more detailed than early entries.',                               dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'m27', date:'2025-10-24', text:'Tessa\'s linear relations test was strong. She represented each problem in multiple ways and explained her reasoning.',                            dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'m27', date:'2025-11-14', text:'Tessa\'s statistics project included a creative data visualization that told the story more effectively than a standard bar graph.',               dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m27', date:'2026-01-17', text:'Tessa extended the financial literacy task by comparing different savings strategies over 10, 20, and 30 years.',                                  dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'m27', date:'2026-02-07', text:'Tessa helped a classmate see the pattern in polynomial operations by walking through examples step by step.',                                      dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'m27', date:'2026-03-14', text:'Tessa\'s portfolio reflections are detailed and show genuine metacognitive growth. She articulates her thinking process clearly.',                 dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' }
    ]));

    // Term ratings
    const m9TR = {};
    m9TR['m1']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Cece is a steady, reliable math student who checks her work carefully and catches her own errors. She would benefit from taking more risks with challenging problems and sharing her thinking more often in discussions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Cece has grown as a collaborator this term, helping classmates with polynomial concepts and writing more detailed portfolio reflections. Her metacognitive awareness is a real strength.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m2']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Noor is an exceptional mathematical thinker who consistently extends her learning beyond what is asked. She communicates mathematical ideas with precision and generously supports her peers. Her work is a model for the class.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Noor continues to lead by example. She creates challenge problems for classmates, and her portfolio reflections trace her thinking with remarkable precision. She is becoming a mathematical mentor for the class.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m3']  = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:3, resilience:3, curiosity:2, respect:4}, narrative:'Sam started the year lacking confidence with rational numbers but has shown genuine persistence. They attempt all problems now without avoidance, which is a meaningful shift. Small group work helps Sam feel safe to participate.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:4, curiosity:3, respect:4}, narrative:'Sam has built real algebraic fluency this term. They volunteered in a whole-class discussion for the first time and their portfolio reflections show honest metacognitive growth. The improvement from September is significant.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m4']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Liam is methodical and precise in his mathematical work. He shows all his steps clearly and helps classmates with visual models. His geometry diagrams are consistently excellent.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Liam continues to produce consistently strong work. He connected financial literacy to his family\'s mortgage and his data collection was meticulous. His curiosity about real-world applications is growing.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m5']  = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:4, respect:3}, narrative:'Mateo brings creativity to math but sometimes struggles with the procedural aspects. He makes strong real-world connections and his graphing skills are solid. He needs to develop more systematic approaches to algebra.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Mateo has become more methodical this term while keeping his creative spark. He brought authentic data from his family\'s business for the statistics project and his polynomial work is much more organized.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m6']  = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:2, curiosity:3, respect:3}, narrative:'Ethan struggles with sustained focus during math class, particularly during independent work. He engages more when problems have real-world context, like the financial literacy unit. He needs structured support and regular check-ins.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Ethan has shown encouraging growth. He asked for extra polynomial practice independently and was more focused during the data collection lab. The practical, hands-on math contexts continue to bring out his best work.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m7']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Jas excels at visual representation in math. His graphs, diagrams, and infographics are consistently the best in the class. He makes creative connections between math and design, and supports peers through visual models.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Jas has stepped up as a peer helper this term, using whiteboard area models to help classmates with polynomial multiplication. His portfolio is both mathematically strong and visually stunning.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m8']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Fatima is a self-directed math student who researches beyond what is required. She translates fluently between mathematical representations and helps organize group work with precision.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Fatima\'s self-direction has reached a new level this term. She researched compound interest independently, organized her group\'s data collection lab with meticulous care, and her portfolio reflections show strong metacognitive skills.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m9']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Priya brings thoughtfulness and care to her mathematical work. Her statistical displays are exemplary, and she is always willing to share her reasoning with the class.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Priya organized peer study sessions this term and connected financial literacy to issues of social inequality. She combines mathematical skill with genuine social awareness. A model for the class.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m10'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Jordan is a steady, methodical worker who produces consistently accurate results. He checks his answers carefully and works independently with focus. He could push himself to share his thinking more often in class discussions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Jordan suggested a better data organization method during the collection lab and sought feedback proactively on his financial literacy task. He is becoming more active in his own learning.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m11'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Ines is organized, efficient, and collaborative. She moves between mathematical representations with ease and ensures her group members contribute meaningfully. Her statistics project was a model of clear data communication.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ines has started asking deeper questions about mathematical concepts this term. She catches her own errors before submitting work and her portfolio reflections are specific and forward-looking.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m12'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Marcus finds many math concepts challenging but shows genuine persistence. He gets frustrated but keeps trying, and has started asking for help earlier rather than struggling alone. His resilience is his greatest mathematical asset.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:4, curiosity:3, respect:3}, narrative:'Marcus was more engaged with real data during the collection lab and his portfolio reflections show growing self-awareness. He seeks help earlier and responds well to targeted support. Genuine progress.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m13'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Amara combines deep mathematical understanding with genuine generosity. She helps peers without doing the work for them, asks questions that push everyone\'s thinking, and makes creative cross-curricular connections.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Amara spotted a simplifying pattern in polynomial multiplication that she shared with the class. Her portfolio is exceptional \u2014 she uses mathematical language naturally and traces her thinking with insight and honesty.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m14'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Sofia produces consistently solid mathematical work. Her graphs are neat, her proofs are organized, and she verifies her classmates\' reasoning. She could challenge herself further by exploring extensions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Sofia continues to be a dependable, thoughtful math student. Her financial literacy budget was realistic and well-organized, and she communicated her reasoning clearly during the data lab debrief.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m15'] = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:2, resilience:2, curiosity:2, respect:3}, narrative:'Tyler engages when topics interest him but struggles with sustained effort on abstract math. His statistics project using sports data was his strongest work. He needs more structured support and frequent check-ins.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:2, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Tyler showed growth this term. He stayed after class to work on polynomials, was more focused during the data lab, and his portfolio entries became more reflective over time. Practical math contexts bring out his best.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m16'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:2, curiosity:3, respect:3}, narrative:'Aiden finds algebra challenging and sometimes gives up too quickly. He shows more engagement when math has practical context and is willing to try when given structured templates. He needs to build confidence with multi-step problems.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Aiden worked more carefully through the geometry proofs with a structured template and was focused during the data lab. His portfolio reflections show he is becoming more aware of his own learning strategies.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m17'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Olivia is a deep thinker who explains her mathematical reasoning with clarity and precision. She asks questions that push the class\'s thinking and makes creative connections between math and other disciplines.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Olivia connected polynomial patterns to music theory this term and asked probing questions about ethical investing. Her portfolio reflections are among the most insightful in the class. A genuine mathematical thinker.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m18'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Raj shows perseverance when he engages with the math, but foundational gaps in algebra are holding him back. He benefits from structured one-on-one support and concrete manipulatives. We are working on building his number sense through targeted intervention.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:2, resilience:3, curiosity:3, respect:3}, narrative:'Raj engaged well with the financial literacy unit, which showed that practical context motivates him. He used a geometry app effectively to visualize proofs. His portfolio reflections are honest about his challenges, which is a form of strength.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m19'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Maya is a thoughtful, generous math student who helps peers without giving away answers. Her statistics project research design was impressively rigorous, and she consistently connects math to her own life.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Maya calculated her actual hourly rate after deductions for the financial literacy task \u2014 meaningful, personal math. She helps classmates work through polynomial factoring without doing it for them. A quiet leader.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m20'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Liv is an efficient, self-directed math student who finds elegant solutions and helps peers without being asked. Her proofs are among the most efficient in the class and she consistently extends her own learning.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Liv extended the financial literacy task by comparing long-term savings strategies and took a leadership role organizing the data collection lab. Her portfolio reflections show genuine metacognitive growth and articulate exactly where her thinking shifted.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m21'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Hannah is a careful, steady math student who double-checks her work and rarely makes careless errors. Her geometry proofs are well-structured and easy to follow. She could push herself by exploring more challenging problems.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Hannah helped a classmate organize their polynomial work using colour-coding and asked a thoughtful question about student loans. Her portfolio shows consistent effort and clear goal-setting.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m22'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Darius finds formal mathematical writing challenging but understands geometric relationships when we discuss them verbally. He shows persistence and is motivated by practical, real-world contexts.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Darius was more engaged with the financial literacy context and participated actively in the data collection lab. His portfolio reflections are becoming more honest and self-aware. Steady improvement.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m23'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mei is one of the strongest mathematicians in the class. She derived the compound interest formula from first principles and her statistics project used sophisticated techniques. She could develop further by sharing her expertise more actively.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Mei shared a polynomial pattern with the class this term and is becoming more collaborative. Her portfolio connects mathematical concepts across the year with exceptional depth. She is developing into a mathematical communicator as well as a thinker.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m24'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Caleb is a solid math student who works through problems with determination. He struggles with translating word problems to equations but his visual understanding of geometry is strong. He benefits from manipulatives and structured tasks.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Caleb asked a good question about interest rates and organized his group\'s data table clearly. His later portfolio entries include more explanation than his early ones, showing gradual growth in mathematical communication.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m25'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Anisa is an excellent math student who explains every answer and shows alternative methods. She leads study groups with encouragement and her statistical analysis goes beyond requirements.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Anisa developed her own method for polynomial multiplication and taught it to three classmates. Her portfolio is one of the strongest in the class, showing genuine mathematical thinking and self-awareness.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m26'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:2, curiosity:2, respect:3}, narrative:'Leo tends to rush through math work, leading to avoidable errors. He engages more with practical contexts and works better with clear, structured frameworks. He needs to develop patience with multi-step problems.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Leo engaged well with the financial literacy unit and contributed to the data collection lab when given a specific role. His portfolio reflections in the second half of the year are more detailed. He is learning to slow down.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    m9TR['m27'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Tessa is a strong math student who represents problems in multiple ways and explains her reasoning clearly. Her statistics project data visualization was creative and effective.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Tessa extended the financial literacy task by comparing savings strategies across decades and helped classmates with polynomial operations. Her portfolio reflections show genuine metacognitive growth and strong mathematical communication.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    saveTermRatings('math9', m9TR);
  }

  /* ════════════════════════════════════════════════════════════
     SOCIAL STUDIES 10 — SS10
     ════════════════════════════════════════════════════════════ */
  if (COURSES.ss10 && getStudents('ss10').length === 0) {
    saveCourseConfig('ss10', { reportAsPercentage: true });
    saveStudents('ss10', JSON.parse(JSON.stringify(SENIOR_ROSTER)));

    const ss10Assessments = [
      { id:'ss10a1', title:'Canadian Government Essay',          date:'2025-10-10', type:'summative',  tagIds:['USS','AS','ACA','AHU','EID','MRE'],       evidenceType:'written',     notes:'Analytical essay on the structure and function of Canadian government.', coreCompetencyIds:['COM','CRT'],     rubricId:'rub_ss10_essay', created: new Date('2025-10-10').toISOString() },
      { id:'ss10a2', title:'Treaty Research Project',            date:'2025-11-07', type:'summative',  tagIds:['USS','ACA','AS','CCC','AHU','EID','MRE'],evidenceType:'project',     notes:'In-depth research project on a specific treaty and its impacts on Indigenous communities.', coreCompetencyIds:['CRT','COM','SAR'], rubricId:'rub_ss10_hist', created: new Date('2025-11-07').toISOString() },
      { id:'ss10a3', title:'Current Events Journal',             date:'2025-11-28', type:'formative',  tagIds:['USS','ACA'],            evidenceType:'written',     notes:'Ongoing journal connecting current events to course themes.',              coreCompetencyIds:['CRT'],           created: new Date('2025-11-28').toISOString() },
      { id:'ss10a4', title:'Indigenous Rights Debate',           date:'2025-12-12', type:'summative',  tagIds:['USS','ACA','AS','CCC','EID','MRE','AHU'],      evidenceType:'observation', notes:'Structured debate on UNDRIP implementation in Canada.',                   coreCompetencyIds:['COM','COL','SAR'],rubricId:'rub_ss10_hist', created: new Date('2025-12-12').toISOString() },
      { id:'ss10a5', title:'Economic Systems Comparison',        date:'2026-01-24', type:'summative',  tagIds:['USS','ACA','AHU','CCC','EID','MRE'],      evidenceType:'written',     notes:'Comparing capitalism, socialism, and mixed economies in Canadian context.',coreCompetencyIds:['CRT','CT'],      rubricId:'rub_ss10_essay', created: new Date('2026-01-24').toISOString() },
      { id:'ss10a6', title:'Geography Map Skills Test',          date:'2026-02-14', type:'summative',  tagIds:['USS','AS','ACA','AHU','EID','MRE'],             evidenceType:'written',     notes:'Map reading, geographic analysis, and spatial reasoning.',                coreCompetencyIds:['CT'],            rubricId:'rub_ss10_essay', created: new Date('2026-02-14').toISOString() },
      { id:'ss10a7', title:'Historical Perspectives Analysis',   date:'2026-03-07', type:'summative',  tagIds:['USS','ACA','AS','EID','CCC','AHU','MRE'],evidenceType:'written',    notes:'Analyzing the internment of Japanese Canadians from multiple perspectives.', coreCompetencyIds:['CRT','SAR'],  rubricId:'rub_ss10_hist', created: new Date('2026-03-07').toISOString() },
      { id:'ss10a8', title:'Civic Participation Reflection',     date:'2026-03-18', type:'formative',  tagIds:['MRE','AHU'],            evidenceType:'written',     notes:'Personal reflection on civic engagement and democratic responsibility.',   coreCompetencyIds:['PAR','SAR'],     created: new Date('2026-03-18').toISOString() },
      { id:'ss10a9',  title:'Confederation Debate',              date:'2025-09-26', type:'summative',  tagIds:['USS','ACA','CCC','AHU','EID','MRE'],        evidenceType:'observation', notes:'Structured debate on whether Confederation was beneficial for all groups in Canada.', coreCompetencyIds:['COM','COL','CRT'], rubricId:'rub_ss10_debate', created: new Date('2025-09-26').toISOString() },
      { id:'ss10a10', title:'Residential Schools Research',      date:'2025-10-17', type:'summative',  tagIds:['USS','ACA','AS','EID','MRE','AHU','CCC'],  evidenceType:'project',     notes:'Research report on the history and legacy of residential schools in Canada.',          coreCompetencyIds:['CRT','COM','SAR'], rubricId:'rub_ss10_research', created: new Date('2025-10-17').toISOString() },
      { id:'ss10a11', title:'WWI Propaganda Analysis',           date:'2025-11-14', type:'summative',  tagIds:['USS','ACA','AS','CCC','EID'],        evidenceType:'written',     notes:'Analyze WWI propaganda posters for bias, audience, and persuasion techniques.',       coreCompetencyIds:['CRT','CT'],        rubricId:'rub_ss10_source', created: new Date('2025-11-14').toISOString() },
      { id:'ss10a12', title:'Immigration Policy Timeline',       date:'2025-12-05', type:'summative',  tagIds:['USS','ACA','AS','CCC','EID','AHU','MRE'],        evidenceType:'project',     notes:'Create an annotated timeline of Canadian immigration policy from 1867 to present.',   coreCompetencyIds:['CRT','CT'],        rubricId:'rub_ss10_hist', created: new Date('2025-12-05').toISOString() },
      { id:'ss10a13', title:'Charter of Rights Case Study',      date:'2026-01-09', type:'summative',  tagIds:['USS','ACA','MRE','AHU','EID'],        evidenceType:'written',     notes:'Analyze a Charter rights case and argue for or against the court\'s decision.',       coreCompetencyIds:['CRT','COM'],       rubricId:'rub_ss10_essay', created: new Date('2026-01-09').toISOString() },
      { id:'ss10a14', title:'Mapping Canada\'s Resources',       date:'2026-01-30', type:'summative',  tagIds:['USS','ACA','AS','CCC'],         evidenceType:'project',     notes:'Create a thematic map showing resource distribution and economic impact by region.',   coreCompetencyIds:['CT','CRT'],        rubricId:'rub_ss10_mapgeo', created: new Date('2026-01-30').toISOString() },
      { id:'ss10a15', title:'Current Events Quiz',               date:'2026-02-07', type:'formative',  tagIds:['USS','ACA'],              evidenceType:'quiz',        notes:'Short quiz connecting recent news to course themes.',                                  coreCompetencyIds:['CRT'],             created: new Date('2026-02-07').toISOString() },
      { id:'ss10a16', title:'Treaty Negotiation Simulation',     date:'2026-02-21', type:'summative',  tagIds:['EID','MRE','CCC','AHU'],  evidenceType:'observation', notes:'Role-play simulation of treaty negotiations from multiple perspectives.',              coreCompetencyIds:['COM','COL','SAR'], rubricId:'rub_ss10_perspective', created: new Date('2026-02-21').toISOString() },
      { id:'ss10a17', title:'Women\'s Suffrage Essay',           date:'2026-03-01', type:'summative',  tagIds:['USS','ACA','AHU','EID','MRE'],        evidenceType:'written',     notes:'Analytical essay on the women\'s suffrage movement in Canada and its lasting impact.', coreCompetencyIds:['CRT','COM'],       rubricId:'rub_ss10_essay', created: new Date('2026-03-01').toISOString() },
      { id:'ss10a18', title:'Cold War Perspectives',             date:'2026-03-14', type:'summative',  tagIds:['USS','ACA','CCC','EID','MRE','AHU'],        evidenceType:'written',     notes:'Compare Canadian, American, and Soviet perspectives on key Cold War events.',          coreCompetencyIds:['CRT','SAR'],       rubricId:'rub_ss10_perspective', created: new Date('2026-03-14').toISOString() },
      { id:'ss10a19', title:'Government Structure Diagram',      date:'2026-03-19', type:'formative',  tagIds:['USS','AS'],               evidenceType:'written',     notes:'Diagram the three levels of Canadian government with key responsibilities.',           coreCompetencyIds:['CT'],              created: new Date('2026-03-19').toISOString() },
      { id:'ss10a20', title:'Reconciliation Action Plan',        date:'2026-03-21', type:'summative',  tagIds:['USS','ACA','AS','EID','MRE','AHU','CCC'],  evidenceType:'project',     notes:'Research-based action plan for reconciliation initiatives in local community.',        coreCompetencyIds:['CRT','PAR','SAR'], rubricId:'rub_ss10_research', created: new Date('2026-03-21').toISOString() }
    ];
    // ── Social Studies 10 Points-Based Quizzes (12) ──
    ss10Assessments.push(
      { id:'ss10q1',  title:'Confederation Key Dates Quiz', date:'2025-09-24', type:'formative', tagIds:['AS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-09-24').toISOString() },
      { id:'ss10q2',  title:'Government Branches Quiz',     date:'2025-10-07', type:'formative', tagIds:['USS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-10-07').toISOString() },
      { id:'ss10q3',  title:'Treaty Terms Quiz',            date:'2025-10-22', type:'formative', tagIds:['ACA'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:15, created: new Date('2025-10-22').toISOString() },
      { id:'ss10q4',  title:'WWI Timeline Quiz',            date:'2025-11-05', type:'formative', tagIds:['AS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-11-05').toISOString() },
      { id:'ss10q5',  title:'Charter Rights Quiz',          date:'2025-11-19', type:'formative', tagIds:['USS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-11-19').toISOString() },
      { id:'ss10q6',  title:'Immigration Waves Quiz',       date:'2025-12-03', type:'formative', tagIds:['CCC'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-12-03').toISOString() },
      { id:'ss10q7',  title:'Map Reading Quiz',             date:'2025-12-17', type:'formative', tagIds:['USS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CT'],  scoreMode:'points', maxPoints:15, created: new Date('2025-12-17').toISOString() },
      { id:'ss10q8',  title:'Cold War Terms Quiz',          date:'2026-01-14', type:'formative', tagIds:['AS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-01-14').toISOString() },
      { id:'ss10q9',  title:'Indigenous Governance Quiz',    date:'2026-01-28', type:'formative', tagIds:['EID'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-01-28').toISOString() },
      { id:'ss10q10', title:'Economic Terms Quiz',           date:'2026-02-11', type:'formative', tagIds:['USS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-02-11').toISOString() },
      { id:'ss10q11', title:'Provincial Powers Quiz',        date:'2026-02-25', type:'formative', tagIds:['USS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-02-25').toISOString() },
      { id:'ss10q12', title:'Historical Figures Quiz',       date:'2026-03-11', type:'formative', tagIds:['AS'],  evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-03-11').toISOString() }
    );
    // ── Social Studies 10 Points-Based Unit Tests (5) ──
    ss10Assessments.push(
      { id:'ss10t1', title:'Confederation to WWI Test',     date:'2025-10-15', type:'summative', tagIds:['USS','AS','ACA'],      evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:60, created: new Date('2025-10-15').toISOString() },
      { id:'ss10t2', title:'Interwar Period Test',          date:'2025-11-26', type:'summative', tagIds:['AS','CCC','AHU'],      evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2025-11-26').toISOString() },
      { id:'ss10t3', title:'WWII & Cold War Test',          date:'2025-12-10', type:'summative', tagIds:['AS','AHU','EID'],      evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:60, created: new Date('2025-12-10').toISOString() },
      { id:'ss10t4', title:'Modern Canada Test',            date:'2026-02-04', type:'summative', tagIds:['USS','CCC','MRE'],     evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2026-02-04').toISOString() },
      { id:'ss10t5', title:'Mid-Year Comprehensive Exam',   date:'2026-03-04', type:'summative', tagIds:['USS','AS','ACA','EID'],evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:80, created: new Date('2026-03-04').toISOString() }
    );
    saveAssessments('ss10', ss10Assessments);

    /* ── Social Studies 10 Rubrics ── */
    const ss10Rubrics = [
      {
        id: 'rub_ss10_hist',
        name: 'Historical Analysis Rubric',
        criteria: [
          {
            id: 'crit_ss10_hist_inquiry',
            name: 'Inquiry & Evidence',
            tagIds: ['USS', 'ACA'],
            levels: {
              4: 'Formulates compelling research questions, critically evaluates primary and secondary sources, and builds arguments grounded in diverse evidence.',
              3: 'Develops clear research questions, evaluates source reliability, and uses evidence effectively to support arguments.',
              2: 'Poses basic research questions and uses some evidence, but source evaluation is limited or inconsistent.',
              1: 'Research questions are vague or absent; relies on a single source without evaluating its credibility.'
            }
          },
          {
            id: 'crit_ss10_hist_thinking',
            name: 'Historical Thinking',
            tagIds: ['AS', 'CCC', 'AHU'],
            levels: {
              4: 'Demonstrates nuanced understanding of historical significance, analyzes continuity and change over time, and explains complex cause-and-consequence relationships.',
              3: 'Identifies historical significance, describes continuity and change, and explains cause-and-consequence relationships with supporting evidence.',
              2: 'Recognizes some elements of significance and change but explanations of cause and consequence are simplistic.',
              1: 'Struggles to identify historical significance or explain how events are connected through cause and consequence.'
            }
          },
          {
            id: 'crit_ss10_hist_perspective',
            name: 'Perspective & Ethics',
            tagIds: ['EID', 'MRE'],
            levels: {
              4: 'Analyzes events from multiple perspectives with empathy and sophistication, making well-reasoned ethical judgments informed by historical context.',
              3: 'Considers multiple perspectives and makes ethical judgments that account for historical context.',
              2: 'Acknowledges that different perspectives exist but analysis remains one-sided; ethical reasoning is underdeveloped.',
              1: 'Views events from a single perspective without considering context; ethical judgments are absent or simplistic.'
            }
          }
        ]
      },
      {
        id: 'rub_ss10_essay',
        name: 'Essay & Writing Rubric',
        criteria: [
          {
            id: 'crit_ss10_essay_argument',
            name: 'Argument & Analysis',
            tagIds: ['USS', 'ACA', 'AHU'],
            levels: {
              4: 'Presents a compelling, original thesis supported by well-integrated evidence and sophisticated analytical reasoning throughout.',
              3: 'Presents a clear thesis supported by relevant evidence and sound reasoning.',
              2: 'States a thesis but evidence is insufficient or loosely connected; reasoning is present but underdeveloped.',
              1: 'Thesis is unclear or missing; evidence and reasoning do not support a coherent argument.'
            }
          },
          {
            id: 'crit_ss10_essay_comm',
            name: 'Communication',
            tagIds: ['EID', 'MRE'],
            levels: {
              4: 'Writes with exceptional clarity and purpose, demonstrating nuanced perspective-taking and ethical reasoning that enriches the analysis.',
              3: 'Writes clearly with appropriate perspective-taking and ethical reasoning integrated into the discussion.',
              2: 'Writing is understandable but perspective-taking is limited; ethical reasoning appears only superficially.',
              1: 'Writing lacks clarity and organization; perspective-taking and ethical reasoning are absent.'
            }
          }
        ]
      },
      {
        id: 'rub_ss10_source',
        name: 'Source Analysis Rubric',
        criteria: [
          {
            id: 'crit_ss10_source_ident',
            name: 'Source Identification',
            tagIds: ['USS', 'ACA'],
            levels: {
              4: 'Accurately identifies source type, origin, and intended audience, and explains how these factors shape the source\'s value as evidence.',
              3: 'Identifies source type and origin and explains how context influences the information presented.',
              2: 'Identifies basic source information but does not connect context to the reliability or usefulness of the source.',
              1: 'Cannot identify source type or origin; treats all sources as equally reliable without question.'
            }
          },
          {
            id: 'crit_ss10_source_bias',
            name: 'Bias Detection',
            tagIds: ['ACA', 'EID'],
            levels: {
              4: 'Identifies subtle biases and underlying assumptions, explaining how perspective and power dynamics shape the narrative.',
              3: 'Identifies clear biases and explains how the author\'s perspective influences the content.',
              2: 'Recognizes obvious bias when prompted but does not analyze how it shapes the message.',
              1: 'Does not recognize bias or assumes all sources are objective and neutral.'
            }
          },
          {
            id: 'crit_ss10_source_evidence',
            name: 'Evidence Evaluation',
            tagIds: ['USS', 'AS'],
            levels: {
              4: 'Evaluates evidence critically by cross-referencing sources, weighing conflicting accounts, and assessing overall reliability with nuance.',
              3: 'Evaluates evidence by comparing sources and assessing reliability based on clear criteria.',
              2: 'Accepts evidence at face value with minimal comparison; evaluation criteria are not clearly applied.',
              1: 'Does not evaluate evidence; uses information without considering accuracy or reliability.'
            }
          }
        ]
      },
      {
        id: 'rub_ss10_debate',
        name: 'Debate & Discussion Rubric',
        criteria: [
          {
            id: 'crit_ss10_debate_argument',
            name: 'Argument Construction',
            tagIds: ['USS', 'AHU'],
            levels: {
              4: 'Constructs compelling, well-structured arguments supported by diverse evidence and anticipates counterarguments proactively.',
              3: 'Constructs clear arguments supported by relevant evidence and historical examples.',
              2: 'Presents a position but arguments lack depth or rely on opinion rather than evidence.',
              1: 'Cannot construct a coherent argument; statements are unsupported assertions.'
            }
          },
          {
            id: 'crit_ss10_debate_rebuttal',
            name: 'Rebuttal & Response',
            tagIds: ['ACA', 'EID'],
            levels: {
              4: 'Responds to opposing arguments with precision, using evidence to respectfully dismantle weak reasoning while acknowledging valid points.',
              3: 'Responds to opposing arguments with relevant evidence and addresses key weaknesses in the counterargument.',
              2: 'Attempts to respond to opposing arguments but rebuttals lack evidence or miss the main point.',
              1: 'Ignores or dismisses opposing arguments without engagement; unable to formulate a rebuttal.'
            }
          },
          {
            id: 'crit_ss10_debate_respect',
            name: 'Respect & Engagement',
            tagIds: ['MRE'],
            levels: {
              4: 'Models respectful discourse by actively listening, inviting diverse viewpoints, and elevating the quality of discussion for everyone.',
              3: 'Engages respectfully, listens to others, and contributes to a productive discussion environment.',
              2: 'Generally respectful but tends to interrupt or disengage when others are speaking.',
              1: 'Disrespectful or disengaged during discussion; does not listen to or acknowledge others\' contributions.'
            }
          }
        ]
      },
      {
        id: 'rub_ss10_research',
        name: 'Research Report Rubric',
        criteria: [
          {
            id: 'crit_ss10_research_thesis',
            name: 'Thesis & Structure',
            tagIds: ['USS'],
            levels: {
              4: 'Presents a sophisticated, arguable thesis with a structure that builds the argument progressively and guides the reader with clarity.',
              3: 'Presents a clear thesis with a logical structure that supports the development of the argument.',
              2: 'Thesis is present but broad or descriptive rather than arguable; structure is loosely organized.',
              1: 'Thesis is missing or unclear; report lacks organizational structure.'
            }
          },
          {
            id: 'crit_ss10_research_evidence',
            name: 'Evidence Integration',
            tagIds: ['ACA', 'AHU'],
            levels: {
              4: 'Integrates evidence from diverse sources seamlessly, using it to build a layered and convincing argument throughout the report.',
              3: 'Integrates evidence from multiple sources to support the thesis effectively.',
              2: 'Includes some evidence but it is dropped in without analysis or clear connection to the thesis.',
              1: 'Evidence is absent or irrelevant; claims are unsupported by research.'
            }
          },
          {
            id: 'crit_ss10_research_conclusion',
            name: 'Conclusion & Significance',
            tagIds: ['AS', 'MRE'],
            levels: {
              4: 'Conclusion synthesizes findings insightfully, articulates broader significance, and raises compelling questions for further inquiry.',
              3: 'Conclusion summarizes key findings and explains why the topic matters in a broader context.',
              2: 'Conclusion restates the thesis but does not address significance or broader implications.',
              1: 'Conclusion is missing or simply repeats the introduction without synthesis.'
            }
          }
        ]
      },
      {
        id: 'rub_ss10_mapgeo',
        name: 'Map & Geography Skills Rubric',
        criteria: [
          {
            id: 'crit_ss10_mapgeo_spatial',
            name: 'Spatial Analysis',
            tagIds: ['USS', 'CCC'],
            levels: {
              4: 'Analyzes spatial relationships with sophistication, explaining how geography shapes historical events, trade, migration, and power dynamics.',
              3: 'Identifies spatial relationships and explains how geographic factors influence historical developments.',
              2: 'Reads maps accurately but analysis of spatial relationships is surface-level or incomplete.',
              1: 'Struggles to read maps or identify basic geographic features; cannot connect geography to historical events.'
            }
          },
          {
            id: 'crit_ss10_mapgeo_data',
            name: 'Data Interpretation',
            tagIds: ['ACA', 'AS'],
            levels: {
              4: 'Interprets geographic data critically, identifying trends, drawing comparative conclusions, and questioning data reliability.',
              3: 'Interprets geographic data accurately and draws reasonable conclusions from maps and charts.',
              2: 'Extracts basic information from maps but does not draw conclusions or identify patterns.',
              1: 'Cannot interpret geographic data from maps or charts without direct teacher assistance.'
            }
          }
        ]
      },
      {
        id: 'rub_ss10_perspective',
        name: 'Perspective-Taking Rubric',
        criteria: [
          {
            id: 'crit_ss10_perspective_empathy',
            name: 'Historical Empathy',
            tagIds: ['EID', 'CCC'],
            levels: {
              4: 'Demonstrates deep historical empathy by placing themselves within the worldview and constraints of the time period without projecting modern values.',
              3: 'Shows genuine effort to understand perspectives within their historical context, avoiding presentism.',
              2: 'Attempts to consider historical perspectives but frequently applies modern values or stereotypes.',
              1: 'Views historical figures through a modern lens only; does not attempt to understand the context of their decisions.'
            }
          },
          {
            id: 'crit_ss10_perspective_ethics',
            name: 'Ethical Reasoning',
            tagIds: ['MRE', 'AHU'],
            levels: {
              4: 'Engages in nuanced ethical reasoning that balances historical context with universal principles, acknowledging complexity and ambiguity.',
              3: 'Makes ethical judgments that consider historical context while applying principled reasoning.',
              2: 'Makes ethical judgments but they are simplistic or do not account for the complexity of the historical situation.',
              1: 'Avoids ethical reasoning entirely or makes judgments based on personal feelings without reference to evidence or context.'
            }
          }
        ]
      }
    ];
    saveRubrics('ss10', ss10Rubrics);

    // Distribution: Extending(sr1,sr4,sr7,sr13), Proficient(sr2,sr3,sr5,sr6,sr8,sr9,sr10,sr11,sr14,sr15,sr17,sr19), Developing(sr12,sr16,sr18,sr20), Emerging(sr16 early)
    const ss10ScoreMap = {
      ss10a1: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,1,3,2,3,2, 3,3,4,2,3,3,3],
      ss10a2: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,2,4,3,3,3,3],
      ss10a3: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 4,3,3,2,3,3,3],
      ss10a4: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,3,4,3,3,2,4],
      ss10a5: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,2,3,3,4,3,3],
      ss10a6: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,3,4,2,3,3,3],
      ss10a7: [4,3,4,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,0, 3,3,4,3,3,2,3],
      ss10a8: [4,3,3,4,3,3,4,3,3,3,0,2,4,3,3,2,3,0,3,0, 3,2,3,3,4,0,3],
      ss10a9:  [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,1,3,2,3,2, 3,3,4,2,3,3,3],
      ss10a10: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,2,4,3,3,3,3],
      ss10a11: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 4,3,3,2,3,3,3],
      ss10a12: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,3,4,3,3,2,4],
      ss10a13: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,2,3,3,4,3,3],
      ss10a14: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,3,4,2,3,3,3],
      ss10a15: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,3,3,3,3,3,3],
      ss10a16: [4,3,4,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,2, 3,3,4,3,3,2,3],
      ss10a17: [4,3,3,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,0, 4,3,4,3,3,3,3],
      ss10a18: [4,3,4,4,3,3,4,3,3,3,3,2,4,3,3,2,3,2,3,0, 3,3,4,3,3,2,3],
      ss10a19: [4,3,3,4,3,3,4,3,3,3,0,2,4,3,3,2,3,0,3,0, 3,3,3,2,3,0,3],
      ss10a20: [4,3,3,4,3,3,4,3,3,3,0,0,4,3,3,2,3,0,3,0, 3,2,4,0,3,0,3],
      // ── Social Studies 10 Quiz Scores (points-based) ──
      ss10q1:  [9,8,7,10,8,7,9,7,8,8,7,5,10,8,7,4,7,5,7,5, 8,6,9,6,8,7,8],
      ss10q2:  [8,7,7,9,8,7,9,7,8,7,7,5,10,7,7,5,7,5,7,5, 8,6,9,6,8,7,7],
      ss10q3:  [13,11,10,14,12,10,14,10,12,11,10,7,15,11,10,7,10,7,10,7, 12,9,13,9,12,10,11],
      ss10q4:  [9,7,7,10,8,7,9,7,8,7,7,5,10,8,7,5,7,5,7,5, 9,6,9,6,8,7,7],
      ss10q5:  [8,7,7,9,8,7,9,7,8,7,7,5,10,7,7,5,7,5,7,5, 8,6,9,6,8,7,7],
      ss10q6:  [8,7,7,9,7,7,9,7,8,7,7,5,9,7,7,4,7,5,7,5, 8,5,9,6,8,7,7],
      ss10q7:  [13,11,10,14,12,10,14,10,12,11,10,7,15,11,10,7,10,7,10,7, 12,9,13,9,12,10,11],
      ss10q8:  [9,7,7,10,8,7,9,7,8,7,7,5,10,7,7,5,7,5,7,5, 8,6,9,6,8,7,8],
      ss10q9:  [8,7,7,9,8,7,9,7,8,7,7,5,10,7,7,5,7,5,7,5, 8,6,9,6,8,7,7],
      ss10q10: [9,7,7,10,8,7,9,7,8,8,7,5,10,8,7,5,7,5,7,5, 8,6,9,6,8,7,8],
      ss10q11: [8,7,7,9,8,7,9,7,8,7,0,5,10,7,7,5,7,0,7,0, 8,6,9,6,8,0,7],
      ss10q12: [9,7,7,10,8,0,9,7,8,7,0,0,10,8,7,5,7,0,7,0, 8,0,9,6,8,0,8],
      // ── Social Studies 10 Unit Test Scores (points-based) ──
      ss10t1:  [52,42,40,56,47,40,54,40,46,44,42,28,57,46,40,24,40,28,40,28, 48,34,52,34,46,40,44],
      ss10t2:  [43,36,34,47,39,34,45,34,38,37,35,24,48,38,34,21,34,24,34,24, 40,29,44,29,39,34,37],
      ss10t3:  [52,42,42,56,47,40,54,40,46,44,42,28,57,46,40,24,40,28,40,28, 48,35,52,34,46,40,44],
      ss10t4:  [43,36,34,47,39,34,45,34,38,37,0,24,48,38,34,21,34,0,34,0, 40,29,44,29,39,0,37],
      ss10t5:  [69,58,56,75,63,0,72,54,61,58,0,0,76,61,54,34,54,0,54,0, 64,46,70,0,63,0,58]
    };
    saveScores('ss10', buildScores(SRIDS, ss10Assessments, ss10ScoreMap));

    // Score notes
    const ss10sc = getScores('ss10');
    (ss10sc['sr1']||[]).filter(e => e.assessmentId==='ss10a2').forEach(e => { e.note = 'Zara\'s treaty research was the most thorough in the class. She interviewed an Elder from a local First Nation and incorporated oral history.'; });
    (ss10sc['sr4']||[]).filter(e => e.assessmentId==='ss10a4').forEach(e => { e.note = 'Dev\'s debate preparation was meticulous. He anticipated counterarguments and had evidence ready for each point.'; });
    (ss10sc['sr7']||[]).filter(e => e.assessmentId==='ss10a7').forEach(e => { e.note = 'Hana brought genuine emotional depth to the perspectives analysis while maintaining analytical rigour.'; });
    (ss10sc['sr16']||[]).filter(e => e.assessmentId==='ss10a1').forEach(e => { e.note = 'Essay showed basic understanding but lacked specific evidence. Needs to integrate more primary sources.'; });
    (ss10sc['sr12']||[]).filter(e => e.assessmentId==='ss10a5').forEach(e => { e.note = 'Jamal\'s comparison was descriptive rather than analytical. We discussed how to move from "what" to "why" in his writing.'; });
    // Isla (sr3) on Treaty Negotiation Simulation
    (ss10sc['sr3']||[]).filter(e => e.assessmentId==='ss10a16').forEach(e => { e.note = 'Isla stayed in character throughout and made nuanced arguments rooted in historical evidence. Outstanding perspective-taking.'; });
    // Nina (sr21) on WWI Propaganda Analysis
    (ss10sc['sr21']||[]).filter(e => e.assessmentId==='ss10a11').forEach(e => { e.note = 'Nina identified subtle visual techniques that most students missed. Her analysis of colour symbolism was sophisticated.'; });
    saveScores('ss10', ss10sc);

    // Quick obs
    saveQuickObs('ss10', buildObs([
      { sid:'sr1',  date:'2025-10-15', text:'Zara made a powerful connection between the treaty research and her own family\'s experience with colonialism. Shared with the class respectfully.',   dims:['engagement','respect'],      sentiment:'strength', context:'whole-class' },
      { sid:'sr1',  date:'2026-01-30', text:'Consistently brings current news articles that connect to course themes. Today she linked a CBC article to our economic systems discussion.',          dims:['curiosity','engagement'],    sentiment:'strength', context:'discussion' },
      { sid:'sr1',  date:'2025-11-07', text:'Zara\'s treaty research incorporated oral history from a local Elder. She handled the interview process with real cultural sensitivity.',              dims:['respect','curiosity'],        sentiment:'strength', context:'independent' },
      { sid:'sr1',  date:'2026-03-07', text:'Zara\'s Japanese internment perspectives analysis was the most nuanced in the class. She balanced emotional depth with analytical rigour.',           dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr2',  date:'2025-10-10', text:'Owen\'s government essay showed solid understanding of parliamentary structure. His thesis was clear and well-supported.',                              dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr2',  date:'2025-12-12', text:'Owen contributed thoughtful points during the Indigenous rights debate. He listened well and built on others\' arguments.',                            dims:['engagement','collaboration'], sentiment:'strength', context:'discussion' },
      { sid:'sr2',  date:'2026-01-24', text:'Owen\'s economic systems comparison was thorough. He connected Canadian mixed economy features to specific policy examples.',                          dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr2',  date:'2026-02-14', text:'Owen helped a classmate interpret topographic map features. Patient and clear explanations.',                                                          dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'sr2',  date:'2026-03-18', text:'Owen\'s civic participation reflection showed genuine thought about democratic responsibility. He connected it to local municipal issues.',            dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr3',  date:'2025-11-07', text:'Isla\'s treaty research showed empathy and analytical skill. She identified perspectives that other students hadn\'t considered.',                     dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr3',  date:'2025-12-12', text:'Isla made a nuanced point during the debate about the difference between intent and impact in Indigenous policy.',                                     dims:['curiosity','engagement'],     sentiment:'strength', context:'discussion' },
      { sid:'sr3',  date:'2026-01-24', text:'Isla connected economic systems to environmental policy \u2014 a perspective that enriched the class discussion.',                                    dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'sr3',  date:'2026-03-07', text:'Isla volunteered to analyze the most complex perspective in the Japanese internment study. Her writing showed real historical empathy.',               dims:['engagement','resilience'],    sentiment:'strength', context:'independent' },
      { sid:'sr3',  date:'2026-03-18', text:'Isla\'s civic reflection connected democratic responsibility to her own volunteer work. Authentic and thoughtful.',                                    dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr4',  date:'2025-12-12', text:'Dev\'s debate performance was outstanding. He remained respectful while making sharp analytical points. Other students were visibly impressed.',       dims:['engagement','respect'],      sentiment:'strength', context:'presentation' },
      { sid:'sr4',  date:'2026-02-20', text:'Asked a probing question about whether economic inequality is a cause or consequence of political systems. Sparked a 15-minute class discussion.',   dims:['curiosity'],                 sentiment:'strength', context:'discussion' },
      { sid:'sr4',  date:'2025-10-15', text:'Dev\'s government essay demonstrated sophisticated analytical reasoning. He used multiple primary sources to support his thesis.',                    dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr4',  date:'2026-03-07', text:'Dev\'s perspectives analysis on Japanese internment was exceptional. He showed how one policy could be viewed through five different lenses.',         dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr5',  date:'2026-02-25', text:'Chloe brought genuine empathy to the perspectives analysis. Her writing on the Japanese Canadian experience was deeply thoughtful.',                  dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr5',  date:'2025-11-07', text:'Chloe\'s treaty research showed careful attention to source evaluation. She identified bias in two textbook accounts.',                               dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr5',  date:'2025-12-12', text:'Chloe listened actively during the debate and asked clarifying questions that deepened the discussion.',                                               dims:['respect','curiosity'],        sentiment:'strength', context:'discussion' },
      { sid:'sr5',  date:'2026-01-24', text:'Chloe\'s economic systems comparison was well-organized with clear topic sentences. She is developing strong essay structure.',                       dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr5',  date:'2026-03-18', text:'Chloe\'s civic reflection connected voting rights to social studies themes we covered this year. Thoughtful synthesis.',                               dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr6',  date:'2025-11-12', text:'Kai showed thoughtful sensitivity during the treaty discussion, listening carefully before offering their perspective.',                              dims:['respect','collaboration'],    sentiment:'strength', context:'discussion' },
      { sid:'sr6',  date:'2025-10-10', text:'Kai\'s government essay included perspectives from Indigenous governance systems alongside Canadian parliamentary structure. Original thinking.',     dims:['curiosity','respect'],        sentiment:'strength', context:'independent' },
      { sid:'sr6',  date:'2026-01-24', text:'Kai raised a thoughtful question about how economic systems affect marginalized communities differently.',                                             dims:['curiosity','respect'],        sentiment:'strength', context:'whole-class' },
      { sid:'sr6',  date:'2026-02-14', text:'Kai helped a classmate who was struggling with the map skills content. They explained spatial relationships clearly.',                                 dims:['collaboration'],             sentiment:'strength', context:'small-group' },
      { sid:'sr6',  date:'2026-03-18', text:'Kai\'s civic participation reflection was deeply personal and showed genuine commitment to social justice.',                                           dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr7',  date:'2026-03-10', text:'Hana volunteered to present the most difficult perspective in the Japanese internment analysis. Handled it with maturity and nuance.',                dims:['engagement','resilience'],    sentiment:'strength', context:'presentation' },
      { sid:'sr7',  date:'2025-10-10', text:'Hana\'s government essay was analytically strong. She argued her thesis with confidence and used specific constitutional references.',                dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr7',  date:'2025-12-12', text:'Hana was one of the strongest debaters in the class. She anticipated counterarguments and responded with evidence.',                                  dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'sr7',  date:'2026-01-24', text:'Hana\'s economic systems essay connected theoretical frameworks to specific Canadian policy decisions. Sophisticated analysis.',                       dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr8',  date:'2025-10-15', text:'Luca\'s government essay was solid with a clear thesis. He could strengthen his work by using more primary sources.',                                  dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr8',  date:'2025-12-12', text:'Luca contributed effectively to the debate when given preparation time. His points were well-reasoned.',                                              dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'sr8',  date:'2026-01-24', text:'Luca compared Canadian and Italian economic approaches \u2014 he drew on his family background to bring a unique perspective.',                       dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'sr8',  date:'2026-02-14', text:'Luca\'s map skills test showed solid geographic reasoning. He interpreted spatial data accurately.',                                                  dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr8',  date:'2026-03-07', text:'Luca\'s perspectives analysis was thoughtful. He showed genuine empathy for the Japanese Canadian experience.',                                       dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr9',  date:'2025-11-30', text:'Ava\'s current events journal entries are consistently insightful \u2014 she connects patterns across different events with real analytical skill.',   dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'sr9',  date:'2025-10-10', text:'Ava\'s government essay was well-researched. She used four different sources and evaluated their credibility.',                                       dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr9',  date:'2026-01-24', text:'Ava asked a probing question about whether capitalism is inherently compatible with environmental sustainability.',                                   dims:['curiosity'],                 sentiment:'strength', context:'discussion' },
      { sid:'sr9',  date:'2026-03-07', text:'Ava\'s Japanese internment analysis showed sophisticated perspective-taking. She avoided presentism while still making ethical judgments.',            dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr9',  date:'2026-03-18', text:'Ava\'s civic reflection was one of the most analytical in the class. She connected course themes to current Canadian debates with precision.',        dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr10', date:'2025-10-10', text:'Ravi\'s government essay demonstrated solid understanding. He writes clearly and organizes his arguments logically.',                                  dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr10', date:'2025-12-12', text:'Ravi participated actively in the debate, citing specific evidence to support his arguments.',                                                         dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'sr10', date:'2026-01-24', text:'Ravi connected economic inequality to health outcomes he learned about in another class. Good cross-curricular thinking.',                             dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'sr10', date:'2026-02-14', text:'Ravi\'s map skills test was strong. He interpreted geographic data accurately and drew reasonable conclusions.',                                       dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr10', date:'2026-03-18', text:'Ravi\'s civic participation reflection was thoughtful and connected democratic responsibility to his own community involvement.',                      dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr11', date:'2025-10-10', text:'Elena\'s government essay was well-written with a clear argument structure. She is a strong academic writer.',                                         dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr11', date:'2025-11-07', text:'Elena contributed a unique perspective to the treaty research, connecting Canadian treaty-making to her family\'s experience as immigrants.',          dims:['curiosity','respect'],        sentiment:'strength', context:'whole-class' },
      { sid:'sr11', date:'2026-01-24', text:'Elena\'s economic systems essay compared Canadian policy with experiences from her parents\' home country. Powerful personal connection.',             dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr11', date:'2026-02-14', text:'Elena helped organize a group study session before the map skills test. She made sure every member of the group understood the material.',            dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'sr11', date:'2026-03-07', text:'Elena brought emotional depth to the Japanese internment analysis while maintaining analytical rigour. Her writing is maturing.',                      dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr12', date:'2026-01-15', text:'Jamal participated actively in small-group discussion for the first time this term. His contributions showed real understanding of cause and consequence.', dims:['engagement'],          sentiment:'growth',   context:'small-group' },
      { sid:'sr12', date:'2025-11-07', text:'Jamal found the treaty research project challenging. He needed support structuring his argument but his ideas were sound.',                            dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'sr12', date:'2026-02-14', text:'Jamal\'s map skills test showed improvement. He studied independently and his geographic reasoning was solid.',                                       dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'sr12', date:'2026-03-07', text:'Jamal\'s perspectives analysis showed he can engage with complex historical content when given enough time and structure.',                            dims:['engagement','resilience'],    sentiment:'growth',   context:'independent' },
      { sid:'sr12', date:'2026-03-18', text:'Jamal\'s civic reflection was his strongest piece of writing this year. He connected democratic responsibility to his own neighbourhood.',            dims:['engagement','curiosity'],     sentiment:'growth',   context:'independent' },
      { sid:'sr13', date:'2025-11-20', text:'Yuki organized a study group before the treaty project was due. She made sure everyone understood the rubric expectations.',                          dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'sr13', date:'2025-10-10', text:'Yuki\'s government essay was thorough and well-researched. She anticipated counterarguments within her analysis.',                                    dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr13', date:'2026-01-24', text:'Yuki connected Japanese Canadian internment to broader patterns of wartime xenophobia across different countries.',                                    dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'sr13', date:'2026-02-14', text:'Yuki\'s map skills test was excellent. She identified spatial patterns that other students missed.',                                                   dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr13', date:'2026-03-18', text:'Yuki\'s civic reflection was one of the most sophisticated in the class. She questioned the limitations of representative democracy.',                dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'sr14', date:'2025-10-15', text:'Marco\'s government essay showed clear understanding. He could strengthen his analysis by exploring more than one perspective.',                       dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr14', date:'2025-12-12', text:'Marco was a strong debater \u2014 he used specific historical evidence and responded to counterarguments effectively.',                               dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'sr14', date:'2026-01-24', text:'Marco connected economic policy to immigration patterns \u2014 drew on his family\'s experience coming to Canada.',                                  dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'sr14', date:'2026-02-14', text:'Marco helped a classmate understand the difference between political and physical maps. Clear, patient explanation.',                                  dims:['collaboration'],             sentiment:'strength', context:'small-group' },
      { sid:'sr14', date:'2026-03-18', text:'Marco\'s civic participation reflection connected his family\'s immigration journey to democratic values. Personal and analytical.',                   dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr15', date:'2025-10-10', text:'Aria\'s government essay was well-structured with a clear thesis. She writes with precision and evidence.',                                            dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr15', date:'2025-12-12', text:'Aria contributed measured, evidence-based points during the debate. She listens before responding.',                                                   dims:['respect','engagement'],       sentiment:'strength', context:'discussion' },
      { sid:'sr15', date:'2026-01-24', text:'Aria connected economic inequality to gender disparities in Canadian history. Insightful analysis.',                                                   dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'sr15', date:'2026-03-07', text:'Aria\'s Japanese internment analysis showed careful source evaluation and genuine historical empathy.',                                                dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr15', date:'2026-03-18', text:'Aria\'s civic reflection was thoughtful and connected course themes to environmental activism she is involved in.',                                   dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr16', date:'2025-10-22', text:'Tariq needed significant support to get started on the essay but produced reasonable work once he had a clear outline.',                              dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'sr16', date:'2026-02-18', text:'Tariq\'s map skills test showed real improvement. He studied independently and it showed \u2014 best work from him so far.',                          dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'sr16', date:'2025-12-12', text:'Tariq struggled during the debate but contributed a thoughtful written response afterward. He expresses himself better in writing.',                   dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'sr16', date:'2026-03-07', text:'Tariq\'s Japanese internment analysis was his most detailed piece of writing this year. He is building analytical stamina.',                           dims:['engagement','resilience'],    sentiment:'growth',   context:'independent' },
      { sid:'sr17', date:'2025-10-10', text:'Mila\'s government essay was well-organized and clearly argued. She uses evidence effectively.',                                                      dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr17', date:'2025-11-07', text:'Mila brought a human rights lens to the treaty research that enriched the class discussion.',                                                         dims:['curiosity','respect'],        sentiment:'strength', context:'whole-class' },
      { sid:'sr17', date:'2026-01-24', text:'Mila asked a thought-provoking question about whether economic growth always benefits everyone equally.',                                              dims:['curiosity'],                 sentiment:'strength', context:'discussion' },
      { sid:'sr17', date:'2026-03-07', text:'Mila\'s perspectives analysis was empathetic and analytically strong. She balanced multiple viewpoints with skill.',                                   dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr17', date:'2026-03-18', text:'Mila\'s civic reflection connected her Polish heritage to Canadian multicultural policy. Personal and historically grounded.',                         dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr18', date:'2026-01-10', text:'Jesse respectfully challenged the textbook\'s framing of an historical event, citing an Indigenous author he found independently.',                   dims:['curiosity','respect'],        sentiment:'strength', context:'whole-class' },
      { sid:'sr18', date:'2025-11-07', text:'Jesse\'s treaty research showed genuine engagement with Indigenous perspectives. He sought out sources beyond the textbook.',                         dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'sr18', date:'2025-12-12', text:'Jesse was quiet during the debate but his research notes were detailed. He engages more deeply through writing than speaking.',                       dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr18', date:'2026-02-14', text:'Jesse\'s map skills showed solid geographic reasoning. He connected physical geography to historical settlement patterns.',                            dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'sr18', date:'2026-03-18', text:'Jesse\'s civic reflection connected Indigenous sovereignty to contemporary Canadian politics. Thoughtful and well-researched.',                       dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr19', date:'2025-10-10', text:'Suki\'s government essay was well-written with a clear argument. She expresses complex ideas with clarity.',                                          dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr19', date:'2025-11-30', text:'Suki\'s current events journal entries are consistently thoughtful. She identifies bias in media coverage effectively.',                               dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'sr19', date:'2026-01-24', text:'Suki connected economic policy to her family\'s experience as small business owners. Personal and relevant.',                                         dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'sr19', date:'2026-03-07', text:'Suki\'s perspectives analysis showed careful consideration of multiple viewpoints. She avoids oversimplification.',                                   dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr19', date:'2026-03-18', text:'Suki\'s civic reflection was analytical and connected Vietnamese Canadian community history to broader themes of belonging.',                          dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr20', date:'2025-12-05', text:'Brennan struggled to engage with the debate format but contributed thoughtfully in the written reflection afterward.',                                dims:['selfRegulation'],            sentiment:'concern',  context:'whole-class' },
      { sid:'sr20', date:'2025-10-22', text:'Brennan found the government essay difficult to start. He benefits from outlines and step-by-step writing supports.',                                dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'sr20', date:'2026-01-24', text:'Brennan engaged more with the economic systems comparison than previous written work. The practical context helped.',                                  dims:['engagement'],                sentiment:'growth',   context:'independent' },
      { sid:'sr20', date:'2026-02-14', text:'Brennan\'s map skills test showed he can succeed when he prepares. He studied with a partner and it paid off.',                                       dims:['resilience','collaboration'], sentiment:'growth',   context:'independent' },
      { sid:'sr20', date:'2026-03-07', text:'Brennan\'s perspectives analysis was brief but showed he understood the core historical concepts. Progress.',                                         dims:['engagement','resilience'],    sentiment:'growth',   context:'independent' },
      { sid:'sr21', date:'2025-10-10', text:'Nina\'s government essay was solid with clear analysis. She identifies key arguments efficiently.',                                                    dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr21', date:'2025-11-07', text:'Nina contributed a thoughtful comparison of treaty-making processes in different parts of Canada.',                                                    dims:['curiosity','engagement'],     sentiment:'strength', context:'discussion' },
      { sid:'sr21', date:'2026-01-24', text:'Nina asked a precise question about how mixed economies balance competing priorities. She thinks in systems.',                                         dims:['curiosity'],                 sentiment:'strength', context:'whole-class' },
      { sid:'sr21', date:'2026-02-14', text:'Nina\'s map skills test showed strong spatial reasoning. She identified geographic patterns that influenced historical events.',                       dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr21', date:'2026-03-18', text:'Nina\'s civic reflection was analytical and forward-looking. She connected course themes to her own plans for community involvement.',                dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr22', date:'2025-10-10', text:'Amir\'s government essay showed understanding of the basic structure but his analysis needs more depth and evidence.',                                 dims:['engagement'],                sentiment:'growth',   context:'independent' },
      { sid:'sr22', date:'2025-12-12', text:'Amir was hesitant during the debate but made one strong point about resource distribution that others built on.',                                      dims:['engagement','resilience'],    sentiment:'growth',   context:'discussion' },
      { sid:'sr22', date:'2026-01-24', text:'Amir engaged more with the economic systems essay. The comparative format seemed to help him organize his thinking.',                                  dims:['engagement'],                sentiment:'growth',   context:'independent' },
      { sid:'sr22', date:'2026-02-14', text:'Amir worked with a partner to prepare for the map skills test. The collaboration helped him build confidence.',                                       dims:['collaboration','resilience'], sentiment:'growth',   context:'small-group' },
      { sid:'sr22', date:'2026-03-18', text:'Amir\'s civic reflection connected democratic values to his family\'s experience. His most personal and engaged piece of writing.',                   dims:['engagement','curiosity'],     sentiment:'growth',   context:'independent' },
      { sid:'sr23', date:'2025-10-10', text:'Freya\'s government essay was one of the strongest in the class. Her thesis was original and her evidence was diverse.',                               dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr23', date:'2025-11-07', text:'Freya\'s treaty research was exceptionally well-sourced. She evaluated primary and secondary sources with sophistication.',                           dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr23', date:'2026-01-24', text:'Freya connected Scandinavian social democratic models to Canadian policy debates. She draws on her family background productively.',                   dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'sr23', date:'2026-03-07', text:'Freya\'s Japanese internment analysis was the most thorough in the class. She consulted five different sources and wove them together skillfully.',    dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr23', date:'2026-03-18', text:'Freya organized a peer discussion about civic responsibility that several classmates said was the best conversation they had this year.',             dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'sr24', date:'2025-10-22', text:'Dante found the government essay structure challenging. He has good ideas verbally but struggles to organize them in writing.',                        dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'sr24', date:'2025-12-12', text:'Dante contributed energetically to the debate. His passion for the topic was clear even if his evidence was sometimes thin.',                          dims:['engagement'],                sentiment:'strength', context:'discussion' },
      { sid:'sr24', date:'2026-01-24', text:'Dante connected economic policy to neighbourhood changes he has observed firsthand. Powerful personal connection to course material.',                dims:['curiosity','engagement'],     sentiment:'strength', context:'whole-class' },
      { sid:'sr24', date:'2026-02-14', text:'Dante\'s map skills test showed improvement when he slowed down and read questions carefully.',                                                        dims:['selfRegulation','resilience'],sentiment:'growth',   context:'independent' },
      { sid:'sr24', date:'2026-03-18', text:'Dante\'s civic reflection was his strongest written work this year. He wrote with conviction about community advocacy.',                               dims:['engagement','resilience'],    sentiment:'growth',   context:'independent' },
      { sid:'sr25', date:'2025-10-10', text:'Leila\'s government essay was analytical and well-structured. She makes sophisticated arguments with confidence.',                                    dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr25', date:'2025-11-07', text:'Leila brought her family\'s experience with the Lebanese civil war to the treaty discussion. A powerful and respectful contribution.',                dims:['engagement','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'sr25', date:'2026-01-24', text:'Leila\'s economic systems comparison was excellent. She connected economic theory to real policy outcomes with evidence.',                             dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr25', date:'2026-03-07', text:'Leila\'s perspectives analysis showed sophisticated ethical reasoning. She balanced context with principle effectively.',                               dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr25', date:'2026-03-18', text:'Leila\'s civic participation reflection connected refugee resettlement policy to her own family\'s story. Moving and analytically strong.',            dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'sr26', date:'2025-10-22', text:'Finn\'s government essay showed basic understanding but his analysis stayed at the surface level. He needs to push deeper into "why."',               dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'sr26', date:'2025-12-12', text:'Finn contributed to the debate when prompted but didn\'t volunteer ideas on his own. He listens well and takes notes.',                                dims:['engagement'],                sentiment:'growth',   context:'discussion' },
      { sid:'sr26', date:'2026-01-24', text:'Finn engaged more with the economic systems essay when I connected it to local industry. Practical contexts motivate him.',                            dims:['engagement','curiosity'],     sentiment:'growth',   context:'independent' },
      { sid:'sr26', date:'2026-02-14', text:'Finn\'s map skills test showed solid geographic knowledge. He is stronger with spatial reasoning than essay writing.',                                 dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'sr26', date:'2026-03-18', text:'Finn\'s civic reflection connected democratic responsibility to his experience in team sports. An authentic connection for him.',                      dims:['engagement'],                sentiment:'growth',   context:'independent' },
      { sid:'sr27', date:'2025-10-10', text:'Preet\'s government essay was thorough and well-argued. She writes with analytical precision and uses evidence effectively.',                          dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'sr27', date:'2025-11-07', text:'Preet connected treaty research to contemporary land acknowledgment practices. She thinks about the present implications of history.',                dims:['curiosity','respect'],        sentiment:'strength', context:'whole-class' },
      { sid:'sr27', date:'2025-12-12', text:'Preet was an outstanding debater. She anticipated counterarguments and responded with poise and evidence.',                                            dims:['engagement'],                sentiment:'strength', context:'presentation' },
      { sid:'sr27', date:'2026-03-07', text:'Preet\'s perspectives analysis was among the strongest. She maintained analytical distance while showing genuine empathy.',                            dims:['engagement','respect'],       sentiment:'strength', context:'independent' },
      { sid:'sr27', date:'2026-03-18', text:'Preet\'s civic reflection connected Sikh community values to Canadian democratic principles. Personal, respectful, and analytically strong.',         dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' }
    ]));

    // Term ratings
    const ss10TR = {};
    ss10TR['sr1']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Zara is an exceptional social studies student who connects course content to her own experience and current events. Her treaty research was the most thorough in the class and she shares her perspectives with genuine respect for others.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Zara continues to set the standard. Her Japanese internment analysis was the most nuanced in the class, balancing emotional depth with rigour. She brings current news articles to every discussion and models respectful discourse.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr2']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Owen is a steady, reliable student who writes clearly and argues logically. His government essay showed solid understanding of parliamentary structure. He could push further by exploring perspectives beyond the textbook.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Owen has grown as a collaborator this term, helping classmates with map interpretation and connecting economic systems to specific Canadian policies. His civic reflection showed genuine engagement with democratic responsibility.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr3']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Isla brings empathy and analytical skill to her social studies work. Her treaty research identified perspectives others hadn\'t considered, and she makes nuanced points in class discussions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Isla volunteered to analyze the most complex perspective in the Japanese internment study and connected economic systems to environmental policy. Her civic reflection was personal and authentic. Growing into a sophisticated thinker.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr4']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Dev is an outstanding analytical thinker. His debate preparation was meticulous, he anticipates counterarguments, and he asks questions that elevate the entire class\'s thinking. A model of respectful intellectual engagement.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Dev\'s perspectives analysis showed how one policy could be viewed through five different lenses \u2014 exceptional work. His question about whether economic inequality is a cause or consequence sparked a memorable class discussion. Consistently excellent.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr5']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Chloe is a careful, empathetic student who evaluates sources thoughtfully and identifies bias effectively. Her written work is consistently well-organized. She could push herself to share her ideas more in discussions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Chloe brought genuine empathy to the Japanese internment perspectives analysis. She is asking more questions in class and her civic reflection showed real engagement with course themes. Her essay structure continues to strengthen.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr6']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Kai brings a thoughtful, inclusive perspective to every discussion. They listen carefully before contributing, and their government essay incorporated Indigenous governance systems alongside Canadian structures \u2014 original and respectful thinking.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Kai continues to model respectful discourse. They raised important questions about how economic systems affect marginalized communities and helped classmates with map skills. Their civic reflection was deeply personal and showed genuine commitment to social justice.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr7']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Hana is a confident, analytically strong student who takes on challenges willingly. Her debate performance was outstanding and her government essay used constitutional references with precision. She leads discussions with energy and rigour.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Hana volunteered to present the most difficult perspective in the Japanese internment analysis and handled it with remarkable maturity. Her economic systems essay connected theoretical frameworks to specific policy decisions. Exceptional student.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr8']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Luca produces solid work with clear arguments. He contributes to debates with preparation and brings a unique perspective drawing on his Italian heritage. He could deepen his analysis by using more primary sources.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Luca compared Canadian and Italian economic approaches this term, bringing a genuine cross-cultural perspective. His map skills were strong and his Japanese internment analysis showed growing empathy and analytical depth.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr9']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ava is a deeply curious student whose current events journal entries consistently identify patterns across different events. She evaluates sources with skill and asks probing questions during discussions.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ava\'s analytical skills continue to sharpen. She questioned whether capitalism is compatible with sustainability and her Japanese internment analysis showed sophisticated perspective-taking. Her civic reflection was one of the most analytical in the class.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr10'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Ravi writes clearly and organizes his arguments well. He participates in debates with specific evidence and makes cross-curricular connections. He could push further by exploring more diverse perspectives.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ravi connected economic inequality to health outcomes this term, showing genuine cross-curricular thinking. His map skills test was strong and his civic reflection connected democratic responsibility to his own community involvement.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr11'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Elena is a strong academic writer who brings unique perspectives from her family\'s immigrant experience. Her treaty research connected Canadian treaty-making to broader patterns of colonialism. She also helps organize study groups generously.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Elena\'s writing continues to mature. Her Japanese internment analysis showed emotional depth alongside analytical rigour, and her economic systems essay drew on her parents\' home country experience. She organizes study sessions that benefit the whole class.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr12'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Jamal finds extended writing challenging and his analysis tends to be descriptive rather than analytical. He has good ideas in discussion but struggles to transfer them to paper. He benefits from clear outlines and structured support.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Jamal participated more actively in small-group discussions this term and his map skills test showed real improvement. His civic reflection was his strongest piece of writing \u2014 connecting democratic responsibility to his own neighbourhood. Encouraging progress.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr13'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Yuki is an exceptional student who organizes study groups, anticipates counterarguments in her writing, and connects course content to global patterns. Her treaty research was thorough and her organizational leadership benefits the whole class.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Yuki connected Japanese Canadian internment to broader patterns of wartime xenophobia and her map skills identified patterns other students missed. She questions the limitations of representative democracy in her civic reflection. An outstanding thinker and leader.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr14'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Marco is a capable student who participates effectively in debates and uses personal experience to enrich his analysis. He could strengthen his written work by exploring more than one perspective and deepening his evidence base.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:3, resilience:3, curiosity:4, respect:4}, narrative:'Marco drew on his family\'s immigration experience to connect economic policy to personal impact. He helped a classmate understand map concepts and his civic reflection was personal and analytically grounded. Growing as a thinker.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr15'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Aria writes with precision and evidence. She listens before responding in discussions and her government essay was well-structured. She could push herself further by making bolder arguments and taking analytical risks.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Aria connected economic inequality to gender disparities and her Japanese internment analysis showed genuine historical empathy. Her civic reflection linked course themes to her own environmental activism. Increasingly confident in her analytical voice.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr16'] = { 'term-1': { dims:{engagement:1, collaboration:2, selfRegulation:2, resilience:2, curiosity:2, respect:3}, narrative:'Tariq needs significant support to start written work and his analysis stays at the surface level. He has potential but struggles with independent work. He benefits from clear outlines, scaffolded tasks, and one-on-one check-ins.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:2, selfRegulation:3, resilience:3, curiosity:2, respect:3}, narrative:'Tariq showed real improvement this term. His map skills test was his best assessment result, and his Japanese internment analysis was more detailed than previous work. He is building analytical stamina. The growth from Term 1 is genuine.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr17'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mila brings a human rights perspective to her work that enriches class discussions. Her government essay was well-organized and she uses evidence effectively. She asks thought-provoking questions about economic inequality.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mila\'s perspectives analysis was empathetic and analytically strong. She connected her Polish heritage to Canadian multicultural policy in her civic reflection. She balances multiple viewpoints with growing skill.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr18'] = { 'term-1': { dims:{engagement:3, collaboration:2, selfRegulation:3, resilience:3, curiosity:4, respect:4}, narrative:'Jesse engages deeply with Indigenous perspectives and seeks out sources beyond the textbook. He is a stronger writer than speaker, contributing more through reflection than debate. His independent research initiative is a real strength.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:2, selfRegulation:3, resilience:3, curiosity:4, respect:4}, narrative:'Jesse challenged the textbook\'s framing of a historical event this term, citing an Indigenous author he found independently. His map skills connected physical geography to settlement patterns. He expresses complex ideas best through writing.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr19'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Suki is a clear, analytical writer who identifies bias in media coverage effectively. Her government essay was well-argued and her current events journal is consistently thoughtful. She connects course content to her family\'s experience.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Suki connected economic policy to her family\'s small business experience and her perspectives analysis avoided oversimplification. Her civic reflection wove Vietnamese Canadian community history into broader themes of belonging. Consistently thoughtful work.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr20'] = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:2, resilience:2, curiosity:2, respect:3}, narrative:'Brennan finds structured essay writing difficult and struggles to engage with the debate format. He contributes better in writing than speaking. He needs support with outlines and step-by-step scaffolding for longer assignments.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:3}, narrative:'Brennan engaged more with practical contexts this term. His map skills test showed he can succeed when he prepares, and his perspectives analysis, while brief, showed understanding of core concepts. He studied with a partner and it paid off. Progress.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr21'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Nina is an analytical, systems-level thinker who identifies key arguments efficiently. Her government essay was solid and she asks precise questions about how policies interact with competing priorities.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Nina\'s map skills test showed strong spatial reasoning and her civic reflection was forward-looking, connecting course themes to her plans for community involvement. She thinks carefully before contributing and her analysis is consistently thoughtful.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr22'] = { 'term-1': { dims:{engagement:2, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:3}, narrative:'Amir shows understanding of course concepts but his written analysis lacks depth. He contributes in group settings and is building confidence. He benefits from structured supports and comparative formats for essay writing.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Amir improved steadily this term. The comparative format helped him organize his economic systems essay, and he collaborated with a partner for the map skills test. His civic reflection connected democratic values to his family\'s experience \u2014 his most engaged piece of writing.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr23'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Freya is one of the strongest social studies students in the class. Her research is exceptionally well-sourced, her analysis is sophisticated, and she draws productively on her Scandinavian heritage to compare policy approaches.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Freya\'s Japanese internment analysis consulted five different sources and was the most thorough in the class. She organized a peer discussion about civic responsibility that classmates said was the best conversation they had all year. Exceptional work and leadership.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr24'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:2, resilience:3, curiosity:3, respect:3}, narrative:'Dante has good ideas but struggles to organize them in writing. He participates energetically in debates and connects course material to his own neighbourhood experiences. He needs support with essay structure and written analysis.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Dante connected economic policy to neighbourhood changes he has observed firsthand \u2014 powerful personal engagement. His map skills improved when he slowed down, and his civic reflection was his strongest written work this year. Building analytical stamina.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr25'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Leila makes sophisticated arguments with confidence and brings her family\'s experience with conflict to class discussions with remarkable poise. Her treaty research connected personal and political perspectives powerfully.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Leila\'s perspectives analysis showed sophisticated ethical reasoning, balancing historical context with universal principles. Her civic reflection connected refugee resettlement policy to her family\'s story \u2014 moving and analytically strong. Growing into an exceptional writer.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr26'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:3}, narrative:'Finn produces basic work that shows understanding but lacks analytical depth. He engages more with practical contexts and is stronger with spatial reasoning than essay writing. He needs encouragement to push deeper into "why."', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Finn engaged more when economic systems were connected to local industry, and his map skills test showed solid geographic knowledge. His civic reflection connected democratic responsibility to team sports \u2014 an authentic connection for him. Slowly building engagement.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    ss10TR['sr27'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Preet writes with analytical precision and connects course content to contemporary land acknowledgment practices and Sikh community values. She was an outstanding debater who anticipated counterarguments and responded with poise.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Preet\'s perspectives analysis was among the strongest, maintaining analytical distance while showing genuine empathy. Her civic reflection connected Sikh community values to Canadian democratic principles \u2014 personal, respectful, and analytically strong.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    saveTermRatings('ss10', ss10TR);
  }

  /* ════════════════════════════════════════════════════════════
     PHYSICAL & HEALTH EDUCATION 12 — PHE12
     ════════════════════════════════════════════════════════════ */
  if (COURSES.phe12 && getStudents('phe12').length === 0) {
    saveCourseConfig('phe12', { reportAsPercentage: true });
    // Same senior roster, different IDs
    const phe12Roster = SENIOR_ROSTER.map((s, i) => Object.assign({}, s, { id: 'pe' + (i+1) }));
    saveStudents('phe12', phe12Roster);
    const PEIDS = phe12Roster.map(s => s.id);

    const phe12Assessments = [
      { id:'pe12a1', title:'Fitness Plan Design',           date:'2025-10-04', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'project',     notes:'Design a personal 8-week fitness plan with progressive overload principles.', coreCompetencyIds:['CT','PAR'],      rubricId:'rub_phe12_perf', created: new Date('2025-10-04').toISOString() },
      { id:'pe12a2', title:'Sport Skills Assessment',       date:'2025-10-25', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],             evidenceType:'observation', notes:'Practical assessment of sport-specific skills across volleyball and basketball.', coreCompetencyIds:['PAR'],          rubricId:'rub_phe12_perf', created: new Date('2025-10-25').toISOString() },
      { id:'pe12a3', title:'Nutrition Analysis',            date:'2025-11-15', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'written',     notes:'Three-day food journal analysis with improvement recommendations.',              coreCompetencyIds:['CRT','PAR'],     rubricId:'rub_phe12_perf', created: new Date('2025-11-15').toISOString() },
      { id:'pe12a4', title:'Mental Health Reflection',      date:'2025-12-06', type:'formative',  tagIds:['DEA'],             evidenceType:'written',     notes:'Reflective journal on personal mental health strategies.',                      coreCompetencyIds:['PAR','PPI'],     created: new Date('2025-12-06').toISOString() },
      { id:'pe12a5', title:'Leadership Portfolio',          date:'2026-01-24', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'portfolio',   notes:'Documentation of leadership roles in class activities and community sport.',    coreCompetencyIds:['COL','SAR'],     rubricId:'rub_phe12_perf', created: new Date('2026-01-24').toISOString() },
      { id:'pe12a6', title:'Outdoor Ed Trip Journal',       date:'2026-02-08', type:'formative',  tagIds:['PAD','DEA'],       evidenceType:'written',     notes:'Reflection on Grouse Mountain snowshoe trip \u2014 challenge, risk, personal growth.', coreCompetencyIds:['PAR','PPI'],created: new Date('2026-02-08').toISOString() },
      { id:'pe12a7', title:'Biomechanics Lab',              date:'2026-03-01', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'lab',         notes:'Analysis of movement mechanics using video analysis software.',                 coreCompetencyIds:['CRT','CT'],      rubricId:'rub_phe12_perf', created: new Date('2026-03-01').toISOString() },
      { id:'pe12a8', title:'Wellness Goal Setting',         date:'2026-03-15', type:'formative',  tagIds:['PAD','DEA','PRS'], evidenceType:'written',     notes:'Post-graduation wellness plan with SMART goals.',                              coreCompetencyIds:['PAR'],           created: new Date('2026-03-15').toISOString() },
      { id:'pe12a9',  title:'Basketball Skills Assessment',  date:'2025-09-19', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'observation', notes:'Assessment of dribbling, passing, shooting, and game play decision-making.',   coreCompetencyIds:['PAR'],           rubricId:'rub_phe12_perf', created: new Date('2025-09-19').toISOString() },
      { id:'pe12a10', title:'Yoga & Mindfulness Reflection', date:'2025-10-10', type:'formative',  tagIds:['DEA','PAD','PRS'],       evidenceType:'written',     notes:'Reflective journal on yoga unit — body awareness, breathing, stress relief.',  coreCompetencyIds:['PAR','PPI'],     rubricId:'rub_phe12_wellness', created: new Date('2025-10-10').toISOString() },
      { id:'pe12a11', title:'Injury Prevention Presentation', date:'2025-10-31', type:'summative', tagIds:['PAD','DEA','PRS'],       evidenceType:'observation', notes:'Group presentation on common sport injuries, prevention strategies, and first aid.', coreCompetencyIds:['COM','COL'], rubricId:'rub_phe12_advocacy', created: new Date('2025-10-31').toISOString() },
      { id:'pe12a12', title:'Heart Rate Lab',                date:'2025-11-21', type:'summative',  tagIds:['DER','PAD'],       evidenceType:'lab',         notes:'Measure resting, target, and recovery heart rates across different activities.', coreCompetencyIds:['CRT','CT'],    rubricId:'rub_phe12_movement', created: new Date('2025-11-21').toISOString() },
      { id:'pe12a13', title:'Peer Coaching Session',         date:'2025-12-12', type:'summative',  tagIds:['DER','PRS'],       evidenceType:'observation', notes:'Coach a peer through a skill development drill with feedback and encouragement.', coreCompetencyIds:['COL','COM'],  rubricId:'rub_phe12_coaching', created: new Date('2025-12-12').toISOString() },
      { id:'pe12a14', title:'Nutrition Label Analysis',      date:'2026-01-10', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'written',     notes:'Analyze nutrition labels from common foods and design a balanced meal plan.',    coreCompetencyIds:['CRT','PAR'],     rubricId:'rub_phe12_fitness', created: new Date('2026-01-10').toISOString() },
      { id:'pe12a15', title:'Flexibility Testing',           date:'2026-01-31', type:'formative',  tagIds:['DER','PAD'],       evidenceType:'observation', notes:'Sit-and-reach and shoulder flexibility tests with self-assessment.',            coreCompetencyIds:['PAR'],           created: new Date('2026-01-31').toISOString() },
      { id:'pe12a16', title:'Community Sport Event Plan',    date:'2026-02-14', type:'summative',  tagIds:['PAD','DEA','PRS'],       evidenceType:'project',     notes:'Plan a community sport or wellness event including logistics, promotion, and safety.', coreCompetencyIds:['COL','PAR','SAR'], rubricId:'rub_phe12_advocacy', created: new Date('2026-02-14').toISOString() },
      { id:'pe12a17', title:'Stress Management Strategy',    date:'2026-02-28', type:'summative',  tagIds:['DEA','PAD','PRS'],       evidenceType:'written',     notes:'Research and present a personal stress management strategy grounded in evidence.', coreCompetencyIds:['CRT','PAR'],   rubricId:'rub_phe12_wellness', created: new Date('2026-02-28').toISOString() },
      { id:'pe12a18', title:'Badminton Tournament',          date:'2026-03-07', type:'summative',  tagIds:['DER','PAD','DEA','PRS'],       evidenceType:'observation', notes:'Round-robin tournament assessing technique, strategy, and sportsmanship.',      coreCompetencyIds:['PAR'],           rubricId:'rub_phe12_perf', created: new Date('2026-03-07').toISOString() },
      { id:'pe12a19', title:'Body Image Media Critique',     date:'2026-03-18', type:'summative',  tagIds:['PAD','DEA','PRS'],       evidenceType:'written',     notes:'Critical analysis of media portrayals of body image and their impact on youth.', coreCompetencyIds:['CRT','SAR'],     rubricId:'rub_phe12_advocacy', created: new Date('2026-03-18').toISOString() },
      { id:'pe12a20', title:'Fitness Progress Check',        date:'2026-03-21', type:'formative',  tagIds:['DER','PAD'],       evidenceType:'observation', notes:'Re-test fitness benchmarks from September and reflect on progress.',            coreCompetencyIds:['PAR'],           created: new Date('2026-03-21').toISOString() }
    ];
    // ── PHE 12 Points-Based Quizzes (12) ──
    phe12Assessments.push(
      { id:'pe12q1',  title:'Muscle Groups Quiz',           date:'2025-09-24', type:'formative', tagIds:['DER'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-09-24').toISOString() },
      { id:'pe12q2',  title:'Nutrition Facts Quiz',         date:'2025-10-07', type:'formative', tagIds:['PAD'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-10-07').toISOString() },
      { id:'pe12q3',  title:'Heart Rate Zones Quiz',        date:'2025-10-22', type:'formative', tagIds:['DER'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-10-22').toISOString() },
      { id:'pe12q4',  title:'Fitness Components Quiz',      date:'2025-11-05', type:'formative', tagIds:['DER'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:15, created: new Date('2025-11-05').toISOString() },
      { id:'pe12q5',  title:'Mental Health Terms Quiz',     date:'2025-11-19', type:'formative', tagIds:['DEA'], evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2025-11-19').toISOString() },
      { id:'pe12q6',  title:'Sport Rules Quiz',             date:'2025-12-03', type:'formative', tagIds:['DER'], evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2025-12-03').toISOString() },
      { id:'pe12q7',  title:'Injury Prevention Quiz',       date:'2025-12-17', type:'formative', tagIds:['PAD'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2025-12-17').toISOString() },
      { id:'pe12q8',  title:'Substance Use Facts Quiz',     date:'2026-01-14', type:'formative', tagIds:['DEA'], evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2026-01-14').toISOString() },
      { id:'pe12q9',  title:'First Aid Basics Quiz',        date:'2026-01-28', type:'formative', tagIds:['PRS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:15, created: new Date('2026-01-28').toISOString() },
      { id:'pe12q10', title:'Body Mechanics Quiz',           date:'2026-02-11', type:'formative', tagIds:['DER'], evidenceType:'quiz', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:10, created: new Date('2026-02-11').toISOString() },
      { id:'pe12q11', title:'Stress Response Quiz',          date:'2026-02-25', type:'formative', tagIds:['DEA'], evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2026-02-25').toISOString() },
      { id:'pe12q12', title:'Healthy Relationships Quiz',    date:'2026-03-11', type:'formative', tagIds:['PRS'], evidenceType:'quiz', notes:'', coreCompetencyIds:['PAR'], scoreMode:'points', maxPoints:10, created: new Date('2026-03-11').toISOString() }
    );
    // ── PHE 12 Points-Based Unit Tests (5) ──
    phe12Assessments.push(
      { id:'pe12t1', title:'Fitness & Training Principles Test', date:'2025-10-15', type:'summative', tagIds:['DER','PAD'],          evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2025-10-15').toISOString() },
      { id:'pe12t2', title:'Nutrition & Wellness Test',          date:'2025-11-26', type:'summative', tagIds:['PAD','DEA'],          evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2025-11-26').toISOString() },
      { id:'pe12t3', title:'Mental Health & Well-being Test',    date:'2025-12-10', type:'summative', tagIds:['DEA','PRS'],          evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:60, created: new Date('2025-12-10').toISOString() },
      { id:'pe12t4', title:'Sport Science Test',                date:'2026-02-04', type:'summative', tagIds:['DER','PAD'],          evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:50, created: new Date('2026-02-04').toISOString() },
      { id:'pe12t5', title:'Comprehensive Health Exam',         date:'2026-03-04', type:'summative', tagIds:['DER','PAD','DEA','PRS'],evidenceType:'written', notes:'', coreCompetencyIds:['CRT'], scoreMode:'points', maxPoints:80, created: new Date('2026-03-04').toISOString() }
    );
    saveAssessments('phe12', phe12Assessments);

    /* ── PHE 12 Rubrics ── */
    const phe12Rubrics = [
      {
        id: 'rub_phe12_perf',
        name: 'Performance Assessment Rubric',
        criteria: [
          {
            id: 'crit_phe12_perf_phys',
            name: 'Physical Competence',
            tagIds: ['DER'],
            levels: {
              4: 'Executes skills with precision and fluidity, applies advanced strategy in game situations, and consistently models safe practice for others.',
              3: 'Executes skills competently, applies appropriate strategies, and follows safety procedures independently.',
              2: 'Demonstrates basic skill execution with occasional errors; strategy application is inconsistent and safety reminders are sometimes needed.',
              1: 'Struggles with fundamental skill execution; relies on teacher direction for strategy and safety.'
            }
          },
          {
            id: 'crit_phe12_perf_health',
            name: 'Health Knowledge',
            tagIds: ['PAD', 'DEA'],
            levels: {
              4: 'Demonstrates deep understanding of health concepts, applies knowledge to create personalized wellness plans, and evaluates the effectiveness of health strategies critically.',
              3: 'Understands key health concepts, applies knowledge to personal planning, and identifies effective health strategies.',
              2: 'Shows basic understanding of health concepts but struggles to apply them to personal contexts or evaluate strategies.',
              1: 'Health knowledge is fragmented; cannot apply concepts to personal planning without significant support.'
            }
          },
          {
            id: 'crit_phe12_perf_leadership',
            name: 'Leadership & Social',
            tagIds: ['PRS'],
            levels: {
              4: 'Takes initiative as a leader, actively mentors peers, and contributes meaningfully to community engagement beyond the classroom.',
              3: 'Demonstrates leadership in group activities, supports peers positively, and participates in community engagement opportunities.',
              2: 'Participates in group activities but rarely takes a leadership role; social contributions are limited to compliance.',
              1: 'Reluctant to engage in group or leadership activities; needs encouragement to participate socially.'
            }
          }
        ]
      },
      {
        id: 'rub_phe12_fitness',
        name: 'Fitness Plan Rubric',
        criteria: [
          {
            id: 'crit_phe12_fitness_goals',
            name: 'Goal Setting',
            tagIds: ['PAD'],
            levels: {
              4: 'Sets specific, measurable, and personally meaningful fitness goals grounded in self-assessment data and current research.',
              3: 'Sets clear, realistic fitness goals based on personal assessment and relevant health principles.',
              2: 'Sets general fitness goals but they lack specificity or connection to personal assessment data.',
              1: 'Goals are vague or unrealistic; no connection to personal fitness level or health principles.'
            }
          },
          {
            id: 'crit_phe12_fitness_design',
            name: 'Program Design',
            tagIds: ['DER', 'PAD'],
            levels: {
              4: 'Designs a comprehensive, periodized program that balances all fitness components and adapts progressively based on training principles.',
              3: 'Designs a balanced program that addresses key fitness components with appropriate progression.',
              2: 'Program addresses some fitness components but lacks balance, progression, or variety.',
              1: 'Program is incomplete or consists of random activities without structure or rationale.'
            }
          },
          {
            id: 'crit_phe12_fitness_monitor',
            name: 'Self-Monitoring',
            tagIds: ['DEA'],
            levels: {
              4: 'Tracks progress meticulously using multiple metrics, analyzes trends over time, and adjusts the plan based on evidence.',
              3: 'Tracks progress regularly and uses data to evaluate whether goals are being met.',
              2: 'Tracks progress inconsistently; does not use data to inform adjustments to the plan.',
              1: 'Does not track progress or reflect on whether the fitness plan is working.'
            }
          }
        ]
      },
      {
        id: 'rub_phe12_wellness',
        name: 'Wellness Reflection Rubric',
        criteria: [
          {
            id: 'crit_phe12_wellness_aware',
            name: 'Self-Awareness',
            tagIds: ['DEA'],
            levels: {
              4: 'Demonstrates profound self-awareness across physical, mental, and social dimensions of wellness, identifying specific patterns and triggers.',
              3: 'Shows genuine self-awareness about personal wellness, identifying strengths and areas needing attention.',
              2: 'Reflects on wellness in general terms but lacks depth or specificity about personal patterns.',
              1: 'Reflection is superficial; does not demonstrate meaningful awareness of personal wellness.'
            }
          },
          {
            id: 'crit_phe12_wellness_action',
            name: 'Action Planning',
            tagIds: ['PAD', 'PRS'],
            levels: {
              4: 'Creates a detailed, realistic action plan with specific strategies, timelines, and accountability measures that address identified wellness needs.',
              3: 'Creates a practical action plan with clear strategies that address identified areas for improvement.',
              2: 'Action plan is present but vague; strategies are generic rather than tailored to personal needs.',
              1: 'No action plan is provided, or the plan is unrealistic and disconnected from the reflection.'
            }
          }
        ]
      },
      {
        id: 'rub_phe12_coaching',
        name: 'Sport Coaching Rubric',
        criteria: [
          {
            id: 'crit_phe12_coaching_skill',
            name: 'Skill Demonstration',
            tagIds: ['DER'],
            levels: {
              4: 'Demonstrates skills with expert-level form, breaks them down into teachable progressions, and adapts demonstrations for different learners.',
              3: 'Demonstrates skills with correct form and can break them into clear steps for learners.',
              2: 'Demonstrates skills adequately but struggles to break them down or explain key coaching points.',
              1: 'Skill demonstration is inaccurate or unclear; cannot model the movement effectively for others.'
            }
          },
          {
            id: 'crit_phe12_coaching_feedback',
            name: 'Teaching & Feedback',
            tagIds: ['PRS'],
            levels: {
              4: 'Provides specific, actionable feedback that accelerates learning, and adjusts teaching strategies in real time based on learner responses.',
              3: 'Provides clear, constructive feedback and uses effective teaching cues to support skill development.',
              2: 'Gives general feedback like "good job" or "try harder" without specific coaching points.',
              1: 'Does not provide feedback to learners or feedback is inaccurate and unhelpful.'
            }
          },
          {
            id: 'crit_phe12_coaching_safety',
            name: 'Safety Leadership',
            tagIds: ['DER', 'PRS'],
            levels: {
              4: 'Proactively identifies and mitigates safety risks, establishes clear protocols, and models safe practice that others follow naturally.',
              3: 'Ensures a safe environment by identifying risks, communicating safety expectations, and modelling safe behaviour.',
              2: 'Follows safety procedures when reminded but does not proactively identify or address risks.',
              1: 'Disregards safety considerations; does not address risks or model safe practice for others.'
            }
          }
        ]
      },
      {
        id: 'rub_phe12_advocacy',
        name: 'Health Advocacy Rubric',
        criteria: [
          {
            id: 'crit_phe12_advocacy_research',
            name: 'Research & Knowledge',
            tagIds: ['PAD', 'DEA'],
            levels: {
              4: 'Demonstrates thorough understanding of a health issue using credible, current sources and identifies systemic factors that influence outcomes.',
              3: 'Demonstrates solid understanding of a health issue supported by credible research and relevant data.',
              2: 'Shows basic awareness of a health issue but research is limited or relies on unreliable sources.',
              1: 'Understanding of the health issue is inaccurate or based on misconceptions rather than research.'
            }
          },
          {
            id: 'crit_phe12_advocacy_community',
            name: 'Community Engagement',
            tagIds: ['PRS'],
            levels: {
              4: 'Designs and implements a creative advocacy initiative that meaningfully engages the community and inspires action.',
              3: 'Plans and participates in advocacy efforts that engage peers and contribute to community health awareness.',
              2: 'Participates in advocacy activities but engagement is passive and impact on the community is minimal.',
              1: 'Does not engage in advocacy efforts or shows no interest in contributing to community health.'
            }
          }
        ]
      },
      {
        id: 'rub_phe12_movement',
        name: 'Movement Analysis Rubric',
        criteria: [
          {
            id: 'crit_phe12_movement_bio',
            name: 'Biomechanical Understanding',
            tagIds: ['DER'],
            levels: {
              4: 'Analyzes movement with sophisticated biomechanical understanding, identifying force production, joint angles, and efficiency with precision.',
              3: 'Identifies key biomechanical principles in movement and explains how they affect performance.',
              2: 'Identifies basic movement components but cannot connect them to biomechanical principles.',
              1: 'Cannot analyze movement beyond surface-level observation; biomechanical understanding is not evident.'
            }
          },
          {
            id: 'crit_phe12_movement_apply',
            name: 'Performance Application',
            tagIds: ['DER', 'PAD'],
            levels: {
              4: 'Applies biomechanical analysis to make targeted, effective adjustments that demonstrably improve performance.',
              3: 'Uses movement analysis to identify areas for improvement and applies adjustments to enhance performance.',
              2: 'Recognizes areas for improvement but adjustments are generic rather than based on specific analysis.',
              1: 'Cannot apply analysis to improve performance; does not connect observation to actionable changes.'
            }
          }
        ]
      }
    ];
    saveRubrics('phe12', phe12Rubrics);

    // Distribution: Extending(pe2,pe4,pe8,pe12), Proficient(pe1,pe3,pe5,pe6,pe7,pe9,pe10,pe11,pe13,pe14,pe15,pe17), Developing(pe16,pe18,pe19,pe20), Emerging(pe20 early)
    const phe12ScoreMap = {
      pe12a1: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,1, 3,3,4,2,3,3,3],
      pe12a2: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,2,3,3,3,4,3],
      pe12a3: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 4,3,3,2,3,3,3],
      pe12a4: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,3,4,3,3,3,4],
      pe12a5: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,2,3,3,4,3,3],
      pe12a6: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,3,2, 3,3,4,2,3,3,3],
      pe12a7: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 4,3,3,3,3,2,3],
      pe12a8: [3,4,3,4,3,3,3,4,3,3,0,4,3,3,3,2,3,0,2,0, 3,3,4,2,3,0,3],
      pe12a9:  [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,1, 3,3,4,2,3,3,3],
      pe12a10: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,2,3,3,3,4,3],
      pe12a11: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 4,3,3,2,3,3,3],
      pe12a12: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,3,4,3,3,3,4],
      pe12a13: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,2,3,3,4,3,3],
      pe12a14: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,3,4,2,3,3,3],
      pe12a15: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,3,2, 3,3,3,3,3,3,3],
      pe12a16: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 4,3,3,3,3,2,3],
      pe12a17: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,3,2, 3,3,4,2,3,3,3],
      pe12a18: [4,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,2,2,2, 3,3,3,3,3,3,4],
      pe12a19: [3,4,3,4,3,3,3,4,3,3,3,4,3,3,3,2,3,0,2,0, 3,3,4,3,3,2,3],
      pe12a20: [3,4,3,4,3,3,3,4,3,3,0,4,3,3,3,2,3,0,2,0, 3,3,3,0,3,0,3],
      // ── PHE 12 Quiz Scores (points-based) ──
      pe12q1:  [8,10,7,10,8,7,7,10,8,7,7,9,8,7,7,5,7,5,5,4, 8,7,9,6,8,7,8],
      pe12q2:  [7,10,7,9,8,7,7,9,7,7,7,9,8,7,7,5,7,5,5,4, 8,6,9,6,7,7,7],
      pe12q3:  [8,10,7,10,8,7,8,10,8,7,7,9,8,7,7,5,7,5,5,4, 8,7,9,6,8,7,8],
      pe12q4:  [12,15,11,14,12,10,11,14,11,10,11,13,12,11,11,8,10,7,8,6, 12,10,14,9,12,10,12],
      pe12q5:  [8,10,7,9,8,7,7,9,7,7,7,9,8,7,7,5,7,5,5,4, 7,7,9,6,8,7,8],
      pe12q6:  [8,10,7,10,8,7,8,10,8,7,7,9,8,7,7,5,7,5,5,5, 8,7,9,6,8,7,8],
      pe12q7:  [7,10,7,9,8,7,7,9,7,7,7,9,8,7,7,5,7,5,5,4, 8,6,9,6,7,7,7],
      pe12q8:  [8,10,7,10,8,7,7,10,8,7,7,9,8,7,7,5,7,5,5,4, 8,7,9,6,8,7,8],
      pe12q9:  [12,15,11,14,12,10,11,14,11,10,11,13,12,11,11,8,10,7,8,6, 12,10,14,9,12,10,12],
      pe12q10: [8,10,7,10,8,7,8,10,8,7,7,9,8,7,7,5,7,5,5,4, 8,7,9,6,8,7,8],
      pe12q11: [7,10,7,9,8,7,7,9,7,7,0,9,8,7,7,5,7,0,5,0, 8,7,9,6,8,0,7],
      pe12q12: [8,10,7,10,8,0,7,10,8,7,0,9,8,7,7,5,7,0,5,0, 8,0,9,6,8,0,8],
      // ── PHE 12 Unit Test Scores (points-based) ──
      pe12t1:  [40,48,37,48,40,36,37,48,39,36,37,44,40,37,37,26,36,26,26,22, 40,36,44,32,40,36,40],
      pe12t2:  [40,48,37,47,40,36,37,47,37,36,37,44,40,37,37,26,36,26,26,22, 42,34,44,30,38,36,38],
      pe12t3:  [49,57,44,56,49,42,44,56,46,42,44,52,49,44,44,31,42,31,31,26, 50,42,52,36,48,42,48],
      pe12t4:  [40,48,37,48,40,36,37,48,39,36,0,44,40,37,37,26,36,0,26,0, 40,36,44,32,40,0,40],
      pe12t5:  [65,76,59,75,65,0,59,76,63,58,0,72,65,59,59,34,58,0,42,0, 66,58,72,0,65,0,63]
    };
    saveScores('phe12', buildScores(PEIDS, phe12Assessments, phe12ScoreMap));

    // Score notes
    const pe12sc = getScores('phe12');
    (pe12sc['pe2']||[]).filter(e => e.assessmentId==='pe12a1').forEach(e => { e.note = 'Owen\'s fitness plan incorporated periodization concepts beyond the grade level. He researched professional training methodologies independently.'; });
    (pe12sc['pe4']||[]).filter(e => e.assessmentId==='pe12a5').forEach(e => { e.note = 'Dev\'s leadership portfolio documented genuine mentoring of younger students in the intramural program. Authentic leadership.'; });
    (pe12sc['pe8']||[]).filter(e => e.assessmentId==='pe12a7').forEach(e => { e.note = 'Luca\'s biomechanics analysis was the most technically detailed in the class. He used slow-motion video to identify subtle form issues.'; });
    (pe12sc['pe20']||[]).filter(e => e.assessmentId==='pe12a1').forEach(e => { e.note = 'Plan lacked specificity \u2014 no progression, no rest days planned. We discussed the importance of structured programming.'; });
    (pe12sc['pe6']||[]).filter(e => e.assessmentId==='pe12a6').forEach(e => { e.note = 'Kai\'s outdoor ed reflection showed genuine vulnerability about pushing past comfort zones. Thoughtful and honest writing.'; });
    // Isla (pe3) on Heart Rate Lab
    (pe12sc['pe3']||[]).filter(e => e.assessmentId==='pe12a12').forEach(e => { e.note = 'Isla made a clear connection between recovery heart rate and cardiovascular fitness. Excellent data recording.'; });
    // Jamal (pe12) on Peer Coaching Session
    (pe12sc['pe12']||[]).filter(e => e.assessmentId==='pe12a13').forEach(e => { e.note = 'Jamal gave specific, encouraging feedback that helped his partner improve their form. Natural coaching instincts.'; });
    // Brennan (pe20) on Body Image Media Critique
    (pe12sc['pe20']||[]).filter(e => e.assessmentId==='pe12a19').forEach(e => { e.note = 'Not yet submitted. Discussed timeline — Brennan is working on it but needs support getting started.'; });
    saveScores('phe12', pe12sc);

    // Quick obs
    saveQuickObs('phe12', buildObs([
      { sid:'pe1',  date:'2026-02-22', text:'Zara\'s biomechanics analysis showed strong analytical thinking. She connected movement patterns to injury prevention research she found independently.',   dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe1',  date:'2025-10-04', text:'Zara\'s fitness plan incorporated progressive overload principles with thoughtful periodization. Well-researched.',                                        dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'pe1',  date:'2025-12-06', text:'Zara\'s mental health reflection was honest and showed genuine self-awareness about her coping strategies.',                                                dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'pe1',  date:'2026-01-24', text:'Zara documented authentic leadership in the intramural program. She organized tournament brackets and encouraged participation.',                           dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe1',  date:'2026-03-15', text:'Zara\'s wellness goal setting showed she has a realistic, comprehensive plan for maintaining health post-graduation.',                                      dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe2',  date:'2025-10-18', text:'Owen led the warm-up today with creativity and energy. Students were fully engaged and he adapted exercises for different fitness levels.',                   dims:['engagement','collaboration'], sentiment:'strength', context:'whole-class' },
      { sid:'pe2',  date:'2026-02-15', text:'Demonstrated exceptional sportsmanship during the basketball tournament \u2014 encouraged opposing team members after good plays.',                          dims:['respect'],                   sentiment:'strength', context:'whole-class' },
      { sid:'pe2',  date:'2025-11-15', text:'Owen\'s nutrition analysis was thorough and evidence-based. He researched athletic performance nutrition independently.',                                    dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'pe2',  date:'2026-03-01', text:'Owen\'s biomechanics lab used slow-motion video analysis to identify subtle form issues in his running stride. Impressive self-coaching.',                   dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe3',  date:'2025-12-10', text:'Isla wrote the most honest and reflective mental health journal in the class. She\'s developing real self-awareness about her stress patterns.',               dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'pe3',  date:'2025-10-25', text:'Isla showed solid sport skills across volleyball and basketball. She adapts quickly to different movement patterns.',                                         dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'pe3',  date:'2026-01-24', text:'Isla\'s leadership portfolio documented peer mentoring in the fitness unit. She helped classmates modify exercises for injuries.',                             dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'pe3',  date:'2026-02-08', text:'Isla set personal goals for the snowshoe trip and reflected on pushing her endurance limits. Honest self-assessment.',                                        dims:['resilience','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'pe3',  date:'2026-03-15', text:'Isla\'s wellness plan for post-graduation is realistic and comprehensive. She identified specific strategies for managing stress during transitions.',        dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe4',  date:'2025-11-22', text:'Dev mentored two grade 9 students in the intramural volleyball program. Patient and clear instruction.',                                                     dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'pe4',  date:'2025-10-04', text:'Dev\'s fitness plan showed advanced understanding of training principles. He researched professional methodologies independently.',                           dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'pe4',  date:'2026-01-24', text:'Dev\'s leadership portfolio documented genuine mentoring of younger students in the intramural program. Authentic leadership.',                               dims:['collaboration','engagement'], sentiment:'strength', context:'independent' },
      { sid:'pe4',  date:'2026-03-01', text:'Dev\'s biomechanics analysis was technically sophisticated. He identified force production patterns that affect performance.',                                 dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe5',  date:'2025-10-25', text:'Chloe showed strong sport skills in volleyball. Her serving technique improved noticeably after coaching feedback.',                                          dims:['resilience','engagement'],    sentiment:'growth',   context:'whole-class' },
      { sid:'pe5',  date:'2025-12-06', text:'Chloe\'s mental health reflection was deeply thoughtful. She identified patterns in her stress responses with maturity.',                                     dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe5',  date:'2026-01-24', text:'Chloe organized a peer stretching routine that several classmates adopted. Quiet but effective leadership.',                                                  dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe5',  date:'2026-02-08', text:'Chloe challenged herself on the advanced snowshoe trail and completed it with a positive attitude despite fatigue.',                                          dims:['resilience'],                sentiment:'strength', context:'independent' },
      { sid:'pe5',  date:'2026-03-15', text:'Chloe\'s wellness goals are specific, measurable, and realistic. She has a clear plan for staying active post-graduation.',                                   dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe6',  date:'2026-02-08', text:'Kai pushed past their comfort zone on the snowshoe trip \u2014 completed the advanced trail despite initial hesitation. Big growth moment.',                 dims:['resilience'],                sentiment:'strength', context:'independent' },
      { sid:'pe6',  date:'2025-10-04', text:'Kai\'s fitness plan was thoughtfully designed with attention to balance across all fitness components.',                                                       dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'pe6',  date:'2025-12-06', text:'Kai\'s mental health reflection showed genuine vulnerability and self-awareness. They identified specific strategies that work for them.',                    dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe6',  date:'2026-01-24', text:'Kai advocated for inclusive practices during the sport unit. They suggested modifications that allowed all students to participate meaningfully.',             dims:['respect','collaboration'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe6',  date:'2026-03-15', text:'Kai\'s wellness plan addressed multiple dimensions of health with practical strategies. Their post-graduation plan is realistic and comprehensive.',          dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe7',  date:'2025-10-25', text:'Hana showed natural athletic ability across multiple sports. Her tactical awareness in basketball was particularly strong.',                                   dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'pe7',  date:'2025-11-15', text:'Hana\'s nutrition analysis was thorough and she identified areas for improvement in her own diet with honesty.',                                              dims:['selfRegulation','curiosity'], sentiment:'strength', context:'independent' },
      { sid:'pe7',  date:'2026-01-24', text:'Hana took on a coaching role during the sport skills unit, breaking down complex techniques for less confident classmates.',                                  dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe7',  date:'2026-03-01', text:'Hana\'s biomechanics analysis showed strong understanding of movement efficiency. She applied the principles to improve her own jump shot.',                 dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe7',  date:'2026-03-15', text:'Hana\'s wellness goals include maintaining sport involvement through recreational leagues post-graduation. Realistic and motivating.',                        dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe8',  date:'2025-10-30', text:'Luca\'s movement analysis skills are exceptional. He identified form corrections for three classmates that immediately improved their technique.',            dims:['curiosity','collaboration'],  sentiment:'strength', context:'small-group' },
      { sid:'pe8',  date:'2025-11-15', text:'Luca\'s nutrition analysis connected macronutrient timing to athletic performance. He researched beyond the assignment requirements.',                        dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe8',  date:'2026-01-24', text:'Luca\'s leadership portfolio documented coaching peers in weight room technique. His safety awareness is exemplary.',                                          dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'pe8',  date:'2026-02-08', text:'Luca was a natural leader on the snowshoe trip \u2014 he checked on slower group members and adjusted the pace to include everyone.',                        dims:['collaboration','respect'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe9',  date:'2026-01-10', text:'Ava organized a peer-led yoga session during free choice Friday. Several students said it was the highlight of their week.',                                  dims:['collaboration','engagement'], sentiment:'strength', context:'whole-class' },
      { sid:'pe9',  date:'2025-10-04', text:'Ava\'s fitness plan showed creative variety \u2014 she incorporated dance, hiking, and swimming alongside traditional gym work.',                            dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe9',  date:'2025-12-06', text:'Ava\'s mental health reflection connected physical activity to emotional well-being with specific personal examples.',                                        dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe9',  date:'2026-02-08', text:'Ava supported classmates who were nervous about the snowshoe trip. She paired up with a hesitant student and walked with them.',                              dims:['collaboration','respect'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe9',  date:'2026-03-15', text:'Ava\'s wellness goals include continuing to lead community wellness activities. She has a clear, motivating plan for post-graduation health.',               dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe10', date:'2025-10-25', text:'Ravi showed solid sport skills and consistent effort during both volleyball and basketball units.',                                                            dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'pe10', date:'2025-12-06', text:'Ravi\'s mental health reflection was thoughtful. He identified effective coping strategies and was honest about areas for growth.',                            dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe10', date:'2026-01-24', text:'Ravi documented consistent participation in intramural activities for his leadership portfolio. He models fair play.',                                          dims:['engagement','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe10', date:'2026-03-01', text:'Ravi\'s biomechanics analysis of his cricket bowling technique was insightful. He connected cultural sport traditions to kinesiology concepts.',               dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe10', date:'2026-03-15', text:'Ravi\'s wellness plan includes maintaining cricket involvement and addressing nutrition for athletic performance. Practical and realistic.',                   dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe11', date:'2025-10-04', text:'Elena\'s fitness plan was well-organized with clear goals and progression. She tracked her baseline data carefully.',                                          dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe11', date:'2025-12-06', text:'Elena\'s mental health reflection connected stress management to her academic workload with honesty and insight.',                                             dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'pe11', date:'2026-01-24', text:'Elena helped organize the class fitness challenge and ensured inclusive participation. She adapted exercises for different ability levels.',                    dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'pe11', date:'2026-02-08', text:'Elena was encouraging to classmates on the snowshoe trip. She stayed positive even when the weather was difficult.',                                           dims:['resilience','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe11', date:'2026-03-15', text:'Elena\'s wellness plan integrates multiple dimensions of health with realistic strategies for managing the transition to post-secondary life.',               dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe12', date:'2026-01-28', text:'Jamal showed outstanding leadership during the group fitness challenge. He ensured every team member was included and motivated.',                            dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe12', date:'2025-10-25', text:'Jamal excels in sport settings. His basketball skills are exceptional and he plays with genuine sportsmanship.',                                               dims:['engagement','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe12', date:'2025-11-15', text:'Jamal\'s nutrition analysis was brief but showed understanding of key concepts. His verbal explanations are stronger than his written work.',                  dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'pe12', date:'2026-03-01', text:'Jamal\'s biomechanics analysis of his own basketball shooting form was detailed and he used video analysis effectively.',                                      dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe12', date:'2026-03-15', text:'Jamal\'s wellness goals focus on continuing sport involvement and developing leadership skills. He plans to coach youth basketball.',                          dims:['engagement','collaboration'], sentiment:'strength', context:'independent' },
      { sid:'pe13', date:'2025-10-25', text:'Yuki showed consistent effort across all sport skills. She is not naturally athletic but tries everything with positive energy.',                              dims:['resilience','engagement'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe13', date:'2025-12-06', text:'Yuki\'s mental health reflection identified specific stressors and coping strategies. She is self-aware and proactive.',                                       dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe13', date:'2026-01-24', text:'Yuki organized a study group for the health knowledge portion of the course. She made sure everyone understood the content.',                                  dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'pe13', date:'2026-02-08', text:'Yuki pushed herself on the snowshoe trip and completed the intermediate trail with a positive attitude.',                                                      dims:['resilience','engagement'],    sentiment:'strength', context:'independent' },
      { sid:'pe13', date:'2026-03-15', text:'Yuki\'s wellness plan is detailed and realistic. She connected physical activity to mental well-being with specific personal evidence.',                       dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe14', date:'2025-10-04', text:'Marco\'s fitness plan showed understanding of progressive overload but could include more variety in exercise selection.',                                      dims:['engagement'],                sentiment:'strength', context:'independent' },
      { sid:'pe14', date:'2025-10-25', text:'Marco showed strong athletic skills in both volleyball and basketball. His competitive drive is well-channeled.',                                              dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'pe14', date:'2026-01-24', text:'Marco\'s leadership portfolio documented coaching younger players in the school\'s soccer program. Authentic engagement.',                                     dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe14', date:'2026-03-01', text:'Marco\'s biomechanics analysis of his soccer kick showed strong understanding of force production and kinetic chain.',                                         dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe14', date:'2026-03-15', text:'Marco plans to play recreational soccer post-graduation and maintain a fitness routine. His goals are practical and achievable.',                              dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe15', date:'2025-10-25', text:'Aria showed graceful movement skills in volleyball. She adapts her technique based on feedback quickly.',                                                      dims:['engagement','resilience'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe15', date:'2025-12-06', text:'Aria\'s mental health reflection connected nature exposure to well-being, citing research she found independently.',                                           dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'pe15', date:'2026-01-24', text:'Aria organized a nature walk as part of her leadership portfolio. She framed it as a mental health activity and several students loved it.',                   dims:['collaboration','curiosity'],  sentiment:'strength', context:'whole-class' },
      { sid:'pe15', date:'2026-02-08', text:'Aria led the group\'s reflection circle after the snowshoe trip. She facilitated a genuine conversation about pushing comfort zones.',                         dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe15', date:'2026-03-15', text:'Aria\'s wellness plan includes outdoor activities and mindfulness practices. She has a holistic, evidence-based approach to health.',                           dims:['selfRegulation','curiosity'], sentiment:'strength', context:'independent' },
      { sid:'pe16', date:'2025-11-08', text:'Tariq was reluctant to participate in the nutrition analysis \u2014 said it felt too personal. We discussed alternative approaches and he agreed to analyze a hypothetical diet instead.', dims:['selfRegulation'], sentiment:'concern', context:'independent' },
      { sid:'pe16', date:'2026-03-05', text:'Tariq showed real growth in the wellness goal setting \u2014 his SMART goals were specific and realistic. First time he\'s shown genuine investment in the health component.', dims:['engagement','resilience'], sentiment:'growth', context:'independent' },
      { sid:'pe16', date:'2025-10-25', text:'Tariq participates enthusiastically in sport activities. His energy is positive even if his skills are developing.',                                           dims:['engagement','resilience'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe16', date:'2026-01-24', text:'Tariq\'s leadership portfolio was minimal but he showed genuine effort when given a structured template to work from.',                                        dims:['selfRegulation'],            sentiment:'growth',   context:'independent' },
      { sid:'pe17', date:'2025-10-04', text:'Mila\'s fitness plan was well-structured with clear SMART goals. She tracked her progress consistently.',                                                      dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe17', date:'2025-12-06', text:'Mila\'s mental health reflection was one of the most insightful in the class. She connected cultural expectations to stress with maturity.',                   dims:['selfRegulation','curiosity'], sentiment:'strength', context:'independent' },
      { sid:'pe17', date:'2026-01-24', text:'Mila\'s leadership portfolio documented organizing a wellness week event for the school. Initiative and follow-through.',                                      dims:['collaboration','engagement'], sentiment:'strength', context:'whole-class' },
      { sid:'pe17', date:'2026-02-08', text:'Mila supported a nervous classmate on the snowshoe trip. She walked at their pace and kept conversation going.',                                               dims:['respect','collaboration'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe17', date:'2026-03-15', text:'Mila\'s wellness goals include maintaining dance practice and developing a sustainable nutrition plan. Realistic and well-thought-through.',                   dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe18', date:'2025-10-25', text:'Jesse showed strong natural athleticism in basketball. He is competitive but always plays fair.',                                                               dims:['engagement','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe18', date:'2025-12-06', text:'Jesse\'s mental health reflection was brief but showed genuine understanding of stress management. He connects physical activity to mental wellness.',         dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe18', date:'2026-02-08', text:'Jesse was one of the strongest hikers on the snowshoe trip. He helped carry equipment for classmates who were struggling.',                                     dims:['resilience','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe18', date:'2026-03-01', text:'Jesse\'s biomechanics analysis of his lacrosse throw was detailed and he applied findings to improve his technique immediately.',                               dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe18', date:'2026-03-15', text:'Jesse plans to continue outdoor recreation and traditional Indigenous sport post-graduation. His wellness plan is authentic and personally meaningful.',        dims:['engagement','selfRegulation'],sentiment:'strength', context:'independent' },
      { sid:'pe19', date:'2026-01-15', text:'Suki was disengaged during the leadership portfolio work time. She said she doesn\'t see herself as a leader. We discussed different forms of leadership.',   dims:['selfRegulation','engagement'],sentiment:'concern',  context:'independent' },
      { sid:'pe19', date:'2025-10-25', text:'Suki participated in sport activities with effort but holds back from competitive situations.',                                                                dims:['engagement'],                sentiment:'growth',   context:'whole-class' },
      { sid:'pe19', date:'2025-12-06', text:'Suki\'s mental health reflection showed genuine self-awareness. She identified patterns in her anxiety and listed coping strategies.',                          dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe19', date:'2026-02-08', text:'Suki completed the snowshoe trip with encouragement. She reflected afterward that she was glad she pushed through.',                                           dims:['resilience'],                sentiment:'growth',   context:'independent' },
      { sid:'pe19', date:'2026-03-15', text:'Suki\'s wellness plan focuses on low-pressure physical activities like walking and yoga. Realistic for who she is.',                                           dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe20', date:'2025-10-20', text:'Brennan skipped the fitness plan deadline. When we talked, he said he finds written work in PHE frustrating. We set up a verbal alternative for next time.',   dims:['selfRegulation'],            sentiment:'concern',  context:'independent' },
      { sid:'pe20', date:'2025-10-25', text:'Brennan excels in sport activities. His basketball skills are strong and he plays with energy.',                                                               dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'pe20', date:'2026-01-24', text:'Brennan completed the leadership portfolio verbally. His ideas about leadership were thoughtful even if writing them down is a barrier.',                      dims:['resilience','engagement'],    sentiment:'growth',   context:'independent' },
      { sid:'pe20', date:'2026-02-08', text:'Brennan was fully engaged on the snowshoe trip. Physical challenges motivate him more than written assignments.',                                              dims:['engagement','resilience'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe20', date:'2026-03-15', text:'Brennan\'s wellness goals focus on staying active through team sports. His plan is simple but realistic for him.',                                              dims:['selfRegulation'],            sentiment:'growth',   context:'independent' },
      { sid:'pe21', date:'2025-10-04', text:'Nina\'s fitness plan was thorough and showed understanding of training principles. She set specific, measurable goals.',                                        dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe21', date:'2025-10-25', text:'Nina showed strong coordination and tactical awareness during the volleyball unit.',                                                                           dims:['engagement'],                sentiment:'strength', context:'whole-class' },
      { sid:'pe21', date:'2026-01-24', text:'Nina\'s leadership portfolio documented organizing warm-up routines for the class. She adapted exercises for different fitness levels.',                       dims:['collaboration','engagement'], sentiment:'strength', context:'small-group' },
      { sid:'pe21', date:'2026-03-01', text:'Nina\'s biomechanics analysis was detailed and she applied her findings to adjust her volleyball serve technique.',                                             dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe21', date:'2026-03-15', text:'Nina plans to join a recreational volleyball league post-graduation. Her wellness goals are realistic and include multiple health dimensions.',                dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe22', date:'2025-10-25', text:'Amir showed enthusiastic participation in sport activities. He is building skills and plays with good sportsmanship.',                                         dims:['engagement','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe22', date:'2025-12-06', text:'Amir\'s mental health reflection was brief but showed understanding of key concepts. He identified exercise as his primary coping strategy.',                  dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe22', date:'2026-02-08', text:'Amir was encouraging to other students on the snowshoe trip. He stayed positive and helped motivate the group.',                                               dims:['respect','collaboration'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe22', date:'2026-03-01', text:'Amir\'s biomechanics analysis of his soccer footwork showed growing analytical thinking. He applied video analysis effectively.',                              dims:['curiosity','engagement'],     sentiment:'growth',   context:'independent' },
      { sid:'pe22', date:'2026-03-15', text:'Amir plans to continue playing recreational soccer and establish a regular gym routine. His wellness goals are practical.',                                     dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe23', date:'2025-10-04', text:'Freya\'s fitness plan was one of the best in the class. She incorporated evidence-based training principles with precision.',                                  dims:['engagement','curiosity'],     sentiment:'strength', context:'independent' },
      { sid:'pe23', date:'2025-12-06', text:'Freya\'s mental health reflection connected Nordic wellness practices to evidence-based strategies. Creative and well-researched.',                            dims:['curiosity','selfRegulation'], sentiment:'strength', context:'independent' },
      { sid:'pe23', date:'2026-01-24', text:'Freya\'s leadership portfolio documented organizing outdoor fitness activities. She brought a Scandinavian approach to winter exercise.',                      dims:['curiosity','collaboration'],  sentiment:'strength', context:'small-group' },
      { sid:'pe23', date:'2026-03-01', text:'Freya\'s biomechanics analysis was exceptionally thorough. She identified micro-adjustments that could improve efficiency.',                                    dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe23', date:'2026-03-15', text:'Freya has a comprehensive post-graduation wellness plan that integrates outdoor activity, nutrition, and mental health practices. Exemplary.',                 dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe24', date:'2025-10-25', text:'Dante brought high energy to sport activities. He is competitive but needs reminders about sportsmanship when intensity rises.',                               dims:['engagement'],                sentiment:'concern',  context:'whole-class' },
      { sid:'pe24', date:'2025-12-06', text:'Dante\'s mental health reflection was surprisingly thoughtful. He wrote honestly about managing competitive pressure.',                                        dims:['selfRegulation','resilience'],sentiment:'strength', context:'independent' },
      { sid:'pe24', date:'2026-01-24', text:'Dante organized a pickup basketball game for students who don\'t usually play. Inclusive leadership.',                                                         dims:['collaboration','respect'],    sentiment:'strength', context:'whole-class' },
      { sid:'pe24', date:'2026-02-08', text:'Dante tackled the advanced snowshoe trail with enthusiasm. His physical fitness is a genuine strength.',                                                       dims:['engagement','resilience'],    sentiment:'strength', context:'independent' },
      { sid:'pe24', date:'2026-03-15', text:'Dante\'s wellness goals focus on channeling his competitive energy into positive outlets. His plan includes community sport coaching.',                         dims:['selfRegulation','engagement'],sentiment:'growth',   context:'independent' },
      { sid:'pe25', date:'2025-10-04', text:'Leila\'s fitness plan was thoughtful and well-researched. She addressed all components of fitness with clear progression.',                                     dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' },
      { sid:'pe25', date:'2025-12-06', text:'Leila\'s mental health reflection was mature and insightful. She connected cultural expectations to personal well-being.',                                     dims:['selfRegulation','curiosity'], sentiment:'strength', context:'independent' },
      { sid:'pe25', date:'2026-01-24', text:'Leila\'s leadership portfolio documented mentoring a junior student in fitness goal-setting. Patient and encouraging.',                                        dims:['collaboration','respect'],    sentiment:'strength', context:'small-group' },
      { sid:'pe25', date:'2026-03-01', text:'Leila\'s biomechanics analysis connected movement efficiency to injury prevention. She applied research she found independently.',                             dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe25', date:'2026-03-15', text:'Leila has an excellent post-graduation wellness plan that addresses the transition from high school athletics to independent fitness.',                         dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe26', date:'2025-10-25', text:'Finn showed strong natural athleticism in basketball. He plays with energy and fair play.',                                                                     dims:['engagement','respect'],       sentiment:'strength', context:'whole-class' },
      { sid:'pe26', date:'2025-12-06', text:'Finn\'s mental health reflection was brief but honest. He identified physical activity as his main way of managing stress.',                                    dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe26', date:'2026-02-08', text:'Finn thrived on the snowshoe trip. He helped set the pace and encouraged classmates who were struggling.',                                                      dims:['collaboration','resilience'], sentiment:'strength', context:'whole-class' },
      { sid:'pe26', date:'2026-03-01', text:'Finn\'s biomechanics analysis was more detailed than expected. He analyzed his hockey slap shot with genuine interest.',                                        dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe26', date:'2026-03-15', text:'Finn plans to continue playing hockey and maintain fitness through outdoor activities. His goals are practical and achievable.',                                dims:['selfRegulation'],            sentiment:'strength', context:'independent' },
      { sid:'pe27', date:'2025-10-04', text:'Preet\'s fitness plan was comprehensive and well-structured. She incorporated dance as a creative fitness component.',                                          dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe27', date:'2025-12-06', text:'Preet\'s mental health reflection was one of the most insightful in the class. She connected mindfulness practices from her cultural background to evidence-based strategies.', dims:['selfRegulation','curiosity'], sentiment:'strength', context:'independent' },
      { sid:'pe27', date:'2026-01-24', text:'Preet organized a mindfulness session for classmates as part of her leadership portfolio. Several students said it helped them manage exam stress.',           dims:['collaboration','engagement'], sentiment:'strength', context:'whole-class' },
      { sid:'pe27', date:'2026-03-01', text:'Preet\'s biomechanics analysis connected dance movement patterns to athletic performance. Creative and analytically strong.',                                   dims:['curiosity','engagement'],     sentiment:'strength', context:'independent' },
      { sid:'pe27', date:'2026-03-15', text:'Preet has an excellent wellness plan that integrates cultural practices, physical fitness, and mental health strategies. Holistic and realistic.',              dims:['selfRegulation','engagement'],sentiment:'strength', context:'independent' }
    ]));

    // Term ratings
    const phe12TR = {};
    phe12TR['pe1']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Zara brings analytical thinking to PHE. Her fitness plan was well-researched and her leadership in the intramural program is authentic. She approaches health topics with the same rigour she brings to academic subjects.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Zara\'s biomechanics analysis connected movement patterns to injury prevention research she found independently. Her wellness plan for post-graduation is comprehensive. She models thoughtful, evidence-based health practices.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe2']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Owen is a natural leader in PHE. He leads warm-ups with creativity, adapts for different fitness levels, and his sportsmanship is outstanding. His fitness plan incorporated periodization concepts beyond the grade level.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Owen demonstrated exceptional sportsmanship this term and his biomechanics lab used sophisticated video analysis. He continues to lead by example and his nutrition research goes well beyond requirements. A model PHE student.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe3']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:3, respect:4}, narrative:'Isla shows strong self-awareness and reflective skills in PHE. Her mental health journal was the most honest in the class and she adapts quickly to different sports. She mentors peers with patience during fitness activities.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Isla pushed her endurance limits on the snowshoe trip and her wellness plan for post-graduation is realistic and comprehensive. She identified specific strategies for managing stress during transitions. Growing self-direction.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe4']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Dev is an outstanding PHE student who mentors younger students authentically. His fitness plan demonstrated advanced understanding of training principles and his leadership portfolio documented genuine community engagement.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Dev\'s biomechanics analysis was technically sophisticated and his leadership continues to be authentic and impactful. He mentors grade 9 students in the intramural program with patience and skill. Exceptional in every dimension.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe5']  = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Chloe is a reliable participant who improves steadily with coaching feedback. Her mental health reflection showed real maturity. She is quiet but contributes through consistent effort and supportive behaviour.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:3, respect:4}, narrative:'Chloe organized a peer stretching routine, challenged herself on the advanced snowshoe trail, and her wellness goals are specific and realistic. She is growing in confidence and leadership.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe6']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Kai approaches PHE thoughtfully and advocates for inclusive practices. Their fitness plan was balanced and their mental health reflection showed genuine vulnerability. They bring a calm, positive presence to every activity.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Kai pushed past their comfort zone on the snowshoe trip and advocated for inclusive modifications during the sport unit. Their wellness plan addresses multiple dimensions of health with practical strategies. Growing in resilience and self-awareness.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe7']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Hana is a natural athlete with strong tactical awareness. She took on a coaching role during the sport skills unit and her nutrition analysis was thorough. She could push herself further in the health knowledge components.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Hana\'s biomechanics analysis showed strong understanding of movement efficiency and she applied the principles to improve her own jump shot. Her wellness goals for post-graduation are realistic and motivating.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe8']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Luca\'s movement analysis skills are exceptional. He identifies form corrections that immediately improve classmates\' technique. His nutrition analysis connected macronutrient timing to athletic performance. A standout PHE student.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Luca\'s biomechanics analysis was the most technically detailed in the class and he led with care on the snowshoe trip. He coaches peers in weight room technique with safety awareness. Exceptional across all PHE dimensions.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe9']  = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ava brings creative energy to PHE. She organized a peer-led yoga session and her fitness plan incorporated diverse activities. Her mental health reflection connected physical activity to emotional well-being with specific personal examples.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ava supported nervous classmates on the snowshoe trip and continues to lead wellness activities. Her post-graduation plan includes community wellness programming. A genuine leader who lifts others up.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe10'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Ravi participates consistently and models fair play. His mental health reflection was thoughtful and he identifies effective coping strategies. He could push himself further by exploring leadership opportunities.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Ravi\'s biomechanics analysis of his cricket technique was insightful, connecting cultural sport traditions to kinesiology concepts. His wellness plan is practical and addresses athletic nutrition. Growing analytical skills.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe11'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:3, respect:4}, narrative:'Elena is organized and reliable in PHE. Her fitness plan tracked baseline data carefully and she helped organize the class fitness challenge. Her mental health reflection connected stress management to academic workload with insight.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:3, respect:4}, narrative:'Elena was encouraging on the snowshoe trip and her wellness plan integrates multiple health dimensions for the transition to post-secondary life. She adapts exercises for different ability levels with care and inclusivity.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe12'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:3, resilience:4, curiosity:3, respect:4}, narrative:'Jamal excels in sport settings and shows outstanding leadership during group activities. His basketball skills are exceptional and his sportsmanship is genuine. His written work could be more detailed but his verbal understanding is strong.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Jamal\'s biomechanics analysis of his basketball form was detailed and he used video analysis effectively. He plans to coach youth basketball post-graduation \u2014 his leadership is authentic. His written work has improved with structure.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe13'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:3, respect:4}, narrative:'Yuki may not be the most naturally athletic student but she tries everything with positive energy and persistence. Her mental health reflection was self-aware and she organized study groups for health knowledge content.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Yuki pushed herself on the snowshoe trip and her wellness plan connects physical activity to mental well-being with specific personal evidence. She helps others learn and her positive attitude is infectious.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe14'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Marco is a strong athlete with competitive drive that he channels well. His fitness plan showed understanding of progressive overload but could include more variety. He coaches younger players in soccer with genuine engagement.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:3, resilience:3, curiosity:4, respect:4}, narrative:'Marco\'s biomechanics analysis of his soccer kick showed strong understanding of force production. He plans to play recreational sport post-graduation and his goals are practical. Growing in analytical thinking.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe15'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Aria brings a holistic approach to PHE. She connected nature exposure to well-being in her mental health reflection, citing research independently. She adapts her technique based on feedback quickly.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Aria organized a nature walk for her leadership portfolio and led the reflection circle after the snowshoe trip. Her wellness plan includes outdoor activities and mindfulness practices \u2014 holistic and evidence-based.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe16'] = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:2, resilience:2, curiosity:2, respect:3}, narrative:'Tariq participates enthusiastically in sport activities but resists the health and nutrition components. He found the nutrition analysis too personal and needed alternative approaches. He benefits from structured support and clear expectations.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:3}, narrative:'Tariq showed real growth in wellness goal setting this term \u2014 his SMART goals were specific and realistic for the first time. His sport participation remains strong. He is beginning to see value in the health components of PHE.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe17'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mila brings insight and cultural awareness to health topics. Her mental health reflection connected cultural expectations to stress with maturity, and her fitness plan tracked progress consistently. She organized a wellness week event.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Mila supported a nervous classmate on the snowshoe trip and her wellness goals include maintaining dance practice and sustainable nutrition. She is developing leadership skills through community engagement. Thoughtful and dependable.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe18'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:4}, narrative:'Jesse is a strong athlete who plays with fair play and sportsmanship. His written reflections are brief but show understanding of key concepts. He connects physical activity to mental wellness naturally. He could push further in the health knowledge areas.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:4, curiosity:3, respect:4}, narrative:'Jesse was one of the strongest hikers on the snowshoe trip and helped carry equipment for struggling classmates. His biomechanics analysis of his lacrosse throw was detailed. His post-graduation plan includes outdoor recreation and traditional sport.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe19'] = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:3, resilience:2, curiosity:2, respect:3}, narrative:'Suki participates in sport activities but holds back from competitive situations. She was disengaged during the leadership portfolio work and said she doesn\'t see herself as a leader. Her mental health reflection showed genuine self-awareness about her anxiety.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:2, selfRegulation:3, resilience:3, curiosity:2, respect:3}, narrative:'Suki completed the snowshoe trip with encouragement and reflected that she was glad she pushed through. Her wellness plan focuses on low-pressure activities that she will actually sustain. She is building resilience slowly and the growth is real.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe20'] = { 'term-1': { dims:{engagement:2, collaboration:2, selfRegulation:1, resilience:2, curiosity:2, respect:3}, narrative:'Brennan excels in sport activities but finds written PHE work frustrating. He skipped the fitness plan deadline and needs alternative formats for demonstrating his understanding. He plays with energy and his basketball skills are strong.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Brennan completed the leadership portfolio verbally and was fully engaged on the snowshoe trip. Physical challenges motivate him more than written work. His wellness goals are simple but realistic. He is learning that health is more than just athletics.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe21'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Nina is an organized, engaged PHE student who sets specific, measurable goals. Her fitness plan was thorough and her volleyball skills showed strong tactical awareness. She adapted warm-up routines for different fitness levels.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Nina applied biomechanics analysis to adjust her volleyball serve technique and her wellness goals include multiple health dimensions. She plans to join a recreational league post-graduation. Consistent and growing.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe22'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:4}, narrative:'Amir participates enthusiastically in sport activities and plays with good sportsmanship. His mental health reflection was brief but showed understanding of key concepts. He is building skills and confidence.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:4, selfRegulation:3, resilience:3, curiosity:3, respect:4}, narrative:'Amir was encouraging to others on the snowshoe trip and his biomechanics analysis showed growing analytical thinking. He plans to continue recreational soccer and establish a gym routine. Building competence and confidence.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe23'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Freya is one of the strongest PHE students in the class. Her fitness plan incorporated evidence-based training principles with precision and she connected Nordic wellness practices to health strategies. Her analytical approach to movement is impressive.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:4, curiosity:4, respect:4}, narrative:'Freya\'s biomechanics analysis was exceptionally thorough and she organized outdoor fitness activities. Her post-graduation wellness plan integrates outdoor activity, nutrition, and mental health. An exemplary PHE student.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe24'] = { 'term-1': { dims:{engagement:3, collaboration:3, selfRegulation:2, resilience:3, curiosity:2, respect:3}, narrative:'Dante brings high energy to sport activities but needs reminders about sportsmanship when intensity rises. His mental health reflection was surprisingly thoughtful. He could develop further in the health knowledge components.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:3, collaboration:4, selfRegulation:3, resilience:3, curiosity:3, respect:3}, narrative:'Dante organized a pickup basketball game that was genuinely inclusive and tackled the advanced snowshoe trail with enthusiasm. His wellness goals channel competitive energy into positive outlets. Growing in leadership.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe25'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Leila approaches PHE with the same analytical rigour she brings to academics. Her fitness plan was thoughtful and her mental health reflection connected cultural expectations to personal well-being with maturity.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Leila\'s biomechanics analysis connected movement efficiency to injury prevention and she mentored a junior student in fitness goal-setting. Her post-graduation wellness plan addresses the transition from school athletics. Thoughtful and growing.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe26'] = { 'term-1': { dims:{engagement:4, collaboration:3, selfRegulation:3, resilience:3, curiosity:2, respect:4}, narrative:'Finn is a strong athlete who plays with energy and fair play. His mental health reflection was brief but honest. He is stronger in the physical components than the health knowledge areas.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:3, resilience:4, curiosity:3, respect:4}, narrative:'Finn thrived on the snowshoe trip, helping set the pace and encouraging others. His biomechanics analysis of his hockey slap shot showed genuine interest. He plans to continue outdoor activities and hockey post-graduation.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    phe12TR['pe27'] = { 'term-1': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Preet brings a holistic approach to health and wellness. She incorporated dance as a creative fitness component and connected mindfulness from her cultural background to evidence-based strategies. Her mental health reflection was insightful.', created:new Date('2025-12-20').toISOString(), modified:new Date('2025-12-20').toISOString() }, 'term-2': { dims:{engagement:4, collaboration:4, selfRegulation:4, resilience:3, curiosity:4, respect:4}, narrative:'Preet organized a mindfulness session for classmates that helped with exam stress and her biomechanics analysis connected dance patterns to athletic performance. Her wellness plan integrates cultural practices with evidence-based strategies. Holistic and inspiring.', created:new Date('2026-03-20').toISOString(), modified:new Date('2026-03-20').toISOString() } };
    saveTermRatings('phe12', phe12TR);
  }

  // ── Migrate old gb-notes into gb-quick-obs (one-time) ──
  Object.keys(COURSES).forEach(cid => {
    const oldNotes = getNotes(cid);
    const hasOld = Object.keys(oldNotes).some(sid => (oldNotes[sid]||[]).length > 0);
    if (hasOld) {
      const obs = getQuickObs(cid);
      Object.keys(oldNotes).forEach(sid => {
        if (!obs[sid]) obs[sid] = [];
        const existingIds = new Set(obs[sid].map(o => o.id));
        (oldNotes[sid]||[]).forEach(n => {
          if (!existingIds.has(n.id)) {
            obs[sid].push({
              id: n.id, text: n.text, dims: [],
              created: n.created || new Date().toISOString(),
              date: (n.created || '').slice(0,10) || getTodayStr()
            });
          }
        });
      });
      saveQuickObs(cid, obs);
      localStorage.removeItem('gb-notes-' + cid);
    }
  });
}
