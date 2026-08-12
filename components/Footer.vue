<template>
  <footer>
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-column">
          <h4>Magazine</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Brand</h4>
          <ul>
            <li><a href="/page/about">About</a></li>
            <li><a href="/page/faq">FAQ</a></li>
            <li><a href="/page/contact-us">Contact</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/page/privacy-policy">Privacy Policy</a></li>
            <li><a href="/page/terms-conditions">Terms & Conditions</a></li>
            <li><a href="/page/cookie-policy">Cookie Policy</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Everything</h4>
          <p>
            A magazine-style archive of essays, people, languages and perspectives, arranged with context first.
          </p>
          <div class="footer-rainbow"></div>
        </div>
      </div>
      <div class="footer-divider">
        <div style="padding: 1rem 0; margin-bottom: 1rem;" v-html="hilltopadsScript"></div>
        <div class="mybid-banner">
          <div data-banner-id="2022021"></div>
        </div>
        <p class="footer-copyright">&copy; 2026 Everything in Perspective. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const hilltopadsScript = '<script async src="//untimely-hello.com/bWX/V/s.d/Gslj0mYdWIcS/keTma9Mu/Z/Uxl/kkPMT/chw/MyjGA/yKNFTfM/tbNFzBA-yPMpDlId1pN-wT" referrerpolicy="no-referrer-when-downgrade"><\/script>'
</script>

<style scoped>
.mybid-banner {
  margin: 1rem 0;
  text-align: center;
}
</style>
