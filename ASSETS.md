# PlantPal assets

The owner supplied the app icon and three real screenshots. Original files remain at the workspace root. Web-optimized copies in `public/images/` are used on the site. The supplied Play Store banner is also preserved at the workspace root.

Generated hero: `public/images/plant-corner.webp`, created with built-in imagegen and encoded as WebP. The original is preserved locally in `.sites-runtime/original-assets/plant-corner.png`.

Prompt:

> Use case: photorealistic-natural. Asset type: PlantPal houseplant-care marketing website hero photo. A beautiful mature monstera deliciosa in an earthy terracotta pot on a wooden stool, alongside a small trailing pothos, in a quiet sunlit apartment. Warm off-white apartment wall, uncluttered natural home interior. Photorealistic editorial magazine photography with authentic botanical detail and tactile surfaces. Landscape 4:3 composition. Monstera occupies the center-right with breathing room around the foliage and stool. Entire pot visible. Smaller trailing pothos complements the scene. Dappled morning sunlight, calm inviting atmosphere, gentle natural shadows. Rich natural leaf greens, earthy terracotta, warm wood, off-white. Realistic leaf veins and natural fenestrations, matte terracotta, subtly textured plaster wall, visible wood grain. No text, no UI, no people, no logos, no watermark.

The generated scene is decorative, not an identification reference or a claim about a customer's home. No social-sharing image was generated.

## Immersive homepage and WebGL plant

- `public/images/greenhouse-hero.webp`: generated with built-in imagegen for this site, then encoded as WebP (1672 × 941, about 201 KB). Original: `../hero-assets/plantpal-greenhouse-hero.png`. Decorative greenhouse imagery, not a botanical identification reference.
- Prompt: Photorealistic wide botanical website hero. Immersive lush tropical greenhouse with emerald and lime monstera and ferns. Left 45% dark quiet negative space; crisp layered foliage on right. Warm morning sunlight from upper right through fine mist. High-end botanical lifestyle photography. No text, UI, logos, watermark, people, or fake plants.
- `public/models/plantpal.glb`: web-optimized copy of the owner's supplied `Meshy_AI_plantpal_realistic_3d_0922215031_image-to-3d-texture.glb`. Original remains unmodified at the workspace root (36.83 MB). Web copy is 2.16 MB, with 1024px textures and simplified mesh using glTF Transform. No external model or texture requests. The supplied model has no skeletal animation; the game animates its position, orientation, and gentle body sway.

Optimization command from the site folder:

`node node_modules/@gltf-transform/cli/bin/cli.js optimize ../Meshy_AI_plantpal_realistic_3d_0922215031_image-to-3d-texture.glb public/models/plantpal.glb --compress false --texture-size 1024 --simplify-ratio 0.12 --simplify-error 0.002`

## Primary-page backgrounds

- `public/images/learn-grow-hero.webp` (1672 × 941, 153 KB): generated growth-progression scene for the Learn & Grow library in every language. Original in `../hero-assets/learn-grow-hero.png`.
- `public/images/soil-care-hero.webp` (1672 × 941, 184 KB): generated potting-bench scene for soil and fertilizer pages. Original in `../hero-assets/soil-care-hero.png`.
- `public/images/leaf-detail-hero.webp` (1672 × 941, 173 KB): generated dew-covered foliage for plant guides, troubleshooting, and glossary headers. Original in `../hero-assets/leaf-detail-hero.png`.
- Both created with built-in imagegen for this site, one generation each. Photoreal botanical photography, dark left composition for readable text, subjects and warm sunlight on the right, no text or logos. Decorative images, not identification references.
- Game sounds are short original oscillator melodies synthesized locally with Web Audio; no recordings, external audio requests, or autoplay before a play action.

## Houseplant collection

The 11 assets in `public/images/plants/` were generated for this project with the built-in imagegen tool on 2026-09-28 and optimized locally to WebP with Sharp. They do not use stock photography or third-party image files. The catalog images are editorial illustrations of each species, not diagnostic identification references. Generated images should still be checked against living specimens when botanical accuracy matters.

Hero prompt: photorealistic wide houseplant catalog photograph in a sophisticated sunlit conservatory, with mature monstera, trailing golden pothos, upright snake plant, peace lily and fiddle-leaf fig; plants concentrated at center and right, dark negative space on the left for copy; warm late-afternoon light, terracotta and handmade ceramic pots, natural botanical detail, no people, text, logos or watermarks.

Each portrait used this prompt set: photorealistic natural editorial houseplant catalog card; one correctly shaped, clearly identifiable specimen with the full plant and pot visible; tactile interior materials, luminous morning window light, natural greens and subtle imperfections; vertical 4:5 framing; no text, people, logos, watermarks or other prominent plants. Subjects and settings were:

| File | Subject and setting |
| --- | --- |
| `monstera.webp` | Mature fenestrated Monstera deliciosa, climbing support, plaster wall and terracotta pot. |
| `pothos.webp` | Golden variegated Epipremnum aureum trailing over an oak shelf. |
| `snake-plant.webp` | Upright Dracaena trifasciata in a sand-colored planter. |
| `zz-plant.webp` | Glossy Zamioculcas zamiifolia on a walnut sideboard. |
| `peace-lily.webp` | Spathiphyllum with white spathes in a clay planter. |
| `rubber-plant.webp` | Ficus elastica with broad glossy leaves in terracotta. |
| `spider-plant.webp` | Striped Chlorophytum comosum with plantlets on a shelf. |
| `fiddle-leaf-fig.webp` | Ficus lyrata with violin-shaped leaves in a stoneware planter. |
| `heartleaf-philodendron.webp` | Trailing Philodendron hederaceum on a walnut shelf. |
| `aloe-vera.webp` | Aloe vera rosette on a bright limestone windowsill. |
