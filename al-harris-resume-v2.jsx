import React, { useState, useEffect, useRef } from 'react';

// Animated counter component
const Counter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Project data - focused on outcomes, not vanity metrics
const projects = [
  {
    id: 1,
    title: "EasyGains — Voice-First Nutrition Tracker",
    category: "ai",
    description: "Built and shipped a React Native + Expo app where users log food by talking. Claude Haiku parses speech on the backend, Supabase Edge Functions run the pipeline, RevenueCat handles subscriptions.",
    tech: ["React Native", "Expo", "Claude API", "Supabase", "RevenueCat"],
    impact: "Live on the App Store since April 2026 — first app I've shipped publicly"
  },
  {
    id: 2,
    title: "BCP-API — Automated Shop Risk Monitoring",
    category: "automation",
    description: "Python pipeline pulling performance data from our internal BCP API into Gainsight. Two weekly jobs: a Risk Scan across all 2,500+ shops detecting week-over-week inspection rate drops, and a Weekly Snapshot pushing 8 key metrics into each shop's Gainsight Timeline.",
    tech: ["Python", "OAuth", "Gainsight API", "SQLite"],
    impact: "CSMs see health signals the morning they need them — no manual exports"
  },
  {
    id: 3,
    title: "Client-Pulse — Advisor Reporting Platform",
    category: "ai",
    description: "Web app for advisors to generate branded client check-in reports. Reconciles GA4, Google Ads, and WebVitals data across 440 clients; includes a Claude-powered sidebar suggesting talking points during live calls.",
    tech: ["React", "Vercel", "Supabase", "Claude API", "GA4", "Google Ads"],
    impact: "Monthly reports and live call prep in one place — advisors don't leave the tool"
  },
  {
    id: 4,
    title: "Personal AI Agent Suite (in progress)",
    category: "ai",
    description: "Three tools automating my own workflow before I package them for others: docbot auto-generates Confluence docs from git commits, monday-manager runs scheduled LLM check-ins on Monday.com tasks, ALs-ai-agents is a plug-in framework for triggering Claude agents from Slack.",
    tech: ["Claude API", "Anthropic SDK", "Slack Bolt", "Python"],
    impact: "Favorite question I ask anyone: \"what sucks about your job?\" — then I try to fix it"
  },
  {
    id: 5,
    title: "Twilio Cost Analysis & Optimization",
    category: "analytics",
    description: "Analyzed $300K+ annual messaging spend. Created Retool dashboard showing segment distribution, ran regression analysis proving message length doesn't affect engagement, and delivered implementation playbook with advisor talk tracks.",
    tech: ["Retool", "SQL", "Regression Analysis", "Stakeholder Presentation"],
    impact: "$80K+ annual savings identified with clear implementation roadmap"
  },
  {
    id: 6,
    title: "Vehicle Inspection Scoring Engine",
    category: "analytics",
    description: "Analyzed 23,000+ inspections across 400+ franchise locations using Python. Created age/mileage correlation models and designed a scoring system with configurable thresholds for quality alerting.",
    tech: ["Python", "Statistical Analysis", "Data Visualization"],
    impact: "Quality assurance framework scalable across franchise network"
  },
  {
    id: 7,
    title: "Gainsight CS/PX Platform",
    category: "platform",
    description: "Implemented and administer the entire Gainsight ecosystem as sole administrator: dashboards, automation rules, check-in compliance tracking, advisor performance scoring, and integrations with Salesforce, Gong, and Zendesk.",
    tech: ["Gainsight CS", "Gainsight PX", "Salesforce", "API Integrations"],
    impact: "Operational backbone for CS team of 10+ advisors serving 3,000+ accounts"
  }
];

const techStack = {
  "Platforms": ["Gainsight CS/PX", "Salesforce", "Zendesk", "Monday.com", "Retool", "Supabase"],
  "AI & Automation": ["Claude API", "Anthropic SDK", "OpenAI API", "n8n", "RAG", "Bland AI", "ChromaDB"],
  "Development": ["Python", "JavaScript / TypeScript", "React", "React Native + Expo", "Next.js", "FastAPI", "SQL"],
  "Integrations": ["REST APIs", "Webhooks", "OAuth", "Slack Bolt", "Google APIs (GA4, Ads)", "Jira", "Twilio"],
  "Deploy & Analytics": ["Vercel", "Supabase Edge Functions", "Docker", "Data Analysis", "Dashboard Design", "Chart.js"]
};

