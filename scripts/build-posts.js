/**
 * Converts _posts/*.md files into:
 *  1. A standalone HTML page per post ({slug}.html at the root)
 *  2. Article snippets injected at the top of team-prism-prism-post.html
 *
 * Injection markers required in the archive page:
 *   <!-- CMS_POSTS_START -->
 *   <!-- CMS_POSTS_END -->
 *
 * Netlify runs this automatically on every publish via netlify.toml.
 */

'use strict';

const fs     = require('fs');
const path   = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT         = path.join(__dirname, '..');
const POSTS_DIR    = path.join(ROOT, '_posts');
const ARCHIVE_FILE = path.join(ROOT, 'team-prism-prism-post.html');
const MARKER_START = '<!-- CMS_POSTS_START -->';
const MARKER_END   = '<!-- CMS_POSTS_END -->';

/* ─── helpers ────────────────────────────────────────────────────── */

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isoDate(raw) {
  if (!raw) return new Date().toISOString();
  const d = new Date(raw);
  return isNaN(d) ? new Date().toISOString() : d.toISOString();
}

/* ─── standalone post page ───────────────────────────────────────── */

function buildPostPage(fm, htmlBody, slug) {
  const title       = fm.title       || 'Blog Post';
  const description = fm.description || '';
  const date        = isoDate(fm.date);
  const image       = fm.image       || '';
  const imageBlock  = image
    ? `<p><img class="alignnone size-medium" src="${image}" alt="${esc(title)}" style="max-width:450px;height:auto;" /></p>\n`
    : '';

  return `<!DOCTYPE html>
<html class="avada-html-layout-wide avada-html-header-position-top avada-is-100-percent-template awb-scroll" lang="en-US" prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
	<link rel="shortcut icon" href="images/uploads/2023/03/favicon.png" type="image/x-icon" />
	<link rel="apple-touch-icon" sizes="180x180" href="images/uploads/2023/03/favicon.png">
	<link rel="icon" sizes="192x192" href="images/uploads/2023/03/favicon.png">
	<meta name="msapplication-TileImage" content="images/uploads/2023/03/favicon.png">
	<title>${esc(title)} - Prism Dynamic Medical Supply Solutions</title>
	<meta name="description" content="${esc(description)}"/>
	<meta property="og:locale" content="en_US"/>
	<meta property="og:type" content="article"/>
	<meta property="og:site_name" content="Prism Dynamic Medical Supply Solutions"/>
	<meta property="og:title" content="${esc(title)}"/>
	<meta property="og:description" content="${esc(description)}"/>
	<meta property="og:url" content="${slug}"/>
	<meta property="article:published_time" content="${date}"/>
	<meta name="author" content="Prism Medical"/>
	<meta property="og:image" content="${image || 'images/uploads/2023/03/PRISM_logo.png'}"/>
	<meta property="og:image:width" content="292"/>
	<meta property="og:image:height" content="81"/>
	<meta property="og:image:type" content="image/png"/>
	<link rel='stylesheet' id='fusion-dynamic-css-css' href='css/uploads/fusion-styles/a3b759c6fcd32db46bec077a7b4320ea.min3dab.css?ver=3.11.9' type='text/css' media='all' />
	<script type="text/javascript" src="js/js/jquery/jquery.minf43b.js?ver=3.7.1" id="jquery-core-js"></script>
	<link rel="preload" href="fonts/themes/Avada/includes/lib/assets/fonts/icomoon/awb-icons.woff" as="font" type="font/woff" crossorigin>
	<link rel="preload" href="fonts/themes/Avada/includes/lib/assets/fonts/fontawesome/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>
	<style type="text/css" id="css-fb-visibility">
		@media screen and (max-width:640px){.fusion-no-small-visibility{display:none !important;}}
		@media screen and (min-width:641px) and (max-width:1024px){.fusion-no-medium-visibility{display:none !important;}}
		@media screen and (min-width:1025px){.fusion-no-large-visibility{display:none !important;}}
	</style>
	<style type="text/css" id="wp-custom-css">
		.fusion-main-menu:not(.fusion-sticky-menu){display:block !important;}
		.fusion-mobile-selector,.fusion-mobile-menu-icons{display:none !important;}
	</style>
	<script type="text/javascript">
		var doc = document.documentElement;
		doc.setAttribute('data-useragent', navigator.userAgent);
	</script>
	<script src="js/cm-consent-guard.js"></script>
	<link rel="stylesheet" href="css/common-preloader.css" type="text/css" media="all" />
</head>

<body class="wp-singular post-template-default single single-post single-format-standard wp-theme-Avada wp-child-theme-Avada-child fusion-image-hovers fusion-button_type-flat fusion-body ltr fusion-sticky-header no-tablet-sticky-header no-mobile-sticky-header fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode layout-scroll-offset-full fusion-top-header menu-text-align-left mobile-menu-design-modern fusion-header-layout-v3 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-clean avada-blog-layout-large avada-header-shadow-no avada-flyout-menu-direction-fade avada-ec-views-v1"><div class="preloader"></div>
	<a class="skip-link screen-reader-text" href="#content">Skip to content</a>

	<div id="boxed-wrapper">
		<div class="fusion-sides-frame"></div>
		<div id="wrapper" class="fusion-wrapper">
			<div id="home" style="position:relative;top:-1px;"></div>
			<div id="common-layout-header"></div>
			<div id="sliders-container" class="fusion-slider-visibility"></div>

			<main id="main" class="clearfix width-100">
				<div class="fusion-row" style="max-width:100%;">

<section id="content" style="width:100%;">
	<div class="post-content">
		<div class="fusion-fullwidth fullwidth-box fusion-flex-container has-pattern-background has-mask-background nonhundred-percent-fullwidth non-hundred-percent-height-scrolling fusion-custom-z-index" style="--awb-border-radius-top-left:0px;--awb-border-radius-top-right:0px;--awb-border-radius-bottom-right:0px;--awb-border-radius-bottom-left:0px;--awb-z-index:99;--awb-flex-wrap:wrap;">
			<div class="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap" style="max-width:1331.2px;margin-left:calc(-4% / 2);margin-right:calc(-4% / 2);">
				<div class="fusion-layout-column fusion_builder_column fusion-flex-column" style="--awb-bg-size:cover;--awb-width-large:100%;--awb-margin-top-large:0px;--awb-spacing-right-large:1.92%;--awb-margin-bottom-large:20px;--awb-spacing-left-large:1.92%;--awb-width-medium:100%;--awb-width-small:100%;">
					<div class="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
						<div class="fusion-content-tb fusion-content-tb-1" style="--awb-text-color:#50586b;--awb-text-transform:none;">
${imageBlock}${htmlBody}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

				</div>
			</main>

			<div id="common-layout-footer"></div>
		</div>
	</div>
	<a class="fusion-one-page-text-link fusion-page-load-link" tabindex="-1" href="#" aria-hidden="true">Page load link</a>

	<div class="avada-footer-scripts"></div>
	<script type="text/javascript" src="js/uploads/fusion-scripts/11eb9ec4ecb85d91461aab8dac62cb65.min3dab.js?ver=3.11.9" id="fusion-scripts-js"></script>
	<section class="to-top-container to-top-right" aria-labelledby="awb-to-top-label">
		<a href="#" id="toTop" class="fusion-top-top-link">
			<span id="awb-to-top-label" class="screen-reader-text">Go to Top</span>
		</a>
	</section>
	<script type="text/javascript" src="js/common-layout.js"></script>
</body>
</html>
`;
}

