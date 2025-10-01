import React from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Settings } from 'lucide-react';

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical' | 'healing';
  uptime: number;
  last_check: Date;
  auto_healing: boolean;
}

interface SelfHealingEngineProps {
  systemHealth?: number;
}

export const SelfHealingEngine: React.FC<SelfHealingEngineProps> = ({ 
  systemHealth = 98
}) => {
  const healingActions = 127;
  const automationLevel = 95;
  
  const systemComponents: SystemHealth[] = [
    {
      component: 'Network Security',
      status: 'healthy',
      uptime: 2847392,
      last_check: new Date(),
      auto_healing: true
    },
    {
      component: 'Firewall Engine',
      status: 'healthy',
      uptime: 2847392,
      last_check: new Date(),
      auto_healing: true
    },
    {
      component: 'Threat Detection',
      status: 'warning',
      uptime: 2847392,
      last_check: new Date(),
      auto_healing: true
    },
    {
      component: 'Data Protection',
      status: 'healing',
      uptime: 2847392,
      last_check: new Date(),
      auto_healing: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      case 'healing': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'healing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-md border border-green-400 border-opacity-30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-400 flex items-center">
          <RefreshCw className="w-8 h-8 mr-3 animate-spin" style={{ animationDuration: '3s' }} />
          SELF-HEALING ENGINE
        </h3>
        <div className="text-right">
          <div className="text-lg font-bold text-green-400">{automationLevel}%</div>
          <div className="text-xs text-gray-400">AUTOMATION</div>
        </div>
      </div>

      {/* Healing Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{healingActions}</div>
          <div className="text-xs text-gray-400">HEALING ACTIONS</div>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">
            {systemComponents.filter(h => h.status === 'healthy').length}
          </div>
          <div className="text-xs text-gray-400">HEALTHY SYSTEMS</div>
        </div>
      </div>

      {/* System Health Status */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-green-300 mb-3">System Components</h4>
        {systemComponents.map((system, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={getStatusColor(system.status)}>
                  {getStatusIcon(system.status)}
                </div>
                <div>
                  <div className="font-semibold text-white">{system.component}</div>
                  <div className="text-xs text-gray-400">
                    Uptime: {Math.floor(system.uptime / 3600)}h {Math.floor((system.uptime % 3600) / 60)}m
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${getStatusColor(system.status)}`}>
                  {system.status.toUpperCase()}
                </div>
                {system.auto_healing && (
                  <div className="text-xs text-blue-400">AUTO-HEAL</div>
                )}
              </div>
            </div>
            
            {/* Health Bar */}
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  system.status === 'healthy' ? 'bg-green-400' :
                  system.status === 'warning' ? 'bg-yellow-400' :
                  system.status === 'healing' ? 'bg-blue-400' : 'bg-red-400'
                }`}
                style={{ 
                  width: `${
                    system.status === 'healthy' ? 100 :
                    system.status === 'warning' ? 70 :
                    system.status === 'healing' ? 50 : 25
                  }%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Automated Playbooks */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-green-300 mb-3">Active Playbooks</h4>
        <div className="space-y-2">
          {[
            'Service Restart Protocol',
            'Security Patch Deployment',
            'Traffic Rerouting',
            'Backup System Activation'
          ].map((playbook, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-50 p-2 rounded flex items-center justify-between">
              <span className="text-white text-sm">{playbook}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};