import { PanelResizeHandle } from "react-resizable-panels";

interface ResizeHandleProps {
  direction?: "horizontal" | "vertical";
}

export function ResizeHandle({ direction = "horizontal" }: ResizeHandleProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <>
      <style>{`
				.resize-handle:hover {
					background-color: var(--mantine-color-blue-6) !important;
				}
			`}</style>
      <PanelResizeHandle
        style={{
          [isHorizontal ? "width" : "height"]: 8,
          backgroundColor: "var(--mantine-color-gray-3)",
          cursor: isHorizontal ? "col-resize" : "row-resize",
          transition: "background-color 200ms ease",
        }}
        className="resize-handle"
      />
    </>
  );
}
