import { DEFAULT_MENU_ITEMS, DEFAULT_BROADCAST_BANNER } from '../data/defaultMenu';
import type { MenuItem, BroadcastBannerData } from '../data/defaultMenu';

const STORAGE_KEY_MENU = 'habit_cafe_menu_items_v1';
const STORAGE_KEY_BANNER = 'habit_cafe_broadcast_banner_v1';
const STORAGE_KEY_PASSCODE = 'habit_cafe_admin_passcode_v1';
const SESSION_KEY_AUTH = 'habit_cafe_admin_auth_session';

const DEFAULT_PASSCODE = 'Habit@2026';

export const menuService = {
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
    return { success: true };
  },

  deleteMenuItem: (id: string | number): { success: boolean } => {
    const current = menuService.getMenuItems();
    const filtered = current.filter(i => String(i.id) !== String(id));
    menuService.saveMenuItems(filtered);
    return { success: true };
  },

  resetMenu: (): { success: boolean } => {
    menuService.saveMenuItems(DEFAULT_MENU_ITEMS);
    return { success: true };
  },

  // --- BROADCAST BANNER ---
  getBroadcastBanner: (): BroadcastBannerData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_BANNER);
      if (!data) return DEFAULT_BROADCAST_BANNER;
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading broadcast banner:', err);
      return DEFAULT_BROADCAST_BANNER;
    }
  },

  saveBroadcastBanner: (banner: BroadcastBannerData): { success: boolean } => {
    try {
      localStorage.setItem(STORAGE_KEY_BANNER, JSON.stringify(banner));
      window.dispatchEvent(new CustomEvent('habit:broadcast_updated', { detail: banner }));
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
      localStorage.setItem(STORAGE_KEY_PASSCODE, clean);
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
