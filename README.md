# JobBest

Name:    JobBest    
Date:    2015.1  
Author:  `Pengrui (pengruixiaoxuan@gmail.com, 1203802652@qq.com)` [weibo@IndexXuan](http://weibo.com/u/3180300392 "IndexXuan")  

#### Intro:

    This project is a homework of my UML course and I am learning MVVM framework.
    So I make it a seed project of avalonjs with livereload and grunt workflow support
    Static resource are from JobDeer(by AngularJS) and if infringement,  please
    tell me and i'll remove them immediately. 3Q ~

#### Description:  

    A pure front-end seed project with grunt server and workflow, support livereload.  
    Build by avalonjs，a lightweight、 highperformance MVVM framework.

#### ENV

    node@0.10.33 with npm@1.4.28

    Front-End
       scss ( Ruby@1.9 to support sass )
       avalon ( MVVM )

    Back-End
       [x]todo 

    DB
       [x]todo 
      
    Test
       [x]todo 

    others
       bower
       grunt  

#### Directory Layout

    node_modules                -->  NodeJS modules - install using npm install
    public/                     -->  all of the files to be used in on the client side
        bower_components        -->  for bower components - install using bower install
        assets/                 -->  assets files
            fonts/              -->  web font files
            images/             -->  images
            js/                 -->  js files to 
            scss/               -->  scss files
            vender/             -->  3rd-party's resource or others
                css/            -->  vender css files
                js/             -->  vender js files
        build/                  -->  build files - build by grunt
            fonts/              -->  web font files, copy from assets/fonts/
            images/             -->  images, imagemin from assets/images/
            javascript/         -->  build folder from assets/js and vender/js
                js/             -->  build js
                app-build.js    -->  production use js file
            stylesheet/         -->  build folder from assets/scss and vender/css
                css/            -->  build css
                    min/        -->  min build css
                app-build.css   -->  production use css file
        data/                   -->  data used to generate pages, simulate Back-End APIs
            index.json          -->  index module simulation data
            resume.json         -->  resume module simulation data
        modules/                -->  modules to manage the project
            header/             -->  header module folder
                header.html     -->  header tpl
                header.js       -->  header ctrl or VM
            ...                 -->  other modules with the same structure  
    test/                       -->  test info or task define
    .bowerrc                    -->  bower configuration file
    .gitignore                  -->  gitigore file
    bower.json                  -->  for bower
    package.json                -->  for npm
    README.md                   -->  This readme  

#### Tips  

    vender/css will be just move to build/stylesheet/css, and will be min and 
    concat with other files in that folder, since the order of css is very important,
    so, prefix the vender/css/*.css and make them concat correctly.
    For example: normalize need first and style.css need second and custom.css should 
    be the last. todo: aaa_normalize and bbb_style.css and ccc_custom.css, if so, even
    the app.css concat with them will not wrong! Also you can config the order of the 
    css files in grunt tasks. 

#### Reference

For more information on

* NodeJS - http://nodejs.org/
* Grunt - http://gruntjs.com/
* Bower - http://bower.io/
* avalonjs - https://github.com/RubyLouvre/avalon/
* Sass - http://www.sass-lang.com/
* Bootstrap - http://getbootstrap.com/

#### Usage:  
   
    clone or download this repo in local path. (require node&npm, sass, bower and grunt)
    1. mkdir yourproject && cd yourproject
    2. npm install
    3. bower install  
    4. grunt workflow   
    
Once you have your environment setup, just run and [click here -> http://localhost:9000/!#/] (http://localhost:9000/!#/ "server start")

#### Tasks APIs

    basic tasks:
    ============
    buildscss   ( sass, concat:css, cssmin )  
    buildjs     ( uglify, concat:js )  
    buildimages ( imagemin )  


    manual tasks:
    ============
    publish     ( clean ) clean the build folder to publish
    checkhtml   ( htmlhint )  
    buildcss    ( clean:css, copy:css, buildscss )  
    buildcssjs  ( buildcss, buildjs )  
    buildall    ( buildscss, buildjs, buildimages )  
    mv2bdfolder ( clean, copy:font, copy:css )  move resource in assets to build folder for build


    helper tasks:  
    ============
    rebuild     ( mv2bdfolder, buildall )  


    workflow tasks:  
    ============
    workflow    ( rebuild, connect:livereload, open, watch )   

#### Todos:  

    [x] Back-End (DB and Server)  
    [x] APIs Design  
    [x] Test  
    Custom this project, Ready Go!  
 
#### License

    MIT     
    Just for self learn. 

Thanks for :kissing_heart: `github`, [JobDeer](http://h5.jobdeer.com/app/list 'JobDeer'),  [司徒大大](http://www.cnblogs.com/rubylouvre/p/3181291.html "司徒正美, avalonjs作者") and all of my `friends` ~ aha!

