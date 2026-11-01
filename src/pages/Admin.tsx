import React, { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { MENU_CATEGORIES } from '../data/defaultMenu';
import type { MenuItem, BroadcastBannerData } from '../data/defaultMenu';
import BrandLogo from '../components/BrandLogo';

interface AdminProps {
  setCurrentPage?: (page: string) => void;
}

export default function Admin({ setCurrentPage }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => menuService.isLoggedIn());
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'broadcast' | 'settings'>('manage');

  // Menu Items State
  const [items, setItems] = useState<MenuItem[]>(() => menuService.getMenuItems());
  const [categories, setCategories] = useState<string[]>(() => {
    const list = menuService.getMenuItems();
    const unique = Array.from(new Set(list.map(i => i.category))).filter(Boolean);
    return Array.from(new Set([...MENU_CATEGORIES.filter(c => c !== 'All'), ...unique]));
  });

  // Search & Filter in Manage Tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');

  // Add Item Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Starters',
    customCategory: '',
    price: '',
    description: '',
    rating: 4.5,
    popular: false,
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Broadcast Banner State
  const [bannerConfig, setBannerConfig] = useState<BroadcastBannerData>(() => menuService.getBroadcastBanner());
  const [bannerSuccess, setBannerSuccess] = useState('');

  // Settings State
  const [currentPasscodeInput, setCurrentPasscodeInput] = useState('');
  const [newPasscodeInput, setNewPasscodeInput] = useState('');
  const [confirmPasscodeInput, setConfirmPasscodeInput] = useState('');
  const [passcodeMessage, setPasscodeMessage] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [apiEndpointInput, setApiEndpointInput] = useState(() => menuService.getApiEndpoint());
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const refreshMenuData = () => {
    const currentItems = menuService.getMenuItems();
    setItems(currentItems);
    const unique = Array.from(new Set(currentItems.map(i => i.category))).filter(Boolean);
    setCategories(Array.from(new Set([...MENU_CATEGORIES.filter(c => c !== 'All'), ...unique])));
  };

  useEffect(() => {
    const handleMenuUpdate = () => refreshMenuData();
    const handleBannerUpdate = () => setBannerConfig(menuService.getBroadcastBanner());

    window.addEventListener('habit:menu_updated', handleMenuUpdate);
    window.addEventListener('habit:broadcast_updated', handleBannerUpdate);

    return () => {
      window.removeEventListener('habit:menu_updated', handleMenuUpdate);
      window.removeEventListener('habit:broadcast_updated', handleBannerUpdate);
    };
  }, []);

  // --- AUTHENTICATION ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (menuService.verifyPasscode(passcode)) {
      setIsAuthenticated(true);
      menuService.setLoggedIn(true);
      setLoginError('');
      setPasscode('');
    } else {
      setLoginError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    menuService.setLoggedIn(false);
    setPasscode('');
  };

  // --- ADD DISH HANDLERS ---
  const handleAddImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setFormError('Image size is too large (max 3MB). Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, image: result }));
        setImagePreview(result);
        setFormError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess('');
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Please enter a dish name.');
      return;
    }
    if (!formData.price.trim()) {
      setFormError('Please enter a price (e.g. ₹220 or 220).');
      return;
    }

    const finalCategory = formData.category === '__custom__' 
      ? (formData.customCategory.trim() || 'Specials')
      : formData.category;

    const res = menuService.addMenuItem({
      name: formData.name,
      category: finalCategory,
      price: formData.price,
      description: formData.description || 'Prepared fresh with high quality ingredients at The Habit Cafe & Grill.',
      rating: Number(formData.rating) || 4.5,
      popular: formData.popular,
      image: formData.image || './images/chicken_nuggets.png'
    });

    if (res.success) {
      setFormSuccess(`🎉 "${formData.name}" added to menu successfully!`);
      setFormData({
        name: '',
        category: 'Starters',
        customCategory: '',
        price: '',
        description: '',
        rating: 4.5,
        popular: false,
        image: ''
      });
      setImagePreview('');
      refreshMenuData();
      setTimeout(() => setFormSuccess(''), 4000);
    }
  };

  // --- MANAGE DISH HANDLERS ---
  const handleDeleteItem = (id: string | number, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      menuService.deleteMenuItem(id);
      refreshMenuData();
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingItem({ ...item });
    setEditImagePreview(item.image);
    setEditSuccess('');
  };

  const handleEditImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditingItem(prev => prev ? ({ ...prev, image: result }) : null);
        setEditImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    menuService.updateMenuItem(editingItem.id, editingItem);
    refreshMenuData();
    setEditSuccess('Changes saved successfully!');
    setTimeout(() => {
      setEditingItem(null);
      setEditSuccess('');
    }, 1200);
  };

  const handleResetMenu = () => {
    if (window.confirm('⚠️ Reset all menu items to original factory defaults? Any custom items you added will be restored to default.')) {
      menuService.resetMenu();
      refreshMenuData();
      alert('Menu restored to original default dishes.');
    }
  };

  // --- BROADCAST BANNER HANDLERS ---
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const res = menuService.saveBroadcastBanner(bannerConfig);
    if (res.success) {
      setBannerSuccess('Broadcast banner updated live on website!');
      setTimeout(() => setBannerSuccess(''), 3500);
    }
  };

  // --- SETTINGS / PASSCODE ---
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeMessage('');
    setPasscodeError('');

    if (!menuService.verifyPasscode(currentPasscodeInput)) {
      setPasscodeError('Current passcode is incorrect.');
      return;
    }
    if (newPasscodeInput.length < 4) {
      setPasscodeError('New passcode must be at least 4 characters long.');
      return;
    }
    if (newPasscodeInput !== confirmPasscodeInput) {
      setPasscodeError('New passcode and confirmation do not match.');
      return;
    }

    const res = menuService.updatePasscode(newPasscodeInput);
    if (res.success) {
      setPasscodeMessage('Admin passcode changed successfully! Remember your new passcode.');
      setCurrentPasscodeInput('');
      setNewPasscodeInput('');
      setConfirmPasscodeInput('');
      setTimeout(() => setPasscodeMessage(''), 4000);
    } else {
      setPasscodeError(res.error || 'Failed to update passcode.');
    }
  };

  // Filtered Items for Manage View
  const filteredManageItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilterCategory === 'All' || item.category === selectedFilterCategory;
    return matchesSearch && matchesCategory;
  });

  // --- 1. LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div 
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '6rem 1.5rem 3rem 1.5rem',
          backgroundColor: 'var(--bg-color)' 
        }}
      >
        <div 
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '460px',
            padding: '2.5rem',
            textAlign: 'center',
            borderRadius: '24px',
            boxShadow: 'var(--card-shadow)',
            border: '1.5px solid var(--border-color)'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <BrandLogo size={52} showText={false} />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.4rem' }}>
            The Habit Admin
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Owner & Manager Portal to manage dishes, prices, photos, and announcements.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.4rem' }}>
                Enter Admin Passcode
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPasscode ? 'text' : 'password'}
                  placeholder="Enter passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 3rem 0.85rem 1.25rem',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem'
                  }}
                  title={showPasscode ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPasscode ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {loginError && (
              <div 
                style={{ 
                  color: '#ff3b30', 
                  backgroundColor: 'rgba(255, 59, 48, 0.1)', 
                  padding: '0.65rem', 
                  borderRadius: '8px', 
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255, 59, 48, 0.2)'
                }}
              >
                {loginError}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div style={{ marginTop: '1.8rem' }}>
            <a 
              href="#/home" 
              style={{ fontSize: '0.85rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}
            >
              ← Return to Habit Cafe Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div style={{ padding: '7.5rem 0 5rem 0', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Top Header Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '1.5rem 2rem',
            borderRadius: '20px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            border: '1.5px solid var(--border-color)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <span style={{ color: 'var(--primary-color)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                ADMINISTRATOR PORTAL
              </span>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34c759' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Mode</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', margin: 0 }}>
              The Habit Cafe & Grill Manager
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a 
              href="#/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem', textTransform: 'none' }}
            >
              👁️ View Live Menu ↗
            </a>
            <button 
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 59, 48, 0.1)',
                color: '#ff3b30',
                border: '1px solid rgba(255, 59, 48, 0.25)',
                borderRadius: '25px',
                padding: '0.55rem 1.1rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.1)')}
            >
              Logout 🔒
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            marginBottom: '2rem', 
            overflowX: 'auto', 
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--border-color)' 
          }}
        >
          <button
            onClick={() => setActiveTab('manage')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px 12px 0 0',
              border: 'none',
              background: activeTab === 'manage' ? 'var(--primary-color)' : 'transparent',
              color: activeTab === 'manage' ? '#ffffff' : 'var(--text-color)',
              fontWeight: activeTab === 'manage' ? 700 : 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all var(--transition-fast)'
            }}
          >
            📋 Manage Dishes ({items.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px 12px 0 0',
              border: 'none',
              background: activeTab === 'add' ? 'var(--primary-color)' : 'transparent',
              color: activeTab === 'add' ? '#ffffff' : 'var(--text-color)',
              fontWeight: activeTab === 'add' ? 700 : 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all var(--transition-fast)'
            }}
          >
            ➕ Add New Dish
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px 12px 0 0',
              border: 'none',
              background: activeTab === 'broadcast' ? 'var(--primary-color)' : 'transparent',
              color: activeTab === 'broadcast' ? '#ffffff' : 'var(--text-color)',
              fontWeight: activeTab === 'broadcast' ? 700 : 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all var(--transition-fast)'
            }}
          >
            📢 Broadcast Banner {bannerConfig.enabled && '🟢'}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px 12px 0 0',
              border: 'none',
              background: activeTab === 'settings' ? 'var(--primary-color)' : 'transparent',
              color: activeTab === 'settings' ? '#ffffff' : 'var(--text-color)',
              fontWeight: activeTab === 'settings' ? 700 : 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all var(--transition-fast)'
            }}
          >
            ⚙️ Settings & Security
          </button>
        </div>

        {/* =========================================================================
            TAB 1: MANAGE DISHES
        ========================================================================= */}
        {activeTab === 'manage' && (
          <div>
            {/* Search & Actions Bar */}
            <div 
              className="glass-panel"
              style={{
                padding: '1.25rem 1.75rem',
                borderRadius: '16px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              {/* Search */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                <input 
                  type="text"
                  placeholder="Search dishes by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '25px',
                    backgroundColor: 'var(--surface-color)',
                    border: '1.5px solid var(--border-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Category Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category:</span>
                <select
                  value={selectedFilterCategory}
                  onChange={(e) => setSelectedFilterCategory(e.target.value)}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-color)',
                    border: '1.5px solid var(--border-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                >
                  <option value="All">All Categories ({items.length})</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat} ({items.filter(i => i.category === cat).length})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleResetMenu}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    padding: '0.55rem 0.9rem',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                  title="Restore original factory menu list"
                >
                  ↺ Reset Defaults
                </button>
              </div>
            </div>

            {/* Dishes Grid */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem' 
              }}
            >
              {filteredManageItems.map((dish) => (
                <div
                  key={dish.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid var(--border-color)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  {/* Photo Thumbnail */}
                  <div style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#1a1a1a' }}>
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = './images/chicken_nuggets.png';
                      }}
                    />
                    {dish.popular && (
                      <span 
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          left: '0.75rem',
                          background: 'var(--primary-color)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Popular
                      </span>
                    )}
                    <span 
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px'
                      }}
                    >
                      {dish.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.25rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', margin: 0 }}>
                        {dish.name}
                      </h3>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                        {dish.price}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', flexGrow: 1, marginBottom: '1rem' }}>
                      {dish.description}
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                      <button
                        onClick={() => handleEditClick(dish)}
                        style={{
                          flex: 1,
                          padding: '0.55rem',
                          background: 'var(--surface-color)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-heading)',
                          borderRadius: '8px',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--primary-color)';
                          e.currentTarget.style.color = 'var(--primary-color)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.color = 'var(--text-heading)';
                        }}
                      >
                        ✏️ Edit Dish
                      </button>

                      <button
                        onClick={() => handleDeleteItem(dish.id, dish.name)}
                        style={{
                          padding: '0.55rem 0.9rem',
                          background: 'rgba(255, 59, 48, 0.08)',
                          border: '1px solid rgba(255, 59, 48, 0.2)',
                          color: '#ff3b30',
                          borderRadius: '8px',
                          fontSize: '0.84rem',
                          cursor: 'pointer'
                        }}
                        title="Delete this dish"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredManageItems.length === 0 && (
              <div 
                className="glass-panel" 
                style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '16px', color: 'var(--text-muted)' }}
              >
                <h3>No dishes found</h3>
                <p>Try searching for a different name or category.</p>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: ADD NEW DISH
        ========================================================================= */}
        {activeTab === 'add' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'start' }} className="admin-grid-2">
            
            {/* Form */}
            <div 
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1.5px solid var(--border-color)'
              }}
            >
              <h2 style={{ fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Create & Publish New Dish
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
                Fill in the details below. Once published, this item will immediately appear in the customer menu.
              </p>

              {formSuccess && (
                <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'rgba(52, 199, 89, 0.12)', border: '1px solid #34c759', color: '#24963f', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 600 }}>
                  {formSuccess}
                </div>
              )}

              {formError && (
                <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'rgba(255, 59, 48, 0.12)', border: '1px solid #ff3b30', color: '#ff3b30', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 600 }}>
                  {formError}
                </div>
              )}

              <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                {/* Title & Price */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1rem' }} className="form-row-2">
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                      Dish Name *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Special Chicken Kanti Roll"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                      Price *
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. ₹240 or 240"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Menu Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box',
                      marginBottom: formData.category === '__custom__' ? '0.5rem' : '0'
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="__custom__">➕ Type Custom Category...</option>
                  </select>

                  {formData.category === '__custom__' && (
                    <input 
                      type="text"
                      placeholder="Enter new category name..."
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.95rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  )}
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Description
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Short description of taste, ingredients, or serving..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.92rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Photo Upload or URL */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Dish Photo (Upload File or Enter Image Path)
                  </label>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {/* File Upload Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.65rem 1.25rem',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(211, 29, 36, 0.08)',
                          border: '1.5px dashed var(--primary-color)',
                          color: 'var(--primary-color)',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          cursor: 'pointer'
                        }}
                      >
                        📁 Choose Image from Computer / Phone
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleAddImageFile}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>or paste path below:</span>
                    </div>

                    <input 
                      type="text"
                      placeholder="e.g. ./images/chicken_kanti.png or https://..."
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.88rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Popular Checkbox & Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                    <input 
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                    />
                    Mark as "Popular" Badge
                  </label>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rating:</span>
                    <input 
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 4.5 })}
                      style={{
                        width: '70px',
                        padding: '0.4rem 0.6rem',
                        borderRadius: '8px',
                        border: '1.5px solid var(--border-color)',
                        backgroundColor: 'var(--surface-color)',
                        color: 'var(--text-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                    <span style={{ color: '#d4af37' }}>★</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.9rem', marginTop: '1rem', width: '100%' }}
                >
                  🚀 Publish Dish to Live Menu
                </button>
              </form>
            </div>

            {/* Live Preview Card */}
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>👁️</span> Real-time Customer Preview
              </h3>

              <div 
                className="glass-panel food-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  textAlign: 'left',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#1a1a1a' }}>
                  <img 
                    src={imagePreview || formData.image || './images/chicken_nuggets.png'} 
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = './images/chicken_nuggets.png';
                    }}
                  />
                  {formData.popular && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'var(--primary-color)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '20px'
                      }}
                    >
                      Popular
                    </span>
                  )}
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      right: '0.75rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(4px)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px'
                    }}
                  >
                    ★ {formData.rating || 4.5}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', margin: 0 }}>
                      {formData.name || 'Dish Name Preview'}
                    </h4>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                      {formData.price.startsWith('₹') ? formData.price : (formData.price ? `₹${formData.price}` : '₹0')}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-color)', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
                    {formData.category === '__custom__' ? (formData.customCategory || 'Custom') : formData.category}
                  </span>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {formData.description || 'Dish description will appear here as you type in the form.'}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: 'auto' }}>
                    <div style={{ padding: '0.6rem', background: '#e23744', color: '#fff', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', fontWeight: 700 }}>
                      Zomato
                    </div>
                    <div style={{ padding: '0.6rem', background: '#fc8019', color: '#fff', borderRadius: '8px', fontSize: '0.8rem', textAlign: 'center', fontWeight: 700 }}>
                      Swiggy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: BROADCAST BANNER
        ========================================================================= */}
        {activeTab === 'broadcast' && (
          <div 
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: '20px',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1.5px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', margin: 0 }}>
                  Live Broadcast Banner
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Announce special discounts, festival offers, or cafe hours across the top of the entire website.
                </p>
              </div>

              {/* Status Switch */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '30px',
                  backgroundColor: bannerConfig.enabled ? 'rgba(52, 199, 89, 0.15)' : 'rgba(142, 142, 147, 0.15)',
                  border: `1.5px solid ${bannerConfig.enabled ? '#34c759' : '#8e8e93'}`
                }}
              >
                <input 
                  type="checkbox"
                  checked={bannerConfig.enabled}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, enabled: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#34c759' }}
                />
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: bannerConfig.enabled ? '#34c759' : 'var(--text-muted)' }}>
                  {bannerConfig.enabled ? 'Banner Active (Live)' : 'Banner Inactive (Hidden)'}
                </span>
              </label>
            </div>

            {bannerSuccess && (
              <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'rgba(52, 199, 89, 0.12)', border: '1px solid #34c759', color: '#24963f', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 600 }}>
                {bannerSuccess}
              </div>
            )}

            <form onSubmit={handleSaveBanner} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.4rem' }}>
                  Announcement Message *
                </label>
                <textarea 
                  rows={3}
                  placeholder="e.g. 🔥 Weekend Special: Flat 15% OFF on Momos & Grills! Dine-in & Delivery available. Call +91 70066 77631"
                  value={bannerConfig.message}
                  onChange={(e) => setBannerConfig({ ...bannerConfig, message: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    lineHeight: '1.5'
                  }}
                />
              </div>

              {/* Action Button Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row-2">
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.4rem' }}>
                    Button Text (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Call Now or View Deals (Leave blank for no button)"
                    value={bannerConfig.linkText || ''}
                    onChange={(e) => setBannerConfig({ ...bannerConfig, linkText: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.4rem' }}>
                    Button Link / URL (Optional)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. #/order, #/menu, or tel:+917006677631"
                    value={bannerConfig.linkUrl || ''}
                    onChange={(e) => setBannerConfig({ ...bannerConfig, linkUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Banner Color Style */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.5rem' }}>
                  Banner Color Theme
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'red', label: '🔥 Habit Brand Red', gradient: 'linear-gradient(90deg, #b0151a, #d31d24)' },
                    { id: 'gold', label: '✨ Royal Gold', gradient: 'linear-gradient(90deg, #9e6d20, #e5b757)' },
                    { id: 'dark', label: '🖤 Premium Dark Obsidian', gradient: 'linear-gradient(90deg, #111116, #262630)' }
                  ].map((thm) => (
                    <label 
                      key={thm.id}
                      style={{
                        padding: '0.65rem 1.25rem',
                        borderRadius: '12px',
                        background: thm.gradient,
                        color: thm.id === 'gold' ? '#0f0a07' : '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: bannerConfig.variant === thm.id ? '2.5px solid #ffffff' : '2.5px solid transparent',
                        boxShadow: bannerConfig.variant === thm.id ? '0 0 10px rgba(0,0,0,0.4)' : 'none'
                      }}
                    >
                      <input 
                        type="radio"
                        name="bannerVariant"
                        checked={bannerConfig.variant === thm.id}
                        onChange={() => setBannerConfig({ ...bannerConfig, variant: thm.id as any })}
                        style={{ accentColor: '#ffffff' }}
                      />
                      {thm.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Live Preview Box */}
              <div style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.5rem' }}>
                  Live Preview:
                </span>
                <div 
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    background: bannerConfig.variant === 'gold' 
                      ? 'linear-gradient(90deg, #9e6d20 0%, #e5b757 50%, #9e6d20 100%)' 
                      : bannerConfig.variant === 'dark' 
                      ? 'linear-gradient(90deg, #111116 0%, #262630 50%, #111116 100%)' 
                      : 'linear-gradient(90deg, #b0151a 0%, #d31d24 50%, #b0151a 100%)',
                    color: bannerConfig.variant === 'gold' ? '#0f0a07' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ padding: '0.15rem 0.5rem', background: 'rgba(0,0,0,0.25)', borderRadius: '15px', fontSize: '0.72rem', fontWeight: 800 }}>
                      📢 Announcement
                    </span>
                    <span>{bannerConfig.message || 'Announcement message preview...'}</span>
                  </div>
                  {bannerConfig.linkText && (
                    <span style={{ padding: '0.2rem 0.65rem', background: bannerConfig.variant === 'gold' ? '#000' : '#fff', color: bannerConfig.variant === 'gold' ? '#fff' : '#d31d24', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {bannerConfig.linkText}
                    </span>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.9rem', marginTop: '1rem' }}
              >
                💾 Save Broadcast Banner Live
              </button>
            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SETTINGS & SECURITY
        ========================================================================= */}
        {activeTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Cloudflare D1 Real-Time Sync Status */}
            <div 
              className="glass-panel"
              style={{
                padding: '2rem 2.5rem',
                borderRadius: '20px',
                border: '1.5px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                    ⚡ Cloudflare D1 Real-Time Database Sync
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Ensures menu updates, dish photos, prices, and announcements sync globally across all customers' phones and computers in real time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setSyncLoading(true);
                    const res = await menuService.syncWithRemote();
                    setSyncLoading(false);
                    if (res.success) {
                      setSyncMessage(`✅ Synced live with Cloudflare D1 (${res.menuCount} dishes active).`);
                    } else {
                      setSyncMessage('ℹ️ Local cache active. Cloudflare D1 Pages Functions (/api/menu) ready.');
                    }
                    setTimeout(() => setSyncMessage(''), 5000);
                  }}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                  disabled={syncLoading}
                >
                  {syncLoading ? 'Syncing...' : '🔄 Sync with D1 Database'}
                </button>
              </div>

              {syncMessage && (
                <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'rgba(52, 199, 89, 0.12)', border: '1px solid #34c759', color: '#24963f', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600 }}>
                  {syncMessage}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  Custom Cloudflare Worker / API Endpoint (Optional)
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input 
                    type="text"
                    placeholder="Leave blank for automatic /api/menu on Cloudflare Pages, or enter Worker URL..."
                    value={apiEndpointInput}
                    onChange={(e) => setApiEndpointInput(e.target.value)}
                    style={{
                      flexGrow: 1,
                      minWidth: '280px',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      menuService.setApiEndpoint(apiEndpointInput);
                      setSyncMessage('Endpoint saved. Attempting sync...');
                      menuService.syncWithRemote();
                      setTimeout(() => setSyncMessage(''), 4000);
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    Save Endpoint
                  </button>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Auto-configured: Cloudflare Pages automatically links <code>/api/menu</code> and <code>/api/broadcast</code> directly to your D1 database.
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="admin-grid-2">
            
            {/* Change Passcode */}
            <div 
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1.5px solid var(--border-color)'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                Change Admin Passcode
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Update the secret passcode used to access this management dashboard.
              </p>

              {passcodeMessage && (
                <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'rgba(52, 199, 89, 0.12)', border: '1px solid #34c759', color: '#24963f', borderRadius: '10px', marginBottom: '1.25rem', fontWeight: 600 }}>
                  {passcodeMessage}
                </div>
              )}

              {passcodeError && (
                <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'rgba(255, 59, 48, 0.12)', border: '1px solid #ff3b30', color: '#ff3b30', borderRadius: '10px', marginBottom: '1.25rem', fontWeight: 600 }}>
                  {passcodeError}
                </div>
              )}

              <form onSubmit={handleChangePasscode} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Current Passcode
                  </label>
                  <input 
                    type="password"
                    placeholder="Enter current passcode..."
                    value={currentPasscodeInput}
                    onChange={(e) => setCurrentPasscodeInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    New Passcode (min 4 characters)
                  </label>
                  <input 
                    type="password"
                    placeholder="Enter new passcode..."
                    value={newPasscodeInput}
                    onChange={(e) => setNewPasscodeInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Confirm New Passcode
                  </label>
                  <input 
                    type="password"
                    placeholder="Re-type new passcode..."
                    value={confirmPasscodeInput}
                    onChange={(e) => setConfirmPasscodeInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.85rem', marginTop: '0.5rem' }}
                >
                  Update Passcode 🔐
                </button>
              </form>
            </div>

            {/* Menu Backup & Information */}
            <div 
              className="glass-panel"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1.5px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                  Menu Data Backup & Export
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Download your entire current menu as a JSON backup file, or export it to share with staff.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `habit_cafe_menu_backup_${new Date().toISOString().slice(0, 10)}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '0.8rem', width: '100%' }}
                >
                  📥 Export Menu Backup (JSON)
                </button>

                <button
                  onClick={handleResetMenu}
                  style={{
                    padding: '0.8rem',
                    background: 'rgba(255, 59, 48, 0.08)',
                    border: '1px solid rgba(255, 59, 48, 0.25)',
                    color: '#ff3b30',
                    borderRadius: '30px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem'
                  }}
                >
                  ⚠️ Reset All Dishes to Factory Defaults
                </button>
              </div>

              <div 
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(211, 29, 36, 0.05)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  marginTop: 'auto'
                }}
              >
                <strong>💡 Quick Tip for the Owner:</strong>
                <p style={{ margin: '0.4rem 0 0 0' }}>
                  Any dish you edit or photo you upload is instantly saved and rendered live on your website. When you are on your smartphone, you can snap a photo of any fresh plate and upload it right here!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* =========================================================================
          MODAL: EDIT DISH
      ========================================================================= */}
      {editingItem && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingItem(null);
          }}
        >
          <div 
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '2rem',
              backgroundColor: 'var(--surface-color)',
              border: '1.5px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)', margin: 0 }}>
                Edit Dish: {editingItem.name}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.4rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {editSuccess && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(52, 199, 89, 0.15)', color: '#24963f', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600 }}>
                {editSuccess}
              </div>
            )}

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '1rem' }} className="form-row-2">
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Dish Name
                  </label>
                  <input 
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                    Price
                  </label>
                  <input 
                    type="text"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-color)',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box'
                  }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                  Description
                </label>
                <textarea 
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.92rem',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Edit Photo */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                  Update Photo (Upload File or Edit URL)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <img 
                    src={editImagePreview || editingItem.image}
                    alt="Dish thumbnail"
                    style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                  />
                  <label 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(211, 29, 36, 0.08)',
                      border: '1.5px dashed var(--primary-color)',
                      color: 'var(--primary-color)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    📁 Upload New Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleEditImageFile}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <input 
                  type="text"
                  placeholder="Image path or URL..."
                  value={editingItem.image}
                  onChange={(e) => {
                    setEditingItem({ ...editingItem, image: e.target.value });
                    setEditImagePreview(e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--surface-color)',
                    color: 'var(--text-color)',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Popular Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                <input 
                  type="checkbox"
                  checked={Boolean(editingItem.popular)}
                  onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                />
                Mark as "Popular" Badge
              </label>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    background: 'transparent',
                    border: '1.5px solid var(--border-color)',
                    color: 'var(--text-color)',
                    borderRadius: '25px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.85rem' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled Responsive Classes */}
      <style>{`
        @media (max-width: 860px) {
          .admin-grid-2 {
            grid-template-columns: 1fr !important;
          }
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
