/// <reference types="cypress" />


describe('blog subtitle test', () => {
  beforeEach(() => {
  })

    it('blog subtitle test scenario 1', () => {

      cy.visit('https://hugeman.co/')
        cy.contains('MORE STORIES').click({ force: true })

        const array_of_blog_title = [];     

        cy.contains('TECH').click({ force: true })

        // loop through first 3 blogs and get subtitle
        cy.get('.elementor-element-18f7e3c').filter(":lt(3)").each((item, index, $list) => {

            const link = item.find('a').first();

            cy.visit(link.attr('href'));
            const subtitle = cy.get('.elementor-widget-theme-post-excerpt').first();
            array_of_blog_title.push(subtitle)
            cy.go('back');
        });


        //loop through subtitle array and do the search
        for (let i = 0; i < array_of_blog_title.length; i++) {
            subtitle_text = array_of_blog_title[i];
            cy.get('.elementor-element-5755a43').click()
            cy.wait(2000)

            //perform blog search
            cy.get('.jet-ajax-search__field').type(subtitle_text)
            cy.get('.elementor-element-18f7e3c').click()

            //compare subtitle
            cy.get('.elementor-widget-theme-post-excerpt').should('have.text', subtitle_text)

        }



  })



})
