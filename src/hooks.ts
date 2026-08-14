import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Car } from '@/lib/types';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setCars((data ?? []) as Car[]);
      }
      setLoading(false);
    })();
  }, []);

  return { cars, loading, error };
}

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
}

export function useFilter() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('all');
  const [bodyType, setBodyType] = useState('all');
  const [fuelType, setFuelType] = useState('all');
  const [condition, setCondition] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sortBy, setSortBy] = useState('featured');

  const reset = useCallback(() => {
    setSearch('');
    setBrand('all');
    setBodyType('all');
    setFuelType('all');
    setCondition('all');
    setPriceRange([0, 5000000]);
    setSortBy('featured');
  }, []);

  return { search, setSearch, brand, setBrand, bodyType, setBodyType, fuelType, setFuelType, condition, setCondition, priceRange, setPriceRange, sortBy, setSortBy, reset };
}
