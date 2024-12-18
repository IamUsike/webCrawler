const {normalizeURL, getURLsFromHTML} = require('./crawler.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = "https://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol(http)', ()=>{
    const input = "http://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', ()=>{
    const input = "https://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('normalizeURL strip capitals', ()=>{ //url constructor does this by default
    const input = "https://BLOG.boot.dev/path/" 
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML, absolute', ()=>{ 
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html?>
    `

    const inputBaseURL = `https://blog.boot.dev/path`
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = [`https://blog.boot.dev/path/`]
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML, relative', ()=>{ 
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html?>
    `

    const inputBaseURL = `https://blog.boot.dev`
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = [`https://blog.boot.dev/path/`]
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML, both (rel&abs)', ()=>{ 
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog path1
            <a href="/path2/">
                Boot.dev Blog path2
            </a>
        </body>
    </html?>
    `;

    const inputBaseURL = `https://blog.boot.dev`
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = [
      `https://blog.boot.dev/path1/`,
      `https://blog.boot.dev/path2/`,
    ];
    expect(actual).toEqual(expected)
})


test("getURLsfromHTML, invalid", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Boot.dev Blog
            </a>
        </body>
    </html?>
    `;

  const inputBaseURL = `https://blog.boot.dev`;
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

