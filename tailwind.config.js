module.exports = {
    content : [
        './pages/*.js',
        './components/*.js',
        './elements/*.js',
        './elements/**/*.js',
        './layout/**/*.js',
        './pages/**/*.js'
    ],
    theme   : {
        extend : {
            colors     : {
                'brand-gold'      : '#e9b538',
                'brand-dark-gray' : '#444444'
            },
            fontFamily : {
                logo : ['Romana Bold', 'sans-serif']
            }
        }
    },
    plugins : [
        require('@tailwindcss/forms')
    ]
}
