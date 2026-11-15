# umarspeaks.com

Website for Dr. U.T. Muhammad: free NIL and family assessments, the Know Sports series, membership, the shop, SLP resources and speaking (UmarSpeaks.com).

utmuhammad.com forwards here. This is a plain HTML and CSS site. It needs no build step and can be hosted on GitHub Pages as is.

## What's in this folder

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About |
| `slp.html` | Sport as Lived Practice (SLP) |
| `families.html` | For Families: Six-P Check-Up and the Know Sports series |
| `newsletter.html` | The Pracademic Playbook newsletter |
| `nil-score.html` | NIL Readiness Score |
| `shop.html` | Shop and membership (Monthly / Annual switch works) |
| `speaking.html` | Speaking: keynotes, workshops, seminars and booking form |
| `contact.html` | Contact |
| `404.html` | Page-not-found page |
| `css/styles.css` | Shared styles and brand colors |
| `assets/favicon.svg` | Browser tab icon |
| `CNAME` | Tells GitHub Pages to serve the site at www.umarspeaks.com |
| `.nojekyll` | Tells GitHub Pages to serve the files exactly as they are |

## Publish on GitHub Pages

1. Create a new repository (for example `umarspeaks.com`) and upload everything in this folder, including `CNAME` and `.nojekyll`.
2. In the repository, open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. Under **Custom domain**, confirm `www.umarspeaks.com`, then turn on **Enforce HTTPS** once it becomes available.
4. At your domain registrar, set these DNS records for umarspeaks.com:
   - `www`: a **CNAME** record pointing to `YOUR-GITHUB-USERNAME.github.io`
   - The bare domain (`@`): four **A** records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. DNS changes can take up to 48 hours. Check GitHub's current Pages documentation if any of these values have changed.

## What still needs to be connected

The pages are complete as designs, but these parts need an outside service before they work:

- **Forms** (newsletter, contact, speaking booking, waitlists): connect to the email platform or a form service.
- **NIL Readiness Score and Six-P Check-Up**: the questions and scoring are confidential and will be built in an assessment tool or as a small custom app, then embedded here.
- **Shop and membership**: "Buy," "Enroll" and "Join" buttons need links to the checkout platform (for example Podia, Kartra or Stripe). Recurring billing for the $1.99 and $2.99 memberships happens there.
- **Downloads** (one-pagers, guides, speaker one-sheet): add the PDF files to an `assets/` folder and update each link.

Links currently set to `#` are placeholders for these.

## Placeholders to fill in

Search the files for `[` to find every placeholder, such as `[YOUR PRICE]`, `[X]`, `[Tier name]`, `[business email]` and `[Event name, organization, year]`.

## Content rules

- Refer to him as **Dr. U.T. Muhammad**. "Umar T. Muhammad, LLC" is used only as the business name.
- "Sport" means the lived experience; "Sports" means the commercial product. When copy describes what is taken from athletes or families, use "Sports."
- Sport as Lived Practice (SLP) branding appears only on `slp.html`.
- No references to Ohio University or the Alliance for Sport Business.
- Every data point shows its source on the page. Recheck figures from 2025 and early 2026 before launch.

© Umar T. Muhammad, LLC. All rights reserved.
