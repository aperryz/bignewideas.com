<?php
  snippet('header');
  snippet('menu');
  $content     = new stdClass();
  $intro       = $pages->find('introduction');
  $projects    = $pages->find('work');
  $subprojects = $projects->children();
  $services    = $pages->find('services');
  $studio      = $pages->find('studio');
  $contact     = $pages->find('contact');
?>

<section class="intro">
  <h1 id="intro-title"><?= $intro->title();?></h1>
  <p><?= $intro->text();?></p>
  <?php
    if ($intro->hasImages()) {
      $images = $intro->images();
      foreach ($images as $image) {
    ?>
      <p class="client-image"><a href="#clients"><img src="<?= $image->url();?>"> (See all clients)</a></p>
  <?php
      }
    }
  ?>
</section>

<a name="work"></a>
<section>
  <ol class="thumb-grid group">
    <?php
      foreach($subprojects->visible() as $project) :
        if ($project->hasImages()) {
          ?>
          <?php
        } else {
          ?>
            <li><a href="#"><img src="http://placehold.it/221x221" alt="thumbnail" /></a><p><?= $project->title();?></li>
            <li><a href="#"><img src="http://placehold.it/221x221" alt="thumbnail" /></a><p><?= $project->title();?></li>
          <?php
        }
      endforeach;
    ?>
  </ol>
</section>

<a name="services"></a>
<section>
  <canvas id="canvas" width="701" height="390"></canvas>
  <p><?= $services->text();?></p>
</section>

<a name="about"></a>
<section class="studio">

  <ul class="persons">
    <?php
      if ($studio->hasImages()) {
        $images = $studio->images();
        foreach ($images as $image) {
          ?>
          <li>
            <img src="<?php echo $image->url() ?>" width="<?php echo $image->width() ?>" height="<?php echo $image->height() ?>" alt="<?php echo $image->name() ?>" />
            <h3><?= $image->name();?></h3>
            <p><?= $image->twitter();?></p>
            <p><?= $image->text();?></p>
          </li>
          <?php
        }
      }
    ?>
  </ul>

  <article class="column-2">
    <h1><?= $studio->section_1();?></h1>
    <p><?= $studio->section_1_text();?></p>
  </article>
  <article class="column-2">
    <h1><?= $studio->section_2();?></h1>
    <p><?= $studio->section_2_text();?></p>
  </article>

  <a name="clients"></a>
  <article class="column-1">
    <h1><?= $studio->section_3();?></h1>
    <p><?= $studio->section_3_text();?></p>
  </article>

    <img src="http://placehold.it/337x300" style="margin-right: 14px;">
    <img src="http://placehold.it/337x300">

</section>

<a name="news"></a>
<section class="contact">
  <h1><?= $contact->title();?></h1>
  <ul>
    <li><?= $contact->phone_number();?></li>
    <li><?= kirbytext($contact->email_address());?></li>
    <li><?= kirbytext($contact->twitter());?></li>
    <li><?= kirbytext($contact->facebook());?></li>
  </ul>
  <ul>
    <li><?= kirbytext($contact->address_1());?></li>
  </ul>
  <ul>
    <li><?= kirbytext($contact->address_2());?></li>
  </ul>
</section>

<?php snippet('footer') ?>
