"use client"

import React, { useMemo, useEffect, useRef, useState, useCallback } from "react"

type Position = "bottomLeft" | "topLeft"
type AnimationMode = "singleLine" | "multiLine" | "inPlace"
type Phase = "hidden" | "appearing" | "visible"

interface CharEntry {
    char: string
    globalIdx: number
    posInLine: number
    lineIdx: number
}

interface Group {
    type: "word" | "space" | "newline"
    chars: CharEntry[]
    lineIdx: number
    gi: number
}

interface VLI {
    charVL: Map<number, number>
    charVLPos: Map<number, number>
    vlLen: Map<number, number>
}

function buildGroups(text: string) {
    const lines = text.split("\n")
    const groups: Group[] = []
    let globalIdx = 0,
        gi = 0
    lines.forEach((line, lineIdx) => {
        let posInLine = 0
        ;(line.match(/\S+|\s+/g) ?? []).forEach((seg) => {
            groups.push({
                type: /^\s/.test(seg) ? "space" : "word",
                chars: seg.split("").map((c) => ({
                    char: c,
                    globalIdx: globalIdx++,
                    posInLine: posInLine++,
                    lineIdx,
                })),
                lineIdx,
                gi: gi++,
            })
        })
        if (lineIdx < lines.length - 1)
            groups.push({ type: "newline", chars: [], lineIdx, gi: gi++ })
    })
    return { groups, totalVisible: globalIdx }
}

function rawDelay(
    c: CharEntry,
    total: number,
    pos: Position,
    mode: AnimationMode,
    vli: VLI | null
): number {
    const S = 0.035 // Liquid smooth stagger
    if (mode === "inPlace") return 0
    if (mode === "multiLine" && vli) {
        const p = vli.charVLPos.get(c.globalIdx) ?? 0
        return p * S
    }
    return c.globalIdx * S
}

function rawAppearDelay(
    c: CharEntry,
    total: number,
    pos: Position,
    mode: AnimationMode,
    vli: VLI | null
): number {
    return rawDelay(c, total, pos, mode, vli)
}

function scaledTiming(
    rawD: number,
    maxRaw: number,
    duration: number
): { delay: number; charDur: number } {
    if (maxRaw <= 0) return { delay: 0, charDur: Math.max(0.65, duration) }
    return {
        charDur: Math.max(0.65, duration * 0.72),
        delay: (rawD * (duration * 0.28)) / maxRaw,
    }
}

function getAppear(c: CharEntry, pos: Position, mode: AnimationMode): string {
    const e = c.globalIdx % 2 === 0
    if (mode === "inPlace") return e ? "smt-ap-c-a" : "smt-ap-c-b"
    if (pos === "topLeft") return e ? "smt-ap-tl-a" : "smt-ap-tl-b"
    return e ? "smt-ap-bl-a" : "smt-ap-bl-b"
}

function parseT(t: any, def: { duration: number; delay: number }) {
    const EASES: Record<string, string> = {
        linear: "linear",
        easeIn: "cubic-bezier(0.42, 0, 1, 1)",
        easeOut: "cubic-bezier(0.16, 1, 0.3, 1)", // Silky smooth Apple-grade deceleration
        easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
    }
    if (!t)
        return {
            duration: def.duration,
            delay: def.delay,
            timing: "cubic-bezier(0.16, 1, 0.3, 1)",
        }
    if (t.type === "spring")
        return {
            duration: 1.2,
            delay: t.delay ?? def.delay,
            timing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }
    return {
        duration: typeof t.duration === "number" ? t.duration : def.duration,
        delay: typeof t.delay === "number" ? t.delay : def.delay,
        timing: Array.isArray(t.ease)
            ? `cubic-bezier(${(t.ease as number[]).map((v) => +v.toFixed(4)).join(",")})`
            : (EASES[String(t.ease)] ?? "cubic-bezier(0.16, 1, 0.3, 1)"),
    }
}