const timeline = [
  { year: "2009", title: "Master Automotive Technician", place: "Tires Too, NH", description: "Learned that problems aren't optional—they have to get solved. Invested in quality tools because the right tools make hard problems manageable." },
  { year: "2015", title: "Managing Partner", place: "Tires Too, NH", description: "Ran operations for family auto shop. Discovered AutoVitals as a customer and saw the potential of software to transform how shops operate." },
  { year: "2017", title: "Senior Product Advisor", place: "AutoVitals (Remote)", description: "Managed 300+ clients, $150K MRR. Gravitated toward the technical accounts—loved digging into data, building reports, solving the hard problems." },
  { year: "2023", title: "CS Enablement Manager", place: "AutoVitals (Remote)", description: "Implemented ChurnZero CRM. A mentor said 'get obsessed with AI'—so I did. Started dedicating hours weekly to learning, experimenting, figuring out what's possible." },
  { year: "2024", title: "Platform Administrator", place: "AutoVitals (Remote)", description: "Took ownership of Gainsight CS/PX implementation. Started connecting the dots between platforms, automation, and AI to solve operational problems." },
  { year: "2025", title: "Solutions & Automation", place: "AutoVitals (Remote)", description: "Built the Twilio cost analysis that found $80K in annual savings. Deployed voice agents, RAG chatbots, and reporting dashboards across the CS team." },
  { year: "2026", title: "Builder", place: "AutoVitals + Personal", description: "Shipped EasyGains to the iOS App Store. Built BCP-API automating risk monitoring across 2,500+ shops. Personal AI agent suite running daily on my own workflow." }
];

