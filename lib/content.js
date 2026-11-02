export const defaults = {
  settings: {
    name: 'Obayedullah Khan', shortName: 'Obayed', email: 'obayedullahkhan986@gmail.com',
    intro: 'I build websites, mobile apps, and digital products that make an idea useful.',
    availability: 'Open to project conversations', location: 'Bangladesh',
    about: 'I work across the MERN stack and React Native, connecting the interface people see with the systems that make it work. I’m especially interested in practical AI tools and products with a clear purpose.'
  },
  projects: [
    {slug:'city-sheba', art:'city', title:'City Sheba', summary:'A community platform, built close to home.', category:'web', status:'In development', published:true, color:'green',
      headline:'Local help should feel a little closer.', role:'Full-stack development · Co-founder', stack:['Next.js','React Native','Expo','Express','MongoDB'],
      overview:'A community platform for Hajiganj, being built with my co-founder Yasin. It brings blood donor discovery and blood requests into a shared foundation for local services.',
      challenge:'Useful local information is often scattered. The product starts with a focused question: how can people find help in their own community with less friction?',
      approach:['Start with a useful foundation: verified accounts and donor profiles.','Use a shared API so the web and mobile experiences can grow together.','Build the blood request workflow before expanding into more local services.'],
      delivered:['Email OTP registration and login','Protected account and profile endpoints','Donor profile management merged into the main branch'],
      roadmap:['Blood request creation and management','Local healthcare and service directories','Notifications and wider community tools'],
      takeaway:'A community product needs a practical first version. The core workflows come before the wider feature list.',
      link:'https://github.com/The-JS-Foundry/City-Sheba',linkLabel:'Explore the source'},
    {slug:'lectra-ai',art:'lectra',title:'Lectra AI',summary:'A more natural way to learn from PDFs.',category:'ai',status:'In development',published:true,color:'purple',
      headline:'Less scrolling. More understanding.',role:'Product direction · Full-stack development',stack:['Next.js','Clerk','AI document workflows'],
      overview:'A PDF assistant exploring a more approachable way to ask questions about documents. The longer-term direction is a voice experience that explains material more like a teacher.',
      challenge:'A long document can be difficult to navigate when you only need to understand one idea. The experience should help someone ask, explore, and return to the material.',
      approach:['Keep a personal document library at the centre of the experience.','Make the upload-to-question journey easy to understand.','Explore voice explanations as a later layer of the learning workflow.'],
      delivered:['Next.js application foundation','Authentication direction using Clerk','Library and document upload experience in development'],
      roadmap:['Document questions grounded in the uploaded material','A clearer learning conversation around each PDF','Voice explanations as a future product direction'],
      takeaway:'The document should stay at the centre. AI is most useful when it helps someone understand the material, one question at a time.',link:'',linkLabel:''},
    {slug:'ai-recruiter',art:'recruiter',title:'AI Recruiter',summary:'A voice interview workflow for hiring teams.',category:'ai',status:'In development',published:true,color:'peach',
      headline:'A more considered first conversation.',role:'Full-stack development · AI integration',stack:['Next.js','Vapi','Supabase'],
      overview:'A product that connects interview creation, candidate voice interviews, and structured feedback in a hiring workspace.',
      challenge:'A voice agent is only one part of a hiring tool. The questions, candidate experience, stored feedback, and human review all need to fit together.',
      approach:['Give hiring teams a clear way to create an interview.','Connect the candidate journey to a Vapi voice agent.','Store structured feedback in Supabase for review by a person.'],
      delivered:['Interview creation and candidate workflow in development','Vapi voice agent integration','Structured interview feedback stored in Supabase'],
      roadmap:['Refine the hiring team review experience','Human meeting workflow','Payments and broader administration features'],
      takeaway:'Useful AI products connect an interaction to a workflow. The human reviewer needs an understandable record, not just a conversation.',link:'',linkLabel:''},
    {slug:'promptography',art:'promptography',title:'The Art of Promptography',summary:'An AI image prompt collection for everyday creators.',category:'digital',status:'Digital product',published:true,color:'yellow',
      headline:'Less blank canvas. More creating.',role:'Product creation · Prompt development',stack:['AI image prompts','Digital publishing','Product marketing'],
      overview:'An ebook of ready-to-use AI image prompts, created for people who want a practical starting point for making images.',
      challenge:'A blank prompt box can be intimidating. Examples help people describe a look, a setting, a subject, and the details that bring an image together.',
      approach:['Organise prompts around useful creative situations.','Explore portraits, products, environments, and visual styles.','Make the collection approachable through ready-to-use examples.'],
      delivered:['A digital prompt collection','Portrait and product photography categories','A product page for the current edition'],
      roadmap:['Expand and refine creative categories','Continue developing useful prompt examples','Keep the product presentation clear and approachable'],
      takeaway:'The same product instinct applies outside software: take a useful idea and give people a practical way to use it.',
      link:'https://sooftuniverse.com/ebook/the-art-of-promptography',linkLabel:'Visit the product page'}
  ],
  notes:[
    {slug:'the-smallest-useful-version',title:'Start with the smallest useful version.',summary:'A feature list is easy to grow. A clear first version takes more thought.',tag:'Product thinking',published:true,body:'A good first version starts with a single useful job. Who needs it? What are they trying to do? What should feel easier when they finish?\n\nFor a local community platform, that could mean finding a donor or creating a blood request. A long roadmap can wait while those essential steps become understandable.\n\nWrite down the one journey that matters most. Remove the features that do not help someone complete it. Build the journey, try it, and learn where it feels confusing.\n\nThe goal is a first version that teaches you something. Clear scope makes feedback more useful and gives the next iteration a reason to exist.'},
    {slug:'one-api-two-experiences',title:'One API. Two ways to use it.',summary:'Thinking about a shared foundation for web and mobile.',tag:'Engineering',published:true,body:'A web app and a mobile app can serve the same product without sharing every interface decision. The common ground often lives in the API.\n\nAccount rules, donor availability, profile updates, and request states should have one consistent meaning. A shared backend gives both clients a place to ask the same questions.\n\nThe interface can then respond to its context. Mobile navigation and touch interactions need different choices from a desktop workspace, while the underlying product rules remain aligned.\n\nFor a JavaScript stack, React and React Native are a practical pairing. The important part is a clear API contract, deliberate validation, and handling loading and error states in each experience.'},
    {slug:'ai-inside-the-workflow',title:'AI belongs inside a useful workflow.',summary:'The interaction matters. So does everything before and after it.',tag:'AI products',published:true,body:'An AI feature needs a purpose beyond producing a response. What did someone want to accomplish before they opened the tool, and what can they do after it responds?\n\nFor a PDF assistant, uploading a document is only the beginning. The user needs to ask a question, understand the explanation, and reconnect it to the material.\n\nFor a voice interview tool, the conversation needs a useful destination: structured feedback that a person can review. The handoff is part of the product.\n\nStart by drawing the whole journey. Make the input clear, keep the interaction understandable, and design the next useful action. AI becomes more valuable when the workflow around it is considered.'}
  ]
};

