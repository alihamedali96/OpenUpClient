/**
 * @jest-environment jsdom
 */
 const fs = require('fs');
 const path = require('path');
 global.fetch = require('jest-fetch-mock');
 const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')

 const createSection = require ('./script'); 
// const getTopPosts = require('./script'); 
 //const swicthColours = require('./script'); 

 const testPost = {
    id: "ajdj-sds2-sdsd",
    title: "Yesahjxp sds ",
    body: "sax hnasd",
    link: "https://media1.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif?cid=ab6c4d53zdzp1pvjpi7apbhj100lzl1tc6w4n7240ngxt60a&rid=giphy.gif&ct=g",
   // date: "Fri May 6 2022 19:30:00",
    comments: [
        {
            id: 0,
            body: "comment in here blah blah blah",
            link: "link to a giphy should go here",
            date: "Tue May 17 2022 13:45:30",
            postRef: "ajdj-sds2-sdsd"
        }
    ],
    reactions: {
        laugh: 22,
        thumbUp: 19,
        poo: 2
    }
};
 
 describe ('Script.js',()=>{
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        title = document.querySelector('title');
        script = require('./script');
        fetch.resetMocks();
    })

    test('getAllPosts makes a fetch', async () => {
        await script.getTopPosts();
        expect(fetch).toHaveBeenCalled()
    })
 
     test('expect CreateSection to contain data',()=>{
         
         expect(createSection).toBeTruthy();
     })
 
    //  test('expect getTopPosts to get back data',()=>{
         
    //      expect(getTopPosts).toBeTruthy();
    //  })
 
     // test('expect switchcolours ',()=>{
     //     const fakeCallback = jest.fn();
     //     swicthColours(fakeCallback)
     //     expect(fakeCallback).toBeHaveBeenCalled();//(CheckDarkOn = true);
     // })
 
 })
 
