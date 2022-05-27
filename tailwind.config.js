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
        require('@tailwindcss/forms'),
        require('daisyui')
    ],
    daisyui : {
        themes : [
            {
                mytheme : {

                    'primary' : '#a7aba7',

                    'secondary' : '#88ea89',

                    'accent' : '#24e53b',

                    'neutral' : '#231C26',

                    'base-100' : '#e0e2df',

                    'info' : '#759EF5',

                    'success' : '#1AD594',

                    'warning' : '#E4AE0C',

                    'error' : '#F76E95'
                }
            }
        ]
    }
}
