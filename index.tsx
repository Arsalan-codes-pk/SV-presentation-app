import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');
  
  // State for simulated authentication and comments
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);
  type Comment = { author: string; text: string; date: string; };
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});


  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      maxWidth: '960px',
      margin: '40px auto',
      padding: '20px',
      textAlign: 'center' as const,
    },
    header: {
      marginBottom: '40px',
    },
    title: {
      fontSize: '3rem',
      color: '#0D2C54',
      fontWeight: 700,
      margin: '0 0 10px 0',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#555',
      fontWeight: 400,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      textAlign: 'left' as const,
      cursor: 'pointer',
    },
    cardTitle: {
      fontSize: '1.5rem',
      color: '#0D2C54',
      fontWeight: 600,
      marginBottom: '12px',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#666',
      lineHeight: '1.6',
    },
    footer: {
      marginTop: '60px',
      padding: '40px 20px',
      backgroundColor: '#0D2C54',
      color: '#ffffff',
      borderRadius: '8px',
      textAlign: 'center' as const,
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap' as const,
        gap: '20px',
        marginBottom: '30px',
        textAlign: 'left' as const,
    },
    footerSection: {
        minWidth: '200px',
    },
    footerTitle: {
        fontSize: '1.2rem',
        marginBottom: '10px',
        color: '#ffffff',
    },
    footerLink: {
        color: '#f4f7f6',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '5px',
        transition: 'color 0.2s',
    },
     footerCredit: {
        fontSize: '0.9rem',
        color: '#aaa',
        borderTop: '1px solid #3a506b',
        paddingTop: '20px',
        marginTop: '20px',
    },
    detailContainer: {
        textAlign: 'left' as const,
        animation: 'fadeIn 0.5s ease-in-out',
    },
    backButton: {
      display: 'inline-block',
      marginBottom: '20px',
      color: '#0D2C54',
      textDecoration: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '1rem',
    },
    detailTitle: {
      fontSize: '2.5rem',
      color: '#0D2C54',
      fontWeight: 700,
      marginBottom: '10px',
    },
     subCard: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      marginBottom: '16px',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s ease-in-out',
    },
    subCardTitle: {
      fontSize: '1.2rem',
      color: '#0D2C54',
      fontWeight: 600,
      margin: '0 0 8px 0',
    },
    subCardDescription: {
      fontSize: '0.95rem',
      color: '#666',
      lineHeight: '1.6',
      margin: 0,
    },
    editorContainer: {
        marginTop: '16px',
    },
    textarea: {
        width: '100%',
        minHeight: '150px',
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ddd',
        boxSizing: 'border-box' as const,
        resize: 'vertical' as const,
    },
    saveButton: {
        backgroundColor: '#0D2C54',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '10px',
        float: 'right' as const,
    },
    savedContent: {
        whiteSpace: 'pre-wrap' as const,
        marginTop: '12px',
        padding: '12px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        color: '#333',
        fontSize: '0.95rem',
        lineHeight: '1.7',
    },
    // New styles for comments section
    commentsSection: {
      marginTop: '60px',
      paddingTop: '30px',
      borderTop: '1px solid #eee',
    },
    commentsTitle: {
      fontSize: '1.8rem',
      color: '#0D2C54',
      marginBottom: '20px',
    },
    loginPrompt: {
        textAlign: 'center' as const,
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    loginButton: {
        backgroundColor: '#0D2C54',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        margin: '0 10px',
    },
    commentForm: {
        marginTop: '20px',
    },
    commentTextarea: {
        width: '100%',
        minHeight: '100px',
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ddd',
        boxSizing: 'border-box' as const,
        resize: 'vertical' as const,
        marginBottom: '10px',
    },
    submitButton: {
        backgroundColor: '#0D2C54',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        float: 'right' as const,
    },
    commentList: {
        marginTop: '30px',
    },
    comment: {
        backgroundColor: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        marginBottom: '12px',
    },
    commentAuthor: {
        fontWeight: 700,
        color: '#0D2C54',
        marginBottom: '4px',
    },
    commentDate: {
        fontSize: '0.8rem',
        color: '#999',
        marginBottom: '8px',
    },
    commentText: {
        color: '#333',
        lineHeight: 1.6,
    },
    logoutButton: {
        backgroundColor: 'transparent',
        color: '#0D2C54',
        border: '1px solid #0D2C54',
        borderRadius: '6px',
        padding: '8px 16px',
        fontSize: '0.9rem',
        fontWeight: 600,
        cursor: 'pointer',
        marginLeft: '20px',
    },
    loggedInBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    }
  };
  
  type SubSection = {
    title: string;
    description: string;
    content: string;
  };
  
  type ProjectSection = {
    description: string;
    subSections: SubSection[];
  };

  const initialProjectSections: { [key: string]: ProjectSection } = {
    'Business Plan': {
      description: 'Defining the mission, operational model, financial projections, and social impact metrics.',
      subSections: [
          { title: 'Executive Summary', description: 'A concise overview of the entire plan.', content: 'Switch Vape is a social enterprise initiative by Art N Act, designed to offer adult tobacco users in Pakistan a structured and ethical pathway to harm reduction. By providing access to regulated, low-risk vaping products, coupled with comprehensive educational resources and support, we aim to combat the public health crisis caused by harmful tobacco products. Our model reinvests profits into community health programs, directly contributing to Pakistan\'s Sustainable Development Goals (SDGs), particularly SDG 3 (Good Health and Well-being).' },
          { title: 'Mission & Vision Statement', description: 'Defining our purpose and long-term goals.', content: '**Mission:** To empower adult tobacco users in Pakistan with the knowledge and tools to make informed, healthier choices by providing a responsible, scientifically-backed, and supportive alternative to conventional tobacco use.\n\n**Vision:** A future for Pakistan where preventable tobacco-related diseases are drastically reduced, public health is strengthened, and communities are engaged in a culture of well-being and sustainable living.' },
          { title: 'Market Analysis', description: 'Understanding the target audience, competition, and regulatory landscape in Pakistan.', content: '1. **The Scale of the Problem:** Pakistan has one of the highest burdens of tobacco-related diseases in the world, with over 160,000 deaths annually. The market includes not just cigarette smokers but a vast population of smokeless tobacco users (gutka, paan, naswar), who are often overlooked by conventional cessation programs. This represents a massive, underserved market actively seeking healthier alternatives.\n\n2. **Target Audience:** Our primary audience is adult tobacco users (25-50 years old) who are health-conscious, digitally literate, and looking for a viable exit strategy from their addiction. They are frustrated with ineffective solutions and wary of unregulated, low-quality products.\n\n3. **Competitive Landscape:**\n   - **Incumbent Tobacco Industry:** Our main competitor, which thrives on addiction. Our ethical, health-focused stance is our key differentiator.\n   - **Unregulated Vape Market:** Characterized by inconsistent product quality, lack of guidance, and marketing to youth. We position ourselves as the safe, regulated, and responsible alternative.\n   - **Pharmaceuticals (NRTs):** Nicotine Replacement Therapies like patches and gums have low success rates. Our model offers behavioral support, which is a significant advantage.\n\n4. **Unique Selling Proposition (USP):** We are not just selling a product; we are offering a complete support ecosystem. Our social enterprise model, reinvesting profits into community health via Art N Act, builds unparalleled trust and a strong brand narrative that resonates with socially conscious consumers and investors.' },
          { title: 'Products & Services', description: 'Detailing the ethical vaping program and support services.', content: 'Our core offering is the "Switch Kit," which includes a high-quality, user-friendly vaping device, a selection of rigorously tested e-liquids, and a detailed user guide. This is complemented by a digital support platform offering:\n\n- Educational modules on harm reduction.\n- Access to peer support communities.\n- A personalized progress tracker.\n- Direct support from trained counselors.' },
          { title: 'Social Impact Model', description: 'How we will contribute to SDGs and community well-being.', content: 'Our social impact is measured by:\n\n1.  **Health Outcomes:** Tracking the number of users who successfully switch from harmful tobacco products, thereby reducing their risk of tobacco-related illnesses (SDG 3).\n2.  **Economic Empowerment:** Creating jobs in logistics, support, and community outreach.\n3.  **Community Reinvestment:** Allocating a percentage of our revenue to fund local health clinics and awareness campaigns run by Art N Act.' },
          { title: 'Financial Plan', description: 'Forecasting revenue, expenses, and funding needs.', content: 'Revenue will be generated from the sale of Switch Kits and recurring e-liquid subscriptions. Initial funding will be sought through social impact grants and partnerships. Key expenses include product sourcing, technology platform maintenance, marketing (strictly ethical and educational), and personnel. Our financial model is designed for sustainability, with a long-term goal of becoming self-funded, allowing all surplus to be channeled into our social mission.' },
          { title: 'Return on Investment (ROI) & Investor Proposition', description: 'A dual-return model focusing on financial sustainability and profound social impact.', content: '**Financial Return:** Our business model is built for scalability and long-term profitability. Revenue streams from initial \'Switch Kit\' sales and recurring e-liquid subscriptions create a predictable and growing income. By establishing a trusted brand, we can capture a significant share of the harm-reduction market. The initial investment will be used for product sourcing, platform development, and targeted ethical marketing to achieve a strong market position, leading to sustainable profits.\n\n**Social Return on Investment (SROI):** For an impact investor, the SROI is even more compelling. Every user who successfully switches represents a significant saving in future national healthcare costs. The investment directly contributes to:\n   - **SDG 3 (Good Health):** Tangibly reducing rates of cancer, heart, and lung disease.\n   - **Community Upliftment:** Profits are funneled back into Art N Act\'s grassroots health initiatives.\n   - **Building Human Capital:** A healthier population is a more productive population.\n\n**Investor Proposition:** This is an opportunity to invest in a pioneering social enterprise that addresses a critical public health crisis in Pakistan. You are not just funding a company; you are building a legacy of positive change. We offer a unique blend of a massive market opportunity, a robust and ethical business model, and a chance to generate both significant financial returns and measurable, life-saving social impact.' },
      ]
    },
    'Brand Voice & Identity': {
      description: 'Crafting the brand personality, tone of voice, logo, and core messaging to build trust.',
      subSections: [
        { title: 'Brand Archetype & Personality', description: 'Defining the core character of our brand (e.g., The Caregiver, The Sage).', content: 'Our brand embodies two primary archetypes:\n\n- **The Sage:** We are a source of trusted, evidence-based information. We educate and empower through knowledge, dispelling myths with facts.\n- **The Caregiver:** We are empathetic and supportive. We understand the struggle of quitting and provide a non-judgmental, nurturing environment for our users.' },
        { title: 'Tone of Voice', description: 'Establishing how we communicate: empathetic, authoritative, encouraging, etc.', content: 'Our tone is consistently:\n\n- **Authoritative but not arrogant:** We speak with the confidence of well-researched facts.\n- **Empathetic but not patronizing:** We connect with our audience through shared understanding.\n- **Clear and Simple:** We avoid jargon to ensure our message is accessible to all.\n- **Encouraging and Positive:** We focus on the benefits of change and celebrate progress.' },
        { title: 'Core Messaging & Tagline', description: 'Crafting key messages and a memorable slogan that conveys our mission.', content: '**Core Message:** "Making a change is hard, but you don\'t have to do it alone. Switch Vape provides a responsible, less harmful alternative to tobacco, backed by science and a supportive community."\n\n**Tagline:** Switch Vape: A Healthier Choice. A Supported Journey.' },
        { title: 'Visual Identity (Logo & Colors)', description: 'Designing the logo and color palette that reflects trust and health.', content: 'The visual identity will be clean, modern, and professional.\n\n- **Logo:** A stylized "S" that subtly incorporates a leaf or a plus sign, signifying a positive switch towards a more natural, healthier state.\n- **Color Palette:** A primary palette of calming blues and greens to evoke trust, health, and serenity. An accent color of soft orange or yellow can be used to represent optimism and energy.' },
        { title: 'Ethical Marketing Guidelines', description: 'Creating a strict set of rules for responsible marketing practices.', content: 'We adhere to a strict ethical code:\n\n1.  **Adults-Only:** All marketing is targeted exclusively at existing adult tobacco users. We will use robust age-verification on our platforms.\n2.  **No Lifestyle Marketing:** We will never portray vaping as "cool" or glamorous. Our focus is solely on harm reduction and health.\n3.  **Full Transparency:** We will be open about the relative risks and benefits, citing scientific sources. No unsubstantiated claims.\n4.  **Educational Focus:** Our content will educate, not just sell.' },
      ]
    },
    'Website & Digital Platform': {
        description: 'Designing and developing an educational, user-friendly website as our primary communication hub.',
        subSections: [
            { title: 'Sitemap & User Flow', description: 'Mapping the website structure and how users will navigate it.', content: '- **Home:** Clear value proposition and call-to-action.\n- **About Us:** The story of Art N Act and our social mission.\n- **How It Works:** A step-by-step guide to the program.\n- **Science & Health:** A repository of research and facts on harm reduction.\n- **Community Hub:** Access to forums and support.\n- **Blog:** Articles and news.\n- **FAQ & Contact:** Support resources.' },
            { title: 'Key Pages Content', description: 'Writing the content for Home, About, How It Works, Health Info, Blog, and Contact pages.', content: 'Content will be developed with a focus on clarity and trust. The "Science & Health" page is critical and will feature infographics, summaries of research papers, and expert testimonials. The "How It Works" page will use a mix of text and video to clearly explain the process of joining the program. User testimonials (once available) will be featured prominently.' },
            { title: 'UI/UX Design Principles', description: 'Focusing on creating an accessible, clear, and trustworthy user experience.', content: '- **Clarity First:** No confusing layouts or hidden information.\n- **Accessibility:** Adherence to WCAG 2.1 guidelines to ensure the site is usable by people with disabilities.\n- **Mobile-First:** A seamless experience on all devices, as mobile is the primary access point in Pakistan.\n- **Trust Signals:** Prominently display affiliations (Art N Act), contact information, and links to scientific data.' },
            { title: 'Interactive Tools', description: 'Planning features like a savings calculator or a progress tracker to engage users.', content: '1.  **Savings Calculator:** An interactive tool for users to calculate their potential financial savings by switching from their current tobacco products to our program.\n2.  **Health Progress Tracker:** A tool that allows users to log their progress and see milestones, such as improved breathing or sense of taste/smell, based on typical timelines after quitting harmful tobacco.' },
            { title: 'Technology Stack', description: 'Deciding on the technologies to build and host the platform.', content: '- **Frontend:** React (or a framework like Next.js) for a dynamic and fast user experience.\n- **Backend:** A headless CMS (like Strapi or Contentful) to allow for easy content updates by the non-technical team.\n- **Hosting:** A reliable cloud provider like Vercel or AWS for scalability and performance.' },
        ]
    },
    'Communication Strategy': {
        description: 'Leveraging Online Journalism Pakistan for a campaign focused on awareness and education.',
        subSections: [
            { title: 'Target Audience Segments', description: 'Identifying and profiling specific groups of adult tobacco users we want to reach.', content: '1.  **The "Health-Concerned" Tobacco User:** Actively worried about their health but feels trapped by addiction.\n2.  **The "Pragmatist":** Understands the risks but needs a practical, effective, and accessible alternative.\n3.  **Healthcare Professionals:** Doctors and public health workers who can act as trusted messengers and recommend harm reduction strategies.' },
            { title: 'Campaign Key Messages', description: 'Developing tailored messages for different audiences and channels.', content: '- **For Tobacco Users:** "It\'s not about being perfect, it\'s about taking a better step. We\'re here to help you on that journey."\n- **For Families:** "Support your loved ones in making a healthier choice. Learn the facts about harm reduction."\n- **For Healthcare Professionals:** "A pragmatic tool in the fight against tobacco-related disease. Let\'s look at the evidence."' },
            { title: 'Channel Plan', description: 'Selecting the right mix of social media, content marketing, and PR to use.', content: '- **Online Journalism Pakistan (OJP):** Our primary channel for in-depth articles, expert interviews, and building credibility.\n- **Facebook/Instagram:** For sharing educational infographics, short video testimonials, and community engagement (age-gated and targeted).\n- **WhatsApp:** A dedicated support line and for sharing updates with registered users.\n- **PR:** Engaging with health journalists and public health bodies.' },
            { title: 'Content Calendar', description: 'Scheduling a timeline of content releases to maintain engagement.', content: '- **Month 1 (Launch):** Focus on "Myth vs. Fact," directly addressing common misconceptions about vaping.\n- **Month 2:** "Success Stories," featuring anonymized testimonials from users who have switched from both smoking and smokeless tobacco.\n- **Month 3:** "The Science Explained," a deep dive into the research behind harm reduction, presented in an easy-to-understand format.\n- **Ongoing:** Weekly blog posts, daily social media tips, and monthly expert Q&A sessions.' },
            { title: 'Collaboration with OJP', description: 'Defining the specific goals and activities for our partnership with Online Journalism Pakistan.', content: 'The partnership with OJP will be central to our credibility. Specific activities include:\n\n- A co-branded series of articles on "Public Health Futures in Pakistan."\n- Producing a short documentary on the human cost of tobacco addiction in Pakistan.\n- Hosting a live-streamed panel discussion with health experts, moderated by an OJP journalist.\n- Using OJP\'s platform to distribute our research and findings.' },
        ]
    },
  };
  
  const [projectSections, setProjectSections] = useState(initialProjectSections);

  const Dashboard = ({ onSelectSection }: { onSelectSection: (title: string) => void }) => (
    <>
      <header style={styles.header}>
        <h1 style={styles.title}>Switch Vape</h1>
        <p style={styles.subtitle}>Ethical Vaping Program | Project Dashboard</p>
      </header>
      <main>
        <div style={styles.grid}>
          {Object.entries(projectSections).map(([title, data], index) => (
            <div 
              key={index} 
              style={styles.card} 
              onClick={() => onSelectSection(title)}
              onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
              }} onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}>
              <h2 style={styles.cardTitle}>{title}</h2>
              <p style={styles.cardDescription}>{(data as ProjectSection).description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );

  const CommentsSection = ({ sectionTitle }: { sectionTitle: string }) => {
    const [newComment, setNewComment] = useState('');
    const sectionComments = comments[sectionTitle] || [];

    const handleLogin = (name: string) => {
        setIsLoggedIn(true);
        setCurrentUser({ name });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && currentUser) {
            const comment: Comment = {
                author: currentUser.name,
                text: newComment,
                date: new Date().toLocaleString(),
            };
            const updatedComments = { ...comments };
            updatedComments[sectionTitle] = [comment, ...(updatedComments[sectionTitle] || [])];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    return (
        <div style={styles.commentsSection}>
            <h2 style={styles.commentsTitle}>Apni Raye Dein (Public Feedback)</h2>
            {!isLoggedIn ? (
                <div style={styles.loginPrompt}>
                    <p style={styles.cardDescription}>Is content per apni raye denay ke liye login karein.</p>
                    <button style={styles.loginButton} onClick={() => handleLogin('Guest User')}>Login as Guest</button>
                    <button style={styles.loginButton} onClick={() => handleLogin('Social Media User')}>Login with Social Media</button>
                </div>
            ) : (
                <div>
                    <div style={styles.loggedInBar}>
                        <p>Welcome, <strong>{currentUser?.name}</strong>!</p>
                        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
                    </div>
                    <form style={styles.commentForm} onSubmit={handleCommentSubmit}>
                        <textarea
                            style={styles.commentTextarea}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your feedback here..."
                            aria-label="New comment"
                        />
                        <button type="submit" style={styles.submitButton}>Submit</button>
                    </form>
                </div>
            )}
             <div style={styles.commentList}>
                {sectionComments.length > 0 ? sectionComments.map((comment, index) => (
                    <div key={index} style={styles.comment}>
                        <p style={styles.commentAuthor}>{comment.author}</p>
                        <p style={styles.commentDate}>{comment.date}</p>
                        <p style={styles.commentText}>{comment.text}</p>
                    </div>
                )) : <p style={styles.cardDescription}>{isLoggedIn ? "Be the first one to comment." : "No comments yet."}</p>}
            </div>
        </div>
    );
};


  const DetailView = ({ section, onGoBack }: { section: string; onGoBack: () => void }) => {
    const data = projectSections[section];

    const handleSubSectionClick = (sub: SubSection) => {
        setActiveEditor(sub.title);
        setEditorContent(sub.content);
    };

    const handleSave = () => {
        const updatedSections = { ...projectSections };
        const targetSection = updatedSections[section];
        const subSectionIndex = targetSection.subSections.findIndex(s => s.title === activeEditor);
        if (subSectionIndex > -1) {
            targetSection.subSections[subSectionIndex].content = editorContent;
        }
        setProjectSections(updatedSections);
        setActiveEditor(null);
    };

    return (
        <div style={styles.detailContainer}>
            <a onClick={() => { setActiveEditor(null); onGoBack(); }} style={styles.backButton} role="button" aria-label="Back to Dashboard">&larr; Back to Dashboard</a>
            <h1 style={styles.detailTitle}>{section}</h1>
            <p style={styles.cardDescription}>{data.description}</p>
            <div style={{marginTop: '40px'}}>
                {data.subSections.length > 0 ? (
                    data.subSections.map((sub, index) => (
                        <div key={index} style={{...styles.subCard, cursor: activeEditor === sub.title ? 'default' : 'pointer' }} onClick={() => activeEditor !== sub.title && handleSubSectionClick(sub)}>
                            <h3 style={styles.subCardTitle}>{sub.title}</h3>
                            <p style={styles.subCardDescription}>{sub.description}</p>
                            {sub.content && activeEditor !== sub.title && (
                                <div style={styles.savedContent}>{sub.content}</div>
                            )}
                            {activeEditor === sub.title && (
                                <div style={styles.editorContainer}>
                                    <textarea 
                                        style={styles.textarea}
                                        value={editorContent}
                                        onChange={(e) => setEditorContent(e.target.value)}
                                        aria-label={`Content for ${sub.title}`}
                                    />
                                    <button onClick={handleSave} style={styles.saveButton}>Save</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p style={styles.cardDescription}>Details for this section will be developed soon. This is our next step.</p>
                )}
            </div>
            <CommentsSection sectionTitle={section} />
        </div>
    );
  };
  
  return (
    <div style={styles.container}>
      {selectedSection === null ? (
        <Dashboard onSelectSection={setSelectedSection} />
      ) : (
        <DetailView section={selectedSection} onGoBack={() => setSelectedSection(null)} />
      )}
      
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
            <div style={styles.footerSection}>
                <h4 style={styles.footerTitle}>Contact Us</h4>
                <a href="mailto:switchvapeofficial@gmail.com" style={styles.footerLink} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#f4f7f6'}>switchvapeofficial@gmail.com</a>
                <a href="tel:+923391881980" style={styles.footerLink} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#f4f7f6'}>WhatsApp: +92 339 1881980</a>
            </div>
            <div style={styles.footerSection}>
                <h4 style={styles.footerTitle}>Follow Us</h4>
                <a href="https://facebook.com/SwitchVape" target="_blank" rel="noopener noreferrer" style={styles.footerLink} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#f4f7f6'}>Facebook</a>
                <a href="https://instagram.com/switchvapepk" target="_blank" rel="noopener noreferrer" style={styles.footerLink} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#f4f7f6'}>Instagram</a>
                <a href="https://x.com/SwitchVapePK" target="_blank" rel="noopener noreferrer" style={styles.footerLink} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#f4f7f6'}>X (Twitter)</a>
                <a href="https://tiktok.com/@switchvapepk" target="_blank" rel="noopener noreferrer" style={styles.footerLink} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#f4f7f6'}>TikTok</a>
            </div>
        </div>
        <p style={styles.footerCredit}>A collaborative project by Art N Act Social Enterprise and AI.</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);