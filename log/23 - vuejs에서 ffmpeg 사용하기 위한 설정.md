```javascript
module.exports = {
    devServer: {
        proxy:"https://unpkg.com/",
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    }
}
```

https://nomadcoders.co/wetube/lectures/2776