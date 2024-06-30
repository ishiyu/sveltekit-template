<script>
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

// Vercel SpeedInsight で計測できるようにする
injectSpeedInsights();
</script>

<div class="container mx-auto my-6 max-w-lg">
  <slot />
</div>
