import gulp from 'gulp';
import sftp from 'gulp-sftp';

gulp.task('sftp:deploy:extension', function () {
    gulp.src('./build/extension/**/*')
        .pipe(sftp({
          host: 'sftp.dc0.gpaas.net',
          user: '3249456',
          keyLocation: '/home/vincent/.ssh/id_rsa_old',
          remotePath: '/lamp0/web/vhosts/ui.lmem.net/htdocs/'
        }));
});
