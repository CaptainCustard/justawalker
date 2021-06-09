import { createMuiTheme } from '@material-ui/core/styles';
import createSpacing from '@material-ui/core/styles/createSpacing';

export type SizeIndicator = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        antioch: any;
    }

    interface ThemeOptions {
        antioch?: any;
    }
}

export const antiochTheme = {
    spacing: createSpacing(5),
    shape: {
        borderRadius: {
            smallest: 1,
            smaller: 2,
            small: 3,
            large: 6,
            larger: 8,
            largest: 10,
        },
    },
    typography: {
        fontFamily: {
            main: 'Roboto',
        },
        htmlFontSize: 12,
        fontSize: {
            smallest: 12,
            smaller: 14,
            small: 16,
            medium: 18,
            large: 24,
            larger: 28,
            largest: 32,
        },
    },
};

export const antiochMuiTheme = createMuiTheme({
    antioch: antiochTheme,
    typography: {
        fontFamily: "Roboto",
        fontSize: 16,
        body1: {
            fontSize: 16,
        },
    },
});
