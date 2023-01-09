import {useEffect, useState} from "react";

export const useKeyPress = (targetKeyCode: number): boolean => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);

    const downHandler = ({keyCode}: { keyCode: number }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({keyCode}: { keyCode: number }) => {
        if (keyCode === targetKeyCode) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    return keyPressed;
}
