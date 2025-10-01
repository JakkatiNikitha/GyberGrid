import React, { useState, useEffect } from 'react';
import { Shield, Users, Download, BarChart3, Globe, Settings, LogOut, Eye, EyeOff } from 'lucide-react';
import { PublicWebsite } from './components/PublicWebsite';
import { AdminDashboard } from './components/AdminDashboard';
import { ThreatMap } from './components/ThreatMap';
import { AIFirewall } from './components/AIFirewall';
import { SelfHealingEngine } from './components/SelfHealingEngine';
import { AgentMarketplace } from './components/AgentMarketplace';

type View = 'website' | 'admin' | 'demo';

function App() {
  const [currentView, setCurrentView] = useState<View>('website');
  const [demoData, setDemoData] = useState({
    threats: [] as Array<{
      id: string;
      type: string;
      subtype: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      source_ip: string;
      target: string;
      timestamp: Date;
      status: 'detected' | 'mitigating' | 'blocked' | 'resolved';
      description: string;
      mitigation_strategy: string;
    }>,
    systemHealth: 98,
    activeConnections: 1247,
    blockedAttacks: 342
  });

  // Initialize demo data
  useEffect(() => {
    const initializeDemoData = () => {
      const threatTypes = ['network', 'intrusion', 'malware', 'insider', 'web'] as const;
      const severityLevels = ['low', 'medium', 'high', 'critical'] as const;
      const statusTypes = ['detected', 'mitigating', 'blocked', 'resolved'] as const;
      
      const threats = Array.from({ length: 50 }, (_, i) => ({
        id: (i + 1).toString(),
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        subtype: ['DDoS Attack', 'Malware Injection', 'Phishing Attempt', 'Brute Force', 'SQL Injection'][Math.floor(Math.random() * 5)],
        severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
        source_ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        target: `server-${Math.floor(Math.random() * 10) + 1}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        status: statusTypes[Math.floor(Math.random() * statusTypes.length)],
        description: 'Automated threat detection and analysis',
        mitigation_strategy: 'AI-powered response protocol activated'
      }));

      setDemoData(prev => ({
        ...prev,
        threats
      }));
    };

    initializeDemoData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDemoData(prev => ({
        ...prev,
        systemHealth: Math.max(85, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2)),
        activeConnections: Math.max(1000, Math.min(2000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100))),
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-cyan-400" style={{
              animation: 'rotateY 4s linear infinite',
              transformStyle: 'preserve-3d'
            }} />
            <span className="text-xl font-bold text-white">CyberGrid</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('website')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === 'website' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Website
            </button>
            
            <button
              onClick={() => setCurrentView('demo')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === 'demo' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Live Demo
            </button>
            
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === 'admin' 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderDemo = () => (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CyberGrid Security Dashboard</h1>
          <p className="text-gray-400">Real-time threat monitoring and AI-powered defense systems</p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">System Health</p>
                <p className="text-2xl font-bold text-green-400">{demoData.systemHealth}%</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Connections</p>
                <p className="text-2xl font-bold text-cyan-400">{demoData.activeConnections.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Blocked Attacks</p>
                <p className="text-2xl font-bold text-red-400">{demoData.blockedAttacks.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Threat Level</p>
                <p className="text-2xl font-bold text-yellow-400">Medium</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ThreatMap threats={demoData.threats} />
          <AIFirewall />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SelfHealingEngine systemHealth={demoData.systemHealth} />
          <AgentMarketplace />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <style jsx>{`
        @keyframes rotateY {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateY(360deg) rotateZ(360deg); }
        }
      `}</style>
      
      {renderNavigation()}
      
      {currentView === 'website' && (
        <PublicWebsite 
          onNavigateToAdmin={() => setCurrentView('admin')}
          onNavigateToDashboard={() => setCurrentView('demo')}
        />
      )}
      {currentView === 'admin' && (
        <AdminDashboard 
          onBack={() => setCurrentView('website')}
        />
      )}
      {currentView === 'demo' && renderDemo()}
    </div>
  );
}

export default App;