export const services = [
  {slug:'websites',number:'01',title:'Websites & landing pages',short:'A clearer home for your business.',summary:'A clear message, a thoughtful interface, and a useful next step.',description:'Responsive business websites, personal portfolios, and product landing pages built around what a visitor needs to understand and do.',icon:'↗',color:'green',
    deliverables:['A page structure shaped around your message','Responsive interfaces for mobile and desktop','Clear enquiry or purchase handoffs','Basic page metadata and social sharing details','Deployment and a practical handover'],
    fits:['A local business that needs a credible online home','A founder preparing to introduce a new product','A creator who wants a focused portfolio or sales page'],
    scope:['Landing page','Multi-page business website','Personal portfolio','Digital product page'],stack:['React','Next.js','Tailwind CSS'],
    faq:[['Can we start with a single page?','Yes. A focused landing page is often a useful first step. We can agree on the essential sections and expand from there.'],['Can I update the content?','We can include a content dashboard where the scope calls for it. We’ll agree which information needs to be editable before the build.'],['What do I need to provide?','Your business name, the offer, your audience, useful images or brand assets, and the action you want visitors to take. We can work through the structure together.']]},
  {slug:'full-stack',number:'02',title:'Full-stack products & MVPs',short:'From a rough idea to a useful first version.',summary:'Connect the interface with the systems that make it work.',description:'Frontends, APIs, authentication, databases, and dashboards—scoped around the features your first users actually need.',icon:'⌘',color:'purple',
    deliverables:['A focused feature scope and user journey','Frontend screens and responsive interactions','API endpoints and server-side validation','Authentication and application data models','Deployment, environment guidance, and handover'],
    fits:['A founder validating a practical software idea','A business replacing a repetitive manual workflow','An existing product that needs a new feature or API'],
    scope:['MVP / first version','Internal dashboard','API & backend','AI integration'],stack:['React / Next.js','Node.js / Express','MongoDB / Supabase'],
    faq:[['How do we decide the first version?','We start with the main user and the job they need to complete. Then we separate the essential workflow from features that can come later.'],['Can you work on an existing project?','Yes, after reviewing its code, current behaviour, and the change you need. That review helps define a realistic scope.'],['Can this include AI features?','Yes, when there is a clear use case. API usage, model access, and any third-party service costs are discussed as part of the scope.']]},
  {slug:'mobile-apps',number:'03',title:'Mobile apps with React Native',short:'Useful software, closer to everyday life.',summary:'A considered mobile experience with a shared foundation.',description:'Mobile products built with React Native and Expo, from navigation and everyday interactions to integration with your backend.',icon:'▯',color:'peach',
    deliverables:['Mobile screen flow and app navigation','React Native and Expo implementation','Loading, empty, and error states','Integration with a shared or existing API','Build and release preparation within the agreed scope'],
    fits:['A service that people need while on the go','A web product ready to explore a mobile experience','A founder testing an app idea with a focused first version'],
    scope:['New mobile app','Mobile version of a web product','App interface & integration','Existing app improvements'],stack:['React Native','Expo','Shared APIs'],
    faq:[['Can web and mobile share a backend?','Yes. A shared API can keep accounts and product rules consistent, while each interface is designed for its own context.'],['Does the scope include app store publishing?','We agree that explicitly. Store accounts, review requirements, and any platform fees belong in the release plan.'],['What if I only have an idea?','That is enough for a first conversation. We can define the main user journey and the smallest useful version together.']]}
];

export const processSteps = [
 ['Understand','Talk through the idea, the audience, and the problem worth solving.'],
 ['Shape','Agree the core journey, useful features, and a clear scope.'],
 ['Build','Connect the interface and backend, sharing progress as it takes shape.'],
 ['Refine & launch','Review real flows, resolve rough edges, and prepare the handover.']
];
export const commonFaq = [
 ['What kind of projects are a good fit?','Focused websites, business tools, product MVPs, and React Native apps. If the idea needs a clear interface and a practical JavaScript foundation, it is worth a conversation.'],
 ['Can we communicate in Bangla?','Of course. We can discuss the idea in Bangla or English—whichever helps you explain it more clearly.'],
 ['How are price and timeline decided?','After we understand the features, content, integrations, and release expectations. You will have a scope to review before agreeing to the work.'],
 ['Are the projects shown here already launched?','Each project has a visible stage. City Sheba, Lectra AI, and AI Recruiter are in development. The product previews are interface concepts; project pages explain the current scope and progress.']
];
