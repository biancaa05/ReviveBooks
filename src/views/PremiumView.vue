<template>
  <div class="premium-page">
    <div class="premium-hero">
      <h1>✨ ReviveBooks Premium</h1>
      <p>Deblochează avantaje exclusive și scoate cărțile în evidență!</p>
    </div>

    <div class="premium-cards-grid">
      <div class="premium-card">
        <h3>Standard</h3>
        <p class="price">Gratuit</p>
        <ul>
          <li>✔ Schimburi nelimitate de cărți</li>
          <li>✔ Acces la chat și mesagerie</li>
          <li>✖ Vizibilitate prioritară</li>
        </ul>
        <button class="vinted-btn-outline" disabled>Planul tău actual</button>
      </div>

      <div class="premium-card featured">
        <div class="badge-popular">Cel mai popular</div>
        <h3>PRO Vinted Reader</h3>
        <p class="price">19.99 RON <span>/ lună</span></p>
        <ul>
          <li>✔ Cărți promovate în Top pagină</li>
          <li>✔ Fără reclame</li>
          <li>✔ Badge exclusiv PRO pe profil</li>
          <li>✔ Suport prioritar la curierat</li>
        </ul>
        <button class="vinted-btn-primary" @click="upgradePlan">Treci la PRO</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PremiumView',
  methods: {
    upgradePlan() {
      alert('Felicitări! Ești acum membru PRO pe ReviveBooks.');
    }
  }
}
</script>

<style src="@/assets/css/premium.css"></style>