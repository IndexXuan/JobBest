{
  appDir: "../",
  baseUrl: "assets/js",
  dir: "../outputs",
  optimize: "uglify",
  optimizeCss: "standard.keepLines",
  keepBuildDir: false,
  skipModuleInsertion: true,
  removeCombined: true,
  modules: [
    {
      name: 'app',
      include: ['', '']
        }
    ],
  fileExclusionRegExp: /^(\.|build|demo|outputs)/ /*过滤文件夹*/
}