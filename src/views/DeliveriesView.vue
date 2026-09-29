<template>
  <div class="deliveries-page">
    <div class="page-header">
      <h1>Istoric Livrări și AWB-uri</h1>
    </div>

    <div class="deliveries-list">
      <div class="delivery-card" v-for="item in deliveries" :key="item.id">
        <div class="delivery-details">
          <h3>Schimb: {{ item.bookTitle }}</h3>
          <p><strong>Curier:</strong> {{ item.courier }}</p>
          <p><strong>AWB:</strong> <span class="awb-code">{{ item.awb }}</span></p>
          <p><strong>Adresă:</strong> {{ item.address }}</p>
        </div>
        <div class="delivery-status-box">
          <span class="status-pill">{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/assets/js/deliveries.js"></script>
<style src="@/assets/css/deliveries.css"></style>