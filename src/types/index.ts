export interface ThreatData {
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

export interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical' | 'healing';
  uptime: number;
  last_check: Date;
  auto_healing: boolean;
}

export interface FirewallRule {
  id: string;
  rule_type: 'block' | 'allow' | 'monitor';
  source: string;
  destination: string;
  port: number;
  protocol: string;
  ai_generated: boolean;
  confidence: number;
}

export interface AgentStatus {
  id: string;
  name: string;
  type: 'detection' | 'firewall' | 'healing' | 'analysis';
  status: 'active' | 'idle' | 'updating' | 'offline';
  performance_score: number;
  threats_blocked: number;
}

// New types for the software platform
export interface User {
  id: string;
  email: string;
  company_name: string;
  full_name: string;
  phone?: string;
  license_type: 'trial' | 'basic' | 'professional' | 'enterprise';
  license_key: string;
  download_count: number;
  last_download: Date | null;
  registration_date: Date;
  last_login: Date | null;
  is_active: boolean;
  software_version: string;
  system_info?: {
    os: string;
    version: string;
    architecture: string;
  };
}

export interface Download {
  id: string;
  user_id: string;
  software_version: string;
  download_date: Date;
  ip_address: string;
  user_agent: string;
  file_size: number;
  download_completed: boolean;
}

export interface SoftwareVersion {
  id: string;
  version: string;
  release_date: Date;
  file_url: string;
  file_size: number;
  changelog: string;
  is_latest: boolean;
  minimum_requirements: {
    os: string[];
    ram: string;
    storage: string;
    processor: string;
  };
}

export interface AdminStats {
  total_users: number;
  active_users: number;
  total_downloads: number;
  downloads_today: number;
  license_distribution: {
    trial: number;
    basic: number;
    professional: number;
    enterprise: number;
  };
  recent_registrations: User[];
  recent_downloads: Download[];
}