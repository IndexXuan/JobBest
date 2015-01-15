Name:    JobBest Project 
Date:    2015.1  
Author:  `Pengrui (pengruixiaoxuan@gmail.com)` [weibo@IndexXuan](http://weibo.com/u/3180300392 "IndexXuan")  

####ENV
---------
    node@0.10.33 with npm@1.4.28

    Front-End
      `scss`
      `avalon( MVVM )`:+1:

    Back-End
       [x]todo 

    DB
       [x]todo 
      
    Test
       [x]todo 

    others
      `bower`
      `grunt`
     
####Usage:  
---------
    clone or download in local path.  
    1 mkdir yourproject  
    2 cd yourproject && npm install (require grunt and bower)  
    3 cd public && bower install  
    4 grunt workflow   
    [Once you have your environment setup](http://localhost:9000/#!/) just run:

####APIs
---------
    basic tasks:
    ============
    buildscss   ( sass, concat:css, cssmin )  
    buildjs     ( uglify, concat:js )  
    buildimages ( imagemin )  

    manual tasks:
    ============
    checkhtml   ( htmlhint )  
    buildcss    ( clean:css, copy:css, buildscss )  
    buildcssjs  ( buildcss, buildjs )  
    buildall    ( buildscss, buildjs, buildimages )  
    mv2bdfolder ( clean, copy:font, copy:css )  

    helper tasks:  
    ============
    rebuild     ( mv2bdfolder, buildall )  

    workflow tasks:  
    ============
    workflow    ( rebuild, connect:livereload, open, watch )   


####Description:  
    A pure Front-end seed project with grunt workflow and support livereload.  
    open source under the MIT License.  
    Just for self learn.  

Thanks for :kissing_heart: `github` and `friends` ~



