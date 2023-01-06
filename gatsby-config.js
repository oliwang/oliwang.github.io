module.exports = {
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: `${__dirname}/content/garden`,
        rootNote: `/hello`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `BLOG`,
        path: `${__dirname}/content/garden/Blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `SHARING`,
        path: `${__dirname}/content/garden/Sharing`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `PROJECT`,
        path: `${__dirname}/content/garden/Project`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": generate_html(node.html) }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["RSS"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                      excerpt
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Everything from Better Next Week by Olivia Wang.",
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": generate_html(node.html) }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["Blog"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                      excerpt
                    }
                  }
                }
              }
            `,
            output: "/blog.xml",
            title: "Articles from Better Next Week by Olivia Wang.",
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": generate_html(node.html) }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["Newsletter"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                      excerpt
                    }
                  }
                }
              }
            `,
            output: "/newsletter.xml",
            title: "Better Next Week - Your weekly dose of productivity, coding, and self-improvement inspiration by Olivia Wang.",
          },
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt,
                  date: node.frontmatter.date,
                  url: node.frontmatter.url,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content": node.frontmatter.excerpt }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["Sharing"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    excerpt
                    html
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                      url
                      excerpt
                    }
                  }
                }
              }
            `,
            output: "/sharing.xml",
            title: "Interesting links from Better Next Week by Olivia Wang.",
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [],
      },
    },
    
    
    
    
  ],

  siteMetadata: {
    title: 'Better Next Week by Olivia Wang',
    description: 'Your weekly dose of productivity, coding, and self-improvement inspiration',
    siteUrl: 'https://oliwang.github.io/',
    author: 'Olivia Wang',
    email: 'betternextweek.bnw@gmail.com',
    headerMenu: [ // Top Navbar items
      {type: 'page', item: '', title: 'Home'}, // Type can be 'page', 'note', 'tag', 'text' or 'link'
      {type: 'page', item: 'sitemap', title: 'Sitemap'},
      {type: 'page', item: 'rss.xml', title: 'RSS'},
      {
        type: 'page', item: 'tags', title: 'Tags',
        menu: [ // Only one level depth, please.
          {type: 'tag',item: 'programming'},
          {type: 'tag',item: 'philosophy'},
          {type: 'tag',item: 'psychology'},
          {type: 'tag',item: 'rationality'},
        ]
      },
    ],
  },

}


