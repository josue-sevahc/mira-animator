# Interactivity agents

Slides the audience interacts with. Today that means live polls and quizzes: the room scans a QR code, answers in Google Forms, and the slide updates in **real time** by reading the responses spreadsheet through the `gviz` endpoint over JSONP, so it works even from `file://`, as long as there is internet and the spreadsheet is public.

## `/mira-survey`
Builds a **live poll** slide: the audience scans a QR code, votes on a Google Form, and the result updates in **real time** on the slide (a spinning 3D donut by default, or a bar chart). It takes two links, the **voting** link (`forms.gle/...`, which becomes the QR generated locally as inline SVG) and the **responses spreadsheet** link (`docs.google.com/spreadsheets/...`, from which the slide reads the tally). It reads the `gviz` endpoint via JSONP every few seconds, so it works even from `file://` with no CORS error; it never uses "Publish to web → CSV" (cached for ~5 min). The spreadsheet must be public (anyone with the link → Viewer). If a link is missing, the agent asks before generating. For a QR without voting use `/mira-qrcode`; for a static data chart use `/mira-chart`.

## `/mira-quiz`
Builds a **live quiz** slide: the audience scans a QR code, answers a multiple-choice question in Google Forms, and the slide reads the responses spreadsheet live through `gviz` + JSONP. The correct answer stays hidden until the presenter clicks **Reveal** or presses `R`; only then does the correct card turn soft green, counts and percentages appear with animated bars, and a basic hit ranking can be toggled with `K`. It takes the voting link, spreadsheet link, question, options and correct answer. For a poll without a correct answer use `/mira-survey`.
