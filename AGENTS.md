# AGENTS Notes

## GIF Resize + Optimization Workflow

To reduce large gameplay GIFs for small UI sections, we resized and optimized them with `ffmpeg`.

### What was changed
- Original files:
  - `assets/dash.gif` (`1903x1014`, ~12.0 MB)
  - `assets/tesla-link.gif` (`1903x1014`, ~18.3 MB)
- Output settings:
  - Scale width to `640` (height auto)
  - Frame rate to `12 fps`
  - Palette-limited GIF with `max_colors=96`
  - Bayer dithering for quality/size balance

### Command pattern used
```powershell
ffmpeg -y -i <input.gif> -filter_complex "fps=12,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=96[p];[s1][p]paletteuse=dither=bayer" -loop 0 <output.gif>
```

### Results from this run
- `assets/dash.gif`: ~12.0 MB -> ~1.5 MB
- `assets/tesla-link.gif`: ~18.3 MB -> ~2.3 MB

These settings were chosen because the GIFs are displayed in smaller layout blocks and still looked good after compression.
