/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const path = require('path');
 const html = fs.readFileSync(path.resolve(__dirname, '../post.html'), 'utf8'); /* GET THIS RIGHT */

// note the two dots in filepath, index.html is one directory above this test file

 describe('post.html testing follows:', () => {

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe(' ------  Head examination:  ------', () => {

        // check an HTML language is specified
        test('is an HTML language of en specified', () => {
            let lang = document.querySelectorAll('html[lang="en"]')
            expect(lang).toBeTruthy();
        })

        // is charset declared
        test('is charset = UTF-8', () => {
            let charset = document.querySelectorAll('meta[charset="UTF-8"]')
            expect(charset).toBeTruthy();
        })

        // is http-equiv set
        test('is http-equiv = X-UA-Compatible', () => {
            let http = document.querySelectorAll('meta[http-equiv="X-UA-Compatible"]')
            expect(http).toBeTruthy();
        })


        // check a viewport is present
        test('is a viewport specified', () => {
            let viewport = document.querySelectorAll('meta[name="viewport"]')
            expect(viewport).toBeTruthy();
        })

        test('is title present', () => {
            let title = document.querySelector('title');
            expect(title).toBeTruthy();
        })

        test('is title text as expected', () => {
            let title = document.querySelector('title');
            expect(title.textContent).toEqual('Post an Entry');
        })


        // check a stylesheet is attached, does not check which actual css is named
        test('is a stylesheet attached', () => {
            let stylesheet = document.querySelectorAll('link[rel="stylesheet"]')
            expect(stylesheet).toBeTruthy();
        })

        //can check specific stylesheet is attached once we know final directory

        // FAVICON CHECK
        // <link rel="shortcut icon" href="images/OpenUp_logo.png" type="image/x-icon">
        test('is a favicon attached', () => {
            let favicon = document.querySelectorAll('link[rel="shortcut icon"]')
            expect(favicon).toBeTruthy();
        })



    })

    describe(' ------  Body examination:  ------', () => {

        test('is header present', () => {
            let header = document.querySelector('header');
            expect(header).toBeTruthy();
        })

        test('is navbar present', () => {
            let seeNav = document.querySelectorAll('nav');
            expect(seeNav[0].outerHTML).toContain('navbar'); /* this needs adjusted to target correctly */
            console.log(seeNav[0].outerHTML);

            // let navbar = document.querySelector('navbar');
            // expect(navbar).toBeTruthy();
        })


        test('logo nav link present', () => {
            let seeLinks = document.querySelectorAll('a');
            // console.log(seeLinks[0].outerHTML);
            expect(seeLinks[0].outerHTML).toContain('index.html');
        })


        test('index navbar link present', () => {
            let seeLinks = document.querySelectorAll('a');
            // console.log(seeLinks[1].outerHTML);
            expect(seeLinks[1].outerHTML).toContain('index.html');
        })


        test('blog navbar link present', () => {
            let seeLinks = document.querySelectorAll('a');
            // console.log(seeLinks[2].outerHTML);
            expect(seeLinks[2].outerHTML).toContain('blog.html');
        })


        test('search field in navbar present', () => {
            let seeSearch = document.querySelectorAll('input');
            // console.log(seeSearch[0].outerHTML);
            expect(seeSearch[0].outerHTML).toContain('type="search"');
        })


        test('search button in navbar present', () => {
            let seeButton = document.querySelectorAll('button');
            console.log(seeButton[1].outerHTML);
            expect(seeButton[1].outerHTML).toContain('type="submit"');
        })


        // i'm assuming only one form on the page and dont need to target via ID
        test('is new submission form there?', () => {
            let form = document.querySelector('form');
            expect(form).toBeTruthy();
        })

        test('is h1 present', () => {
            let h1 = document.querySelector('h1');
            expect(h1).toBeTruthy();
        })
    
        test('are H1 contents as expected', () => {
            let h1 = document.querySelector('h1');
            expect(h1.textContent).toEqual('It\'s time to open up');
        })

        test('is h2 present', () => {
            let h2 = document.querySelector('h2');
            expect(h2).toBeTruthy();
        })
    
        test('are H2 contents as expected', () => {
            let h2 = document.querySelector('h2');
            expect(h2.textContent).toEqual('It\'s time to explore your feelings, feel understood, and share your innermost thoughts, beliefs, and concerns openly');
        })



        test('is title field present?', () => {
            const allInputs = document.querySelectorAll('input');
            expect(allInputs[1].outerHTML).toContain('id="title"'); 

        })


        test('is textArea field present?', () => {
            const allInputs = document.querySelectorAll('input');
            expect(allInputs[2].outerHTML).toContain('id="textArea"'); 

        })


        test('is giphy search field present?', () => {
            const allInputs = document.querySelectorAll('input');
            expect(allInputs[3].outerHTML).toContain('id="search"'); 

        })


        test('is search button for giphy present', () => {
            let seeButton = document.querySelectorAll('button');
            console.log(seeButton[2].outerHTML);
            expect(seeButton[2].outerHTML).toContain('id="btnSearch"');
        })


        test('is public submit button present', () => {
            let seeButton = document.querySelectorAll('button');
            console.log(seeButton[3].outerHTML);
            expect(seeButton[3].outerHTML).toContain('id="submitpublic"');
        })


        test('is private submit button present', () => {
            let seeButton = document.querySelectorAll('button');
            console.log(seeButton[4].outerHTML);
            expect(seeButton[4].outerHTML).toContain('id="submitprivate"');
        })


        test('is footer present', () => {
            let footer = document.querySelector('footer');
            expect(footer).toBeTruthy();
        })


    })

 })


