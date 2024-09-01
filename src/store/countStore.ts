import { create } from 'zustand';

// 상태와 액션에 대한 타입 정의
interface CounterState {
	count: number;
	inc: () => void;
	dec: () => void;
}

// Zustand 스토어 생성
export const useCounteStore = create<CounterState>((set) => ({
	count: 1,
	inc: () => set((state) => ({ count: state.count + 1 })),
	dec: () => set((state) => ({ count: state.count - 1 })),
}));
