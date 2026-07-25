import { FeaturedProject } from "@/types/project";

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "financial-intelligence-platform",
    title: "Financial Intelligence Platform",
    subtitle: "A personal financial decision-support system built to centralise investments, cash flow, insurance, liabilities and long-term wealth tracking.",
    featured: true,
    displayOrder: 1,
    projectType: "Personal",
    category: "Financial Analytics",
    status: "Ongoing",
    year: "2026",
    duration: "Ongoing",
    coverImage: "/images/projects/financial-platform.webp",
    techStack: [
      "Power BI",
      "Google Sheets",
      "Power Query",
      "DAX",
      "Excel"
    ],
    skillsDemonstrated: [
      "Business Analysis",
      "Financial Analytics",
      "Data Modelling",
      "Dashboard Design",
      "Process Automation",
      "Power Query",
      "DAX",
      "Systems Thinking"
    ],
    overview: "The Financial Intelligence Platform is a personal finance ecosystem designed to replace fragmented spreadsheets with a connected reporting system. Instead of tracking investments, insurance policies, cash balances and future obligations separately, the platform consolidates them into a single analytical environment that supports better financial decision-making.",
    executiveSummary: "This project demonstrates how business analysis principles can be applied to personal finance. By combining structured data modelling, automated reporting and dashboard design, the platform provides a clear view of current financial health while supporting future planning through recurring cash flow forecasting and investment monitoring.",
    problemStatement: "Financial information was spread across multiple spreadsheets, investment portals and banking platforms. Monitoring overall financial health required significant manual effort, making it difficult to maintain an accurate and up-to-date view of assets, liabilities and future commitments.",
    businessContext: "Many individuals actively invest across different financial products but lack a central reporting system. Existing applications often focus on individual accounts rather than presenting a complete financial picture. The objective was to build a scalable reporting solution that behaves more like a business intelligence platform than a budgeting application.",
    objectives: [
      "Create a single source of truth for personal financial data.",
      "Centralise investments, savings, insurance and recurring commitments.",
      "Automate recurring calculations using Power Query and DAX.",
      "Improve visibility of net worth and future financial obligations.",
      "Design a scalable architecture that can continue growing over time."
    ],
    myThinking: "Rather than treating this as a dashboard project, I approached it as a business reporting system. Before building visualisations, I focused on designing a reliable data model with clear relationships between operational tables, master data and reporting measures. The objective was to minimise manual maintenance while ensuring that every dashboard metric could be traced back to structured source data.",
    architecture: [
      "Google Sheets as the operational database.",
      "Separate master tables for investments, cash accounts, insurance and recurring commitments.",
      "Power Query used for data preparation and transformation.",
      "Power BI semantic model with reusable DAX measures.",
      "Interactive dashboards for portfolio performance, cash flow and financial position."
    ],
    approachSteps: [
      "Defined business reporting requirements before designing the data structure.",
      "Built normalised source tables to reduce duplication.",
      "Developed Power Query transformations for consistent data preparation.",
      "Created reusable DAX measures for financial reporting.",
      "Designed dashboards focused on decision-making instead of data presentation.",
      "Continuously refined the platform as new financial products and reporting requirements emerged."
    ],
    challengesOvercome: "The largest challenge was designing a flexible data model capable of supporting different financial products without requiring structural changes every time a new investment or obligation was introduced. Considerable effort was spent simplifying recurring calculations while keeping the system scalable.",
    results: [
      "Centralised multiple financial data sources into a unified reporting platform.",
      "Reduced manual tracking through automated calculations and structured reporting.",
      "Improved visibility of cash flow, investments and future commitments.",
      "Created a scalable foundation for future financial planning features.",
      "Demonstrated how business intelligence techniques can be applied beyond corporate reporting."
    ],
    lessonsLearned: [
      "Well-designed data models simplify reporting far more than complex visualisations.",
      "Business requirements should drive dashboard design rather than available technology.",
      "Automation becomes significantly easier when source data follows consistent structures.",
      "Scalable systems require careful planning before implementation begins."
    ],
    futureImprovements: [
      "Live market data integration.",
      "Automated investment performance tracking.",
      "Scenario analysis for long-term financial planning.",
      "Mobile dashboard optimisation.",
      "AI-assisted financial insights."
    ]
  },
  {
    slug: "personal-portfolio-platform",
    title: "Personal Portfolio Platform",
    subtitle: "A modern professional website designed to communicate experience, analytical thinking and long-term career progression through structured storytelling.",
    featured: true,
    displayOrder: 2,
    projectType: "Personal",
    category: "Web Development",
    status: "Ongoing",
    year: "2026",
    duration: "Ongoing",
    coverImage: "/images/projects/personal-portfolio.webp",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Git"
    ],
    skillsDemonstrated: [
      "Business Analysis",
      "Product Thinking",
      "UX Strategy",
      "Information Architecture",
      "React Development",
      "TypeScript",
      "Responsive Design",
      "Content Strategy",
      "Component Architecture"
    ],
    overview: "This portfolio is more than a personal website—it is an evolving professional platform designed to communicate who I am, how I approach problems and the value I create. Rather than functioning as a traditional CV, it brings together my education, professional experience and technical projects into a connected narrative that reflects my journey as a Business & Data Analyst.",
    executiveSummary: "The project combines modern web technologies with business-focused storytelling to create a scalable digital platform. Every page has been intentionally structured to guide visitors through my professional journey, demonstrating not only technical capability but also analytical thinking, business understanding and continuous learning.",
    problemStatement: "Traditional portfolios often present disconnected information through static project cards and lengthy CV-style sections. They rarely explain the reasoning behind decisions, the business context of projects or how different experiences contribute to long-term professional growth.",
    businessContext: "Recruiters, hiring managers and industry professionals typically spend only a few minutes reviewing a candidate's profile. The challenge was to design a platform that communicates credibility quickly while encouraging deeper exploration. Instead of listing achievements, the website aims to demonstrate analytical thinking through clear structure, meaningful content and carefully designed user experience.",
    objectives: [
      "Create a long-term professional platform rather than a one-time job portfolio.",
      "Present experience through connected storytelling instead of chronological listings.",
      "Showcase projects as business case studies rather than coursework.",
      "Build a scalable architecture that supports future content and continuous updates.",
      "Deliver a modern, responsive experience across desktop and mobile devices."
    ],
    myThinking: "I approached this project as both a business problem and a software project. Before writing code, I focused on defining the user journey, deciding what questions each page should answer and ensuring every section reinforced a consistent professional identity. Technology became the tool for delivering that experience rather than the centre of the project itself.",
    architecture: [
      "Next.js App Router for scalable application structure.",
      "Reusable React components for consistent layouts and UI patterns.",
      "TypeScript interfaces for structured and maintainable data.",
      "Tailwind CSS design system for responsive styling.",
      "Framer Motion animations to improve navigation and user engagement.",
      "Data-driven project architecture allowing future expansion without major code changes.",
      "Deployment and version control through Vercel and Git."
    ],
    approachSteps: [
      "Defined a long-term personal brand and professional positioning.",
      "Mapped the complete website structure around a single career narrative.",
      "Designed reusable components to maintain consistency across pages.",
      "Separated content from presentation using structured TypeScript data models.",
      "Built responsive layouts prioritising readability and accessibility.",
      "Refined copy to emphasise business thinking instead of technical buzzwords.",
      "Continuously iterate by adding projects, experience and future case studies."
    ],
    challengesOvercome: "The greatest challenge was balancing technical implementation with professional storytelling. Rather than creating another developer portfolio, the objective was to build a platform that accurately reflects how I think, solve problems and continue learning. Achieving consistency across multiple pages while avoiding repetitive content required significant planning and multiple iterations.",
    results: [
      "Established a consistent professional brand across the entire website.",
      "Replaced a CV-style layout with a connected career narrative.",
      "Built a scalable architecture that supports future expansion.",
      "Created reusable components and structured data models for maintainability.",
      "Developed a professional platform that can evolve alongside my career over the next several years."
    ],
    lessonsLearned: [
      "Strong information architecture is as important as visual design.",
      "Content strategy should guide interface design, not the other way around.",
      "Reusable components improve both scalability and maintainability.",
      "Storytelling can communicate professional value more effectively than simply listing achievements.",
      "Building products for long-term growth requires designing beyond immediate requirements."
    ],
    futureImprovements: [
      "Dedicated project detail pages with richer visual case studies.",
      "Interactive analytics dashboards embedded within project pages.",
      "Integrated technical blog and knowledge-sharing section.",
      "Search functionality across projects and experience.",
      "Performance analytics and visitor insights dashboard.",
      "CMS integration for easier long-term content management."
    ]
  },
  {
    slug: "netflix-content-intelligence-dashboard",
    title: "Netflix Content Intelligence Dashboard",
    subtitle: "An end-to-end analytics solution that transforms raw Netflix catalogue data into actionable business insights through data preparation, modelling and interactive reporting.",
    featured: false,
    displayOrder: 3,
    projectType: "Academic",
    category: "Data Analytics",
    status: "Completed",
    year: "2025",
    duration: "6 Weeks",
    coverImage: "/images/projects/netflix-dashboard.webp",
    techStack: [
      "Python",
      "Pandas",
      "Power BI",
      "Jupyter Notebook",
      "Data Cleaning",
      "Data Visualisation"
    ],
    skillsDemonstrated: [
      "Data Analytics",
      "Exploratory Data Analysis",
      "Business Intelligence",
      "Python",
      "Pandas",
      "Dashboard Design",
      "Data Cleaning",
      "Data Storytelling"
    ],
    overview: "This project explores how entertainment data can be transformed into meaningful business intelligence. Using Python for data preparation and Power BI for reporting, I built an interactive dashboard that enables users to explore trends in Netflix's content catalogue, supporting data-driven understanding of genres, release patterns, geographic distribution and audience-focused insights.",
    executiveSummary: "Raw datasets often contain inconsistencies that limit their analytical value. This project focused on converting publicly available Netflix catalogue data into a reliable reporting model through systematic cleaning, transformation and visualisation. The resulting dashboard demonstrates how structured analytics can improve understanding of large content libraries.",
    problemStatement: "Large entertainment datasets frequently contain missing values, inconsistent formats and duplicated information. Without proper preparation, identifying meaningful trends becomes difficult and decision-making is based on unreliable information.",
    businessContext: "Streaming platforms depend on data to understand content portfolios, audience preferences and production trends. Although this project uses publicly available data, it mirrors the analytical workflow organisations follow when preparing operational data for reporting and strategic decision-making.",
    objectives: [
      "Prepare raw Netflix data for reliable analysis.",
      "Identify patterns across genres, countries and release years.",
      "Design an interactive dashboard for business users.",
      "Present insights through clear visual storytelling.",
      "Emphasise repeatable analytical workflows over one-off reporting."
    ],
    myThinking: "Before building dashboards, I focused on improving the quality of the underlying data. My approach was to ensure every visual answered a business question rather than simply displaying information. This reinforced the importance of treating data preparation as a critical stage of the analytical process instead of an afterthought.",
    architecture: [
      "Raw Netflix dataset as the source.",
      "Python and Pandas for data profiling and cleaning.",
      "Data transformation and validation before reporting.",
      "Power BI data model for interactive exploration.",
      "Business-focused dashboard highlighting catalogue trends and content insights."
    ],
    approachSteps: [
      "Profiled the raw dataset to understand quality issues.",
      "Cleaned missing values and standardised inconsistent fields using Python.",
      "Prepared the dataset for analysis through structured transformations.",
      "Built an analytical model within Power BI.",
      "Designed interactive dashboards focused on exploration rather than static reporting.",
      "Reviewed outputs to ensure visualisations answered meaningful business questions."
    ],
    challengesOvercome: "The primary challenge involved preparing inconsistent source data while preserving analytical accuracy. Considerable attention was given to standardising formats and validating transformed data before developing reports, ensuring that conclusions were supported by reliable information.",
    results: [
      "Converted raw data into a structured reporting dataset.",
      "Improved overall data quality through systematic cleaning and transformation.",
      "Developed interactive dashboards for exploring content trends.",
      "Demonstrated the complete analytics lifecycle from raw data to business insight.",
      "Strengthened practical experience in Python, data preparation and business intelligence reporting."
    ],
    lessonsLearned: [
      "Reliable reporting depends on the quality of source data.",
      "Exploratory analysis should guide dashboard design rather than visual preferences.",
      "Simple, focused dashboards often communicate insights more effectively than complex visualisations.",
      "Business value comes from answering questions, not producing charts."
    ],
    futureImprovements: [
      "Integrate additional streaming platform datasets for comparative analysis.",
      "Include audience ratings and review data.",
      "Develop predictive models for future content trends.",
      "Automate data refresh pipelines.",
      "Expand reporting with recommendation and segmentation analysis."
    ]
  },
  {
    slug: "trade-route-prediction",
    title: "Trade Route Prediction",
    subtitle: "A machine learning project analysing UK freight movement patterns using Department for Transport data to explore predictive modelling for transport planning.",
    featured: true,
    displayOrder: 4,
    projectType: "Academic",
    category: "Machine Learning",
    status: "Completed",
    year: "2025",
    duration: "12 Weeks",
    coverImage: "/images/projects/trade-route-prediction.webp",
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Jupyter Notebook",
      "Machine Learning"
    ],
    skillsDemonstrated: [
      "Machine Learning",
      "Predictive Analytics",
      "Business Analysis",
      "Data Preparation",
      "Feature Engineering",
      "Model Evaluation",
      "Python",
      "Statistical Analysis"
    ],
    overview: "This MSc project explored how machine learning techniques can be applied to transport datasets to identify patterns in freight movement across the United Kingdom. Using publicly available Department for Transport data, the project focused on transforming a large operational dataset into a predictive modelling workflow that balanced analytical accuracy with business relevance.",
    executiveSummary: "Rather than treating machine learning as a purely technical exercise, this project examined how predictive models can support evidence-based transport planning. The work covered the complete analytical lifecycle, including data preparation, feature engineering, model development, evaluation and interpretation of results.",
    problemStatement: "Transport organisations generate large volumes of operational data, but extracting meaningful predictions requires significant preparation and careful model selection. Raw datasets alone provide limited value without structured analytical processes capable of identifying patterns and supporting future planning.",
    businessContext: "Government agencies and transport planners rely on data to understand freight movement, infrastructure demand and long-term logistics trends. While this project was developed using public Department for Transport data, it reflects analytical approaches commonly used to support operational planning and policy development.",
    objectives: [
      "Prepare a large transport dataset for predictive modelling.",
      "Develop machine learning models capable of identifying freight movement patterns.",
      "Evaluate model performance using appropriate analytical techniques.",
      "Interpret results within a practical business context.",
      "Demonstrate an end-to-end machine learning workflow."
    ],
    myThinking: "My priority was not simply achieving the highest model accuracy, but understanding how data preparation, feature selection and evaluation influence business outcomes. I approached the project from the perspective that predictive analytics should provide practical insight rather than becoming an isolated technical exercise.",
    architecture: [
      "Department for Transport dataset as the primary data source.",
      "Python-based preprocessing and exploratory analysis.",
      "Feature engineering and data preparation.",
      "Machine learning model development using Scikit-learn.",
      "Performance evaluation and comparison.",
      "Interpretation of results through a business analytics perspective."
    ],
    approachSteps: [
      "Explored the dataset to understand structure and quality.",
      "Performed data cleaning and preprocessing.",
      "Engineered relevant features for predictive modelling.",
      "Developed and evaluated multiple machine learning approaches.",
      "Compared model performance using appropriate evaluation metrics.",
      "Interpreted findings in relation to transport planning and business decision-making."
    ],
    challengesOvercome: "Working with a large operational dataset required careful preprocessing to ensure consistency before modelling. Selecting meaningful features while avoiding unnecessary complexity highlighted the importance of balancing model performance with interpretability.",
    results: [
      "Developed a complete predictive analytics workflow from raw data to evaluated models.",
      "Applied machine learning techniques to a large real-world transport dataset.",
      "Demonstrated structured data preparation and feature engineering practices.",
      "Produced interpretable analytical outputs to support evidence-based decision making.",
      "Strengthened practical experience in predictive modelling and machine learning."
    ],
    lessonsLearned: [
      "Successful machine learning projects begin with high-quality data preparation.",
      "Interpretability is often as valuable as predictive accuracy.",
      "Business context should guide model development and evaluation.",
      "Feature engineering frequently has greater impact than model complexity."
    ],
    futureImprovements: [
      "Evaluate additional machine learning algorithms.",
      "Automate model training and validation pipelines.",
      "Incorporate external economic and logistics datasets.",
      "Develop interactive dashboards for model outputs.",
      "Explore time-series forecasting for freight demand."
    ]
  },
  {
    slug: "hr-analytics-dashboard",
    title: "HR Analytics Dashboard",
    subtitle: "A business intelligence dashboard designed to transform recruitment and workforce data into actionable insights for HR decision-making.",
    featured: false,
    displayOrder: 5,
    projectType: "Academic",
    category: "Business Intelligence",
    status: "Completed",
    year: "2025",
    duration: "8 Weeks",
    coverImage: "/images/projects/hr-analytics-dashboard.webp",
    techStack: [
      "Power BI",
      "SQL",
      "Excel",
      "DAX",
      "Power Query"
    ],
    skillsDemonstrated: [
      "Business Intelligence",
      "HR Analytics",
      "SQL",
      "Dashboard Design",
      "Data Modelling",
      "DAX",
      "Reporting",
      "Business Analysis"
    ],
    overview: "This project focused on transforming recruitment and workforce data into an interactive reporting solution that supports evidence-based HR decisions. By combining structured data modelling with business-focused visualisations, the dashboard enables stakeholders to monitor recruitment performance, workforce trends and key people metrics through a single reporting interface.",
    executiveSummary: "HR teams often manage information across multiple spreadsheets and operational systems, making consistent reporting difficult. This project demonstrates how business intelligence techniques can consolidate workforce data into a structured reporting model that improves visibility and supports better decision-making.",
    problemStatement: "Recruitment and workforce information is frequently distributed across disconnected datasets, making it challenging to identify trends, monitor hiring activity and evaluate organisational performance through consistent reporting.",
    businessContext: "Modern HR functions increasingly rely on analytics to support recruitment planning, workforce management and organisational decision-making. Effective reporting enables HR professionals to move beyond operational administration towards strategic business support.",
    objectives: [
      "Design a structured HR reporting model.",
      "Develop interactive dashboards for recruitment analytics.",
      "Improve visibility of workforce performance metrics.",
      "Apply business intelligence principles to HR data.",
      "Present insights through clear and accessible visualisations."
    ],
    myThinking: "Coming from an HR background, I wanted to combine domain knowledge with analytical reporting rather than treating HR as purely administrative. My focus was on designing dashboards that answered practical management questions instead of displaying large numbers of unrelated metrics.",
    architecture: [
      "Structured HR dataset.",
      "SQL and Power Query for data preparation.",
      "Power BI semantic model.",
      "DAX measures for KPI calculations.",
      "Interactive dashboards supporting workforce analysis."
    ],
    approachSteps: [
      "Analysed reporting requirements from a business perspective.",
      "Prepared and transformed HR data.",
      "Designed relationships within the reporting model.",
      "Developed reusable DAX measures.",
      "Built dashboards focused on recruitment and workforce insights.",
      "Validated reporting outputs for consistency."
    ],
    challengesOvercome: "Selecting meaningful HR metrics without overwhelming users required balancing detail with simplicity. Considerable effort was spent ensuring dashboards communicated actionable insights rather than presenting excessive information.",
    results: [
      "Centralised recruitment reporting into a single dashboard.",
      "Improved visibility of workforce metrics.",
      "Applied business intelligence techniques to HR reporting.",
      "Created reusable reporting structures suitable for future expansion.",
      "Strengthened analytical reporting skills within a people-focused business context."
    ],
    lessonsLearned: [
      "Effective dashboards begin with clearly defined business questions.",
      "Domain knowledge improves analytical decision-making.",
      "Simple KPI design often provides greater business value than highly complex visualisations.",
      "Data quality remains fundamental to trustworthy reporting."
    ],
    futureImprovements: [
      "Predictive recruitment forecasting.",
      "Employee retention analytics.",
      "Workforce planning dashboards.",
      "Integration with live HR systems.",
      "Automated monthly reporting."
    ]
  },
  {
    slug: "business-intelligence-reporting-model",
    title: "Business Intelligence Reporting Model",
    subtitle: "A reporting solution developed for City St George's that demonstrates structured business reporting through data modelling and interactive visualisation.",
    featured: false,
    displayOrder: 6,
    projectType: "Academic",
    category: "Business Intelligence",
    status: "Completed",
    year: "2025",
    duration: "4 Weeks",
    coverImage: "/images/projects/bi-reporting-model.webp",
    techStack: [
      "Tableau",
      "Excel",
      "Business Intelligence",
      "Data Modelling",
      "Data Visualisation"
    ],
    skillsDemonstrated: [
      "Business Intelligence",
      "Tableau",
      "Dashboard Design",
      "Business Reporting",
      "Data Analysis",
      "Data Visualisation",
      "Information Design"
    ],
    overview: "This project focused on designing a business reporting solution that converts operational data into clear management information. The emphasis was on creating intuitive dashboards that enable decision-makers to interpret performance quickly through well-structured visualisations and reporting practices.",
    executiveSummary: "Business reporting is most valuable when complex information becomes easy to understand. This project demonstrates how thoughtful dashboard design, structured data modelling and user-focused reporting can improve communication and support informed decision-making.",
    problemStatement: "Operational data often exists in formats that are difficult for business users to interpret. Without structured reporting, identifying performance trends and making informed decisions becomes increasingly time-consuming.",
    businessContext: "Organisations rely on business intelligence platforms to convert operational information into strategic insight. This project reflects the reporting principles commonly used within organisations to support performance monitoring and executive decision-making.",
    objectives: [
      "Develop an interactive reporting solution.",
      "Present business information through intuitive dashboards.",
      "Improve visibility of operational performance.",
      "Apply business intelligence principles to reporting design.",
      "Communicate insights clearly for non-technical users."
    ],
    myThinking: "I viewed reporting as a communication challenge rather than simply a technical task. Every visual element was designed to reduce cognitive effort for users, allowing important business information to be understood quickly and confidently.",
    architecture: [
      "Structured reporting dataset.",
      "Data preparation using Excel.",
      "Business reporting model.",
      "Interactive Tableau dashboards.",
      "Performance-focused visual analytics."
    ],
    approachSteps: [
      "Defined reporting requirements.",
      "Prepared source data for analysis.",
      "Designed dashboard layouts around business questions.",
      "Built interactive Tableau visualisations.",
      "Reviewed outputs to improve usability and readability.",
      "Validated reporting consistency."
    ],
    challengesOvercome: "Designing dashboards that balanced analytical depth with visual simplicity required careful prioritisation of information. Maintaining clarity while presenting multiple KPIs was the project's primary design challenge.",
    results: [
      "Developed a structured business reporting solution.",
      "Improved presentation of operational performance data.",
      "Applied business intelligence design principles.",
      "Created dashboards suitable for management reporting.",
      "Strengthened practical reporting and data visualisation skills."
    ],
    lessonsLearned: [
      "Good reporting is driven by user needs rather than available charts.",
      "Visual simplicity improves business communication.",
      "Consistent information design increases dashboard usability.",
      "Business intelligence combines analytical thinking with effective storytelling."
    ],
    futureImprovements: [
      "Real-time reporting integration.",
      "Automated data refresh processes.",
      "Advanced KPI monitoring.",
      "Role-based dashboard experiences.",
      "Expanded executive reporting capabilities."
    ]
  }
];