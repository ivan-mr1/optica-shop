import { ref, onMounted, onBeforeUnmount } from 'vue';
import { bodyLock, bodyUnlock } from '@/shared/lib';

export function useHeader() {
  const isMenuOpen = ref(false);
  const isScrolled = ref(false);
  const headerRef = ref(null);

  let ticking = false;

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;

    if (isMenuOpen.value) {
      bodyLock();
      document.addEventListener('keydown', onEscapePress);
    } else {
      bodyUnlock();
      document.removeEventListener('keydown', onEscapePress);
    }
  };

  const closeMenu = () => {
    isMenuOpen.value = false;
    bodyUnlock();
    document.removeEventListener('keydown', onEscapePress);
  };

  const onEscapePress = (e) => {
    if (e.key === 'Escape') closeMenu();
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        isScrolled.value = currentScrollY > 0;

        ticking = false;
      });
      ticking = true;
    }
  };

  const setHeaderHeight = () => {
    const height = headerRef.value?.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', setHeaderHeight);
    setHeaderHeight();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', setHeaderHeight);
    document.removeEventListener('keydown', onEscapePress);
  });

  return {
    isMenuOpen,
    isScrolled,
    headerRef,
    toggleMenu,
    closeMenu,
  };
}
