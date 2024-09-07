import { useEffect, useState, useRef, MutableRefObject } from 'react';

type IntersectionObserverCallback = () => void;

interface IntersectionObserverOptions {
	root?: Element | null;
	rootMargin?: string; // root와의 마진 설정 (ex: '10px 20px')
	threshold?: number | number[]; // 요소가 어느 정도 보일 때 콜백이 실행될지 설정 (0~1)
}

export const useIntersectionObserver = (
	callback: IntersectionObserverCallback,
	options: IntersectionObserverOptions,
) => {
	const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
	const targetRef: MutableRefObject<HTMLLIElement | null> = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
			if (entry.isIntersecting) {
				callback();
			}
		}, options);

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => {
			if (targetRef.current) {
				observer.unobserve(targetRef.current);
			}
		};
	}, [callback, options]);

	return { targetRef, isIntersecting };
};
