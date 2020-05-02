const gulpCopy = require('gulp-copy');
const { src, series } = require('gulp');
const run = require('gulp-run');
const clean = require('gulp-clean');

const frontendSrc = "frontend/dist/**/*";
const frontendDst = "backend/dist/public";

function buildModels() {
    return run("cd models && npm run tsc").exec();
}
function buildFrontend() {
    return run("cd frontend && npm run build").exec();
}
function copyFrontendToBackend() {
    return src(frontendDst)
        .pipe(clean({read: false}))
        .pipe(src(frontendSrc))
        .pipe(gulpCopy("backend/dist/public", { prefix: 2 }));
}
function buildBackend() {
    return run("cd backend && npm run tsc").exec();
}

function package() {
    return run("npm run build").exec();
}

exports.default = series(buildModels, buildFrontend, copyFrontendToBackend, buildBackend, package);