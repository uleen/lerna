interface Snapshot {
    render: (any) => void;
    shallow: (any) => void;
    mount: (any) => void;
}

declare let snapshot: Snapshot;

declare module '*.svg' {
    const content: any;
    export default content;
}

declare namespace NodeJS {
    export interface Global {
        snapshot: Snapshot;
    }
}
