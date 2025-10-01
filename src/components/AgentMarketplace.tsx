import React from 'react';
import { Package, Star, Download, Shield } from 'lucide-react';

interface AgentStatus {
  id: string;
  name: string;
  type: 'detection' | 'firewall' | 'healing' | 'analysis';
  status: 'active' | 'idle' | 'updating' | 'offline';
  performance_score: number;
  threats_blocked: number;
}

interface AgentMarketplaceProps {
  agents?: AgentStatus[];
}

export const AgentMarketplace: React.FC<AgentMarketplaceProps> = ({ agents = [] }) => {
  const defaultAgents: AgentStatus[] = [
    {
      id: '1',
      name: 'Neural Threat Scanner',
      type: 'detection',
      status: 'active',
      performance_score: 97,
      threats_blocked: 1247
    },
    {
      id: '2',
      name: 'Adaptive Firewall',
      type: 'firewall',
      status: 'active',
      performance_score: 94,
      threats_blocked: 892
    },
    {
      id: '3',
      name: 'Auto-Recovery Engine',
      type: 'healing',
      status: 'idle',
      performance_score: 89,
      threats_blocked: 456
    },
    {
      id: '4',
      name: 'Behavioral Analyzer',
      type: 'analysis',
      status: 'active',
      performance_score: 92,
      threats_blocked: 723
    }
  ];

  const activeAgents = agents.length > 0 ? agents : defaultAgents;

  const getAgentTypeColor = (type: string) => {
    switch (type) {
      case 'detection': return 'text-red-400 bg-red-900';
      case 'firewall': return 'text-blue-400 bg-blue-900';
      case 'healing': return 'text-green-400 bg-green-900';
      case 'analysis': return 'text-purple-400 bg-purple-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'idle': return 'text-yellow-400';
      case 'updating': return 'text-blue-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-md border border-purple-400 border-opacity-30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-purple-400 flex items-center">
          <Package className="w-8 h-8 mr-3" />
          AGENT MARKETPLACE
        </h3>
        <div className="text-right">
          <div className="text-lg font-bold text-purple-400">{activeAgents.length}</div>
          <div className="text-xs text-gray-400">ACTIVE AGENTS</div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {activeAgents.map((agent) => (
          <div key={agent.id} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-600 hover:border-purple-400 transition-colors duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-purple-400" />
                <div>
                  <div className="font-semibold text-white">{agent.name}</div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getAgentTypeColor(agent.type)}`}>
                    {agent.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className={`font-semibold ${getStatusColor(agent.status)}`}>
                {agent.status.toUpperCase()}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Performance Score</span>
                <span className="text-green-400 font-semibold">{agent.performance_score}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${agent.performance_score}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Threats Blocked</span>
                <span className="text-red-400 font-semibold">{agent.threats_blocked}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Available Agents */}
      <div>
        <h4 className="text-lg font-semibold text-purple-300 mb-3">Available Agents</h4>
        <div className="space-y-2">
          {[
            { name: 'Advanced Malware Scanner', rating: 4.8, downloads: '12.5K', type: 'detection' },
            { name: 'Zero-Day Protection', rating: 4.9, downloads: '8.2K', type: 'firewall' },
            { name: 'Auto-Recovery System', rating: 4.7, downloads: '15.1K', type: 'healing' },
            { name: 'Behavioral Analytics', rating: 4.6, downloads: '9.8K', type: 'analysis' }
          ].map((availableAgent, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-30 p-3 rounded-lg flex items-center justify-between hover:bg-opacity-50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-semibold text-white">{availableAgent.name}</div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>{availableAgent.rating}</span>
                    <Download className="w-3 h-3" />
                    <span>{availableAgent.downloads}</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors duration-200">
                Install
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};