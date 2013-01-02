<?php
  snippet('header');
  snippet('menu');
  $content     = new stdClass();
  $intro       = $pages->find('introduction');
  $projects    = $pages->find('work');
  $subprojects = $projects->children()->visible();
  $services    = $pages->find('services');
  $studio      = $pages->find('studio');
  $contact     = $pages->find('contact');
?>

<section id="intro" class="intro">

  <div style="width: 100%;">
    <h1 id="intro-title"><?= $intro->title();?></h1>
  </div>

  <p><?= $intro->text();?></p>
  <p class="client-image"><a href="#clients">
  <?php
    if ($intro->hasImages()) {
      $images = $intro->images();
      foreach ($images as $image) {
    ?>
      <img src="<?= $image->url();?>">
  <?php
      }
    }
  ?>
  (See all clients)</a></p>
</section>

<a name="work"></a>
<section id="work">
  <ol class="thumb-grid group">
    <?php
      foreach($subprojects as $project) :
        if ($project->visible()) {
          ?>
            <?php $mouseover = $project->children()->find('mouseover'); ?>
            <?php if ($mouseover) { ?>
            <li>
              <a href="<?= $project->url();?>">
                <ul class="slides">
                  <?php foreach ($mouseover->images()->reverse() as $image) { ?>
                  <li><img src="<?= $image->url();?>" alt="<?= $image->title();?>" /></li>
                  <?php } ?>
                </ul>
              </a>
              <p><a href="<?= $project->url();?>"><?= $project->title();?></a></p>
            </li>
            <?php } else { ?>
            <li><a href="<?= $project->url();?>"><img src="holder.js/221x221" alt="thumbnail" /></a><p><?= $project->title();?></li>
            <?php } ?>
          <?php
        }
      endforeach;
    ?>
  </ol>
</section>

<a name="services"></a>
<section id="services">
  <canvas id="canvas" width="701" height="525"></canvas>
  <p><?= $services->text();?></p>
</section>

<a name="about"></a>
<section id="studio" class="studio">

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

  <?php $studio_subpages = $studio->children();?>

  <article class="column-2">
    <h1><?= $studio_subpages->find('collaborators')->title();?></h1>
    <p><?= $studio_subpages->find('collaborators')->text();?></p>
  </article>
  <article class="column-2">
    <h1><?= $studio_subpages->find('compatriots')->title();?></h1>
    <p><?= $studio_subpages->find('compatriots')->text();?></p>
  </article>

  <a name="clients"></a>
  <article class="column-1">
    <h1><?= $studio_subpages->find('clients')->title();?></h1>
    <p><?= $studio_subpages->find('clients')->text();?></p>
  </article>

    <img src="holder.js/344x300" style="margin-right: 11px;">
    <img src="holder.js/344x300">

</section>

<a name="contact"></a>
<section id="contact" class="contact">
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
