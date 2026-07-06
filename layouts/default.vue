<template>
  <slot />
</template>

<style>
  :root {
    --stone-50: #FAFAF9;
    --stone-100: #F5F5F0;
    --stone-200: #E7E5E0;
    --stone-300: #D9D3CA;
    --stone-400: #A8A09F;
    --stone-500: #78746F;
    --stone-600: #5A5652;
    --stone-700: #3D3935;
    --stone-800: #2A2824;
    --stone-900: #1A1814;
    --rainbow-red: #E63946;
    --rainbow-orange: #F77F00;
    --rainbow-yellow: #FCBF49;
    --rainbow-green: #06A77D;
    --rainbow-blue: #1B7AA1;
    --rainbow-indigo: #4B4BA8;
    --rainbow-violet: #9D4EDD;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--stone-50);
    color: var(--stone-900);
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: Georgia, Garamond, serif;
    font-weight: 400;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.875rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 400;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  a {
    color: var(--stone-900);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Header */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: var(--stone-50);
    border-bottom: 1px solid var(--stone-200);
  }

  .header-content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .header-branding {
    flex: 1;
  }

  .header-branding h1 {
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }

  .header-tagline {
    font-size: 0.875rem;
    color: var(--stone-600);
    margin-top: 0.5rem;
  }

  /* Desktop Navigation */
  nav.nav-desktop {
    display: none;
    gap: 2rem;
    font-size: 0.875rem;
    margin-left: 3rem;
    align-items: center;
  }

  nav.nav-desktop a {
    color: var(--stone-900);
    transition: color 0.3s ease;
  }

  nav.nav-desktop a:hover {
    color: var(--rainbow-blue);
    text-decoration: underline;
  }

  /* Mobile menu toggle */
  .nav-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--stone-900);
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.3s ease;
  }

  .nav-toggle:hover {
    color: var(--rainbow-blue);
  }

  /* Mobile Navigation Drawer */
  nav.nav-drawer {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 320px;
    height: 100vh;
    background-color: var(--stone-900);
    color: var(--stone-50);
    padding: 1.5rem;
    overflow-y: auto;
    z-index: 40;
  }

  nav.nav-drawer.active {
    display: block;
  }

  .nav-drawer-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--stone-50);
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0.5rem;
  }

  .nav-drawer-close:hover {
    color: var(--rainbow-yellow);
  }

  .nav-drawer-content {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .nav-drawer a {
    color: var(--stone-50);
    font-size: 1.125rem;
    font-family: Georgia, Garamond, serif;
    display: block;
    transition: color 0.3s ease;
  }

  .nav-drawer a:hover {
    color: var(--rainbow-yellow);
  }

  .nav-drawer-divider {
    border-top: 1px solid var(--stone-700);
    padding-top: 1.5rem;
    margin-top: 1.5rem;
  }

  .nav-drawer-divider a {
    font-size: 0.875rem;
    color: var(--stone-300);
    margin-bottom: 1rem;
  }

  .nav-drawer-divider a:hover {
    color: var(--stone-50);
  }

  /* Main content */
  main {
    max-width: 1440px;
    margin: 0 auto;
    padding: 3rem 1rem;
  }

  /* Hero Section */
  .hero {
    margin-bottom: 3rem;
  }

  .hero-text {
    margin-bottom: 3rem;
  }

  .hero-text h1 {
    font-size: 3.75rem;
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .hero-text p {
    font-size: 1.125rem;
    color: var(--stone-600);
    max-width: 42rem;
    line-height: 1.7;
  }

  .rainbow-bar {
    height: 0.5rem;
    width: 8rem;
    border-radius: 9999px;
    background: linear-gradient(
      to right,
      var(--rainbow-red),
      var(--rainbow-yellow) 25%,
      var(--rainbow-green) 50%,
      var(--rainbow-blue) 75%,
      var(--rainbow-violet)
    );
  }

  /* Carousel Section */
  .carousel-section {
    padding: 3rem 1rem;
    border-bottom: 1px solid var(--stone-200);
  }

  .carousel-header {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .carousel-header h2 {
    font-size: 2rem;
    margin: 0;
  }

  .carousel-controls {
    display: flex;
    gap: 1rem;
  }

  .carousel-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid var(--stone-300);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--stone-600);
    transition: all 0.3s ease;
  }

  .carousel-btn:hover:not(:disabled) {
    border-color: var(--stone-900);
    color: var(--stone-900);
  }

  .carousel-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel-container {
    max-width: 1440px;
    margin: 0 auto;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  .carousel-container::-webkit-scrollbar {
    height: 0.5rem;
  }

  .carousel-container::-webkit-scrollbar-track {
    background: var(--stone-100);
  }

  .carousel-container::-webkit-scrollbar-thumb {
    background: var(--stone-300);
    border-radius: 9999px;
  }

  .carousel-tracks {
    display: flex;
    gap: 1.5rem;
    padding: 1rem;
    min-width: min-content;
  }

  .carousel-item {
    flex: 0 0 min(288px, 100%);
    scroll-snap-align: start;
  }

  .card {
    background-color: var(--stone-100);
    border: 1px solid var(--stone-200);
    border-radius: 0.5rem;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .card-image {
    width: 100%;
    height: 12rem;
    background: linear-gradient(
      135deg,
      var(--rainbow-red),
      var(--rainbow-yellow),
      var(--rainbow-orange)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  .card-content {
    padding: 1.25rem 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-family: Georgia, Garamond, serif;
    font-size: 1.125rem;
    color: var(--stone-900);
    margin-bottom: 0.5rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card:hover .card-title {
    color: var(--rainbow-blue);
    transition: color 0.3s ease;
  }

  .card-description {
    font-size: 0.875rem;
    color: var(--stone-600);
    line-height: 1.6;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .card-link {
    font-size: 0.875rem;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: var(--rainbow-blue);
    text-decoration: underline;
    transition: color 0.3s ease;
  }

  .card-link:hover {
    color: var(--rainbow-indigo);
  }

  /* Footer */
  footer {
    background-color: var(--stone-900);
    color: var(--stone-50);
    margin-top: 4rem;
    padding: 3rem 1rem;
    border-top: 1px solid var(--stone-700);
  }

  .footer-content {
    max-width: 1440px;
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-column h4 {
    font-size: 1.125rem;
    color: var(--stone-50);
    margin-bottom: 1rem;
  }

  .footer-column ul {
    list-style: none;
  }

  .footer-column li {
    margin-bottom: 0.75rem;
  }

  .footer-column a {
    color: var(--stone-300);
    font-size: 0.875rem;
    transition: color 0.3s ease;
  }

  .footer-column a:hover {
    color: var(--stone-50);
  }

  .footer-column p {
    font-size: 0.875rem;
    color: var(--stone-300);
    line-height: 1.7;
  }

  .footer-rainbow {
    height: 0.375rem;
    width: 100%;
    border-radius: 9999px;
    background: linear-gradient(
      to right,
      var(--rainbow-red),
      var(--rainbow-yellow) 25%,
      var(--rainbow-green) 50%,
      var(--rainbow-blue) 75%,
      var(--rainbow-violet)
    );
    margin-top: 1rem;
  }

  .footer-divider {
    border-top: 1px solid var(--stone-700);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .footer-copyright {
    font-size: 0.75rem;
    text-align: center;
    color: var(--stone-400);
  }

  .footer-spacer {
    height: 2rem;
  }

  /* Responsive Design */
  @media (max-width: 1023px) {
    .nav-toggle {
      display: block;
    }

    nav.nav-desktop {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    .nav-toggle {
      display: none;
    }

    nav.nav-desktop {
      display: flex;
    }

    nav.nav-drawer {
      display: none !important;
    }

    .header-content {
      padding: 2rem 1.5rem;
    }

    .header-branding h1 {
      font-size: 2rem;
    }

    .hero-text h1 {
      font-size: 3.75rem;
    }

    .carousel-item {
      flex: 0 0 min(288px, 100%);
    }

    .carousel-section {
      padding: 4rem 1.5rem;
    }

    main {
      padding: 5rem 1.5rem;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 2.25rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .hero-text h1 {
      font-size: 2.25rem;
    }

    .hero-text p {
      font-size: 1rem;
    }

    .carousel-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .carousel-header h2 {
      margin-bottom: 1rem;
    }

    .carousel-controls {
      align-self: flex-end;
    }

    .card-image {
      height: 10rem;
    }

    main {
      padding: 2rem 1rem;
    }
  }
</style>
