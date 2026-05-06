<script setup>
import { RouterView } from 'vue-router';
import { useCartStore } from '@/entities/cart';
import Drawer from '@/widgets/drawer';
import Header from '@/widgets/header';
import Footer from '@/widgets/footer';
import ScrollUpButton from '@/shared/ui/ScrollUpButton';
import { usePageNavigation } from '@/shared/lib/usePageNavigation';
import './styles/main.scss';

const cartStore = useCartStore();
usePageNavigation();
</script>

<template>
  <div class="wrapper">
    <Header />
    <main class="page">
      <RouterView />
    </main>
    <Footer />
    <Drawer :is-active="cartStore.isDrawerOpen" />
    <ScrollUpButton />
  </div>
</template>
