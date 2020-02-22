declare namespace DotnetConsole {
    function discardBuffer(): void;
    function printLn(x: string): void;
    function printErr(x: string): void;
    function readToEnd(): string;
    function setInput(s: string);
    function getOutput(): string;
}
