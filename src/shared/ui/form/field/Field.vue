<script setup>
defineProps({
  title: String,
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  onChangeSearchInput: Function,
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="field" :class="{ 'field--search': type === 'search' }">
    <label :for="id" class="field__label">{{ title }}</label>
    <input
      :id="id"
      :type="type"
      @input="onChangeSearchInput"
      class="field__input"
      placeholder=" "
      autocomplete="off"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@helpers' as *;

.field {
  --field-color-label: var(--color-gray);
  --field-color-label-active: var(--color-orange);
  --field-color-border: var(--color-light);
  --field-color-active: var(--color-orange);
  --field-color-focus-bcg: var(--color-white);
  --field-search-icon: url('./icon-search_black.svg');

  position: relative;

  :global(.dark) & {
    --field-color-focus-bcg: #333333;
    --field-search-icon: url('./icon-search_white.svg');
  }

  &:has(.field__input:not(:placeholder-shown)) .field__label {
    // обращаемся к label только когда плейсхолдер не должен отображаться
    color: var(--field-color-label-active);
    scale: 0.7;
    translate: -30px -45px;
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 17px;
    color: var(--field-color-label);
    translate: 0 -50%;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  &__input {
    --field-input-padding-x: 16px;
    --field-search-input-icon-size: 16px;

    width: 100%;
    height: 50px;
    padding-inline: var(--field-input-padding-x);
    background-color: transparent;
    border: 1px solid var(--field-color-border);
    border-radius: 8px;
    color: var(--color-black);

    &:hover,
    &:focus {
      border-color: var(--field-color-active);
    }

    &:focus {
      background-color: var(--field-color-focus-bcg);
      outline: none;
    }

    &[type='search'] {
      &:placeholder-shown {
        padding-right: calc(var(--field-input-padding-x) * 2 + var(--field-search-input-icon-size));
      }
    }
  }

  // Search Icon via Mask
  &--search {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 16px;
      translate: 0 -50%;
      width: 16px;
      height: 16px;
      background-color: var(--color-gray);
      -webkit-mask-image: url('./icon-search_black.svg');
      mask-image: url('./icon-search_black.svg');
      -webkit-mask-size: contain;
      mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      pointer-events: none;
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
    }

    &:has(.field__input[type='search']:placeholder-shown)::after {
      opacity: 1;
      visibility: visible;
    }

    &:has(.field__input:focus)::after {
      background-color: var(--color-orange);
    }
  }
}
</style>
