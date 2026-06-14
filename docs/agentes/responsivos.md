# Responsive agents

Square, vertical and rule-of-thirds versions of a deck.

## `/mira-squared`
Generates a **square** (1:1, 1080×1080) version of a deck from the 16:9 original, or creates square slides from scratch. Writes a new `index-1x1.html` next to the original (centered by default, optionally left/right aligned). For Instagram feed, LinkedIn, etc.

## `/mira-vertical`
Generates a **vertical** (9:16) version. Each content slide keeps only the main title at the top and a tall, standardized animation canvas below; the title auto-shrinks to fit at most two lines, and each animation's axis is reworked for portrait (horizontal flow becomes vertical, side-by-side comparison becomes stacked). Writes `index-9x16.html`. For Reels, Shorts, TikTok, Stories.

## `/mira-thirds`
Reframes a deck on the **rule of thirds** without changing the aspect ratio. Pushes each slide's content into columns 1 and 2 of a 3×3 grid (the left two-thirds) and leaves the right column free — for you to overlay text, a lower-third or the presenter's video in editing. Works on top of 16:9, 1:1 or 9:16. Writes a `-thirds` file. Free side is the right by default; can be flipped.
