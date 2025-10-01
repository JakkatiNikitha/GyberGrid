import React, { useState } from 'react';
import { Shield, Download, CheckCircle, Star, Users, Globe, Lock, Zap, Activity, ArrowRight, Play, Monitor, Smartphone, Apple } from 'lucide-react';

interface PublicWebsiteProps {
  onNavigateToAdmin: () => void;
  onNavigateToDashboard: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onNavigateToAdmin, onNavigateToDashboard }) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseType, setLicenseType] = useState<'trial' | 'basic' | 'professional' | 'enterprise'>('trial');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | 'linux'>('windows');

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate license key
    const licenseKey = `CYBER-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const osExtensions = {
      windows: '.exe',
      mac: '.dmg',
      linux: '.deb'
    };
    
    alert(`Registration successful! Your license key is: ${licenseKey}\nDownload will begin shortly for ${selectedOS.toUpperCase()}.`);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `cybergrid-installer-${selectedOS}${osExtensions[selectedOS]}`;
    link.click();
    
    setIsRegistering(false);
    setShowRegistration(false);
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AI-Powered Threat Detection",
      description: "Advanced machine learning algorithms detect and neutralize threats in real-time"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Self-Healing System",
      description: "Autonomous recovery and system restoration without human intervention"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "AI-Augmented Firewall",
      description: "Dynamic rule generation and deep packet inspection for maximum protection"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-Time Monitoring",
      description: "24/7 system monitoring with instant threat response and mitigation"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Threat Intelligence",
      description: "Connected to worldwide threat databases for proactive defense"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Agent Marketplace",
      description: "Extensible platform with third-party security modules and plugins"
    }
  ];

  const pricingPlans = [
    {
      name: "Trial",
      price: "Free",
      duration: "30 days",
      features: ["Basic threat detection", "Standard firewall", "Email support", "Single device"],
      popular: false
    },
    {
      name: "Professional",
      price: "$99",
      duration: "per month",
      features: ["Advanced AI detection", "Self-healing engine", "Priority support", "Up to 10 devices", "Custom rules"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "contact us",
      features: ["Full AI suite", "Unlimited devices", "24/7 phone support", "Custom integrations", "Dedicated manager"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* 3D Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float3d ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translateZ(${Math.random() * 100}px)`
            }}
          />
        ))}
      </div>
      
      {/* 3D CSS Animations */}
      <style jsx>{`
        @keyframes float3d {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0px);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotateX(180deg) rotateY(180deg) translateZ(50px);
            opacity: 0.8;
          }
        }
        
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes pulse3d {
          0%, 100% { 
            transform: scale(1) rotateZ(0deg);
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          }
          50% { 
            transform: scale(1.1) rotateZ(180deg);
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
          }
        }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .card-3d:hover {
          transform: rotateY(10deg) rotateX(5deg) translateZ(20px);
        }
        
        .shield-3d {
          animation: pulse3d 3s ease-in-out infinite;
        }
      `}</style>
      {/* Navigation */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-b border-cyan-400 border-opacity-30 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-10 h-10 text-cyan-400 shield-3d" />
              <div>
                <h1 className="text-2xl font-bold text-cyan-400">CYBERGRID</h1>
                <p className="text-xs text-gray-400">AI-Powered Cybersecurity</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={onNavigateToDashboard}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Live Demo
              </button>
              <button 
                onClick={onNavigateToAdmin}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Admin
              </button>
              <button 
                onClick={() => setShowRegistration(true)}
                className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Now</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ perspective: '1000px' }}>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Next-Generation Cybersecurity
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              CyberGrid is an AI-powered, self-healing cybersecurity platform that autonomously detects, 
              analyzes, and mitigates cyber threats in real-time. Protect your digital infrastructure with 
              military-grade security technology. Available for Windows, Mac, and Linux systems.
            </p>
            
            {/* OS Selection */}
            <div className="flex justify-center space-x-6 mb-8">
              <button
                onClick={() => setSelectedOS('windows')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 card-3d ${
                  selectedOS === 'windows' 
                    ? 'border-cyan-400 bg-cyan-400 bg-opacity-20 text-cyan-400' 
                    : 'border-gray-600 text-gray-400 hover:border-cyan-400'
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>Windows</span>
              </button>
              <button
                onClick={() => setSelectedOS('mac')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 card-3d ${
                  selectedOS === 'mac' 
                    ? 'border-cyan-400 bg-cyan-400 bg-opacity-20 text-cyan-400' 
                    : 'border-gray-600 text-gray-400 hover:border-cyan-400'
                }`}
              >
                <Apple className="w-5 h-5" />
                <span>macOS</span>
              </button>
              <button
                onClick={() => setSelectedOS('linux')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all duration-300 card-3d ${
                  selectedOS === 'linux' 
                    ? 'border-cyan-400 bg-cyan-400 bg-opacity-20 text-cyan-400' 
                    : 'border-gray-600 text-gray-400 hover:border-cyan-400'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span>Linux</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <button 
                onClick={() => setShowRegistration(true)}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-cyan-500/25 card-3d"
              >
                <Download className="w-5 h-5" />
                <span>Download for {selectedOS === 'mac' ? 'macOS' : selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onNavigateToDashboard}
                className="border border-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-3 card-3d"
              >
                <Play className="w-5 h-5" />
                <span>View Live Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black bg-opacity-30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-cyan-400">Advanced Security Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge AI technology and machine learning algorithms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-cyan-400 transition-all duration-300 card-3d">
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-8 rounded-xl card-3d">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-cyan-100">Threat Detection Rate</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-xl card-3d">
              <div className="text-4xl font-bold mb-2">&lt;1s</div>
              <div className="text-green-100">Response Time</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-xl card-3d">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-purple-100">Protected Systems</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-red-600 p-8 rounded-xl card-3d">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-orange-100">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black bg-opacity-30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-cyan-400">Choose Your Protection Level</h2>
            <p className="text-xl text-gray-300">Flexible pricing for organizations of all sizes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-gray-800 bg-opacity-50 p-8 rounded-xl border-2 transition-all duration-300 card-3d ${
                plan.popular ? 'border-cyan-400 shadow-lg shadow-cyan-500/25' : 'border-gray-700 hover:border-cyan-400'
              }`}>
                {plan.popular && (
                  <div className="bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-semibold mb-4 text-center">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="text-4xl font-bold text-cyan-400 mb-1">{plan.price}</div>
                  <div className="text-gray-400">{plan.duration}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    setLicenseType(plan.name.toLowerCase() as any);
                    setShowRegistration(true);
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 card-3d ${
                    plan.popular 
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                      : 'border border-cyan-400 hover:bg-cyan-400 hover:text-black text-cyan-400'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" style={{ perspective: '1000px' }}>
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full border border-cyan-400 card-3d" style={{ transformStyle: 'preserve-3d' }}>
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4 shield-3d" />
              <h3 className="text-2xl font-bold text-white mb-2">Download CyberGrid</h3>
              <p className="text-gray-300">Fill out the form to get your license key and download link for {selectedOS === 'mac' ? 'macOS' : selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}</p>
            </div>
            
            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">License Type</label>
                <select
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value as any)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="trial">Trial (30 days free)</option>
                  <option value="basic">Basic ($49/month)</option>
                  <option value="professional">Professional ($99/month)</option>
                  <option value="enterprise">Enterprise (Contact us)</option>
                </select>
              </div>
              
              {/* System Requirements */}
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">System Requirements for {selectedOS === 'mac' ? 'macOS' : selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}</h4>
                <div className="text-xs text-gray-300 space-y-1">
                  {selectedOS === 'windows' && (
                    <>
                      <p>• Windows 10/11 (64-bit)</p>
                      <p>• 8GB RAM minimum</p>
                      <p>• 2GB free disk space</p>
                      <p>• Intel i5 or AMD Ryzen 5</p>
                    </>
                  )}
                  {selectedOS === 'mac' && (
                    <>
                      <p>• macOS 11.0 or later</p>
                      <p>• 8GB RAM minimum</p>
                      <p>• 2GB free disk space</p>
                      <p>• Intel or Apple Silicon</p>
                    </>
                  )}
                  {selectedOS === 'linux' && (
                    <>
                      <p>• Ubuntu 20.04+ / CentOS 8+</p>
                      <p>• 6GB RAM minimum</p>
                      <p>• 1.5GB free disk space</p>
                      <p>• x86_64 architecture</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistration(false)}
                  className="flex-1 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors card-3d"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 card-3d"
                >
                  {isRegistering ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download for {selectedOS === 'mac' ? 'macOS' : selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
               <Shield className="w-8 h-8 text-cyan-400 shield-3d" />
                <span className="text-xl font-bold text-cyan-400">CYBERGRID</span>
              </div>
              <p className="text-gray-400">
               Advanced AI-powered cybersecurity platform for Windows, Mac, and Linux systems.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CyberGrid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};