// Global stylesheet injection - injected ONCE to avoid recalculating style tree on every slide change
const GLOBAL_STYLE_ID = "smoky-text-engine-keyframes"
function ensureGlobalKeyframes() {
    if (typeof document === "undefined") return
    if (document.getElementById(GLOBAL_STYLE_ID)) return

    const style = document.createElement("style")
    style.id = GLOBAL_STYLE_ID
    style.textContent = `
@keyframes smt-ap-c-a {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(0, 16px, 0) scale(0.95);
  }
  50% {
    opacity: 0.85;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes smt-ap-c-b {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(0, 20px, 0) scale(0.96);
  }
  50% {
    opacity: 0.85;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes smt-ap-bl-a {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(-18px, 14px, 0) rotate(1.8deg) scale(0.94);
  }
  50% {
    opacity: 0.85;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
}

@keyframes smt-ap-bl-b {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(-14px, 16px, 0) rotate(-1.8deg) scale(0.95);
  }
  50% {
    opacity: 0.85;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
}

@keyframes smt-ap-tl-a {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(-18px, -14px, 0) rotate(-1.8deg) scale(0.94);
  }
  50% {
    opacity: 0.85;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
}

@keyframes smt-ap-tl-b {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(-14px, -16px, 0) rotate(1.8deg) scale(0.95);
  }
  50% {
    opacity: 0.85;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
}
`
    document.head.appendChild(style)
}

export interface SmokyTextProps {
    text: string
    font?: React.CSSProperties
    color?: string
    appearTrigger?: "default" | "hover" | "scroll" | "hidden"
    scrollConfig?: {
        position?: "top" | "bottom"
        distance?: number
    }
    appearTransition?: {
        type?: string
        ease?: string | number[]
        duration?: number
        delay?: number
    }
    intensity?: number
    position?: Position
    animationMode?: AnimationMode
    className?: string
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span"
}

