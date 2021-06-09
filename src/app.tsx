import React from 'react';
import { indexStyles } from './index-styles';
import { AntiochRouter } from "./router";
import { antiochMuiTheme } from "./styles/theme";
import { ThemeProvider } from "@material-ui/core";

export const AntiochApp: React.FC = () => {
    const classes = indexStyles();

    return (
        <ThemeProvider theme={antiochMuiTheme}>
            <div className={classes.root}>
                <AntiochRouter/>
            </div>
        </ThemeProvider>
    );
};
