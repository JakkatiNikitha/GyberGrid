import React from 'react';
import { Shield, Zap, Activity, Lock } from 'lucide-react';

interface FirewallRule {
  id: string;
  rule_type: 'block' | 'allow' | 'monitor';
  source: string;
  destination: string;
  port: number;
  protocol: string;
  ai_generated: boolean;
  confidence: number;
}

interface AIFirewallProps {
  rules: FirewallRule[];
  packetsProcessed: number;
  threatsBlocked: number;
}

export const AIFirewall: React.FC<AIFirewallProps> = ({ 
  rules = [], 
  packetsProcessed = 1247832, 
  threatsBlocked = 342 
}) => {
  const getRuleTypeColor = (type: string) => {
    switch (type) {
      case 'block': return 'text-red-400 bg-red-900';
      case 'allow': return 'text-green-400 bg-green-900';
      case 'monitor': return 'text-yellow-400 bg-yellow-900';
      default: return 'text-blue-400 bg-blue-900';
    }
  };

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-md border border-blue-400 border-opacity-30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-blue-400 flex items-center">
          <Shield className="w-8 h-8 mr-3" />
          AI-AUGMENTED FIREWALL
        </h3>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-green-400 animate-pulse" />
          <span className="text-green-400 text-sm font-semibold">ACTIVE</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-cyan-400">{packetsProcessed.toLocaleString()}</div>
          <div className="text-xs text-gray-400">PACKETS PROCESSED</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-400">{threatsBlocked}</div>
          <div className="text-xs text-gray-400">THREATS BLOCKED</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{rules.length}</div>
          <div className="text-xs text-gray-400">ACTIVE RULES</div>
        </div>
      </div>

      {/* Deep Packet Inspection Visualization */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Deep Packet Inspection
        </h4>
        <div className="relative h-20 bg-gray-900 rounded-lg overflow-hidden">
          {/* Animated data flow */}
          <div className="absolute inset-0 flex items-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-8 mx-1 rounded animate-pulse"
                style={{
                  backgroundColor: `hsl(${180 + i * 10}, 70%, 50%)`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-cyan-400 font-semibold">ANALYZING TRAFFIC PATTERNS</span>
          </div>
        </div>
      </div>

      {/* Recent Rules */}
      <div>
        <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Recent AI-Generated Rules
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {(rules.length > 0 ? rules : [
            {
              id: '1',
              rule_type: 'block' as const,
              source: '192.168.1.100',
              destination: '10.0.0.1',
              port: 443,
              protocol: 'TCP',
              ai_generated: true,
              confidence: 0.95
            },
            {
              id: '2',
              rule_type: 'monitor' as const,
              source: '172.16.0.0/16',
              destination: 'any',
              port: 80,
              protocol: 'HTTP',
              ai_generated: true,
              confidence: 0.87
            }
          ]).slice(-5).map((rule) => (
            <div key={rule.id} className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getRuleTypeColor(rule.rule_type)}`}>
                    {rule.rule_type.toUpperCase()}
                  </span>
                  <span className="text-white font-mono text-sm">{rule.source}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-white font-mono text-sm">{rule.destination}:{rule.port}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {rule.ai_generated && (
                    <span className="text-purple-400 text-xs bg-purple-900 px-2 py-1 rounded">AI</span>
                  )}
                  <span className="text-green-400 text-xs">{Math.round(rule.confidence * 100)}%</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">{rule.protocol.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};