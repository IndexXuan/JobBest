Name:    JobBest Project   
Date:    2015.1  
Author:  `Pengrui (pengruixiaoxuan@gmail.com)` [weibo@IndexXuan](http://weibo.com/u/3180300392 "IndexXuan")  

#### Intro:
---------
    This project is a homework of my UML course and I am learning MVVM framework.
    So I make it a seed project of avalonjs with livereload and grunt workflow support
    Static resource are from JobDeer(by AngularJS) and if infringement,  please
    tell me and i'll remove them immediately. 3Q ~

#### Description:  
    A pure Front-end seed project with grunt workflow and support livereload.  
    open source under the MIT License.  
    most static resource are copy from JobDeer, if something wrong or infringement,  
    tell me and i'll remove them immediately.

#### ENV
---------
    node@0.10.33 with npm@1.4.28

    Front-End
       scss
       avalon( MVVM )

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
        build/                  -->  build files
            fonts/              -->  web font files, copy from assets/fonts/
            images/             -->  images, imagemin from assets/images/
            javascript/         -->  build folder from assets/js and vender/js
                js/             -->  build js
                app-build.js    -->  production use js file
            stylesheet/         -->  build folder from assets/scss and vender/css
                css/            -->  build css
                    min/        -->  min build css
                app-build.css   -->  production use css file
        data/                   -->  data used to generate the pages, simulate Back-End APIs
            index.json          -->  index module simulation data
            resume.json         -->  resume module simulation data
        modules/                -->  modules to manage the project
            header/             -->  header module folder
                header.html     -->  header tpl
                header.js       -->  header ctrl or VM
            ...                 -->  other modules with the same structure
    test/                       -->  test info or task define
   .bowerrc                     -->  bower configuration file
   .gitignore                   -->  gitigore file
   bower.json                   -->  for bower
   package.json                 -->  for npm
   README.md                    -->  This readme

#### Contact

For more information on

* NodeJS - http://nodejs.org/
* Grunt - http://gruntjs.com/
* Bower - http://bower.io/
* avalonjs - https://github.com/RubyLouvre/avalon/
* Sass - http://www.sass-lang.com/
* Bootstrap - http://getbootstrap.com/

#### Usage:  
---------

    * Install Node and NPM - http://nodejs.org/
    * Install Bower - http://bower.io/  
    * Install Grunt - http://gruntjs.com/  

    clone or download in local path.  
    1. mkdir yourproject  
    2. cd yourproject && npm install (require grunt and bower)  
    3. cd public && bower install  
    4. grunt workflow   
    
    Once you have your environment setup, just run: http:localhost:9000/!#/

#### Tasks APIs
---------
    basic tasks:
    ============
    buildscss   ( sass, concat:css, cssmin )  
    buildjs     ( uglify, concat:js )  
    buildimages ( imagemin )  

    manual tasks:
    ============
    clean       ( clean ) clean the build folder
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
    
#### License
    MIT     
    Just for self learn. 

---------
Thanks for :kissing_heart: `github`, [JobDeer](http://h5.jobdeer.com/app/list 'JobDeer'),  [司徒大大](http://www.cnblogs.com/rubylouvre/p/3181291.html "司徒正美, avalonjs作者") and all of my `friends` ~



