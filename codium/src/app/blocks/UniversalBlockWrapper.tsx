import * as React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { blocksRegistry } from "@/app/blocks/BlocksRegistry";

const CATEGORY_COLOR: Record<string, string> = {
    math:  "#3b82f6",
    logic: "#f59e0b",
    flow:  "#22c55e",
};

const UniversalBlockWrapper: React.FC<NodeProps> = (props) => {
    const block = blocksRegistry[props.type];

    if (!block) {
        return (
            <div style={{
                padding: 8, background: "#450a0a",
                border: "1px solid #ef4444", borderRadius: 8,
                color: "#fca5a5", fontSize: 11,
            }}>
                Unknown block: {props.type}
            </div>
        );
    }

    const { inputs, outputs, component: InnerComponent } = block.visuals;
    const accent = CATEGORY_COLOR[block.category] ?? "#6b7280";

    return (
        <div style={{
            minWidth: 160,
            borderRadius: 10,
            overflow: "visible",            /* CRITICAL — must not clip handles */
            background: "#1e293b",
            border: `1.5px solid ${accent}66`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22`,
        }}>

            {/* ── Header ── */}
            <div style={{
                background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
                borderRadius: "8px 8px 0 0",
                padding: "5px 12px",
                textAlign: "center",
                color: "#fff",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}>
                {block.name}
            </div>

            {/* ── Body ── */}
            <div style={{ display: "flex", alignItems: "stretch" }}>

                {/* Input ports */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "10px 0",
                }}>
                    {inputs.map((input) => (
                        <div key={input.id} style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: 28,
                            position: "relative",
                        }}>
                            <Handle
                                type="target"
                                position={Position.Left}
                                id={input.id}
                                style={{
                                    position: "absolute",
                                    width: 12,
                                    height: 12,
                                    background: "#93c5fd",
                                    border: "2px solid #1e293b",
                                    borderRadius: "50%",
                                    boxShadow: "0 0 8px #3b82f6aa",
                                    left: -6,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            />
                            <span style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: "#94a3b8",
                                fontFamily: "monospace",
                                paddingLeft: 14,
                                paddingRight: 8,
                                whiteSpace: "nowrap",
                            }}>
                                {input.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Inner component */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 4px",
                    borderLeft:  `1px solid ${accent}22`,
                    borderRight: `1px solid ${accent}22`,
                }}>
                    <InnerComponent {...props} />
                </div>

                {/* Output ports */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "10px 0",
                }}>
                    {outputs.map((output) => (
                        <div key={output.id} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            minHeight: 28,
                            position: "relative",
                        }}>
                            <span style={{
                                fontSize: 10,
                                fontWeight: 600,
                                color: "#94a3b8",
                                fontFamily: "monospace",
                                paddingLeft: 8,
                                paddingRight: 14,
                                whiteSpace: "nowrap",
                            }}>
                                {output.label}
                            </span>
                            <Handle
                                type="source"
                                position={Position.Right}
                                id={output.id}
                                style={{
                                    position: "absolute",
                                    width: 12,
                                    height: 12,
                                    background: "#86efac",
                                    border: "2px solid #1e293b",
                                    borderRadius: "50%",
                                    boxShadow: "0 0 8px #22c55eaa",
                                    right: -6,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default UniversalBlockWrapper;
export { UniversalBlockWrapper as UniversalBlockNode };
