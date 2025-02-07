import { Excalidraw } from "@excalidraw/excalidraw";
import { useState, useCallback } from "react";

function App() {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    const onClickExport = useCallback(() => {
        if (!excalidrawAPI) {
            alert('画布还未准备好，请稍后再试');
            return;
        }
        const elements = excalidrawAPI.getSceneElements();
        const exportJSON = JSON.stringify(elements);
        const blob = new Blob([exportJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "excalidraw-export.json";
        link.click();
    }, [excalidrawAPI]);

    const onClickImport = useCallback(() => {
        if (!excalidrawAPI) {
            alert('画布还未准备好，请稍后再试');
            return;
        }
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = async (e) => {
            const file = e.target.files[0];
            const contents = await file.text();
            const elements = JSON.parse(contents);
            excalidrawAPI.updateScene({ elements });
        };
        input.click();
    }, [excalidrawAPI]);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button onClick={onClickExport}>导出内容</button>
                <button onClick={onClickImport}>导入内容</button>
            </div>
            <div
                style={{
                    height: "500px",
                    width: "100%",
                    border: "1px solid black"
                }}>
                <Excalidraw
                    onMount={(api) => {
                        setExcalidrawAPI(api);
                    }}
                    onChange={(elements) => {
                        console.log("Scene Changed:", elements);
                    }}
                />
            </div>
        </>
    );
}

export default App;
