// NPM Modules
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
    content: ['./app/**/*.{js,vue,ts}'],
    theme: {
        extend: {
            colors: {
                primary: colors.green,
            },
        },
    },
};