export default function SmokyText({
    text = "",
    font = {},
    color = "currentColor",
    appearTrigger = "default",
    scrollConfig = { position: "bottom", distance: 20 },
    appearTransition = { type: "tween", ease: "easeOut", duration: 1.5, delay: 0.05 },
    intensity = 9,
    position = "bottomLeft",
    animationMode = "singleLine",
    className = "",
    as: Component = "div",
}: SmokyTextProps) {
    // Ensure keyframes exist once globally
    useEffect(() => {
        ensureGlobalKeyframes()
    }, [])

    const { groups, totalVisible } = useMemo(() => buildGroups(text), [text])
    const appearT = useMemo(
        () => parseT(appearTransition, { duration: 1.5, delay: 0.05 }),
        [JSON.stringify(appearTransition)]
    )

    const containerRef = useRef<HTMLDivElement>(null)
    const wordRefs = useRef(new Map<number, HTMLElement>())
    const [vli, setVli] = useState<VLI | null>(null)

    const measureVL = useCallback(() => {
        if (animationMode !== "multiLine") {
            setVli(null)
            return
        }
        const items: { top: number; gi: number; chars: CharEntry[] }[] = []
        groups.forEach((g) => {
            if (g.type === "newline" || !g.chars.length) return
            const el = wordRefs.current.get(g.gi)
            if (el) items.push({ top: el.offsetTop, gi: g.gi, chars: g.chars })
        })
        items.sort((a, b) => a.gi - b.gi)
        const tops = Array.from(new Set(items.map((i) => i.top))).sort((a, b) => a - b)
        const topToVL = new Map(tops.map((t, i) => [t, i]))
        const charVL = new Map<number, number>(),
            charVLPos = new Map<number, number>()
        const vlLen = new Map<number, number>(),
            vlPos = new Map<number, number>()
        items.forEach(({ top, chars }) => {
            const vl = topToVL.get(top) ?? 0
            chars.forEach((c) => {
                const p = vlPos.get(vl) ?? 0
                charVL.set(c.globalIdx, vl)
                charVLPos.set(c.globalIdx, p)
                vlPos.set(vl, p + 1)
                vlLen.set(vl, p + 1)
            })
        })
        setVli({ charVL, charVLPos, vlLen })
    }, [groups, animationMode])

    useEffect(() => {
        measureVL()
        if (!containerRef.current) return
        const ro = new ResizeObserver(measureVL)
        ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [measureVL])

    const maxRaw = useMemo(() => {
        let m = 0
        groups.forEach((g) =>
            g.chars.forEach((c) => {
                const d = rawDelay(c, totalVisible, position, animationMode, vli)
                if (d > m) m = d
            })
        )
        return m
    }, [groups, totalVisible, position, animationMode, vli])

    const [phase, setPhase] = useState<Phase>("hidden")
    const tRef = useRef<ReturnType<typeof setTimeout>[]>([])
    const clear = () => {
        tRef.current.forEach(clearTimeout)
        tRef.current = []
    }
    const later = (fn: () => void, ms: number) =>
        tRef.current.push(setTimeout(fn, ms))

    const apRef = useRef(appearT)
    apRef.current = appearT
    const hoverFiredRef = useRef(false)
    const scrollPos = (scrollConfig?.position ?? "bottom") as "top" | "bottom"
    const scrollDist = Math.max(0, Math.min(100, scrollConfig?.distance ?? 20))

    const runAppear = useCallback(() => {
        clear()
        const ap = apRef.current
        setPhase("hidden")
        later(
            () => {
                setPhase("appearing")
                later(() => setPhase("visible"), ap.duration * 1000 + 100)
            },
            Math.max(ap.delay * 1000, 30)
        )
    }, [])

    useEffect(() => {
        clear()
        if (appearTrigger === "hidden") {
            setPhase("hidden")
            return clear
        }
        if (appearTrigger === "default") {
            runAppear()
            return clear
        }
        hoverFiredRef.current = false
        setPhase("hidden")
        if (appearTrigger === "scroll") {
            const el = containerRef.current
            if (!el) return clear
            const check = () => {
                const vh =
                    window.innerHeight || document.documentElement.clientHeight
                const rect = el.getBoundingClientRect()
                if (scrollPos === "top") {
                    return rect.top <= vh * (scrollDist / 100)
                }
                return rect.bottom <= vh * (1 - scrollDist / 100)
            }
            if (check()) {
                runAppear()
                return clear
            }
            const onScroll = () => {
                if (check()) {
                    runAppear()
                    window.removeEventListener("scroll", onScroll, true)
                    window.removeEventListener("resize", onScroll)
                }
            }
            window.addEventListener("scroll", onScroll, true)
            window.addEventListener("resize", onScroll)
            return () => {
                window.removeEventListener("scroll", onScroll, true)
                window.removeEventListener("resize", onScroll)
                clear()
            }
        }
        return clear
    }, [
        text,
        color,
        intensity,
        position,
        animationMode,
        appearTrigger,
        scrollPos,
        scrollDist,
        JSON.stringify(appearT),
        runAppear,
    ])

    return (
        <Component
            ref={containerRef as any}
            className={className}
            onMouseEnter={() => {
                if (appearTrigger === "hover" && !hoverFiredRef.current) {
                    hoverFiredRef.current = true
                    runAppear()
                }
            }}
            style={{
                color: color,
                backfaceVisibility: "hidden",
                wordBreak: "keep-all",
                overflowWrap: "normal",
                ...font,
            }}
        >
            {groups.map((group) => {
                if (group.type === "newline") return <br key={group.gi} />
                if (group.type === "space")
                    return (
                        <span
                            key={group.gi}
                            ref={(el) => {
                                if (el) wordRefs.current.set(group.gi, el)
                            }}
                            style={{ display: "inline", whiteSpace: "pre" }}
                        >
                            {" "}
                        </span>
                    )

                return (
                    <span
                        key={group.gi}
                        ref={(el) => {
                            if (el) wordRefs.current.set(group.gi, el)
                        }}
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {group.chars.map((c) => {
                            const base: React.CSSProperties = {
                                display: "inline-block",
                                color: color,
                                willChange: "transform, opacity, filter",
                                transformOrigin: "center bottom",
                                backfaceVisibility: "hidden",
                                WebkitFontSmoothing: "antialiased",
                            }

                            if (phase === "hidden")
                                return (
                                    <span
                                        key={c.globalIdx}
                                        style={{
                                            ...base,
                                            opacity: 0,
                                            transform: "translate3d(0, 14px, 0)",
                                        }}
                                    >
                                        {c.char}
                                    </span>
                                )

                            if (phase === "visible")
                                return (
                                    <span
                                        key={c.globalIdx}
                                        style={{
                                            ...base,
                                            opacity: 1,
                                            transform: "translate3d(0, 0, 0)",
                                        }}
                                    >
                                        {c.char}
                                    </span>
                                )

                            if (phase === "appearing") {
                                const rd = rawAppearDelay(
                                    c,
                                    totalVisible,
                                    position,
                                    animationMode,
                                    vli
                                )
                                const { delay, charDur } = scaledTiming(
                                    rd,
                                    maxRaw,
                                    appearT.duration
                                )
                                const anim = getAppear(c, position, animationMode)
                                return (
                                    <span
                                        key={c.globalIdx}
                                        style={{
                                            ...base,
                                            animation: `${anim} ${charDur}s ${delay}s ${appearT.timing} both`,
                                        }}
                                    >
                                        {c.char}
                                    </span>
                                )
                            }

                            return null
                        })}
                    </span>
                )
            })}
        </Component>
    )
}
