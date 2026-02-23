'use client'

import React, { useRef, useEffect } from 'react'
import type { HyperspeedEffectOptions } from './HyperSpeedPresets'

interface HyperspeedProps extends Partial<HyperspeedEffectOptions> {
  className?: string
  /** Preset from hyperspeedPresets (e.g. hyperspeedPresets.six) */
  effectOptions?: HyperspeedEffectOptions
  /** Line color (CSS color or hex) */
  lineColor?: string
  /** Background color */
  backgroundColor?: string
  /** Speed multiplier (default 1) */
  speed?: number
  /** Number of lines (default 80) */
  lineCount?: number
}

/**
 * Hyperspeed-style canvas background: moving lines creating a tunnel/warp effect.
 * Use effectOptions={hyperspeedPresets.six} for preset "Neon Waves".
 */
export function Hyperspeed({
  className = '',
  effectOptions,
  lineColor = 'rgba(255,255,255,0.4)',
  backgroundColor = '#000000',
  speed = 1,
  lineCount = 80,
}: HyperspeedProps) {
  const opts = effectOptions ?? {}
  const finalLineColor = opts.lineColor ?? lineColor
  const finalBackgroundColor = opts.backgroundColor ?? backgroundColor
  const finalSpeed = opts.speed ?? speed
  const finalLineCount = opts.lineCount ?? lineCount
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return

      ctx.fillStyle = finalBackgroundColor
      ctx.fillRect(0, 0, w, h)

      const centerX = w / 2
      const centerY = h / 2
      const maxDist = Math.max(w, h) * 0.8
      const baseSpeed = 0.02 * finalSpeed

      const getRgba = (alpha: number) => {
        if (finalLineColor.startsWith('rgba')) {
          return finalLineColor.replace(/[\d.]+\)$/g, `${alpha})`)
        }
        if (finalLineColor.startsWith('#')) {
          const hex = finalLineColor.slice(1)
          const r = parseInt(hex.slice(0, 2), 16)
          const g = parseInt(hex.slice(2, 4), 16)
          const b = parseInt(hex.slice(4, 6), 16)
          return `rgba(${r},${g},${b},${alpha})`
        }
        return `rgba(255,255,255,${alpha})`
      }

      for (let i = 0; i < finalLineCount; i++) {
        const t = (i / finalLineCount) * Math.PI * 2 + time
        const dist = (i / finalLineCount) * maxDist + (time * 80) % (maxDist / 4)
        const x = centerX + Math.cos(t) * dist
        const y = centerY + Math.sin(t) * dist
        const size = Math.max(1, 4 - (dist / maxDist) * 3)
        const alpha = Math.max(0.05, 1 - dist / maxDist)
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = getRgba(alpha)
        ctx.fill()
      }

      time += baseSpeed
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [finalBackgroundColor, finalLineColor, finalLineCount, finalSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden
    />
  )
}
