<template>
  <nav class="navbar">
    <div class="navbar-content__wrapper">
      <router-link
        class="navbar-title"
        :to="{ name: 'home' }"
      >
        {{ appTitle }}
      </router-link>
      <div>
        <font-awesome-icon
          :icon="['far', 'bookmark']"
          size="lg"
        />
        <router-link :to="{ path: 'post/add' }">
          <font-awesome-icon
            :icon="['fas', 'plus']"
            size="lg" 
          />
          </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-header',

  data: () => ({
    appTitle: 'SenseHawk'
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 1rem;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
}

.navbar-content__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bolder;
}
</style>
