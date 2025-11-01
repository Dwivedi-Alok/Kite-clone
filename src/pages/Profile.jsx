import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const fetchProfileData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'XYZ',
        avatarUrl: 'https://placehold.co/100x100/E0E7FF/4F46E5?text=AK',
        supportCode: 'ABCD12',
        email: '******@gmail.com',
        pan: '*324E',
        phone: '*004',
        demat: '120816686398',
        segments: 'BSE, NSE, MF',
        bank: '*500S HDFC BANK LTD',
      });
    }, 1000);
  });
};

const ProfileSection = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-xl font-medium text-gray-800 mb-6">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const ProfileField = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfileData().then(data => {
      setProfile(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <img src={profile.avatarUrl} alt="Profile" className="w-24 h-24 rounded-full border-2 border-blue-500 p-1" />
        <div>
          <h1 className="text-3xl font-medium text-gray-800">{profile.name}</h1>
          <button className="text-sm text-blue-600 hover:underline mt-1">Change photo</button>
        </div>
      </div>

      {/* Account Details */}
      <ProfileSection title="Account">
        <ProfileField label="Support code" value={profile.supportCode} />
        <ProfileField label="E-mail" value={profile.email} />
        <ProfileField label="PAN" value={profile.pan} />
        <ProfileField label="Phone" value={profile.phone} />
        <ProfileField label="Demat (BO)" value={profile.demat} />
        <ProfileField label="Segments" value={profile.segments} />
        <ProfileField label="Demat authorisation" value="eDIS" />
      </ProfileSection>

      {/* Bank Accounts */}
      <ProfileSection title="Bank accounts">
        <ProfileField label="HDFC BANK LTD" value={profile.bank} />
      </ProfileSection>

       {/* Settings */}
      <ProfileSection title="Settings">
         <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Chart</span>
            <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" name="chart" defaultChecked className="form-radio text-blue-600" />
                    <span>ChartIQ</span>
                </label>
                 <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" name="chart" className="form-radio text-blue-600" />
                    <span>TradingView</span>
                </label>
            </div>
        </div>
         <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Theme</span>
            <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" name="theme" defaultChecked className="form-radio text-blue-600" />
                    <span>Default</span>
                </label>
                 <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" name="theme" className="form-radio text-blue-600" />
                    <span>Dark</span>
                </label>
            </div>
        </div>
      </ProfileSection>
    </div>
  );
};

export default Profile;

