<?php snippet('header') ?>

<?php foreach($pages->visible() as $section): ?>

  <h1><?= $section->title();?></h1>
  <?php foreach($section->children()->visible() as $subpage) : ?>
    <h2><?= $subpage->title();?></h2>
  <?php endforeach ?>

<?php endforeach ?>

<?php snippet('footer') ?>