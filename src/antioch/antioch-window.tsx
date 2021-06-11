import React, { useEffect } from "react";
import { antiochStyles } from "./antioch-styles";
import { initAntioch } from "./engine";

export const AntiochWindow: React.FC = () => {
	const classes = antiochStyles();
	const windowRef: React.MutableRefObject<any> = React.useRef(null);

    useEffect(() => {
        let destroyFn;

        if (windowRef.current) {
            const { destroy } = initAntioch(windowRef.current);
            destroyFn = destroy;
        }

        return destroyFn;
    }, []);

	return <div ref={windowRef} className={classes.root}/>;
}
