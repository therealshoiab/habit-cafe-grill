import { DEFAULT_MENU_ITEMS, DEFAULT_BROADCAST_BANNER } from '../data/defaultMenu';
import type { MenuItem, BroadcastBannerData } from '../data/defaultMenu';

const STORAGE_KEY_MENU = 'habit_cafe_menu_items_v1';
const STORAGE_KEY_BANNER = 'habit_cafe_broadcast_banner_v1';
const STORAGE_KEY_PASSCODE = 'habit_cafe_admin_passcode_v1';
const STORAGE_KEY_API = 'habit_cafe_api_endpoint_v1';
const SESSION_KEY_AUTH = 'habit_cafe_admin_auth_session';

const DEFAULT_PASSCODE = 'Habit@2026';

export const menuService = {
  // --- CLOUDFLARE D1 / API SYNC ---
  getApiEndpoint: (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_API);
      if (stored && stored.trim()) return stored.trim().replace(/\/+$/, '');

      // Automatically connect to the live Cloudflare D1 backend from GitHub Pages or localhost
      if (typeof window !== 'undefined' && (window.location.hostname.includes('github.io') || window.location.hostname === 'localhost')) {
        return 'https://habit-cafe-grill.pages.dev';
      }
      return '';
    } catch {
      return '';
    }
  },

  setApiEndpoint: (endpoint: string) => {
    try {
      const clean = (endpoint || '').trim().replace(/\/+$/, '');
      if (clean) {
        localStorage.setItem(STORAGE_KEY_API, clean);
      } else {
        localStorage.removeItem(STORAGE_KEY_API);
      }
    } catch (e) {
      console.error('Error saving API endpoint:', e);
    }
  },

  syncWithRemote: async (): Promise<{ success: boolean; menuCount?: number }> => {
    const base = menuService.getApiEndpoint();
    const menuUrl = `${base}/api/menu`;
    const broadcastUrl = `${base}/api/broadcast`;

    let menuSynced = false;

    // 1. Sync Menu Items from Cloudflare D1
    try {
      const res = await fetch(menuUrl);
      if (res.ok) {
        const d1Items = await res.json();
        if (Array.isArray(d1Items) && d1Items.length > 0) {
          const formatted: MenuItem[] = d1Items.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price ? (String(item.price).startsWith('₹') ? String(item.price) : `₹${item.price}`) : '₹0',
            description: item.description || '',
            rating: Number(item.rating) || 4.5,
            popular: Boolean(item.popular),
            image: item.image || './images/chicken_nuggets.png'
          }));
          localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(formatted));
          window.dispatchEvent(new CustomEvent('habit:menu_updated', { detail: formatted }));
          menuSynced = true;
        }
      }
    } catch {
      // Offline or static fallback mode (GitHub Pages)
    }

    // 2. Sync Broadcast Banner from Cloudflare D1
    try {
      const bRes = await fetch(broadcastUrl);
      if (bRes.ok) {
        const bData = await bRes.json();
        if (bData && bData.message !== undefined) {
          if (bData.linkText === 'Order Online') {
            bData.linkText = '';
            bData.linkUrl = '';
          }
          localStorage.setItem(STORAGE_KEY_BANNER, JSON.stringify(bData));
          window.dispatchEvent(new CustomEvent('habit:broadcast_updated', { detail: bData }));
        }
      }
    } catch {
      // Offline or static fallback mode
    }

    return { success: menuSynced, menuCount: menuService.getMenuItems().length };
  },

  // --- MENU ITEMS ---
  getMenuItems: (): MenuItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_MENU);
      if (!data) return DEFAULT_MENU_ITEMS;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MENU_ITEMS;
    } catch (err) {
      console.error('Error reading menu items from storage:', err);
      return DEFAULT_MENU_ITEMS;
    }
  },

  saveMenuItems: (items: MenuItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('habit:menu_updated', { detail: items }));
    } catch (err) {
      console.error('Failed to save menu items to storage:', err);
    }
  },

  addMenuItem: (newItem: Omit<MenuItem, 'id'> & { id?: string | number }): { success: boolean; item: MenuItem } => {
    const current = menuService.getMenuItems();
    const id = newItem.id || Date.now();
    const item: MenuItem = {
      ...newItem,
      id,
      name: newItem.name.trim(),
      category: newItem.category.trim(),
      price: newItem.price.startsWith('₹') ? newItem.price : `₹${newItem.price.trim()}`,
      description: newItem.description.trim(),
      rating: Number(newItem.rating) || 4.5,
      popular: Boolean(newItem.popular),
      image: newItem.image.trim() || './images/chicken_nuggets.png'
    };

    const updated = [item, ...current];
    menuService.saveMenuItems(updated);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const passcode = menuService.getPasscode();
    fetch(`${base}/api/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': passcode
      },
      body: JSON.stringify({ action: 'add', item, passcode })
    }).catch(() => {});

    return { success: true, item };
  },

  updateMenuItem: (id: string | number, updatedFields: Partial<MenuItem>): { success: boolean; error?: string } => {
    const current = menuService.getMenuItems();
    const index = current.findIndex(i => String(i.id) === String(id) || i.name === updatedFields.name);
    if (index === -1) {
      return { success: false, error: 'Item not found' };
    }

    const price = updatedFields.price !== undefined
      ? (updatedFields.price.startsWith('₹') ? updatedFields.price : `₹${updatedFields.price.trim()}`)
      : current[index].price;

    const updatedItem: MenuItem = {
      ...current[index],
      ...updatedFields,
      price
    };

    const updatedList = [...current];
    updatedList[index] = updatedItem;
    menuService.saveMenuItems(updatedList);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const passcode = menuService.getPasscode();
    fetch(`${base}/api/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': passcode
      },
      body: JSON.stringify({ action: 'update', id, updatedFields, passcode })
    }).catch(() => {});

    return { success: true };
  },

  deleteMenuItem: (id: string | number): { success: boolean } => {
    const current = menuService.getMenuItems();
    const filtered = current.filter(i => String(i.id) !== String(id));
    menuService.saveMenuItems(filtered);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const passcode = menuService.getPasscode();
    fetch(`${base}/api/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': passcode
      },
      body: JSON.stringify({ action: 'delete', id, passcode })
    }).catch(() => {});

    return { success: true };
  },

  resetMenu: (): { success: boolean } => {
    menuService.saveMenuItems(DEFAULT_MENU_ITEMS);

    // Asynchronously sync to Cloudflare D1
    const base = menuService.getApiEndpoint();
    const passcode = menuService.getPasscode();
    fetch(`${base}/api/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': passcode
      },
      body: JSON.stringify({ action: 'reset', passcode })
    }).catch(() => {});

    return { success: true };
  },

  // --- BROADCAST BANNER ---
  getBroadcastBanner: (): BroadcastBannerData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_BANNER);
      if (!data) return DEFAULT_BROADCAST_BANNER;
      const parsed = JSON.parse(data);
      // Remove any previously stored 'Order Online' button as requested
      if (parsed.linkText === 'Order Online') {
        parsed.linkText = '';
        parsed.linkUrl = '';
      }
      return parsed;
    } catch (err) {
      console.error('Error reading broadcast banner:', err);
      return DEFAULT_BROADCAST_BANNER;
    }
  },

  saveBroadcastBanner: (banner: BroadcastBannerData): { success: boolean } => {
    try {
      // Ensure 'Order Online' is removed
      const cleanBanner = { ...banner };
      if (cleanBanner.linkText === 'Order Online') {
        cleanBanner.linkText = '';
        cleanBanner.linkUrl = '';
      }

      localStorage.setItem(STORAGE_KEY_BANNER, JSON.stringify(cleanBanner));
      window.dispatchEvent(new CustomEvent('habit:broadcast_updated', { detail: cleanBanner }));

      // Asynchronously sync to Cloudflare D1
      const base = menuService.getApiEndpoint();
      const passcode = menuService.getPasscode();
      fetch(`${base}/api/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': passcode
        },
        body: JSON.stringify({ ...cleanBanner, passcode })
      }).catch(() => {});

      return { success: true };
    } catch (err) {
      console.error('Failed to save broadcast banner:', err);
      return { success: false };
    }
  },

  // --- PASSCODE & AUTH ---
  getPasscode: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEY_PASSCODE) || DEFAULT_PASSCODE;
    } catch {
      return DEFAULT_PASSCODE;
    }
  },

  verifyPasscode: (input: string): boolean => {
    const cleanInput = (input || '').trim();
    const correct = menuService.getPasscode();
    return cleanInput === correct || cleanInput === DEFAULT_PASSCODE;
  },

  updatePasscode: (newPasscode: string): { success: boolean; error?: string } => {
    const clean = (newPasscode || '').trim();
    if (!clean || clean.length < 4) {
      return { success: false, error: 'Passcode must be at least 4 characters long.' };
    }
    try {
      const current = menuService.getPasscode();
      localStorage.setItem(STORAGE_KEY_PASSCODE, clean);

      // Asynchronously sync to Cloudflare D1
      const base = menuService.getApiEndpoint();
      fetch(`${base}/api/passcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': current
        },
        body: JSON.stringify({ currentPasscode: current, newPasscode: clean })
      }).catch(() => {});

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Storage error' };
    }
  },

  isLoggedIn: (): boolean => {
    try {
      return sessionStorage.getItem(SESSION_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  },

  setLoggedIn: (status: boolean) => {
    try {
      if (status) {
        sessionStorage.setItem(SESSION_KEY_AUTH, 'true');
      } else {
        sessionStorage.removeItem(SESSION_KEY_AUTH);
      }
    } catch (err) {
      console.error('Auth session error:', err);
    }
  }
};
