<script setup>
import { ref, onMounted } from 'vue';
import { IconSun, IconMoon } from '@/shared/ui/icons';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

const updateTheme = () => {
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true;
    updateTheme();
  }
});
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :class="{ 'is-dark': isDark }"
    @click="toggleTheme"
    :aria-label="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
    :title="isDark ? 'Світла тема' : 'Темна тема'"
  >
    <div class="theme-toggle__icons">
      <IconSun v-if="isDark" class="theme-toggle__icon" />
      <IconMoon v-else class="theme-toggle__icon" />
    </div>
  </button>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.theme-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid #eeeeee;
  color: var(--color-black);
  cursor: pointer;
  transition: all 0.3s ease;

  @include hover {
    background-color: #f5f5f5;
    color: var(--color-orange);
    border-color: var(--color-orange);
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}

:global(.dark) .theme-toggle {
  border-color: #444;
  color: var(--color-white);

  @include hover {
    background-color: #333;
    color: var(--color-orange);
    border-color: var(--color-orange);
  }
}
</style>
