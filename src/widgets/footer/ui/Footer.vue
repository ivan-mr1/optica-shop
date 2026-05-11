<script setup>
import Contacts from '@/shared/ui/contacts/Contacts.vue';
import headerBlock from '@/shared/ui/header-block';
import LangSelect from '@/shared/ui/lang-select';
import Social from '@/shared/ui/social/Social.vue';
import { useSliceI18n } from '@/shared/i18n';

import en from '../locales/en.json';
import ru from '../locales/ru.json';
import ua from '../locales/ua.json';

const { t } = useSliceI18n('footer', { en, ru, ua });
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer__container">
      <headerBlock custom-class="footer__header" :title="t('title')" :text="t('text')" />
      <div class="footer__wrapper">
        <Social base-class="footer__soc1al" />
        <LangSelect />
        <Contacts
          base-class="footer__contacts"
          :contacts="[
            { name: '+38(097) 450 18 22', tel: '+380974501822' },
            { name: '+38(066) 230 30 22', tel: '+380662303022' },
          ]"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.footer {
  @include adaptive-clamp('padding-top', 70, 25);
  @include adaptive-clamp('padding-bottom', 70, 25);

  &__header {
    &:not(:last-child) {
      margin-bottom: rem(25);
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: rem(25);

    @media (max-width: em(479)) {
      flex-direction: column;
    }
  }
}
</style>
