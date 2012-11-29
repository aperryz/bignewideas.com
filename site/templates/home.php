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

<section>
  <h1><?= $intro->title();?></h1>
  <p><?= $intro->text();?></p>
</section>

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

<section>
  <p><?= $services->text();?></p>
</section>

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

  <article class="column-1">
    <h1><?= $studio->section_3();?></h1>
    <p><?= $studio->section_3_text();?></p>
  </article>

</section>

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
