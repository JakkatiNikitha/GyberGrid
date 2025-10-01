import React from 'react';
import { Shield, AlertTriangle, Zap, Globe } from 'lucide-react';

interface ThreatData {
  id: string;
  type: 'network' | 'intrusion' | 'malware' | 'insider' | 'web' | 'iot' | 'apt';
  subtype: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source_ip: string;
  target: string;
  timestamp: Date;
  status: 'detected' | 'mitigating' | 'blocked' | 'resolved';
  description: string;
  mitigation_strategy: string;
}

interface ThreatMapProps {
  threats: ThreatData[];
}

export const ThreatMap: React.FC<ThreatMapProps> = ({ threats }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff0000';
      case 'high': return '#ff6600';
      case 'medium': return '#ffaa00';
      case 'low': return '#00ff41';
      default: return '#00bfff';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'network': return <Globe className="w-4 h-4" />;
      case 'intrusion': return <Shield className="w-4 h-4" />;
      case 'malware': return <AlertTriangle className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-cyan-400 border-opacity-30 overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Simplified world continents */}
          <path d="M150,200 Q200,180 250,200 Q300,190 350,210 Q400,200 450,220 L450,280 Q400,270 350,280 Q300,275 250,270 Q200,275 150,270 Z" 
                fill="#00ffff" opacity="0.1" />
          <path d="M500,150 Q550,140 600,150 Q650,145 700,160 Q750,150 800,170 L800,250 Q750,240 700,250 Q650,245 600,240 Q550,245 500,240 Z" 
                fill="#00ffff" opacity="0.1" />
        </svg>
      </div>

      {/* Threat Indicators */}
      {threats.slice(-20).map((threat, index) => {
        const x = 10 + (index * 45) % 90;
        const y = 10 + Math.floor(index / 20) * 30 + Math.random() * 20;
        
        return (
          <div
            key={threat.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse cursor-pointer group"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div 
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ 
                backgroundColor: getSeverityColor(threat.severity),
                boxShadow: `0 0 15px ${getSeverityColor(threat.severity)}`
              }}
            />
            
            {/* Tooltip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
              <div className="font-semibold">{threat.subtype}</div>
              <div className="text-gray-300">{threat.source_ip}</div>
              <div className="text-gray-400">{threat.severity.toUpperCase()}</div>
            </div>
          </div>
        );
      })}

      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"
             style={{ top: '30%', animationDuration: '3s' }} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"
             style={{ top: '70%', animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 p-3 rounded-lg text-xs">
        <div className="text-white font-semibold mb-2">Threat Severity</div>
        {['critical', 'high', 'medium', 'low'].map(severity => (
          <div key={severity} className="flex items-center space-x-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getSeverityColor(severity) }}
            />
            <span className="text-gray-300 capitalize">{severity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};