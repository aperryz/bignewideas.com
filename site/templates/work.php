<?php
  snippet('header');
  snippet('menu');
?>

<section class="intro">
  <h1 id="intro-title"><?= $page->title(); ?></h1>
  <p><?= kirbytext($page->text());?></p>

      <?php foreach ($page->images() as $image) { ?>
          <p><img src="<?= $image->url();?>"></p>
      <?php } ?>

<?php
  if ($slideshow = $page->children()->find('slideshow')) {
    if ($slideshow->hasImages()) { ?>
        <div class="slidewrap" data-autorotate="5000">
          <ul class="slider" id="work-slider">

      <?php foreach ($slideshow->images() as $image) { ?>
              <li class="slide">
                <p><img src="<?= $image->url(); ?>"></p>
              </li>
    <?php
      }
      ?>
          </ul>
        </div>
    <?php
    }
  }
?>

</section>

<?php snippet('footer') ?>
