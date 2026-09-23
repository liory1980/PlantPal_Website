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
