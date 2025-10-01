import React, { useState, useEffect } from 'react';
import { 
  Users, Download, Activity, Shield, Search, Filter, 
  MoreVertical, Eye, Ban, CheckCircle, AlertTriangle,
  TrendingUp, Calendar, Globe, Smartphone, Monitor,
  ArrowLeft, RefreshCw, Settings, BarChart3
} from 'lucide-react';
import { User, Download as DownloadType, AdminStats, SoftwareVersion } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'aegis2024'
};
export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'downloads' | 'versions'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [versions, setVersions] = useState<SoftwareVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load admin data when authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const loadAdminData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'john.doe@techcorp.com',
          company_name: 'TechCorp Solutions',
          full_name: 'John Doe',
          phone: '+1-555-0123',
          license_type: 'enterprise',
          license_key: 'CYBER-ENT-2024-001',
          download_count: 3,
          last_download: new Date('2024-01-15'),
          registration_date: new Date('2024-01-01'),
          last_login: new Date('2024-01-15'),
          is_active: true,
          software_version: '2.1.0',
          system_info: {
            os: 'Windows 11',
            version: '22H2',
            architecture: 'x64'
          }
        },
        {
          id: '2',
          email: 'sarah.wilson@securebank.com',
          company_name: 'SecureBank Inc',
          full_name: 'Sarah Wilson',
          phone: '+1-555-0456',
          license_type: 'professional',
          license_key: 'CYBER-PRO-2024-002',
          download_count: 2,
          last_download: new Date('2024-01-14'),
          registration_date: new Date('2024-01-10'),
          last_login: new Date('2024-01-14'),
          is_active: true,
          software_version: '2.1.0',
          system_info: {
            os: 'macOS Sonoma',
            version: '14.2',
            architecture: 'x64'
          }
        },
        {
          id: '3',
          email: 'mike.chen@startup.io',
          company_name: 'Startup Innovations',
          full_name: 'Mike Chen',
          license_type: 'trial',
          license_key: 'CYBER-TRL-2024-003',
          download_count: 1,
          last_download: new Date('2024-01-12'),
          registration_date: new Date('2024-01-12'),
          last_login: null,
          is_active: false,
          software_version: '2.1.0',
          system_info: {
            os: 'Ubuntu 22.04',
            version: 'LTS',
            architecture: 'x64'
          }
        }
      ];

      const mockDownloads: DownloadType[] = [
        {
          id: '1',
          user_id: '1',
          software_version: '2.1.0',
          download_date: new Date('2024-01-15'),
          ip_address: '192.168.1.100',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          file_size: 245760000,
          download_completed: true
        },
        {
          id: '2',
          user_id: '2',
          software_version: '2.0.5',
          download_date: new Date('2024-01-14'),
          ip_address: '10.0.0.50',
          user_agent: 'Mozilla/5.0 (X11; Linux x86_64)',
          file_size: 238080000,
          download_completed: true
        }
      ];

      const mockVersions: SoftwareVersion[] = [
        {
          id: '1',
          version: '2.1.0',
          release_date: new Date('2024-01-15'),
          file_url: '/downloads/cybergrid-2.1.0.exe',
          file_size: 245760000,
          changelog: 'Enhanced AI threat detection, improved self-healing engine, new agent marketplace features',
          is_latest: true,
          minimum_requirements: {
            os: ['Windows 10/11', 'macOS 11.0+', 'Ubuntu 20.04+', 'CentOS 8+'],
            ram: '8GB',
            storage: '2GB',
            processor: 'Intel i5 or AMD Ryzen 5'
          }
        },
        {
          id: '2',
          version: '2.0.5',
          release_date: new Date('2024-01-01'),
          file_url: '/downloads/cybergrid-2.0.5.exe',
          file_size: 238080000,
          changelog: 'Bug fixes and performance improvements',
          is_latest: false,
          minimum_requirements: {
            os: ['Windows 10/11', 'macOS 10.15+', 'Ubuntu 18.04+'],
            ram: '6GB',
            storage: '1.5GB',
            processor: 'Intel i3 or AMD Ryzen 3'
          }
        }
      ];

      const mockStats: AdminStats = {
        total_users: mockUsers.length,
        active_users: mockUsers.filter(u => u.is_active).length,
        total_downloads: mockDownloads.length,
        downloads_today: 1,
        license_distribution: {
          trial: mockUsers.filter(u => u.license_type === 'trial').length,
          basic: mockUsers.filter(u => u.license_type === 'basic').length,
          professional: mockUsers.filter(u => u.license_type === 'professional').length,
          enterprise: mockUsers.filter(u => u.license_type === 'enterprise').length
        },
        recent_registrations: mockUsers.slice(-5),
        recent_downloads: mockDownloads.slice(-5)
      };

      setUsers(mockUsers);
      setDownloads(mockDownloads);
      setVersions(mockVersions);
      setStats(mockStats);
      setIsLoading(false);
    };

    loadAdminData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_CREDENTIALS.username && loginForm.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-red-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float3d ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `translateZ(${Math.random() * 50}px)`
              }}
            />
          ))}
        </div>
        
        <style jsx>{`
          @keyframes float3d {
            0%, 100% { 
              transform: translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0px);
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-30px) rotateX(180deg) rotateY(180deg) translateZ(30px);
              opacity: 0.6;
            }
          }
          
          .login-card {
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .login-card:hover {
            transform: rotateY(5deg) rotateX(2deg) translateZ(10px);
          }
          
          .shield-rotate {
            animation: shieldRotateY 4s linear infinite;
          }
          
          @keyframes shieldRotateY {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
        `}</style>
        
        <div className="login-card bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl border border-red-400 border-opacity-50 max-w-md w-full mx-4" style={{ perspective: '1000px' }}>
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Shield className="w-16 h-16 text-red-400 mx-auto mb-4 shield-rotate" />
              <div className="absolute inset-0 w-16 h-16 border-2 border-red-400 rounded-full animate-ping opacity-20 mx-auto"></div>
            </div>
            <h2 className="text-3xl font-bold text-red-400 mb-2">ADMIN ACCESS</h2>
            <p className="text-gray-300">CyberGrid Administrative Portal</p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mt-4"></div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-all duration-300"
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-all duration-300"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-900 bg-opacity-50 border border-red-400 text-red-400 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                ACCESS ADMIN PANEL
              </button>
              
              <button
                type="button"
                onClick={onBack}
                className="w-full border border-gray-600 hover:border-red-400 text-gray-300 hover:text-red-400 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Back to Website
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg border border-gray-600">
              <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
              <p className="text-sm text-cyan-400 font-mono">Username: admin</p>
              <p className="text-sm text-cyan-400 font-mono">Password: aegis2024</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && user.is_active) ||
                         (filterStatus === 'inactive' && !user.is_active);
    
    return matchesSearch && matchesFilter;
  });

  const getLicenseColor = (type: string) => {
    switch (type) {
      case 'enterprise': return 'bg-purple-900 text-purple-400';
      case 'professional': return 'bg-blue-900 text-blue-400';
      case 'basic': return 'bg-green-900 text-green-400';
      case 'trial': return 'bg-yellow-900 text-yellow-400';
      default: return 'bg-gray-900 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center relative overflow-hidden">
        {/* 3D Loading Animation */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float3d ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-red-400 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-xl text-gray-300">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float3d ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float3d {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg) translateZ(0px);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotateX(180deg) rotateY(180deg) translateZ(30px);
            opacity: 0.7;
          }
        }
        
        .admin-card {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .admin-card:hover {
          transform: rotateY(2deg) rotateX(1deg) translateZ(5px);
        }
      `}</style>

      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-cyan-400 border-opacity-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors admin-card"
              >
                <ArrowLeft className="w-6 h-6 text-cyan-400" />
              </button>
              <div className="flex items-center space-x-3">
                <Shield className="w-10 h-10 text-red-400 animate-pulse" />
                <div>
                  <h1 className="text-2xl font-bold text-red-400">ADMIN DASHBOARD</h1>
                  <p className="text-sm text-gray-400">CyberGrid Management Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-semibold transition-colors admin-card"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-black bg-opacity-30 border-b border-gray-700">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'versions', label: 'Versions', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-400 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black bg-opacity-40 backdrop-blur-md border border-cyan-400 border-opacity-30 rounded-xl p-6 admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-cyan-400">{stats.total_users}</p>
                  </div>
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              
              <div className="bg-black bg-opacity-40 backdrop-blur-md border border-green-400 border-opacity-30 rounded-xl p-6 admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Users</p>
                    <p className="text-3xl font-bold text-green-400">{stats.active_users}</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-black bg-opacity-40 backdrop-blur-md border border-blue-400 border-opacity-30 rounded-xl p-6 admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Downloads</p>
                    <p className="text-3xl font-bold text-blue-400">{stats.total_downloads}</p>
                  </div>
                  <Download className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-black bg-opacity-40 backdrop-blur-md border border-purple-400 border-opacity-30 rounded-xl p-6 admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Downloads Today</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.downloads_today}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* License Distribution */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md border border-gray-600 rounded-xl p-6 admin-card">
              <h3 className="text-xl font-semibold text-white mb-6">License Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.license_distribution).map(([type, count]) => (
                  <div key={type} className="text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${getLicenseColor(type)}`}>
                      <span className="text-2xl font-bold">{count}</span>
                    </div>
                    <p className="text-gray-400 capitalize">{type}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black bg-opacity-40 backdrop-blur-md border border-gray-600 rounded-xl p-6 admin-card">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Registrations</h3>
                <div className="space-y-4">
                  {stats.recent_registrations.map(user => (
                    <div key={user.id} className="flex items-center space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                      <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{user.full_name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{user.full_name}</p>
                        <p className="text-gray-400 text-sm">{user.company_name}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getLicenseColor(user.license_type)}`}>
                        {user.license_type.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black bg-opacity-40 backdrop-blur-md border border-gray-600 rounded-xl p-6 admin-card">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Downloads</h3>
                <div className="space-y-4">
                  {stats.recent_downloads.map(download => {
                    const user = users.find(u => u.id === download.user_id);
                    return (
                      <div key={download.id} className="flex items-center space-x-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                        <Download className="w-8 h-8 text-blue-400" />
                        <div className="flex-1">
                          <p className="text-white font-medium">v{download.software_version}</p>
                          <p className="text-gray-400 text-sm">{user?.full_name || 'Unknown User'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 text-sm">Completed</p>
                          <p className="text-gray-400 text-xs">{download.download_date.toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none w-full md:w-80"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md border border-gray-600 rounded-xl overflow-hidden admin-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 bg-opacity-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">License</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Downloads</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-800 hover:bg-opacity-30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">{user.full_name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.full_name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                              <div className="text-xs text-gray-500">{user.company_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getLicenseColor(user.license_type)}`}>
                            {user.license_type.toUpperCase()}
                          </span>
                          <div className="text-xs text-gray-400 mt-1">v{user.software_version}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.download_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.last_login ? user.last_login.toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.is_active 
                              ? 'bg-green-900 text-green-400' 
                              : 'bg-red-900 text-red-400'
                          }`}>
                            {user.is_active ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-cyan-400 hover:text-cyan-300">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300">
                              <Ban className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-300">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="bg-black bg-opacity-40 backdrop-blur-md border border-gray-600 rounded-xl overflow-hidden admin-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 bg-opacity-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Version</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {downloads.map(download => {
                      const user = users.find(u => u.id === download.user_id);
                      return (
                        <tr key={download.id} className="hover:bg-gray-800 hover:bg-opacity-30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{user?.full_name || 'Unknown'}</div>
                            <div className="text-sm text-gray-400">{user?.email || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            v{download.software_version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {download.download_date.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                            {download.ip_address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {(download.file_size / 1024 / 1024).toFixed(1)} MB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              download.download_completed 
                                ? 'bg-green-900 text-green-400' 
                                : 'bg-yellow-900 text-yellow-400'
                            }`}>
                              {download.download_completed ? 'Completed' : 'In Progress'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'versions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Software Versions</h2>
              <button className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white font-semibold transition-colors">
                Upload New Version
              </button>
            </div>

            <div className="grid gap-6">
              {versions.map(version => (
                <div key={version.id} className="bg-black bg-opacity-40 backdrop-blur-md border border-gray-600 rounded-xl p-6 admin-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-cyan-400">v{version.version}</div>
                      {version.is_latest && (
                        <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-xs font-semibold">
                          LATEST
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Released: {version.release_date.toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Changelog</h4>
                      <p className="text-gray-300">{version.changelog}</p>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold text-gray-400 mb-2">File Info</h5>
                        <div className="text-sm text-gray-300">
                          <p>Size: {(version.file_size / 1024 / 1024).toFixed(1)} MB</p>
                          <p>Downloads: {downloads.filter(d => d.software_version === version.version).length}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">System Requirements</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div>
                          <span className="text-gray-400">OS:</span> {version.minimum_requirements.os.join(', ')}
                        </div>
                        <div>
                          <span className="text-gray-400">RAM:</span> {version.minimum_requirements.ram}
                        </div>
                        <div>
                          <span className="text-gray-400">Storage:</span> {version.minimum_requirements.storage}
                        </div>
                        <div>
                          <span className="text-gray-400">Processor:</span> {version.minimum_requirements.processor}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};