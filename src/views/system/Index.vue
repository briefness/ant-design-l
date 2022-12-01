<template>
  <div>
    <div>这里就是菜单了</div>
    <div class="main">
      <header>这里就是头部了</header>
      <div class="content">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition mode="out-in">
              <KeepAlive>
                <Suspense>
                  <!-- 主要内容 -->
                  <component :is="Component" />

                  <!-- 加载中状态 -->
                  <template #fallback> 正在加载... </template>
                </Suspense>
              </KeepAlive>
            </Transition>
          </template>
        </RouterView>
      </div>
    </div>
  </div>
</template>
