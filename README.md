This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

kadın kıyafet markaları
..
https://dizioyuncu.com/inci-taneleri-dizi-kiyafetleri-ve-elbise-markalari/ 
https://dizikiyafetleri.com/inci-taneleri-oyuncu-kiyafetleri-elbiseleri-ve-kombinlerin-markasi/
https://www.tvblogum.com/inci-taneleri-dizi-kiyafetleri/

https://www.trendyol.com/en/trendyol-collection/black-piping-detailed-blouse-tpraw23bz00028-p-286137518

dd
build


Create document that outlines the design specifications for a component displaying TV series posters in a portrait orientation horizontally. When hovered over, the poster expands horizontally while maintaining its original height, transitioning to a landscape orientation. The horizontally neighboring poster to the right shifts  to the right off the screen as much to accommodate the expanded poster, creating more space. If the hovered poster on the right most side it should slide to the left

Understanding the Problem
The core issue is that when a poster expands, the neighboring poster should dynamically adjust its position to accommodate the increased space.



Design Specifications for TV Series Poster Display Component
1. General Layout
Orientation: The posters are displayed in a horizontal line.
Default State:
Orientation: Portrait
Aspect Ratio: 2:3 (e.g., 200px width x 300px height)
Spacing: 10px margin between posters
2. Hover Interaction
Trigger: Mouse hover over a poster
Animation Duration: 300ms for smooth transitions
2.1 Poster Expansion
Transition: From portrait to landscape orientation
Expanded Size:
Aspect Ratio: 16:9
Height: Remains the same (300px)
Width: Increases to fit the 16:9 ratio (approximately 533px)
Behavior:
The hovered poster expands to the left.
The expanded poster should not go beyond the screen edge.
2.2 Neighboring Posters' Adjustment
Right Neighboring Poster:
Transition: Slides to the right off-screen to accommodate the expansion of the hovered poster.
Visibility: Partially or fully off-screen, depending on the available space.
Left Neighboring Poster:
Behavior: Remains static unless the expanded poster reaches the left screen edge.
2.3 Edge Case Handling
Rightmost Poster Hover:
Transition: The rightmost poster expands to the left.
Adjustment: The entire row of posters shifts to the left to create space for the expansion.
Edge Guard: Ensure no content shifts off-screen to the left, maintaining visibility of all posters.
3. Visual Design
Poster Frame: Slight shadow and border (2px, solid color, e.g., #ccc) for a defined look.
Hover State Effects:
Box Shadow: Increase in intensity and spread to emphasize the active state (e.g., shadow spread 8px).
Border Color: Optionally change color to highlight the active poster (e.g., #ff6f61).
Background: Consistent across the display area, preferably neutral (e.g., #f4f4f4) to avoid distraction from posters.
4. Responsiveness
Small Screens:
Adjust poster size while maintaining aspect ratios.
Reduce margin between posters if needed.
Touch Devices:
Support tap-and-hold for hover-like behavior.
Ensure smooth transitions without relying on hover state alone.
5. Accessibility
Keyboard Navigation: Enable focus states for keyboard users to simulate hover effects.
Screen Readers: Use ARIA roles and labels to describe actions (e.g., "Poster expands when focused").
6. Performance Considerations
Lazy Loading: Load poster images as they come into view to optimize performance.
CSS Optimization: Use hardware-accelerated CSS transitions for smooth animations.
Implementation Notes
Technologies: CSS3 for styling and animations, JavaScript for event handling and dynamic adjustments.
Testing: Ensure compatibility across major browsers and responsiveness on different screen sizes.
This specification outlines the necessary details for developing a dynamic and visually appealing TV series poster display component, ensuring both functionality and user experience.


//avarage

https://chatgpt.com/c/5988cae5-d31e-412b-b29e-ba589b1263e5


node src/app/sponsor-kiyafeti/utils/downloadData.mjs && node utils/alternatif-utils/downloadData.mjs && node src/app/turk-dizi/utils/downloadData.mjs&& node utils/alternatif-utils/aggregateData.mjs && node src/app/sponsor-kiyafeti/utils/sqlquery.mjs&& node src/app/turk-dizi/utils/mergeData.mjs&& npx next build

// install typesense to hostinger
https://chatgpt.com/c/66e2f6a0-3d88-8000-920e-ac9bc6022667


https://www.mehmettatli.com.tr markasının yaptığı hizmeti hakkında kısa  kelem şeklinde açıklama ve slogan(h1 tag)


//aggregation/
https://claude.ai/chat/835f790d-2e0d-43ac-8eed-226f1ba28b2f