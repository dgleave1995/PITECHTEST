export default {
  formSections: {
    TileSelect: {
      elements: {
        heading: {
          component: 'Heading',
          props:{
            text: 'Holiday Analysis Tech Test'
          }
        },
        tile_select: {
          component: 'TileSelectWrapper',
          props: {
            menus: [
              { title: 'Holiday Analysis', component: 'OutputSummaryList' },
              { title: 'Read Me', component: 'ReadMe' },
              { title: 'Considerations', component: 'Considerations' }
            ]
          }
        }
      }
    }
  }
}
