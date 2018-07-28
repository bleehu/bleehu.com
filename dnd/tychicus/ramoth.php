<!DOCTYPE html>
<HTML>
	<head>
		<title>Welcome to the Country of Tychicus!</title>
		<link href="../article.css" rel="stylesheet" type="text/css">
		<link rel="icon" href="../images/sword.ico" type="image/x-icon">
		<meta charset="UTF-8">
	</head>
	<body>
		<h1> Ramoth </h1>
		<h3> A city in Tychicus </h3>
		<div id="container">
			<h3>Overview</h3>
			<div>
				<p>Ramoth is the city built in large part by the party of adventurers who
					eventually founded <a href="tychicus.html" 
					title="Back to country">Tychicus</a>. It takes its name from a city
					God designated as a city of refuge, since that is what the settlers
					who built the place were hoping to find. Since then, it has grown to
					include the Center of Government building, which among other things,
					keeps track of the military treasury.</p>
			</div>
			<h3>Center of Government</h3>
			<div id="dojo">
				<table id="ledger">
					<tr>
						<th>Item</th>
						<th>Effect</th>
						<th>Net</th>
					</tr>
					<?php 
						$items = file("budgetReport.txt");
						foreach($items as $item){
							list($tag, $effect, $net) = explode("|",$item);
						?>
						<tr>
							<td> <?=$tag?> </td>
							<td> <?=$effect?> </td>
							<td> <?=$net?> </td>
						</tr>
						<?php } ?>
				</table>
				<p> There are currently 3 recruits working at the bank.</p>
			</div>
			<h3>Temple of the Lord</h3>
			<div>
			<p> The Temple in Ramoth is a place of worship to the one true
				god. It stands as a symbol of the nation's affection for Him
				above all others. Every Sunday, clerics give sermons on His
				laws and about his redeeming love. During all days of the week,
				the temple offers clerical healing and curing of disease. 
				Adventurers who rest in Ramoth will find massive boosts to
				healing and the removal of most status effects.
			</p>
			</div>
			
			<h3>Smokescale Manor</h3>
			<div>
			<p>Within the nobel city of Ramoth is the manor of Smokescale, where Kimoto,
				Kriv, Aurori, Ghekkotia, and Phyrinia live with the rest of the Smokescale
				clan. Kriv and Aurori's Mother Phyrinia is the Matriarch of the 
				Smokescales, since both her husband and Ghilla have been missing since
				the Great War, before the founding of Tychicus. The manor itself is rather
				spartan, ornamented with very little besides skilled woodwork. Most 
				Smokescales engage in duties in the city, and return to the manor only
				to eat and rest. The manor is a meer shadow of the once lavish complex
				where Smokescales used to live in the World Capitol before the outbreak
				of the great war. This former manor was raized by Spiderclaws and many
				Smokescales were killed as the clan fled the city.</p>
			</div>
			<div>
				<p>The Ramoth has roads to:</p>
				<ul>
					<li><a href="cassalua.html" title="To Cassalua"> To Cassalua </a></li>
					<li><a href="kedesh.html" title="To The City Kedesh"> To Kedesh </a></li>
					<li><a href="kamiak.html" title="To The City Kamiak"> To Kamiak </a></li>
					<li><a href="mtebal.html" title="To The City Mt. Ebal"> To Mt. Ebal </a></li>
				</ul>
			</div>
		</div>
		<div id="toolbar">
			<a href="../index.php" title="To The World Map"> 
					<img src="../images/world%20map%20button.png" alt="Back to World Map"/>
				</a>
			<a href="tychicus.html" title="To The Country of Tychicus"> 
					<img src="../images/tychicus%20button.png" 
						alt="Back to Tychicus"/>
				</a>
		</div>
	</body>
</HTML>