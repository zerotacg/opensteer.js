/*
**  grunt-traceur-simple -- Grunt Task for ECMAScript 6 to ECMAScript 5 Transpiling
**  Copyright (c) 2014 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global require:   false */
/* global module:    false */
/* global process:   false */
/* global __dirname: false */

/*  Grunt plugin information  */
var NAME = "traceur";
var DESC = "Transpiles ECMAScript 6 to ECMAScript 5 with Traceur";

/*  external requirements  */
var exec  = require("child_process").exec;
var os    = require("os");
var path  = require("path");
var chalk = require("chalk");

/*  external paths to Traceur  */
var traceurCommandPath = path.resolve(path.join(__dirname, "../node_modules/traceur/src/node/command.js"));
var traceurRuntimePath = path.resolve(path.join(__dirname, "../node_modules/traceur/bin/traceur-runtime.js"));

/*  export the Grunt task  */
module.exports = function (grunt) {
    grunt.registerMultiTask(NAME, DESC, function () {
        /*  provide default options  */
        var options = this.options({
            traceurRuntime: traceurRuntimePath,
            traceurCommand: traceurCommandPath,
            traceurOptions: "",
            includeRuntime: false
        });
        grunt.verbose.writeflags(options, "Options");

        /*  iterate over all src-dest file pairs  */
        var rc = true;
        var done = this.async();
        var tasksCur = 0;
        var tasksMax = this.files.length;
        if (options.includeRuntime && tasksMax !== 1)
            grunt.fail.fatal("including the runtime into more than one output file rejected");

        /*  assemble the Traceur shell command  */
        var cmd = "";
        var sq = function (txt) {
            if (os.platform === "win32")
            /*  Windows shell  */
                return "\"" + txt.replace(/"/g, "\"\"") + "\"";
            else
            /*  POSIX shell  */
                return "\"" + txt.replace(/(["\\$`!])/g, "\\$1") + "\"";
        };
        if (options.traceurCommand.match(/\.js$/))
            cmd = sq(process.execPath) + " " + sq(options.traceurCommand);
        else
            cmd = sq(options.traceurCommand);
        if (options.traceurOptions !== "")
            cmd += " " + options.traceurOptions;

        if (this.out)
        {
            cmd += " --out " + sq(this.out);
        }
        var dir = options.dir;
        if (dir)
        {
            cmd += " --dir " + sq(dir.indir) + " " + sq(dir.outdir);
        }
        if (this.script)
        {
            cmd += " --script" + sq(this.script);
        }
        if (this.files.length)
        {
            cmd += " " + sq(this.files.map(function (name) { return sq(name); }).join(" "));
        }
        if (options.modules)
        {
            cmd += " --modules=" + options.modules;
        }

        /*  execute the Traceur shell command  */
        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                /*  error reporting  */
                grunt.log.writeln("transpiling: " + chalk.red(cmd) );
                grunt.log.error(error);
                grunt.log.error(stderr);
                rc = false;
            }
            else {
                /*  success reporting  */
                grunt.log.writeln("transpiling: " + chalk.green("success") );
            }

            done(rc);
        });
    });
};

