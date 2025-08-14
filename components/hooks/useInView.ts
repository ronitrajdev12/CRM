
import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
}

export const useInView = (options: UseInViewOptions = {}) => {
    const { triggerOnce = true, threshold = 0.1, root = null, rootMargin = '0px' } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // To prevent state updates after unmount
        let isMounted = true;
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!isMounted) return;

            // When triggerOnce is true, we only care about the first time it's intersecting.
            if (entry.isIntersecting) {
                setIsInView(true);
                if (triggerOnce) {
                    observer.disconnect(); // Disconnect entirely to be safe.
                }
            } else if (!triggerOnce) {
                // Only set to false if we're not in triggerOnce mode.
                setIsInView(false);
            }
        }, { root, rootMargin, threshold });

        observer.observe(element);

        return () => {
            isMounted = false;
            observer.disconnect();
        };
    }, [triggerOnce, root, rootMargin, threshold]);

    return { ref, isInView };
};
