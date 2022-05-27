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

                    'primary' : '#e6414d',

                    'secondary' : '#df9d91',

                    'accent' : '#e26f6f',

                    'neutral' : '#231C26',

                    'base-100' : '#ede7d8',

                    'info' : '#aabad9',

                    'success' : '#1AD594',

                    'warning' : '#E4AE0C',

                    'error' : '#F76E95'
                }
            }
        ]
    }
}
