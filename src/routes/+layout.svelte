<script>
  import { localStorage } from '$lib/client/stores/localStorage';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { onMount } from 'svelte';

  // Vercel SpeedInsight で計測できるようにする
  injectSpeedInsights();

  onMount(() => {
    localStorage.load();
  });
</script>

<div class="container mx-auto my-6 max-w-lg">
  <slot />
</div>