function generate_html(inner_html) {
  var html_wrapper = `
  <style>
    .note-content img {
      max-width:80%;
      max-height: 300px;
      margin: 1rem auto;
      display:block;
    }

    .note-content p{
      margin:2rem 0!important;
    }
    
    .note-content blockquote{
      background:rgba(173,216,230,.3)!important;
      margin:0.5rem 0!important;
      font-size:16px!important;
      font-weight:light!important;
      width:100%;
    }

    .note-content a:link,  .note-content a:visited,{
      color: rgb(30, 135, 240)!important;
    }
    
    .popover{position:relative;max-width:16rem;box-shadow:0 10px 15px -3px var(--shadow),0 4px 6px -2px rgba(0,0,0,.05);padding:1rem;border:1px solid var(--separator);border-radius:.5rem;background-color:var(--references-bg);max-height:16rem;overflow:hidden}.popover.no-max-width{max-width:90vw}.popover.with-markdown{font-size:.875rem}.popover h1{margin:0;padding:0;font-size:1rem}.popover ul{padding-left:1rem}.popover .more-content-blind{height:4rem;position:absolute;background:transparent;background:linear-gradient(0,var(--references-bg),var(--references-bg-80) 50%,var(--references-bg-0));top:12rem;width:100%;left:0}.tippy-box[data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-box[data-animation=shift-away][data-state=hidden][data-placement^=top]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-box[data-animation=shift-away][data-state=hidden][data-placement^=bottom]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-box[data-animation=shift-away][data-state=hidden][data-placement^=left]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-box[data-animation=shift-away][data-state=hidden][data-placement^=right]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.reference{text-decoration:none}.reference:hover{color:var(--references-highlight)}.reference>div{padding-top:.5rem;padding-bottom:.5rem}.reference>div>p{margin:0;font-size:.875rem}.reference>div>ul{margin:0}.references-block{color:var(--references-text);padding:1rem;margin:1rem 0;border-radius:.5rem;background-color:var(--references-bg);transition:background-color .3s ease,color .3s ease}.references-block>div{margin-bottom:1rem}.references-block>hr{margin-left:auto;margin-right:auto;width:8rem}.references-block a{color:var(--references-text);transition:color .3s ease}.references-block>p:last-child{margin-bottom:0}.note-container{background:var(--note-bg);transition:background .3s ease}.note-container:first-child{border-left:none}.note-container .note-content,.note-container .obstructed-label{transition:opacity 75ms linear}.note-container .obstructed-label{display:block;color:var(--text);text-decoration:none;font-size:17px;line-height:40px;font-weight:500;-webkit-writing-mode:vertical-lr;writing-mode:vertical-lr;-webkit-text-orientation:sideways;text-orientation:sideways;margin-top:36px;top:0;bottom:0;left:0;position:absolute;background-color:transparent;width:40px;overflow:hidden;opacity:0;transition:color .3s ease;pointer-events:none}.note-container.note-container-highlighted{background:var(--references-bg);transition:background .3s ease}.note-content img{max-width:100%}@media screen and (max-width:800px){.note-container{padding:16px;width:100%;overflow-y:auto}}@media screen and (min-width:801px){.note-container{transition:box-shadow .1s linear,opacity 75ms linear,-webkit-transform .2s cubic-bezier(.19,1,.22,1);transition:box-shadow .1s linear,opacity 75ms linear,transform .2s cubic-bezier(.19,1,.22,1);transition:box-shadow .1s linear,opacity 75ms linear,transform .2s cubic-bezier(.19,1,.22,1),-webkit-transform .2s cubic-bezier(.19,1,.22,1);flex-shrink:0;width:625px;max-width:625px;top:0;position:-webkit-sticky;position:sticky;flex-grow:1;border-left:1px solid var(--separator);padding:0}.note-content{overflow-y:auto;height:100%;padding:32px}.note-container-overlay{box-shadow:0 0 15px 3px var(--shadow)}.note-container-obstructed .note-content{opacity:0}.note-container-obstructed .obstructed-label{opacity:1;pointer-events:all}}.dark-mode-toggle{cursor:pointer;-webkit-transform:scale(.6);transform:scale(.6)}.dark-mode-toggle input{display:none}.dark-mode-toggle input+div{border-radius:50%;width:36px;height:36px;position:relative;box-shadow:inset 16px -16px 0 0 #fff;-webkit-transform:scale(1) rotate(-2deg);transform:scale(1) rotate(-2deg);transition:box-shadow .5s ease 0s,-webkit-transform .4s ease .1s;transition:box-shadow .5s ease 0s,transform .4s ease .1s;transition:box-shadow .5s ease 0s,transform .4s ease .1s,-webkit-transform .4s ease .1s}.dark-mode-toggle input+div:before{content:"";width:inherit;height:inherit;border-radius:inherit;position:absolute;left:0;top:0;transition:background .3s ease}.dark-mode-toggle input+div:after{content:"";width:8px;height:8px;border-radius:50%;margin:-4px 0 0 -4px;position:absolute;top:50%;left:50%;box-shadow:0 -23px 0 var(--link),0 23px 0 var(--link),23px 0 0 var(--link),-23px 0 0 var(--link),15px 15px 0 var(--link),-15px 15px 0 var(--link),15px -15px 0 var(--link),-15px -15px 0 var(--link);-webkit-transform:scale(0);transform:scale(0);transition:all .3s ease}.dark-mode-toggle input:checked+div{box-shadow:inset 32px -32px 0 0 #fff;-webkit-transform:scale(.5) rotate(0deg);transform:scale(.5) rotate(0deg);transition:box-shadow .2s ease 0s,-webkit-transform .3s ease .1s;transition:transform .3s ease .1s,box-shadow .2s ease 0s;transition:transform .3s ease .1s,box-shadow .2s ease 0s,-webkit-transform .3s ease .1s}.dark-mode-toggle input:checked+:before{background:var(--link);transition:background .3s ease .1s}.dark-mode-toggle input:checked+:after{-webkit-transform:scale(1.5);transform:scale(1.5);transition:-webkit-transform .5s ease .15s;transition:transform .5s ease .15s;transition:transform .5s ease .15s,-webkit-transform .5s ease .15s}.graph-button{border:0;background:none;cursor:pointer}.graph-button svg g{stroke:var(--link)}.searchWrapper{position:relative;display:block}.inputWrapper{position:relative;color:var(--text)}.inputWrapper .searchIcon{position:absolute;fill:var(--link);left:2px;height:34px;padding:2px 2px 0;pointer-events:none}.inputWrapper input{color:var(--text);font-size:1rem;border:none;height:36px;padding-left:28px;background-color:var(--note-bg);transition:all .3s ease-in-out;width:28px}.inputWrapper input:focus{outline:none;width:100%}.results{-webkit-padding-start:0;padding-inline-start:0;position:absolute;display:block;top:100%;right:0;width:500px;max-height:50vh;background:var(--note-bg);box-shadow:-5px -5px 15px -3px var(--shadow),0 4px 6px -2px rgba(0,0,0,.05);overflow-y:auto;border-radius:8px}.results li{display:block;text-decoration:none;cursor:pointer;padding:16px 24px;border-bottom:1px solid var(--separator)}.results li:hover{background:var(--references-bg)}.results li .title{color:var(--text)}.results li .excerpt{color:var(--references-text)}@media screen and (max-width:600px){.results{right:-85px;width:calc(100vw - 40px)}}.lds-dual-ring:after{content:" ";left:calc(50% - 32px);position:relative;display:block;width:64px;height:64px;margin:8px;border-radius:50%;border-color:var(--separator);border-left:6px solid transparent;border-bottom:6px solid var(--separator);border-right:6px solid transparent;border-top:6px solid var(--separator);-webkit-animation:lds-dual-ring 1.2s ease-in-out infinite;animation:lds-dual-ring 1.2s ease-in-out infinite}@-webkit-keyframes lds-dual-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes lds-dual-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}header{width:100%;min-height:57px;z-index:5;background-color:var(--note-bg);border-bottom:1px solid var(--separator);display:flex;justify-content:space-between;align-items:center;padding:10px 32px;flex-wrap:wrap;transition:background-color .3s ease}header>a{font-weight:700;color:var(--text);text-decoration:none;transition:color .3s ease}header .controls{display:flex}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}body.light-mode{--main-bg:#fafafc;--note-bg:#fff;--text:#1a202c;--separator:#e2e8f0;--shadow:rgba(0,0,0,0.1);--link:#3182ce;--references-bg:#ebf4ff;--references-bg-80:rgba(235,244,255,0.8);--references-bg-0:rgba(235,244,255,0);--references-text:#718096;--references-highlight:#4a5568}body.dark-mode{--main-bg:#000;--note-bg:#0a0d11;--text:#fafafc;--separator:#252525;--shadow:hsla(0,0%,100%,0.1);--link:#3da1ff;--references-bg:#17181a;--references-bg-80:rgba(23,24,26,0.8);--references-bg-0:rgba(23,24,26,0);--references-text:#8c9fbb;--references-highlight:#b3cbf0}body{background-color:var(--main-bg);color:var(--text);margin:0;padding:0;height:100vh;transition:background-color .3s ease,color .3s ease}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,p,pre{margin:0}*,:after,:before{box-sizing:border-box}h1,h2,h3{font-weight:700}hr{margin-top:10rem;margin-bottom:5rem;border:solid var(--separator);border-width:1px 0 0;box-sizing:content-box;height:0;overflow:visible}a{color:var(--link);text-decoration:underline;transition:color .3s ease}a:hover{text-decoration:none}h1{font-size:1.875rem;margin-top:1rem}h1,p{margin-bottom:1rem}.layout{height:100vh;display:flex;flex-direction:column}.note-columns-scrolling-container{display:flex;overflow-x:auto;overflow-y:hidden;flex-grow:1}.note-columns-container{display:flex;flex-grow:1;transition:width .1s cubic-bezier(.19,1,.22,1)}@media screen and (max-width:800px){.note-columns-container{width:unset!important}}.overlay{z-index:98;position:fixed;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;height:100%;width:100%;background-color:var(--shadow);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.modal{z-index:99;position:fixed;border-radius:8px;background-color:var(--main-bg);box-shadow:-5px -5px 15px -3px var(--shadow),0 4px 6px -2px rgba(0,0,0,.05)}.modal-close,.modal-scale{position:absolute;top:0;right:0;padding:5px;border:0;background:none;color:var(--text);cursor:pointer}.modal-close svg,.modal-scale svg{width:20px;height:20px}.modal-close path,.modal-scale path{fill:currentColor}.modal-scale{right:30px}.modal-minimized .modal-close svg,.modal-minimized .modal-scale svg{width:15px;height:15px}.modal-minimized .modal-scale{right:25px}.modal-body{height:100%;width:100%}.modal-body .node,.modal-body .text{cursor:pointer}
  </style>
  
  <div style="width:100%;" class="note-content">
  ${inner_html}
  </div>`
  return html_wrapper;
}
