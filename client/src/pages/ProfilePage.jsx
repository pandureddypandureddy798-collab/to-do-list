import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    await updateProfile(profileForm);
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">Update your account and security information.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleProfileSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Account Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input value={profileForm.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={profileForm.email} onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
            </div>
            <button className="rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white">Save Profile</button>
          </div>
        </form>
        <form onSubmit={handlePasswordSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Change Password</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Current Password</label>
              <input type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">New Password</label>
              <input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-sky-500" />
            </div>
            <button className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
