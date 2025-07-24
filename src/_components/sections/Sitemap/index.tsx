"use client";
import React, { useState } from 'react';
import { 
  ChevronRight, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Shield, 
  FileText, 
  Code, 
//   Smartphone, 
  Globe, 
  Search,
  ExternalLink,
  ChevronDown,
//   Menu,
//   X
} from 'lucide-react';

export const Sitemap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sitemapData = [
    {
      id: 'main',
      title: 'Main Pages',
      icon: <Home className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Homepage', url: '/', description: 'Welcome to Shivansh Infosys - Your software solution partner' },
        { title: 'About Us', url: '/about', description: 'Learn about our company, mission, and values' },
        { title: 'Contact Us', url: '/contact', description: 'Get in touch with our team' },
        { title: 'Career', url: '/career', description: 'Join our team - Current job openings' }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      icon: <Code className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Web Development', url: '/services/web-development', description: 'Custom web applications and websites' },
        { title: 'Mobile App Development', url: '/services/mobile-development', description: 'iOS and Android app development' },
        { title: 'Software Development', url: '/services/software-development', description: 'Custom software solutions' },
        { title: 'UI/UX Design', url: '/services/ui-ux-design', description: 'User interface and experience design' },
        { title: 'E-commerce Solutions', url: '/services/ecommerce', description: 'Online store development and management' },
        { title: 'Cloud Services', url: '/services/cloud', description: 'Cloud migration and management services' }
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      icon: <Briefcase className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Web Projects', url: '/portfolio/web', description: 'Showcase of our web development projects' },
        { title: 'Mobile Apps', url: '/portfolio/mobile', description: 'Mobile applications we\'ve developed' },
        { title: 'Enterprise Solutions', url: '/portfolio/enterprise', description: 'Large-scale enterprise projects' },
        { title: 'Case Studies', url: '/portfolio/case-studies', description: 'Detailed project case studies' },
        { title: 'Client Testimonials', url: '/portfolio/testimonials', description: 'What our clients say about us' }
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: <FileText className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Blog', url: '/blog', description: 'Latest articles and insights' },
        { title: 'Documentation', url: '/docs', description: 'Technical documentation and guides' },
        { title: 'API Reference', url: '/api', description: 'API documentation for developers' },
        { title: 'Downloads', url: '/downloads', description: 'Software downloads and resources' },
        { title: 'FAQ', url: '/faq', description: 'Frequently asked questions' },
        { title: 'Support Center', url: '/support', description: 'Help and support resources' }
      ]
    },
    {
      id: 'technologies',
      title: 'Technologies',
      icon: <Globe className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Frontend Technologies', url: '/technologies/frontend', description: 'React, Angular, Vue.js and more' },
        { title: 'Backend Technologies', url: '/technologies/backend', description: 'Node.js, .NET, PHP, Python' },
        { title: 'Mobile Technologies', url: '/technologies/mobile', description: 'React Native, Flutter, Native development' },
        { title: 'Database Solutions', url: '/technologies/database', description: 'MySQL, MongoDB, PostgreSQL' },
        { title: 'Cloud Platforms', url: '/technologies/cloud', description: 'AWS, Azure, Google Cloud' },
        { title: 'DevOps Tools', url: '/technologies/devops', description: 'Docker, Kubernetes, CI/CD' }
      ]
    },
    {
      id: 'company',
      title: 'Company Info',
      icon: <User className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Our Team', url: '/team', description: 'Meet our talented team members' },
        { title: 'Company History', url: '/history', description: 'Our journey and milestones' },
        { title: 'Mission & Vision', url: '/mission', description: 'Our company mission and vision' },
        { title: 'Awards & Recognition', url: '/awards', description: 'Industry awards and recognition' },
        { title: 'News & Press', url: '/news', description: 'Latest company news and press releases' },
        { title: 'Careers', url: '/careers', description: 'Job opportunities and company culture' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal & Policies',
      icon: <Shield className="w-5 h-5" />,
      color: '#C50202',
      pages: [
        { title: 'Privacy Policy', url: '/privacy-policy', description: 'How we handle your personal information' },
        { title: 'Terms of Service', url: '/terms-of-service', description: 'Terms and conditions for using our services' },
        { title: 'Cookie Policy', url: '/cookie-policy', description: 'Information about cookies we use' },
        { title: 'GDPR Compliance', url: '/gdpr', description: 'Our GDPR compliance information' },
        { title: 'Disclaimer', url: '/disclaimer', description: 'Legal disclaimers and limitations' },
        { title: 'Sitemap', url: '/sitemap', description: 'Complete site structure and navigation' }
      ]
    }
  ];

  const toggleSection = (sectionId : string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSitemapData = sitemapData.map(section => ({
    ...section,
    pages: section.pages.filter(page => 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ??
      page.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.pages.length > 0);

  const totalPages = sitemapData.reduce((total, section) => total + section.pages.length, 0);
  const filteredPages = filteredSitemapData.reduce((total, section) => total + section.pages.length, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] border-b border-[#C502021A]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#C50202] rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#000000]">Site Map</h1>
                <p className="text-sm text-gray-600">Navigate through all pages of our website</p>
              </div>
            </div>
            
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Find all pages and sections of the Shivansh Infosys website organized in a clear, hierarchical structure. 
              Use the search function to quickly locate specific pages.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#C502021A] rounded-xl focus:outline-none focus:border-[#C50202] focus:ring-2 focus:ring-[#C502021A] bg-white"
                />
              </div>
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#C502021A] rounded-lg shadow-lg p-3 text-sm text-gray-600">
                  Showing {filteredPages} of {totalPages} pages
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#FCF2F2] border-b border-[#C502021A]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C50202] rounded-full"></div>
              <span className="text-gray-700">Total Sections: {sitemapData.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C50202] rounded-full"></div>
              <span className="text-gray-700">Total Pages: {totalPages}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#C50202] rounded-full"></div>
              <span className="text-gray-700">Last Updated: July 24, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredSitemapData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#FCF2F2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#C50202]" />
            </div>
            <h3 className="text-xl font-semibold text-[#000000] mb-2">No pages found</h3>
            <p className="text-gray-600">{`Try adjusting your search terms to find the page you're looking for.`}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredSitemapData.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-[#C502021A] overflow-hidden">
                {/* Section Header */}
                <div 
                  className="bg-gradient-to-r from-[#FCF2F2] to-[#EEF6FF] p-6 cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: section.color }}
                      >
                        <span className="text-white">{section.icon}</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#000000]">{section.title}</h2>
                        <p className="text-sm text-gray-600">{section.pages.length} pages</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#C50202] text-white px-2 py-1 rounded-full">
                        {section.pages.length}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          expandedSections[section.id] ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Section Content */}
                <div className={`transition-all duration-300 ${
                  expandedSections[section.id] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <div className="p-6 pt-0">
                    <div className="space-y-3">
                      {section.pages.map((page, index) => (
                        <div 
                          key={index}
                          className="group p-4 bg-[#FCF2F2] hover:bg-[#FFCCD6] rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <ChevronRight className="w-4 h-4 text-[#C50202] group-hover:translate-x-1 transition-transform" />
                                <h3 className="font-semibold text-[#000000] group-hover:text-[#C50202] transition-colors">
                                  {page.title}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 pl-6">{page.description}</p>
                              <div className="flex items-center gap-2 mt-2 pl-6">
                                <span className="text-xs text-[#C50202] font-mono bg-white px-2 py-1 rounded">
                                  {page.url}
                                </span>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#C50202] transition-colors flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-[#EEF6FF] to-[#FCF2F2] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#000000] mb-4">Quick Navigation</h2>
            <p className="text-gray-700">Access the most important sections of our website</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
              <div className="w-10 h-10 bg-[#C50202] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C5020280]">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-[#000000]">Homepage</div>
            </button>

            <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
              <div className="w-10 h-10 bg-[#C50202] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C5020280]">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-[#000000]">Services</div>
            </button>

            <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
              <div className="w-10 h-10 bg-[#C50202] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C5020280]">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-[#000000]">Portfolio</div>
            </button>

            <button className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group">
              <div className="w-10 h-10 bg-[#C50202] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C5020280]">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-[#000000]">Contact</div>
            </button>
          </div>
        </div>

        {/* Breadcrumb Navigation Info */}
        <div className="mt-8 bg-[#EEF6FF] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#C50202]" />
            Navigation Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-[#000000] mb-2">Using the Sitemap</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click on section headers to expand/collapse</li>
                <li>Use the search bar to find specific pages</li>
                <li>All URLs are relative to the main domain</li>
                <li>External links are marked with an icon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#000000] mb-2">Website Structure</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Main navigation pages are always accessible</li>
                <li>Service pages include detailed information</li>
                <li>Portfolio showcases our work examples</li>
                <li>Legal pages contain important policies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center bg-[#FCF2F2] rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 bg-[#C50202] rounded-full flex items-center justify-center">
              <Globe className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-[#000000]">Shivansh Infosys Pvt. Ltd.</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            This sitemap is automatically updated whenever new pages are added to our website.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>• XML Sitemap: /sitemap.xml</span>
            <span>• RSS Feed: /feed.xml</span>
            <span>• Robots: /robots.txt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;