export default function AlHarrisResume() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeTimelineItem, setActiveTimelineItem] = useState(null);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const categoryColors = {
    ai: '#10b981',
    automation: '#ec4899',
    analytics: '#f59e0b',
    platform: '#6366f1'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#e5e5e5',
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      lineHeight: 1.6
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::selection {
          background: #f59e0b;
          color: #0a0a0a;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .fade-in { animation: fadeInUp 0.6s ease-out forwards; }
        .fade-in-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-in-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-in-delay-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-in-delay-4 { animation-delay: 0.4s; opacity: 0; }
        
        .stat-card:hover { transform: translateY(-4px); }
        .project-card:hover { border-color: #f59e0b; }
        .tech-tag:hover { background: #f59e0b; color: #0a0a0a; }
        .filter-btn:hover { background: #262626; }
        .filter-btn.active { background: #f59e0b; color: #0a0a0a; }
        
        .timeline-dot { transition: all 0.3s ease; }
        .timeline-item:hover .timeline-dot { 
          transform: scale(1.5); 
          background: #f59e0b;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        }
        
      `}</style>
      
      {/* Hero Section */}
      <header style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Top bar */}
        <div className="fade-in" style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          right: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.75rem',
          color: '#737373',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          <span>Goffstown, NH</span>
          <span style={{ color: '#10b981' }}>● Open to opportunities</span>
        </div>

        <div style={{ maxWidth: '900px' }}>
          <div className="fade-in fade-in-delay-1" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.875rem',
            color: '#f59e0b',
            marginBottom: '1rem',
            letterSpacing: '0.05em'
          }}>
            // 20 YEARS OF FIGURING THINGS OUT
          </div>
          
          <h1 className="fade-in fade-in-delay-2" style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: '#ffffff'
          }}>
            Al Harris
          </h1>
          
          <p className="fade-in fade-in-delay-3" style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            color: '#a3a3a3',
            maxWidth: '700px',
            marginBottom: '3rem',
            fontWeight: 400
          }}>
            I find broken processes and fix them—whether that means automating workflows, analyzing data, or wiring systems together. I care about the people using what I create.
          </p>
          
          <div className="fade-in fade-in-delay-4" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <a href="mailto:alharris603@gmail.com" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: '#f59e0b',
              color: '#0a0a0a',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease'
            }}>
              Get in Touch →
            </a>
            <a href="tel:603-801-5082" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'transparent',
              color: '#e5e5e5',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              border: '1px solid #404040',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease'
            }}>
              (603) 801-5082
            </a>
            <a href="https://www.linkedin.com/in/al-harris-08627475/" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: 'transparent',
              color: '#a3a3a3',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              border: '1px solid #404040',
              letterSpacing: '0.05em',
              fontFamily: "'IBM Plex Mono', monospace",
              transition: 'all 0.2s ease'
            }}>
              LinkedIn ↗
            </a>
            <a href="https://github.com/extramediumal" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: 'transparent',
              color: '#a3a3a3',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              border: '1px solid #404040',
              letterSpacing: '0.05em',
              fontFamily: "'IBM Plex Mono', monospace",
              transition: 'all 0.2s ease'
            }}>
              GitHub ↗
            </a>
          </div>
        </div>
        
      </header>

      {/* Stats Section - Focused on outcomes, not vanity metrics */}
      <section style={{
        padding: '6rem 2rem',
        background: '#111111',
        borderTop: '1px solid #262626',
        borderBottom: '1px solid #262626'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { value: 80, label: 'Cost Savings Identified', suffix: 'K+', prefix: '$' },
              { value: 2500, label: 'Shops Automated', suffix: '+', prefix: '' },
              { value: 3000, label: 'Accounts on Gainsight', suffix: '+', prefix: '' },
              { value: 1, label: 'iOS App Shipped', suffix: '', prefix: '' }
            ].map((stat, i) => (
              <div key={i} className="stat-card" style={{
                padding: '2rem',
                background: '#0a0a0a',
                border: '1px solid #262626',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}>
                  <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#737373',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.875rem',
            fontFamily: "'IBM Plex Mono', monospace",
            color: '#f59e0b',
            marginBottom: '3rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            // The Path Here
          </h2>
          
          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '1rem',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #f59e0b, #262626)'
            }} />
            
            {timeline.map((item, i) => (
              <div 
                key={i} 
                className="timeline-item"
                style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '3rem',
                  paddingLeft: '3rem',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setActiveTimelineItem(i)}
                onMouseLeave={() => setActiveTimelineItem(null)}
              >
                {/* Dot */}
                <div className="timeline-dot" style={{
                  position: 'absolute',
                  left: '0.5rem',
                  top: '0.25rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  background: i === timeline.length - 1 ? '#f59e0b' : '#404040',
                  border: '2px solid #0a0a0a'
                }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.875rem',
                      color: '#f59e0b'
                    }}>
                      {item.year}
                    </span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#ffffff'
                    }}>
                      {item.title}
                    </h3>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#525252'
                    }}>
                      {item.place}
                    </span>
                  </div>
                  <p style={{
                    color: '#a3a3a3',
                    maxWidth: '600px',
                    opacity: activeTimelineItem === i ? 1 : 0.7,
                    transition: 'opacity 0.3s ease'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#111111',
        borderTop: '1px solid #262626'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '0.875rem',
              fontFamily: "'IBM Plex Mono', monospace",
              color: '#f59e0b',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              // What I've Shipped
            </h2>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'ai', 'automation', 'analytics', 'platform'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: activeFilter === filter ? '#f59e0b' : 'transparent',
                    color: activeFilter === filter ? '#0a0a0a' : '#a3a3a3',
                    border: '1px solid #404040',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="project-card"
                style={{
                  padding: '2rem',
                  background: '#0a0a0a',
                  border: '1px solid #262626',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '0.625rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: categoryColors[project.category],
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.25rem 0.5rem',
                    border: `1px solid ${categoryColors[project.category]}`,
                    opacity: 0.8
                  }}>
                    {project.category}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}>
                  {project.title}
                </h3>
                
                <p style={{
                  fontSize: '0.875rem',
                  color: '#a3a3a3',
                  marginBottom: '1rem',
                  lineHeight: 1.7
                }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="tech-tag"
                      style={{
                        fontSize: '0.6875rem',
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: '#737373',
                        padding: '0.25rem 0.5rem',
                        background: '#1a1a1a',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                
                <div style={{
                  fontSize: '0.8125rem',
                  color: '#10b981',
                  fontWeight: 500,
                  paddingTop: '1rem',
                  borderTop: '1px solid #262626'
                }}>
                  ↳ {project.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.875rem',
            fontFamily: "'IBM Plex Mono', monospace",
            color: '#f59e0b',
            marginBottom: '1rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            // Tools I Work With
          </h2>
          
          <p style={{
            color: '#737373',
            marginBottom: '2rem',
            maxWidth: '600px'
          }}>
            I'm not a traditional developer—I'm more of a "figure it out and make it work" person. 
            Some of these I know deeply, others I'm still learning. That's the fun part.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category}>
                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: '#f59e0b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.75rem'
                }}>
                  {category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#111111',
                        border: '1px solid #262626',
                        fontSize: '0.875rem',
                        color: '#e5e5e5',
                        fontWeight: 400
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pitch Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#111111',
        borderTop: '1px solid #262626'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '0.875rem',
            fontFamily: "'IBM Plex Mono', monospace",
            color: '#f59e0b',
            marginBottom: '2rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            // What I'm Looking For
          </h2>
          
          <div style={{
            fontSize: '1.5rem',
            lineHeight: 1.7,
            color: '#e5e5e5',
            marginBottom: '2rem'
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              A team that <span style={{ color: '#f59e0b' }}>moves fast</span> and values people who figure things out.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Work that spans <span style={{ color: '#10b981' }}>operations, automation, and customer success</span>—I like variety.
            </p>
            <p>
              Room to <span style={{ color: '#6366f1' }}>keep learning</span>. I'm not done growing.
            </p>
          </div>
          
          <div style={{
            padding: '2rem',
            background: '#0a0a0a',
            border: '1px solid #262626',
            marginTop: '3rem'
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.75rem',
              color: '#525252',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              In Short
            </div>
            <p style={{
              color: '#a3a3a3',
              lineHeight: 1.8
            }}>
              20 years solving problems across automotive, customer success, and operations.
              The last couple years I've leaned hard into AI and agent tooling because I kept seeing
              manual work that didn't need to be manual. I'm technical enough to ship real solutions
              (including a live iOS app), customer-focused enough to make sure they actually help people,
              and curious enough to keep getting better at both.
              <br /><br />
              I want to help a team win. If that sounds useful, let's talk.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '4rem 2rem',
        borderTop: '1px solid #262626'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Al Harris
            </div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.75rem',
              color: '#525252'
            }}>
              alharris603@gmail.com • (603) 801-5082 • Goffstown, NH
            </div>
          </div>
          
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.75rem',
            color: '#404040'
          }}>
            Thanks for reading this far.
          </div>
        </div>
      </footer>
    </div>
  );
}
