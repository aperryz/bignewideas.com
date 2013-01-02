<nav>
  <h1><a href="<?= u(); ?>"><img src="<?= url('assets/img/logo.png') ?>" alt="<?= html($site->title()) ?>" /></a></h1>
  <ul>
    <a href="<?= u('#work'); ?>" class="work"><li><span>Work</span></li></a>
    <a href="<?= u('#services'); ?>" class="services"><li><span>Services</span></li></a>
    <a href="<?= u('#about'); ?>" class="studio"><li><span>About</span></li></a>
    <a href="<?= u('#contact'); ?>" class="contact"><li><span>Contact</span></li></a>

    <a href="https://www.facebook.com/pages/Big-New-Ideas/138252859520366" target="_new"><li><span class="facebook social">Like</span></li></a>
    <a href="http://twitter.com/bignewideas" target="_new"><li><span class="twitter social">Follow</span></li></a>
    <a href="http://eepurl.com/b2YpX" target="_new"><li><span class="mailchimp social">Email Updates</span></li></a>
  </ul>
</nav>