import typescript from 'rollup-plugin-typescript';

export default [{
    input: './content_script/main.ts',
    output: {
        file: 'dist/content_script.js'
    },
    plugins: [
        typescript()
    ]
}, {
    input: './background_script/main.ts',
    output: {
        file: 'dist/background_script.js'
    },
    plugins: [
        typescript()
    ]
}]
