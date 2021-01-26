export function saveToLocalStorage(name: string, state: any) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem(name, serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

export function loadFromLocalStorage(name: string) {
    try {
        const serialisedState = localStorage.getItem(name);
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}