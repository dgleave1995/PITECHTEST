Requirements:

- Node.js: ^20.19.0 or >=22.12.0
- Vue: ^3.5.18
- Vite: ^7.0.6
- Pinia: ^3.0.3
- Vue Router: ^4.5.1

Dev Tools:

- Vitest: ^3.2.4 (unit tests)  

Installation:

git clone https://github.com/dgleave1995/PITechTest.git
cd PITechTest
npm install

Install Dependencies:

npm install

Run Development Server:

npm run dev

Run Unit Tests:

npm run test:unit

Project Structure:

src
|_configs
|_router
    |_index.js
|_sass
    |_global.css
|_js
    |_components
        |_considerations
            |_Considerations.vue
        |_heading
            |_Heading.vue
        |_item-summary
            |_ItemSummary.vue
        |_output-summary-item
            |_OutputSummary.vue
        |_read-me
            |_ReadMe.vue
        |_tile-select
            |_TileSelect.vue
        |_tile-select-wrapper
            |_TileSelectWrapper.vue
    |_display-configs
        |_home.js
    |_pages
        |_Home.vue
    |_sevices
        |_journey-calculator.js

UI:

Upon the UI you will be presented with 3 menu options.
1: Holiday analysis - This will display the output of the holiday route finder task.
    |_ When opened, you will be presented with a table outputting the answers to the best journeys. Clicking on one of these will then give a breakdown of the next set of cheapest flights.
2: Read Me - Although perhaps redundant once the project is up and running, this shows the necessary requirement to run the project.
3: Considerations - This will talk about what I wish I could have done / done better with enough time.