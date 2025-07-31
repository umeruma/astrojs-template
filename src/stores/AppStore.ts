import { create } from 'zustand'

interface AppState {
  isDarkMode: boolean
}

export const useAppStore = create<AppState>((set, get) => ({
  isDarkMode: false,
}));

// export store functions for Astro components to call
const { getState, getInitialState, subscribe, setState } = useAppStore
export { getState, getInitialState, subscribe, setState }