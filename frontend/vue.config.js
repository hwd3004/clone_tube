// https://livedata.tistory.com/177
// module.exports = {
//     lintOnSave: false
// }

module.exports = {
    devServer: {
        proxy:"https://unpkg.com/",
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    }
}