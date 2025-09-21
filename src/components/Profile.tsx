import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';


const Profile: React.FC = () => {
  const { account, isConnected } = useWeb3();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    mobile: '',
    is_verified: false
  });
  const [tempProfile, setTempProfile] = useState({
    name: '',
    mobile: '',
    is_verified: false
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update temp profile when user data changes
  useEffect(() => {
    if (account) {
      // Load profile from localStorage
      const savedProfile = localStorage.getItem(`profile_${account}`);
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setProfile(profileData);
        setTempProfile(profileData);
      }
    }
  }, [account]);

  useEffect(() => {
    if (profile) {
      setTempProfile({
        name: profile.name || '',
        mobile: profile.mobile || '',
        is_verified: profile.is_verified || false
      });
    }
  }, [profile]);

  const handleEdit = () => {
    if (profile) {
      setTempProfile({
        name: profile.name || '',
        mobile: profile.mobile || '',
        is_verified: profile.is_verified || false
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (profile) {
      setTempProfile({
        name: profile.name || '',
        mobile: profile.mobile || '',
        is_verified: profile.is_verified || false
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!tempProfile.name.trim()) {
      alert('Name is required');
      return;
    }

    setIsSaving(true);
    
    try {
      const updatedProfile = {
        name: tempProfile.name.trim(),
        mobile: tempProfile.mobile.trim(),
        is_verified: tempProfile.mobile.length >= 10 // Simple verification logic
      };
      
      // Save to localStorage
      if (account) {
        localStorage.setItem(`profile_${account}`, JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
      }
      
      setIsEditing(false);
    } catch (err: any) {
      alert('Error saving profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isConnected) {
    return (
      <div className="profile-container">
        <div className="profile-not-connected">
          <div className="not-connected-icon">🔒</div>
          <h3>Wallet Not Connected</h3>
          <p>Please connect your wallet to access profile settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <div className="profile-info">
          <h2>Your Profile</h2>
          <p className="wallet-address">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </p>
        </div>
        {profile?.is_verified && (
          <div className="verification-badge">
            <span className="verified-icon">✅</span>
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <div className="profile-form-card">
        <div className="form-header">
          <h3>Personal Information</h3>
          {!isEditing && (
            <button className="edit-btn" onClick={handleEdit}>
              <span>✏️</span>
              Edit
            </button>
          )}
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="name">
              Full Name <span className="required">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                value={tempProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="profile-input"
              />
            ) : (
              <div className="profile-display">
                {profile?.name || 'Not provided'}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">
              Mobile Number <span className="optional">(Optional)</span>
            </label>
            {isEditing ? (
              <input
                type="tel"
                id="mobile"
                value={tempProfile.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                placeholder="Enter your mobile number"
                className="profile-input"
              />
            ) : (
              <div className="profile-display">
                {profile?.mobile || 'Not provided'}
              </div>
            )}
            {profile?.mobile && profile?.is_verified && (
              <div className="verification-status">
                <span className="verified-text">✅ Verified</span>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="form-actions">
              <button 
                className="cancel-btn" 
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                className="save-btn" 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Benefits */}
      <div className="profile-benefits-card">
        <h3>Profile Benefits</h3>
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-icon">🎯</span>
            <div className="benefit-content">
              <h4>Better P2P Trading</h4>
              <p>Complete profile increases trust with other traders</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🛡️</span>
            <div className="benefit-content">
              <h4>Verified Status</h4>
              <p>Mobile verification gives you verified trader badge</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⭐</span>
            <div className="benefit-content">
              <h4>Higher Trust Score</h4>
              <p>Complete profiles get better visibility in ads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Stats */}
      <div className="trading-stats-card">
        <h3>Trading Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Total Trades</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Active Ads</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">New</div>
            <div className="stat-label">Trader Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;