/* ─── archive article snippet ────────────────────────────────────── */

function buildArchiveArticle(fm, htmlBody, slug) {
  const title      = fm.title || 'Blog Post';
  const image      = fm.image || '';
  const imageBlock = image
    ? `<p><img class="lazyload alignnone size-medium" src="${image}" alt="${esc(title)}" width="450" height="450" /></p>\n`
    : '';

  return `<article id="blog-cms-${slug}" class="fusion-post-medium post type-post status-publish format-standard hentry">
<div class="fusion-post-content post-content"><div class="fusion-post-content-container">
${imageBlock}${htmlBody}
</div></div><div class="fusion-clearfix"></div></article>`;
}

/* ─── main ───────────────────────────────────────────────────────── */

function buildPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('_posts/ not found — nothing to build.');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log('No markdown posts in _posts/ — nothing to build.');
    return;
  }

  const archiveSnippets = [];

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
    const { data: fm, content } = matter(raw);
    const htmlBody = marked(content);
    const slug     = path.basename(filename, '.md');

    // Individual post page
    const outPath = path.join(ROOT, `${slug}.html`);
    fs.writeFileSync(outPath, buildPostPage(fm, htmlBody, slug), 'utf8');
    console.log(`  wrote ${slug}.html`);

    archiveSnippets.push(buildArchiveArticle(fm, htmlBody, slug));
  }

  // Inject into archive
  if (!fs.existsSync(ARCHIVE_FILE)) {
    console.warn('Archive file not found — skipping archive update.');
    return;
  }

  let archive = fs.readFileSync(ARCHIVE_FILE, 'utf8');
  const si = archive.indexOf(MARKER_START);
  const ei = archive.indexOf(MARKER_END);

  if (si === -1 || ei === -1) {
    console.warn('Injection markers not found in team-prism-prism-post.html — skipping.');
    return;
  }

  const block   = MARKER_START + '\n' + archiveSnippets.join('\n') + '\n' + MARKER_END;
  archive       = archive.slice(0, si) + block + archive.slice(ei + MARKER_END.length);
  fs.writeFileSync(ARCHIVE_FILE, archive, 'utf8');
  console.log(`  updated archive with ${archiveSnippets.length} post(s).`);
}

console.log('Building CMS posts...');
buildPosts();
console.log('Done.');
