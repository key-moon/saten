import typescript from 'rollup-plugin-typescript';

export default {
    input: './content_script/main.ts',
    output: {
        file: 'dist/content_script.js',
        format: 'iife'
    },
    format: 'es6',
    plugins: [
        typescript()
    ]
}
