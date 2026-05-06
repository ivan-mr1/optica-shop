<script setup>
import { ref, onMounted } from 'vue';
import ThemeToggler1 from '../theme-toggler/ThemeToggler1.vue';

const isDark = ref(false);

const toggleTheme = (val) => {
  isDark.value = val;
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
  <div class="theme-toggle-wrapper">
    <ThemeToggler1 :model-value="isDark" @update:model-value="toggleTheme" />
  </div>
</template>

<style scoped lang="scss">
.theme-toggle-wrapper {
  display: flex;
  align-items: center;
}
</style>
