// src/pages/EditProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiInfo,
  FiMapPin,
  FiEdit3,
  FiCamera,
  FiPhone,
  FiHome,
  FiMap,
  FiHash,
  FiGlobe,
} from "react-icons/fi";

import SaveCancelButtons from "../components/SaveCancelBtn";
import { Input } from "../components/Input";

function EditProfile() {
  const [editMode, setEditMode] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState({});

  const [profile, setProfile] = useState({
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff&size=128",
    username: "johndoe",
    email: "john.doe@example.com",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "9876543210",
  });

  const [address, setAddress] = useState({
    street: "123 Main St",
    city: "Chennai",
    state: "Tamil Nadu",
    zip: "600001",
    country: "India",
  });

  const navigate = useNavigate();

  const tabs = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "personal", label: "Personal Info", icon: FiInfo },
    { id: "address", label: "Address", icon: FiMapPin },
  ];

  const toggleEditMode = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (section, field, value) => {
    if (section === "profile") {
      setProfile((prev) => ({ ...prev, [field]: value }));
    } else if (section === "personal") {
      setPersonalInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "address") {
      setAddress((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleSectionSave = async (section) => {
    setIsSaving((prev) => ({ ...prev, [section]: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving((prev) => ({ ...prev, [section]: false }));
    setEditMode((prev) => ({ ...prev, [section]: false }));
    alert(
      `${
        section.charAt(0).toUpperCase() + section.slice(1)
      } saved successfully! ✅`
    );
  };

  const handleSectionCancel = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  const renderFieldCard = (icon, label, value, className = "") => (
    <div
      className={`p-4 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm 
      border border-white/30 dark:border-gray-600 rounded-xl shadow-md 
      hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg dark:from-blue-900 dark:to-indigo-900">
          <div className="w-5 h-5 text-blue-600 dark:text-blue-400">{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-0.5 text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  const renderSectionView = (sectionKey) => {
    const isEditing = editMode[sectionKey];
    const saving = isSaving[sectionKey];

    switch (sectionKey) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-blue-100/50 dark:ring-blue-900/70"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 p-2 rounded-full shadow-xl border-4 border-white dark:border-gray-900 transition-all duration-200 cursor-pointer group"
                >
                  <FiCamera className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  {profile.username}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {isEditing ? (
                <SaveCancelButtons
                  onSave={() => handleSectionSave("profile")}
                  onCancel={() => handleSectionCancel("profile")}
                  isLoading={saving}
                />
              ) : (
                <button
                  onClick={() => toggleEditMode("profile")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 
                  text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-medium shadow-md text-sm"
                >
                  <FiEdit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-700/70 dark:to-blue-900/70 rounded-2xl backdrop-blur-sm">
                <Input
                  label="Username"
                  id="username"
                  type="text"
                  value={profile.username}
                  onChange={(e) =>
                    handleInputChange("profile", "username", e.target.value)
                  }
                  icon={<FiUser className="w-5 h-5 text-gray-400" />}
                />
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    handleInputChange("profile", "email", e.target.value)
                  }
                  icon={<FiUser className="w-5 h-5 text-gray-400" />}
                />
              </div>
            )}
          </div>
        );

      case "personal":
        return (
          <div className="space-y-6">
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFieldCard(
                  <FiUser />,
                  "First Name",
                  personalInfo.firstName
                )}
                {renderFieldCard(
                  <FiUser />,
                  "Last Name",
                  personalInfo.lastName
                )}
                {renderFieldCard(
                  <FiPhone />,
                  "Phone Number",
                  personalInfo.phone,
                  "md:col-span-2"
                )}
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-700/70 dark:to-blue-900/70 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    id="firstName"
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      handleInputChange("personal", "firstName", e.target.value)
                    }
                    icon={<FiUser className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Last Name"
                    id="lastName"
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      handleInputChange("personal", "lastName", e.target.value)
                    }
                    icon={<FiUser className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Phone Number"
                    id="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      handleInputChange("personal", "phone", e.target.value)
                    }
                    icon={<FiPhone className="w-5 h-5 text-gray-400" />}
                    className="md:col-span-2"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              {isEditing ? (
                <SaveCancelButtons
                  onSave={() => handleSectionSave("personal")}
                  onCancel={() => handleSectionCancel("personal")}
                  isLoading={saving}
                />
              ) : (
                <button
                  onClick={() => toggleEditMode("personal")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
                >
                  <FiEdit3 />
                  <span>Edit Personal Info</span>
                </button>
              )}
            </div>
          </div>
        );

      case "address":
        return (
          <div className="space-y-6">
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFieldCard(<FiHome />, "Street", address.street)}
                {renderFieldCard(<FiMapPin />, "City", address.city)}
                {renderFieldCard(<FiMap />, "State", address.state)}
                {renderFieldCard(<FiHash />, "ZIP Code", address.zip)}
                {renderFieldCard(
                  <FiGlobe />,
                  "Country",
                  address.country,
                  "md:col-span-2"
                )}
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-700/70 dark:to-blue-900/70 rounded-xl">
                <Input
                  label="Street"
                  id="street"
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    handleInputChange("address", "street", e.target.value)
                  }
                  icon={<FiHome className="w-5 h-5 text-gray-400" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="City"
                    id="city"
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      handleInputChange("address", "city", e.target.value)
                    }
                    icon={<FiMapPin className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="State"
                    id="state"
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      handleInputChange("address", "state", e.target.value)
                    }
                    icon={<FiMap className="w-5 h-5 text-gray-400" />}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="ZIP Code"
                    id="zip"
                    type="text"
                    value={address.zip}
                    onChange={(e) =>
                      handleInputChange("address", "zip", e.target.value)
                    }
                    icon={<FiHash className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Country"
                    id="country"
                    type="text"
                    value={address.country}
                    onChange={(e) =>
                      handleInputChange("address", "country", e.target.value)
                    }
                    icon={<FiGlobe className="w-5 h-5 text-gray-400" />}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              {isEditing ? (
                <SaveCancelButtons
                  onSave={() => handleSectionSave("address")}
                  onCancel={() => handleSectionCancel("address")}
                  isLoading={saving}
                />
              ) : (
                <button
                  onClick={() => toggleEditMode("address")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl"
                >
                  <FiEdit3 />
                  <span>Edit Address</span>
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Edit Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          View and update your personal information
        </p>

        {/* Tabs */}
        <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-lg border p-4 mb-6">
          <div className="flex border-b -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                    isActive
                      ? "text-blue-600 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/60 dark:bg-gray-800/60 p-6 rounded-2xl shadow-xl border">
          <div className="max-w-2xl mx-auto">
            {renderSectionView(activeTab)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
